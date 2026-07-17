#!/usr/bin/env node
/**
 * PROJ-3: Rein lesendes Prüfwerkzeug gegen die Hero-GraphQL-Partner-API.
 * Liest HERO_API_KEY selbst aus .env.local — der Key verlässt das Skript nie.
 *
 * Aufrufe:
 *   node scripts/hero-abgleich.mjs check          → Verbindung + Auth-Variante testen
 *   node scripts/hero-abgleich.mjs projekttypen   → Projekttypen + Statuspipelines abrufen
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const ENDPOINT = 'https://login.hero-software.de/api/external/v7/graphql'

function loadApiKey() {
  let env
  try {
    env = readFileSync(join(root, '.env.local'), 'utf-8')
  } catch {
    console.error('FEHLER: .env.local nicht gefunden (im Projektroot anlegen).')
    process.exit(1)
  }
  const match = env.match(/^\s*(?:export\s+)?HERO_API_KEY\s*=\s*(.+)$/m)
  if (!match || !match[1].trim()) {
    const names = [...env.matchAll(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=/gm)].map((m) => m[1])
    console.error('FEHLER: HERO_API_KEY fehlt in .env.local.')
    console.error(`Vorhandene Variablennamen: ${names.join(', ') || '(keine erkennbar)'}`)
    process.exit(1)
  }
  return match[1].trim().replace(/^["']|["']$/g, '')
}

async function gql(query, headers) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify({ query }),
  })
  const text = await res.text()
  let body
  try {
    body = JSON.parse(text)
  } catch {
    body = { parseError: text.slice(0, 300) }
  }
  return { status: res.status, body }
}

const PING = '{ __typename }'

async function findAuthHeader(key) {
  const variants = [
    ['Authorization (Bearer)', { Authorization: `Bearer ${key}` }],
    ['Authorization (roh)', { Authorization: key }],
    ['x-api-key', { 'x-api-key': key }],
    ['api-key', { 'api-key': key }],
  ]
  for (const [name, headers] of variants) {
    const { status, body } = await gql(PING, headers)
    if (status === 200 && body.data) return { name, headers }
    console.log(`  ${name}: HTTP ${status}${body.errors ? ' — ' + JSON.stringify(body.errors).slice(0, 120) : ''}`)
  }
  return null
}

const command = process.argv[2] ?? 'check'
const key = loadApiKey()
console.log('Suche funktionierende Auth-Variante …')
const auth = await findAuthHeader(key)
if (!auth) {
  console.error('FEHLER: Keine Auth-Variante akzeptiert. Key prüfen (Quelle: n8n-Credential).')
  process.exit(1)
}
console.log(`OK: Verbindung steht (Auth-Variante: ${auth.name})`)

if (command === 'projekttypen') {
  const query = `{
    project_types {
      id
      name
      is_default
      is_active
      project_status_steps { status_code name sort_order is_active }
    }
  }`
  const { status, body } = await gql(query, auth.headers)
  if (status !== 200 || body.errors) {
    console.error(`Abfrage fehlgeschlagen (HTTP ${status}):`, JSON.stringify(body.errors ?? body, null, 2).slice(0, 800))
    console.error('Hinweis: Feldnamen ggf. per Introspection prüfen (Schema-Referenz, PROJ-4).')
    process.exit(1)
  }
  console.log(JSON.stringify(body.data, null, 2))
}
