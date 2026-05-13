import Link from "next/link";
import NewsletterSignup from "./NewsletterSignup";

const COLUMNS = [
  {
    heading: "Research",
    links: [
      { label: "Pillars", href: "/research/" },
      { label: "Papers", href: "/research/papers/" },
      { label: "Briefs", href: "/research/briefs/" },
      { label: "Commentary", href: "/research/commentary/" },
    ],
  },
  {
    heading: "Forum",
    links: [
      { label: "Convenings", href: "/forum/" },
      { label: "Archive", href: "/forum/archive/" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "About the Centre", href: "/about/" },
      { label: "Strategic Objective", href: "/about/strategic-objective/" },
      { label: "Academic Partners", href: "/about/academic-partners/" },
    ],
  },
  {
    heading: "Engagement",
    links: [
      { label: "Contact", href: "/about/contact/" },
      { label: "Partner with us", href: "/about/partner-with-us/" },
      { label: "Work with us", href: "/about/work-with-us/" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-iic-ink text-stone-300 mt-24">
      <div className="tricolor-bar h-1 w-full" />

      <div
        aria-hidden
        className="absolute top-0 right-0 w-[420px] h-[420px] opacity-[0.12] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #FFD700 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 w-[520px] h-[520px] opacity-[0.10] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #FF671F 0%, transparent 70%)",
        }}
      />

      {/* Marquee — desktop only */}
      <div className="hidden md:block overflow-hidden border-b border-white/10 select-none pointer-events-none" aria-hidden>
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-6 py-6 font-display text-[5rem] font-bold leading-none tracking-tight text-white/[0.06]">
              India Israel Centre
              <span className="inline-block w-2 h-2 rounded-full bg-iic-saffron/30 flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          {/* Identity + description + subscribe */}
          <div className="md:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group mb-5"
            >
              <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center">
                <span className="text-iic-navy text-xs font-bold font-sans tracking-tight">
                  IIC
                </span>
              </div>
              <div className="leading-tight">
                <div className="text-white font-semibold text-sm font-sans tracking-tight">
                  India Israel Centre
                </div>
                <div className="text-[10px] font-sans text-stone-500 uppercase tracking-[0.18em]">
                  An Independent Policy Research Forum
                </div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-stone-400 max-w-md mb-6">
              An independent forum dedicated to academic dialogue, policy
              research, and the public dissemination of authoritative
              scholarship on India-Israel relations. Established in academic
              partnership with the Centre for Israel Studies, O.P. Jindal Global
              University.
            </p>
            <div className="mb-5">
              <div className="text-white font-semibold text-[10px] font-sans uppercase tracking-[0.2em] mb-3">
                Subscribe
              </div>
              <p className="text-xs text-stone-400 mb-3 leading-relaxed">
                Monthly updates on the Centre&rsquo;s publications and
                convenings.
              </p>
              <NewsletterSignup source="footer" />
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading} className="md:col-span-2">
              <div className="text-white font-semibold text-[10px] font-sans uppercase tracking-[0.2em] mb-5">
                {col.heading}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
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
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="mailto:research@indiaisraelcentre.org"
              className="text-xs font-sans text-stone-400 hover:text-iic-saffron transition-colors"
            >
              research@indiaisraelcentre.org
            </a>
            <a
              href="https://x.com/indiaisraelctr"
              target="_blank"
              rel="noopener"
              className="text-xs font-sans text-stone-500 hover:text-iic-saffron"
            >
              X
            </a>
            <a
              href="https://linkedin.com/company/india-israel-centre"
              target="_blank"
              rel="noopener"
              className="text-xs font-sans text-stone-500 hover:text-iic-saffron"
            >
              LinkedIn
            </a>
            <Link
              href="/privacy/"
              className="text-xs font-sans text-stone-500 hover:text-stone-300"
            >
              Privacy
            </Link>
            <Link
              href="/terms/"
              className="text-xs font-sans text-stone-500 hover:text-stone-300"
            >
              Terms
            </Link>
            <a
              href="/sitemap.xml"
              className="text-xs font-sans text-stone-500 hover:text-stone-300"
            >
              Sitemap
            </a>
          </div>
          <div className="text-xs font-sans text-stone-500 md:text-right">
            © India Israel Centre.
            <br />
            In partnership with Centre for Israel Studies, O.P. Jindal Global
            University.
          </div>
        </div>
      </div>
    </footer>
  );
}
