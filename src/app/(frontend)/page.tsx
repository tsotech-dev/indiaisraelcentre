import PillarNavigatorGrid from "@/components/PillarNavigatorGrid";
import NewsletterSignup from "@/components/NewsletterSignup";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { getPublications, getConvenings, getGlobal } from "@/lib/payload";
import { pillarLabel, formatDate } from "@/lib/utils";

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "India Israel Centre",
  url: "https://indiaisraelcentre.org",
  description:
    "An independent forum dedicated to rigorous academic inquiry, substantive policy engagement, and the informed public dissemination of knowledge concerning the bilateral relationship between India and Israel.",
  sameAs: [
    "https://x.com/indiaisraelctr",
    "https://linkedin.com/company/india-israel-centre",
  ],
};

const STATS = [
  { value: "6", label: "Research pillars" },
  { value: "3", label: "Types of publications" },
];

const CHAIR_QUOTE =
  "India and Israel present fascinating case studies of nationalism and universalism, religion and secularism, and majority and minority identities.";

export default async function HomePage() {
  const [home, latestPubs, upcomingConvenings, recentConvenings, commentary] =
    await Promise.all([
      getGlobal("home"),
      getPublications({ limit: 3 }),
      getConvenings({ upcoming: true, limit: 3 }),
      getConvenings({ upcoming: false, limit: 3 }),
      getPublications({ type: "commentary", limit: 3 }),
    ]);

  const eyebrow =
    (home?.eyebrow as string | undefined) ??
    "An Independent Policy Research Forum";
  const title = (home?.title as string | undefined) ?? "India Israel Centre";
  const subtitle =
    (home?.subtitle as string | undefined) ??
    "Advancing Scholarship and Policy on India-Israel Relations";
  const openingFraming =
    (home?.openingFraming as string | undefined) ??
    "The India Israel Centre is an independent forum dedicated to rigorous academic inquiry, substantive policy engagement, and the informed public dissemination of knowledge concerning the bilateral relationship between India and Israel.";

  const convenings =
    upcomingConvenings.length > 0 ? upcomingConvenings : recentConvenings;

  return (
    <>
      <JsonLd data={ORG_JSONLD} />
      <div className="overflow-hidden">
        {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
        <section className="relative bg-mesh border-b border-stone-200 overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-20 -right-20 w-[300px] h-[300px] md:w-[700px] md:h-[700px] md:-top-40 md:-right-40 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #FF671F 0%, transparent 65%)" }}
          />
          <div
            aria-hidden
            className="absolute bottom-0 -left-20 w-[280px] h-[280px] md:w-[600px] md:h-[600px] md:-left-40 rounded-full opacity-15 pointer-events-none"
            style={{ background: "radial-gradient(circle, #005EB8 0%, transparent 65%)" }}
          />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-40 text-center flex flex-col items-center">
            <div className="text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-6 animate-fade-up">
              {eyebrow}
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.96] tracking-tight text-stone-900 mb-6 animate-fade-up delay-1">
              {title}
            </h1>
            <p className="font-display italic text-xl md:text-2xl text-stone-500 mb-8 animate-fade-up delay-2">
              {subtitle}
            </p>
            <p className="text-lg text-stone-600 leading-relaxed mb-10 max-w-2xl animate-fade-up delay-3">
              {openingFraming}
            </p>
            <div className="flex flex-wrap justify-center gap-3 animate-fade-up delay-4">
              <Link
                href="/about/"
                className="inline-flex items-center gap-2 text-sm font-sans font-semibold bg-iic-navy text-white pl-5 pr-2 py-2 rounded-full hover:bg-iic-saffron transition-colors duration-300 group"
              >
                About the Centre
                <span className="bg-white text-iic-navy group-hover:text-iic-saffron rounded-full w-7 h-7 flex items-center justify-center text-xs transition-colors">
                  →
                </span>
              </Link>
              <Link
                href="/research/"
                className="inline-flex items-center gap-2 text-sm font-sans font-semibold border border-stone-300 text-stone-700 px-5 py-2 rounded-full hover:border-iic-saffron hover:text-iic-saffron transition-colors"
              >
                Browse the Research →
              </Link>
            </div>
            <div className="mt-10 pt-8 border-t border-stone-200 w-full max-w-xs animate-fade-up delay-5">
              <p className="text-xs font-sans text-stone-400 uppercase tracking-[0.14em]">
                In academic partnership with
              </p>
              <p className="text-sm font-sans text-stone-500 mt-1">
                Centre for Israel Studies, O.P. Jindal Global University
              </p>
            </div>
          </div>
        </section>

        {/* ── 2. STATS STRIP ──────────────────────────────────────────────── */}
        {/* <section className="bg-iic-ink text-white border-b border-white/10">
          <div className="tricolor-bar h-[3px] w-full" />
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((s, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="text-center md:text-left">
                    <div className="font-display text-4xl md:text-5xl font-bold text-white mb-1 leading-none">
                      {s.value}
                    </div>
                    <div className="text-[11px] font-sans uppercase tracking-[0.18em] text-stone-500 mt-2">
                      {s.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section> */}

        {/* ── 3. FROM THE CENTRE ──────────────────────────────────────────── */}
        <section className="bg-iic-paper border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            {/* Section header */}
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-10">
                <div>
                  <div className="text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-2">
                    / From the Centre
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 leading-tight">
                    Latest work
                  </h2>
                </div>
                <Link
                  href="/research/"
                  className="shrink-0 text-sm font-sans font-semibold text-iic-navy underline-anim"
                >
                  All publications →
                </Link>
              </div>
            </Reveal>

            {/* Three cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Recent Publications */}
              <Reveal>
                <div className="flex flex-col h-full bg-white border border-stone-200 rounded-xl overflow-hidden hover-lift hover:border-iic-navy/30 transition-colors">
                  <div className="h-1 bg-iic-navy w-full" />
                  <div className="flex flex-col flex-1 p-7">
                    <div className="text-[10px] font-sans font-bold uppercase tracking-[0.22em] text-iic-navy mb-5">
                      Recent Publications
                    </div>
                    <div className="flex-1 divide-y divide-stone-100">
                      {latestPubs.length > 0 ? (
                        latestPubs.map((pub) => (
                          <Link
                            key={pub.id}
                            href={`/research/${pub.type}s/${pub.slug}/`}
                            className="group block py-4 first:pt-0 last:pb-0"
                          >
                            <div className="text-[10px] font-sans uppercase tracking-wider text-stone-400 mb-1">
                              {pillarLabel(pub.pillar)}
                            </div>
                            <h3 className="font-display text-[15px] font-semibold text-stone-900 group-hover:text-iic-navy leading-snug transition-colors">
                              {pub.title}
                            </h3>
                            {pub.authors && pub.authors.length > 0 && (
                              <p className="text-xs font-sans text-stone-400 mt-1">
                                {(pub.authors as { name: string }[])
                                  .map((a) => a.name)
                                  .join(", ")}
                              </p>
                            )}
                          </Link>
                        ))
                      ) : (
                        <p className="text-sm text-stone-400 italic py-4">
                          Publications will appear here as they are published.
                        </p>
                      )}
                    </div>
                    <div className="pt-5 mt-5 border-t border-stone-100">
                      <Link
                        href="/research/"
                        className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-widest text-iic-navy underline-anim"
                      >
                        View all →
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Convenings */}
              <Reveal delay={120}>
                <div className="flex flex-col h-full bg-white border border-stone-200 rounded-xl overflow-hidden hover-lift hover:border-iic-saffron/30 transition-colors">
                  <div className="h-1 bg-iic-saffron w-full" />
                  <div className="flex flex-col flex-1 p-7">
                    <div className="text-[10px] font-sans font-bold uppercase tracking-[0.22em] text-iic-saffron-deep mb-5">
                      Convenings
                    </div>
                    <div className="flex-1 divide-y divide-stone-100">
                      {convenings.length > 0 ? (
                        convenings.map((c) => (
                          <Link
                            key={c.id}
                            href={`/forum/${c.slug}/`}
                            className="group block py-4 first:pt-0 last:pb-0"
                          >
                            <div className="text-[10px] font-sans uppercase tracking-wider text-iic-saffron mb-1">
                              {formatDate(c.eventDate)}
                              {c.format && (
                                <span className="text-stone-400 ml-2 normal-case capitalize">
                                  · {c.format}
                                </span>
                              )}
                            </div>
                            <h3 className="font-display text-[15px] font-semibold text-stone-900 group-hover:text-iic-saffron-deep leading-snug transition-colors">
                              {c.title}
                            </h3>
                          </Link>
                        ))
                      ) : (
                        <p className="text-sm text-stone-400 italic py-4">
                          Upcoming convenings will be announced here.
                        </p>
                      )}
                    </div>
                    <div className="pt-5 mt-5 border-t border-stone-100">
                      <Link
                        href="/forum/"
                        className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-widest text-iic-saffron-deep underline-anim"
                      >
                        The Forum →
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Commentary */}
              <Reveal delay={240}>
                <div className="flex flex-col h-full bg-white border border-stone-200 rounded-xl overflow-hidden hover-lift hover:border-iic-gold-deep/30 transition-colors">
                  <div className="h-1 bg-iic-gold-deep w-full" />
                  <div className="flex flex-col flex-1 p-7">
                    <div className="text-[10px] font-sans font-bold uppercase tracking-[0.22em] text-iic-gold-deep mb-5">
                      Commentary
                    </div>
                    <div className="flex-1 divide-y divide-stone-100">
                      {commentary.length > 0 ? (
                        commentary.map((pub) => (
                          <Link
                            key={pub.id}
                            href={`/research/commentary/${pub.slug}/`}
                            className="group block py-4 first:pt-0 last:pb-0"
                          >
                            <div className="text-[10px] font-sans uppercase tracking-wider text-stone-400 mb-1">
                              {pillarLabel(pub.pillar)}
                            </div>
                            <h3 className="font-display text-[15px] font-semibold text-stone-900 group-hover:text-iic-gold-deep leading-snug transition-colors">
                              {pub.title}
                            </h3>
                            {pub.authors && pub.authors.length > 0 && (
                              <p className="text-xs font-sans text-stone-400 mt-1">
                                {(pub.authors as { name: string }[])
                                  .map((a) => a.name)
                                  .join(", ")}
                              </p>
                            )}
                          </Link>
                        ))
                      ) : (
                        <p className="text-sm text-stone-400 italic py-4">
                          Commentary will appear here as it is published.
                        </p>
                      )}
                    </div>
                    <div className="pt-5 mt-5 border-t border-stone-100">
                      <Link
                        href="/research/commentary/"
                        className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-widest text-iic-gold-deep underline-anim"
                      >
                        View all →
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 4. PILLAR NAVIGATOR ─────────────────────────────────────────── */}
        <section className="bg-iic-paper border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
                <div>
                  <div className="text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-3">
                    / Six Pillars
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 leading-tight">
                    Research pillars
                  </h2>
                  <p className="text-stone-500 mt-3 max-w-lg text-sm leading-relaxed">
                    Six coherent research programmes mapping the India-Israel
                    relationship across identity, governance, security,
                    technology, development, and culture.
                  </p>
                </div>
                <Link
                  href="/research/"
                  className="shrink-0 text-sm font-sans font-semibold text-iic-navy underline-anim"
                >
                  Browse all research →
                </Link>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <PillarNavigatorGrid />
            </Reveal>
          </div>
        </section>

        {/* ── 5. FROM THE CHAIR ───────────────────────────────────────────── */}
        <section className="bg-iic-navy border-b border-white/10 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div
              aria-hidden
              className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full opacity-15 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, #FF671F 0%, transparent 65%)",
              }}
            />
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Portrait */}
              <Reveal className="lg:col-span-3">
                <div className="relative aspect-square rounded-sm ring-1 ring-white/20 overflow-hidden">
                  <Image
                    src="/images/Khinvraj-Jangid.png"
                    alt="Professor Khinvraj Jangid, Chair of the Forum, India Israel Centre"
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                </div>
                <div className="mt-4 text-center lg:text-left">
                  <div className="text-sm font-sans font-semibold text-white leading-snug">
                    Professor Khinvraj Jangid
                  </div>
                  <div className="text-xs font-sans text-stone-400 mt-0.5">
                    Chair of the Forum · India Israel Centre
                  </div>
                </div>
              </Reveal>

              {/* Quote */}
              <Reveal delay={120} className="lg:col-span-9">
                <div
                  aria-hidden
                  className="font-display text-[7rem] md:text-[9rem] text-iic-saffron leading-none select-none mb-2 -mt-4"
                >
                  &ldquo;
                </div>
                <blockquote className="font-display text-2xl md:text-3xl font-semibold text-white leading-snug mb-8 -mt-8">
                  {CHAIR_QUOTE}
                </blockquote>
                <Link
                  href="/about/people/khinvraj-jangid/"
                  className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-iic-saffron underline-anim"
                >
                  Full profile →
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 6. ACADEMIC PARTNER ─────────────────────────────────────────── */}
        <section className="bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <Reveal>
              <div className="bg-iic-paper border border-stone-200 rounded-xl p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  {/* Logo */}
                  <div className="md:col-span-2 flex items-center justify-center">
                    <Image
                      src="/images/O._P._Jindal_Global_University_Logo.png"
                      alt="O.P. Jindal Global University crest"
                      width={120}
                      height={120}
                      className="object-contain max-w-[100px] md:max-w-[120px]"
                    />
                  </div>

                  {/* Text */}
                  <div className="md:col-span-10">
                    <div className="text-[10px] font-sans font-bold uppercase tracking-[0.22em] text-iic-saffron mb-3">
                      Academic Partnership
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-stone-900 mb-3 leading-snug">
                      Centre for Israel Studies,&nbsp;O.P. Jindal Global
                      University
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed mb-5 max-w-2xl">
                      The India Israel Centre is established in academic
                      partnership with the Centre for Israel Studies at O.P.
                      Jindal Global University in Sonipat, Haryana — one of the
                      few dedicated research and teaching centres on Israel and
                      India-Israel comparative scholarship at any Indian
                      university.
                    </p>
                    <Link
                      href="/about/academic-partners/"
                      className="text-sm font-sans font-semibold text-iic-navy underline-anim"
                    >
                      More on the partnership →
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 7. NEWSLETTER ───────────────────────────────────────────────── */}
        <section
          id="newsletter"
          className="relative bg-iic-ink text-white scroll-mt-20"
        >
          <div className="tricolor-bar h-[3px] w-full" />
          <div
            aria-hidden
            className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, #FFD700 0%, transparent 65%)",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left copy */}
              <Reveal>
                <div className="text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-5">
                  Subscribe
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                  {(home?.newsletterHeading as string | undefined) ??
                    "Subscribe"}
                </h2>
                <p className="text-stone-300 text-lg leading-relaxed mb-4">
                  {(home?.newsletterDescription as string | undefined) ??
                    "Monthly updates on the Centre's publications and convenings."}
                </p>
                <p className="text-stone-500 text-sm">
                  Research. Policy. No filler.&nbsp;&nbsp;Unsubscribe any time.
                </p>
              </Reveal>

              {/* Right form */}
              <Reveal delay={120}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                  <NewsletterSignup source="homepage" variant="dark" />
                  {(home?.newsletterPrivacyNote as string | undefined) && (
                    <p className="text-xs font-sans text-stone-500 mt-4">
                      {home?.newsletterPrivacyNote as string}
                    </p>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
