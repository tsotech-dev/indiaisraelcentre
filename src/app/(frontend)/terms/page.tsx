import type { Metadata } from 'next'
import StaticPageHero from '@/components/StaticPageHero'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for the India Israel Centre website.',
}

const LAST_REVIEWED = '2026-05-01'

const SECTIONS = [
  {
    h: 'Acceptance',
    body: (
      <p>
        By accessing this website you agree to these terms. If you do not agree, please do not use
        the site.
      </p>
    ),
  },
  {
    h: 'Intellectual property',
    body: (
      <>
        <p>
          All content published on this site — Papers, Briefs, Commentary, and descriptive text —
          is the property of the India Israel Centre or the individual authors as specified.
          Content may be cited, quoted (with attribution), and linked to freely. Reproduction in
          full requires written permission from the Centre.
        </p>
        <p>
          PDF downloads of Papers and Briefs are provided for personal, non-commercial research and
          reference use. They may not be redistributed or made available on other platforms
          without permission.
        </p>
      </>
    ),
  },
  {
    h: 'No advice',
    body: (
      <p>
        Nothing published on this site constitutes legal, financial, or policy advice. The
        Centre&rsquo;s publications represent the views of their authors and do not constitute the
        official position of the Indian or Israeli governments, or of any other institution.
      </p>
    ),
  },
  {
    h: 'External links',
    body: (
      <p>
        This site links to external publications and resources. The Centre is not responsible for
        the content of external sites. Links represent editorial recognition of the linked work;
        they do not constitute endorsement of the linked site as a whole.
      </p>
    ),
  },
  {
    h: 'Availability',
    body: (
      <p>
        We aim to keep this site available at all times but make no warranty of continuous
        availability. Scheduled maintenance and unforeseen circumstances may cause temporary
        downtime.
      </p>
    ),
  },
  {
    h: 'Governing law',
    body: (
      <p>
        These terms are governed by the laws of India. Disputes arising from the use of this site
        are subject to the exclusive jurisdiction of the courts of New Delhi.
      </p>
    ),
  },
]

export default function TermsPage() {
  return (
    <>
      <StaticPageHero
        accent="navy"
        eyebrow="Legal"
        title="Terms of use."
        description={`Last reviewed ${formatDate(LAST_REVIEWED)}.`}
        crumbs={[{ label: 'Terms' }]}
      />
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-14 space-y-10 text-stone-700 leading-relaxed">
          {SECTIONS.map((s, i) => (
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
