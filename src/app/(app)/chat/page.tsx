import { MessageSquare } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 pt-6 md:pt-9">
      <header className="pb-5">
        <h1 className="text-2xl font-bold">Chat</h1>
      </header>

      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-white/70 px-6 py-14 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary">
          <MessageSquare className="h-7 w-7" />
        </div>
        <h2 className="text-lg font-semibold">Bald verfügbar</h2>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Hier führst du Gespräche mit dem OS — in Alltagssprache, je Kunde ein
          eigener Chat mit Kontext. Eingabe per Text, Bild oder Sprachmemo.
        </p>
      </div>
    </div>
  );
}
