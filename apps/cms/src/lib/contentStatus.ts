import type { BasePayload, CollectionSlug } from 'payload'
import { cache } from 'react'

export type Tone = 'blue' | 'green' | 'rose' | 'peach' | 'amber' | 'violet' | 'teal' | 'slate'

type Doc = Record<string, unknown> & { id: string | number; updatedAt?: string; _status?: string }

interface Source {
  collection: CollectionSlug
  type: string
  tone: Tone
  /** Kata benda untuk jumlah, misalnya "tipe kamar". */
  unit: string
  /** Nama di Akses cepat. */
  label: string
  titleField: string
  image: (doc: Doc) => string | null
  /** Label pemeriksaan foto wajib. Tanpa ini, foto kosong tidak dianggap masalah. */
  imageCheck?: string
  checks: { label: string; done: (doc: Doc, english: boolean) => boolean }[]
}

const filled = (value: unknown) => typeof value === 'string' ? value.trim().length > 0 : value !== null && value !== undefined
const mediaUrl = (value: unknown) => {
  const url = (value as { url?: unknown } | null)?.url
  return typeof url === 'string' && url ? url : null
}
const hasMedia = (value: unknown) => value !== null && value !== undefined && value !== ''

const english = { label: 'Terjemahan English', done: (_doc: Doc, en: boolean) => en }

const SOURCES: Source[] = [
  {
    collection: 'rooms',
    type: 'Kamar',
    tone: 'blue',
    unit: 'tipe kamar',
    label: 'Daftar Kamar',
    imageCheck: 'Foto utama',
    titleField: 'name',
    image: (doc) => mediaUrl((doc.images as { image?: unknown }[] | undefined)?.[0]?.image),
    checks: [
      { label: 'Nama dan deskripsi', done: (doc) => filled(doc.name) && filled(doc.shortDescription) },
      { label: 'Foto utama', done: (doc) => Array.isArray(doc.images) && doc.images.length > 0 },
      english,
      { label: 'Harga per malam', done: (doc) => filled(doc.startingPriceLabel) },
    ],
  },
  {
    collection: 'spa-treatments',
    type: 'Spa',
    tone: 'green',
    unit: 'perawatan',
    label: 'Perawatan Spa',
    imageCheck: 'Foto utama',
    titleField: 'title',
    image: (doc) => mediaUrl(doc.featuredImage),
    checks: [
      { label: 'Judul dan deskripsi', done: (doc) => filled(doc.title) && filled(doc.description) },
      { label: 'Foto utama', done: (doc) => hasMedia(doc.featuredImage) },
      english,
      { label: 'Harga', done: (doc) => filled(doc.priceLabel) },
    ],
  },
  {
    collection: 'wedding-packages',
    type: 'Wedding',
    tone: 'rose',
    unit: 'paket',
    label: 'Paket Wedding',
    imageCheck: 'Foto utama',
    titleField: 'title',
    image: (doc) => mediaUrl(doc.featuredImage),
    checks: [
      { label: 'Judul dan deskripsi', done: (doc) => filled(doc.title) && filled(doc.description) },
      { label: 'Foto utama', done: (doc) => hasMedia(doc.featuredImage) },
      english,
      { label: 'Harga mulai', done: (doc) => filled(doc.priceLabel) },
    ],
  },
  {
    collection: 'resort-content',
    type: 'Fasilitas & Wisata',
    tone: 'peach',
    unit: 'item',
    label: 'Fasilitas & Wisata',
    imageCheck: 'Foto utama',
    titleField: 'title',
    image: (doc) => mediaUrl(doc.featuredImage),
    checks: [
      { label: 'Judul dan deskripsi', done: (doc) => filled(doc.title) && filled(doc.description) },
      { label: 'Foto utama', done: (doc) => hasMedia(doc.featuredImage) },
      english,
    ],
  },
  {
    collection: 'offers',
    type: 'Promo',
    tone: 'amber',
    unit: 'penawaran',
    label: 'Daftar Promo',
    imageCheck: 'Foto utama',
    titleField: 'title',
    image: (doc) => mediaUrl(doc.featuredImage),
    checks: [
      { label: 'Judul dan deskripsi', done: (doc) => filled(doc.title) && filled(doc.description) },
      { label: 'Foto utama', done: (doc) => hasMedia(doc.featuredImage) },
      english,
      { label: 'Tanggal berlaku', done: (doc) => filled(doc.validUntil) },
    ],
  },
  {
    collection: 'journal-articles',
    type: 'Jurnal',
    tone: 'violet',
    unit: 'artikel',
    label: 'Artikel Jurnal',
    imageCheck: 'Foto sampul',
    titleField: 'title',
    image: (doc) => mediaUrl(doc.coverImage),
    checks: [
      { label: 'Judul dan ringkasan', done: (doc) => filled(doc.title) && filled(doc.excerpt) },
      { label: 'Foto sampul', done: (doc) => hasMedia(doc.coverImage) },
      english,
    ],
  },
  {
    collection: 'gallery-items',
    type: 'Galeri',
    tone: 'teal',
    unit: 'foto',
    label: 'Foto Galeri',
    imageCheck: 'File foto',
    titleField: 'title',
    image: (doc) => mediaUrl(doc.image),
    checks: [
      { label: 'Judul foto', done: (doc) => filled(doc.title) },
      { label: 'File foto', done: (doc) => hasMedia(doc.image) },
      english,
    ],
  },
  {
    collection: 'pages',
    type: 'Halaman',
    tone: 'slate',
    unit: 'halaman',
    label: 'Halaman Tambahan',
    titleField: 'title',
    image: (doc) => mediaUrl(doc.heroImage),
    checks: [
      { label: 'Nama halaman', done: (doc) => filled(doc.title) },
      { label: 'Isi halaman', done: (doc) => Array.isArray(doc.sections) && doc.sections.length > 0 },
      english,
    ],
  },
]

export interface StatusItem {
  key: string
  collection: string
  type: string
  tone: Tone
  title: string
  hasEnglish: boolean
  href: string
  updatedAt: string | null
  checks?: { label: string; done: boolean }[]
  completeness?: number
  issue?: { label: string; message: string; action: string; href: string }
  image?: string | null
}

export interface CollectionSummary {
  collection: string
  label: string
  type: string
  tone: Tone
  countLabel: string
  total: number
  published: number
  href: string
}

export interface ContentStatus {
  drafts: StatusItem[]
  attention: StatusItem[]
  recent: StatusItem[]
  summaries: CollectionSummary[]
  mediaCount: number
}

const RECENT_DAYS = 30

/** Status semua konten untuk dasbor dan angka di sidebar. Dihitung sekali per permintaan. */
export const getContentStatus = cache(async (payload: BasePayload): Promise<ContentStatus> => {
  const now = Date.now()
  const results = await Promise.all(
    SOURCES.map(async (source) => {
      const [current, english] = await Promise.all([
        payload
          .find({ collection: source.collection, draft: true, depth: 1, limit: 200, locale: 'id', overrideAccess: true })
          .catch(() => ({ docs: [] as Doc[] })),
        payload
          .find({
            collection: source.collection,
            draft: true,
            depth: 0,
            limit: 200,
            locale: 'en',
            fallbackLocale: false,
            overrideAccess: true,
            select: { [source.titleField]: true },
          } as Parameters<typeof payload.find>[0])
          .catch(() => ({ docs: [] as Doc[] })),
      ])
      const englishIds = new Set(
        (english.docs as Doc[]).filter((doc) => filled(doc[source.titleField])).map((doc) => String(doc.id)),
      )
      return { source, docs: current.docs as Doc[], englishIds }
    }),
  )

  const drafts: StatusItem[] = []
  const attention: StatusItem[] = []
  const recent: StatusItem[] = []
  const summaries: CollectionSummary[] = []

  for (const { source, docs, englishIds } of results) {
    let published = 0
    for (const doc of docs) {
      const hasEnglish = englishIds.has(String(doc.id))
      const href = `/cms/collections/${source.collection}/${doc.id}`
      const base: StatusItem = {
        key: `${source.collection}-${doc.id}`,
        collection: source.collection,
        type: source.type,
        tone: source.tone,
        title: (doc[source.titleField] as string) || 'Tanpa judul',
        hasEnglish,
        href,
        updatedAt: doc.updatedAt ?? null,
      }

      if (doc._status === 'draft') {
        const checks = source.checks.map((check) => ({ label: check.label, done: check.done(doc, hasEnglish) }))
        const completeness = Math.round((checks.filter((check) => check.done).length / checks.length) * 100)
        drafts.push({ ...base, checks, completeness })
        continue
      }

      published += 1
      const validUntil = typeof doc.validUntil === 'string' ? Date.parse(doc.validUntil) : NaN
      const image = source.image(doc)
      const imageCheck = source.checks.find((check) => check.label === source.imageCheck)
      if (source.collection === 'offers' && validUntil < now) {
        attention.push({
          ...base,
          issue: {
            label: 'Kedaluwarsa',
            message: 'Tanggal berlaku sudah lewat, tetapi promo masih tampil di website. Perbarui tanggal atau tarik dari website.',
            action: 'Perbarui tanggal',
            href,
          },
        })
      } else if (imageCheck && !imageCheck.done(doc, hasEnglish)) {
        attention.push({
          ...base,
          issue: {
            label: 'Foto kosong',
            message: `${imageCheck.label} belum dipilih dari Pustaka Media.`,
            action: 'Pilih foto',
            href,
          },
        })
      } else if (!hasEnglish) {
        attention.push({
          ...base,
          issue: {
            label: 'EN belum ada',
            message: 'Isi versi English masih kosong.',
            action: 'Lengkapi terjemahan',
            href: `${href}?locale=en`,
          },
        })
      }

      const updated = doc.updatedAt ? Date.parse(doc.updatedAt) : 0
      if (now - updated < RECENT_DAYS * 24 * 60 * 60 * 1000) recent.push({ ...base, image })
    }

    summaries.push({
      collection: source.collection,
      label: source.label,
      type: source.type,
      tone: source.tone,
      countLabel: `${docs.length} ${source.unit}`,
      total: docs.length,
      published,
      href: `/cms/collections/${source.collection}`,
    })
  }

  const byNewest = (a: StatusItem, b: StatusItem) => Date.parse(b.updatedAt ?? '0') - Date.parse(a.updatedAt ?? '0')
  const media = await payload.count({ collection: 'media', overrideAccess: true }).catch(() => ({ totalDocs: 0 }))

  return {
    drafts: drafts.sort(byNewest),
    attention: attention.sort(byNewest),
    recent: recent.sort(byNewest).slice(0, 6),
    summaries,
    mediaCount: media.totalDocs,
  }
})
