import type { Payload, TypedUser } from 'payload'
import { CONTENT_AREAS, type ContentArea } from './areas'
import { startOfTodayJakarta } from './format'

type Doc = Record<string, unknown> & { id: number | string; updatedAt: string; _status?: string }

export type AreaStats = {
  area: ContentArea
  published: number
  pending: number
  missingEnglish: number
}

export type ListedDoc = {
  id: number | string
  title: string
  area: ContentArea
  updatedAt: string
  status: 'draft' | 'published'
  validUntil?: string
}

const asDocs = (docs: unknown) => docs as Doc[]

export type DashboardData = {
  areas: AreaStats[]
  pending: ListedDoc[]
  pendingTotal: number
  /** Draf tanpa judul, biasanya terbuat otomatis saat halaman Tambah dibuka lalu ditinggalkan. */
  emptyDrafts: number
  expiredOffers: ListedDoc[]
  recent: ListedDoc[]
  mediaCount: number
}

const hasTitle = (doc: Doc, area: ContentArea) => {
  const value = doc[area.titleField]
  return typeof value === 'string' && value.trim().length > 0
}

const titleOf = (doc: Doc, area: ContentArea) => (hasTitle(doc, area) ? String(doc[area.titleField]) : '(tanpa judul)')

const toListed = (doc: Doc, area: ContentArea): ListedDoc => ({
  id: doc.id,
  title: titleOf(doc, area),
  area,
  updatedAt: doc.updatedAt,
  status: doc._status === 'draft' ? 'draft' : 'published',
  validUntil: typeof doc.validUntil === 'string' ? doc.validUntil : undefined,
})

export async function loadDashboardData(
  payload: Payload,
  user: TypedUser,
  visible: Set<string>,
): Promise<DashboardData> {
  const base = { user, overrideAccess: false, depth: 0 } as const
  const areas = CONTENT_AREAS.filter((area) => visible.has(area.slug))

  const perArea = await Promise.all(
    areas.map(async (area) => {
      const [published, pending, recent, english] = await Promise.all([
        payload.count({ ...base, collection: area.slug, where: { _status: { equals: 'published' } } }),
        payload.find({
          ...base,
          collection: area.slug,
          draft: true,
          where: { _status: { equals: 'draft' } },
          sort: '-updatedAt',
          limit: 50,
        }),
        payload.find({ ...base, collection: area.slug, draft: true, sort: '-updatedAt', limit: 5 }),
        payload.find({
          ...base,
          collection: area.slug,
          locale: 'en',
          fallbackLocale: false,
          pagination: false,
          where: { _status: { equals: 'published' } },
          select: { [area.translatedField]: true },
        }),
      ])

      const missingEnglish = asDocs(english.docs).filter((doc) => {
        const value = doc[area.translatedField]
        return typeof value !== 'string' || !value.trim()
      }).length

      const pendingDocs = asDocs(pending.docs)
      const named = pendingDocs.filter((doc) => hasTitle(doc, area))
      const emptyDrafts = pendingDocs.length - named.length

      return {
        stats: { area, published: published.totalDocs, pending: pending.totalDocs - emptyDrafts, missingEnglish },
        pending: named.slice(0, 6).map((doc) => toListed(doc, area)),
        emptyDrafts,
        recent: asDocs(recent.docs)
          .filter((doc) => hasTitle(doc, area))
          .map((doc) => toListed(doc, area)),
      }
    }),
  )

  const offersArea = areas.find((area) => area.slug === 'offers')
  const expired = offersArea
    ? await payload.find({
        ...base,
        collection: 'offers',
        where: {
          and: [{ _status: { equals: 'published' } }, { validUntil: { less_than: startOfTodayJakarta() } }],
        },
        sort: 'validUntil',
        limit: 10,
      })
    : null

  const mediaCount = visible.has('media')
    ? (await payload.count({ ...base, collection: 'media' })).totalDocs
    : 0

  const byNewest = (a: ListedDoc, b: ListedDoc) => b.updatedAt.localeCompare(a.updatedAt)

  return {
    areas: perArea.map((item) => item.stats),
    pending: perArea.flatMap((item) => item.pending).sort(byNewest).slice(0, 8),
    pendingTotal: perArea.reduce((sum, item) => sum + item.stats.pending, 0),
    emptyDrafts: perArea.reduce((sum, item) => sum + item.emptyDrafts, 0),
    expiredOffers: offersArea && expired ? asDocs(expired.docs).map((doc) => toListed(doc, offersArea)) : [],
    recent: perArea.flatMap((item) => item.recent).sort(byNewest).slice(0, 8),
    mediaCount,
  }
}
