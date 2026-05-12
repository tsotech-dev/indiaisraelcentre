import { NextResponse } from 'next/server'

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://indiaisraelcentre.org'
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${base}/sitemap-pages.xml</loc></sitemap>
  <sitemap><loc>${base}/sitemap-publications.xml</loc></sitemap>
  <sitemap><loc>${base}/sitemap-convenings.xml</loc></sitemap>
  <sitemap><loc>${base}/sitemap-people.xml</loc></sitemap>
</sitemapindex>`
  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
