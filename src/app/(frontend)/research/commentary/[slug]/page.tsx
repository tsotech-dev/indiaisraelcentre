import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PublicationDetailHero from '@/components/PublicationDetailHero'
import CitationBlock from '@/components/CitationBlock'
import PublicationCard from '@/components/PublicationCard'
import RichTextRenderer from '@/components/RichTextRenderer'
import Reveal from '@/components/Reveal'
import JsonLd from '@/components/JsonLd'
import { getPublication, getPublications } from '@/lib/payload'
import { pillarLabel } from '@/lib/utils'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const piece = await getPublication(slug, 'commentary')
  if (!piece) return {}
  return {
    title: piece.title,
    description: piece.abstract?.slice(0, 200),
    openGraph: { title: piece.title, type: 'article', publishedTime: piece.publishedDate },
  }
}

export default async function CommentaryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const piece = await getPublication(slug, 'commentary')
  if (!piece) notFound()

  const related = await getPublications({
    type: 'commentary',
    limit: 3,
    excludeSlug: piece.slug,
  })

  const pillar = pillarLabel(piece.pillar)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'OpinionNewsArticle',
    headline: piece.title,
    datePublished: piece.publishedDate,
    author: piece.authors.map((a: { name: string }) => ({ '@type': 'Person', name: a.name })),
    publisher: { '@type': 'Organization', name: 'India Israel Centre' },
    url: `https://indiaisraelcentre.org/research/commentary/${piece.slug}/`,
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      <PublicationDetailHero
        type="commentary"
        title={piece.title}
        authors={piece.authors}
        publishedDate={piece.publishedDate}
        pillarLabel={pillar}
        pillarCode={piece.pillar}
        crumbs={[
          { label: 'Research', href: '/research/' },
          { label: 'Commentary', href: '/research/commentary/' },
          { label: piece.title },
        ]}
      />

      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-14">
          {piece.abstract && (
            <p className="font-display text-xl md:text-2xl italic font-light text-stone-600 leading-snug mb-10 border-l-2 border-iic-gold pl-5">
              {piece.abstract}
            </p>
          )}

          <RichTextRenderer data={piece.body} className="prose max-w-none" />

          <CitationBlock
            title={piece.title}
            authors={piece.authors.map((a: { name: string }) => a.name)}
            year={new Date(piece.publishedDate).getFullYear().toString()}
            publisher="India Israel Centre"
            url={`https://indiaisraelcentre.org/research/commentary/${piece.slug}/`}
          />
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <Reveal>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mb-8">
                More commentary
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r, i) => (
                <Reveal key={r.id} delay={Math.min(i * 80, 320)}>
                  <PublicationCard
                    title={r.title}
                    slug={r.slug}
                    type={r.type}
                    authors={r.authors}
                    publishedDate={r.publishedDate}
                    pillarLabel={pillarLabel(r.pillar)}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
