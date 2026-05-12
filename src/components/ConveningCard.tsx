import Link from 'next/link'
import { conveningFormatLabel } from '@/lib/utils'

interface ConveningCardProps {
  title: string
  slug: string
  eventDate: string
  format?: string
  pillarLabel?: string
  compact?: boolean
}

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

export default function ConveningCard({
  title,
  slug,
  eventDate,
  format,
  pillarLabel,
  compact = false,
}: ConveningCardProps) {
  const d = new Date(eventDate)
  const day = d.getDate().toString().padStart(2, '0')
  const month = MONTHS[d.getMonth()]
  const year = d.getFullYear()

  return (
    <Link
      href={`/forum/${slug}/`}
      className="group flex gap-5 border border-stone-200 rounded-sm p-5 bg-white hover-lift hover:border-iic-navy/40 relative overflow-hidden"
    >
      <span className="absolute inset-y-0 left-0 w-[3px] bg-iic-navy scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />

      <div className="shrink-0 w-16 text-center">
        <div className="bg-iic-navy text-white rounded-sm py-2 group-hover:bg-iic-saffron transition-colors duration-300">
          <div className="text-[10px] font-sans font-bold tracking-widest text-iic-gold group-hover:text-white transition-colors">
            {month}
          </div>
          <div className="font-display font-bold text-xl leading-none my-1">{day}</div>
          <div className="text-[9px] font-sans text-white/60">{year}</div>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {format && (
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.14em] text-iic-saffron-deep bg-iic-saffron/10 px-2 py-0.5 rounded-full">
              {conveningFormatLabel(format)}
            </span>
          )}
          {pillarLabel && (
            <span className="text-[10px] font-sans text-stone-400 uppercase tracking-wider truncate">
              {pillarLabel}
            </span>
          )}
        </div>
        <h3 className={`${compact ? 'text-base' : 'text-lg'} font-display font-semibold text-stone-900 leading-snug group-hover:text-iic-navy transition-colors`}>
          {title}
        </h3>
      </div>
    </Link>
  )
}
