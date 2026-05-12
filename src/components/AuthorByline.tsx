interface Author {
  name: string
  affiliation?: string
}

export default function AuthorByline({
  authors,
  date,
}: {
  authors: Author[]
  date?: string
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-sans">
      <div className="flex items-center gap-2">
        <span className="flex -space-x-2">
          {authors.slice(0, 3).map((a, i) => (
            <span
              key={i}
              className="w-7 h-7 rounded-full bg-gradient-to-br from-iic-saffron to-iic-navy text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white"
              title={a.name}
            >
              {a.name
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')}
            </span>
          ))}
        </span>
        <span className="text-stone-700">
          {authors.map((a, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-1 text-stone-300">·</span>}
              <span className="font-medium">{a.name}</span>
              {a.affiliation && (
                <span className="text-stone-400 text-xs ml-1">({a.affiliation})</span>
              )}
            </span>
          ))}
        </span>
      </div>
      {date && (
        <>
          <span className="text-stone-200">·</span>
          <time dateTime={date} className="text-stone-500 text-xs uppercase tracking-wider">
            {new Date(date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
        </>
      )}
    </div>
  )
}
