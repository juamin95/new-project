"""CLI: ein Unterbefehl je atomarer Operation.

Aufruf: ./hero <modul> <befehl> [optionen]
Ausgabe: JSON auf stdout. Fehler: Klartext auf stderr, Exit-Code 1.
"""

import argparse
import sys

from . import dokument, kalender, katalog, kontakt, projekt, stammdaten
from .client import HeroError, gql, out


def main() -> None:
    parser = argparse.ArgumentParser(prog="hero", description="GRÜNSCHNITT Hero-Tools")
    sub = parser.add_subparsers(dest="modul", required=True)

    # ---- kontakt ----
    k = sub.add_parser("kontakt").add_subparsers(dest="befehl", required=True)
    p = k.add_parser("suchen")
    p.add_argument("query")
    p = k.add_parser("anlegen")
    p.add_argument("--nachname", required=True)
    p.add_argument("--vorname")
    p.add_argument("--anrede", choices=["Herr", "Frau"])
    p.add_argument("--kategorie", default="customer", choices=["customer", "supplier", "partner"])
    p.add_argument("--typ", default="private", choices=["private", "commercial"])
    p.add_argument("--firma")
    p.add_argument("--email")
    p.add_argument("--telefon")
    p.add_argument("--mobil")
    p.add_argument("--strasse")
    p.add_argument("--plz")
    p.add_argument("--ort")
    p = k.add_parser("bearbeiten")
    p.add_argument("--id", type=int, required=True)
    for opt in ["--nachname", "--vorname", "--anrede", "--kategorie", "--typ", "--firma",
                "--email", "--telefon", "--mobil", "--strasse", "--plz", "--ort"]:
        p.add_argument(opt)
    p = k.add_parser("adresse")
    p.add_argument("--kunde", type=int, required=True, help="customer_id")
    p.add_argument("--strasse", required=True)
    p.add_argument("--plz", required=True)
    p.add_argument("--ort", required=True)
    p.add_argument("--titel", help='z.B. "Baustelle Bergstraße"')

    # ---- projekt ----
    pj = sub.add_parser("projekt").add_subparsers(dest="befehl", required=True)
    p = pj.add_parser("suchen")
    p.add_argument("--suche")
    p.add_argument("--kunde", type=int)
    p.add_argument("--typ", default="project", choices=["project", "copcontact", "alle"])
    p = pj.add_parser("anlegen")
    p.add_argument("--name", required=True, help="Format: JJJJMMTT_Kunde_Schlagwort")
    p.add_argument("--kunde", type=int, required=True)
    p.add_argument("--adresse", type=int, required=True, help="echte address_id")
    p.add_argument("--gewerk", choices=sorted(stammdaten.GEWERKE),
                   help="setzt das Nummern-Präfix (GES/PFL/GABO)")
    p.add_argument("--projekttyp", choices=sorted(stammdaten.PROJEKTTYPEN),
                   help="Prozessweg; ohne Angabe Hero-Standardtyp 'projekt'")
    p = pj.add_parser("gewerk")
    p.add_argument("--id", type=int, required=True, help="project_match_id")
    p.add_argument("--gewerk", required=True, choices=sorted(stammdaten.GEWERKE))
    p = pj.add_parser("status")
    p.add_argument("--id", type=int, required=True)
    p.add_argument("--code", type=int, required=True, help="status_code")
    p = pj.add_parser("aufgaben")
    p.add_argument("--projekt", type=int, required=True)
    p.add_argument("--offen", action="store_true", help="nur unerledigte")
    p = pj.add_parser("aufgabe-anlegen")
    p.add_argument("--projekt", type=int, required=True)
    p.add_argument("--titel", required=True)
    p.add_argument("--kommentar")
    p.add_argument("--faellig", help="z.B. '2026-07-20T12:00:00+00:00' oder '2026-07-20 12:00'")
    p = pj.add_parser("aufgabe-aendern")
    p.add_argument("--id", type=int, required=True)
    p.add_argument("--titel")
    p.add_argument("--kommentar")
    p.add_argument("--faellig")
    p = pj.add_parser("aufgabe-erledigt")
    p.add_argument("--id", type=int, required=True)
    p = pj.add_parser("aufgabe-loeschen")
    p.add_argument("--id", type=int, required=True)
    p = pj.add_parser("logbuch")
    p.add_argument("--projekt", type=int, required=True, help="project_match_id")
    p.add_argument("--text", required=True)
    p = pj.add_parser("logbuch-lesen")
    p.add_argument("--projekt", type=int, required=True)
    p = pj.add_parser("checklisten")
    p.add_argument("--projekt", type=int, required=True)
    p = pj.add_parser("checkliste-anlegen")
    p.add_argument("--projekt", type=int, required=True)
    p.add_argument("--name", required=True)
    p.add_argument("--punkt", action="append", required=True,
                   help="mehrfach angeben, je Checkbox-Punkt")
    p.add_argument("--frage", action="append",
                   help="mehrfach angeben, je Freitext-Eingabefeld")
    p.add_argument("--partner", type=int, default=134384, help="zugewiesener Mitarbeiter (Default Marvin)")
    p = pj.add_parser("checkliste-befuellen")
    p.add_argument("--id", type=int, required=True)
    p.add_argument("--punkt", action="append", required=True)
    p.add_argument("--frage", action="append")
    p = pj.add_parser("checkliste-abhaken")
    p.add_argument("--projekt", type=int, required=True)
    p.add_argument("--id", type=int, required=True, help="Checklisten-ID")
    p.add_argument("--label", required=True, help="Teilstring des Punkts (muss eindeutig sein)")
    p.add_argument("--text", help="Text für Eingabefelder")
    p.add_argument("--kein-haken", action="store_true", help="Haken entfernen statt setzen")
    p = pj.add_parser("checkliste-loeschen")
    p.add_argument("--id", type=int, required=True)

    # ---- kalender ----
    kal = sub.add_parser("kalender").add_subparsers(dest="befehl", required=True)
    kal.add_parser("kategorien")
    p = kal.add_parser("termine")
    p.add_argument("--von", required=True)
    p.add_argument("--bis", required=True)
    p = kal.add_parser("anlegen")
    p.add_argument("--titel", required=True)
    p.add_argument("--von", required=True, help="z.B. '2026-07-20 09:00' (Europe/Berlin)")
    p.add_argument("--bis", required=True)
    p.add_argument("--kategorie", required=True,
                   help="umsetzung|vor-ort-termin|buero|besprechung|... oder ID")
    p.add_argument("--beschreibung")
    p.add_argument("--projekt", type=int, help="project_match_id (nicht Kunden-ID!)")
    p.add_argument("--ganztags", action="store_true")
    p = kal.add_parser("aendern")
    p.add_argument("--id", type=int, required=True)
    p.add_argument("--titel")
    p.add_argument("--von")
    p.add_argument("--bis")
    p.add_argument("--beschreibung")
    p = kal.add_parser("loeschen")
    p.add_argument("--id", type=int, required=True)

    # ---- katalog ----
    kat = sub.add_parser("katalog").add_subparsers(dest="befehl", required=True)
    p = kat.add_parser("produkte")
    p.add_argument("--suche")
    p = kat.add_parser("leistungen")
    p.add_argument("--suche")
    p = kat.add_parser("produkt-anlegen")
    p.add_argument("--name", required=True)
    p.add_argument("--einheit", required=True)
    p.add_argument("--mwst", type=float, required=True)
    p.add_argument("--kreis", type=int, required=True, choices=[4000, 5000, 6000, 7000])
    p = kat.add_parser("leistung-anlegen")
    p.add_argument("--name", required=True)
    p.add_argument("--einheit", required=True)
    p.add_argument("--kreis", type=int, required=True, choices=[1000, 2000, 3000])

    # ---- dokument ----
    dok = sub.add_parser("dokument").add_subparsers(dest="befehl", required=True)
    for name in ("angebot", "rechnung"):
        p = dok.add_parser(name)
        p.add_argument("--projekt", type=int, required=True, help="project_match_id")
        p.add_argument("--anrede", required=True, help='z.B. "Herr Amini"')
        p.add_argument("--positionen", required=True, help="Pfad zur Positions-JSON-Datei")
        p.add_argument("--ersetzt", type=int,
                       help="ID des alten Entwurfs, der nach erfolgreichem Anlegen gelöscht wird")
    p = dok.add_parser("liste")
    p.add_argument("--projekt", type=int, required=True)
    p = dok.add_parser("positionen")
    p.add_argument("--id", type=int, required=True, help="document_id (nur veröffentlichte)")

    # ---- historie ----
    hist = sub.add_parser("historie").add_subparsers(dest="befehl", required=True)
    p = hist.add_parser("rechnungen")
    p.add_argument("--kunde", type=int, required=True, help="customer_id")
    p.add_argument("--auch-angebote", action="store_true")
    p = dok.add_parser("loeschen")
    p.add_argument("--id", type=int, required=True, help="document_id (nur Entwürfe!)")

    # ---- export ----
    exp = sub.add_parser("export").add_subparsers(dest="befehl", required=True)
    p = exp.add_parser("belege")
    p.add_argument("--ohne-angebote", action="store_true")

    # ---- query (Escape-Hatch für Erkundung) ----
    p = sub.add_parser("query", help="rohe GraphQL-Query ausführen (Datei oder stdin)")
    p.add_argument("--datei")

    args = parser.parse_args()

    try:
        out(_dispatch(args))
    except (HeroError, ValueError) as e:
        print(f"Fehler: {e}", file=sys.stderr)
        sys.exit(1)


def _dispatch(args):
    m, b = args.modul, getattr(args, "befehl", None)

    if m == "kontakt":
        if b == "suchen":
            return kontakt.suchen(args.query)
        if b == "anlegen":
            return kontakt.anlegen(last_name=args.nachname, first_name=args.vorname,
                                   title=args.anrede, category=args.kategorie, type=args.typ,
                                   company_name=args.firma, email=args.email,
                                   phone=args.telefon, mobile=args.mobil,
                                   street=args.strasse, zipcode=args.plz, city=args.ort)
        if b == "bearbeiten":
            return kontakt.bearbeiten(id=args.id, last_name=args.nachname,
                                      first_name=args.vorname, title=args.anrede,
                                      category=args.kategorie, type=args.typ,
                                      company_name=args.firma, email=args.email,
                                      phone_home=args.telefon, phone_mobile=args.mobil,
                                      street=args.strasse, zipcode=args.plz, city=args.ort)
        if b == "adresse":
            return kontakt.adresse_hinzufuegen(customer_id=args.kunde, street=args.strasse,
                                               zipcode=args.plz, city=args.ort,
                                               title=args.titel)

    if m == "projekt":
        if b == "suchen":
            typ = None if args.typ == "alle" else args.typ
            return projekt.suchen(search=args.suche, customer_id=args.kunde, type=typ)
        if b == "anlegen":
            return projekt.anlegen(name=args.name, customer_id=args.kunde,
                                   address_id=args.adresse,
                                   measure_id=stammdaten.GEWERKE[args.gewerk]
                                   if args.gewerk else None,
                                   type_id=stammdaten.PROJEKTTYPEN[args.projekttyp]
                                   if args.projekttyp else None)
        if b == "gewerk":
            return projekt.gewerk_setzen(id=args.id,
                                         measure_id=stammdaten.GEWERKE[args.gewerk])
        if b == "status":
            return projekt.status_setzen(id=args.id, status_code=args.code)
        if b == "aufgaben":
            return projekt.aufgaben(project_id=args.projekt, offen_only=args.offen)
        if b == "aufgabe-anlegen":
            from .kalender import _iso
            return projekt.aufgabe_anlegen(project_id=args.projekt, title=args.titel,
                                           comment=args.kommentar,
                                           due_date=_iso(args.faellig) if args.faellig else None)
        if b == "aufgabe-aendern":
            from .kalender import _iso
            return projekt.aufgabe_aendern(id=args.id, title=args.titel,
                                           comment=args.kommentar,
                                           due_date=_iso(args.faellig) if args.faellig else None)
        if b == "aufgabe-erledigt":
            from datetime import datetime, timezone
            return projekt.aufgabe_erledigt(
                id=args.id,
                done_date=datetime.now(timezone.utc).replace(microsecond=0).isoformat())
        if b == "aufgabe-loeschen":
            return projekt.aufgabe_loeschen(id=args.id)
        if b == "logbuch":
            return projekt.logbuch_eintrag(project_id=args.projekt, text=args.text)
        if b == "logbuch-lesen":
            return projekt.logbuch_lesen(project_id=args.projekt)
        if b == "checklisten":
            return projekt.checklisten(project_id=args.projekt)
        if b == "checkliste-anlegen":
            return projekt.checkliste_anlegen(project_id=args.projekt, name=args.name,
                                              punkte=args.punkt, fragen=args.frage,
                                              partner_id=args.partner)
        if b == "checkliste-befuellen":
            return projekt.checkliste_befuellen(id=args.id, punkte=args.punkt,
                                                fragen=args.frage)
        if b == "checkliste-abhaken":
            return projekt.checkliste_abhaken(project_id=args.projekt, checklist_id=args.id,
                                              label=args.label, text=args.text,
                                              haken=not args.kein_haken)
        if b == "checkliste-loeschen":
            return projekt.checkliste_loeschen(id=args.id)

    if m == "kalender":
        if b == "kategorien":
            return kalender.kategorien()
        if b == "termine":
            return kalender.termine(start=args.von, end=args.bis)
        if b == "anlegen":
            return kalender.termin_anlegen(title=args.titel, start=args.von, end=args.bis,
                                           kategorie=args.kategorie,
                                           description=args.beschreibung,
                                           project_match_id=args.projekt,
                                           all_day=args.ganztags)
        if b == "aendern":
            return kalender.termin_aendern(id=args.id, title=args.titel, start=args.von,
                                           end=args.bis, description=args.beschreibung)
        if b == "loeschen":
            return kalender.termin_loeschen(id=args.id)

    if m == "katalog":
        if b == "produkte":
            return katalog.produkte(search=args.suche)
        if b == "leistungen":
            return katalog.leistungen(search=args.suche)
        if b == "produkt-anlegen":
            return katalog.produkt_anlegen(name=args.name, unit=args.einheit,
                                           vat=args.mwst, kreis=args.kreis)
        if b == "leistung-anlegen":
            return katalog.leistung_anlegen(name=args.name, unit=args.einheit,
                                            kreis=args.kreis)

    if m == "export":
        from . import export
        return export.belege(mit_angeboten=not args.ohne_angebote)

    if m == "historie":
        from . import historie
        return historie.rechnungspositionen(customer_id=args.kunde,
                                            auch_angebote=args.auch_angebote)

    if m == "dokument":
        if b == "liste":
            return dokument.liste(project_id=args.projekt)
        if b == "positionen":
            return dokument.positionen(document_id=args.id)
        if b == "loeschen":
            return dokument.loeschen(document_id=args.id)
        fn = dokument.angebot if b == "angebot" else dokument.rechnung
        return fn(project_id=args.projekt, anrede=args.anrede,
                  positionen_datei=args.positionen, ersetzt_id=args.ersetzt)

    if m == "query":
        text = open(args.datei).read() if args.datei else sys.stdin.read()
        return gql(text)

    raise ValueError(f"Unbekannter Befehl: {m} {b}")


if __name__ == "__main__":
    main()
