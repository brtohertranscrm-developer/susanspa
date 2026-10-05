import type { CollectionConfig, Field } from 'payload'
import { canManageContent, publicPublishedOrEditor } from '../access'

const buildContentCollection = (
  slug: string,
  singularLabel: string,
  pluralLabel: string,
  group: 'Website' | 'Marketing',
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
      label: 'Informasi Dasar (Basic)',
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
            label: 'Detail & Spesifikasi (Details)',
            admin: { initCollapsed: false },
            fields: detailFields,
          },
        ]
      : []),

    // 3. MEDIA
    {
      type: 'collapsible',
      label: 'Foto Utama (Featured Image)',
      admin: { initCollapsed: false },
      fields: [
        { name: 'featuredImage', type: 'upload', relationTo: 'media', label: 'Foto Utama' },
      ],
    },

    // 4. ADVANCED
    {
      type: 'collapsible',
      label: 'Pengaturan Teknis (Advanced)',
      admin: { initCollapsed: true },
      fields: [
        { name: 'slug', type: 'text', required: true, unique: true, index: true, label: 'URL Slug' },
        { name: 'sortOrder', type: 'number', defaultValue: 0, index: true, label: 'Urutan Tampilan' },
      ],
    },
  ],
})

export const SpaTreatments = buildContentCollection('spa-treatments', 'Spa Treatment', 'Spa Treatments', 'Website', [
  { name: 'durationMinutes', type: 'number', min: 1, label: 'Durasi (Menit)' },
  { name: 'priceLabel', type: 'number', min: 0, label: 'Harga (Rp)' },
  {
    name: 'benefits',
    type: 'array',
    label: 'Manfaat Treatment (Benefits)',
    fields: [{ name: 'label', type: 'text', localized: true, label: 'Manfaat' }],
  },
])

export const WeddingPackages = buildContentCollection('wedding-packages', 'Wedding Package', 'Wedding Packages', 'Website', [
  { name: 'capacity', type: 'number', min: 1, label: 'Kapasitas Tamu' },
  { name: 'venue', type: 'text', localized: true, label: 'Lokasi / Venue' },
  { name: 'priceLabel', type: 'number', min: 0, label: 'Mulai Dari (Rp)' },
  {
    name: 'inclusions',
    type: 'array',
    label: 'Inklusi Paket (Inclusions)',
    fields: [{ name: 'label', type: 'text', localized: true, label: 'Fasilitas / Inklusi' }],
  },
])

export const Offers = buildContentCollection('offers', 'Promo', 'Promo', 'Marketing', [
  { name: 'validFrom', type: 'date', label: 'Berlaku Mulai' },
  { name: 'validUntil', type: 'date', label: 'Berlaku Hingga' },
  { name: 'terms', type: 'textarea', localized: true, label: 'Syarat & Ketentuan' },
])

export const ResortContent = buildContentCollection('resort-content', 'Dining & Resort', 'Dining & Resort', 'Website', [
  {
    name: 'kind',
    type: 'select',
    required: true,
    index: true,
    label: 'Kategori Fasilitas',
    options: [
      { label: 'Facility', value: 'facility' },
      { label: 'Dining', value: 'dining' },
      { label: 'Experience', value: 'experience' },
      { label: 'Nearby Destination', value: 'nearby' },
    ],
  },
  { name: 'location', type: 'text', localized: true, label: 'Lokasi' },
  { name: 'distanceLabel', type: 'text', localized: true, label: 'Estimasi Jarak / Waktu Tempuh' },
])
