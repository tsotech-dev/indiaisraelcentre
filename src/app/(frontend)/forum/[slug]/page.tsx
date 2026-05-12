import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import VideoEmbed from '@/components/VideoEmbed'
import RichTextRenderer from '@/components/RichTextRenderer'
import JsonLd from '@/components/JsonLd'
import Link from 'next/link'
import { formatDate, conveningFormatLabel, pillarLabel } from '@/lib/utils'
import { getConvening } from '@/lib/payload'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const c = await getConvening(slug)
  if (!c) return {}
  return {
    title: c.title,
    openGraph: { title: c.title, type: 'article' },
  }
}

export default async function ConveningDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const c = await getConvening(slug)
  if (!c) notFound()

  const pillar = c.pillar ? pillarLabel(c.pillar) : null
  const d = new Date(c.eventDate)
  const day = d.getDate().toString().padStart(2, '0')
  const monthLong = d.toLocaleString('en-US', { month: 'long' })
  const year = d.getFullYear()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: c.title,
    startDate: c.eventDate,
    organizer: { '@type': 'Organization', name: 'India Israel Centre' },
    eventStatus: 'https://schema.org/EventScheduled',
    url: `https://indiaisraelcentre.org/forum/${c.slug}/`,
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="relative bg-iic-ink text-white overflow-hidden border-b border-iic-navy">
        <div
          aria-hidden
          className="absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, #003D7A 0%, transparent 65%)' }}
        />
        <div className="relative max-w-4xl mx-auto px-6 pt-12 pb-16">
          <Breadcrumbs
            crumbs={[
              { label: 'Forum', href: '/forum/' },
              { label: c.title },
            ]}
          />
          <div className="flex flex-wrap items-center gap-2 mb-6 animate-fade-up">
            {c.format && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full bg-iic-saffron/20 text-iic-saffron">
                <span className="w-1.5 h-1.5 rounded-full bg-iic-saffron" />
                {conveningFormatLabel(c.format)}
              </span>
            )}
            {c.pillar && pillar && (
              <Link
                href={`/research/themes/${c.pillar}/`}
                className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-stone-400 hover:text-iic-saffron transition-colors"
              >
                {pillar}
              </Link>
            )}
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-8 animate-fade-up delay-1">
            {c.title}
          </h1>

          <div className="flex items-center gap-4 animate-fade-up delay-2">
            <div className="shrink-0 w-16 text-center">
              <div className="bg-iic-saffron text-white rounded-sm py-2">
                <div className="text-[9px] font-sans font-bold tracking-widest text-white/80 uppercase">
                  {monthLong.slice(0, 3)}
                </div>
                <div className="font-display font-bold text-xl leading-none my-1">{day}</div>
                <div className="text-[9px] font-sans text-white/70">{year}</div>
              </div>
            </div>
            <time dateTime={c.eventDate} className="text-sm font-sans text-stone-300">
              {formatDate(c.eventDate)}
            </time>
          </div>
        </div>
      </section>

      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-14">
          {c.description && <RichTextRenderer data={c.description} className="prose max-w-none" />}
          {c.videoUrl && (
            <div className="mt-12">
              <div className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-iic-saffron-deep mb-3">
                Recording
              </div>
              <VideoEmbed url={c.videoUrl} title={`Recording: ${c.title}`} />
            </div>
          )}
        </div>
      </section>
    </>
  )
}
