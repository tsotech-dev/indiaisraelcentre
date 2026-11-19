'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback, useRef } from 'react'

interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

interface EventGalleryProps {
  images: GalleryImage[]
  /** How many thumbnails to show before the "View All" button. Defaults to all. */
  initialCount?: number
  /** Grid layout classes for the thumbnails. */
  gridClassName?: string
}

export default function EventGallery({
  images,
  initialCount = images.length,
  gridClassName = 'grid grid-cols-2 md:grid-cols-3 gap-3',
}: EventGalleryProps) {
  const [showAll, setShowAll] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)

  const visible = showAll ? images : images.slice(0, initialCount)
  const hasMore = images.length > initialCount

  const closeLightbox = () => setLightboxIndex(null)

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
  }, [images.length])

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length))
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIndex, prev, next])

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxIndex])

  // Preload neighbouring images so next/previous feels instant
  useEffect(() => {
    if (lightboxIndex === null || images.length < 2) return
    ;[(lightboxIndex + 1) % images.length, (lightboxIndex - 1 + images.length) % images.length].forEach(
      (i) => {
        const im = new window.Image()
        im.src = images[i].src
      },
    )
  }, [lightboxIndex, images])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) > 50) (dx > 0 ? prev : next)()
  }

  const current = lightboxIndex !== null ? images[lightboxIndex] : null

  return (
    <>
      {/* ── Grid ──────────────────────────────────────────────────────── */}
      <div className={gridClassName}>
        {visible.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-stone-100 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-iic-saffron"
            aria-label={`View photo ${i + 1} of ${images.length}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
              <svg
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white drop-shadow"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {img.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-left">
                <p className="text-white text-xs font-sans leading-snug">{img.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* ── View More ─────────────────────────────────────────────────── */}
      {hasMore && !showAll && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-iic-navy text-iic-navy font-sans font-bold text-xs uppercase tracking-[0.18em] rounded hover:bg-iic-navy hover:text-white transition-colors duration-200"
          >
            View All Photos
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      {/* ── Lightbox ──────────────────────────────────────────────────── */}
      {current && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Close */}
          <button
            type="button"
            className="absolute top-4 right-4 z-10 text-white/70 hover:text-white p-2 transition-colors"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              type="button"
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-2 md:p-3 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Previous photo"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* Image — shown whole (object-contain), any aspect ratio */}
          <div
            className="relative w-[calc(100vw-5.5rem)] md:w-[min(90vw,1200px)] h-[75vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={lightboxIndex}
              src={current.src}
              alt={current.alt}
              fill
              className="object-contain"
              sizes="100vw"
              quality={90}
              priority
            />
          </div>

          {/* Caption + counter */}
          <div className="mt-4 px-16 text-center max-w-3xl" onClick={(e) => e.stopPropagation()}>
            {current.caption && (
              <p className="text-white/90 text-sm font-sans leading-snug mb-2">{current.caption}</p>
            )}
            <p className="text-white/50 text-xs font-sans tracking-widest">
              {lightboxIndex + 1} / {images.length}
            </p>
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              type="button"
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-2 md:p-3 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Next photo"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  )
}
