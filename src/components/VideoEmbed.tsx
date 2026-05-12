'use client'

import { useState } from 'react'

export default function VideoEmbed({ url, title }: { url: string; title?: string }) {
  const [loaded, setLoaded] = useState(false)

  // Convert YouTube/Vimeo watch URLs to embed URLs
  function getEmbedUrl(rawUrl: string): string {
    const ytMatch = rawUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/)
    if (ytMatch) return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?rel=0`
    const vimeoMatch = rawUrl.match(/vimeo\.com\/(\d+)/)
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?dnt=1`
    return rawUrl
  }

  const embedUrl = getEmbedUrl(url)

  if (!loaded) {
    return (
      <div className="aspect-video bg-stone-100 rounded-sm flex items-center justify-center my-8">
        <button
          onClick={() => setLoaded(true)}
          className="flex flex-col items-center gap-3 text-stone-600 hover:text-stone-900"
        >
          <div className="w-14 h-14 rounded-full border-2 border-stone-400 flex items-center justify-center">
            <span className="text-2xl">▶</span>
          </div>
          <span className="text-sm font-sans">{title ?? 'Play recording'}</span>
          <span className="text-xs font-sans text-stone-400">
            Clicking loads the video from an external provider
          </span>
        </button>
      </div>
    )
  }

  return (
    <div className="aspect-video my-8 rounded-sm overflow-hidden">
      <iframe
        src={embedUrl}
        title={title ?? 'Recording'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  )
}
