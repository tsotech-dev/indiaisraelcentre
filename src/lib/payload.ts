import { getPayload, type Where } from 'payload'
import config from '@payload-config'

export async function getPayloadClient() {
  return getPayload({ config })
}

type PubType = 'paper' | 'brief' | 'commentary'

export async function getPublications(opts: {
  type?: PubType
  pillar?: string
  limit?: number
  excludeSlug?: string
} = {}) {
  try {
    const payload = await getPayloadClient()
    const where: Where = {}
    if (opts.type) where.type = { equals: opts.type }
    if (opts.pillar) where.pillar = { equals: opts.pillar }
    if (opts.excludeSlug) where.slug = { not_equals: opts.excludeSlug }
    const res = await payload.find({
      collection: 'publications',
      where,
      limit: opts.limit ?? 50,
      sort: '-publishedDate',
    })
    return res.docs
  } catch {
    return []
  }
}

export async function getPublication(slug: string, type?: PubType) {
  try {
    const payload = await getPayloadClient()
    const where: Where = { slug: { equals: slug } }
    if (type) where.type = { equals: type }
    const res = await payload.find({
      collection: 'publications',
      where,
      limit: 1,
    })
    return res.docs[0] ?? null
  } catch {
    return null
  }
}

export async function getConvenings(opts: { limit?: number; upcoming?: boolean } = {}) {
  try {
    const payload = await getPayloadClient()
    const where: Where = {}
    if (opts.upcoming === true) where.eventDate = { greater_than_equal: new Date().toISOString() }
    if (opts.upcoming === false) where.eventDate = { less_than: new Date().toISOString() }
    const res = await payload.find({
      collection: 'convenings',
      where,
      limit: opts.limit ?? 50,
      sort: opts.upcoming === true ? 'eventDate' : '-eventDate',
    })
    return res.docs
  } catch {
    return []
  }
}

export async function getConvening(slug: string) {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'convenings',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return res.docs[0] ?? null
  } catch {
    return null
  }
}

export async function getPeople(opts: { limit?: number } = {}) {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'people',
      limit: opts.limit ?? 100,
      sort: 'name',
    })
    return res.docs
  } catch {
    return []
  }
}

export async function getPerson(slug: string) {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'people',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return res.docs[0] ?? null
  } catch {
    return null
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getGlobal(slug: string): Promise<Record<string, any> | null> {
  try {
    const payload = await getPayloadClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await payload.findGlobal({ slug } as any)
  } catch {
    return null
  }
}

export async function getPillarContent(code: string) {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'pillars',
      where: { code: { equals: code } },
      limit: 1,
    })
    return res.docs[0] ?? null
  } catch {
    return null
  }
}
