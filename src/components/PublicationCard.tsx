import Link from 'next/link'
import { formatDate, formatLabel, publicationPath } from '@/lib/utils'

export interface PublicationCardProps {
  title: string
  type: string
  slug: string
  authors?: Array<{ name: string; affiliation?: string }>
  publishedDate?: string
  pillarLabel?: string
  abstract?: string
  compact?: boolean
}

const TYPE_ACCENT: Record<string, { dot: string; chip: string }> = {
  paper: { dot: 'bg-iic-navy', chip: 'text-iic-navy bg-iic-navy/10' },
  brief: { dot: 'bg-iic-saffron', chip: 'text-iic-saffron-deep bg-iic-saffron/10' },
  commentary: { dot: 'bg-iic-gold-deep', chip: 'text-iic-gold-deep bg-iic-gold/20' },
}

export default function PublicationCard({
  title,
  type,
  slug,
  authors,
  publishedDate,
  pillarLabel,
  abstract,
  compact = false,
}: PublicationCardProps) {
  const href = publicationPath(type, slug)
  const accent = TYPE_ACCENT[type] || TYPE_ACCENT.paper

  return (
    <Link
      href={href}
      className="group relative flex flex-col h-full border border-stone-200 rounded-sm p-6 bg-white hover-lift hover:border-iic-saffron/40 overflow-hidden"
    >
      <span className="absolute inset-x-0 top-0 h-[2px] bg-iic-saffron scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

      <div className="flex items-center justify-between gap-2 mb-4">
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-[0.14em] px-2 py-1 rounded-full ${accent.chip}`}>
          <span className={`w-1 h-1 rounded-full ${accent.dot}`} />
          {formatLabel(type)}
        </span>
        {pillarLabel && (
          <span className="text-[10px] font-sans text-stone-400 uppercase tracking-wider truncate">
            {pillarLabel}
          </span>
        )}
      </div>

      <h3 className={`${compact ? 'text-base' : 'text-lg'} font-display font-semibold text-stone-900 leading-snug mb-3 group-hover:text-iic-navy transition-colors`}>
        {title}
      </h3>

      {!compact && abstract && (
        <p className="text-sm text-stone-600 leading-relaxed mb-4 line-clamp-3 flex-1">{abstract}</p>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 text-xs font-sans pt-3 border-t border-stone-100">
        <div className="text-stone-500 truncate">
          {authors && authors.length > 0 && (
            <span>{authors.map((a) => a.name).join(', ')}</span>
          )}
        </div>
        {publishedDate && (
          <time dateTime={publishedDate} className="text-stone-400 shrink-0">
            {formatDate(publishedDate)}
          </time>
        )}
      </div>
    </Link>
  )
}
