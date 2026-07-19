"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Inbox, MessageSquare, Sparkles, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string; icon: LucideIcon };

const items: NavItem[] = [
  { href: "/offene-punkte", label: "Offene Punkte", icon: Inbox },
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/lernen", label: "Lernen", icon: Sparkles },
];

export function CockpitShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="bg-cockpit min-h-dvh md:flex">
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
      </aside>

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
