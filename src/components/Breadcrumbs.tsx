import Link from 'next/link'

interface Crumb {
  label: string
  href?: string
}

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.14em]">
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1
          return (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-iic-saffron/50">/</span>}
              {crumb.href && !last ? (
                <Link
                  href={crumb.href}
                  className="text-stone-400 hover:text-iic-navy transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-iic-navy font-semibold truncate max-w-[18rem]">
                  {crumb.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
