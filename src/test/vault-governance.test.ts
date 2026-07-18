/**
 * PROJ-2: Vault-Gerüst & Governance — Regressionstests.
 * Prüft die Akzeptanzkriterien der Spec gegen den echten Dateibestand:
 * Struktur, Obsidian-Konfig, Frontmatter-Konventionen, Wikilinks,
 * .gitignore-Verhalten und die Governance-Regeln.
 */
import { describe, it, expect } from 'vitest'
import { execFileSync } from 'node:child_process'
import { readFileSync, existsSync } from 'node:fs'
import { join, basename } from 'node:path'
import { globSync } from 'node:fs'

const root = process.cwd()
const vaultNotes = globSync('vault/**/*.md', { cwd: root }).sort()

// Der Referenz-Ordner ist ein maschineller Spiegel des Hero-Schemas:
// vom Frontmatter-/Statusmodell ausgenommen (siehe Notiz-Konventionen),
// Links und Secrets werden weiterhin geprüft.
const isReferenz = (n: string) => n.includes('Referenz (auto-generiert)')
const authoredNotes = vaultNotes.filter((n) => !isReferenz(n))
// GraphQL-Standard-Scalars werden vom Generator bewusst nicht als Dateien
// geschrieben, vereinzelt aber verlinkt — eng begrenzte Whitelist.
const GRAPHQL_SCALARS = new Set(['Boolean', 'String', 'Int', 'Float', 'ID'])

const read = (p: string) => readFileSync(join(root, p), 'utf-8')
const frontmatterOf = (content: string) => content.match(/^---\n([\s\S]*?)\n---\n/)?.[1]

describe('AC-1: Vault-Struktur ist vollständig und Obsidian-kompatibel', () => {
  const expected = [
    'vault/Start.md',
    'vault/00 Betrieb/00 Betrieb.md',
    'vault/01 Prozess/01 Prozess.md',
    'vault/02 Technik/02 Technik.md',
    'vault/03 AI/03 AI.md',
    'vault/03 AI/Notiz-Konventionen.md',
    'vault/03 AI/Lernlog/Lernlog-Konventionen.md',
    'vault/04 User/04 User.md',
    'vault/05 Anhänge/05 Anhänge.md',
  ]

  it.each(expected)('%s existiert', (file) => {
    expect(existsSync(join(root, file))).toBe(true)
  })

  it.each(['app.json', 'appearance.json', 'community-plugins.json'])(
    'vault/.obsidian/%s ist valides JSON',
    (file) => {
      expect(() => JSON.parse(read(`vault/.obsidian/${file}`))).not.toThrow()
    }
  )
})

describe('Notiz-Konventionen: Frontmatter jeder Vault-Notiz (außer Referenz)', () => {
  it.each(authoredNotes)('%s hat tags, status und date mit gültigem Statuswert', (note) => {
    const fm = frontmatterOf(read(note))
    expect(fm, `${note}: Frontmatter fehlt`).toBeDefined()
    expect(fm).toMatch(/^tags:/m)
    expect(fm).toMatch(/^date:/m)
    expect(fm).toMatch(/^status: (erfasst|verifiziert)$/m)
  })
})

describe('Wikilinks: jeder Link außerhalb von Code-Backticks hat ein Ziel', () => {
  const stems = new Set(vaultNotes.map((n) => basename(n, '.md')))

  it.each(vaultNotes)('%s enthält keine toten Wikilinks', (note) => {
    const withoutCode = read(note).replace(/`[^`]*`/g, '')
    // \| ist Obsidians escaptes Alias-Pipe in Tabellen — wie | behandeln
    const targets = [...withoutCode.matchAll(/\[\[((?:[^\]\\|#]|\\(?!\|))+?)(?:\\?\|[^\]]*|#[^\]]*)?\]\]/g)].map(
      (m) => m[1].trim()
    )
    const dead = targets.filter(
      (t) => !stems.has(t) && !(isReferenz(note) && GRAPHQL_SCALARS.has(t))
    )
    expect(dead, `tote Links: ${dead.join(', ')}`).toEqual([])
  })
})

describe('AC-7: Obsidian-Arbeitsdateien sind git-ignoriert', () => {
  it.each([
    'vault/.obsidian/workspace.json',
    'vault/.obsidian/workspace-mobile.json',
    'vault/.obsidian/cache',
    'vault/.trash/beispiel.md',
  ])('%s wird ignoriert', (file) => {
    expect(() => execFileSync('git', ['check-ignore', '-q', file], { cwd: root })).not.toThrow()
  })
})

describe('AC-2 bis AC-6: Governance-Regeln (.claude/rules/vault.md)', () => {
  const rules = read('.claude/rules/vault.md')

  it('hat keinen paths-Filter und lädt damit in jeder Session (AC-2)', () => {
    expect(rules.startsWith('---')).toBe(false)
  })

  it('erlaubt autonomes Schreiben nur im Lernlog und gated den Rest (AC-3, AC-4)', () => {
    expect(rules).toContain('Autonom erlaubt')
    expect(rules).toContain('03 AI/Lernlog/')
    expect(rules).toContain('gated')
  })

  it('schließt status: erfasst als Arbeitsgrundlage aus (AC-5)', () => {
    expect(rules).toContain('status: erfasst')
    expect(rules).toContain('status: verifiziert')
  })

  it('verlangt das quelle-Feld für migrierte Notizen (AC-6)', () => {
    expect(rules).toContain('quelle')
    expect(read('vault/03 AI/Notiz-Konventionen.md')).toContain('quelle')
  })
})

describe('AC-8: Start.md beantwortet den Migrations-Filter eindeutig', () => {
  const start = read('vault/Start.md')

  it.each(['**Rein**', '**Raus**', '**Grenzfälle:**'])('enthält den Abschnitt %s', (section) => {
    expect(start).toContain(section)
  })
})

describe('Security: keine Secrets im Vault', () => {
  it.each(vaultNotes)('%s enthält keine Credential-Muster', (note) => {
    const hits = read(note).match(/(api[_-]?key|passwor[dt]|secret|token)\s*[:=]\s*\S+/gi) ?? []
    expect(hits).toEqual([])
  })
})
