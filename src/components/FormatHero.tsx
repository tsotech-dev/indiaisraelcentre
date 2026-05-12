import Breadcrumbs from './Breadcrumbs'

type Accent = 'navy' | 'saffron' | 'gold'

const ACCENT_MAP: Record<Accent, { bar: string; eyebrow: string; blob: string }> = {
  navy: {
    bar: 'bg-iic-navy',
    eyebrow: 'text-iic-navy',
    blob: 'radial-gradient(circle, #005EB8 0%, transparent 70%)',
  },
  saffron: {
    bar: 'bg-iic-saffron',
    eyebrow: 'text-iic-saffron',
    blob: 'radial-gradient(circle, #FF671F 0%, transparent 70%)',
  },
  gold: {
    bar: 'bg-iic-gold',
    eyebrow: 'text-iic-gold-deep',
    blob: 'radial-gradient(circle, #FFD700 0%, transparent 70%)',
  },
}

interface FormatHeroProps {
  eyebrow: string
  title: string
  italic?: string
  description: string
  accent?: Accent
  crumbs: { label: string; href?: string }[]
  meta?: { label: string; value: string }[]
}

export default function FormatHero({
  eyebrow,
  title,
  italic,
  description,
  accent = 'navy',
  crumbs,
  meta,
}: FormatHeroProps) {
  const a = ACCENT_MAP[accent]
  return (
    <section className="relative bg-mesh border-b border-stone-200 overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full opacity-15"
        style={{ background: a.blob }}
      />
      <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-16">
        <Breadcrumbs crumbs={crumbs} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <div className={`text-[11px] font-sans font-bold uppercase tracking-[0.2em] ${a.eyebrow} mb-4 animate-fade-up`}>
              / {eyebrow}
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight text-stone-900 mb-6 animate-fade-up delay-1">
              {title}
              {italic && (
                <>
                  {' '}
                  <span className="italic font-light text-stone-500">{italic}</span>
                </>
              )}
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed max-w-2xl animate-fade-up delay-2">
              {description}
            </p>
          </div>
          {meta && meta.length > 0 && (
            <div className="lg:col-span-4 animate-fade-up delay-3">
              <div className="grid grid-cols-2 gap-6 pt-6 lg:pt-0 lg:border-l lg:border-stone-200 lg:pl-8">
                {meta.map((m) => (
                  <div key={m.label}>
                    <div className="font-display text-3xl font-bold tracking-tight text-iic-navy mb-1">
                      {m.value}
                    </div>
                    <div className="text-[10px] font-sans uppercase tracking-[0.15em] text-stone-500">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className={`mt-12 h-1 w-20 ${a.bar} rounded-full animate-fade-up delay-4`} />
      </div>
    </section>
  )
}
