import type { CollectionConfig, Field } from 'payload'
import { canManageContent, publicPublishedOrEditor } from '../access'

const buildContentCollection = (
  slug: string,
  singularLabel: string,
  pluralLabel: string,
  group: 'Konten website' | 'Promosi',
  detailFields: Field[] = [],
): CollectionConfig => ({
  slug,
  labels: { singular: singularLabel, plural: pluralLabel },
  admin: {
    group,
    useAsTitle: 'title',
    defaultColumns: ['title', 'featuredImage', '_status'],
  },
  access: {
    create: canManageContent,
    read: publicPublishedOrEditor,
    update: canManageContent,
    delete: canManageContent,
  },
  versions: { drafts: true, maxPerDoc: 25 },
  fields: [
    // 1. BASIC INFORMATION
    {
      type: 'collapsible',
      label: 'Informasi dasar',
      admin: { initCollapsed: false },
      fields: [
        { name: 'title', type: 'text', required: true, localized: true, label: 'Judul' },
        { name: 'summary', type: 'textarea', localized: true, label: 'Ringkasan' },
        { name: 'description', type: 'textarea', localized: true, label: 'Deskripsi Lengkap' },
      ],
    },

    // 2. DETAILS (COLLECTION-SPECIFIC)
    ...(detailFields.length > 0
      ? [
          {
            type: 'collapsible' as const,
            label: 'Detail & spesifikasi',
            admin: { initCollapsed: false },
            fields: detailFields,
          },
        ]
      : []),

    // 3. MEDIA
    {
      type: 'collapsible',
      label: 'Foto utama',
      admin: { initCollapsed: false },
      fields: [
        { name: 'featuredImage', type: 'upload', relationTo: 'media', label: 'Foto Utama' },
      ],
    },

    // 4. ADVANCED
    {
      type: 'collapsible',
      label: 'Pengaturan teknis',
      admin: { initCollapsed: true },
      fields: [
        { name: 'slug', type: 'text', required: true, unique: true, index: true, label: 'URL Slug' },
        { name: 'sortOrder', type: 'number', defaultValue: 0, index: true, label: 'Urutan Tampilan' },
      ],
    },
  ],
})

export const SpaTreatments = buildContentCollection('spa-treatments', 'Perawatan Spa', 'Perawatan Spa', 'Konten website', [
  { name: 'durationMinutes', type: 'number', min: 1, label: 'Durasi (Menit)' },
  { name: 'priceLabel', type: 'number', min: 0, label: 'Harga (Rp)' },
  {
    name: 'benefits',
    type: 'array',
    label: 'Manfaat perawatan',
    fields: [{ name: 'label', type: 'text', localized: true, label: 'Manfaat' }],
  },
])

export const WeddingPackages = buildContentCollection('wedding-packages', 'Paket Wedding', 'Paket Wedding', 'Konten website', [
  { name: 'capacity', type: 'number', min: 1, label: 'Kapasitas Tamu' },
  { name: 'venue', type: 'text', localized: true, label: 'Lokasi / Venue' },
  { name: 'priceLabel', type: 'number', min: 0, label: 'Mulai Dari (Rp)' },
  {
    name: 'inclusions',
    type: 'array',
    label: 'Isi paket',
    fields: [{ name: 'label', type: 'text', localized: true, label: 'Fasilitas / Inklusi' }],
  },
])

export const Offers = buildContentCollection('offers', 'Promo', 'Promo', 'Promosi', [
  { name: 'validFrom', type: 'date', label: 'Berlaku Mulai' },
  { name: 'validUntil', type: 'date', label: 'Berlaku Hingga' },
  { name: 'terms', type: 'textarea', localized: true, label: 'Syarat & Ketentuan' },
])

export const ResortContent = buildContentCollection('resort-content', 'Info Resort', 'Info Resort', 'Konten website', [
  {
    name: 'kind',
    type: 'select',
    required: true,
    index: true,
    label: 'Kategori Fasilitas',
    options: [
      { label: 'Fasilitas', value: 'facility' },
      { label: 'Restoran & kafe', value: 'dining' },
      { label: 'Pengalaman', value: 'experience' },
      { label: 'Destinasi sekitar', value: 'nearby' },
    ],
  },
  { name: 'location', type: 'text', localized: true, label: 'Lokasi' },
  { name: 'distanceLabel', type: 'text', localized: true, label: 'Estimasi Jarak / Waktu Tempuh' },
])
