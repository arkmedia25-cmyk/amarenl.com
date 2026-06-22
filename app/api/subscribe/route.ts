import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const SUBSCRIBERS_FILE = path.join(process.cwd(), 'data', 'subscribers.json')

function readSubscribers(): { email: string; date: string; source: string }[] {
  try {
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      return JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, 'utf-8'))
    }
  } catch {}
  return []
}

function writeSubscribers(subscribers: typeof readSubscribers) {
  const dir = path.dirname(SUBSCRIBERS_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2))
}

export async function POST(request: Request) {
  try {
    const { email, source = 'website' } = await request.json()
    
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Ongeldig e-mailadres' }, { status: 400 })
    }
    
    const subscribers = readSubscribers()
    const exists = subscribers.find(s => s.email.toLowerCase() === email.toLowerCase())
    
    if (!exists) {
      subscribers.push({
        email: email.toLowerCase(),
        date: new Date().toISOString(),
        source,
      })
      writeSubscribers(subscribers)
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Je bent ingeschreven! Check je inbox voor je €8 kortingscode.',
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
