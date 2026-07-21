"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, MessageSquare, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { createClient } from "@/lib/supabase/client";
import type { Conversation } from "./types";
import { ConversationPane } from "./conversation";

// Markdown-Zeichen für die einzeilige Vorschau in der Chat-Liste entfernen.
function plainPreview(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_{1,2}([^_]+)_{1,2}/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function zeitLabel(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  if (sameDay)
    return d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
  return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
}

function ConversationList({
  conversations,
  activeId,
  onSelect,
  onNew,
  onDelete,
  loading,
  creating,
}: {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  loading: boolean;
  creating: boolean;
}) {
  return (
    <div className="px-4 pb-6 pt-6">
      <h1 className="text-2xl font-bold">Chat</h1>
      <p className="mt-1 text-xs text-muted-foreground">
        Gespräche werden gespeichert und auf deinen Geräten synchronisiert.
      </p>

      <button
        onClick={onNew}
        disabled={creating}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
      >
        <Plus className="h-4 w-4" /> Neuer Chat
      </button>

      <div className="mt-3 space-y-2">
        {loading && (
          <div className="py-8 text-center text-sm text-muted-foreground">
            Wird geladen …
          </div>
        )}
        {!loading && conversations.length === 0 && (
          <div className="rounded-xl border border-dashed border-border bg-white/60 px-4 py-8 text-center text-sm text-muted-foreground">
            Noch keine Gespräche. Starte einen neuen Chat.
          </div>
        )}
        {conversations.map((c) => (
          <div
            key={c.id}
            className={cn(
              "relative rounded-xl border transition-colors",
              activeId === c.id
                ? "border-primary/40 bg-secondary/60"
                : "border-border/70 bg-white hover:bg-secondary/40",
            )}
          >
            <button
              onClick={() => onSelect(c.id)}
              className="flex w-full items-start gap-3 p-3 pr-11 text-left"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <MessageSquare className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="truncate font-semibold">{c.title}</span>
                  <span className="shrink-0 text-[11px] text-muted-foreground">
                    {zeitLabel(c.updated_at)}
                  </span>
                </span>
                <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                  {plainPreview(c.last_preview) || "Neues Gespräch"}
                </span>
              </span>
            </button>
            <button
              onClick={() => onDelete(c.id)}
              aria-label="Chat löschen"
              title="Chat löschen"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg p-2 text-muted-foreground/70 transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChatView() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const load = useCallback(() => {
    fetch("/api/conversations")
      .then((r) => r.json())
      .then((d) => setConversations(d.conversations ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setMounted(true);
    load();
  }, [load]);

  // Liste geräteübergreifend aktuell halten (Vorschau/Reihenfolge)
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("cockpit-convs")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cockpit_conversations" },
        () => load(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [load]);

  async function newChat() {
    if (creating) return;
    setCreating(true);
    try {
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scope: "allgemein" }),
      });
      const d = await res.json();
      if (d.conversation) {
        setConversations((cs) => [d.conversation, ...cs]);
        setActiveId(d.conversation.id);
      }
    } finally {
      setCreating(false);
    }
  }

  async function deleteChat(id: string) {
    if (
      !window.confirm(
        "Diesen Chat wirklich löschen? Nachrichten und Anhänge werden entfernt — das lässt sich nicht rückgängig machen.",
      )
    )
      return;
    // Optimistisch entfernen; Realtime/Reload gleicht den echten Stand ab.
    setConversations((cs) => cs.filter((c) => c.id !== id));
    setActiveId((cur) => (cur === id ? null : cur));
    try {
      const res = await fetch(`/api/conversations/${id}`, { method: "DELETE" });
      if (!res.ok) load();
    } catch {
      load();
    }
  }

  const active = conversations.find((c) => c.id === activeId) ?? null;

  // Vor dem Mounten und am Handy: Liste (fließt), Gespräch als Vollbild-Overlay.
  if (!mounted || isMobile) {
    return (
      <>
        <ConversationList
          conversations={conversations}
          activeId={activeId}
          onSelect={setActiveId}
          onNew={newChat}
          onDelete={deleteChat}
          loading={loading}
          creating={creating}
        />
        {mounted && active && (
          <div className="fixed inset-0 z-50 bg-background">
            <ConversationPane
              conversation={active}
              showBack
              onBack={() => setActiveId(null)}
            />
          </div>
        )}
      </>
    );
  }

  // Desktop: zwei Spalten
  const shown = active ?? conversations[0] ?? null;
  return (
    <div className="flex h-full">
      <div className="w-80 shrink-0 overflow-y-auto border-r border-border/70 bg-white/50">
        <ConversationList
          conversations={conversations}
          activeId={shown?.id ?? null}
          onSelect={setActiveId}
          onNew={newChat}
          onDelete={deleteChat}
          loading={loading}
          creating={creating}
        />
      </div>
      <div className="min-w-0 flex-1">
        {shown ? (
          <ConversationPane conversation={shown} />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-foreground">
            {loading ? "Wird geladen …" : "Wähle links ein Gespräch oder starte einen neuen Chat."}
          </div>
        )}
      </div>
    </div>
  );
}
