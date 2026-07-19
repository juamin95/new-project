import { Inbox } from "lucide-react";

export default function OffenePunktePage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 pt-6 md:pt-9">
      <header className="pb-5">
        <h1 className="text-2xl font-bold">Offene Punkte</h1>
      </header>

      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-white/70 px-6 py-14 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary">
          <Inbox className="h-7 w-7" />
        </div>
        <h2 className="text-lg font-semibold">Noch keine offenen Punkte</h2>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Sobald das OS etwas erkennt — ein Angebot zum Freigeben, eine neue
          Anfrage zum Zuordnen oder eine Rückmeldung — taucht es hier auf. Du
          entscheidest dann: freigeben, anpassen oder im Chat besprechen.
        </p>
      </div>
    </div>
  );
}
