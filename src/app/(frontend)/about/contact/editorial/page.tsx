import type { Metadata } from 'next'
import StaticPageHero from '@/components/StaticPageHero'
import ContactForm from '@/components/ContactForm'
import { getGlobal } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Editorial Inquiries',
  description: 'Contact the India Israel Centre editorial team.',
}

export default async function EditorialContactPage() {
  const c = await getGlobal('about-contact-editorial')

  return (
    <>
      <StaticPageHero
        accent="navy"
        eyebrow="Editorial"
        title="Editorial inquiries."
        description="Proposals, research correspondence, corrections, and general editorial questions."
        crumbs={[{ label: 'About', href: '/about/' }, { label: 'Contact', href: '/about/contact/' }, { label: 'Editorial' }]}
      />
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <p className="text-base text-stone-700 leading-relaxed mb-3">
            {(c?.intro as string | undefined) ?? 'You may also write directly to'}{' '}
            <a href="mailto:research@indiaisraelcentre.org" className="text-iic-navy font-semibold underline-anim font-mono text-sm">
              research@indiaisraelcentre.org
            </a>.
          </p>
          <p className="text-sm font-sans text-stone-500 mb-10">
            {(c?.responseNote as string | undefined) ?? 'We aim to respond within five working days.'}
          </p>
          <ContactForm type="editorial" recipientHint="research@indiaisraelcentre.org" />
        </div>
      </section>
    </>
  )
}
