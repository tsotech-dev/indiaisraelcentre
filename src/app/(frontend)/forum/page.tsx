import type { Metadata } from 'next'
import Link from 'next/link'
import ConveningCard from '@/components/ConveningCard'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import Reveal from '@/components/Reveal'
import { getConvenings, getGlobal } from '@/lib/payload'
import { pillarLabel } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'The Forum',
  description:
    "The India Israel Centre's convening programme. Closed-door roundtables, dialogues and public lectures chaired by Professor Khinvraj Jangid.",
}

const DEFAULTS = {
  chairParagraph1:
    'The Forum at the India Israel Centre brings sustained intellectual attention to the questions that the comparative study of India and Israel rewards. Two states emerged from empire within a year of each other, each carrying old civilisational traditions into modern constitutional democracies, and each has spent its first three quarters of a century working out the relationship between inherited tradition and the practical demands of national politics.',
  chairParagraph2:
    "The Forum's programme proceeds from a conviction that this comparison has been under-attempted, that it is sharper when conducted carefully than when conducted by analogy, and that the Indian and Israeli intellectual communities have much to learn from each other.",
  chairParagraph3:
    "The Forum hosts convenings in the formats appropriate to the work. Closed-door roundtables under the Chatham House rule allow scholars and practitioners to speak frankly on questions where public attribution would constrain the conversation. Public lectures and dialogues bring the Forum's intellectual programme into wider circulation.",
  chairSignature: '— Professor Khinvraj Jangid, Chair of the Forum',
}

export default async function ForumPage() {
  const [upcoming, recent, c] = await Promise.all([
    getConvenings({ upcoming: true, limit: 6 }),
    getConvenings({ upcoming: false, limit: 4 }),
    getGlobal('forum'),
  ])

  const p1 = (c?.chairParagraph1 as string | undefined) ?? DEFAULTS.chairParagraph1
  const p2 = (c?.chairParagraph2 as string | undefined) ?? DEFAULTS.chairParagraph2
  const p3 = (c?.chairParagraph3 as string | undefined) ?? DEFAULTS.chairParagraph3
  const sig = (c?.chairSignature as string | undefined) ?? DEFAULTS.chairSignature

  return (
    <>
      {/* HERO */}
      <section className="relative bg-iic-ink text-white overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-40 -left-32 w-[600px] h-[600px] rounded-full opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #003D7A 0%, transparent 65%)' }}
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -right-32 w-[520px] h-[520px] rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #FF671F 0%, transparent 65%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-0 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 pb-20">
              <div className="text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-iic-saffron mb-6 animate-fade-up">
                / The Forum
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight mb-6 animate-fade-up delay-1">
                The Forum
              </h1>
              <p className="font-display italic text-xl md:text-2xl text-stone-300 mb-8 animate-fade-up delay-2">
                The Centre&rsquo;s convening programme.
              </p>
              <p className="text-stone-400 leading-relaxed max-w-xl animate-fade-up delay-3">
                Closed-door roundtables, open public lectures, and analytical dialogues — format chosen
                to fit the question, not the calendar.
              </p>
            </div>
            <div className="hidden lg:block lg:col-span-5 self-end">
              <ImagePlaceholder
                alt="Forum convening in session — wide-angle photograph of a roundtable, warm tungsten lighting, participants in soft focus, 4:5 portrait orientation"
                aspectRatio="4/5"
                className="rounded-tl-2xl rounded-tr-2xl border-b-0 bg-iic-ink/50 border-white/20 w-full"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 tricolor-bar h-[3px]" />
      </section>

      {/* CHAIR'S INTRODUCTION */}
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <Reveal>
            <div className="text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-iic-saffron mb-4">
              / Chair&rsquo;s introduction
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start mt-4">

            {/* Portrait + name */}
            <Reveal className="md:col-span-3">
              <ImagePlaceholder
                alt="Professor Khinvraj Jangid — editorial portrait, square crop, neutral background, professional attire"
                aspectRatio="1/1"
                className="rounded-lg"
              />
              <div className="mt-4">
                <div className="text-sm font-sans font-semibold text-stone-900 leading-snug">
                  Professor Khinvraj Jangid
                </div>
                <div className="text-xs font-sans text-stone-500 mt-0.5">Chair of the Forum</div>
                <div className="text-xs font-sans text-stone-400 mt-0.5">
                  Director, Centre for Israel Studies,<br />O.P. Jindal Global University
                </div>
              </div>
            </Reveal>

            {/* Text */}
            <div className="md:col-span-9 space-y-5 text-stone-700 leading-relaxed text-lg">
              <Reveal delay={100}><p>{p1}</p></Reveal>
              <Reveal delay={160}><p>{p2}</p></Reveal>
              <Reveal delay={220}><p>{p3}</p></Reveal>
              <Reveal delay={280}>
                <div className="pt-4 border-t border-stone-200">
                  <div className="text-sm font-sans text-stone-500 italic mb-3">{sig}</div>
                  <Link
                    href="/about/people/khinvraj-jangid/"
                    className="text-sm font-sans font-semibold text-iic-navy underline-anim"
                  >
                    Full profile →
                  </Link>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* UPCOMING */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Reveal>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <div className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-iic-saffron mb-2">
                  / Upcoming
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900">
                  Upcoming convenings
                </h2>
              </div>
            </div>
          </Reveal>
          {upcoming.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
            <div className="border border-dashed border-stone-300 rounded-lg p-16 text-center bg-iic-paper">
              <p className="text-stone-500">Upcoming convenings will be announced here.</p>
            </div>
          )}
        </div>
      </section>

      {/* RECENT */}
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Reveal>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <div className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-iic-saffron mb-2">
                  / Archive
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900">
                  Recent convenings
                </h2>
              </div>
              <Link href="/forum/archive/" className="text-sm font-sans font-semibold text-iic-navy underline-anim">
                Full archive →
              </Link>
            </div>
          </Reveal>
          {recent.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
