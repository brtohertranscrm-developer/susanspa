import type { GlobalConfig } from 'payload'
import { canManageContent } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Pengaturan Situs',
  admin: {
  },
  access: {
    read: () => true,
    update: canManageContent,
  },
  versions: { drafts: true, max: 25 },
  fields: [
    {
      type: 'collapsible',
      label: 'Informasi Utama Resor',
      admin: { initCollapsed: false },
      fields: [
        { name: 'resortName', type: 'text', required: true, defaultValue: 'Susan Spa & Resort', label: 'Nama Resor' },
        { name: 'address', type: 'textarea', localized: true, label: 'Alamat Lengkap Resor' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Kontak & Media Sosial',
      admin: { initCollapsed: false },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'phone', type: 'text', label: 'Nomor Telepon' },
            { name: 'whatsapp', type: 'text', label: 'Nomor WhatsApp' },
            { name: 'email', type: 'email', label: 'Email Resmi' },
          ],
        },
        {
          name: 'reservationEmail',
          type: 'email',
          label: 'Email Reservasi',
          admin: { description: 'Alamat tujuan permintaan reservasi dari website.' },
        },
        { name: 'instagramUrl', type: 'text', label: 'URL Instagram' },
        { name: 'facebookUrl', type: 'text', label: 'URL Facebook' },
        { name: 'tiktokUrl', type: 'text', label: 'URL TikTok' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Peta lokasi',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'googleMapsUrl',
          type: 'text',
          label: 'Tautan Google Maps',
          admin: { description: 'Dibuka oleh tombol petunjuk arah. Salin dari tombol Bagikan di Google Maps.' },
        },
        {
          name: 'mapEmbedUrl',
          type: 'text',
          label: 'Alamat peta sematan',
          admin: {
            description:
              'Di Google Maps pilih Bagikan, Sematkan peta, lalu salin hanya isi src="..." yang diawali https://www.google.com/maps/embed.',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'SEO & tampilan saat dibagikan',
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
        { name: 'defaultSeoTitle', type: 'text', localized: true, label: 'Judul SEO bawaan' },
        { name: 'defaultSeoDescription', type: 'textarea', localized: true, label: 'Deskripsi SEO bawaan' },
        { name: 'defaultSeoImage', type: 'upload', relationTo: 'media', label: 'Gambar saat dibagikan' },
      ],
    },
  ],
}
