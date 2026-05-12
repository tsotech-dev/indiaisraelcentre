import type { Metadata } from 'next'
import StaticPageHero from '@/components/StaticPageHero'
import ContactForm from '@/components/ContactForm'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Work with Us',
  description: 'Fellowship, affiliation, and employment routes at the India Israel Centre.',
}

const FELLOWSHIPS = [
  {
    title: 'Senior Fellow',
    description:
      "Established researchers with a significant publication record in one or more pillar areas. Expected to produce at least two publications per year and contribute to the Forum. Residential or non-residential.",
    accent: 'bg-iic-navy',
  },
  {
    title: 'Visiting Fellow',
    description:
      'Three to twelve months in residence at the Centre, working on a specific research project that results in at least one publication. Open to doctoral candidates in the final stages and to established researchers on sabbatical.',
    accent: 'bg-iic-saffron',
  },
  {
    title: 'Non-Resident Fellow',
    description:
      'Based at the home institution and contributing to the Centre on a defined basis — typically one publication per year and participation in one or two Forum convenings.',
    accent: 'bg-iic-gold-deep',
  },
]

export default function WorkWithUsPage() {
  return (
    <>
      <StaticPageHero
        accent="navy"
        eyebrow="Affiliation"
        title="Work with us."
        description="Fellowship, affiliation, and employment routes at the India Israel Centre."
        crumbs={[{ label: 'About', href: '/about/' }, { label: 'Work with us' }]}
      />

      <section className="bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <Reveal>
            <div className="text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-3">
              / Open positions
            </div>
            <p className="text-stone-700 leading-relaxed mb-2">
              No open positions at this time.
            </p>
            <p className="text-sm text-stone-500">
              We welcome speculative inquiries from researchers working in our pillar areas — please
              use the form below.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Reveal>
            <div className="text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-3">
              / Fellowship programmes
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 mb-10">
              Three modes of affiliation.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200 border border-stone-200 rounded-sm overflow-hidden">
            {FELLOWSHIPS.map((f, i) => (
              <Reveal key={f.title} delay={Math.min(i * 80, 240)}>
                <div className="group relative bg-white p-7 h-full hover:bg-iic-paper transition-colors">
                  <div className={`absolute top-0 left-0 w-full h-1 ${f.accent} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`} />
                  <h3 className="font-display text-xl font-bold text-stone-900 mb-3">{f.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{f.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-3">
            / Affiliation inquiry
          </div>
          <p className="text-stone-600 mb-8">
            Introduce yourself and describe the research you would bring to the Centre.
          </p>
          <ContactForm type="work" />
        </div>
      </section>
    </>
  )
}
