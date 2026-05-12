import type { Metadata } from 'next'
import StaticPageHero from '@/components/StaticPageHero'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Governance',
  description: 'Governance structure of the India Israel Centre — board composition and editorial independence.',
}

const BOARD = [
  { name: 'Placeholder Director', title: 'Chair', affiliation: 'Affiliation to be confirmed' },
  { name: 'Placeholder Director', title: 'Director', affiliation: 'Affiliation to be confirmed' },
  { name: 'Placeholder Director', title: 'Director', affiliation: 'Affiliation to be confirmed' },
]

export default function GovernancePage() {
  return (
    <>
      <StaticPageHero
        accent="navy"
        eyebrow="Governance"
        title="How the Centre is run."
        description="Board oversight, editorial independence, and the separation between the two."
        crumbs={[{ label: 'About', href: '/about/' }, { label: 'Governance' }]}
      />

      <section className="bg-white border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-14 space-y-6 text-stone-700 leading-relaxed text-lg">
          <Reveal>
            <p>
              The India Israel Centre is governed by a board of directors constituted under its
              registered entity. The board is responsible for the Centre's institutional direction,
              financial oversight, and the appointment of executive leadership. It meets formally
              twice a year and operates through a governance charter that sets out the separation
              between board authority and editorial authority.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p>
              Editorial independence is a constitutional feature of the Centre's structure, not a
              managerial policy. The board does not commission, review, approve, or withdraw
              research publications. The editorial programme is the responsibility of the
              publication editor and commissioning editor, who report to the executive director on
              operational matters but to no one on editorial matters.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p>
              The board is composed of individuals with professional backgrounds in research, law,
              business, and public service. No board member holds a position in any government that
              has an interest in the India-Israel relationship as a matter of official policy.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <Reveal>
            <div className="text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-8">
              / Board of Directors
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200 border border-stone-200 rounded-sm overflow-hidden">
            {BOARD.map((m, i) => (
              <Reveal key={i} delay={Math.min(i * 80, 240)}>
                <div className="bg-white p-6 h-full">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-iic-saffron to-iic-navy text-white flex items-center justify-center mb-4 font-display font-bold text-lg ring-4 ring-iic-saffron/10">
                    {m.name[0]}
                  </div>
                  <div className="font-display font-semibold text-stone-900 mb-1">{m.name}</div>
                  <div className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-iic-saffron-deep mb-1">
                    {m.title}
                  </div>
                  <div className="text-xs text-stone-500">{m.affiliation}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="text-xs font-sans text-stone-400 mt-6 italic">
            Board composition to be populated prior to launch.
          </p>
        </div>
      </section>
    </>
  )
}
