import type { Metadata } from 'next'
import Link from 'next/link'
import StaticPageHero from '@/components/StaticPageHero'
import Reveal from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Contact and Engagement',
  description: 'Contact the India Israel Centre — editorial inquiries, media inquiries, institutional partnerships, and fellowship routes.',
}

const ROUTES = [
  {
    title: 'Editorial inquiries',
    description: 'Proposals for publications, questions about research, corrections, and general editorial correspondence.',
    href: '/about/contact/editorial/',
    email: 'editorial@indiaisraelcentre.org',
    accent: 'bg-iic-navy',
  },
  {
    title: 'Media inquiries',
    description: 'Press contacts, background briefings, and requests for comment from journalists and media organisations.',
    href: '/about/contact/media/',
    email: 'media@indiaisraelcentre.org',
    accent: 'bg-iic-saffron',
  },
  {
    title: 'Partner with us',
    description: 'Institutional partnership inquiries from research centres, universities, and foundations.',
    href: '/about/partner-with-us/',
    email: null,
    accent: 'bg-iic-gold-deep',
  },
]

export default function ContactPage() {
  return (
    <>
      <StaticPageHero
        accent="saffron"
        eyebrow="Contact"
        title="How to reach us."
        description="Please use the route that fits your purpose. Misdirected messages are forwarded internally but may be slower."
        crumbs={[{ label: 'About', href: '/about/' }, { label: 'Contact' }]}
      />

      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200 border border-stone-200 rounded-sm overflow-hidden">
            {ROUTES.map((r, i) => (
              <Reveal key={r.href} delay={Math.min(i * 80, 240)}>
                <div className="group relative bg-white p-7 h-full hover:bg-iic-paper transition-colors">
                  <div className={`absolute top-0 left-0 w-full h-1 ${r.accent} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`} />
                  <h2 className="font-display text-xl font-bold text-stone-900 mb-3">{r.title}</h2>
                  <p className="text-sm text-stone-600 leading-relaxed mb-5">{r.description}</p>
                  {r.email && (
                    <a
                      href={`mailto:${r.email}`}
                      className="text-xs font-mono text-stone-500 hover:text-iic-saffron-deep block mb-3 break-all"
                    >
                      {r.email}
                    </a>
                  )}
                  <Link
                    href={r.href}
                    className="text-sm font-sans font-semibold text-iic-navy underline-anim"
                  >
                    {r.title} →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="text-sm text-stone-600 mt-10">
            For fellowship and affiliation routes, see{' '}
            <Link href="/about/work-with-us/" className="text-iic-navy font-semibold underline-anim">
              Work with us
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  )
}
