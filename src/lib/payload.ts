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
      depth: 1,
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

export async function getVideos(opts: { limit?: number; pillar?: string } = {}) {
  try {
    const payload = await getPayloadClient()
    const where: Where = {}
    if (opts.pillar) where.pillar = { equals: opts.pillar }
    const res = await payload.find({
      collection: 'videos',
      where,
      limit: opts.limit ?? 50,
      sort: '-date',
    })
    return res.docs
  } catch {
    return []
  }
}

export async function getVideo(slug: string) {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'videos',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return res.docs[0] ?? null
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

// ── Videos: CMS entries merged with the whole YouTube channel feed ──────────

export interface SiteVideo {
  id: string
  title: string
  slug: string
  date: string
  pillar?: string | null
  description?: string | null
  videoUrl: string
  thumbnailUrl: string | null
  source: 'cms' | 'youtube'
}

const YT_ID_RE = /(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/

/**
 * Every video to show on the Watch pages, newest first.
 * - Videos added in the admin keep their slug, pillar and description.
 * - Channel uploads not in the admin are added automatically (slug "yt-<id>").
 * - A video present in both is shown once, using the admin entry.
 */
export async function getAllVideos(opts: { pillar?: string } = {}): Promise<SiteVideo[]> {
  const { getChannelVideos } = await import('./youtube')
  const [cms, channel] = await Promise.all([getVideos({ limit: 1000 }), getChannelVideos()])

  const cmsVideos: SiteVideo[] = cms.map((v) => {
    const videoUrl = v.videoUrl as string
    const ytId = videoUrl?.match(YT_ID_RE)?.[1]
    const thumb =
      v.thumbnail && typeof v.thumbnail === 'object' && 'url' in v.thumbnail
        ? ((v.thumbnail as { url?: string }).url ?? null)
        : null
    return {
      id: String(v.id),
      title: v.title as string,
      slug: v.slug as string,
      date: v.date as string,
      pillar: (v.pillar as string | null | undefined) ?? null,
      description: (v.description as string | null | undefined) ?? null,
      videoUrl,
      thumbnailUrl: thumb ?? (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : null),
      source: 'cms',
    }
  })

  const cmsYtIds = new Set(
    cmsVideos.map((v) => v.videoUrl?.match(YT_ID_RE)?.[1]).filter((x): x is string => !!x),
  )

  const channelVideos: SiteVideo[] = channel
    .filter((v) => !cmsYtIds.has(v.id))
    .map((v) => ({
      id: `yt-${v.id}`,
      title: v.title,
      slug: `yt-${v.id}`,
      date: v.publishedAt,
      pillar: null,
      description: v.description || null,
      videoUrl: v.url,
      thumbnailUrl: v.thumbnailUrl,
      source: 'youtube' as const,
    }))

  const all = [...cmsVideos, ...channelVideos].sort((a, b) => +new Date(b.date) - +new Date(a.date))
  return opts.pillar ? all.filter((v) => v.pillar === opts.pillar) : all
}

/** One video by slug: an admin entry, or a channel upload ("yt-<id>"). */
export async function getAnyVideo(slug: string): Promise<SiteVideo | null> {
  const all = await getAllVideos()
  return all.find((v) => v.slug === slug) ?? null
}
