import type { Metadata } from 'next'
import StaticPageHero from '@/components/StaticPageHero'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy of the India Israel Centre.',
}

const LAST_REVIEWED = '2026-05-01'

const SECTIONS = [
  {
    h: 'Who we are',
    body: (
      <p>
        This website is operated by the India Israel Centre, a registered entity based in New
        Delhi, India. References to &ldquo;we&rdquo;, &ldquo;us&rdquo;, and &ldquo;our&rdquo; in
        this policy refer to the India Israel Centre.
      </p>
    ),
  },
  {
    h: 'What data we collect and why',
    body: (
      <>
        <p>We collect the minimum personal data necessary for the operation of this website.</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>
            <strong>Newsletter subscriptions.</strong> When you subscribe, we collect your email
            address. We use this to send publications and Forum announcements. We do not share it
            with any third party.
          </li>
          <li>
            <strong>Contact form submissions.</strong> When you use a contact form, we collect the
            information you provide (name, email, message) solely to respond to your inquiry.
          </li>
          <li>
            <strong>Analytics.</strong> We use self-hosted analytics (PostHog) to understand how the
            site is used. Analytics data is anonymised; we do not track individual users or use
            cookies for analytics.
          </li>
        </ul>
      </>
    ),
  },
  {
    h: 'Legal basis for processing (Indian law)',
    body: (
      <p>
        We process personal data in accordance with the Digital Personal Data Protection Act 2023
        (India). Our legal basis for processing newsletter subscriber data is consent, which you
        provide by subscribing. Our legal basis for processing contact form data is legitimate
        interest in responding to inquiries.
      </p>
    ),
  },
  {
    h: 'How long we keep your data',
    body: (
      <p>
        Newsletter subscriber data is retained until you unsubscribe. Contact form data is retained
        for twelve months following the closure of the relevant correspondence.
      </p>
    ),
  },
  {
    h: 'Your rights',
    body: (
      <p>
        Under the DPDP Act 2023, you have the right to access, correct, and erase personal data we
        hold about you, and to withdraw consent at any time. To exercise these rights, write to{' '}
        <a
          href="mailto:editorial@indiaisraelcentre.org"
          className="text-iic-navy font-semibold underline-anim"
        >
          editorial@indiaisraelcentre.org
        </a>
        .
      </p>
    ),
  },
  {
    h: 'Cookies',
    body: (
      <p>
        This site uses no tracking cookies. A session cookie is set if you log in to the editorial
        CMS, but this is not accessible to visitors of the public-facing site.
      </p>
    ),
  },
  {
    h: 'Changes to this policy',
    body: (
      <p>
        We may update this policy from time to time. The date of the most recent review is shown
        at the top of the page.
      </p>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <>
      <StaticPageHero
        accent="navy"
        eyebrow="Legal"
        title="Privacy policy."
        description={`Last reviewed ${formatDate(LAST_REVIEWED)}.`}
        crumbs={[{ label: 'Privacy' }]}
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
