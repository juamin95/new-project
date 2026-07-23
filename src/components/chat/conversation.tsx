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
  FolderPlus,
} from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/client";
import type {
  ChatMessage,
  Conversation,
  Scope,
  TerminDraft,
  TerminVorschlag,
  ProjektVorschlag,
  ZuordnungVorschlag,
} from "./types";

const KATEGORIE_LABEL: Record<string, string> = {
  umsetzung: "Umsetzung",
  "vor-ort-termin": "Vor-Ort-Termin",
  schlechtwetter: "Schlechtwetter",
  buero: "Büro",
  besprechung: "Besprechung",
  schule: "Schule",
};

const GEWERK_LABEL: Record<string, string> = {
  gartengestaltung: "Gartengestaltung",
  gartenpflege: "Gartenpflege",
  abo: "Gartenpflege (Abo)",
  unbekannt: "Unbekannt",
};

const PROJEKTTYP_LABEL: Record<string, string> = {
  projekt: "Mit Angebot",
  "ohne-angebot": "Ohne Angebot",
  abo: "Abo",
};

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

// Bild aus dem privaten Bucket über eine kurzlebige signierte URL anzeigen.
function ChatImage({ path }: { path: string }) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    createClient()
      .storage.from("cockpit-bilder")
      .createSignedUrl(path, 3600)
      .then(({ data }) => {
        if (active && data?.signedUrl) setUrl(data.signedUrl);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [path]);
  if (!url) {
    return <div className="mb-1 h-40 w-40 animate-pulse rounded-xl bg-secondary" />;
  }
  return (
    <Image
      src={url}
      alt="Angehängtes Bild"
      width={240}
      height={240}
      unoptimized
      className="mb-1 max-h-60 w-auto rounded-xl border border-border object-cover"
    />
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
        {message.image_path && <ChatImage path={message.image_path} />}
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
  const [transcribing, setTranscribing] = useState(false);
  const [attached, setAttached] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [zuordnung, setZuordnung] = useState<ZuordnungVorschlag | null>(null);
  const [assigning, setAssigning] = useState(false);
  const [termin, setTermin] = useState<TerminVorschlag | null>(null);
  const [terminBusy, setTerminBusy] = useState(false);
  const [terminMsg, setTerminMsg] = useState<string | null>(null);
  const [terminDone, setTerminDone] = useState(false);
  const [projekt, setProjekt] = useState<ProjektVorschlag | null>(null);
  const [projektBusy, setProjektBusy] = useState(false);
  const [projektMsg, setProjektMsg] = useState<string | null>(null);
  const [projektDone, setProjektDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const stopWantedRef = useRef(false);

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
    const file = attachedFile;
    if ((!text && !file) || sending) return;
    setError(null);
    setInput("");
    setAttached(null);
    setAttachedFile(null);
    if (taRef.current) taRef.current.style.height = "auto";
    setSending(true);
    try {
      // Bild (falls angehängt) in den privaten Bucket laden -> Pfad an die Nachricht.
      let imagePath: string | null = null;
      if (file) {
        const supabase = createClient();
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const path = `${conversation.id}/${crypto.randomUUID()}.${ext}`;
        const up = await supabase.storage
          .from("cockpit-bilder")
          .upload(path, file, { contentType: file.type || "image/jpeg" });
        if (up.error) throw new Error("upload");
        imagePath = path;
      }
      const res = await fetch(`/api/conversations/${conversation.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text || undefined, image_path: imagePath }),
      });
      if (!res.ok) throw new Error();
      const d = await res.json();
      addMessage(d.userMessage);
      addMessage(d.assistantMessage);
      if (d.zuordnung) setZuordnung(d.zuordnung); // Pop-up zum Bestätigen
      if (d.termin) {
        setTerminMsg(null);
        setTerminDone(false);
        setTermin(d.termin);
      }
      if (d.projekt) {
        setProjektMsg(null);
        setProjektDone(false);
        setProjekt(d.projekt);
      }
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

  // Termin-Vorschlag bestätigen -> nach Freigabe echt in Hero anlegen (Gate).
  async function bestaetigeTermin() {
    if (!termin || terminBusy) return;
    setTerminBusy(true);
    setTerminMsg(null);
    try {
      const res = await fetch(`/api/conversations/${conversation.id}/termin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(termin),
      });
      const d = await res.json().catch(() => ({}));
      if (res.ok && d.ok) {
        setTerminDone(true);
      } else {
        setTerminMsg(d.error ?? "Konnte den Termin nicht anlegen.");
      }
    } catch {
      setTerminMsg("Konnte den Termin nicht anlegen.");
    } finally {
      setTerminBusy(false);
    }
  }

  // „Anpassen": Vorschlag verwerfen und ins Eingabefeld springen, damit Marvin
  // die Änderung im Chat ansagt (der Agent schlägt dann neu vor).
  function anpassenTermin() {
    setTermin(null);
    setTerminMsg(null);
    setTerminDone(false);
    setTimeout(() => taRef.current?.focus(), 0);
  }

  // Projekt-Vorschlag bestätigen -> nach Freigabe echt in Hero anlegen (Gate).
  async function bestaetigeProjekt() {
    if (!projekt || projektBusy) return;
    setProjektBusy(true);
    setProjektMsg(null);
    try {
      const res = await fetch(`/api/conversations/${conversation.id}/projekt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projekt),
      });
      const d = await res.json().catch(() => ({}));
      if (res.ok && d.ok) {
        setProjektDone(true);
      } else {
        setProjektMsg(d.error ?? "Konnte das Projekt nicht anlegen.");
      }
    } catch {
      setProjektMsg("Konnte das Projekt nicht anlegen.");
    } finally {
      setProjektBusy(false);
    }
  }

  function anpassenProjekt() {
    setProjekt(null);
    setProjektMsg(null);
    setProjektDone(false);
    setTimeout(() => taRef.current?.focus(), 0);
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
    if (file) {
      setAttachedFile(file);
      setAttached(URL.createObjectURL(file));
    }
    e.target.value = "";
  }

  // Sprachmemo: gedrückt halten = aufnehmen; loslassen = stoppen + transkribieren.
  async function startRecording(e: React.PointerEvent<HTMLButtonElement>) {
    e.preventDefault();
    const btn = e.currentTarget;
    const pid = e.pointerId;
    btn.setPointerCapture?.(pid);
    stopWantedRef.current = false;
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Nutzer hat schon losgelassen, bevor die Freigabe kam:
      if (stopWantedRef.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (ev) => {
        if (ev.data.size > 0) chunksRef.current.push(ev.data);
      };
      mr.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: mr.mimeType || "audio/webm" });
        if (blob.size === 0) return;
        setTranscribing(true);
        try {
          const res = await fetch("/api/transcribe", {
            method: "POST",
            headers: { "Content-Type": blob.type },
            body: blob,
          });
          const d = await res.json().catch(() => ({}));
          if (res.ok && d.text) {
            setInput((v) => (v ? v + " " : "") + d.text);
            setTimeout(autosize, 0);
          } else {
            setError("Transkription hat nicht geklappt. Bitte tippen oder erneut aufnehmen.");
          }
        } catch {
          setError("Transkription hat nicht geklappt.");
        } finally {
          setTranscribing(false);
        }
      };
      mediaRef.current = mr;
      mr.start();
      setRecording(true);
    } catch {
      setRecording(false);
      setError("Mikrofon nicht verfügbar. Bitte den Zugriff erlauben.");
    }
  }

  function stopRecording() {
    stopWantedRef.current = true;
    setRecording(false);
    const mr = mediaRef.current;
    mediaRef.current = null;
    if (mr && mr.state !== "inactive") mr.stop();
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
          <div className="truncate text-xs text-primary">
            {conversation.scope === "projekt" && conversation.status_label
              ? conversation.step_index && conversation.step_total
                ? `${conversation.status_label} · ${conversation.step_index}/${conversation.step_total}`
                : conversation.status_label
              : "Kontext aktiv"}
          </div>
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
              <button
                onClick={() => {
                  setAttached(null);
                  setAttachedFile(null);
                }}
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
          {transcribing && (
            <div className="mb-2 flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-sm text-primary">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
              Wird transkribiert …
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

      {/* Zuordnungs-Pop-up (PROJ-17): Vorschlag des Agenten bestätigen — zentriert */}
      <Dialog open={!!zuordnung} onOpenChange={(o) => !o && setZuordnung(null)}>
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Link2 className="h-4 w-4 text-primary" /> Zuordnung vorgeschlagen
            </DialogTitle>
            <DialogDescription>
              Das OS ordnet diesen Chat zu. Bitte bestätigen — nichts wird ohne
              dich verknüpft.
            </DialogDescription>
          </DialogHeader>
          {zuordnung && (
            <div className="rounded-xl border border-primary/25 bg-secondary/50 p-3 text-sm">
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
          <div className="flex gap-2">
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
          </div>
        </DialogContent>
      </Dialog>

      {/* Termin-Pop-up (PROJ-10 Etappe 3): Vorschlag bestätigen -> Hero */}
      <Dialog
        open={!!termin}
        onOpenChange={(o) => {
          if (!o) {
            setTermin(null);
            setTerminMsg(null);
            setTerminDone(false);
          }
        }}
      >
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-primary" /> Termin anlegen?
            </DialogTitle>
            <DialogDescription>
              Vorschlag des OS — wird erst nach deiner Bestätigung in Hero eingetragen.
            </DialogDescription>
          </DialogHeader>
          {termin && (
            <div className="space-y-1 rounded-xl border border-primary/25 bg-secondary/50 p-3 text-sm">
              {(
                [
                  ["Titel", termin.titel],
                  ["Von", termin.von],
                  ["Bis", termin.bis],
                  ["Kategorie", KATEGORIE_LABEL[termin.kategorie] ?? termin.kategorie],
                  ...(termin.bezug ? [["Bezug", termin.bezug]] : []),
                  ...(termin.beschreibung ? [["Notiz", termin.beschreibung]] : []),
                ] as [string, string][]
              ).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <span className="shrink-0 text-muted-foreground">{k}</span>
                  <span className="text-right font-medium">{v}</span>
                </div>
              ))}
            </div>
          )}
          {terminDone ? (
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
                <Check className="h-4 w-4" /> In Hero angelegt
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setTermin(null);
                  setTerminDone(false);
                }}
              >
                Schließen
              </Button>
            </div>
          ) : (
            <>
              {terminMsg && (
                <div className="text-xs text-destructive">{terminMsg}</div>
              )}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setTermin(null)}
                  disabled={terminBusy}
                >
                  Ablehnen
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={anpassenTermin}
                  disabled={terminBusy}
                >
                  Anpassen
                </Button>
                <Button
                  className="flex-1"
                  onClick={bestaetigeTermin}
                  disabled={terminBusy}
                >
                  {terminBusy ? "…" : "Bestätigen"}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Projekt-Pop-up (PROJ-10 Etappe 3+): Vorschlag bestätigen -> Hero */}
      <Dialog
        open={!!projekt}
        onOpenChange={(o) => {
          if (!o) {
            setProjekt(null);
            setProjektMsg(null);
            setProjektDone(false);
          }
        }}
      >
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FolderPlus className="h-4 w-4 text-primary" /> Projekt anlegen?
            </DialogTitle>
            <DialogDescription>
              Vorschlag des OS — wird erst nach deiner Bestätigung in Hero angelegt.
            </DialogDescription>
          </DialogHeader>
          {projekt && (
            <div className="space-y-1 rounded-xl border border-primary/25 bg-secondary/50 p-3 text-sm">
              {(
                [
                  ["Name", projekt.name],
                  ...(projekt.bezug ? [["Kunde", projekt.bezug]] : []),
                  ...(projekt.gewerk
                    ? [["Gewerk", GEWERK_LABEL[projekt.gewerk] ?? projekt.gewerk]]
                    : []),
                  ...(projekt.projekttyp
                    ? [["Typ", PROJEKTTYP_LABEL[projekt.projekttyp] ?? projekt.projekttyp]]
                    : []),
                ] as [string, string][]
              ).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <span className="shrink-0 text-muted-foreground">{k}</span>
                  <span className="text-right font-medium">{v}</span>
                </div>
              ))}
            </div>
          )}
          {projektDone ? (
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
                <Check className="h-4 w-4" /> In Hero angelegt
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setProjekt(null);
                  setProjektDone(false);
                }}
              >
                Schließen
              </Button>
            </div>
          ) : (
            <>
              {projektMsg && (
                <div className="text-xs text-destructive">{projektMsg}</div>
              )}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setProjekt(null)}
                  disabled={projektBusy}
                >
                  Ablehnen
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={anpassenProjekt}
                  disabled={projektBusy}
                >
                  Anpassen
                </Button>
                <Button
                  className="flex-1"
                  onClick={bestaetigeProjekt}
                  disabled={projektBusy}
                >
                  {projektBusy ? "…" : "Bestätigen"}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
