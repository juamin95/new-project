import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CockpitShell } from "@/components/cockpit-nav";

// Zweite Sicherung zusätzlich zur Middleware: kein Nutzer -> Login.
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <CockpitShell>{children}</CockpitShell>;
}
