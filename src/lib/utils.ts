import { PILLARS } from './pillars'

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).trimEnd() + '…'
}

export function pillarPath(code: string): string {
  return `/research/themes/${code}/`
}

export function pillarLabel(code?: string | null): string {
  if (!code) return ''
  return PILLARS.find((p) => p.code === code)?.label ?? code
}

export function publicationPath(type: string, slug: string): string {
  const typeMap: Record<string, string> = {
    paper: 'papers',
    brief: 'briefs',
    commentary: 'commentary',
  }
  return `/research/${typeMap[type] ?? 'papers'}/${slug}/`
}

export function formatLabel(type: string): string {
  const labels: Record<string, string> = {
    paper: 'Paper',
    brief: 'Brief',
    commentary: 'Commentary',
  }
  return labels[type] ?? type
}

export function conveningFormatLabel(format: string): string {
  const labels: Record<string, string> = {
    lecture: 'Lecture',
    panel: 'Panel',
    workshop: 'Workshop',
    roundtable: 'Roundtable',
    conference: 'Conference',
    other: 'Event',
  }
  return labels[format] ?? format
}
