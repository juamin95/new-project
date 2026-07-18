/**
 * PROJ-16: Migration Tool-Ebene — Regressionstests (statisch, ohne Netzwerk).
 * Sichert die vier Migrations-Anpassungen und die Governance-Regel:
 * kein VPS-Pfad, Zielpfad-Pflicht, Key aus Repo-Root, Entwurf-first + Schreib-Gate.
 */
import { describe, it, expect } from 'vitest'
import { execFileSync } from 'node:child_process'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const read = (p: string) => readFileSync(join(root, p), 'utf-8')

describe('Tool-Ebene: Struktur vollständig', () => {
  it.each([
    'tools/README.md',
    'tools/hero-tools/hero',
    'tools/hero-tools/hero_tools/cli.py',
    'tools/hero-tools/hero_tools/client.py',
    'tools/hero-graphql/introspect.py',
    '.claude/rules/hero-tools.md',
  ])('%s existiert', (f) => {
    expect(existsSync(join(root, f))).toBe(true)
  })
})

describe('introspect.py: Zielpfad-Sicherheit', () => {
  const intro = read('tools/hero-graphql/introspect.py')

  it('enthält keinen hart codierten VPS-Pfad mehr', () => {
    expect(intro).not.toContain('/root/')
  })

  it('verlangt den Zielpfad als Pflicht-Argument mit klarem Abbruch', () => {
    expect(intro).toContain('sys.argv')
    expect(intro).toContain('Zielpfad fehlt')
  })
})

describe('client.py: Key-Handhabung', () => {
  const client = read('tools/hero-tools/hero_tools/client.py')

  it('liest .env.local aus dem Repo-Root', () => {
    expect(client).toContain('parents[3]')
    expect(client).toContain('.env.local')
  })

  it('bricht ohne Key mit klarer Meldung ab', () => {
    expect(client).toContain('HERO_API_KEY fehlt')
  })
})

describe('Python-3.9-Kompatibilität', () => {
  it.each(['client', 'dokument', 'kalender', 'katalog', 'kontakt', 'projekt', 'stammdaten'])(
    'hero_tools/%s.py hat den Future-Import',
    (mod) => {
      expect(read(`tools/hero-tools/hero_tools/${mod}.py`)).toContain(
        'from __future__ import annotations'
      )
    }
  )
})

describe('Governance-Regel hero-tools.md', () => {
  const rule = read('.claude/rules/hero-tools.md')

  it('lädt in jeder Session (kein paths-Filter)', () => {
    expect(rule.startsWith('---')).toBe(false)
  })

  it('verankert Entwurf-first (publish: false, Versand durch Menschen)', () => {
    expect(rule).toContain('publish: false')
    expect(rule).toContain('Entwurf')
    expect(rule).toContain('Mensch')
  })

  it('verankert das Lese-/Schreib-Gate', () => {
    expect(rule).toContain('Lesebefehle')
    expect(rule).toContain('Schreibbefehle')
    expect(rule).toContain('Freigabe')
  })
})

describe('Umgebung und Laufzeitdaten bleiben unversioniert', () => {
  it.each([
    'tools/hero-tools/venv/pyvenv.cfg',
    'tools/hero-tools/hero_tools/__pycache__/x.pyc',
    'tools/hero-tools/daten/belege.json',
  ])('%s ist git-ignoriert', (f) => {
    expect(() => execFileSync('git', ['check-ignore', '-q', f], { cwd: root })).not.toThrow()
  })
})
