import type { CollectionConfig } from 'payload'
import { canManageContent, publicPublishedOrEditor } from '../access'
import { slugField, sortOrderField } from '../lib/fields'
import { previewUrl } from '../lib/publicLinks'

const access = {
  create: canManageContent,
  read: publicPublishedOrEditor,
  update: canManageContent,
  delete: canManageContent,
}

const pagination = { defaultLimit: 25, limits: [10, 25, 50, 100] }

export const JournalArticles: CollectionConfig = {
  slug: 'journal-articles',
  labels: { singular: 'Artikel Jurnal', plural: 'Artikel Jurnal' },
  admin: {
    group: 'Cerita & Galeri',
    useAsTitle: 'title',
    description: 'Cerita dan panduan di halaman Journal.',
    defaultColumns: ['title', 'category', 'publishedAt', '_status', 'updatedAt'],
    listSearchableFields: ['title', 'slug'],
    pagination,
    preview: previewUrl('journal-articles'),
  },
  defaultSort: '-publishedAt',
  access,
  versions: { drafts: { autosave: true }, maxPerDoc: 50 },
  fields: [
    { name: 'title', label: 'Judul', type: 'text', required: true, localized: true },
    {
      name: 'excerpt',
      label: 'Kutipan pembuka',
      type: 'textarea',
      localized: true,
      admin: { description: '1 sampai 2 kalimat untuk kartu artikel.' },
    },
    {
      name: 'coverImage',
      label: 'Foto sampul',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    { name: 'content', label: 'Isi artikel', type: 'richText', required: true, localized: true },
    {
      type: 'collapsible',
      label: 'SEO (opsional)',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'seoTitle',
          label: 'Judul untuk mesin pencari',
          type: 'text',
          localized: true,
          maxLength: 70,
          admin: { description: 'Maksimal 70 karakter.' },
        },
        {
          name: 'seoDescription',
          label: 'Deskripsi untuk mesin pencari',
          type: 'textarea',
          localized: true,
          maxLength: 170,
          admin: { description: 'Maksimal 170 karakter.' },
        },
      ],
    },
    slugField('title'),
    { name: 'category', label: 'Kategori', type: 'text', localized: true, admin: { position: 'sidebar' } },
    {
      name: 'publishedAt',
      label: 'Tanggal terbit',
      type: 'date',
      index: true,
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' } },
    },
  ],
}

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Testimoni', plural: 'Testimoni' },
  admin: {
    group: 'Cerita & Galeri',
    useAsTitle: 'guestName',
    description: 'Hanya masukkan ulasan tamu yang nyata dan sudah diizinkan untuk dipublikasikan.',
    defaultColumns: ['guestName', 'rating', 'stayCategory', '_status', 'updatedAt'],
    listSearchableFields: ['guestName', 'quote'],
    pagination,
  },
  defaultSort: '-updatedAt',
  access,
  versions: { drafts: true },
  fields: [
    { name: 'guestName', label: 'Nama tamu', type: 'text', required: true },
    { name: 'quote', label: 'Kutipan ulasan', type: 'textarea', required: true, localized: true, admin: { rows: 5 } },
    {
      type: 'row',
      fields: [
        { name: 'rating', label: 'Rating (1 sampai 5)', type: 'number', min: 1, max: 5, defaultValue: 5 },
        { name: 'stayCategory', label: 'Jenis kunjungan', type: 'text', localized: true },
      ],
    },
    {
      name: 'avatar',
      label: 'Foto tamu (opsional)',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Pakai foto hanya jika tamu mengizinkan.' },
    },
  ],
}

export const GalleryItems: CollectionConfig = {
  slug: 'gallery-items',
  labels: { singular: 'Foto Galeri', plural: 'Foto Galeri' },
  admin: {
    group: 'Cerita & Galeri',
    useAsTitle: 'title',
    description: 'Foto yang tampil di halaman Gallery. Pilih kategori agar pengunjung bisa menyaringnya.',
    defaultColumns: ['image', 'title', 'category', 'sortOrder', '_status'],
    listSearchableFields: ['title'],
    pagination,
    preview: previewUrl('gallery-items'),
  },
  defaultSort: 'sortOrder',
  access,
  versions: { drafts: true },
  fields: [
    { name: 'title', label: 'Judul foto', type: 'text', required: true, localized: true },
    { name: 'image', label: 'Foto', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'category',
      label: 'Kategori',
      type: 'select',
      required: true,
      options: [
        { label: 'Kamar', value: 'Rooms' },
        { label: 'Spa', value: 'Spa' },
        { label: 'Wedding', value: 'Weddings' },
        { label: 'La Kana Chapel', value: 'La Kana Chapel' },
        { label: 'Restoran & kafe', value: 'Dining' },
        { label: 'Taman & area resort', value: 'Grounds' },
      ],
      admin: { position: 'sidebar' },
    },
    sortOrderField(false),
  ],
}
