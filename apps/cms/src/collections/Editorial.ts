import type { CollectionConfig } from 'payload'
import { canManageContent, publicPublishedOrEditor } from '../access'

export const JournalArticles: CollectionConfig = {
  slug: 'journal-articles',
  labels: {
    singular: 'Jurnal',
    plural: 'Jurnal',
  },
  admin: {
    group: 'Website',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
  },
  access: {
    create: canManageContent,
    read: publicPublishedOrEditor,
    update: canManageContent,
    delete: canManageContent,
  },
  versions: { drafts: { autosave: true }, maxPerDoc: 50 },
  fields: [
    // 1. BASIC
    {
      type: 'collapsible',
      label: 'Konten Artikel (Basic)',
      admin: { initCollapsed: false },
      fields: [
        { name: 'title', type: 'text', required: true, localized: true, label: 'Judul Artikel' },
        { name: 'excerpt', type: 'textarea', localized: true, label: 'Ringkasan / Cuplikan' },
        { name: 'content', type: 'richText', required: true, localized: true, label: 'Isi Artikel' },
      ],
    },

    // 2. MEDIA
    {
      type: 'collapsible',
      label: 'Foto Sampul (Cover Image)',
      admin: { initCollapsed: false },
      fields: [
        { name: 'coverImage', type: 'upload', relationTo: 'media', required: true, label: 'Foto Sampul' },
      ],
    },

    // 3. SEO & PUBLISHING
    {
      type: 'collapsible',
      label: 'Optimasi SEO & Publikasi (SEO)',
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'ui',
          name: 'seoPreviewField',
          admin: {
            components: {
              Field: '@/components/seo/SeoPreview#SeoPreview',
            },
          },
        },
        { name: 'publishedAt', type: 'date', index: true, label: 'Tanggal Publikasi' },
        { name: 'seoTitle', type: 'text', localized: true, maxLength: 70, label: 'SEO Title (Target 50-60 karakter)' },
        { name: 'seoDescription', type: 'textarea', localized: true, maxLength: 170, label: 'Meta Description (Target 140-160 karakter)' },
      ],
    },

    // 4. ADVANCED
    {
      type: 'collapsible',
      label: 'Pengaturan Teknis (Advanced)',
      admin: { initCollapsed: true },
      fields: [
        { name: 'slug', type: 'text', required: true, unique: true, index: true, label: 'URL Slug' },
        { name: 'category', type: 'text', localized: true, label: 'Kategori Artikel' },
      ],
    },
  ],
}

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimoni',
    plural: 'Testimoni',
  },
  admin: {
    group: 'Marketing',
    useAsTitle: 'guestName',
    defaultColumns: ['guestName', 'stayCategory', 'rating', '_status'],
  },
  access: {
    create: canManageContent,
    read: publicPublishedOrEditor,
    update: canManageContent,
    delete: canManageContent,
  },
  versions: { drafts: true },
  fields: [
    {
      type: 'collapsible',
      label: 'Informasi Tamu & Ulasan',
      admin: { initCollapsed: false },
      fields: [
        { name: 'guestName', type: 'text', required: true, label: 'Nama Tamu' },
        { name: 'quote', type: 'textarea', required: true, localized: true, label: 'Kutipan Ulasan / Testimoni' },
        { name: 'rating', type: 'number', min: 1, max: 5, defaultValue: 5, label: 'Rating (1 - 5 Bintang)' },
        { name: 'stayCategory', type: 'text', localized: true, label: 'Kategori Kunjungan (misal: Family Vacation, Honeymoon)' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Foto Profil Tamu (Avatar)',
      admin: { initCollapsed: false },
      fields: [
        { name: 'avatar', type: 'upload', relationTo: 'media', label: 'Foto Avatar Tamu' },
      ],
    },
  ],
}

export const GalleryItems: CollectionConfig = {
  slug: 'gallery-items',
  labels: {
    singular: 'Galeri',
    plural: 'Galeri',
  },
  admin: {
    group: 'Website',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'image', '_status'],
  },
  access: {
    create: canManageContent,
    read: publicPublishedOrEditor,
    update: canManageContent,
    delete: canManageContent,
  },
  versions: { drafts: true },
  fields: [
    {
      type: 'collapsible',
      label: 'Foto & Kategori',
      admin: { initCollapsed: false },
      fields: [
        { name: 'title', type: 'text', required: true, localized: true, label: 'Judul Foto' },
        {
          name: 'category',
          type: 'select',
          required: true,
          label: 'Kategori Galeri',
          options: ['Rooms', 'Spa', 'Weddings', 'La Kana Chapel', 'Dining', 'Grounds'],
        },
        { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'File Foto' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Pengaturan Teknis (Advanced)',
      admin: { initCollapsed: true },
      fields: [
        { name: 'sortOrder', type: 'number', defaultValue: 0, label: 'Urutan Tampilan' },
      ],
    },
  ],
}
