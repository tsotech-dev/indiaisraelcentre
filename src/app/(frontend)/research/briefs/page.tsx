import type { Metadata } from 'next'
import PublicationCard from '@/components/PublicationCard'
import FormatHero from '@/components/FormatHero'
import Reveal from '@/components/Reveal'
import { Suspense } from 'react'
import FilterBar from '@/components/FilterBar'
import { getPublications, getGlobal } from '@/lib/payload'
import { pillarLabel } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Briefs',
  description:
    'Policy-oriented Briefs from the India Israel Centre — concise, evidence-based analysis on the India-Israel relationship.',
}

export default async function BriefsPage() {
  const [briefs, c] = await Promise.all([
    getPublications({ type: 'brief', limit: 60 }),
    getGlobal('research-briefs'),
  ])

  return (
    <>
      <FormatHero
        accent="saffron"
        eyebrow="Briefs"
        title="Briefs"
        description={(c?.description as string | undefined) ?? 'Policy and issue briefs, written for working professionals.'}
        crumbs={[{ label: 'Research', href: '/research/' }, { label: 'Briefs' }]}
      />
      <section className="bg-iic-paper">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <Suspense>
            <FilterBar showFormat={false} showPillar showYear />
          </Suspense>
          {briefs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {briefs.map((pub, i) => (
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
              <p className="text-stone-500">Briefs will appear here as they are published.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
