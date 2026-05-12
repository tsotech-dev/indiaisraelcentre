import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const payload = await getPayloadClient()

    const existing = await payload.find({
      collection: 'newsletter-subscribers',
      where: { email: { equals: email } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      return NextResponse.json({ message: 'Already subscribed' }, { status: 200 })
    }

    await payload.create({
      collection: 'newsletter-subscribers',
      data: {
        email,
        confirmed: false,
        source: source ?? 'unknown',
      },
    })

    return NextResponse.json({ message: 'Subscribed' }, { status: 201 })
  } catch (err) {
    console.error('Newsletter subscription error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
