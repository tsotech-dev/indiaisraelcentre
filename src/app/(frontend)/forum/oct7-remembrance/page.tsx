import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import EventGallery from "@/components/EventGallery";

export const metadata: Metadata = {
  title: "October 7 Remembrance Gathering | India Israel Centre",
  description:
    "India Israel Centre hosted a remembrance gathering marking three years since the October 7, 2023 Hamas attacks, bringing together diplomats, parliamentarians and civil society at The Ashok Hotel, New Delhi.",
  openGraph: {
    title: "October 7 Remembrance Gathering | India Israel Centre",
    type: "article",
  },
};

const PRESS = [
  {
    outlet: "Economic Times",
    url: "https://economictimes.indiatimes.com/news/india/israel-to-continue-working-with-india-to-defeat-terrorism-envoy/articleshow/134798722.cms",
    logo: (
      <span className="font-serif text-sm font-bold leading-none">
        <span style={{ color: "#F15A22" }}>The</span>{" "}
        <span className="text-stone-800">Economic Times</span>
      </span>
    ),
  },
  {
    outlet: "PTI",
    url: "https://www.ptinews.com/story/business/Israel-to-continue-working-with-India-to-defeat-terrorism-Envoy/4145693",
    logo: (
      <span
        className="inline-block px-3 py-1 text-white text-sm font-bold font-serif tracking-wide leading-none rounded-sm"
        style={{ background: "#C8102E", fontFamily: "Georgia, serif" }}
      >
        PTI
      </span>
    ),
  },
  {
    outlet: "News18",
    url: "https://www.news18.com/agency-feeds/israel-to-continue-working-with-india-to-defeat-terrorism-envoy-10373591.html",
    logo: (
      <span className="inline-flex items-baseline font-bold text-sm leading-none">
        <span style={{ color: "#E31E25", fontFamily: "Arial, sans-serif" }}>
          news
        </span>
        <span
          className="inline-block px-1 py-0.5 text-white text-xs font-bold ml-0.5 rounded-sm"
          style={{ background: "#003087", lineHeight: 1.2 }}
        >
          18
        </span>
      </span>
    ),
  },
];

const IMAGES = Array.from({ length: 18 }, (_, i) => ({
  src: `/media/Img${i + 1}.jpeg`,
  alt: `October 7 Remembrance Gathering photo ${i + 1}`,
}));

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "October 7 Remembrance Gathering",
  startDate: "2026-10-08",
  location: {
    "@type": "Place",
    name: "The Ashok Hotel, Chanakyapuri, New Delhi",
  },
  organizer: { "@type": "Organization", name: "India Israel Centre" },
  eventStatus: "https://schema.org/EventScheduled",
  url: "https://indiaisraelcentre.org/forum/oct7-remembrance/",
};

export default function Oct7RemembrancePage() {
  return (
    <>
      <JsonLd data={JSON_LD} />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative bg-iic-ink text-white overflow-hidden border-b border-iic-navy">
        <div
          aria-hidden
          className="absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #003D7A 0%, transparent 65%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 pt-12 pb-16">
          <Breadcrumbs
            crumbs={[
              { label: "Forum", href: "/forum/" },
              { label: "October 7 Remembrance" },
            ]}
          />

          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full bg-iic-saffron/20 text-iic-saffron">
              <span className="w-1.5 h-1.5 rounded-full bg-iic-saffron" />
              Remembrance Gathering
            </span>
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-stone-400">
              Security and Strategy
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-8">
            October 7 Remembrance Gathering
          </h1>

          <div className="flex items-center gap-4">
            <div className="shrink-0 w-16 text-center">
              <div className="bg-iic-saffron text-white rounded-sm py-2">
                <div className="text-[9px] font-sans font-bold tracking-widest text-white/80 uppercase">
                  Oct
                </div>
                <div className="font-display font-bold text-xl leading-none my-1">
                  08
                </div>
                <div className="text-[9px] font-sans text-white/70">2026</div>
              </div>
            </div>
            <div>
              <time
                dateTime="2026-10-08"
                className="text-sm font-sans text-stone-300 block"
              >
                Wednesday, 8 October 2026
              </time>
              <span className="text-xs font-sans text-stone-500 mt-0.5 block">
                The Ashok Hotel, Chanakyapuri, New Delhi
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SUMMARY ───────────────────────────────────────────────────── */}
      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <p className="text-base font-sans text-stone-700 leading-relaxed">
            On the third anniversary of the October 7, 2023 Hamas-led attacks
            that claimed approximately 1,200 lives and saw 251 people taken
            hostage into Gaza, the India Israel Centre convened a solemn
            remembrance gathering at The Ashok Hotel in Chanakyapuri, New Delhi.
            Israel's Ambassador to India, Reuven Azar, addressed members of the
            diplomatic community and civil society, affirming that Israel had
            confronted the attack "with resolve and prevailed" and pledging
            continued bilateral cooperation in the fight against terrorism.
            Former Minister of State for External Affairs Meenakshi Lekhi
            expressed India's solidarity, paying tribute to those killed in what
            she called "unmitigated barbarism." The programme also featured
            addresses by former MP and Namaste Shalom founder Tarun Vijay and
            Rabbi Ezekiel Isaac Malekar of the Judah Hyam Synagogue, alongside a
            remembrance film, a candle-lighting ceremony, and a flower-laying
            tribute.
          </p>

          {/* Pull quote */}
          <blockquote className="mt-10 border-l-2 border-iic-saffron pl-6">
            <p className="font-display text-xl md:text-2xl font-bold text-stone-900 leading-snug italic">
              "We will continue to work together hand in hand, Israelis and
              Indians, to defeat terrorism while cherishing our heritage,
              democratic values, entrepreneurial spirit and quest for stability,
              prosperity and peace."
            </p>
            <footer className="mt-4 text-xs font-sans font-bold uppercase tracking-[0.18em] text-stone-500">
              Ambassador Reuven Azar, Israel's Ambassador to India
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── MEDIA MENTIONS ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="text-[10px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-2">
            / In the News
          </div>
          <h2 className="font-display text-2xl font-bold text-stone-900 mb-8">
            Media Coverage
          </h2>
          <div className="flex flex-wrap gap-4">
            {PRESS.map((p) => (
              <a
                key={p.outlet}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 border border-stone-200 rounded-xl px-6 py-4 hover:border-iic-navy/40 hover:shadow-md transition-all duration-200 bg-stone-50 hover:bg-white"
                aria-label={`Read coverage in ${p.outlet}`}
              >
                <span className="flex items-center">{p.logo}</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-[0.14em] text-iic-saffron-deep opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Read
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 10 10"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M1 9L9 1M9 1H3M9 1V7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ─────────────────────────────────────────────── */}
      <section className="bg-iic-paper">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="text-[10px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-2">
            / From the Event
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mb-8">
            Photo Gallery
          </h2>
          <EventGallery images={IMAGES} initialCount={8} />
        </div>
      </section>
    </>
  );
}
