import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'
import { canManageContent } from '../access'
import ImageKit from '@imagekit/nodejs'

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || 'private_vDs2nvuiIqJC4Q9yvhBcvUfSggw=',
  baseURL: process.env.IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/ro8484nadw/'
})

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content' },
  access: {
    create: canManageContent,
    read: () => true,
    update: canManageContent,
    delete: canManageContent,
  },
  fields: [
    { name: 'alt', type: 'text', required: true, localized: true },
    { name: 'caption', type: 'textarea', localized: true },
    { name: 'url', type: 'text', admin: { hidden: true } },
    { name: 'imagekitFileId', type: 'text', admin: { hidden: true } },
  ],
  upload: {
    disableLocalStorage: true,
    mimeTypes: ['image/*'],
  },
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (req.file && req.file.data) {
          const response = await imagekit.files.upload({
            file: req.file.data.toString('base64'),
            fileName: req.file.name,
            folder: '/SUSAN SPA',
          });
          data.url = response.url;
          data.imagekitFileId = response.fileId;
          // Set payload expected fields
          data.filename = req.file.name;
          data.filesize = req.file.size;
          data.mimeType = req.file.mimetype;
        }
        return data;
      },
    ],
    afterDelete: [
      async ({ req, doc }) => {
        if (doc.imagekitFileId) {
          try {
            await imagekit.files.delete(doc.imagekitFileId);
          } catch (e) {
            console.error('Failed to delete imagekit file', e);
          }
        }
      },
    ],
  },
}
