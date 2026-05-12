import Link from 'next/link'
import { PILLARS } from '@/lib/pillars'

const PILLAR_ACCENTS: Record<string, { bar: string; num: string; hover: string }> = {
  identity: { bar: 'bg-iic-saffron', num: 'text-iic-saffron', hover: 'group-hover:border-iic-saffron' },
  governance: { bar: 'bg-iic-navy', num: 'text-iic-navy', hover: 'group-hover:border-iic-navy' },
  security: { bar: 'bg-iic-ink', num: 'text-iic-ink', hover: 'group-hover:border-iic-ink' },
  technology: { bar: 'bg-iic-blue', num: 'text-iic-blue', hover: 'group-hover:border-iic-blue' },
  development: { bar: 'bg-iic-gold-deep', num: 'text-iic-gold-deep', hover: 'group-hover:border-iic-gold-deep' },
  culture: { bar: 'bg-iic-saffron-deep', num: 'text-iic-saffron-deep', hover: 'group-hover:border-iic-saffron-deep' },
}

export default function PillarNavigatorGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-200 border border-stone-200 rounded-sm overflow-hidden">
      {PILLARS.map((pillar, i) => {
        const a = PILLAR_ACCENTS[pillar.code] ?? PILLAR_ACCENTS.identity
        return (
          <Link
            key={pillar.code}
            href={pillar.path}
            className={`group relative bg-white p-7 transition-colors duration-300 border-2 border-transparent ${a.hover}`}
          >
            <span className={`absolute top-0 left-0 h-full w-1 ${a.bar} scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500`} />

            <div className="flex items-start justify-between mb-4">
              <span className={`font-display text-3xl font-bold tracking-tight ${a.num}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-stone-400">
                Pillar
              </span>
            </div>

            <h3 className="font-display text-lg font-semibold text-stone-900 leading-snug mb-2 transition-colors">
              {pillar.label}
            </h3>
            <p className="text-sm text-stone-500 leading-relaxed">{pillar.oneLineFraming}</p>

            <span className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold uppercase tracking-widest text-stone-400 mt-5 group-hover:text-iic-saffron transition-colors">
              Explore
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </Link>
        )
      })}
    </div>
  )
}
