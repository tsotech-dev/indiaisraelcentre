import type { Metadata } from 'next'
import PublicationCard from '@/components/PublicationCard'
import PillarNavigatorGrid from '@/components/PillarNavigatorGrid'
import Reveal from '@/components/Reveal'
import { Suspense } from 'react'
import FilterBar from '@/components/FilterBar'
import Link from 'next/link'
import { getPublications } from '@/lib/payload'
import { pillarLabel, formatLabel } from '@/lib/utils'

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
  const pubs = await getPublications({ limit: 60 })

  return (
    <>
      {/* HERO */}
      <section className="relative bg-mesh border-b border-stone-200">
        <div
          aria-hidden
          className="absolute -top-20 right-0 w-[420px] h-[420px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #FF671F 0%, transparent 70%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16">
          <div className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-iic-saffron mb-4 animate-fade-up">
            / Research
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight text-stone-900 mb-6 max-w-4xl animate-fade-up delay-1">
            Three formats.{' '}
            <span className="italic font-light text-stone-500">Six pillars.</span>{' '}
            One relationship.
          </h1>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl animate-fade-up delay-2">
            The Centre publishes Papers, Briefs, and Commentary organised around six thematic
            pillars that map the breadth of the India-Israel relationship.
          </p>
        </div>
      </section>

      {/* FORMAT TRIPTYCH */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200 border border-stone-200 rounded-sm overflow-hidden">
            {FORMATS.map((f, i) => (
              <Reveal key={f.code} delay={i * 100}>
                <Link
                  href={f.href}
                  className="group block bg-white p-8 h-full hover:bg-iic-paper transition-colors relative overflow-hidden"
                >
                  <span
                    className={`absolute inset-x-0 top-0 h-1 ${
                      f.accent === 'navy'
                        ? 'bg-iic-navy'
                        : f.accent === 'saffron'
                          ? 'bg-iic-saffron'
                          : 'bg-iic-gold'
                    } scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`}
                  />
                  <div className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-stone-400 mb-3">
                    0{i + 1} · Format
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-stone-900 mb-3 group-hover:text-iic-navy transition-colors">
                    {f.label}
                  </h2>
                  <p className="text-sm text-stone-600 leading-relaxed mb-6">{f.body}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-sans font-semibold text-iic-saffron underline-anim">
                    Browse {f.label.toLowerCase()}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
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
