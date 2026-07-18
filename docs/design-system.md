# GRÜNSCHNITT Design-System

Verbindliche Gestaltungsgrundlage für das Cockpit (PROJ-7 ff.) und alle künftigen UI-Arbeiten.
Quelle: Branding der GRÜNSCHNITT-Website (migriert aus dem alten Vault, PROJ-5, 18.07.2026).
Die `/frontend`-Arbeiten lesen diese Datei vor jedem UI-Bau.

## Firmenname
GRÜNSCHNITT by Marvin Amini

## Logo
Schriftzug "GRÜN" in Gras-Optik (begrünte Buchstaben), darunter "SCHNITT" in dunklem Grün, darunter handschriftlich "by Marvin Amini".

![GRÜNSCHNITT-Logo](../vault/05%20Anh%C3%A4nge/gruenschnitt-logo.png)

Datei: `vault/05 Anhänge/gruenschnitt-logo.png` (Original: Website-Projekt `my-first-app/public/logos/logo-amini.png`)

## Schriftarten
| Rolle | Font | Tailwind-Klasse | Verwendung |
|-------|------|-----------------|------------|
| Überschriften | Spectral (Serif) | font-serif | Alle h1–h6, automatisch via globals.css |
| Fließtext | Inter (Sans-Serif) | font-sans | Body, Buttons, Navigation, Labels, alles andere |

Eingebunden über next/font/google (kein CDN, font-display: swap). Spectral in den Gewichten 400, 600, 700, 800.

## Farben

### Brand-Grün-Palette
| Token | Hex | Verwendung |
|-------|-----|------------|
| brand-green-light | #eef6e8 | Heller Hintergrund, Gradient-Start |
| brand-green-mid | #f4f7f2 | Neutraler Grün-Hintergrund |
| brand-green-muted | #ddebd5 | Gedämpfter Akzent, Gradient-End |
| brand-green-accent | #d5e8cb | Pflege-Abo-Section, leicht dunkler |
| brand-green-soft | #90d170 | Helles Grün (Hero-Gradient, Platzhalter) |
| brand-green-pale | #c8f0a8 | Sehr helles Grün (Hero-Gradient-End) |
| brand-green-deep | #3a632b | Dunkles Grün (Gradient-Text Start) |
| brand-green-vivid | #6db33f | Kräftiges Grün (Gradient-Text End) |
| brand-green-cta | #4f802e | CTA-Buttons (WCAG AA mit weißem Text, 4.71:1) |
| brand-green-cta-hover | #3d6624 | CTA-Button Hover-State |

### Brand-Stein-Palette
| Token | Hex | Verwendung |
|-------|-----|------------|
| brand-stone-light | #f5f3ee | Heller Stein-Hintergrund |
| brand-stone-mid | #ede9e2 | Mittlerer Stein-Hintergrund |
| brand-stone-muted | #e0dbd1 | Gedämpfter Stein-Akzent |

### Sonstige
| Token | Hex | Verwendung |
|-------|-----|------------|
| brand-amber | #D97706 | Sterne, Zahlen-Highlights |
| brand-image-placeholder | #e8f0e4 | Bild-Platzhalter in Karten |

### Schrift- und Textfarben (via CSS-Variablen)
| Variable | HSL-Wert | Entspricht ca. | Verwendung |
|----------|----------|----------------|------------|
| --foreground | 240 10% 3.9% | Fast Schwarz | Standard-Textfarbe (Body) |
| --primary | 104 39% 28% | Dunkelgrün (#3a6328) | Primärfarbe, Badges, Links, Focus-Ring |
| --primary-foreground | 0 0% 100% | Weiß | Text auf Primary-Hintergrund (Buttons) |
| --muted-foreground | 240 3.8% 32% | Dunkelgrau | Beschreibungstexte, Subtexte |
| --destructive | 0 84.2% 60.2% | Rot | Fehlermeldungen |
| --background | 0 0% 100% | Weiß | Seitenhintergrund |

### Gradient-Text (Überschriften-Akzent)
`bg-gradient-to-r from-brand-green-deep (#3a632b) to-brand-green-vivid (#6db33f)`

## Zusammenfassung
Weiß/Hellgrau als Basis, frisches Grün als Leitfarbe, warme Stein-Töne als Kontrast. Spectral für Überschriften, Inter für alles andere. Textfarbe ist fast-schwarz mit dunkelgrünen Akzenten.
