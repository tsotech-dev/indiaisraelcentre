import type { Metadata } from 'next'
import StaticPageHero from '@/components/StaticPageHero'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Editorial Inquiries',
  description: 'Contact the India Israel Centre editorial team.',
}

export default function EditorialContactPage() {
  return (
    <>
      <StaticPageHero
        accent="navy"
        eyebrow="Editorial"
        title="Editorial inquiries."
        description="Proposals, research correspondence, corrections, and general editorial questions."
        crumbs={[
          { label: 'About', href: '/about/' },
          { label: 'Contact', href: '/about/contact/' },
          { label: 'Editorial' },
        ]}
      />
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <p className="text-base text-stone-700 leading-relaxed mb-3">
            You may also write directly to{' '}
            <a
              href="mailto:editorial@indiaisraelcentre.org"
              className="text-iic-navy font-semibold underline-anim font-mono text-sm"
            >
              editorial@indiaisraelcentre.org
            </a>
            .
          </p>
          <p className="text-sm font-sans text-stone-500 mb-10">
            We aim to respond within five working days.
          </p>
          <ContactForm type="editorial" recipientHint="editorial@indiaisraelcentre.org" />
        </div>
      </section>
    </>
  )
}
