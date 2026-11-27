export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { getAnyVideo, getAllVideos } from "@/lib/payload";
import { pillarLabel, formatDate } from "@/lib/utils";

function youtubeId(url: string): string | null {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

function embedUrl(url: string): string {
  const id = youtubeId(url);
  if (id) return `https://www.youtube.com/embed/${id}?rel=0`;
  // Vimeo
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  return url;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const video = await getAnyVideo(slug);
  if (!video) return {};
  return {
    title: video.title,
    description: video.description?.slice(0, 200),
    openGraph: { title: video.title, type: "video.other" },
  };
}

export default async function WatchDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const video = await getAnyVideo(slug);
  if (!video) notFound();

  const related = await getAllVideos({
    pillar: video.pillar ?? undefined,
  });
  const others = related.filter((v) => v.slug !== video.slug).slice(0, 2);

  const videoUrl = video.videoUrl;
  const thumbUrl = video.thumbnailUrl;

  const pageUrl = `https://indiaisraelcentre.org/watch/${video.slug}/`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    uploadDate: video.date,
    url: pageUrl,
    ...(thumbUrl && { thumbnailUrl: thumbUrl }),
    publisher: { "@type": "Organization", name: "India Israel Centre" },
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="relative bg-mesh border-b border-stone-200 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full opacity-15 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #FF671F 0%, transparent 65%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 pt-12 pb-16">
          <Breadcrumbs
            crumbs={[
              { label: "Watch", href: "/watch/" },
              { label: video.title },
            ]}
          />
          <div className="text-stone-400 font-normal normal-case tracking-normal">
            {video.pillar && pillarLabel(video.pillar)}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-[1.02] tracking-tight text-stone-900 max-w-3xl">
            {video.title}
          </h1>
          <p className="mt-3 text-stone-500 font-display italic">
            {formatDate(video.date)}
          </p>
        </div>
      </section>

      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <Reveal>
            <div className="relative w-full aspect-video rounded-sm overflow-hidden ring-1 ring-stone-200 bg-black">
              <iframe
                src={embedUrl(videoUrl)}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </Reveal>

          <div className="mt-10 flex flex-col md:flex-row md:items-start gap-8">
            {video.description && (
              <Reveal className="flex-1">
                <p className="text-stone-700 leading-relaxed text-lg whitespace-pre-line break-words">
                  {video.description}
                </p>
              </Reveal>
            )}
            <Reveal delay={80} className="md:w-64 shrink-0">
              <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4">
                <div>
                  <div className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-stone-400 mb-2">
                    Share
                  </div>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(video.title)}&body=${encodeURIComponent(pageUrl)}`}
                    className="inline-flex items-center gap-2 text-xs font-sans font-semibold bg-stone-900 text-white px-4 py-2.5 hover:bg-iic-navy transition-colors w-full justify-center"
                  >
                    Share via email
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,12 2,6" />
                    </svg>
                  </a>
                  <div className="mt-2 text-[10px] font-mono text-stone-400 break-all">
                    {pageUrl}
                  </div>
                </div>
                {video.pillar && (
                  <div>
                    <div className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-stone-400 mb-1">
                      Pillar
                    </div>
                    <Link
                      href={`/research/themes/${video.pillar}/`}
                      className="text-sm text-iic-navy underline-anim"
                    >
                      {pillarLabel(video.pillar)}
                    </Link>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="bg-white border-b border-stone-200">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-stone-900 mb-8">
                More videos
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {others.map((v, i) => {
                const t = v.thumbnailUrl;
                return (
                  <Reveal key={v.id} delay={i * 80}>
                    <Link
                      href={`/watch/${v.slug}/`}
                      className="group flex gap-4 bg-iic-paper border border-stone-200 rounded-xl overflow-hidden hover-lift hover:border-iic-navy/30 transition-colors p-4"
                    >
                      <div className="relative w-32 shrink-0 aspect-video rounded-sm overflow-hidden bg-iic-ink">
                        {t && (
                          <Image
                            src={t}
                            alt={v.title}
                            fill
                            className="object-cover"
                            sizes="128px"
                          />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-white/70"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-iic-saffron mb-1">
                          {formatDate(v.date)}
                        </span>
                        <h3 className="font-display text-sm font-bold text-stone-900 group-hover:text-iic-navy leading-snug transition-colors line-clamp-2">
                          {v.title}
                        </h3>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
