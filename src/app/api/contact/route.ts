import { NextRequest, NextResponse } from 'next/server'

const RECIPIENT_MAP: Record<string, string> = {
  editorial: 'research@indiaisraelcentre.org',
  media: 'research@indiaisraelcentre.org',
  partner: 'research@indiaisraelcentre.org',
  work: 'research@indiaisraelcentre.org',
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, organisation, message, type } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // In production: send via a transactional email provider (Resend, Postmark, etc.)
    // For now: log to console and return success so forms work during development
    console.log('Contact form submission:', {
      to: RECIPIENT_MAP[type] ?? 'research@indiaisraelcentre.org',
      from: email,
      name,
      organisation,
      type,
      message,
    })

    return NextResponse.json({ message: 'Sent' }, { status: 200 })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
