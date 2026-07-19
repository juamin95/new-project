import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Server-Client (Server Components, Route Handler). Sitzung liegt in HttpOnly-Cookies.
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // In Server Components ist das Setzen von Cookies nicht erlaubt —
            // die Middleware frischt die Sitzung ohnehin bei jedem Aufruf auf.
          }
        },
      },
    }
  )
}
