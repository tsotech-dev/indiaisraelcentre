import Breadcrumbs from './Breadcrumbs'

interface Props {
  eyebrow: string
  title: string
  description?: string
  crumbs: { label: string; href?: string }[]
  accent?: 'saffron' | 'navy' | 'gold'
}

const BLOBS: Record<NonNullable<Props['accent']>, string> = {
  saffron: 'radial-gradient(circle, #FF671F 0%, transparent 65%)',
  navy: 'radial-gradient(circle, #003D7A 0%, transparent 65%)',
  gold: 'radial-gradient(circle, #FFD700 0%, transparent 65%)',
}

export default function StaticPageHero({
  eyebrow,
  title,
  description,
  crumbs,
  accent = 'saffron',
}: Props) {
  return (
    <section className="relative bg-mesh border-b border-stone-200 overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full opacity-15"
        style={{ background: BLOBS[accent] }}
      />
      <div className="relative max-w-5xl mx-auto px-6 pt-12 pb-14">
        <Breadcrumbs crumbs={crumbs} />
        <div className="text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-4 animate-fade-up">
          / {eyebrow}
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight text-stone-900 mb-4 animate-fade-up delay-1">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl text-stone-500 font-display italic font-light max-w-2xl animate-fade-up delay-2">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
