import type { Metadata } from 'next'
import PublicationCard from '@/components/PublicationCard'
import PillarNavigatorGrid from '@/components/PillarNavigatorGrid'
import Reveal from '@/components/Reveal'
import { Suspense } from 'react'
import FilterBar from '@/components/FilterBar'
import Link from 'next/link'
import { getPublications, getGlobal } from '@/lib/payload'
import { pillarLabel } from '@/lib/utils'

const FORMAT_ACCENTS = ['bg-iic-navy', 'bg-iic-saffron', 'bg-iic-gold-deep'] as const

export const metadata: Metadata = {
  title: 'Research',
  description:
    "Browse the India Israel Centre's publications across six thematic pillars — Papers, Briefs, and Commentary on the India-Israel bilateral relationship.",
}

const FORMATS = [
  {
    code: 'paper',
    label: 'Papers',
    href: '/research/papers/',
    body: 'Extended analytical scholarship. Peer-reviewable arguments built from primary sources.',
    accent: 'navy',
  },
  {
    code: 'brief',
    label: 'Briefs',
    href: '/research/briefs/',
    body: 'Policy-oriented synthesis for working professionals. Short, sourced, decisive.',
    accent: 'saffron',
  },
  {
    code: 'commentary',
    label: 'Commentary',
    href: '/research/commentary/',
    body: 'Timely essays and analytical reactions to current questions on the relationship.',
    accent: 'gold',
  },
]

export default async function ResearchPage() {
  const [pubs, c] = await Promise.all([
    getPublications({ limit: 60 }),
    getGlobal('research'),
  ])
  const cmsCards = (c?.formatCards as { label: string; body: string }[] | null)?.length
    ? (c?.formatCards as { label: string; body: string }[])
    : null

  return (
    <>
      {/* HERO */}
      <section className="relative bg-mesh border-b border-stone-200">
        <div
          aria-hidden
          className="absolute -top-20 right-0 w-[420px] h-[420px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #FF671F 0%, transparent 70%)' }}
        />
        <div className="relative max-w-5xl mx-auto px-6 pt-24 md:pt-32 pb-16">
          <div className="text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-iic-saffron mb-6 animate-fade-up">
            / Research
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.98] tracking-tight text-stone-900 mb-6 animate-fade-up delay-1">
            Research
          </h1>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-3xl animate-fade-up delay-2">
            The Centre&rsquo;s research is organised around six thematic pillars and three
            publication formats. Pillars are tagged across pieces rather than treated as silos;
            work that materially engages more than one pillar surfaces in each relevant archive.
          </p>
        </div>
      </section>

      {/* FORMAT TRIPTYCH */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FORMATS.map((f, i) => (
              <Reveal key={f.code} delay={i * 100}>
                <Link
                  href={f.href}
                  className="group flex flex-col bg-white border border-stone-200 rounded-lg p-8 h-full hover-lift hover:border-iic-saffron/40 relative overflow-hidden"
                >
                  <span
                    className={`absolute inset-x-0 top-0 h-[3px] ${FORMAT_ACCENTS[i]} rounded-t-lg scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`}
                  />
                  <div className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-stone-400 mb-4">
                    0{i + 1} · Format
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-stone-900 mb-3 group-hover:text-iic-navy transition-colors">
                    {f.label}
                  </h2>
                  <p className="text-sm text-stone-600 leading-relaxed flex-1">{cmsCards?.[i]?.body ?? f.body}</p>
                  <div className="mt-6 pt-5 border-t border-stone-100">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-sans font-semibold uppercase tracking-widest text-stone-400 group-hover:text-iic-saffron transition-colors">
                      Browse {f.label.toLowerCase()}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ALL PUBLICATIONS */}
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Reveal>
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900">
                All publications
              </h2>
              <p className="text-sm font-sans text-stone-500">
                {pubs.length} {pubs.length === 1 ? 'piece' : 'pieces'} of work
              </p>
            </div>
          </Reveal>

          <Suspense>
            <FilterBar showFormat showPillar showYear />
          </Suspense>

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
                    pillarLabel={pillarLabel(pub.pillar)}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-stone-300 rounded-sm p-16 text-center bg-white">
              <div className="font-display text-6xl text-stone-200 mb-4">∅</div>
              <p className="text-stone-500">
                Publications will appear here as they are published.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* PILLARS */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <Reveal>
            <div className="mb-10">
              <div className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-iic-saffron mb-3">
                / Browse by theme
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900">
                Six pillars of research
              </h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <PillarNavigatorGrid />
          </Reveal>
        </div>
      </section>
    </>
  )
}
