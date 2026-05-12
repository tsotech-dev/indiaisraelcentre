import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://indiaisraelcentre.org'

  let entries: string[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'convenings',
      limit: 1000,
      depth: 0,
    })

    entries = result.docs.map(
      (doc) =>
        `<url><loc>${base}/forum/${doc.slug as string}/</loc><lastmod>${new Date(doc.updatedAt).toISOString().split('T')[0]}</lastmod><changefreq>yearly</changefreq><priority>0.6</priority></url>`,
    )
  } catch {
    // Empty sitemap if DB unavailable
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
