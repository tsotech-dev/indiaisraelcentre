import type { Metadata } from 'next'
import ConveningCard from '@/components/ConveningCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import Reveal from '@/components/Reveal'
import { Suspense } from 'react'
import FilterBar from '@/components/FilterBar'
import { getConvenings, getGlobal } from '@/lib/payload'
import { pillarLabel } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Forum Archive',
  description: 'Archive of all past convenings of the India Israel Centre Forum.',
}

export default async function ForumArchivePage() {
  const [items, c] = await Promise.all([
    getConvenings({ limit: 100 }),
    getGlobal('forum-archive'),
  ])

  return (
    <>
      <section className="relative bg-mesh border-b border-stone-200 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #003D7A 0%, transparent 70%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-14">
          <Breadcrumbs crumbs={[{ label: 'Forum', href: '/forum/' }, { label: 'Archive' }]} />
          <div className="text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-4 animate-fade-up">
            / Archive
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight text-stone-900 mb-4 animate-fade-up delay-1">
            All convenings.
          </h1>
          <p className="text-lg md:text-xl text-stone-500 font-display italic font-light max-w-2xl animate-fade-up delay-2">
            {(c?.description as string | undefined) ?? 'A record of every gathering the Forum has held — closed dialogues, roundtables, and public lectures.'}
          </p>
        </div>
      </section>

      <section className="bg-iic-paper">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <Suspense>
            <FilterBar showFormat={false} showPillar showYear />
          </Suspense>
          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((c, i) => (
                <Reveal key={c.id} delay={Math.min(i * 50, 360)}>
                  <ConveningCard
                    title={c.title}
                    slug={c.slug}
                    eventDate={c.eventDate}
                    format={c.format}
                    pillarLabel={c.pillar ? pillarLabel(c.pillar) : undefined}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-stone-300 rounded-sm p-16 text-center bg-white">
              <div className="font-display text-6xl text-stone-200 mb-4">∅</div>
              <p className="text-stone-500">Convenings will appear here as they are held.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
