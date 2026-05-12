import Link from 'next/link'
import { formatDate, formatLabel, publicationPath } from '@/lib/utils'

interface FeaturedHeroProps {
  type: 'publication' | 'convening'
  title: string
  slug: string
  format?: string
  abstract?: string
  authors?: Array<{ name: string; affiliation?: string }>
  date?: string
  pillarLabel?: string
}

export default function FeaturedHero({
  type,
  title,
  slug,
  format,
  abstract,
  authors,
  date,
  pillarLabel,
}: FeaturedHeroProps) {
  const href =
    type === 'publication' && format
      ? publicationPath(format, slug)
      : `/forum/${slug}/`

  return (
    <section className="border-b border-stone-200 pb-12 mb-12">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          {format && type === 'publication' && (
            <span className="text-xs font-sans font-semibold uppercase tracking-widest text-iic-accent">
              {formatLabel(format)}
            </span>
          )}
          {pillarLabel && (
            <>
              <span className="text-stone-300">·</span>
              <span className="text-xs font-sans text-stone-500">{pillarLabel}</span>
            </>
          )}
          {type === 'convening' && !format && (
            <span className="text-xs font-sans font-semibold uppercase tracking-widest text-stone-500">
              Upcoming Convening
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-stone-900 leading-tight mb-4">
          <Link href={href} className="hover:text-iic-accent transition-colors">
            {title}
          </Link>
        </h1>

        {abstract && (
          <p className="text-base text-stone-600 leading-relaxed mb-5 line-clamp-4">{abstract}</p>
        )}

        <div className="flex items-center gap-4 text-sm font-sans text-stone-500">
          {authors && authors.length > 0 && (
            <span>{authors.map((a) => a.name).join(', ')}</span>
          )}
          {date && <time dateTime={date}>{formatDate(date)}</time>}
        </div>

        <Link
          href={href}
          className="inline-flex items-center gap-2 mt-6 text-sm font-sans font-medium text-iic-accent hover:underline"
        >
          Read {type === 'publication' ? formatLabel(format ?? '') : 'about this convening'}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  )
}
