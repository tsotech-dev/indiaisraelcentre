import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Disabled in production' }, { status: 403 })
  }

  const payload = await getPayload({ config })

  const all = await payload.find({ collection: 'publications', limit: 200, pagination: false })
  const ids = all.docs.map((d) => d.id)

  for (const id of ids) {
    await payload.delete({ collection: 'publications', id })
  }

  return NextResponse.json({ ok: true, deleted: ids.length })
}
