import type { BasePayload, CollectionSlug, TypedUser } from 'payload'

type Doc = Record<string, unknown> & { id: string | number; updatedAt?: string; _status?: string }

/** Jumlah kartu per halaman daftar, dipakai juga untuk pagination koleksi di payload.config.ts. */
export const CARDS_PER_PAGE = 10

export type CardStatus = 'published' | 'draft' | 'changed'

export interface ListCard {
  id: string | number
  title: string
  href: string
  image: string | null
  /** Inisial pengganti foto untuk tamu dan pengguna. */
  initials?: string
  meta: string[]
  status: CardStatus | null
  updatedAt: string | null
}

interface CardSpec {
  image?: (doc: Doc) => unknown
  initials?: boolean
  title?: (doc: Doc) => unknown
  meta: (doc: Doc) => unknown[]
}

const rupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })
const tanggal = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })

const price = (value: unknown, prefix = '') =>
  typeof value === 'number' && value > 0 ? `${prefix}${rupiah.format(value)}` : null
const date = (value: unknown) => (typeof value === 'string' && value ? tanggal.format(new Date(value)) : null)

const RESORT_KINDS: Record<string, string> = {
  facility: 'Fasilitas',
  dining: 'Restoran & kafe',
  experience: 'Pengalaman',
  nearby: 'Destinasi sekitar',
}

const ROLES: Record<string, string> = {
  'content-admin': 'Admin konten',
  'content-editor': 'Editor konten',
}

const fileSize = (bytes: unknown) => {
  if (typeof bytes !== 'number') return null
  return bytes >= 1_000_000 ? `${(bytes / 1_000_000).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1000))} KB`
}

const SPECS: Partial<Record<CollectionSlug, CardSpec>> = {
  pages: { image: (doc) => doc.heroImage, meta: (doc) => [doc.slug ? `/${doc.slug}` : null] },
  rooms: {
    image: (doc) => (doc.images as { image?: unknown }[] | undefined)?.[0]?.image,
    meta: (doc) => [doc.category, price(doc.startingPriceLabel, 'Mulai ')],
  },
  'spa-treatments': {
    image: (doc) => doc.featuredImage,
    meta: (doc) => [
      doc.categoryLabel,
      doc.durationMinutes ? `${doc.durationMinutes} menit` : null,
      price(doc.priceLabel),
    ],
  },
  'wedding-packages': {
    image: (doc) => doc.featuredImage,
    meta: (doc) => [doc.category, doc.capacity ? `${doc.capacity} tamu` : null, price(doc.priceLabel, 'Mulai ')],
  },
  'resort-content': {
    image: (doc) => doc.featuredImage,
    meta: (doc) => [RESORT_KINDS[String(doc.kind)], doc.categoryLabel],
  },
  offers: {
    image: (doc) => doc.featuredImage,
    meta: (doc) => {
      const until = date(doc.validUntil)
      const expired = typeof doc.validUntil === 'string' && Date.parse(doc.validUntil) < Date.now()
      return [doc.badge, until ? (expired ? `Berakhir ${until}` : `Berlaku s.d. ${until}`) : null]
    },
  },
  'journal-articles': {
    image: (doc) => doc.coverImage,
    meta: (doc) => [doc.category, date(doc.publishedAt)],
  },
  'gallery-items': { image: (doc) => doc.image, meta: (doc) => [doc.category] },
  testimonials: {
    image: (doc) => doc.avatar,
    initials: true,
    meta: (doc) => [doc.stayCategory, doc.rating ? `${'★'.repeat(Number(doc.rating))} ${doc.rating}/5` : null],
  },
  media: {
    image: (doc) => doc,
    title: (doc) => doc.alt || doc.filename,
    meta: (doc) => [
      String(doc.mimeType ?? '').startsWith('video/') ? 'Video' : 'Foto',
      doc.width && doc.height ? `${doc.width} × ${doc.height}` : null,
      fileSize(doc.filesize),
    ],
  },
  users: {
    initials: true,
    title: (doc) => doc.fullName || doc.email,
    meta: (doc) => [doc.email, ...((doc.roles as string[] | undefined) ?? []).map((role) => ROLES[role] ?? role)],
  },
}

const thumbnail = (value: unknown) => {
  if (!value || typeof value !== 'object') return null
  const media = value as { thumbnailURL?: unknown; url?: unknown }
  const url = media.thumbnailURL || media.url
  return typeof url === 'string' && url ? url : null
}

const initialsOf = (name: string) =>
  name
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

/**
 * Data kartu untuk dokumen di halaman daftar. Daftar bawaan Payload hanya memuat kolom tabel tanpa relasi,
 * jadi dokumen di halaman ini dimuat ulang sekali dengan foto terhubung agar sampulnya bisa ditampilkan.
 */
export async function buildListCards({
  payload,
  collection,
  docs,
  locale,
  user,
  adminRoute,
}: {
  payload: BasePayload
  collection: CollectionSlug
  docs: Doc[]
  locale?: string
  user: TypedUser | null
  adminRoute: string
}): Promise<ListCard[]> {
  if (docs.length === 0) return []
  const spec = SPECS[collection] ?? { meta: () => [] }
  const titleField = payload.collections[collection]?.config.admin.useAsTitle ?? 'id'
  const ids = docs.map((doc) => doc.id)

  const full = await payload
    .find({
      collection,
      where: { id: { in: ids } },
      depth: 1,
      draft: true,
      limit: ids.length,
      pagination: false,
      locale: locale as 'id' | 'en' | undefined,
      overrideAccess: false,
      user,
    })
    .catch(() => ({ docs: [] as Doc[] }))
  const byId = new Map((full.docs as Doc[]).map((doc) => [String(doc.id), doc]))

  return docs.map((listed) => {
    const doc = byId.get(String(listed.id)) ?? listed
    const title = String((spec.title ? spec.title(doc) : doc[titleField]) || 'Tanpa judul')
    // Payload sudah menandai draf yang punya versi tayang sebagai "changed" di data daftar.
    const status = (listed._displayStatus ?? listed._status ?? null) as CardStatus | null
    return {
      id: doc.id,
      title,
      href: `${adminRoute}/collections/${collection}/${doc.id}`,
      image: spec.image ? thumbnail(spec.image(doc)) : null,
      initials: spec.initials ? initialsOf(title) : undefined,
      meta: spec.meta(doc).filter((item): item is string => typeof item === 'string' && item.length > 0),
      status,
      updatedAt: doc.updatedAt ?? null,
    }
  })
}
