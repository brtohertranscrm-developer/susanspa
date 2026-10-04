import type { GlobalConfig } from 'payload'
import { canManageContent } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: canManageContent,
  },
  versions: { drafts: true, max: 25 },
  fields: [
    { name: 'resortName', type: 'text', required: true, defaultValue: 'Susan Spa & Resort' },
    { name: 'address', type: 'textarea', localized: true },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text' },
        { name: 'whatsapp', type: 'text' },
        { name: 'email', type: 'email' },
      ],
    },
    { name: 'instagramUrl', type: 'text' },
    { name: 'facebookUrl', type: 'text' },
    { name: 'defaultSeoTitle', type: 'text', localized: true },
    { name: 'defaultSeoDescription', type: 'textarea', localized: true },
    { name: 'defaultSeoImage', type: 'upload', relationTo: 'media' },
  ],
}
