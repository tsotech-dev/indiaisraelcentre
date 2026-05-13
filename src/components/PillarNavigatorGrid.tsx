import Link from 'next/link'
import { PILLARS } from '@/lib/pillars'

const ACCENTS: Record<string, { bar: string; num: string; border: string }> = {
  identity:   { bar: 'bg-iic-saffron',      num: 'text-iic-saffron',      border: 'hover:border-iic-saffron/50' },
  governance: { bar: 'bg-iic-navy',          num: 'text-iic-navy',          border: 'hover:border-iic-navy/50' },
  security:   { bar: 'bg-iic-ink',           num: 'text-iic-ink',           border: 'hover:border-stone-500/50' },
  technology: { bar: 'bg-iic-blue',          num: 'text-iic-blue',          border: 'hover:border-iic-blue/50' },
  development:{ bar: 'bg-iic-gold-deep',     num: 'text-iic-gold-deep',     border: 'hover:border-iic-gold-deep/50' },
  culture:    { bar: 'bg-iic-saffron-deep',  num: 'text-iic-saffron-deep',  border: 'hover:border-iic-saffron-deep/50' },
}

export default function PillarNavigatorGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {PILLARS.map((pillar) => {
        const a = ACCENTS[pillar.code] ?? ACCENTS.identity
        return (
          <Link
            key={pillar.code}
            href={pillar.path}
            className={`group relative flex flex-col bg-white border border-stone-200 rounded-lg p-8 overflow-hidden hover-lift ${a.border} transition-colors`}
          >
            {/* top accent bar */}
            <span
              className={`absolute inset-x-0 top-0 h-[3px] ${a.bar} rounded-t-lg scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`}
            />

            {/* numeral + pillar label row */}
            <div className="flex items-start justify-between mb-5">
              <span className={`font-display text-4xl font-bold tracking-tight leading-none ${a.num}`}>
                {pillar.numeral}.
              </span>
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-stone-300 mt-1">
                Pillar
              </span>
            </div>

            <h3 className="font-display text-lg font-semibold text-stone-900 leading-snug mb-3 group-hover:text-stone-700 transition-colors">
              {pillar.label}
            </h3>
            <p className="text-sm text-stone-500 leading-relaxed flex-1">
              {pillar.shortFraming}
            </p>

            <div className="mt-6 pt-5 border-t border-stone-100">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-sans font-semibold uppercase tracking-widest text-stone-400 group-hover:text-iic-saffron transition-colors">
                Explore
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
