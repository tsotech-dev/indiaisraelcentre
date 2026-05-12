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
    ...(paper.doi && { identifier: `https://doi.org/${paper.doi}` }),
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

      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-6">
              {paper.abstract && (
                <div className="border-l-2 border-iic-navy pl-5">
                  <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-iic-navy mb-3">
                    Abstract
                  </h2>
                  <p className="text-stone-700 leading-relaxed text-sm">{paper.abstract}</p>
                </div>
              )}
              {pdfUrl && (
                <a
                  href={pdfUrl}
                  download
                  className="group inline-flex items-center gap-2 text-sm font-sans font-semibold bg-iic-navy text-white px-5 py-3 rounded-sm hover:bg-iic-saffron transition-colors w-full justify-center"
                >
                  <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
                  Download PDF
                </a>
              )}
              {paper.doi && (
                <div className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-stone-400">
                  DOI:{' '}
                  <a
                    href={`https://doi.org/${paper.doi}`}
                    className="text-iic-navy hover:text-iic-saffron transition-colors normal-case tracking-normal"
                  >
                    {paper.doi}
                  </a>
                </div>
              )}
            </div>
          </aside>

          <article className="lg:col-span-8 min-w-0">
            <RichTextRenderer data={paper.body} className="prose max-w-none" />
            <CitationBlock
              title={paper.title}
              authors={paper.authors.map((a: { name: string }) => a.name)}
              year={new Date(paper.publishedDate).getFullYear().toString()}
              publisher="India Israel Centre"
              url={`https://indiaisraelcentre.org/research/papers/${paper.slug}/`}
              doi={paper.doi ?? undefined}
            />
          </article>
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
