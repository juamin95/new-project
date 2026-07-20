import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Türsteher: prüft bei jedem Aufruf die Sitzung, frischt sie auf und schützt alle
// Routen außer Login und Auth-Rückkehr. Ohne gültige Anmeldung -> /login.
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Wichtig: getUser() direkt nach der Client-Erstellung, sonst kann die Sitzung
  // unbemerkt ablaufen.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  // /api-Routen sichern sich selbst (JSON-401) statt auf /login umzuleiten.
  const isPublic =
    path === '/login' || path.startsWith('/auth') || path.startsWith('/api')

  if (!user && !isPublic) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Bereits angemeldet? Login-Seite überspringen.
  if (user && path === '/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/offene-punkte'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
