// Fetches the full upload list of the India Israel Centre YouTube channel
// using the YouTube Data API v3. Results are cached for an hour.
//
// Env:
//   YOUTUBE_API_KEY          (required)
//   YOUTUBE_CHANNEL_HANDLE   (optional, default "IndiaIsraelCenter")

const API = 'https://www.googleapis.com/youtube/v3'
const REVALIDATE_SECONDS = 60 * 60
const MAX_PAGES = 10 // 10 × 50 = up to 500 videos

export interface YouTubeVideo {
  id: string
  title: string
  description: string
  publishedAt: string
  thumbnailUrl: string
  url: string
}

async function yt<T>(path: string, params: Record<string, string>, revalidate: number): Promise<T> {
  const key = process.env.YOUTUBE_API_KEY
  if (!key) throw new Error('YOUTUBE_API_KEY is not set')
  const qs = new URLSearchParams({ ...params, key })
  const res = await fetch(`${API}/${path}?${qs}`, { next: { revalidate } })
  if (!res.ok) {
    // Deliberately do not log the URL: it contains the API key.
    throw new Error(`YouTube API ${path} failed with status ${res.status}`)
  }
  return (await res.json()) as T
}

async function getUploadsPlaylistId(): Promise<string | null> {
  const handle = (process.env.YOUTUBE_CHANNEL_HANDLE || 'IndiaIsraelCenter').replace(/^@/, '')
  const data = await yt<{
    items?: Array<{ contentDetails?: { relatedPlaylists?: { uploads?: string } } }>
  }>('channels', { part: 'contentDetails', forHandle: `@${handle}` }, 24 * 60 * 60)
  return data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? null
}

/** All public uploads of the channel, newest first. Returns [] if unavailable. */
export async function getChannelVideos(): Promise<YouTubeVideo[]> {
  if (!process.env.YOUTUBE_API_KEY) return []
  try {
    const playlistId = await getUploadsPlaylistId()
    if (!playlistId) return []

    const videos: YouTubeVideo[] = []
    let pageToken: string | undefined
    for (let page = 0; page < MAX_PAGES; page++) {
      const data: {
        nextPageToken?: string
        items?: Array<{
          snippet?: { title?: string; description?: string; publishedAt?: string }
          contentDetails?: { videoId?: string; videoPublishedAt?: string }
        }>
      } = await yt(
        'playlistItems',
        {
          part: 'snippet,contentDetails',
          maxResults: '50',
          playlistId,
          ...(pageToken ? { pageToken } : {}),
        },
        REVALIDATE_SECONDS,
      )

      for (const item of data.items ?? []) {
        const id = item.contentDetails?.videoId
        const title = item.snippet?.title
        // Private/deleted videos show up in the playlist with placeholder titles.
        if (!id || !title || title === 'Private video' || title === 'Deleted video') continue
        videos.push({
          id,
          title,
          description: item.snippet?.description ?? '',
          publishedAt:
            item.contentDetails?.videoPublishedAt ?? item.snippet?.publishedAt ?? new Date(0).toISOString(),
          thumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
          url: `https://www.youtube.com/watch?v=${id}`,
        })
      }

      pageToken = data.nextPageToken
      if (!pageToken) break
    }

    return videos.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
  } catch (err) {
    console.error('[youtube] could not load channel videos:', err instanceof Error ? err.message : err)
    return []
  }
}
