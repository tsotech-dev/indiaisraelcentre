'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import { PILLARS } from '@/lib/pillars'

interface FilterBarProps {
  showFormat?: boolean
  showPillar?: boolean
  showYear?: boolean
}

const FORMATS = [
  { value: 'paper', label: 'Papers' },
  { value: 'brief', label: 'Briefs' },
  { value: 'commentary', label: 'Commentary' },
]

const YEARS = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i)

function Chip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs font-sans font-medium px-3 py-1.5 rounded-full border transition-all duration-200 ${
        active
          ? 'bg-iic-navy text-white border-iic-navy shadow-sm'
          : 'bg-white text-stone-600 border-stone-200 hover:border-iic-navy hover:text-iic-navy'
      }`}
    >
      {label}
    </button>
  )
}

export default function FilterBar({
  showFormat = true,
  showPillar = true,
  showYear = true,
}: FilterBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && params.get(key) !== value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete('page')
      const qs = params.toString()
      router.push(qs ? `${pathname}?${qs}` : pathname)
    },
    [router, pathname, searchParams],
  )

  const active = (key: string) => searchParams.get(key) ?? ''
  const hasFilters = !!(active('pillar') || active('format') || active('year'))

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-sm p-4 mb-10 space-y-3">
      {showFormat && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.14em] text-stone-400 mr-2 w-16">
            Format
          </span>
          {FORMATS.map((f) => (
            <Chip
              key={f.value}
              label={f.label}
              active={active('format') === f.value}
              onClick={() => setParam('format', f.value)}
            />
          ))}
        </div>
      )}

      {showPillar && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.14em] text-stone-400 mr-2 w-16">
            Pillar
          </span>
          {PILLARS.map((p) => (
            <Chip
              key={p.code}
              label={p.label.split(',')[0]}
              active={active('pillar') === p.code}
              onClick={() => setParam('pillar', p.code)}
            />
          ))}
        </div>
      )}

      {showYear && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.14em] text-stone-400 mr-2 w-16">
            Year
          </span>
          {YEARS.map((y) => (
            <Chip
              key={y}
              label={String(y)}
              active={active('year') === String(y)}
              onClick={() => setParam('year', String(y))}
            />
          ))}
        </div>
      )}

      {hasFilters && (
        <div className="pt-2 border-t border-stone-200">
          <button
            onClick={() => router.push(pathname)}
            className="text-xs font-sans text-iic-saffron-deep hover:text-iic-saffron font-semibold"
          >
            ✕ Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
