import type { Metadata } from 'next'
import StaticPageHero from '@/components/StaticPageHero'
import { getGlobal } from '@/lib/payload'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'Privacy notice of the India Israel Centre.',
}

const LAST_REVIEWED = '2026-05-11'

const SECTIONS = [
  {
    h: 'What personal data the Centre processes',
    body: (
      <>
        <p>
          <strong>Newsletter subscriptions.</strong> Email addresses provided on subscription, together with the date and (if recorded) the page from which the subscription was made.
        </p>
        <p>
          <strong>Contact form submissions.</strong> Information provided through the site&rsquo;s contact forms, including name, email address, affiliation if entered, subject and message content.
        </p>
        <p>
          <strong>Editorial communications.</strong> Correspondence with the Centre&rsquo;s editorial team and any personal data shared in that correspondence.
        </p>
        <p>
          <strong>Author and affiliate records.</strong> Where a person is published by or affiliated with the Centre, professional information including name, affiliation, biographical details, publication record and contact details, as required to operate the affiliation.
        </p>
        <p>
          <strong>Analytics data.</strong> Page views, navigation events, form submissions and PDF downloads, recorded anonymously through a self-hosted analytics platform. No user identifiers, no session replay, no cross-session tracking.
        </p>
      </>
    ),
  },
  {
    h: 'Lawful bases',
    body: (
      <p>
        Consent, for newsletter subscriptions and contact form submissions. Legitimate interest, for editorial and publication functions and the operation of the website. Legal obligation, where applicable.
      </p>
    ),
  },
  {
    h: 'Retention',
    body: (
      <p>
        Newsletter subscriptions retained until the subscriber unsubscribes or requests deletion. Contact form submissions retained for as long as the editorial conversation requires, not exceeding three years from last correspondence. Author and affiliate records retained for the duration of the affiliation and a reasonable period afterwards for historical and citation purposes.
      </p>
    ),
  },
  {
    h: 'Sharing',
    body: (
      <p>
        The Centre does not sell personal data. The Centre shares personal data with third parties only as required to operate its newsletter platform and (where applicable) its other operational services. No personal data is shared for advertising or marketing.
      </p>
    ),
  },
  {
    h: 'Rights',
    body: (
      <p>
        Persons whose personal data is processed by the Centre have the rights established by the Indian Digital Personal Data Protection Act 2023, including access, correction, erasure where applicable, and nomination. Requests to{' '}
        <a href="mailto:research@indiaisraelcentre.org" className="text-iic-navy font-semibold underline-anim">
          research@indiaisraelcentre.org
        </a>
        .
      </p>
    ),
  },
  {
    h: 'Changes',
    body: <p>The Centre updates this Notice as required by law or by changes to its practices.</p>,
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

export default async function PrivacyPage() {
  const c = await getGlobal('privacy')
  const cmsSections = (c?.sections as { heading: string; body: string }[] | null)?.length
    ? (c?.sections as { heading: string; body: string }[])
    : null
  const lastReviewed = (c?.lastReviewed as string | undefined) ?? LAST_REVIEWED

  return (
    <>
      <StaticPageHero
        accent="navy"
        eyebrow="Legal"
        title="Privacy"
        description={`This Privacy Notice describes how the India Israel Centre collects, uses, stores and protects personal data. Written to comply with the Indian Digital Personal Data Protection Act 2023. Last reviewed ${formatDate(lastReviewed)}.`}
        crumbs={[{ label: 'Privacy' }]}
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
