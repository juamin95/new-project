"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import {
  Inbox,
  MessageSquare,
  Sparkles,
  LogOut,
  MoreVertical,
  User,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavItem = { href: string; label: string; icon: LucideIcon };

const items: NavItem[] = [
  { href: "/offene-punkte", label: "Offene Punkte", icon: Inbox },
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/lernen", label: "Lernen", icon: Sparkles },
];

function AccountMenu({
  trigger,
  align,
  onSignout,
}: {
  trigger: React.ReactNode;
  align: "start" | "end";
  onSignout: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="text-sm font-medium">Gemeinsames Konto</div>
          <div className="text-xs text-muted-foreground">Marvin &amp; Julian</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => onSignout()}
          className="cursor-pointer gap-2 text-destructive focus:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Abmelden
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function CockpitShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  // Abmelden läuft über einen serverseitigen POST; das Formular liegt dauerhaft
  // im DOM (nicht im Dropdown-Portal), damit der Submit nicht abbricht.
  const signoutRef = useRef<HTMLFormElement>(null);
  const signOut = () => signoutRef.current?.requestSubmit();

  return (
    <div className="bg-cockpit min-h-dvh md:flex">
      <form
        ref={signoutRef}
        action="/auth/signout"
        method="post"
        className="hidden"
      />

      {/* Seitenleiste (Desktop) */}
      <aside className="hidden md:flex md:h-dvh md:w-64 md:flex-col md:gap-8 md:border-r md:border-border/70 md:bg-white/55 md:px-4 md:py-7 md:backdrop-blur">
        <Image
          src="/gruenschnitt-logo.png"
          alt="GRÜNSCHNITT — by Marvin Amini"
          width={407}
          height={272}
          priority
          className="h-auto w-40 px-2"
        />
        <nav className="flex flex-col gap-1">
          {items.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(href)
                  ? "bg-secondary text-primary"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <AccountMenu
            align="start"
            onSignout={signOut}
            trigger={
              <button
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
                aria-label="Konto-Menü"
              >
                <User className="h-5 w-5" />
                <span className="flex-1 text-left">Konto</span>
                <MoreVertical className="h-4 w-4" />
              </button>
            }
          />
        </div>
      </aside>

      {/* Konto-Menü (Handy) — oben rechts, überlagert, ohne eigene Kopfzeile */}
      <div
        className="fixed right-3 z-40 md:hidden"
        style={{ top: "calc(env(safe-area-inset-top, 0px) + 0.75rem)" }}
      >
        <AccountMenu
          align="end"
          onSignout={signOut}
          trigger={
            <button
              aria-label="Menü"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-white/85 text-muted-foreground shadow-sm backdrop-blur"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
          }
        />
      </div>

      {/* Inhalt */}
      <main className="min-w-0 flex-1 pb-24 md:h-dvh md:overflow-y-auto md:pb-0">
        {children}
      </main>

      {/* Tab-Leiste (Handy) */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border/70 bg-white/90 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        {items.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-current={isActive(href) ? "page" : undefined}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
              isActive(href) ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Icon className="h-[22px] w-[22px]" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
