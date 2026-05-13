import type { Metadata } from 'next'
import StaticPageHero from '@/components/StaticPageHero'
import Reveal from '@/components/Reveal'
import Image from 'next/image'
import { getGlobal } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Academic Partners',
  description:
    'The India Israel Centre is established in academic partnership with the Centre for Israel Studies at O.P. Jindal Global University.',
}

const DEFAULTS = {
  partnerName: 'Centre for Israel Studies, O.P. Jindal Global University',
  paragraph1:
    'The India Israel Centre is established in academic partnership with the Centre for Israel Studies at O.P. Jindal Global University in Sonipat, Haryana. The Director of the Centre for Israel Studies, Professor Khinvraj Jangid, chairs the Forum at the India Israel Centre.',
  paragraph2:
    "The Centre for Israel Studies is one of the few research and teaching centres on Israel and on India-Israel comparative scholarship at any Indian university. The partnership joins the India Israel Centre's policy-engagement and convening work with the Centre for Israel Studies' research and teaching programme on Israel and on comparative studies.",
  addressLine1: 'Centre for Israel Studies',
  addressLine2: 'O.P. Jindal Global University',
  addressLine3: 'Sonipat, Haryana, India',
}

export default async function AcademicPartnersPage() {
  const c = await getGlobal('about-academic-partners')
  const partnerName = (c?.partnerName as string | undefined) ?? DEFAULTS.partnerName
  const p1 = (c?.paragraph1 as string | undefined) ?? DEFAULTS.paragraph1
  const p2 = (c?.paragraph2 as string | undefined) ?? DEFAULTS.paragraph2
  const a1 = (c?.addressLine1 as string | undefined) ?? DEFAULTS.addressLine1
  const a2 = (c?.addressLine2 as string | undefined) ?? DEFAULTS.addressLine2
  const a3 = (c?.addressLine3 as string | undefined) ?? DEFAULTS.addressLine3

  return (
    <>
      <StaticPageHero
        accent="navy"
        eyebrow="About"
        title="Academic Partners"
        description="Institutional partnerships that anchor the Centre's research and teaching."
        crumbs={[{ label: 'About', href: '/about/' }, { label: 'Academic Partners' }]}
      />
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Reveal>
            <div className="flex items-center gap-6 mb-8">
              <Image
                src="/images/O._P._Jindal_Global_University_Logo.png"
                alt="O.P. Jindal Global University crest"
                width={80}
                height={80}
                className="object-contain shrink-0"
              />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900">
                {partnerName}
              </h2>
            </div>
          </Reveal>
          <div className="space-y-5 text-stone-700 leading-relaxed text-lg">
            <Reveal delay={100}>
              <p>{p1}</p>
            </Reveal>
            <Reveal delay={180}>
              <p>{p2}</p>
            </Reveal>
          </div>
          <Reveal delay={260}>
            <div className="mt-10 border-l-2 border-iic-saffron/40 pl-5 text-stone-800">
              <p className="font-semibold">{a1}</p>
              <p className="font-semibold">{a2}</p>
              <p>{a3}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
