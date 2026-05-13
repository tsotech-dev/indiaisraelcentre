export default function ImagePlaceholder({
  alt,
  aspectRatio = '16/9',
  className = '',
}: {
  alt: string
  aspectRatio?: string
  className?: string
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden bg-stone-100 border border-dashed border-stone-300 ${className}`}
      style={{ aspectRatio }}
    >
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        <svg
          className="w-8 h-8 text-stone-400 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.25}
        >
          <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
        </svg>
        <p className="text-[11px] font-sans text-stone-400 leading-relaxed max-w-[220px]">{alt}</p>
      </div>
    </div>
  )
}
