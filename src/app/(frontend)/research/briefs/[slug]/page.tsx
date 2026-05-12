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
  const brief = await getPublication(slug, 'brief')
  if (!brief) return {}
  return {
    title: brief.title,
    description: brief.abstract?.slice(0, 200),
    openGraph: { title: brief.title, description: brief.abstract?.slice(0, 200), type: 'article' },
  }
}

export default async function BriefDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const brief = await getPublication(slug, 'brief')
  if (!brief) notFound()

  const related = await getPublications({
    pillar: brief.pillar,
    limit: 3,
    excludeSlug: brief.slug,
  })

  const pillar = pillarLabel(brief.pillar)
  const pdfUrl =
    brief.pdf && typeof brief.pdf === 'object' && 'url' in brief.pdf ? brief.pdf.url : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: brief.title,
    description: brief.abstract,
    datePublished: brief.publishedDate,
    author: brief.authors.map((a: { name: string }) => ({ '@type': 'Person', name: a.name })),
    publisher: { '@type': 'Organization', name: 'India Israel Centre' },
    url: `https://indiaisraelcentre.org/research/briefs/${brief.slug}/`,
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      <PublicationDetailHero
        type="brief"
        title={brief.title}
        authors={brief.authors}
        publishedDate={brief.publishedDate}
        pillarLabel={pillar}
        pillarCode={brief.pillar}
        crumbs={[
          { label: 'Research', href: '/research/' },
          { label: 'Briefs', href: '/research/briefs/' },
          { label: brief.title },
        ]}
      />

      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-14">
          {brief.abstract && (
            <div className="relative border border-iic-saffron/30 bg-white rounded-sm p-6 mb-10 overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-iic-saffron" />
              <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-iic-saffron-deep mb-3">
                Summary
              </h2>
              <p className="text-stone-700 leading-relaxed">{brief.abstract}</p>
            </div>
          )}

          {pdfUrl && (
            <a
              href={pdfUrl}
              download
              className="group inline-flex items-center gap-2 mb-10 text-sm font-sans font-semibold bg-iic-navy text-white px-5 py-3 rounded-sm hover:bg-iic-saffron transition-colors"
            >
              <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
              Download PDF
            </a>
          )}

          <RichTextRenderer data={brief.body} className="prose max-w-none" />

          <CitationBlock
            title={brief.title}
            authors={brief.authors.map((a: { name: string }) => a.name)}
            year={new Date(brief.publishedDate).getFullYear().toString()}
            publisher="India Israel Centre"
            url={`https://indiaisraelcentre.org/research/briefs/${brief.slug}/`}
          />
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <Reveal>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mb-8">
                Related publications
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
