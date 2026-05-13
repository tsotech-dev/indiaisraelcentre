import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Image from "next/image";
import { getGlobal } from "@/lib/payload";

export const metadata: Metadata = {
  title: "About",
  description:
    "The India Israel Centre is an independent forum dedicated to academic dialogue, policy research, and public dissemination on India-Israel relations.",
};

const DEFAULT_AREAS = [
  {
    label: "Academic Dialogue.",
    body: "Sustained intellectual exchange between scholars of India and Israel.",
  },
  {
    label: "Policy Conversations.",
    body: "Structured engagement between policy professionals, practitioners and researchers.",
  },
  {
    label: "Public Dissemination.",
    body: "Publication and circulation of authoritative scholarship to journalists, policy audiences and informed citizens.",
  },
  {
    label: "Research and Analysis.",
    body: "Long papers, policy briefs and commentary across the six thematic pillars.",
    href: "/research/",
  },
  {
    label: "Events and Roundtables.",
    body: "The Forum's convening programme.",
    href: "/forum/",
  },
];

const DEFAULT_ABOUT_BODY = [
  "The India Israel Centre was established to address a significant lacuna in the institutional architecture of India-Israel relations: the absence of a dedicated, research-driven platform capable of sustaining long-term intellectual and policy engagement between the two countries.",
  "The Centre operates at the intersection of academic scholarship, strategic affairs, and public communication. Its mandate encompasses the production and dissemination of authoritative research, the convening of expert forums, and the cultivation of a broad network of scholars, practitioners, and opinion-formers engaged with the bilateral relationship.",
  "Guided by a commitment to intellectual rigour and analytical independence, the Centre seeks to produce scholarship and policy analysis that informs decision-makers, enriches public debate, and contributes to a durable, evidence-based understanding of India-Israel ties.",
];

const DEFAULT_OPENING_FRAMING =
  "The India Israel Centre is an independent forum dedicated to rigorous academic inquiry, substantive policy engagement, and the informed public dissemination of knowledge concerning the bilateral relationship between India and Israel. Drawing on shared civilisational heritage, democratic values, and complementary strategic interests, the Centre provides a structured space for sustained intellectual exchange between the two nations.";

const DEFAULT_STRATEGIC_OBJECTIVE =
  "To consolidate and advance the India-Israel bilateral relationship through sustained academic inquiry, evidence-based policy engagement, and informed public discourse, establishing the partnership as a strategically consequential, institutionally grounded, and enduring pillar of India's foreign policy architecture in a rapidly evolving international order.";

const DEFAULT_CHAIR_SUMMARY =
  "Professor Khinvraj Jangid, Professor and Director of the Centre for Israel Studies at O.P. Jindal Global University, chairs the Forum at the India Israel Centre. His comparative scholarship on India and Israel as post-colonial democracies anchors the Centre's intellectual programme.";

const DEFAULT_PARTNERS =
  "The India Israel Centre is established in academic partnership with the Centre for Israel Studies at O.P. Jindal Global University, Sonipat, Haryana — one of the few dedicated research and teaching centres on Israel and India-Israel comparative scholarship at any Indian university.";

export default async function AboutPage() {
  const [c, areas, strat, partners] = await Promise.all([
    getGlobal("about"),
    getGlobal("about-areas-of-engagement"),
    getGlobal("about-strategic-objective"),
    getGlobal("about-academic-partners"),
  ]);

  const eyebrow =
    (c?.eyebrow as string | undefined) ??
    "An Independent Policy Research Forum";
  const title = (c?.title as string | undefined) ?? "India Israel Centre";
  const subtitle =
    (c?.subtitle as string | undefined) ??
    "Advancing Scholarship and Policy on India-Israel Relations";
  const openingFraming =
    (c?.openingFraming as string | undefined) ?? DEFAULT_OPENING_FRAMING;

  const areasList = (
    areas?.areas as { label: string; body: string; href?: string }[] | null
  )?.length
    ? (areas?.areas as { label: string; body: string; href?: string }[])
    : DEFAULT_AREAS;

  const stratText =
    (strat?.paragraph1 as string | undefined) ?? DEFAULT_STRATEGIC_OBJECTIVE;

  const aboutBody = (c?.aboutBodyParagraphs as { body: string }[] | null)
    ?.length
    ? (c?.aboutBodyParagraphs as { body: string }[]).map((p) => p.body)
    : DEFAULT_ABOUT_BODY;

  const chairSummary =
    (c?.chairSummary as string | undefined) ?? DEFAULT_CHAIR_SUMMARY;
  const partnersIntro =
    (partners?.paragraph1 as string | undefined) ?? DEFAULT_PARTNERS;

  return (
    <>
      {/* PAGE HEADER */}
      <section className="relative bg-mesh border-b border-stone-200 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-15 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #FF671F 0%, transparent 65%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-20">
          <div className="text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-iic-saffron mb-6 animate-fade-up">
            {eyebrow}
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.98] tracking-tight text-stone-900 mb-6 animate-fade-up delay-1">
            {title}
          </h1>
          <p className="font-display italic text-xl md:text-2xl text-stone-500 mb-8 animate-fade-up delay-2">
            {subtitle}
          </p>
          <p className="text-lg text-stone-600 leading-relaxed max-w-2xl animate-fade-up delay-3">
            {openingFraming}
          </p>
        </div>
      </section>

      {/* AREAS OF ENGAGEMENT — bento */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <Reveal>
            <div className="text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-iic-saffron mb-3">
              / Areas of Engagement
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 mb-10 leading-tight">
              Areas of Engagement
            </h2>
          </Reveal>

          <div className="divide-y divide-stone-200">
            {areasList.map((a, i) => (
              <Reveal key={i} delay={Math.min(i * 60, 240)}>
                <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
                  <div className="md:col-span-1 text-[11px] font-sans font-bold text-stone-400 tracking-[0.15em] pt-1">
                    0{i + 1}
                  </div>
                  <div className="md:col-span-11">
                    <h3 className="font-display text-xl font-bold text-stone-900 mb-2 leading-snug">
                      {a.href ? (
                        <Link href={a.href} className="text-iic-navy underline-anim">
                          {a.label.replace(/\.$/, '')}
                        </Link>
                      ) : (
                        a.label.replace(/\.$/, '')
                      )}
                    </h3>
                    <p className="text-stone-600 leading-relaxed">{a.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STRATEGIC OBJECTIVE */}
      <section className="bg-iic-navy text-white border-b border-white/10 overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-6 py-20">
          <div
            aria-hidden
            className="absolute -right-20 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, #FF671F 0%, transparent 65%)",
            }}
          />
          <Reveal>
            <div className="text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-iic-saffron mb-4">
              / Strategic Objective
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Strategic Objective
            </h2>
            <p className="text-xl text-stone-300 leading-relaxed mb-8 max-w-3xl">
              {stratText}
            </p>
            <Link
              href="/about/strategic-objective/"
              className="text-sm font-sans font-semibold text-iic-saffron underline-anim"
            >
              Read more →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ABOUT THE CENTRE */}
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <Reveal>
            <div className="text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-iic-saffron mb-4">
              / About the Centre
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 mb-8 leading-tight">
              About the Centre
            </h2>
          </Reveal>
          <div className="space-y-5 text-stone-700 leading-relaxed text-lg">
            {aboutBody.map((p, i) => (
              <Reveal key={i} delay={Math.min(i * 80, 240)}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CHAIR OF THE FORUM */}
      {/* <section className="bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <Reveal>
            <div className="text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-iic-saffron mb-4">
              / Chair of the Forum
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start mt-6">
            <Reveal className="md:col-span-3">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/images/Khinvraj-Jangid.png"
                  alt="Professor Khinvraj Jangid, Chair of the Forum"
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
              </div>
            </Reveal>
            <div className="md:col-span-9">
              <Reveal>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 mb-5 leading-tight">
                  Chair of the Forum
                </h2>
                <p className="text-lg text-stone-700 leading-relaxed mb-6">{chairSummary}</p>
                <Link
                  href="/about/people/khinvraj-jangid/"
                  className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-iic-navy underline-anim"
                >
                  Full profile →
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section> */}

      {/* ACADEMIC PARTNERS */}
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-2 flex items-center justify-center">
                <Image
                  src="/images/O._P._Jindal_Global_University_Logo.png"
                  alt="O.P. Jindal Global University crest"
                  width={120}
                  height={120}
                  className="object-contain max-w-[80px] md:max-w-[120px]"
                />
              </div>
              <div className="md:col-span-10">
                <div className="text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-iic-saffron mb-3">
                  / Academic Partners
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 mb-4 leading-tight">
                  Academic Partners
                </h2>
                <p className="text-lg text-stone-700 leading-relaxed mb-6">
                  {partnersIntro}
                </p>
                <Link
                  href="/about/academic-partners/"
                  className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-iic-navy underline-anim"
                >
                  More on the partnership →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
