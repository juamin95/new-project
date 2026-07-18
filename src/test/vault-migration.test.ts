/**
 * PROJ-3: Migration Prozesswissen — Regressionstests.
 * Sichert den migrierten Bestand: 9 Notizen mit quelle-Feld, korrekte
 * Statusvergabe (verifiziert nur mit Hero-Abgleich + Review), Landkarte
 * als Hub, Migrations-Filter (keine privaten Inhalte).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, globSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const read = (p: string) => readFileSync(join(root, p), 'utf-8')
const frontmatterOf = (p: string) => read(p).match(/^---\n([\s\S]*?)\n---\n/)![1]

const migriert: Record<string, 'verifiziert' | 'erfasst'> = {
  'vault/01 Prozess/Prozesslandkarte.md': 'verifiziert',
  'vault/01 Prozess/Kernprozesse/Prozess Bauprojekt End-to-End.md': 'verifiziert',
  'vault/01 Prozess/Kernprozesse/Prozess Projekt ohne Angebot.md': 'verifiziert',
  'vault/01 Prozess/Kernprozesse/Prozess Abo-Einsatz.md': 'verifiziert',
  'vault/01 Prozess/Supportprozesse/Prozess Stammdatenpflege.md': 'erfasst',
  'vault/01 Prozess/Supportprozesse/Prozess Kundenstammdaten.md': 'erfasst',
  'vault/01 Prozess/Supportprozesse/Prozess Belegfluss Buchhaltung.md': 'erfasst',
  'vault/03 AI/Lernlog/Lernlog Bauprozess.md': 'erfasst',
  'vault/00 Betrieb/Projekttypen-Wissensbasis.md': 'erfasst',
}

describe('AC-1/2/3: Migrierte Notizen mit quelle-Feld und korrekter Statusvergabe', () => {
  it.each(Object.entries(migriert))('%s → status %s + quelle', (note, status) => {
    const fm = frontmatterOf(note)
    expect(fm).toMatch(/^quelle: .*gruenschnitt-wissen/m)
    expect(fm).toMatch(new RegExp(`^status: ${status}$`, 'm'))
  })

  it.each(Object.entries(migriert).filter(([, s]) => s === 'verifiziert'))(
    '%s: quelle dokumentiert Hero-Abgleich und Review',
    (note) => {
      const fm = frontmatterOf(note)
      expect(fm).toContain('Hero-Abgleich bestanden')
      expect(fm).toContain('Review Julian')
    }
  )
})

describe('AC-5: Prozesslandkarte ist der Hub', () => {
  const landkarte = read('vault/01 Prozess/Prozesslandkarte.md')

  it.each([
    'Prozess Bauprojekt End-to-End',
    'Prozess Projekt ohne Angebot',
    'Prozess Abo-Einsatz',
    'Prozess Stammdatenpflege',
    'Prozess Kundenstammdaten',
    'Prozess Belegfluss Buchhaltung',
  ])('verlinkt [[%s]]', (ziel) => {
    expect(landkarte).toContain(`[[${ziel}]]`)
  })
})

describe('AC-6: Migrations-Filter — keine privaten Inhalte im Vault', () => {
  const notes = globSync('vault/**/*.md', { cwd: root }).filter(
    (n) => !n.endsWith('Start.md') // Start.md benennt die Ausschlüsse selbst
  )

  it.each(notes)('%s enthält keine privaten Verweise', (note) => {
    const s = read(note)
    for (const term of ['Systemdatenanalyse', '[[KI-Betriebssystem', 'Deutz', 'Daily Note']) {
      expect(s, `privater Begriff „${term}"`).not.toContain(term)
    }
  })
})

describe('AC-8: Verweise auf noch nicht migrierte Ziele sind Klartext', () => {
  const all = globSync('vault/**/*.md', { cwd: root })
    .map((n) => read(n))
    .join(' ')

  it('PROJ-4-Ziele (Hero-Praxiswissen) sind nicht als Wikilink gesetzt', () => {
    expect(all).not.toContain('[[Kalender und Termine')
    expect(all).not.toContain('[[Gewerke und Projekttypen')
  })
})
