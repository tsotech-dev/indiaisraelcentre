import Link from 'next/link'
import NewsletterSignup from './NewsletterSignup'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative bg-iic-ink text-stone-300 mt-24">
      <div className="tricolor-bar h-1 w-full" />

      <div
        aria-hidden
        className="absolute top-0 right-0 w-[420px] h-[420px] opacity-[0.12] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-[520px] h-[520px] opacity-[0.10] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FF671F 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Marquee wordmark */}
        <div className="overflow-hidden mb-16 -mx-6 select-none pointer-events-none">
          <div className="flex whitespace-nowrap animate-marquee">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="flex items-center gap-8 px-4 font-display text-[5rem] md:text-[7rem] font-light text-white/[0.06] tracking-tight leading-none shrink-0"
              >
                <span>India</span>
                <span className="text-iic-gold/40">·</span>
                <span>Israel</span>
                <span className="text-iic-saffron/40">·</span>
                <span>Centre</span>
                <span className="text-iic-gold/40">·</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          {/* Identity + social */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 group mb-5">
              <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center">
                <span className="text-iic-navy text-xs font-bold font-sans tracking-tight">IIC</span>
              </div>
              <div className="leading-tight">
                <div className="text-white font-semibold text-sm font-sans tracking-tight">
                  India Israel Centre
                </div>
                <div className="text-[10px] font-sans text-stone-500 uppercase tracking-[0.18em]">
                  Est. 2026 · New Delhi
                </div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-stone-400 max-w-md mb-6">
              An independent research and convening institution advancing serious scholarship on the
              India-Israel bilateral relationship.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'X / Twitter', href: 'https://x.com' },
                { label: 'LinkedIn', href: 'https://linkedin.com' },
                { label: 'YouTube', href: 'https://youtube.com' },
                { label: 'RSS', href: '/rss.xml' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  className="text-xs font-sans px-3 py-1.5 rounded-full border border-white/10 text-stone-300 hover:border-iic-saffron hover:text-iic-saffron transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation columns */}
          <div className="md:col-span-2">
            <div className="text-white font-semibold text-[10px] font-sans uppercase tracking-[0.2em] mb-5">
              Research
            </div>
            <ul className="space-y-2.5">
              {[
                { label: 'Papers', href: '/research/papers/' },
                { label: 'Briefs', href: '/research/briefs/' },
                { label: 'Commentary', href: '/research/commentary/' },
                { label: 'All themes', href: '/research/' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm font-sans text-stone-400 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-white font-semibold text-[10px] font-sans uppercase tracking-[0.2em] mb-5">
              Centre
            </div>
            <ul className="space-y-2.5">
              {[
                { label: 'About', href: '/about/' },
                { label: 'Forum', href: '/forum/' },
                { label: 'Governance', href: '/about/governance/' },
                { label: 'Partner', href: '/about/partner-with-us/' },
                { label: 'Work with us', href: '/about/work-with-us/' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm font-sans text-stone-400 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <div className="text-white font-semibold text-[10px] font-sans uppercase tracking-[0.2em] mb-5">
              The Brief
            </div>
            <p className="text-sm text-stone-400 mb-4 leading-relaxed">
              A monthly note from the editors. New publications, upcoming convenings, no filler.
            </p>
            <NewsletterSignup source="footer" />
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="text-xs font-sans text-stone-500">© {year} India Israel Centre</p>
            <Link href="/privacy/" className="text-xs font-sans text-stone-500 hover:text-stone-300">Privacy</Link>
            <Link href="/terms/" className="text-xs font-sans text-stone-500 hover:text-stone-300">Terms</Link>
            <a href="/sitemap.xml" className="text-xs font-sans text-stone-500 hover:text-stone-300">Sitemap</a>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <a
              href="mailto:editorial@indiaisraelcentre.org"
              className="text-xs font-sans text-stone-500 hover:text-iic-saffron transition-colors"
            >
              editorial@indiaisraelcentre.org
            </a>
            <a
              href="mailto:media@indiaisraelcentre.org"
              className="text-xs font-sans text-stone-500 hover:text-iic-saffron transition-colors"
            >
              media@indiaisraelcentre.org
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
