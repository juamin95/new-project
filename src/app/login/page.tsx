"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Lock, MailCheck, TriangleAlert } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Status = "idle" | "sending" | "sent" | "ratelimit";

function LoginInner() {
  const params = useSearchParams();
  const linkError = params.get("fehler") === "link";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "sending") return;
    setStatus("sending");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    // Zu viele Versuche sichtbar machen; sonst immer dieselbe neutrale Bestätigung
    // (keine Auskunft, welche Adresse zum Cockpit gehört).
    if (error && error.status === 429) {
      setStatus("ratelimit");
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary">
          <MailCheck className="h-7 w-7" />
        </div>
        <h1 className="font-serif text-2xl font-bold">Schau in dein Postfach</h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Wenn die Adresse zum Cockpit gehört, ist ein Anmelde-Link unterwegs.
          Öffne ihn auf diesem Gerät, dann bist du drin.
        </p>
        <Button
          variant="ghost"
          className="text-primary"
          onClick={() => setStatus("idle")}
        >
          Andere Adresse verwenden
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-3 text-center">
        <Image
          src="/gruenschnitt-logo.png"
          alt="GRÜNSCHNITT — by Marvin Amini"
          width={407}
          height={272}
          priority
          className="h-auto w-44"
        />
        <h1 className="font-serif text-2xl font-bold">Willkommen im Cockpit</h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Melde dich mit deiner E-Mail an. Du bekommst einen Anmelde-Link — kein
          Passwort nötig.
        </p>
      </div>

      {linkError && (
        <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Der Link ist abgelaufen oder wurde schon benutzt. Fordere einfach
            einen neuen an.
          </span>
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">E-Mail</Label>
          <Input
            id="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder="name@gruenschnitt-amini.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Wird gesendet …" : "Link anfordern"}
        </Button>

        {status === "ratelimit" && (
          <p className="text-center text-sm text-muted-foreground">
            Zu viele Versuche in kurzer Zeit. Bitte einen Moment warten und
            erneut versuchen.
          </p>
        )}

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Lock className="h-3.5 w-3.5" />
          Nur für Marvin und Julian.
        </div>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="bg-cockpit flex min-h-dvh items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Suspense fallback={null}>
          <LoginInner />
        </Suspense>
      </div>
    </main>
  );
}
