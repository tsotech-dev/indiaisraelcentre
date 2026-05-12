import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import PublicationCard from '@/components/PublicationCard'
import Reveal from '@/components/Reveal'
import { PILLARS } from '@/lib/pillars'
import JsonLd from '@/components/JsonLd'
import { getPublications } from '@/lib/payload'

export function generateStaticParams() {
  return PILLARS.map((p) => ({ pillar: p.code }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string }>
}): Promise<Metadata> {
  const { pillar: code } = await params
  const pillar = PILLARS.find((p) => p.code === code)
  if (!pillar) return {}
  return {
    title: pillar.label,
    description: pillar.oneLineFraming,
    openGraph: { title: pillar.label, description: pillar.oneLineFraming },
  }
}

const PILLAR_BLOBS: Record<string, string> = {
  identity: 'radial-gradient(circle, #FF671F 0%, transparent 65%)',
  governance: 'radial-gradient(circle, #003D7A 0%, transparent 65%)',
  security: 'radial-gradient(circle, #0F1419 0%, transparent 65%)',
  technology: 'radial-gradient(circle, #005EB8 0%, transparent 65%)',
  development: 'radial-gradient(circle, #FFD700 0%, transparent 65%)',
  culture: 'radial-gradient(circle, #E55812 0%, transparent 65%)',
}

export default async function PillarPage({
  params,
}: {
  params: Promise<{ pillar: string }>
}) {
  const { pillar: code } = await params
  const pillar = PILLARS.find((p) => p.code === code)
  if (!pillar) notFound()

  const pubs = await getPublications({ pillar: code, limit: 30 })
  const idx = PILLARS.findIndex((p) => p.code === code)
  const prev = PILLARS[(idx - 1 + PILLARS.length) % PILLARS.length]
  const next = PILLARS[(idx + 1) % PILLARS.length]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pillar.label,
    description: pillar.oneLineFraming,
    url: `https://indiaisraelcentre.org${pillar.path}`,
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* HERO */}
      <section className="relative bg-mesh border-b border-stone-200 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-40 -right-40 w-[680px] h-[680px] rounded-full opacity-20"
          style={{ background: PILLAR_BLOBS[code] }}
        />
        <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-20">
          <Breadcrumbs
            crumbs={[
              { label: 'Research', href: '/research/' },
              { label: 'Themes', href: '/research/' },
              { label: pillar.label },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-2">
              <div className="font-display text-7xl md:text-9xl font-bold tracking-tight text-iic-saffron leading-none">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <div className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-stone-400 mt-2">
                Pillar
              </div>
            </div>
            <div className="lg:col-span-10">
              <div className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-iic-saffron mb-4 animate-fade-up">
                / Research pillar
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight text-stone-900 mb-6 animate-fade-up delay-1">
                {pillar.label}
              </h1>
              <p className="text-xl md:text-2xl font-display italic font-light text-stone-500 leading-snug mb-8 max-w-3xl animate-fade-up delay-2">
                {pillar.oneLineFraming}
              </p>
              <div className="prose text-stone-700 max-w-3xl animate-fade-up delay-3">
                <p>{pillar.framing}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Reveal>
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900">
                Publications in this pillar
              </h2>
              <Link
                href="/research/"
                className="text-sm font-sans font-semibold text-iic-navy underline-anim"
              >
                All research →
              </Link>
            </div>
          </Reveal>

          {pubs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pubs.map((pub, i) => (
                <Reveal key={pub.id} delay={Math.min(i * 60, 400)}>
                  <PublicationCard
                    title={pub.title}
                    slug={pub.slug}
                    type={pub.type}
                    authors={pub.authors}
                    publishedDate={pub.publishedDate}
                    pillarLabel={pillar.label}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-stone-300 rounded-sm p-16 text-center bg-white">
              <div className="font-display text-6xl text-stone-200 mb-4">∅</div>
              <p className="text-stone-500">
                Publications in this pillar will appear here as they are published.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* PREV / NEXT PILLAR NAVIGATION */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200 border border-stone-200 rounded-sm overflow-hidden">
          <Link
            href={prev.path}
            className="group bg-white p-8 hover:bg-iic-paper transition-colors"
          >
            <div className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-stone-400 mb-2">
              ← Previous pillar
            </div>
            <div className="font-display text-2xl font-semibold text-stone-900 group-hover:text-iic-saffron transition-colors">
              {prev.label}
            </div>
          </Link>
          <Link
            href={next.path}
            className="group bg-white p-8 hover:bg-iic-paper transition-colors md:text-right"
          >
            <div className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-stone-400 mb-2">
              Next pillar →
            </div>
            <div className="font-display text-2xl font-semibold text-stone-900 group-hover:text-iic-saffron transition-colors">
              {next.label}
            </div>
          </Link>
        </div>
      </section>
    </>
  )
}
