"use client";

import { useEffect, useState } from "react";
import { Plus, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { seedConversations, type Conversation } from "./mock-data";
import { ConversationPane } from "./conversation";

let newCounter = 1;

function ConversationList({
  conversations,
  activeId,
  onSelect,
  onNew,
}: {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
}) {
  return (
    <div className="px-4 pb-6 pt-6">
      <h1 className="text-2xl font-bold">Chat</h1>
      <p className="mt-1 text-xs text-muted-foreground">
        Vorschau — der OS-Agent wird im nächsten Schritt angebunden; Antworten
        sind Beispiele.
      </p>

      <button
        onClick={onNew}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
      >
        <Plus className="h-4 w-4" /> Neuer Chat
      </button>

      <div className="mt-3 space-y-2">
        {conversations.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={cn(
              "flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors",
              activeId === c.id
                ? "border-primary/40 bg-secondary/60"
                : "border-border/70 bg-white hover:bg-secondary/40",
            )}
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
              <MessageSquare className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-2">
                <span className="truncate font-semibold">{c.title}</span>
                <span className="shrink-0 text-[11px] text-muted-foreground">
                  {c.zeit}
                </span>
              </span>
              <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                {c.preview || "Neues Gespräch"}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ChatView() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>(seedConversations);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  function newChat() {
    const id = `neu-${newCounter++}`;
    const conv: Conversation = {
      id,
      title: "Neuer Chat",
      scope: "allgemein",
      preview: "",
      zeit: "jetzt",
      messages: [],
    };
    setConversations((cs) => [conv, ...cs]);
    setActiveId(id);
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

  // Desktop: zwei Spalten (Liste scrollt links, Gespräch rechts)
  const shown = active ?? conversations[0];
  return (
    <div className="flex h-full">
      <div className="w-80 shrink-0 overflow-y-auto border-r border-border/70 bg-white/50">
        <ConversationList
          conversations={conversations}
          activeId={shown?.id ?? null}
          onSelect={setActiveId}
          onNew={newChat}
        />
      </div>
      <div className="min-w-0 flex-1">
        {shown && <ConversationPane conversation={shown} />}
      </div>
    </div>
  );
}
