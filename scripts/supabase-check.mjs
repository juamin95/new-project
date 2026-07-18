#!/usr/bin/env node
/**
 * PROJ-1: Verifikationsskript für die Supabase-Infrastruktur.
 * Liest die Keys selbst aus .env.local (Hero-Muster — Keys verlassen das Skript nie).
 *
 * Prüft:
 *   1. Env zeigt auf das richtige Projekt (bnzpdujupmmrwcbunbql)
 *   2. Website-Tabellen leads + projekte existieren und sind erreichbar (Bestandsschutz)
 *   3. Auth-Endpunkt erreichbar; Signup-Status (sollte nach PROJ-1 deaktiviert sein)
 *
 * Aufruf: node scripts/supabase-check.mjs
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const EXPECTED_REF = 'bnzpdujupmmrwcbunbql'

function loadEnv() {
  let env
  try {
    env = readFileSync(join(root, '.env.local'), 'utf-8')
  } catch {
    fail('.env.local nicht gefunden (im Projektroot anlegen).')
  }
  const get = (name) => {
    const m = env.match(new RegExp(`^\\s*(?:export\\s+)?${name}\\s*=\\s*(.+)$`, 'm'))
    return m ? m[1].trim().replace(/^["']|["']$/g, '') : null
  }
  return {
    url: get('NEXT_PUBLIC_SUPABASE_URL'),
    anon: get('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    service: get('SUPABASE_SERVICE_ROLE_KEY'),
  }
}

let failed = false
const pass = (msg) => console.log('PASS ' + msg)
const fail = (msg) => { console.error('FAIL ' + msg); failed = true }

const { url, anon, service } = loadEnv()

// 1. Projekt-Identität
if (!url) fail('NEXT_PUBLIC_SUPABASE_URL fehlt in .env.local')
else if (!url.includes(EXPECTED_REF)) fail(`Env zeigt auf fremdes Projekt: ${url}`)
else pass(`Env zeigt auf das richtige Projekt (${EXPECTED_REF})`)
if (!anon) fail('NEXT_PUBLIC_SUPABASE_ANON_KEY fehlt')
if (!service) fail('SUPABASE_SERVICE_ROLE_KEY fehlt')
if (failed) process.exit(1)

// 2. Website-Tabellen (Bestandsschutz) — Zeilenzahl über PostgREST mit Service-Key
for (const table of ['leads', 'projekte']) {
  const res = await fetch(`${url}/rest/v1/${table}?select=*`, {
    method: 'HEAD',
    headers: { apikey: service, Authorization: `Bearer ${service}`, Prefer: 'count=exact' },
  })
  if (!res.ok) {
    fail(`Tabelle ${table}: nicht erreichbar (HTTP ${res.status})`)
  } else {
    const count = res.headers.get('content-range')?.split('/')[1] ?? '?'
    pass(`Tabelle ${table} vorhanden (${count} Zeilen)`)
  }
}

// 3. Auth-Endpunkt + Signup-Status
const settings = await fetch(`${url}/auth/v1/settings`, { headers: { apikey: anon } })
if (!settings.ok) {
  fail(`Auth-Endpunkt nicht erreichbar (HTTP ${settings.status})`)
} else {
  const s = await settings.json()
  pass('Auth-Endpunkt erreichbar')
  if (s.disable_signup === true) pass('Selbstregistrierung ist deaktiviert (Soll-Zustand)')
  else fail('Selbstregistrierung ist NOCH AKTIV — im Dashboard deaktivieren (Auth → Sign In / Up)')
  if (s.external?.email === true) pass('E-Mail-Login (Magic Link fähig) ist aktiviert')
  else fail('E-Mail-Provider ist deaktiviert — im Dashboard aktivieren')
}

process.exit(failed ? 1 : 0)
