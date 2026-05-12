import type { Metadata } from 'next'
import StaticPageHero from '@/components/StaticPageHero'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Partner with Us',
  description: 'Institutional partnership inquiries for the India Israel Centre.',
}

export default function PartnerPage() {
  return (
    <>
      <StaticPageHero
        accent="gold"
        eyebrow="Partnerships"
        title="Partner with us."
        description="Institutional partnerships with research centres, universities, think tanks, and foundations."
        crumbs={[{ label: 'About', href: '/about/' }, { label: 'Partner with us' }]}
      />
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-14 space-y-5 text-stone-700 leading-relaxed text-lg">
          <p>
            The Centre considers institutional partnerships with bodies that work on overlapping
            questions or complementary geographies.
          </p>
          <p>
            We do not run a formal partnership programme. Each partnership is considered
            individually on the basis of intellectual fit, institutional independence, and the
            specific collaboration proposed. Arrangements may include joint convenings, co-authored
            research, visiting fellowships, or shared editorial projects.
          </p>
          <p>
            Please use the form below to introduce your institution. We respond within ten working
            days.
          </p>
        </div>
      </section>
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <ContactForm type="partner" />
        </div>
      </section>
    </>
  )
}
