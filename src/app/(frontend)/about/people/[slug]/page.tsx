import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Breadcrumbs from '@/components/Breadcrumbs'
import RichTextRenderer from '@/components/RichTextRenderer'
import JsonLd from '@/components/JsonLd'
import { getPerson } from '@/lib/payload'
import { PILLARS } from '@/lib/pillars'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const person = await getPerson(slug)
  if (!person) return {}
  return {
    title: person.name,
    description: `${person.role} at the India Israel Centre.`,
    openGraph: { title: person.name },
  }
}

function pillarDisplay(code: string): string {
  const p = PILLARS.find((x) => x.code === code)
  if (!p) return code
  return `${p.numeral}. ${p.label}`
}

export default async function PersonProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const person = await getPerson(slug)
  if (!person) notFound()

  const photoUrl =
    person.photo && typeof person.photo === 'object' && 'url' in person.photo
      ? (person.photo.url as string | null)
      : null

  const initials = person.name
    .split(' ')
    .map((n: string) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')

  const areas =
    (person.areasOfFocus as { item: string }[] | null | undefined)?.map((a) => a.item) ?? []
  const pillarAffs =
    (person.pillarAffiliations as
      | { pillarCode: string; role: 'primary' | 'secondary' }[]
      | null
      | undefined) ?? []
  const externals =
    (person.externalAffiliations as { item: string }[] | null | undefined)?.map((a) => a.item) ?? []

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.role,
    url: `https://indiaisraelcentre.org/about/people/${person.slug}/`,
    ...(person.email && { email: person.email }),
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="relative bg-mesh border-b border-stone-200 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #FF671F 0%, transparent 65%)' }}
        />
        <div className="relative max-w-5xl mx-auto px-6 pt-12 pb-16">
          <Breadcrumbs crumbs={[{ label: 'About', href: '/about/' }, { label: person.name }]} />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end mt-2">
            <div className="md:col-span-4">
              <div className="relative aspect-square rounded-sm overflow-hidden bg-gradient-to-br from-iic-saffron via-iic-saffron-deep to-iic-navy ring-1 ring-iic-saffron/20">
                {photoUrl ? (
                  <Image
                    src={photoUrl}
                    alt={person.name}
                    width={480}
                    height={480}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-grid opacity-20" />
                    <span className="font-display text-7xl font-bold text-white relative">
                      {initials || person.name[0]}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="md:col-span-8 animate-fade-up">
              <div className="text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-iic-saffron mb-3">
                / People
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight text-stone-900 mb-3">
                {person.name}
              </h1>
              <p className="text-lg md:text-xl text-stone-500 font-display italic font-light mb-5">
                {person.role}
              </p>
              {person.email && (
                <a
                  href={`mailto:${person.email}`}
                  className="text-sm font-sans font-semibold text-iic-navy underline-anim font-mono"
                >
                  {person.email}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {person.bio && (
        <section className="bg-iic-paper border-b border-stone-200">
          <div className="max-w-3xl mx-auto px-6 py-14">
            <h2 className="font-display text-2xl font-bold text-stone-900 mb-6">Bio</h2>
            <RichTextRenderer data={person.bio} className="prose max-w-none" />
          </div>
        </section>
      )}

      {areas.length > 0 && (
        <section className="bg-white border-b border-stone-200">
          <div className="max-w-3xl mx-auto px-6 py-14">
            <h2 className="font-display text-2xl font-bold text-stone-900 mb-6">Areas of focus</h2>
            <ul className="list-disc pl-6 space-y-2 text-stone-700 leading-relaxed">
              {areas.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {pillarAffs.length > 0 && (
        <section className="bg-iic-paper border-b border-stone-200">
          <div className="max-w-3xl mx-auto px-6 py-14">
            <h2 className="font-display text-2xl font-bold text-stone-900 mb-6">
              Pillar affiliations
            </h2>
            <ul className="space-y-2 text-stone-700 leading-relaxed">
              {pillarAffs.map((p, i) => (
                <li key={i}>
                  {pillarDisplay(p.pillarCode)}{' '}
                  <span className="text-stone-500">({p.role})</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-white border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <h2 className="font-display text-2xl font-bold text-stone-900 mb-6">
            Publications and external work
          </h2>
          {externals.length > 0 ? (
            <ul className="list-disc pl-6 space-y-2 text-stone-700 leading-relaxed">
              {externals.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-stone-500 italic">
              Auto-populated from the Centre&rsquo;s database. External publications list to be added.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
