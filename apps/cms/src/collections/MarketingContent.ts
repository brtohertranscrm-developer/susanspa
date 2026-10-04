import type { CollectionConfig, Field } from 'payload'
import { canManageContent, publicPublishedOrEditor } from '../access'
import { slugField, sortOrderField } from '../lib/fields'
import { previewUrl } from '../lib/publicLinks'

type ContentCollectionArgs = {
  slug: string
  singular: string
  plural: string
  description: string
  titleLabel?: string
  defaultColumns: string[]
  main?: Field[]
  side?: Field[]
}

const priceField = (label: string): Field => ({
  name: 'priceLabel',
  label,
  type: 'number',
  min: 0,
  admin: {
    description: 'Harga untuk tampilan, ditulis angka saja tanpa titik. Harga final saat booking dihitung booking engine.',
  },
})

const contentCollection = ({
  slug,
  singular,
  plural,
  description,
  titleLabel = 'Judul',
  defaultColumns,
  main = [],
  side = [],
}: ContentCollectionArgs): CollectionConfig => ({
  slug,
  labels: { singular, plural },
  admin: {
    group: 'Kamar & Layanan',
    useAsTitle: 'title',
    description,
    defaultColumns,
    listSearchableFields: ['title', 'slug'],
    pagination: { defaultLimit: 25, limits: [10, 25, 50, 100] },
    preview: previewUrl(slug),
  },
  defaultSort: 'sortOrder',
  access: {
    create: canManageContent,
    read: publicPublishedOrEditor,
    update: canManageContent,
    delete: canManageContent,
  },
  versions: { drafts: true, maxPerDoc: 25 },
  fields: [
    { name: 'title', label: titleLabel, type: 'text', required: true, localized: true },
    {
      name: 'summary',
      label: 'Ringkasan',
      type: 'textarea',
      localized: true,
      admin: { description: '1 sampai 2 kalimat untuk kartu dan daftar.' },
    },
    { name: 'description', label: 'Deskripsi lengkap', type: 'textarea', localized: true, admin: { rows: 8 } },
    { name: 'featuredImage', label: 'Foto utama', type: 'upload', relationTo: 'media' },
    ...main,
    ...side,
    slugField('title'),
    sortOrderField(),
  ],
})

export const SpaTreatments = contentCollection({
  slug: 'spa-treatments',
  singular: 'Perawatan Spa',
  plural: 'Perawatan Spa',
  description: 'Daftar perawatan di halaman Spa, lengkap dengan durasi dan harga tampilan.',
  titleLabel: 'Nama perawatan',
  defaultColumns: ['title', 'durationMinutes', 'priceLabel', '_status', 'updatedAt'],
  main: [
    {
      type: 'row',
      fields: [
        { name: 'durationMinutes', label: 'Durasi (menit)', type: 'number', min: 1 },
        priceField('Harga (Rp)'),
      ],
    },
    {
      name: 'benefits',
      label: 'Manfaat',
      labels: { singular: 'Manfaat', plural: 'Manfaat' },
      type: 'array',
      fields: [{ name: 'label', label: 'Manfaat', type: 'text', localized: true }],
    },
  ],
})

export const WeddingPackages = contentCollection({
  slug: 'wedding-packages',
  singular: 'Paket Wedding',
  plural: 'Paket Wedding',
  description: 'Paket pernikahan di La Kana Chapel dan area resort lainnya.',
  titleLabel: 'Nama paket',
  defaultColumns: ['title', 'capacity', 'priceLabel', '_status', 'updatedAt'],
  main: [
    {
      type: 'row',
      fields: [
        { name: 'capacity', label: 'Kapasitas (tamu)', type: 'number', min: 1 },
        { name: 'venue', label: 'Lokasi acara', type: 'text', localized: true },
        priceField('Harga mulai dari (Rp)'),
      ],
    },
    {
      name: 'inclusions',
      label: 'Termasuk dalam paket',
      labels: { singular: 'Item', plural: 'Item' },
      type: 'array',
      fields: [{ name: 'label', label: 'Item', type: 'text', localized: true }],
    },
  ],
})

export const Offers = contentCollection({
  slug: 'offers',
  singular: 'Promo',
  plural: 'Promo',
  description: 'Penawaran khusus. Promo yang lewat masa berlaku tetapi masih diterbitkan muncul di halaman Ringkasan.',
  titleLabel: 'Nama promo',
  defaultColumns: ['title', 'validUntil', '_status', 'updatedAt'],
  main: [
    {
      type: 'row',
      fields: [
        {
          name: 'validFrom',
          label: 'Berlaku mulai',
          type: 'date',
          admin: { date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' } },
        },
        {
          name: 'validUntil',
          label: 'Berlaku sampai',
          type: 'date',
          admin: { date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' } },
        },
      ],
    },
    { name: 'terms', label: 'Syarat & ketentuan', type: 'textarea', localized: true, admin: { rows: 6 } },
  ],
})

export const ResortContent = contentCollection({
  slug: 'resort-content',
  singular: 'Info Resort',
  plural: 'Info Resort',
  description: 'Fasilitas, restoran, pengalaman, dan destinasi sekitar. Pilih jenisnya di kolom samping.',
  defaultColumns: ['title', 'kind', '_status', 'updatedAt'],
  main: [
    {
      name: 'location',
      label: 'Lokasi di resort',
      type: 'text',
      localized: true,
      admin: { condition: (data) => data?.kind !== 'nearby' },
    },
    {
      name: 'distanceLabel',
      label: 'Jarak dari resort',
      type: 'text',
      localized: true,
      admin: { condition: (data) => data?.kind === 'nearby' },
    },
  ],
  side: [
    {
      name: 'kind',
      label: 'Jenis',
      type: 'select',
      required: true,
      index: true,
      options: [
        { label: 'Fasilitas', value: 'facility' },
        { label: 'Restoran & kafe', value: 'dining' },
        { label: 'Pengalaman', value: 'experience' },
        { label: 'Destinasi sekitar', value: 'nearby' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
})
