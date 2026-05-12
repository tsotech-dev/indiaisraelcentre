import type { Metadata } from 'next'
import StaticPageHero from '@/components/StaticPageHero'
import ContactForm from '@/components/ContactForm'
import Reveal from '@/components/Reveal'
import { getGlobal } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Work with Us',
  description: 'Fellowship, affiliation, and employment routes at the India Israel Centre.',
}

const ACCENTS = ['bg-iic-navy', 'bg-iic-saffron', 'bg-iic-gold-deep']

const DEFAULT_FELLOWSHIPS = [
  { title: 'Senior Fellow', body: "Established researchers with a significant publication record in one or more pillar areas. Expected to produce at least two publications per year and contribute to the Forum. Residential or non-residential." },
  { title: 'Visiting Fellow', body: 'Three to twelve months in residence at the Centre, working on a specific research project that results in at least one publication. Open to doctoral candidates in the final stages and to established researchers on sabbatical.' },
  { title: 'Non-Resident Fellow', body: 'Based at the home institution and contributing to the Centre on a defined basis — typically one publication per year and participation in one or two Forum convenings.' },
]

export default async function WorkWithUsPage() {
  const c = await getGlobal('about-work-with-us')
  const fellowships = (c?.fellowships as { title: string; body: string }[] | null)?.length
    ? (c?.fellowships as { title: string; body: string }[])
    : DEFAULT_FELLOWSHIPS

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
            <div className="text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-3">/ Open positions</div>
            <p className="text-stone-700 leading-relaxed mb-2">
              {(c?.openPositionsNote as string | undefined) ?? 'No open positions at this time.'}
            </p>
            <p className="text-sm text-stone-500">
              {(c?.intro as string | undefined) ?? 'We welcome speculative inquiries from researchers working in our pillar areas — please use the form below.'}
            </p>
          </Reveal>
        </div>
      </section>
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Reveal>
            <div className="text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-3">/ Fellowship programmes</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 mb-10">
              {(c?.fellowshipsHeading as string | undefined) ?? 'Three modes of affiliation.'}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200 border border-stone-200 rounded-sm overflow-hidden">
            {fellowships.map((f, i) => (
              <Reveal key={f.title} delay={Math.min(i * 80, 240)}>
                <div className="group relative bg-white p-7 h-full hover:bg-iic-paper transition-colors">
                  <div className={`absolute top-0 left-0 w-full h-1 ${ACCENTS[i] ?? 'bg-iic-navy'} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`} />
                  <h3 className="font-display text-xl font-bold text-stone-900 mb-3">{f.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-3">/ Affiliation inquiry</div>
          <p className="text-stone-600 mb-8">
            {(c?.affiliationIntro as string | undefined) ?? 'Introduce yourself and describe the research you would bring to the Centre.'}
          </p>
          <ContactForm type="work" />
        </div>
      </section>
    </>
  )
}
