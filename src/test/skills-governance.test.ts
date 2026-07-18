/**
 * PROJ-6: Migration Prozess-Skills — Regressionstests (statisch).
 * Sichert: alle Skill-Dateien vorhanden, keine Alt-Pfade, jede referenzierte
 * Datei/jeder Ordner existiert. Bricht eine künftige Vault-Umbenennung einen
 * Skill, wird es hier sichtbar.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync, globSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const read = (p: string) => readFileSync(join(root, p), 'utf-8')

const skillFiles = [
  '.claude/skills/bauprojekt/SKILL.md',
  '.claude/skills/bauprojekt/schritte/1-anfrage-eingegangen.md',
  '.claude/skills/bauprojekt/schritte/2-vor-ort-termin.md',
  '.claude/skills/bauprojekt/schritte/3-angebotserstellung.md',
  '.claude/skills/bauprojekt/schritte/4-auftragsbestaetigung.md',
  '.claude/skills/bauprojekt/schritte/5-termin-festgelegt.md',
  '.claude/skills/bauprojekt/schritte/6-in-umsetzung.md',
  '.claude/skills/bauprojekt/schritte/7-kundenrechnung.md',
  '.claude/skills/projekt-ohne-angebot/SKILL.md',
  '.claude/skills/abo/SKILL.md',
  '.claude/skills/hero-stammdaten/SKILL.md',
  '.claude/skills/hero-stammdaten/kunde.md',
  '.claude/skills/hero-stammdaten/katalog.md',
]

describe('Prozess-Skills: vollständig migriert', () => {
  it.each(skillFiles)('%s existiert', (f) => {
    expect(existsSync(join(root, f))).toBe(true)
  })

  it.each(skillFiles)('%s enthält keine Alt-Pfade', (f) => {
    const s = read(f)
    for (const alt of ['/root/', '03 Bereiche', '04 Ressourcen']) {
      expect(s, `Alt-Pfad „${alt}"`).not.toContain(alt)
    }
  })
})

describe('Prozess-Skills: alle referenzierten Ziele existieren', () => {
  it.each(skillFiles)('%s referenziert nur existierende Pfade', (f) => {
    const s = read(f)
    const targets = new Set<string>()
    for (const m of s.matchAll(/tools\/hero-tools\/[A-Za-z0-9._-]+/g)) targets.add(m[0])
    for (const m of s.matchAll(/vault\/[^`\n]*?\.md|vault\/[^`\n]*?\/(?=`|\s|$)/g))
      targets.add(m[0].trim())
    const missing = [...targets].filter((t) => !existsSync(join(root, t)))
    expect(missing, `fehlende Ziele: ${missing.join(', ')}`).toEqual([])
  })
})

describe('Skills-Übersicht im Vault', () => {
  it('nennt alle vier Skills und verlinkt die Prozessnotizen', () => {
    const s = read('vault/03 AI/Skills-Übersicht.md')
    for (const skill of ['bauprojekt', 'projekt-ohne-angebot', 'abo', 'hero-stammdaten'])
      expect(s).toContain(`\`${skill}\``)
    expect(s).toContain('[[Prozess Bauprojekt End-to-End]]')
    expect(s).toContain('tools/hero-tools/hero')
  })
})
