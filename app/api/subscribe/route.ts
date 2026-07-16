import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const SUBSCRIBERS_FILE = path.join(process.cwd(), 'data', 'subscribers.json')
const MAILERLITE_API = 'https://connect.mailerlite.com/api/subscribers'
const MAILERLITE_KEY = process.env.NEXT_PUBLIC_MAILERLITE_API_KEY || ''

function readSubscribers(): { email: string; date: string; source: string; name?: string }[] {
  try {
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      return JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, 'utf-8'))
    }
  } catch {}
  return []
}

function writeSubscribers(subscribers: { email: string; date: string; source: string; name?: string }[]) {
  const dir = path.dirname(SUBSCRIBERS_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2))
}

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

    // Save locally
    const subscribers = readSubscribers()
    const exists = subscribers.find(s => s.email.toLowerCase() === email.toLowerCase())

    if (!exists) {
      subscribers.push({
        email: email.toLowerCase(),
        name: name || '',
        date: new Date().toISOString(),
        source,
      })
      writeSubscribers(subscribers)
    }

    // Sync to MailerLite (non-blocking — don't fail if MailerLite is down)
    addToMailerLite(email.toLowerCase(), name || '', source).catch(() => {})

    return NextResponse.json({
      success: true,
      message: 'Je bent ingeschreven! Check je inbox voor de Gut-Brain Gids.',
      count: subscribers.length,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Er ging iets mis' }, { status: 500 })
  }
}

export async function GET() {
  const subscribers = readSubscribers()
  return NextResponse.json({ count: subscribers.length })
}
