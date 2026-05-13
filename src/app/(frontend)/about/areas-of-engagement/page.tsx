import type { Metadata } from 'next'
import Link from 'next/link'
import StaticPageHero from '@/components/StaticPageHero'
import Reveal from '@/components/Reveal'
import { getGlobal } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Areas of Engagement',
  description:
    "The Centre's work runs across five areas: Academic Dialogue, Policy Conversations, Public Dissemination, Research and Analysis, and Events and Roundtables.",
}

const DEFAULT_INTRO =
  "The Centre's work runs across five areas, which overlap in practice."

const DEFAULT_AREAS = [
  {
    label: 'Academic Dialogue.',
    body: 'Sustained exchange between scholars of India and Israel, hosted under the Forum and conducted in a register suited to research rather than to public communication. Convenings under this heading are typically closed-door and produce written outputs.',
  },
  {
    label: 'Policy Conversations.',
    body: 'Structured engagement between policy professionals, practitioners and researchers on questions where research and practice meet productively. The format is more deliberative than a public lecture and produces briefs or background papers intended to inform decision-makers.',
  },
  {
    label: 'Public Dissemination.',
    body: "Publication and circulation of authoritative scholarship to journalists, policy audiences and informed citizens. The Centre's website hosts every publication and convening record in formats designed for citation, retrieval and re-use, including machine-readable forms suited to academic citation managers.",
  },
  {
    label: 'Research and Analysis.',
    body: 'Long papers, policy briefs and commentary commissioned by the Centre, organised across the six thematic pillars and authored by researchers with subject-matter standing.',
    href: '/research/',
  },
  {
    label: 'Events and Roundtables.',
    body: "The Forum's convening programme, including closed-door roundtables, dialogues and public lectures.",
    href: '/forum/',
  },
]

export default async function AreasOfEngagementPage() {
  const c = await getGlobal('about-areas-of-engagement')
  const intro = (c?.intro as string | undefined) ?? DEFAULT_INTRO
  const areas = (c?.areas as { label: string; body: string; href?: string }[] | null)?.length
    ? (c?.areas as { label: string; body: string; href?: string }[])
    : DEFAULT_AREAS

  return (
    <>
      <StaticPageHero
        accent="navy"
        eyebrow="About"
        title="Areas of Engagement"
        description="Five overlapping areas through which the Centre works."
        crumbs={[{ label: 'About', href: '/about/' }, { label: 'Areas of Engagement' }]}
      />
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Reveal>
            <p className="text-stone-700 leading-relaxed text-lg mb-10">{intro}</p>
          </Reveal>
          <div className="space-y-8">
            {areas.map((a, i) => (
              <Reveal key={i} delay={Math.min(i * 60, 300)}>
                <div className="border-l-2 border-iic-saffron/40 pl-5">
                  <p className="text-stone-700 leading-relaxed">
                    {a.href ? (
                      <Link href={a.href} className="font-semibold text-iic-navy underline-anim">
                        {a.label}
                      </Link>
                    ) : (
                      <strong className="font-semibold text-stone-900">{a.label}</strong>
                    )}{' '}
                    {a.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
