import type { GlobalConfig } from 'payload'
import { canManageContent } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Pengaturan Situs',
  admin: {
    group: 'Settings',
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
        { name: 'instagramUrl', type: 'text', label: 'URL Instagram' },
        { name: 'facebookUrl', type: 'text', label: 'URL Facebook' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Default SEO & Social Share',
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
        { name: 'defaultSeoTitle', type: 'text', localized: true, label: 'Default SEO Title' },
        { name: 'defaultSeoDescription', type: 'textarea', localized: true, label: 'Default Meta Description' },
        { name: 'defaultSeoImage', type: 'upload', relationTo: 'media', label: 'Default Open Graph Image' },
      ],
    },
  ],
}
