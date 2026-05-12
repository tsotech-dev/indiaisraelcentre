import type { Metadata } from 'next'
import StaticPageHero from '@/components/StaticPageHero'
import ContactForm from '@/components/ContactForm'
import { getGlobal } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Media Inquiries',
  description: 'Press contact for the India Israel Centre.',
}

export default async function MediaContactPage() {
  const c = await getGlobal('about-contact-media')

  return (
    <>
      <StaticPageHero
        accent="saffron"
        eyebrow="Media"
        title="Media inquiries."
        description="Press contacts, background briefings, and requests for comment."
        crumbs={[{ label: 'About', href: '/about/' }, { label: 'Contact', href: '/about/contact/' }, { label: 'Media' }]}
      />
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <p className="text-base text-stone-700 leading-relaxed mb-3">
            {(c?.intro as string | undefined) ?? 'Write to'}{' '}
            <a href="mailto:media@indiaisraelcentre.org" className="text-iic-navy font-semibold underline-anim font-mono text-sm">
              media@indiaisraelcentre.org
            </a>{' '}or use the form below.
          </p>
          <p className="text-sm font-sans text-stone-400 italic mb-10">
            {(c?.pressNote as string | undefined) ?? 'Press materials and media resources will be added in due course.'}
          </p>
          <ContactForm type="media" recipientHint="media@indiaisraelcentre.org" />
        </div>
      </section>
    </>
  )
}
