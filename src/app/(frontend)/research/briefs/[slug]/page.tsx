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

      {/* Abstract — full width */}
      {brief.abstract && (
        <section className="bg-iic-paper border-b border-stone-200">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="relative border border-iic-saffron/30 bg-white rounded-sm p-6 overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-iic-saffron" />
              <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-iic-saffron-deep mb-3">
                Summary
              </h2>
              <div className="space-y-3">
                {brief.abstract.split('\n').filter((p: string) => p.trim()).map((para: string, i: number) => (
                  <p key={i} className="text-stone-700 leading-relaxed">{para}</p>
                ))}
              </div>
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
                Full Brief
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
                title={brief.title}
              />
            </div>
          </div>
        </section>
      )}

      {/* DOI / external link — only when no PDF */}
      {!pdfUrl && brief.doi && (
        <section className="bg-white border-b border-stone-200">
          <div className="max-w-4xl mx-auto px-6 py-10">
            <a
              href={brief.doi}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-stone-900 text-white hover:bg-white hover:text-black hover:border hover:border-black transition-colors font-medium text-sm"
            >
              Read full
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </section>
      )}

      {/* Rich text body */}
      {brief.body && (
        <section className="bg-white border-b border-stone-200">
          <div className="max-w-3xl mx-auto px-6 py-12">
            <RichTextRenderer data={brief.body} className="prose max-w-none" />
          </div>
        </section>
      )}

      {/* Citation block */}
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 pt-8 pb-12">
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
