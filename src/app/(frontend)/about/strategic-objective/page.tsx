import type { Metadata } from 'next'
import Link from 'next/link'
import StaticPageHero from '@/components/StaticPageHero'
import Reveal from '@/components/Reveal'
import { getGlobal } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Strategic Objective',
  description:
    "The India Israel Centre's strategic objective: consolidate and advance the India-Israel bilateral relationship through sustained academic inquiry and informed public discourse.",
}

const DEFAULT_P1 =
  "To consolidate and advance the India-Israel bilateral relationship through sustained academic inquiry, evidence-based policy engagement, and informed public discourse, establishing the partnership as a strategically consequential, institutionally grounded, and enduring pillar of India's foreign policy architecture in a rapidly evolving international order."

const DEFAULT_P2 =
  "The Centre pursues this objective through its research programme, its convening work under the Forum, and its public-dissemination work across the six thematic pillars that organise the Centre's intellectual life."

export default async function StrategicObjectivePage() {
  const c = await getGlobal('about-strategic-objective')
  const p1 = (c?.paragraph1 as string | undefined) ?? DEFAULT_P1
  const p2 = (c?.paragraph2 as string | undefined) ?? DEFAULT_P2

  return (
    <>
      <StaticPageHero
        accent="navy"
        eyebrow="About"
        title="Strategic Objective"
        description="What the Centre is for."
        crumbs={[{ label: 'About', href: '/about/' }, { label: 'Strategic Objective' }]}
      />
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-16 space-y-6 text-stone-700 leading-relaxed text-lg">
          <Reveal>
            <p>{p1}</p>
          </Reveal>
          <Reveal delay={100}>
            <p>
              The Centre pursues this objective through its{' '}
              <Link href="/research/" className="text-iic-navy font-semibold underline-anim">
                research programme
              </Link>
              , its{' '}
              <Link href="/forum/" className="text-iic-navy font-semibold underline-anim">
                convening work
              </Link>{' '}
              under the Forum, and its public-dissemination work across the six{' '}
              <Link href="/research/" className="text-iic-navy font-semibold underline-anim">
                thematic pillars
              </Link>{' '}
              that organise the Centre&rsquo;s intellectual life.
            </p>
            {c?.paragraph2 && <p className="text-sm text-stone-500 italic mt-4 hidden">{p2}</p>}
          </Reveal>
        </div>
      </section>
    </>
  )
}
