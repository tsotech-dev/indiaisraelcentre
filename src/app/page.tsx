import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PublicationCard from '@/components/PublicationCard'
import PillarNavigatorGrid from '@/components/PillarNavigatorGrid'
import NewsletterSignup from '@/components/NewsletterSignup'
import Reveal from '@/components/Reveal'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import { getPublications, getConvenings } from '@/lib/payload'
import { pillarLabel, formatDate, formatLabel } from '@/lib/utils'

const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'India Israel Centre',
  url: 'https://indiaisraelcentre.org',
  description:
    'An independent research and convening institution advancing serious scholarship on the India-Israel bilateral relationship.',
  sameAs: ['https://x.com/indiaisraelctr', 'https://linkedin.com/company/india-israel-centre'],
}

const STATS = [
  { value: '6', label: 'Research pillars' },
  { value: '24+', label: 'Publications planned in 2026' },
  { value: '12', label: 'Convenings a year' },
  { value: '2', label: 'Countries, one conversation' },
]

const PARTNERS = [
  'O.P. Jindal Global University',
  'Hebrew University of Jerusalem',
  'Tel Aviv University',
  'Observer Research Foundation',
  'Institute for National Security Studies',
  'Carnegie India',
  'Brookings India',
  'IDSA',
]

export default async function HomePage() {
  const [latestPubs, upcomingConvenings, commentary] = await Promise.all([
    getPublications({ limit: 4 }),
    getConvenings({ upcoming: true, limit: 2 }),
    getPublications({ type: 'commentary', limit: 3 }),
  ])

  const featured = latestPubs[0]
  const rest = latestPubs.slice(1, 4)

  return (
    <>
      <JsonLd data={ORG_JSONLD} />
      <Header />
      <main className="overflow-hidden">
        {/* ═══════════ HERO ═══════════ */}
        <section className="relative bg-mesh bg-grid">
          <div
            aria-hidden
            className="absolute -top-40 -right-40 w-[680px] h-[680px] rounded-full opacity-25 animate-float"
            style={{ background: 'radial-gradient(circle, #FF671F 0%, transparent 65%)' }}
          />
          <div
            aria-hidden
            className="absolute -bottom-60 -left-40 w-[720px] h-[720px] rounded-full opacity-20 animate-float"
            style={{
              background: 'radial-gradient(circle, #005EB8 0%, transparent 65%)',
              animationDelay: '2s',
            }}
          />
          <div
            aria-hidden
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full opacity-30"
            style={{ background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)' }}
          />

          <div className="relative max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-16 md:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur border border-iic-saffron/30 animate-fade-up">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-iic-saffron opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full w-2 h-2 bg-iic-saffron" />
                  </span>
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.18em] text-iic-saffron-deep">
                    India Israel Centre · Now publishing
                  </span>
                </div>

                <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tight text-stone-900 mb-8">
                  <span className="block animate-fade-up">Where</span>
                  <span className="block animate-fade-up delay-1">
                    <span className="text-iic-saffron">India</span>{' '}
                    <span className="italic font-light text-stone-400">meets</span>{' '}
                    <span className="text-iic-navy">Israel</span>
                  </span>
                  <span className="block animate-fade-up delay-2 italic font-light text-stone-600">
                    in serious scholarship.
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-10 max-w-2xl animate-fade-up delay-3">
                  An independent research and convening institution producing papers, briefs, and
                  commentary — and bringing scholars, diplomats, and practitioners into the same
                  room.
                </p>

                <div className="flex flex-wrap gap-3 animate-fade-up delay-4">
                  <Link
                    href="/research/"
                    className="group inline-flex items-center gap-3 bg-iic-navy text-white pl-6 pr-2 py-2 rounded-full font-sans font-semibold text-sm hover:bg-iic-saffron transition-all duration-300 shadow-lg shadow-iic-navy/20"
                  >
                    Explore the research
                    <span className="bg-white text-iic-navy group-hover:text-iic-saffron rounded-full w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                  <Link
                    href="/forum/"
                    className="inline-flex items-center gap-2 bg-white border border-stone-300 text-stone-900 px-6 py-3 rounded-full font-sans font-semibold text-sm hover:border-iic-navy hover:text-iic-navy transition-colors"
                  >
                    The Forum →
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 hidden lg:block animate-fade-up delay-5">
                {/* Editorial card */}
                <div className="relative bg-white/80 backdrop-blur border border-stone-200 rounded-sm p-6 shadow-xl shadow-stone-900/5">
                  <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-iic-gold text-iic-ink text-[10px] font-sans font-bold uppercase tracking-widest">
                    From the Editors
                  </div>
                  <p className="font-display text-lg leading-snug text-stone-800 italic mb-5 mt-2">
                    "The relationship is consequential enough to deserve sustained intellectual
                    attention — and we are building the room where that attention happens."
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-iic-saffron to-iic-navy flex items-center justify-center text-white text-xs font-sans font-bold">
                      KJ
                    </div>
                    <div className="text-xs font-sans">
                      <div className="font-semibold text-stone-900">Prof. Khinvraj Jangid</div>
                      <div className="text-stone-500">Chair, IIC Forum</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stat strip */}
            <div className="mt-20 md:mt-28 pt-8 border-t border-stone-200/80 grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={i * 80}>
                  <div>
                    <div className="font-display text-4xl md:text-5xl font-bold tracking-tight text-iic-navy mb-1">
                      {s.value}
                    </div>
                    <div className="text-[11px] font-sans uppercase tracking-[0.15em] text-stone-500">
                      {s.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-stone-400 animate-fade-in delay-5">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em]">Scroll</span>
            <span className="w-px h-10 bg-gradient-to-b from-stone-400 to-transparent" />
          </div>
        </section>

        {/* ═══════════ MARQUEE STRIP ═══════════ */}
        <section className="bg-iic-ink text-white py-5 overflow-hidden border-y border-iic-saffron/30 relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-iic-ink to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-iic-ink to-transparent z-10" />
          <div className="flex whitespace-nowrap animate-marquee">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center gap-12 px-6 shrink-0">
                {[
                  'Six research pillars',
                  'Twelve convenings a year',
                  'Independent. Editorially.',
                  'Papers · Briefs · Commentary',
                  'New Delhi · Jerusalem · Tel Aviv',
                  'Est. 2026',
                ].map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-12 text-sm font-sans font-medium uppercase tracking-[0.2em] text-white/80"
                  >
                    <span>{t}</span>
                    <span className="text-iic-saffron text-xl leading-none">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ MISSION TRIPTYCH ═══════════ */}
        <section className="bg-iic-paper border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
              <div className="lg:col-span-5">
                <div className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-iic-saffron mb-4">
                  / What we do
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight text-stone-900 mb-6">
                  A think tank built for{' '}
                  <span className="italic font-light text-stone-500">the long argument.</span>
                </h2>
              </div>
              <div className="lg:col-span-7 lg:pt-4">
                <p className="text-lg text-stone-600 leading-relaxed">
                  We exist because the India–Israel relationship is consequential enough to
                  deserve serious intellectual attention. The Centre produces research that
                  meets academic standards while remaining usable to policy professionals, and
                  convenes the people who actually move the relationship.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  num: '01',
                  title: 'Research',
                  body: 'Papers, briefs, and commentary across six thematic pillars that map the full scope of the relationship.',
                  link: { label: 'See publications', href: '/research/' },
                  accent: 'saffron',
                },
                {
                  num: '02',
                  title: 'Convenings',
                  body: 'Closed dialogues, roundtables, and public lectures — formats chosen to fit the question, not the calendar.',
                  link: { label: 'The Forum', href: '/forum/' },
                  accent: 'navy',
                },
                {
                  num: '03',
                  title: 'Network',
                  body: 'In-house staff, fellows, and affiliated researchers across Indian and Israeli universities and think tanks.',
                  link: { label: 'About the Centre', href: '/about/' },
                  accent: 'gold',
                },
              ].map((c, i) => (
                <Reveal key={c.num} delay={i * 120}>
                  <Link
                    href={c.link.href}
                    className="group block bg-white border border-stone-200 rounded-sm p-8 h-full hover-lift hover:border-iic-saffron/40 relative overflow-hidden"
                  >
                    <span
                      className={`absolute inset-x-0 top-0 h-1 ${
                        c.accent === 'saffron'
                          ? 'bg-iic-saffron'
                          : c.accent === 'navy'
                            ? 'bg-iic-navy'
                            : 'bg-iic-gold'
                      }`}
                    />
                    <div className="font-display text-5xl font-bold text-stone-200 mb-6 group-hover:text-iic-saffron transition-colors duration-500">
                      {c.num}
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-stone-900 mb-3">
                      {c.title}
                    </h3>
                    <p className="text-stone-600 leading-relaxed mb-6">{c.body}</p>
                    <div className="text-sm font-sans font-semibold text-iic-navy inline-flex items-center gap-1 underline-anim">
                      {c.link.label}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ FEATURED PUBLICATION ═══════════ */}
        {featured && (
          <section className="bg-white">
            <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
              <Reveal>
                <div className="flex items-end justify-between mb-10">
                  <div>
                    <div className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-iic-saffron mb-3">
                      / Featured publication
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-stone-900">
                      The latest from the Centre
                    </h2>
                  </div>
                  <Link
                    href="/research/"
                    className="hidden md:inline-flex items-center gap-1 text-sm font-sans font-semibold text-iic-navy underline-anim"
                  >
                    All publications →
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <Link
                  href={`/research/${featured.type}s/${featured.slug}/`}
                  className="group block relative border border-stone-200 rounded-sm overflow-hidden hover:border-iic-saffron transition-colors duration-500 hover-lift"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-2 bg-iic-navy bg-mesh-deep p-10 flex flex-col justify-between text-white min-h-[280px] relative overflow-hidden">
                      <div
                        aria-hidden
                        className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-30"
                        style={{ background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)' }}
                      />
                      <div className="relative">
                        <span className="inline-flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-iic-gold mb-4">
                          <span className="w-1.5 h-1.5 rounded-full bg-iic-gold" />
                          {formatLabel(featured.type)}
                        </span>
                        <div className="font-display text-sm text-white/70 uppercase tracking-widest">
                          {pillarLabel(featured.pillar)}
                        </div>
                      </div>
                      <div className="relative text-xs font-sans text-white/60 mt-8">
                        {formatDate(featured.publishedDate)}
                      </div>
                    </div>
                    <div className="md:col-span-3 p-10 bg-white">
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-stone-900 leading-snug mb-4 group-hover:text-iic-saffron-deep transition-colors">
                        {featured.title}
                      </h3>
                      {featured.abstract && (
                        <p className="text-stone-600 leading-relaxed mb-6 line-clamp-3">
                          {featured.abstract}
                        </p>
                      )}
                      <div className="text-sm font-sans text-stone-500 pt-4 border-t border-stone-100">
                        {featured.authors.map((a: { name: string }) => a.name).join(', ')}
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </div>
          </section>
        )}

        {/* ═══════════ RECENT PUBLICATIONS ═══════════ */}
        {rest.length > 0 && (
          <section className="bg-iic-paper border-y border-stone-200">
            <div className="max-w-7xl mx-auto px-6 py-20">
              <Reveal>
                <div className="flex items-end justify-between mb-10">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900">
                    Recently published
                  </h2>
                  <Link
                    href="/research/"
                    className="text-sm font-sans font-semibold text-iic-navy underline-anim"
                  >
                    View all →
                  </Link>
                </div>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {rest.map((pub, i) => (
                  <Reveal key={pub.id} delay={i * 100}>
                    <PublicationCard
                      title={pub.title}
                      slug={pub.slug}
                      type={pub.type}
                      authors={pub.authors}
                      publishedDate={pub.publishedDate}
                      pillarLabel={pillarLabel(pub.pillar)}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════ RESEARCH PILLARS ═══════════ */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12 items-end">
                <div className="lg:col-span-7">
                  <div className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-iic-saffron mb-3">
                    / Six pillars
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight text-stone-900">
                    The full breadth of the relationship,{' '}
                    <span className="italic font-light text-stone-500">organised.</span>
                  </h2>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-stone-600 leading-relaxed">
                    Each pillar is a coherent research programme — not a tag. Together they map
                    the relationship across identity, governance, security, technology, development,
                    and culture.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <PillarNavigatorGrid />
            </Reveal>
          </div>
        </section>

        {/* ═══════════ PULL QUOTE ═══════════ */}
        <section className="relative bg-iic-paper border-y border-stone-200 overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full opacity-30"
            style={{ background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)' }}
          />
          <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
            <Reveal>
              <div className="font-display text-iic-saffron text-7xl md:text-9xl leading-none mb-4 opacity-40">
                "
              </div>
              <blockquote className="font-display text-3xl md:text-5xl font-light leading-tight text-stone-900 max-w-4xl mx-auto">
                We bring people together around{' '}
                <span className="text-iic-saffron font-normal italic">questions</span>, not agendas.
                The output is the quality of understanding participants carry away — and occasionally,
                a written record of the ground that was covered.
              </blockquote>
              <div className="mt-10 inline-flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-iic-saffron to-iic-navy flex items-center justify-center text-white text-sm font-sans font-bold">
                  KJ
                </div>
                <div className="text-left">
                  <div className="font-sans font-semibold text-stone-900 text-sm">
                    Professor Khinvraj Jangid
                  </div>
                  <div className="text-xs font-sans text-stone-500 uppercase tracking-wider">
                    Chair, IIC Forum
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ UPCOMING CONVENINGS — DARK ═══════════ */}
        <section className="relative bg-iic-ink bg-mesh-deep text-white overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-[0.04]" />
          <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
            <Reveal>
              <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
                <div>
                  <div className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-iic-gold mb-3">
                    / The Forum
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                    Upcoming convenings
                  </h2>
                </div>
                <Link
                  href="/forum/"
                  className="group inline-flex items-center gap-3 text-sm font-sans font-semibold text-iic-gold pl-4 pr-1 py-1 rounded-full border border-iic-gold/30 hover:border-iic-gold transition-colors"
                >
                  Full programme
                  <span className="bg-iic-gold text-iic-ink rounded-full w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </Reveal>

            {upcomingConvenings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingConvenings.map((c, i) => (
                  <Reveal key={c.id} delay={i * 120}>
                    <Link
                      href={`/forum/${c.slug}/`}
                      className="group block bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-iic-gold/50 rounded-sm p-8 transition-all backdrop-blur-sm relative overflow-hidden"
                    >
                      <span className="absolute top-0 left-0 h-1 bg-iic-saffron w-0 group-hover:w-full transition-all duration-700" />
                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <span className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-iic-gold bg-iic-gold/10 px-2.5 py-1 rounded-full">
                          {c.format}
                        </span>
                        {c.pillar && (
                          <span className="text-[10px] font-sans text-white/50 uppercase tracking-wider">
                            {pillarLabel(c.pillar)}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-2xl font-semibold leading-snug mb-6 group-hover:text-iic-gold transition-colors">
                        {c.title}
                      </h3>
                      <div className="flex items-center justify-between pt-5 border-t border-white/10">
                        <time className="text-sm font-sans text-white/70 uppercase tracking-wider">
                          {formatDate(c.eventDate)}
                        </time>
                        <span className="text-iic-gold opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-white/15 rounded-sm p-12 text-center">
                <p className="text-white/60">Upcoming convenings will be announced here.</p>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════ COMMENTARY ═══════════ */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
            <Reveal>
              <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
                <div>
                  <div className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-iic-saffron mb-3">
                    / Commentary
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-stone-900">
                    Timely analysis
                  </h2>
                </div>
                <Link
                  href="/research/commentary/"
                  className="text-sm font-sans font-semibold text-iic-navy underline-anim"
                >
                  All commentary →
                </Link>
              </div>
            </Reveal>

            {commentary.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {commentary.map((pub, i) => (
                  <Reveal key={pub.id} delay={i * 100}>
                    <PublicationCard
                      title={pub.title}
                      slug={pub.slug}
                      type={pub.type}
                      authors={pub.authors}
                      publishedDate={pub.publishedDate}
                      pillarLabel={pillarLabel(pub.pillar)}
                    />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-stone-200 rounded-sm p-12 text-center">
                <p className="text-stone-400">Commentary will appear here as it is published.</p>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════ PARTNERS MARQUEE ═══════════ */}
        <section className="bg-iic-paper border-y border-stone-200 py-12 overflow-hidden">
          <div className="text-center mb-8">
            <div className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-stone-400">
              In conversation with
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-iic-paper to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-iic-paper to-transparent z-10" />
            <div className="flex whitespace-nowrap animate-marquee">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex items-center gap-16 px-8 shrink-0">
                  {PARTNERS.map((p) => (
                    <span
                      key={`${dup}-${p}`}
                      className="font-display text-xl md:text-2xl font-semibold text-stone-400 shrink-0"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ NEWSLETTER ═══════════ */}
        <section id="newsletter" className="relative bg-white border-b border-stone-200 scroll-mt-20">
          <div className="tricolor-bar h-1 absolute top-0 inset-x-0" />
          <div className="bg-mesh">
            <div className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center relative">
              <Reveal>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-iic-saffron text-white mb-8 animate-pulse-ring">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-iic-saffron mb-4">
                  The Brief — Monthly
                </div>
                <h2 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] text-stone-900 mb-5">
                  Get the Centre's work,{' '}
                  <span className="italic font-light text-stone-500">in your inbox.</span>
                </h2>
                <p className="text-lg text-stone-600 leading-relaxed mb-10 max-w-xl mx-auto">
                  One monthly note from the editors: new publications, upcoming convenings, and a
                  brief read from the chair. No filler. Unsubscribe any time.
                </p>
                <div className="max-w-md mx-auto">
                  <NewsletterSignup source="homepage" variant="light" />
                </div>
                <p className="text-xs font-sans text-stone-400 mt-5">
                  We confirm subscriptions by email. Your address is never shared.
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
