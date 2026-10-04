import ImageKit from '@imagekit/nodejs'
import { APIError, type CollectionConfig } from 'payload'
import { canManageContent } from '../access'

let imagekit: ImageKit | null = null

// Kunci hanya dibaca dari environment. Klien dibuat saat dibutuhkan agar CMS tetap bisa berjalan tanpa kunci.
const getImageKit = () => {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
  if (!privateKey) {
    throw new APIError('Unggah foto belum bisa dipakai karena IMAGEKIT_PRIVATE_KEY belum diatur di server.', 500, undefined, true)
  }
  imagekit ??= new ImageKit({ privateKey, baseURL: process.env.IMAGEKIT_URL_ENDPOINT || undefined })
  return imagekit
}

// Pustaka menampilkan versi 320 px dari ImageKit agar foto asli beresolusi tinggi tidak diunduh untuk setiap kotak.
const thumbnailUrl = ({ doc }: { doc: Record<string, unknown> }) => {
  const url = typeof doc.url === 'string' ? doc.url : null
  if (!url) return null
  return url.includes('ik.imagekit.io') ? `${url}${url.includes('?') ? '&' : '?'}tr=w-320` : url
}

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media', plural: 'Pustaka Media' },
  admin: {
    group: 'Media',
    description:
      'Unggah foto sekali, lalu pakai di kamar, spa, wedding, jurnal, dan galeri. Isi teks alternatif dengan deskripsi isi foto.',
    defaultColumns: ['filename', 'alt', 'mimeType', 'filesize', 'createdAt'],
    listSearchableFields: ['filename', 'alt'],
    pagination: { defaultLimit: 25, limits: [10, 25, 50, 100] },
  },
  access: {
    create: canManageContent,
    read: () => true,
    update: canManageContent,
    delete: canManageContent,
  },
  fields: [
    {
      name: 'alt',
      label: 'Teks alternatif',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description:
          'Jelaskan apa yang terlihat di foto, bukan kumpulan kata kunci. Dibaca oleh pembaca layar dan mesin pencari.',
      },
    },
    { name: 'caption', label: 'Keterangan (opsional)', type: 'textarea', localized: true },
    { name: 'url', type: 'text', admin: { hidden: true } },
    { name: 'imagekitFileId', type: 'text', admin: { hidden: true } },
  ],
  upload: {
    disableLocalStorage: true,
    mimeTypes: ['image/*'],
    adminThumbnail: thumbnailUrl,
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
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
      async ({ doc }) => {
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
