import type { CollectionConfig } from 'payload'
import { canManageContent } from '../access'
import ImageKit from '@imagekit/nodejs'

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || 'private_vDs2nvuiIqJC4Q9yvhBcvUfSggw=',
  baseURL: process.env.IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/ro8484nadw/',
})

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Pustaka Media',
    plural: 'Pustaka Media',
  },
  admin: {
    group: 'Media',
    defaultColumns: ['filename', 'alt', 'createdAt'],
  },
  access: {
    create: canManageContent,
    read: () => true,
    update: canManageContent,
    delete: canManageContent,
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Informasi Foto & Aksesibilitas',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'alt',
          type: 'text',
          required: true,
          localized: true,
          label: 'Teks Alt (Aksesibilitas / SEO)',
          admin: { description: 'Deskripsikan isi foto untuk pengguna disabilitas dan mesin pencari.' },
        },
        {
          name: 'caption',
          type: 'textarea',
          localized: true,
          label: 'Keterangan Foto (Caption)',
          admin: { description: 'Keterangan opsional yang muncul di bawah foto.' },
        },
      ],
    },
    { name: 'url', type: 'text', admin: { hidden: true } },
    { name: 'imagekitFileId', type: 'text', admin: { hidden: true } },
  ],
  upload: {
    disableLocalStorage: true,
    mimeTypes: ['image/*'],
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (req.file && req.file.data) {
          const response = await imagekit.files.upload({
            file: req.file.data.toString('base64'),
            fileName: req.file.name,
            folder: '/SUSAN SPA',
          })
          data.url = response.url
          data.imagekitFileId = response.fileId
          data.filename = req.file.name
          data.filesize = req.file.size
          data.mimeType = req.file.mimetype
        }
        return data
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        if (doc.imagekitFileId) {
          try {
            await imagekit.files.delete(doc.imagekitFileId)
          } catch (e) {
            console.error('Failed to delete imagekit file', e)
          }
        }
      },
    ],
  },
}
