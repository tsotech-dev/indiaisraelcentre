import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'About',
  description:
    'The India Israel Centre is an independent research and convening institution. Learn about our mission, programme, and how to engage with us.',
}

const PILLARS_OF_WORK = [
  {
    n: '01',
    title: 'Research',
    body:
      'Papers, Briefs, and Commentary across six thematic pillars, authored by in-house staff, fellows, and affiliated researchers from Indian and Israeli institutions.',
    accent: 'bg-iic-navy',
  },
  {
    n: '02',
    title: 'Convenings',
    body:
      'The Forum brings practitioners, scholars, and policymakers together in closed dialogues, roundtables, and public lectures. Format follows the question.',
    accent: 'bg-iic-saffron',
  },
  {
    n: '03',
    title: 'Network',
    body:
      'A research community of staff, fellows — senior, visiting, non-resident — and affiliates across both countries and a range of disciplines.',
    accent: 'bg-iic-gold-deep',
  },
  {
    n: '04',
    title: 'Engagement',
    body:
      'We engage journalists, parliamentary staff, diplomats, and business leaders who need reliable analysis of the relationship.',
    accent: 'bg-iic-blue',
  },
]

const FOOTER_LINKS = [
  { label: 'Governance', href: '/about/governance/' },
  { label: 'Contact', href: '/about/contact/' },
  { label: 'Partner with us', href: '/about/partner-with-us/' },
  { label: 'Work with us', href: '/about/work-with-us/' },
]

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-mesh border-b border-stone-200 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #FF671F 0%, transparent 65%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-20">
          <div className="text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-4 animate-fade-up">
            / About the Centre
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight text-stone-900 mb-6 max-w-4xl animate-fade-up delay-1">
            An <span className="italic text-iic-saffron">independent</span> research and convening
            institution.
          </h1>
          <p className="text-lg md:text-xl text-stone-500 font-display italic font-light max-w-3xl animate-fade-up delay-2">
            Dedicated to serious scholarship on the India-Israel bilateral relationship — among the
            more consequential and under-analysed relationships in contemporary international
            affairs.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-3">
                / Mission
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 leading-tight">
                Knowledge, not advocacy.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8 space-y-5 text-stone-700 leading-relaxed text-lg">
            <Reveal delay={100}>
              <p>
                The Centre produces research — papers, policy briefs, and commentary — that meets
                academic standards while remaining accessible to policy professionals, journalists,
                and engaged citizens. We convene practitioners, scholars, and policymakers in
                environments that enable candid analytical exchange.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p>
                We are editorially independent. Our research represents the views of its authors.
                The Centre's institutional position is to build the knowledge base for serious
                engagement with the relationship — not to advocate for any particular policy
                outcome.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CHAIR FEATURE */}
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <Reveal>
            <div className="text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-8">
              / Chair of the Forum
            </div>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4">
              <Reveal>
                <div className="aspect-square bg-gradient-to-br from-iic-saffron via-iic-saffron-deep to-iic-navy rounded-sm relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <span className="font-display text-9xl font-bold text-white/95 relative">KJ</span>
                  <div className="absolute bottom-4 left-4 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-white/80">
                    Chair
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal delay={120}>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-stone-900 mb-3">
                  Professor Khinvraj Jangid
                </h3>
                <p className="text-sm font-sans font-semibold text-iic-saffron-deep uppercase tracking-[0.14em] mb-6">
                  Director, Jindal Centre for Israel Studies
                </p>
                <p className="text-lg text-stone-700 leading-relaxed mb-8 max-w-2xl">
                  One of India's foremost scholars of the India-Israel relationship. Has published
                  extensively on its political history, the Jewish communities of India, and the
                  intersection of South Asian and Israeli political thought. Chairs the Forum,
                  setting its intellectual programme and presiding over its convenings.
                </p>
                <Link
                  href="/about/people/khinvraj-jangid/"
                  className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-iic-navy underline-anim"
                >
                  Full profile →
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <Reveal>
            <div className="text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-3">
              / What we do
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-stone-900 leading-tight mb-12 max-w-3xl">
              Four programmes, one purpose.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone-200 border border-stone-200 rounded-sm overflow-hidden">
            {PILLARS_OF_WORK.map((p, i) => (
              <Reveal key={p.n} delay={Math.min(i * 80, 320)}>
                <div className="group relative bg-white p-8 lg:p-10 h-full hover:bg-iic-paper transition-colors">
                  <div className={`absolute top-0 left-0 w-full h-1 ${p.accent} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`} />
                  <div className="font-display text-5xl font-bold text-stone-200 mb-3 group-hover:text-iic-saffron transition-colors">
                    {p.n}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-stone-900 mb-3">{p.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GOVERNANCE TEASER + NAV */}
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Reveal>
            <p className="text-stone-600 mb-10 max-w-2xl">
              The Centre is governed by a board of directors. Editorial independence is a
              constitutional feature of the structure, not a managerial policy.{' '}
              <Link href="/about/governance/" className="text-iic-navy font-semibold underline-anim">
                See the Governance page →
              </Link>
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-stone-200 border border-stone-200 rounded-sm overflow-hidden">
            {FOOTER_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group bg-white p-6 hover:bg-iic-navy transition-colors"
              >
                <div className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-stone-400 group-hover:text-iic-saffron mb-2 transition-colors">
                  Section
                </div>
                <div className="font-display text-lg font-semibold text-stone-900 group-hover:text-white transition-colors">
                  {l.label} →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
