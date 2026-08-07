import { NextResponse } from 'next/server'

const MAILERLITE_API = 'https://connect.mailerlite.com/api/subscribers'
const MAILERLITE_KEY = process.env.NEXT_PUBLIC_MAILERLITE_API_KEY || ''

async function addToMailerLite(email: string, name: string, source: string) {
  if (!MAILERLITE_KEY) {
    console.warn('[subscribe] MAILERLITE_API_KEY not configured, skipping MailerLite sync')
    return null
  }

  try {
    const fields: Record<string, string> = { source }
    if (name) fields.name = name

    const res = await fetch(MAILERLITE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_KEY}`,
      },
      body: JSON.stringify({
        email,
        fields,
        groups: ['nl-audience'], // tag all Dutch subscribers
        status: 'active', // skip double opt-in for now, trust the form
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('[subscribe] MailerLite error:', res.status, err)
      return null
    }

    return await res.json()
  } catch (error) {
    console.error('[subscribe] MailerLite request failed:', error)
    return null
  }
}

export async function POST(request: Request) {
  try {
    const { email, name, source = 'website' } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Ongeldig e-mailadres' }, { status: 400 })
    }

    const result = await addToMailerLite(email.toLowerCase(), name || '', source)
    if (!result) {
      return NextResponse.json({ error: 'Inschrijven mislukt, probeer het later opnieuw' }, { status: 502 })
    }

    return NextResponse.json({
      success: true,
      message: 'Je bent ingeschreven! Check je inbox voor de Gut-Brain Gids.',
    })
  } catch (error) {
    return NextResponse.json({ error: 'Er ging iets mis' }, { status: 500 })
  }
}
