export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Breadcrumbs from '@/components/Breadcrumbs'
import VideoEmbed from '@/components/VideoEmbed'
import RichTextRenderer from '@/components/RichTextRenderer'
import JsonLd from '@/components/JsonLd'
import Link from 'next/link'
import { formatDate, conveningFormatLabel, pillarLabel } from '@/lib/utils'
import { getConvening } from '@/lib/payload'

type MediaObj = { url: string; alt?: string; width?: number; height?: number }

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

  const eventImages = Array.isArray(c.eventImages) ? c.eventImages : []
  const pressReleases = Array.isArray(c.pressReleases) ? c.pressReleases : []

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

      {/* ── HERO ──────────────────────────────────────────────────────── */}
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

      {/* ── BODY / PDF / VIDEO ────────────────────────────────────────── */}
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-14">
          {c.description && <RichTextRenderer data={c.description} className="prose max-w-none" />}
          {c.pdfFile && typeof c.pdfFile === 'object' && (c.pdfFile as MediaObj).url && (
            <div className={c.description ? 'mt-10' : ''}>
              <div className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-iic-saffron-deep mb-3">
                Document
              </div>
              <object
                data={(c.pdfFile as MediaObj).url}
                type="application/pdf"
                className="w-full rounded border border-stone-200"
                style={{ height: '80vh', minHeight: 480 }}
              >
                <p className="text-sm font-sans text-stone-500 p-4">
                  Your browser cannot display this PDF.{' '}
                  <a
                    href={(c.pdfFile as MediaObj).url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-iic-saffron-deep hover:underline"
                  >
                    Open it here.
                  </a>
                </p>
              </object>
              <a
                href={(c.pdfFile as MediaObj).url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-xs font-sans text-iic-saffron-deep hover:underline"
              >
                Open PDF in new tab
              </a>
            </div>
          )}
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

      {/* ── EVENT PHOTOS ──────────────────────────────────────────────── */}
      {eventImages.length > 0 && (
        <section className="bg-white border-b border-stone-200">
          <div className="max-w-5xl mx-auto px-6 py-14">
            <div className="text-[10px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-2">
              / From the Event
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mb-8">
              Photo Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {eventImages.map((item: { image?: unknown; caption?: string }, i: number) => {
                const img = item.image as MediaObj | undefined
                if (!img?.url) return null
                return (
                  <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-stone-100">
                    <Image
                      src={img.url}
                      alt={item.caption ?? `Event photo ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    {item.caption && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white text-xs font-sans leading-snug">
                          {item.caption}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── PRESS COVERAGE ────────────────────────────────────────────── */}
      {pressReleases.length > 0 && (
        <section className="bg-iic-paper border-b border-stone-200">
          <div className="max-w-5xl mx-auto px-6 py-14">
            <div className="text-[10px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-2">
              / In the News
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mb-8">
              Press Coverage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {pressReleases.map(
                (
                  item: {
                    outlet?: string
                    headline?: string
                    url?: string
                    thumbnail?: unknown
                  },
                  i: number,
                ) => {
                  const thumb = item.thumbnail as MediaObj | undefined
                  return (
                    <a
                      key={i}
                      href={item.url ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-iic-navy/40 hover:shadow-md transition-all duration-200"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-full aspect-[16/9] bg-stone-100 overflow-hidden">
                        {thumb?.url ? (
                          <Image
                            src={thumb.url}
                            alt={item.headline ?? item.outlet ?? 'Press coverage'}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          // Fallback: outlet initial on a coloured bg
                          <div className="absolute inset-0 flex items-center justify-center bg-iic-ink">
                            <span className="font-display text-4xl font-bold text-white/20 select-none">
                              {(item.outlet ?? 'P').slice(0, 1)}
                            </span>
                          </div>
                        )}
                        {/* Outlet badge */}
                        <div className="absolute top-3 left-3">
                          <span className="inline-block text-[9px] font-sans font-bold uppercase tracking-[0.18em] bg-iic-saffron text-white px-2 py-1 rounded-sm leading-none">
                            {item.outlet}
                          </span>
                        </div>
                      </div>

                      {/* Text */}
                      <div className="flex-1 p-5">
                        <p className="text-sm font-sans font-semibold text-stone-800 leading-snug group-hover:text-iic-navy transition-colors line-clamp-3">
                          {item.headline}
                        </p>
                        <span className="inline-flex items-center gap-1 mt-3 text-[10px] font-sans font-bold uppercase tracking-[0.14em] text-iic-saffron-deep">
                          Read article
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                            <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </div>
                    </a>
                  )
                },
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
