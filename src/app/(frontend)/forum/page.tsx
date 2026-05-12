import type { Metadata } from 'next'
import Link from 'next/link'
import ConveningCard from '@/components/ConveningCard'
import Reveal from '@/components/Reveal'
import { getConvenings } from '@/lib/payload'
import { pillarLabel } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Forum',
  description:
    'The India Israel Centre Forum is a programme of closed dialogues, roundtables, and public lectures chaired by Professor Khinvraj Jangid.',
}

export default async function ForumPage() {
  const [upcoming, recent] = await Promise.all([
    getConvenings({ upcoming: true, limit: 6 }),
    getConvenings({ upcoming: false, limit: 4 }),
  ])

  return (
    <>
      {/* HERO */}
      <section className="relative bg-iic-ink text-white overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-40 -left-32 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #003D7A 0%, transparent 65%)' }}
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -right-32 w-[520px] h-[520px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #FF671F 0%, transparent 65%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24">
          <div className="text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-6 animate-fade-up">
            / The Forum
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight mb-6 animate-fade-up delay-1">
                Rooms where<br />people speak <span className="italic text-iic-gold">candidly</span>.
              </h1>
              <p className="text-lg md:text-xl text-stone-300 font-display italic font-light leading-snug max-w-2xl animate-fade-up delay-2">
                A programme of closed dialogues, roundtables, and public lectures — chaired by
                Professor Khinvraj Jangid.
              </p>
            </div>
            <div className="lg:col-span-4 animate-fade-up delay-3">
              <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden">
                <div className="bg-white/[0.03] backdrop-blur p-5">
                  <div className="font-display text-4xl font-bold text-iic-saffron">8–12</div>
                  <div className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-stone-400 mt-1">
                    Closed dialogue
                  </div>
                </div>
                <div className="bg-white/[0.03] backdrop-blur p-5">
                  <div className="font-display text-4xl font-bold text-iic-gold">∞</div>
                  <div className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-stone-400 mt-1">
                    Public lectures
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 tricolor-bar h-[3px]" />
      </section>

      {/* FROM THE CHAIR */}
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-4">
                / From the Chair
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-stone-900 leading-tight mb-8">
                The India-Israel relationship is consequential enough to deserve sustained, serious
                intellectual attention.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="space-y-5 text-stone-700 leading-relaxed text-lg max-w-2xl">
                <p>
                  We convene people who have worked on the relationship — diplomats, defence
                  professionals, scientists, scholars, business leaders — from India, from Israel,
                  and from third countries where the relationship plays out. We bring them together
                  around questions, not agendas.
                </p>
                <p>
                  The output is not a communiqué. It is the quality of understanding participants
                  carry away, and occasionally a written record — a summary or a brief — of the
                  ground that was covered.
                </p>
                <p>
                  The strongest proposals for the Forum come from people with a specific analytical
                  puzzle, not a general interest in the subject.
                </p>
              </div>
              <div className="mt-8 text-sm font-sans text-stone-500 italic">
                — Professor Khinvraj Jangid, Chair of the Forum
              </div>
            </Reveal>
          </div>

          <aside className="lg:col-span-4">
            <Reveal delay={200}>
              <div className="border border-stone-200 bg-white rounded-sm p-7 relative overflow-hidden lg:sticky lg:top-24">
                <div className="absolute top-0 left-0 w-1 h-full bg-iic-saffron" />
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-iic-saffron to-iic-navy flex items-center justify-center mb-5 ring-4 ring-iic-saffron/10">
                  <span className="text-white text-2xl font-display font-bold">KJ</span>
                </div>
                <div className="font-display text-xl font-bold text-stone-900 mb-1">
                  Prof. Khinvraj Jangid
                </div>
                <div className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-iic-saffron-deep mb-4">
                  Chair of the Forum
                </div>
                <p className="text-sm text-stone-600 leading-relaxed mb-5">
                  Professor and Director, Jindal Centre for Israel Studies, O.P. Jindal Global
                  University. Specialist in India-Israel relations, Jewish studies, and South Asian
                  intellectual history.
                </p>
                <Link
                  href="/about/people/khinvraj-jangid/"
                  className="text-sm font-sans font-semibold text-iic-navy underline-anim"
                >
                  Full profile →
                </Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* UPCOMING */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Reveal>
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <div>
                <div className="text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-2">
                  / Next
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900">
                  Upcoming convenings
                </h2>
              </div>
            </div>
          </Reveal>
          {upcoming.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcoming.map((c, i) => (
                <Reveal key={c.id} delay={Math.min(i * 60, 360)}>
                  <ConveningCard
                    title={c.title}
                    slug={c.slug}
                    eventDate={c.eventDate}
                    format={c.format}
                    pillarLabel={c.pillar ? pillarLabel(c.pillar) : undefined}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-stone-300 rounded-sm p-16 text-center bg-iic-paper">
              <div className="font-display text-6xl text-stone-200 mb-4">∅</div>
              <p className="text-stone-500">Upcoming convenings will be announced here.</p>
            </div>
          )}
        </div>
      </section>

      {/* RECENT */}
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Reveal>
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <div>
                <div className="text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-2">
                  / Recent
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900">
                  From the archive
                </h2>
              </div>
              <Link
                href="/forum/archive/"
                className="text-sm font-sans font-semibold text-iic-navy underline-anim"
              >
                Full archive →
              </Link>
            </div>
          </Reveal>
          {recent.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recent.map((c, i) => (
                <Reveal key={c.id} delay={Math.min(i * 60, 360)}>
                  <ConveningCard
                    title={c.title}
                    slug={c.slug}
                    eventDate={c.eventDate}
                    format={c.format}
                    pillarLabel={c.pillar ? pillarLabel(c.pillar) : undefined}
                    compact
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-sm text-stone-400 italic">Past convenings will appear here.</p>
          )}
        </div>
      </section>
    </>
  )
}
