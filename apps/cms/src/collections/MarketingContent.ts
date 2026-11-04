import type { ArrayField, CollectionConfig, Field } from 'payload'
import { FACILITY_CATEGORIES } from '@susan/contracts/content'
import { canManageContent, publicPublishedOrEditor } from '../access'

const buildContentCollection = (
  slug: string,
  singularLabel: string,
  pluralLabel: string,
  detailFields: Field[] = [],
): CollectionConfig => ({
  slug,
  labels: { singular: singularLabel, plural: pluralLabel },
  admin: {
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

const listOf = (name: string, label: string, itemLabel: string, description?: string): ArrayField => ({
  name,
  type: 'array',
  label,
  fields: [{ name: 'label', type: 'text', localized: true, label: itemLabel }],
  admin: { description },
})

export const SpaTreatments = buildContentCollection('spa-treatments', 'Perawatan Spa', 'Perawatan Spa', [
  { name: 'categoryLabel', type: 'text', localized: true, defaultValue: 'Spa', label: 'Label kategori di kartu' },
  { name: 'durationMinutes', type: 'number', min: 1, label: 'Durasi (Menit)' },
  { name: 'priceLabel', type: 'number', min: 0, label: 'Harga (Rp)' },
  {
    name: 'benefits',
    type: 'array',
    label: 'Manfaat perawatan',
    fields: [{ name: 'label', type: 'text', localized: true, label: 'Manfaat' }],
  },
])

export const WeddingPackages = buildContentCollection('wedding-packages', 'Paket Wedding', 'Paket Wedding', [
  { name: 'capacity', type: 'number', min: 1, label: 'Kapasitas Tamu' },
  { name: 'venue', type: 'text', localized: true, label: 'Lokasi / Venue' },
  { name: 'priceLabel', type: 'number', min: 0, label: 'Mulai Dari (Rp)' },
  {
    name: 'inclusions',
    type: 'array',
    label: 'Isi paket',
    fields: [{ name: 'label', type: 'text', localized: true, label: 'Fasilitas / Inklusi' }],
  },
  { name: 'category', type: 'text', localized: true, label: 'Kategori paket' },
  listOf('schedule', 'Jadwal & sesi acara', 'Sesi'),
  {
    name: 'gallery',
    type: 'array',
    label: 'Foto tambahan',
    admin: { description: 'Tampil di halaman detail paket setelah foto utama.' },
    fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Foto' }],
  },
])

export const Offers = buildContentCollection('offers', 'Promo', 'Promo', [
  { name: 'validFrom', type: 'date', label: 'Berlaku Mulai' },
  { name: 'validUntil', type: 'date', label: 'Berlaku Hingga' },
  { name: 'terms', type: 'textarea', localized: true, label: 'Syarat & Ketentuan' },
  { name: 'badge', type: 'text', localized: true, defaultValue: 'Special Offer', label: 'Label di pojok foto' },
  { name: 'validityLabel', type: 'text', localized: true, label: 'Keterangan masa berlaku', admin: { description: 'Contoh: Berlaku hingga 31 Desember 2026. Kosongkan untuk memakai tanggal Berlaku Hingga.' } },
  listOf('inclusions', 'Isi paket', 'Inklusi'),
])

export const ResortContent = buildContentCollection('resort-content', 'Info Resort', 'Info Resort', [
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
  {
    name: 'facilityCategory',
    type: 'select',
    label: 'Kelompok fasilitas',
    defaultValue: 'Wellness',
    options: FACILITY_CATEGORIES.map((option) => ({ ...option })),
    admin: { condition: (data) => data?.kind === 'facility', description: 'Menentukan kelompok di halaman Fasilitas.' },
  },
  {
    name: 'categoryLabel',
    type: 'text',
    localized: true,
    label: 'Label kategori',
    admin: { condition: (data) => data?.kind === 'experience' || data?.kind === 'nearby', description: 'Contoh: Wisata Alam & Bunga.' },
  },
  { name: 'location', type: 'text', localized: true, label: 'Lokasi / jenis masakan' },
  {
    name: 'operatingHours',
    type: 'text',
    localized: true,
    label: 'Jam buka',
    admin: { condition: (data) => data?.kind === 'facility' || data?.kind === 'dining' },
  },
  {
    name: 'duration',
    type: 'text',
    localized: true,
    label: 'Durasi',
    admin: { condition: (data) => data?.kind === 'experience', description: 'Contoh: 2 Jam.' },
  },
  {
    name: 'distanceLabel',
    type: 'text',
    localized: true,
    label: 'Estimasi Jarak / Waktu Tempuh',
    admin: { condition: (data) => data?.kind === 'nearby' },
  },
  {
    name: 'address',
    type: 'textarea',
    localized: true,
    label: 'Alamat',
    admin: { condition: (data) => data?.kind === 'nearby' },
  },
  {
    name: 'mapUrl',
    type: 'text',
    label: 'Tautan Google Maps',
    admin: { condition: (data) => data?.kind === 'nearby' },
  },
  {
    name: 'tips',
    type: 'textarea',
    localized: true,
    label: 'Tips kunjungan',
    admin: { condition: (data) => data?.kind === 'nearby' },
  },
  listOf('highlights', 'Keunggulan / menu pilihan', 'Poin', 'Untuk restoran, isi dengan menu pilihan.'),
])
