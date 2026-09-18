export const dynamic = 'force-dynamic'

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
  const pdfUrl =
    piece.pdf && typeof piece.pdf === 'object' && 'url' in piece.pdf ? piece.pdf.url : null

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

      {/* Abstract — italic pull-quote style */}
      {piece.abstract && (
        <section className="bg-iic-paper border-b border-stone-200">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="space-y-3 border-l-2 border-iic-gold pl-5">
              {piece.abstract.split('\n').filter((p: string) => p.trim()).map((para: string, i: number) => (
                <p key={i} className="font-display text-xl md:text-2xl italic font-light text-stone-600 leading-snug">
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
                Full Article
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
                title={piece.title}
              />
            </div>
          </div>
        </section>
      )}

      {/* DOI / external link — only when no PDF */}
      {!pdfUrl && piece.doi && (
        <section className="bg-white border-b border-stone-200">
          <div className="max-w-4xl mx-auto px-6 py-10">
            <a
              href={piece.doi}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-stone-900 text-white hover:bg-white hover:text-black hover:border hover:border-black transition-colors font-medium text-sm tracking-wide uppercase"
            >
              Read the original article
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </section>
      )}

      {/* Rich text body */}
      {piece.body && (
        <section className="bg-white border-b border-stone-200">
          <div className="max-w-3xl mx-auto px-6 py-12">
            <RichTextRenderer data={piece.body} className="prose max-w-none" />
          </div>
        </section>
      )}

      {/* Citation block */}
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 pt-8 pb-12">
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
