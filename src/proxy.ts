import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Next 16: „proxy" ersetzt „middleware". Türsteher für alle geschützten Routen.
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Alles außer Next-internen Pfaden, Icons/Manifest und statischen Bilddateien.
    "/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)$).*)",
  ],
};
