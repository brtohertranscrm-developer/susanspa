import { RESERVED_PAGE_SLUGS } from '@susan/contracts/content'
import type { Block, CollectionConfig } from 'payload'
import { canManageContent, publicPublishedOrEditor } from '../access'
import { slugField } from '../lib/fields'
import { webUrl } from '../lib/publicLinks'

const link = (prefix: string, label: string) =>
  [
    { name: `${prefix}Label`, type: 'text', localized: true, label: `Teks ${label}` },
    {
      name: `${prefix}Url`,
      type: 'text',
      label: `Alamat ${label}`,
      admin: { description: 'Contoh: /rooms untuk halaman di website ini, atau alamat lengkap https://...' },
    },
  ] as const

const TextBlock: Block = {
  slug: 'text',
  labels: { singular: 'Teks', plural: 'Teks' },
  fields: [
    { name: 'heading', type: 'text', localized: true, label: 'Judul bagian' },
    { name: 'body', type: 'richText', localized: true, required: true, label: 'Isi' },
  ],
}

const ImageTextBlock: Block = {
  slug: 'imageText',
  labels: { singular: 'Foto & teks', plural: 'Foto & teks' },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Foto' },
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Letak foto',
      defaultValue: 'right',
      options: [
        { label: 'Kanan', value: 'right' },
        { label: 'Kiri', value: 'left' },
      ],
    },
    { name: 'eyebrow', type: 'text', localized: true, label: 'Label kecil' },
    { name: 'heading', type: 'text', localized: true, required: true, label: 'Judul' },
    { name: 'body', type: 'textarea', localized: true, label: 'Paragraf' },
    ...link('button', 'tombol'),
  ],
}

const GalleryBlock: Block = {
  slug: 'gallery',
  labels: { singular: 'Galeri foto', plural: 'Galeri foto' },
  fields: [
    { name: 'heading', type: 'text', localized: true, label: 'Judul bagian' },
    {
      name: 'images',
      type: 'array',
      label: 'Foto',
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Foto' },
        { name: 'caption', type: 'text', localized: true, label: 'Keterangan' },
      ],
    },
  ],
}

const CardsBlock: Block = {
  slug: 'cards',
  labels: { singular: 'Kartu', plural: 'Kartu' },
  fields: [
    { name: 'heading', type: 'text', localized: true, label: 'Judul bagian' },
    { name: 'intro', type: 'textarea', localized: true, label: 'Paragraf pembuka' },
    {
      name: 'cards',
      type: 'array',
      label: 'Kartu',
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Foto' },
        { name: 'title', type: 'text', localized: true, required: true, label: 'Judul' },
        { name: 'body', type: 'textarea', localized: true, label: 'Isi' },
        ...link('link', 'tautan'),
      ],
    },
  ],
}

const CallToActionBlock: Block = {
  slug: 'cta',
  labels: { singular: 'Ajakan', plural: 'Ajakan' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true, label: 'Label kecil' },
    { name: 'heading', type: 'text', localized: true, required: true, label: 'Judul' },
    { name: 'body', type: 'textarea', localized: true, label: 'Paragraf' },
    { name: 'buttonLabel', type: 'text', localized: true, required: true, label: 'Teks tombol' },
    {
      name: 'buttonAction',
      type: 'select',
      label: 'Tombol membuka',
      defaultValue: 'reserve',
      options: [
        { label: 'Jendela reservasi', value: 'reserve' },
        { label: 'Chat WhatsApp', value: 'whatsapp' },
        { label: 'Alamat lain', value: 'link' },
      ],
    },
    {
      name: 'buttonUrl',
      type: 'text',
      label: 'Alamat tombol',
      admin: { condition: (_data, sibling) => sibling?.buttonAction === 'link' },
    },
    {
      name: 'whatsappMessage',
      type: 'textarea',
      localized: true,
      label: 'Pesan WhatsApp',
      admin: { condition: (_data, sibling) => sibling?.buttonAction === 'whatsapp' },
    },
  ],
}

const reserved = new Set<string>(RESERVED_PAGE_SLUGS)

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Halaman Tambahan', plural: 'Halaman Tambahan' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description:
      'Buat halaman baru tanpa bantuan programmer, atau hapus halaman yang tidak dipakai. Setelah diterbitkan, tambahkan tautannya di Header, Menu & Footer agar pengunjung bisa menemukannya.',
    preview: (doc) => (doc?.slug ? `${webUrl}/${doc.slug}` : null),
  },
  access: {
    create: canManageContent,
    read: publicPublishedOrEditor,
    update: canManageContent,
    delete: canManageContent,
  },
  versions: { drafts: { autosave: true }, maxPerDoc: 25 },
  fields: [
    {
      type: 'collapsible',
      label: 'Konten',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true, label: 'Nama halaman' },
        {
          ...slugField('title'),
          validate: (value: unknown) => {
            if (typeof value !== 'string' || !value.trim()) return 'Alamat halaman wajib diisi.'
            if (reserved.has(value)) return `Alamat /${value} sudah dipakai halaman bawaan. Pilih alamat lain.`
            return true
          },
        },
        {
          name: 'sections',
          type: 'blocks',
          label: 'Isi halaman',
          labels: { singular: 'Bagian', plural: 'Bagian' },
          admin: { description: 'Susun bagian dari atas ke bawah. Seret untuk mengubah urutan.' },
          blocks: [TextBlock, ImageTextBlock, GalleryBlock, CardsBlock, CallToActionBlock],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Header halaman',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Foto header',
          admin: { description: 'Kosongkan untuk header polos berwarna hijau tua.' },
        },
        { name: 'heroEyebrow', type: 'text', localized: true, label: 'Label kecil di atas judul' },
        {
          name: 'heroTitle',
          type: 'text',
          localized: true,
          label: 'Judul besar',
          admin: { description: 'Kosongkan untuk memakai nama halaman.' },
        },
        { name: 'heroSubtitle', type: 'textarea', localized: true, label: 'Subjudul' },
      ],
    },
    {
      type: 'collapsible',
      label: 'SEO halaman',
      admin: { initCollapsed: true },
      fields: [
        { name: 'seoTitle', type: 'text', localized: true, maxLength: 70, label: 'Judul di tab browser dan Google' },
        {
          name: 'seoDescription',
          type: 'textarea',
          localized: true,
          maxLength: 170,
          label: 'Deskripsi di hasil pencarian',
        },
      ],
    },
  ],
}
