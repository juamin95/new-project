#!/usr/bin/env node
/**
 * Wendet eine SQL-Migration über die Supabase-Management-API an.
 * Liest Projekt-Ref und Access-Token selbst aus .mcp.json (nie ausgegeben).
 *
 * Aufruf: node scripts/apply-migration.mjs supabase/migrations/<datei>.sql
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const file = process.argv[2]
if (!file) {
  console.error('FAIL: Migrationsdatei fehlt. Aufruf: node scripts/apply-migration.mjs <datei.sql>')
  process.exit(1)
}

let mcp
try {
  mcp = JSON.parse(readFileSync(join(root, '.mcp.json'), 'utf-8'))
} catch {
  console.error('FAIL: .mcp.json nicht lesbar (Token/Projekt-Ref nötig).')
  process.exit(1)
}

const server = mcp.mcpServers?.supabase
const token = server?.headers?.Authorization?.replace(/^Bearer\s+/i, '').trim()
const ref = new URL(server?.url ?? '').searchParams.get('project_ref')

if (!token || !ref) {
  console.error('FAIL: Token oder project_ref in .mcp.json nicht gefunden.')
  process.exit(1)
}

const sql = readFileSync(join(root, file), 'utf-8')

const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: sql }),
})

const body = await res.text()
if (!res.ok) {
  console.error(`FAIL: HTTP ${res.status} — ${body.slice(0, 500)}`)
  process.exit(1)
}
console.log(`PASS: Migration angewandt (${file}) auf Projekt ${ref}.`)
