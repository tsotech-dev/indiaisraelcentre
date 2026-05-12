import type { Metadata } from 'next'
import PublicationCard from '@/components/PublicationCard'
import FormatHero from '@/components/FormatHero'
import Reveal from '@/components/Reveal'
import { Suspense } from 'react'
import FilterBar from '@/components/FilterBar'
import { getPublications, getGlobal } from '@/lib/payload'
import { pillarLabel } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Commentary',
  description:
    'Timely analysis and essay from the India Israel Centre — Commentary on the India-Israel relationship.',
}

export default async function CommentaryPage() {
  const [items, c] = await Promise.all([
    getPublications({ type: 'commentary', limit: 60 }),
    getGlobal('research-commentary'),
  ])

  return (
    <>
      <FormatHero
        accent="gold"
        eyebrow="Commentary"
        title="Timely essays."
        italic="On a current question."
        description={(c?.description as string | undefined) ?? "Commentary is the Centre's analytical essay format — typically 800 to 2,500 words, written on a current question or event."}
        crumbs={[{ label: 'Research', href: '/research/' }, { label: 'Commentary' }]}
        meta={[
          { label: 'Typical length', value: (c?.typicalLength as string | undefined) ?? '0.8–2.5k' },
          { label: 'Per year', value: (c?.perYear as string | undefined) ?? '24+' },
        ]}
      />
      <section className="bg-iic-paper">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <Suspense>
            <FilterBar showFormat={false} showPillar showYear />
          </Suspense>
          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((pub, i) => (
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
              <p className="text-stone-500">Commentary will appear here as it is published.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
