export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PublicationDetailHero from '@/components/PublicationDetailHero'
import CitationBlock from '@/components/CitationBlock'
import PublicationCard from '@/components/PublicationCard'
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
  const paper = await getPublication(slug, 'paper')
  if (!paper) return {}
  return {
    title: paper.title,
    description: paper.abstract?.slice(0, 200),
    openGraph: {
      title: paper.title,
      description: paper.abstract?.slice(0, 200),
      type: 'article',
      publishedTime: paper.publishedDate,
      authors: paper.authors.map((a: { name: string }) => a.name),
    },
  }
}

export default async function PaperDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const paper = await getPublication(slug, 'paper')
  if (!paper) notFound()

  const related = await getPublications({
    pillar: paper.pillar,
    limit: 3,
    excludeSlug: paper.slug,
  })

  const pillar = pillarLabel(paper.pillar)
  const pdfUrl =
    paper.pdf && typeof paper.pdf === 'object' && 'url' in paper.pdf ? paper.pdf.url : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: paper.title,
    description: paper.abstract,
    datePublished: paper.publishedDate,
    author: paper.authors.map((a: { name: string }) => ({ '@type': 'Person', name: a.name })),
    publisher: {
      '@type': 'Organization',
      name: 'India Israel Centre',
      url: 'https://indiaisraelcentre.org',
    },
    url: `https://indiaisraelcentre.org/research/papers/${paper.slug}/`,
    keywords: pillar,
    ...(paper.doi && { url: paper.doi }),
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      <PublicationDetailHero
        type="paper"
        title={paper.title}
        authors={paper.authors}
        publishedDate={paper.publishedDate}
        pillarLabel={pillar}
        pillarCode={paper.pillar}
        crumbs={[
          { label: 'Research', href: '/research/' },
          { label: 'Papers', href: '/research/papers/' },
          { label: paper.title },
        ]}
      />

      {/* Abstract — full width */}
      {paper.abstract && (
        <section className="bg-iic-paper border-b border-stone-200">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-iic-navy mb-4">
              Abstract
            </h2>
            <div className="border-l-2 border-iic-navy pl-5 space-y-4">
              {paper.abstract.split('\n').filter((p: string) => p.trim()).map((para: string, i: number) => (
                <p key={i} className="text-stone-700 leading-relaxed text-base">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PDF embed + download */}
      {pdfUrl && (
        <section className="bg-white border-b border-stone-200">
          <div className="max-w-4xl mx-auto px-6 pt-10 pb-0">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-stone-500">
                Full Paper
              </h2>
              <a
                href={pdfUrl}
                download
                className="group inline-flex items-center gap-2 text-sm font-sans font-semibold bg-iic-navy text-white px-5 py-2.5 rounded-sm hover:bg-iic-saffron transition-colors"
              >
                <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
                Download PDF
              </a>
            </div>
            <div className="w-full border border-stone-200 rounded-sm overflow-hidden shadow-sm">
              <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                className="w-full"
                style={{ height: '80vh', minHeight: '600px' }}
                title={paper.title}
              />
            </div>
          </div>
        </section>
      )}

      {/* DOI / external link — shown only when there's no PDF */}
      {!pdfUrl && paper.doi && (
        <section className="bg-white border-b border-stone-200">
          <div className="max-w-4xl mx-auto px-6 py-10">
            <a
              href={paper.doi}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-sans font-semibold bg-stone-900 text-white px-5 py-3 hover:bg-white hover:text-black hover:border hover:border-black transition-colors"
            >
              Read full paper
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </section>
      )}

      {/* Citation block — full width, at the end */}
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 pt-8 pb-12">
          <CitationBlock
            title={paper.title}
            authors={paper.authors.map((a: { name: string }) => a.name)}
            year={new Date(paper.publishedDate).getFullYear().toString()}
            publisher="India Israel Centre"
            url={`https://indiaisraelcentre.org/research/papers/${paper.slug}/`}
            doi={paper.doi ?? undefined}
          />
        </div>
      </section>

      {/* Related publications */}
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
