import type { CollectionSlug } from 'payload'

export type ContentArea = {
  slug: CollectionSlug
  /** Field yang dipakai sebagai judul di daftar. */
  titleField: string
  /** Field berlokalisasi yang dicek untuk terjemahan Inggris. */
  translatedField: string
}

export const CONTENT_AREAS: ContentArea[] = [
  { slug: 'rooms', titleField: 'name', translatedField: 'name' },
  { slug: 'spa-treatments', titleField: 'title', translatedField: 'title' },
  { slug: 'wedding-packages', titleField: 'title', translatedField: 'title' },
  { slug: 'offers', titleField: 'title', translatedField: 'title' },
  { slug: 'resort-content', titleField: 'title', translatedField: 'title' },
  { slug: 'journal-articles', titleField: 'title', translatedField: 'title' },
  { slug: 'testimonials', titleField: 'guestName', translatedField: 'quote' },
  { slug: 'gallery-items', titleField: 'title', translatedField: 'title' },
]
