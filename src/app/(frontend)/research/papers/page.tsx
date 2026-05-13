import type { Metadata } from 'next'
import PublicationCard from '@/components/PublicationCard'
import FormatHero from '@/components/FormatHero'
import Reveal from '@/components/Reveal'
import { Suspense } from 'react'
import FilterBar from '@/components/FilterBar'
import { getPublications, getGlobal } from '@/lib/payload'
import { pillarLabel } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Papers',
  description:
    'Extended analytical scholarship from the India Israel Centre — Papers on the India-Israel bilateral relationship.',
}

export default async function PapersPage() {
  const [papers, c] = await Promise.all([
    getPublications({ type: 'paper', limit: 60 }),
    getGlobal('research-papers'),
  ])

  return (
    <>
      <FormatHero
        accent="navy"
        eyebrow="Papers"
        title="Papers"
        description={(c?.description as string | undefined) ?? "Long-form research from the Centre. Each Paper carries an abstract, downloadable PDF, citation blocks in major academic formats, and structured metadata supporting indexing by Google Scholar and major citation managers."}
        crumbs={[{ label: 'Research', href: '/research/' }, { label: 'Papers' }]}
      />
      <section className="bg-iic-paper">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <Suspense>
            <FilterBar showFormat={false} showPillar showYear />
          </Suspense>
          {papers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {papers.map((pub, i) => (
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
              <p className="text-stone-500">Papers will appear here as they are published.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
