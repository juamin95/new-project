"use client";

import { useEffect, useRef, useState } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { ChatMessage, Conversation, TerminDraft } from "./mock-data";

let idCounter = 1000;
const nextId = () => `m${idCounter++}`;

function ScopeBadge({ conversation }: { conversation: Conversation }) {
  const label =
    conversation.scope === "allgemein"
      ? "Allgemein"
      : conversation.scope === "kunde"
        ? "Kunde"
        : "Projekt";
  return (
    <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold text-primary">
      {label}
    </span>
  );
}

function TerminCard({
  termin,
  onConfirm,
}: {
  termin: TerminDraft;
  onConfirm: () => void;
}) {
  const confirmed = termin.status === "bestaetigt";
  return (
    <div className="mt-2 w-full max-w-[19rem] rounded-2xl border border-primary/25 bg-secondary/60 p-3">
      <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-primary">
        <CalendarClock className="h-3.5 w-3.5" />
        {confirmed ? "Termin angelegt" : "Termin-Vorschlag"}
      </div>
      <dl className="space-y-1 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Datum</dt>
          <dd className="font-medium">{termin.datum}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Uhrzeit</dt>
          <dd className="font-medium">{termin.uhrzeit}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Kunde/Projekt</dt>
          <dd className="font-medium">{termin.bezug}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Notiz</dt>
          <dd className="font-medium">{termin.notiz}</dd>
        </div>
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
        <div
          key={i}
          className="flex items-center gap-1.5 text-[11px] text-muted-foreground"
        >
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
        {!isUser && message.thinking && <ThinkingSteps steps={message.thinking} />}
        {message.image && (
          <Image
            src={message.image}
            alt="Angehängtes Bild"
            width={220}
            height={160}
            className="mb-1 h-auto w-40 rounded-xl border border-border object-cover"
            unoptimized
          />
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
            {message.text}
          </div>
        )}
        {message.termin && (
          <TerminCard
            termin={message.termin}
            onConfirm={() => onConfirmTermin(message.id)}
          />
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
}: {
  conversation: Conversation;
  showBack?: boolean;
  onBack?: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(conversation.messages);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [recording, setRecording] = useState(false);
  const [attached, setAttached] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMessages(conversation.messages);
    setInput("");
    setAttached(null);
    setRecording(false);
  }, [conversation.id, conversation.messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  function autosize() {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 128) + "px";
  }

  function send() {
    const text = input.trim();
    if (!text && !attached) return;
    const wantsTermin = /termin/i.test(text);
    setMessages((m) => [
      ...m,
      { id: nextId(), role: "user", text: text || undefined, image: attached || undefined },
    ]);
    setInput("");
    setAttached(null);
    if (taRef.current) taRef.current.style.height = "auto";
    setThinking(true);

    window.setTimeout(() => {
      setThinking(false);
      const reply: ChatMessage = wantsTermin
        ? {
            id: nextId(),
            role: "assistant",
            text: "Ich habe einen Termin vorbereitet — bitte prüfen:",
            thinking: ["Kunde in Hero suchen", "Freien Slot prüfen"],
            termin: {
              datum: "Do, 24. Juli",
              uhrzeit: "08:00",
              bezug: conversation.bezug ?? "—",
              notiz: text || "—",
              status: "vorschlag",
            },
          }
        : {
            id: nextId(),
            role: "assistant",
            text: "(Beispielantwort) Sobald der OS-Agent angebunden ist, beantworte ich das aus Vault und Hero.",
            thinking: ["Vault durchsuchen", "Hero lesen"],
          };
      setMessages((m) => [...m, reply]);
    }, 1300);
  }

  function confirmTermin(msgId: string) {
    setMessages((m) =>
      m.map((x) =>
        x.id === msgId && x.termin
          ? { ...x, termin: { ...x.termin, status: "bestaetigt" } }
          : x,
      ),
    );
    setMessages((m) => [
      ...m,
      { id: nextId(), role: "assistant", text: "Termin ist in Hero angelegt. Alles erledigt." },
    ]);
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
    // Mock-Transkription: erkannter Text landet bearbeitbar im Eingabefeld.
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
        <ScopeBadge conversation={conversation} />
      </div>

      {/* Verlauf */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className="mx-auto flex max-w-2xl flex-col gap-3">
          {messages.length === 0 && (
            <div className="mt-10 text-center text-sm text-muted-foreground">
              Stell dem OS eine Frage, hänge ein Foto an oder diktier eine
              Sprachmemo.
            </div>
          )}
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} onConfirmTermin={confirmTermin} />
          ))}
          {thinking && <TypingBubble />}
          <div ref={endRef} />
        </div>
      </div>

      {/* Eingabeleiste */}
      <div className="border-t border-border/70 bg-white px-3 pt-2 pb-[calc(env(safe-area-inset-bottom,0px)+0.5rem)]">
        <div className="mx-auto max-w-2xl">
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
              <button
                onClick={() => setAttached(null)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" /> Bild entfernen
              </button>
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
              aria-label="Senden"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-90"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
