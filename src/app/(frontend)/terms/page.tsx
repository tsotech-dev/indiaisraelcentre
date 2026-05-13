import type { Metadata } from 'next'
import StaticPageHero from '@/components/StaticPageHero'
import { getGlobal } from '@/lib/payload'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for the India Israel Centre website.',
}

const LAST_REVIEWED = '2026-05-11'

const SECTIONS = [
  {
    h: 'Use of content',
    body: (
      <>
        <p>
          Content on this site is published by the Centre and its affiliated authors. Centre publications are made available for academic, professional and personal use. Citation is welcomed and encouraged.
        </p>
        <p>
          Substantial reproduction, redistribution or commercial use of Centre content without prior written permission is not permitted. Reproduction of Centre content for non-commercial educational and journalistic purposes is permitted where the Centre and the relevant author are clearly attributed and the original URL is provided.
        </p>
      </>
    ),
  },
  {
    h: 'Linking',
    body: <p>Links to this site and to specific pieces of Centre content are welcomed. No specific permission is required.</p>,
  },
  {
    h: 'Accuracy',
    body: <p>Authors are responsible for the accuracy of their own pieces. Errors discovered after publication are addressed through dated corrections appended to the relevant piece.</p>,
  },
  {
    h: 'External content',
    body: <p>The Centre&rsquo;s site links to and embeds content hosted elsewhere. The Centre does not guarantee the availability or accuracy of external content.</p>,
  },
  {
    h: 'Liability',
    body: (
      <p>
        Content on this site is provided for research, policy analysis and informed public discussion. It does not constitute legal, financial, medical, security or other professional advice. The Centre does not accept liability for actions taken on the basis of its publications.
      </p>
    ),
  },
  {
    h: 'Governing law',
    body: <p>These Terms of Use are governed by the laws of India.</p>,
  },
  {
    h: 'Contact',
    body: (
      <p>
        <a href="mailto:research@indiaisraelcentre.org" className="text-iic-navy font-semibold underline-anim">
          research@indiaisraelcentre.org
        </a>
      </p>
    ),
  },
]

export default async function TermsPage() {
  const c = await getGlobal('terms')
  const cmsSections = (c?.sections as { heading: string; body: string }[] | null)?.length
    ? (c?.sections as { heading: string; body: string }[])
    : null
  const lastReviewed = (c?.lastReviewed as string | undefined) ?? LAST_REVIEWED

  return (
    <>
      <StaticPageHero
        accent="navy"
        eyebrow="Legal"
        title="Terms of Use"
        description={`This site is operated by the India Israel Centre. By using the site, you accept these Terms of Use. Last reviewed ${formatDate(lastReviewed)}.`}
        crumbs={[{ label: 'Terms' }]}
      />
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-14 space-y-10 text-stone-700 leading-relaxed">
          {cmsSections
            ? cmsSections.map((s, i) => (
                <div key={i} className="border-l-2 border-iic-saffron/40 pl-5">
                  <div className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-iic-saffron-deep mb-2">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h2 className="font-display text-xl font-bold text-stone-900 mb-3">{s.heading}</h2>
                  <p>{s.body}</p>
                </div>
              ))
            : SECTIONS.map((s, i) => (
                <div key={i} className="border-l-2 border-iic-saffron/40 pl-5">
                  <div className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-iic-saffron-deep mb-2">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h2 className="font-display text-xl font-bold text-stone-900 mb-3">{s.h}</h2>
                  <div className="space-y-3">{s.body}</div>
                </div>
              ))}
        </div>
      </section>
    </>
  )
}
