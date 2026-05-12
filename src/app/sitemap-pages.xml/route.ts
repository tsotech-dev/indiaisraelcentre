import { NextResponse } from 'next/server'
import { PILLARS } from '@/lib/pillars'

function url(loc: string, priority = '0.8', changefreq = 'monthly') {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://indiaisraelcentre.org'
  return `<url><loc>${base}${loc}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
}

export async function GET() {
  const staticPages = [
    url('/', '1.0', 'weekly'),
    url('/research/', '0.9', 'weekly'),
    url('/research/papers/', '0.8', 'weekly'),
    url('/research/briefs/', '0.8', 'weekly'),
    url('/research/commentary/', '0.8', 'weekly'),
    ...PILLARS.map((p) => url(p.path, '0.7', 'monthly')),
    url('/forum/', '0.9', 'weekly'),
    url('/forum/archive/', '0.7', 'weekly'),
    url('/about/', '0.8', 'monthly'),
    url('/about/governance/', '0.6', 'monthly'),
    url('/about/contact/', '0.6', 'monthly'),
    url('/about/contact/editorial/', '0.5', 'monthly'),
    url('/about/contact/media/', '0.5', 'monthly'),
    url('/about/partner-with-us/', '0.5', 'monthly'),
    url('/about/work-with-us/', '0.5', 'monthly'),
    url('/privacy/', '0.3', 'yearly'),
    url('/terms/', '0.3', 'yearly'),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
