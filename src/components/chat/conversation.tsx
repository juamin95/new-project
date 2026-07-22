"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ImagePlus,
  Mic,
  Send,
  Lightbulb,
  Check,
  CalendarClock,
  X,
  Link2,
} from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { createClient } from "@/lib/supabase/client";
import type {
  ChatMessage,
  Conversation,
  Scope,
  TerminDraft,
  ZuordnungVorschlag,
} from "./types";

function ScopeBadge({ scope }: { scope: Scope }) {
  const label =
    scope === "allgemein" ? "Allgemein" : scope === "kunde" ? "Kunde" : "Projekt";
  return (
    <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold text-primary">
      {label}
    </span>
  );
}

function TerminCard({ termin, onConfirm }: { termin: TerminDraft; onConfirm: () => void }) {
  const confirmed = termin.status === "bestaetigt";
  return (
    <div className="mt-2 w-full max-w-[19rem] rounded-2xl border border-primary/25 bg-secondary/60 p-3">
      <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-primary">
        <CalendarClock className="h-3.5 w-3.5" />
        {confirmed ? "Termin angelegt" : "Termin-Vorschlag"}
      </div>
      <dl className="space-y-1 text-sm">
        {[
          ["Datum", termin.datum],
          ["Uhrzeit", termin.uhrzeit],
          ["Kunde/Projekt", termin.bezug],
          ["Notiz", termin.notiz],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="font-medium">{v}</dd>
          </div>
        ))}
      </dl>
      {confirmed ? (
        <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary">
          <Check className="h-4 w-4" /> In Hero angelegt
        </div>
      ) : (
        <div className="mt-3 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            Anpassen
          </Button>
          <Button size="sm" className="flex-1" onClick={onConfirm}>
            Bestätigen
          </Button>
        </div>
      )}
      <p className="mt-2 text-[11px] text-muted-foreground">
        Nur ein Vorschlag — nichts geht ohne dich in Hero.
      </p>
    </div>
  );
}

function ThinkingSteps({ steps }: { steps: string[] }) {
  return (
    <div className="mb-1.5 flex flex-col gap-1">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Lightbulb className="h-3 w-3 text-primary/70" />
          {s}
        </div>
      ))}
    </div>
  );
}

function MessageBubble({
  message,
  onConfirmTermin,
}: {
  message: ChatMessage;
  onConfirmTermin: (id: string) => void;
}) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div className={cn("max-w-[85%]", isUser && "flex flex-col items-end")}>
        {!isUser && message.thinking && message.thinking.length > 0 && (
          <ThinkingSteps steps={message.thinking} />
        )}
        {message.text && (
          <div
            className={cn(
              "rounded-2xl px-3 py-2 text-sm leading-relaxed",
              isUser
                ? "rounded-br-md bg-primary text-primary-foreground"
                : "rounded-bl-md border border-border bg-white",
            )}
          >
            {isUser ? (
              message.text
            ) : (
              <div className="[overflow-wrap:anywhere]">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ node, ...p }) => (
                      <h3 className="mb-1 mt-3 font-serif text-base font-bold text-primary first:mt-0" {...p} />
                    ),
                    h2: ({ node, ...p }) => (
                      <h3 className="mb-1 mt-3 font-serif text-base font-bold text-primary first:mt-0" {...p} />
                    ),
                    h3: ({ node, ...p }) => (
                      <h4 className="mb-1 mt-2 font-serif text-[15px] font-bold text-primary first:mt-0" {...p} />
                    ),
                    p: ({ node, ...p }) => (
                      <p className="my-2 first:mt-0 last:mb-0" {...p} />
                    ),
                    ul: ({ node, ...p }) => (
                      <ul className="my-2 list-disc space-y-1 pl-5 marker:text-primary" {...p} />
                    ),
                    ol: ({ node, ...p }) => (
                      <ol className="my-2 list-decimal space-y-1 pl-5 marker:text-primary" {...p} />
                    ),
                    li: ({ node, ...p }) => <li className="pl-1" {...p} />,
                    strong: ({ node, ...p }) => (
                      <strong className="font-bold text-primary" {...p} />
                    ),
                    a: ({ node, ...p }) => (
                      <a className="text-primary underline" {...p} />
                    ),
                    code: ({ node, ...p }) => (
                      <code className="rounded bg-secondary px-1 py-0.5 text-[0.8em]" {...p} />
                    ),
                    blockquote: ({ node, ...p }) => (
                      <blockquote className="my-2 border-l-2 border-primary/40 pl-3 text-muted-foreground" {...p} />
                    ),
                  }}
                >
                  {message.text}
                </Markdown>
              </div>
            )}
          </div>
        )}
        {message.termin && (
          <TerminCard termin={message.termin} onConfirm={() => onConfirmTermin(message.id)} />
        )}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border bg-white px-3 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2 w-2 animate-bounce rounded-full bg-primary/50"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export function ConversationPane({
  conversation,
  showBack = false,
  onBack,
  onAssigned,
}: {
  conversation: Conversation;
  showBack?: boolean;
  onBack?: () => void;
  onAssigned?: (conversation: Conversation) => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [recording, setRecording] = useState(false);
  const [attached, setAttached] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [zuordnung, setZuordnung] = useState<ZuordnungVorschlag | null>(null);
  const [assigning, setAssigning] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  const addMessage = useCallback((msg: ChatMessage) => {
    setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));
  }, []);

  // Nachrichten laden + Live-Abo (geräteübergreifend)
  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/conversations/${conversation.id}/messages`)
      .then((r) => r.json())
      .then((d) => {
        if (active) setMessages(d.messages ?? []);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });

    const supabase = createClient();
    const channel = supabase
      .channel(`msgs-${conversation.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "cockpit_messages",
          filter: `conversation_id=eq.${conversation.id}`,
        },
        (payload) => addMessage(payload.new as ChatMessage),
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [conversation.id, addMessage]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  function autosize() {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 128) + "px";
  }

  async function send() {
    const text = input.trim();
    if (!text || sending) return;
    setError(null);
    setInput("");
    setAttached(null);
    if (taRef.current) taRef.current.style.height = "auto";
    setSending(true);
    try {
      const res = await fetch(`/api/conversations/${conversation.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error();
      const d = await res.json();
      addMessage(d.userMessage);
      addMessage(d.assistantMessage);
      if (d.zuordnung) setZuordnung(d.zuordnung); // Pop-up zum Bestätigen
    } catch {
      setError("Konnte nicht senden. Bitte gleich noch einmal versuchen.");
      setInput(text);
    } finally {
      setSending(false);
    }
  }

  // Zuordnungs-Vorschlag bestätigen -> in Supabase am Gespräch speichern (PATCH).
  async function confirmZuordnung() {
    if (!zuordnung || assigning) return;
    setAssigning(true);
    try {
      const body =
        zuordnung.scope === "projekt"
          ? { scope: "projekt", title: zuordnung.titel, hero_project_nr: zuordnung.projekt_nr ?? null }
          : { scope: "kunde", title: zuordnung.titel, hero_customer_id: zuordnung.kunde_id ?? null };
      const res = await fetch(`/api/conversations/${conversation.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const d = await res.json();
        if (d.conversation) onAssigned?.(d.conversation);
      }
    } finally {
      setAssigning(false);
      setZuordnung(null);
    }
  }

  function confirmTermin(msgId: string) {
    setMessages((m) =>
      m.map((x) =>
        x.id === msgId && x.termin
          ? { ...x, termin: { ...x.termin, status: "bestaetigt" } }
          : x,
      ),
    );
  }

  function onPickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setAttached(URL.createObjectURL(file));
    e.target.value = "";
  }

  function startRecording(e: React.PointerEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setRecording(true);
  }

  function stopRecording() {
    if (!recording) return;
    setRecording(false);
    // Mock-Transkription (echte Whisper-Anbindung kommt in Etappe 3):
    setInput((v) => (v ? v + " " : "") + "Ich brauche nächste Woche einen Termin bei …");
    setTimeout(autosize, 0);
  }

  return (
    <div className="flex h-full flex-col bg-cockpit">
      {/* Kopf */}
      <div
        className="flex items-center gap-3 border-b border-border/70 bg-white/80 px-3 py-3 backdrop-blur"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 0.75rem)" }}
      >
        {showBack && (
          <button
            onClick={onBack}
            aria-label="Zurück"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-secondary"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <div className="min-w-0 flex-1">
          <div className="truncate font-semibold">{conversation.title}</div>
          <div className="text-xs text-primary">Kontext aktiv</div>
        </div>
        <ScopeBadge scope={conversation.scope} />
      </div>

      {/* Verlauf */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className="mx-auto flex max-w-2xl flex-col gap-3">
          {!loading && messages.length === 0 && (
            <div className="mt-10 text-center text-sm text-muted-foreground">
              Stell dem OS eine Frage, hänge ein Foto an oder halte das Mikrofon
              gedrückt für eine Sprachmemo.
            </div>
          )}
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} onConfirmTermin={confirmTermin} />
          ))}
          {sending && <TypingBubble />}
          <div ref={endRef} />
        </div>
      </div>

      {/* Eingabeleiste */}
      <div className="border-t border-border/70 bg-white px-3 pt-2 pb-[calc(env(safe-area-inset-bottom,0px)+0.5rem)]">
        <div className="mx-auto max-w-2xl">
          {error && (
            <div className="mb-2 text-center text-xs text-destructive">{error}</div>
          )}
          {attached && (
            <div className="mb-2 flex items-center gap-2">
              <Image
                src={attached}
                alt="Vorschau"
                width={48}
                height={48}
                unoptimized
                className="h-12 w-12 rounded-lg border border-border object-cover"
              />
              <div className="flex flex-col">
                <button
                  onClick={() => setAttached(null)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" /> Bild entfernen
                </button>
                <span className="text-[11px] text-muted-foreground">
                  Bild-Upload folgt (Etappe 3) — jetzt wird nur der Text gesendet.
                </span>
              </div>
            </div>
          )}
          {recording && (
            <div className="mb-2 flex items-center gap-2 rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-destructive" />
              Aufnahme läuft — zum Stoppen loslassen
            </div>
          )}
          <div className="flex items-end gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onPickImage}
            />
            <button
              onClick={() => fileRef.current?.click()}
              aria-label="Bild anhängen"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-primary hover:bg-secondary"
            >
              <ImagePlus className="h-5 w-5" />
            </button>
            <textarea
              ref={taRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                autosize();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={1}
              placeholder="Nachricht schreiben …"
              className="max-h-32 flex-1 resize-none rounded-2xl border border-border bg-secondary/40 px-3 py-2.5 text-sm outline-none focus:border-primary/40"
            />
            <button
              onPointerDown={startRecording}
              onPointerUp={stopRecording}
              onPointerCancel={stopRecording}
              onContextMenu={(e) => e.preventDefault()}
              aria-label="Sprachmemo — gedrückt halten"
              title="Gedrückt halten zum Aufnehmen"
              className={cn(
                "flex h-10 w-10 shrink-0 touch-none select-none items-center justify-center rounded-full border transition-colors",
                recording
                  ? "animate-pulse border-destructive bg-destructive text-white"
                  : "border-border text-primary hover:bg-secondary",
              )}
            >
              <Mic className="h-5 w-5" />
            </button>
            <button
              onClick={send}
              disabled={sending}
              aria-label="Senden"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Zuordnungs-Pop-up (PROJ-17): Vorschlag des Agenten bestätigen */}
      <Sheet open={!!zuordnung} onOpenChange={(o) => !o && setZuordnung(null)}>
        <SheetContent side="bottom" className="rounded-t-2xl">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Link2 className="h-4 w-4 text-primary" /> Zuordnung vorgeschlagen
            </SheetTitle>
            <SheetDescription>
              Das OS ordnet diesen Chat zu. Bitte bestätigen — nichts wird ohne
              dich verknüpft.
            </SheetDescription>
          </SheetHeader>
          {zuordnung && (
            <div className="my-4 rounded-xl border border-primary/25 bg-secondary/50 p-3 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-muted-foreground">
                  {zuordnung.scope === "projekt" ? "Projekt" : "Kunde"}
                </span>
                <span className="font-medium">
                  {zuordnung.scope === "projekt"
                    ? (zuordnung.projekt_nr ?? "—")
                    : (zuordnung.kunde_id ?? "—")}
                </span>
              </div>
              <div className="mt-1 flex justify-between gap-3">
                <span className="text-muted-foreground">Titel</span>
                <span className="font-medium">{zuordnung.titel}</span>
              </div>
            </div>
          )}
          <SheetFooter className="flex-row gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setZuordnung(null)}
              disabled={assigning}
            >
              Ablehnen
            </Button>
            <Button className="flex-1" onClick={confirmZuordnung} disabled={assigning}>
              {assigning ? "Speichere …" : "Bestätigen"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
