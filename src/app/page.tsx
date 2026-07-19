import { redirect } from "next/navigation";

// Einstieg: angemeldete Nutzer landen auf den offenen Punkten,
// nicht angemeldete werden von der Middleware zum Login geleitet.
export default function Home() {
  redirect("/offene-punkte");
}
