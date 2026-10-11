'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'

interface GalleryImage {
  src: string
  alt: string
}

interface EventGalleryProps {
  images: GalleryImage[]
  initialCount?: number
}

export default function EventGallery({ images, initialCount = 8 }: EventGalleryProps) {
  const [showAll, setShowAll] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const visible = showAll ? images : images.slice(0, initialCount)
  const hasMore = images.length > initialCount

  const openLightbox = (i: number) => setLightboxIndex(i)
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
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  return (
    <>
      {/* ── Grid ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {visible.map((img, i) => (
          <button
            key={i}
            onClick={() => openLightbox(showAll ? i : i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-iic-saffron"
            aria-label={`View photo ${i + 1}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
              <svg
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white drop-shadow"
                width="32" height="32" viewBox="0 0 24 24" fill="none"
              >
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* ── View More ─────────────────────────────────────────────────── */}
      {hasMore && !showAll && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 px-6 py-3 border border-iic-navy text-iic-navy font-sans font-bold text-xs uppercase tracking-[0.18em] rounded hover:bg-iic-navy hover:text-white transition-colors duration-200"
          >
            View All Photos
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      )}

      {/* ── Lightbox ──────────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 z-10 text-white/70 hover:text-white p-2 transition-colors"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Prev */}
          <button
            className="absolute left-3 md:left-6 z-10 text-white/70 hover:text-white p-3 transition-colors"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Previous image"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-4xl max-h-[85vh] mx-16 md:mx-24"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full" style={{ paddingBottom: '66.67%' }}>
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
            {/* Counter */}
            <p className="text-center text-white/50 text-xs font-sans mt-3 tracking-widest">
              {lightboxIndex + 1} / {images.length}
            </p>
          </div>

          {/* Next */}
          <button
            className="absolute right-3 md:right-6 z-10 text-white/70 hover:text-white p-3 transition-colors"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Next image"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
    </>
  )
}
