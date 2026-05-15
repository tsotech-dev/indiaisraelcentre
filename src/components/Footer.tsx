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
              href="https://x.com/IndIsraelCentre"
              target="_blank"
              rel="noopener"
              aria-label="X (Twitter)"
              className="w-7 h-7 flex items-center justify-center rounded-full border border-white/10 text-stone-400 hover:text-white hover:border-white/30 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/IndiaIsraelcenter/"
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
              className="w-7 h-7 flex items-center justify-center rounded-full border border-white/10 text-stone-400 hover:text-white hover:border-white/30 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/indiaisraelcenter/"
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              className="w-7 h-7 flex items-center justify-center rounded-full border border-white/10 text-stone-400 hover:text-white hover:border-white/30 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@indiaisraelcenter"
              target="_blank"
              rel="noopener"
              aria-label="YouTube"
              className="w-7 h-7 flex items-center justify-center rounded-full border border-white/10 text-stone-400 hover:text-white hover:border-white/30 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
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
