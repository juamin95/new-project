import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Unsichtbare Rückkehr-Seite: tauscht den Magic-Link-Code gegen eine Sitzung.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/offene-punkte'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Kein Code oder abgelaufen/benutzt -> zurück zum Login mit erklärendem Hinweis.
  return NextResponse.redirect(`${origin}/login?fehler=link`)
}
