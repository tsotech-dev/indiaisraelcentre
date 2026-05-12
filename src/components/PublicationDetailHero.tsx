import Link from 'next/link'
import Breadcrumbs from './Breadcrumbs'
import AuthorByline from './AuthorByline'

type FormatType = 'paper' | 'brief' | 'commentary'

const FORMAT_META: Record<FormatType, { label: string; accent: string; chipBg: string; blob: string }> = {
  paper: {
    label: 'Paper',
    accent: 'text-iic-navy',
    chipBg: 'bg-iic-navy/10 text-iic-navy',
    blob: 'radial-gradient(circle, #003D7A 0%, transparent 70%)',
  },
  brief: {
    label: 'Brief',
    accent: 'text-iic-saffron',
    chipBg: 'bg-iic-saffron/10 text-iic-saffron-deep',
    blob: 'radial-gradient(circle, #FF671F 0%, transparent 70%)',
  },
  commentary: {
    label: 'Commentary',
    accent: 'text-iic-gold-deep',
    chipBg: 'bg-iic-gold/20 text-iic-gold-deep',
    blob: 'radial-gradient(circle, #FFD700 0%, transparent 70%)',
  },
}

interface Props {
  type: FormatType
  title: string
  authors: { name: string; affiliation?: string }[]
  publishedDate: string
  pillarLabel: string
  pillarCode: string
  crumbs: { label: string; href?: string }[]
}

export default function PublicationDetailHero({
  type,
  title,
  authors,
  publishedDate,
  pillarLabel,
  pillarCode,
  crumbs,
}: Props) {
  const m = FORMAT_META[type]
  return (
    <section className="relative bg-mesh border-b border-stone-200 overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full opacity-15"
        style={{ background: m.blob }}
      />
      <div className="relative max-w-4xl mx-auto px-6 pt-12 pb-14">
        <Breadcrumbs crumbs={crumbs} />
        <div className="flex flex-wrap items-center gap-2 mb-6 animate-fade-up">
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full ${m.chipBg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${m.accent.replace('text-', 'bg-')}`} />
            {m.label}
          </span>
          <Link
            href={`/research/themes/${pillarCode}/`}
            className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-stone-400 hover:text-iic-saffron transition-colors"
          >
            {pillarLabel}
          </Link>
        </div>

        <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight text-stone-900 mb-8 animate-fade-up delay-1">
          {title}
        </h1>

        <div className="animate-fade-up delay-2">
          <AuthorByline authors={authors} date={publishedDate} />
        </div>
      </div>
    </section>
  )
}
