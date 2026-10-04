import path from 'path'
import { fileURLToPath } from 'url'
import { APIError, type CollectionConfig } from 'payload'
import { canManageContent } from '../access'
import ImageKit from '@imagekit/nodejs'

let imagekitClient: ImageKit | undefined

// Dibuat saat upload/hapus pertama, bukan saat modul dimuat, agar CMS tetap bisa jalan lokal tanpa kunci.
function getImageKit(): ImageKit {
  if (imagekitClient) return imagekitClient

  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
  const baseURL = process.env.IMAGEKIT_URL_ENDPOINT
  const missing = [
    !privateKey && 'IMAGEKIT_PRIVATE_KEY',
    !baseURL && 'IMAGEKIT_URL_ENDPOINT',
  ].filter(Boolean)

  if (!privateKey || !baseURL) {
    throw new APIError(
      `Upload media belum bisa dipakai: ${missing.join(' dan ')} belum diisi di environment CMS. Lihat apps/cms/.env.example.`,
      503,
    )
  }

  imagekitClient = new ImageKit({ privateKey, baseURL })
  return imagekitClient
}

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Content',
  },
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
          const response = await getImageKit().files.upload({
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
            await getImageKit().files.delete(doc.imagekitFileId);
          } catch (e) {
            console.error('Failed to delete imagekit file', e);
          }
        }
      },
    ],
  },
}
