import type { GlobalConfig } from 'payload'
import { canManageContent } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Pengaturan Situs',
  admin: {
    group: 'Pengaturan',
    description: 'Identitas resort, kontak, dan pengaturan SEO bawaan.',
  },
  access: {
    read: () => true,
    update: canManageContent,
  },
  versions: { drafts: true, max: 25 },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Profil resort',
          fields: [
            {
              name: 'resortName',
              label: 'Nama resort',
              type: 'text',
              required: true,
              defaultValue: 'Susan Spa & Resort',
            },
            { name: 'address', label: 'Alamat', type: 'textarea', localized: true, admin: { rows: 3 } },
          ],
        },
        {
          label: 'Kontak & media sosial',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'phone', label: 'Telepon', type: 'text' },
                {
                  name: 'whatsapp',
                  label: 'WhatsApp',
                  type: 'text',
                  admin: { placeholder: '+62', description: 'Format internasional, diawali +62.' },
                },
                { name: 'email', label: 'Email', type: 'email' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'instagramUrl', label: 'Link Instagram', type: 'text', admin: { placeholder: 'https://' } },
                { name: 'facebookUrl', label: 'Link Facebook', type: 'text', admin: { placeholder: 'https://' } },
              ],
            },
          ],
        },
        {
          label: 'SEO bawaan',
          fields: [
            {
              name: 'defaultSeoTitle',
              label: 'Judul bawaan untuk mesin pencari',
              type: 'text',
              localized: true,
            },
            {
              name: 'defaultSeoDescription',
              label: 'Deskripsi bawaan untuk mesin pencari',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'defaultSeoImage',
              label: 'Gambar bawaan saat link dibagikan',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}
