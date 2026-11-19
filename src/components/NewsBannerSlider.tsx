'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'

export interface BannerSlide {
  id: string
  /** Small saffron label, e.g. "In the News" */
  label: string
  title: string
  /** One-line meta under the title */
  meta?: string
  href: string
  external?: boolean
  /** Thumbnail. When absent, `fallback` is shown in the same box. */
  image?: { src: string; alt: string }
  fallback?: { top?: string; main: string; bottom?: string }
  cta?: string
}

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function NewsBannerSlider({ slides }: { slides: BannerSlide[] }) {
  const [index, setIndex] = useState(0)
  const count = slides.length

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count])

  if (count === 0) return null

  return (
    <div
      className="banner-slider relative bg-[#001a3d] border-t border-white/10 border-b border-white/5 text-white"
      role="region"
      aria-roledescription="carousel"
      aria-label="Latest from the India Israel Centre"
    >
      {/* All slides share one grid cell so the banner height is the tallest slide. */}
      <div className="grid">
        {slides.map((s, i) => {
          const active = i === index
          return (
            <a
              key={s.id}
              href={s.href}
              {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              tabIndex={active ? 0 : -1}
              aria-hidden={!active}
              aria-label={`${i + 1} of ${count}: ${s.title}`}
              className={`group col-start-1 row-start-1 block transition-opacity duration-500 hover:bg-[#00224f] ${
                active ? 'opacity-100 z-[1]' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className="max-w-7xl mx-auto px-6 pt-5 pb-9 sm:pt-6 sm:pb-10 flex items-center gap-4 sm:gap-6">
                <div className="relative h-20 w-32 sm:h-28 sm:w-48 rounded-md overflow-hidden shrink-0 border border-white/10 bg-white/5">
                  {s.image ? (
                    <Image
                      src={s.image.src}
                      alt={s.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 128px, 192px"
                    />
                  ) : s.fallback ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#002a63] to-[#001230]">
                      {s.fallback.top && (
                        <span className="text-[10px] sm:text-xs font-sans font-bold tracking-[0.2em] text-iic-gold uppercase">
                          {s.fallback.top}
                        </span>
                      )}
                      <span className="font-display font-bold text-2xl sm:text-4xl leading-none my-1">
                        {s.fallback.main}
                      </span>
                      {s.fallback.bottom && (
                        <span className="text-[10px] sm:text-xs font-sans text-white/60">{s.fallback.bottom}</span>
                      )}
                    </div>
                  ) : null}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                    <span className="w-2 h-2 rounded-full bg-iic-saffron animate-pulse" />
                    <span className="text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.22em] text-iic-saffron">
                      {s.label}
                    </span>
                  </div>
                  <h3 className="font-display text-lg sm:text-2xl lg:text-3xl font-bold leading-snug text-white line-clamp-3">
                    {s.title}
                  </h3>
                  {s.meta && (
                    <div className="mt-1.5 text-xs sm:text-sm font-sans text-white/60 truncate">{s.meta}</div>
                  )}
                </div>

                <span className="hidden md:inline-flex shrink-0 items-center gap-2 text-xs font-sans font-bold uppercase tracking-[0.18em] text-iic-saffron border border-iic-saffron/40 rounded-full px-5 py-2.5 group-hover:bg-iic-saffron group-hover:text-[#001a3d] transition-colors duration-200">
                  {s.cta ?? 'Read'}
                  <ArrowIcon />
                </span>
              </div>
            </a>
          )
        })}
      </div>

      {/* Prev / next */}
      {count > 1 && (
        <div className="absolute top-2 right-3 sm:right-4 z-10 flex items-center gap-1">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
            className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next slide"
            className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}

      {/* Dots */}
      {count > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className="p-1"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-6 bg-iic-saffron' : 'w-1.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {/* 5-second timer. Advancing is driven by this bar's animation ending,
          so hovering/focusing (which pauses the bar) pauses the slider too,
          and reduced-motion users get no auto-advance. */}
      {count > 1 && (
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10 z-10 overflow-hidden" aria-hidden="true">
          <div
            key={index}
            className="banner-progress h-full w-full origin-left bg-iic-saffron"
            onAnimationEnd={() => go(index + 1)}
          />
        </div>
      )}
    </div>
  )
}
