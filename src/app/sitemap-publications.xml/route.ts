import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import { publicationPath } from '@/lib/utils'

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://indiaisraelcentre.org'

  let entries: string[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'publications',
      limit: 1000,
      depth: 0,
    })

    entries = result.docs.map((doc) => {
      const path = publicationPath(doc.type as string, doc.slug as string)
      return `<url><loc>${base}${path}</loc><lastmod>${new Date(doc.updatedAt).toISOString().split('T')[0]}</lastmod><changefreq>yearly</changefreq><priority>0.7</priority></url>`
    })
  } catch {
    // Database may not be seeded yet; return empty sitemap
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
