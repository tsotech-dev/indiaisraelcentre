import Link from 'next/link'
import Image from 'next/image'

interface PersonCardProps {
  name: string
  slug: string
  role_at_centre: string
  primary_affiliation?: string
  photo?: { url: string; alt?: string }
  category?: string
}

export default function PersonCard({
  name,
  slug,
  role_at_centre,
  primary_affiliation,
  photo,
  category,
}: PersonCardProps) {
  return (
    <article className="flex gap-4 p-5 border border-stone-200 rounded-sm hover:border-stone-400 transition-colors group">
      {photo ? (
        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-stone-100">
          <Image
            src={photo.url}
            alt={photo.alt ?? name}
            width={64}
            height={64}
            className="object-cover w-full h-full grayscale"
          />
        </div>
      ) : (
        <div className="w-16 h-16 rounded-full flex-shrink-0 bg-stone-200 flex items-center justify-center">
          <span className="text-stone-500 text-xl font-semibold">{name[0]}</span>
        </div>
      )}
      <div>
        <h3 className="text-sm font-semibold text-stone-900 group-hover:text-iic-accent transition-colors">
          <Link href={`/about/people/${slug}/`}>{name}</Link>
        </h3>
        <p className="text-xs text-stone-600 mt-0.5">{role_at_centre}</p>
        {primary_affiliation && (
          <p className="text-xs text-stone-400 mt-0.5 leading-tight">{primary_affiliation}</p>
        )}
      </div>
    </article>
  )
}
