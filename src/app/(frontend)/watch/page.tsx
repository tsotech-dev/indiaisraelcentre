export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Reveal from '@/components/Reveal'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getVideos } from '@/lib/payload'
import { pillarLabel, formatDate } from '@/lib/utils'

function youtubeThumb(url: string): string | null {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/)
  return m ? `https://img.youtube.com/vi/${m[1]}/maxresdefault.jpg` : null
}

export const metadata: Metadata = {
  title: 'Watch',
  description: 'Videos from the India Israel Centre — recorded convenings, talks, and roundtables.',
}

export default async function WatchPage() {
  const videos = await getVideos()

  return (
    <>
      <section className="relative bg-mesh border-b border-stone-200 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #FF671F 0%, transparent 65%)' }}
        />
        <div className="relative max-w-5xl mx-auto px-6 pt-12 pb-16">
          <Breadcrumbs crumbs={[{ label: 'Watch' }]} />
          <div className="text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-iic-saffron mb-4 mt-2">
            / On Record
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold leading-[0.98] tracking-tight text-stone-900">
            Watch
          </h1>
          <p className="mt-4 text-lg text-stone-500 max-w-xl">
            Recorded convenings, talks, and roundtables from the India Israel Centre.
          </p>
        </div>
      </section>

      <section className="bg-iic-paper border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-6 py-16">
          {videos.length === 0 ? (
            <p className="text-stone-400 italic text-sm">No videos published yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((v, i) => {
                const thumbUrl =
                  v.thumbnail && typeof v.thumbnail === 'object' && 'url' in v.thumbnail
                    ? (v.thumbnail.url as string)
                    : youtubeThumb(v.videoUrl as string)

                return (
                  <Reveal key={v.id as string} delay={Math.min(i * 80, 320)}>
                    <Link
                      href={`/watch/${v.slug}/`}
                      className="group block bg-white border border-stone-200 rounded-xl overflow-hidden hover-lift hover:border-iic-navy/30 transition-colors"
                    >
                      <div className="relative aspect-video bg-iic-ink overflow-hidden">
                        {thumbUrl ? (
                          <Image
                            src={thumbUrl}
                            alt={v.title as string}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(min-width: 768px) 50vw, 100vw"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-14 h-14 text-white/20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                            <svg className="w-5 h-5 text-iic-navy ml-1" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-iic-saffron">
                            {formatDate(v.date as string)}
                          </span>
                          {v.pillar && (
                            <span className="text-[10px] font-sans uppercase tracking-wider text-stone-400">
                              {pillarLabel(v.pillar as string)}
                            </span>
                          )}
                        </div>
                        <h2 className="font-display text-lg font-bold text-stone-900 group-hover:text-iic-navy leading-snug transition-colors">
                          {v.title as string}
                        </h2>
                        {v.description && (
                          <p className="text-sm text-stone-500 mt-2 leading-relaxed line-clamp-2">
                            {v.description as string}
                          </p>
                        )}
                      </div>
                    </Link>
                  </Reveal>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
