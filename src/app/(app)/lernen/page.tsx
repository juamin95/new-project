import { Sparkles, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LernenPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 pt-6 md:pt-9">
      <header className="pb-5">
        <h1 className="text-2xl font-bold">Lernen</h1>
      </header>

      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-white/70 px-6 py-14 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary">
          <Sparkles className="h-7 w-7" />
        </div>
        <h2 className="text-lg font-semibold">Bald verfügbar</h2>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Die Rückschau zeigt später, was das OS aus deinen Entscheidungen
          gelernt hat und welches Wissen es dazugewinnen möchte — damit es
          genauer und zuverlässiger wird.
        </p>
      </div>

      {/* Konto / Abmelden */}
      <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-border bg-white/70 px-4 py-3">
        <div className="text-sm">
          <p className="font-medium">Gemeinsames Cockpit-Konto</p>
          <p className="text-muted-foreground">Marvin &amp; Julian</p>
        </div>
        <form action="/auth/signout" method="post">
          <Button type="submit" variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Abmelden
          </Button>
        </form>
      </div>
    </div>
  );
}
