import { imageKitImageUrl } from '@susan/contracts'
import { APIError, type CollectionConfig } from 'payload'
import { canManageContent, isContentAdmin } from '../access'
import { getImageKit } from '../lib/imagekit'
import { queueMediaCleanup } from '../lib/mediaCleanup'

// Pustaka menampilkan versi 320 px dari ImageKit agar foto asli beresolusi tinggi tidak diunduh untuk setiap kotak.
const thumbnailUrl = ({ doc }: { doc: Record<string, unknown> }) => {
  const url = typeof doc.url === 'string' ? doc.url : null
  if (!url) return null
  if (String(doc.mimeType ?? '').startsWith('video/')) {
    try {
      const parsed = new URL(url)
      if (parsed.hostname !== 'ik.imagekit.io') return url
      parsed.pathname += '/ik-thumbnail.jpg'
      return parsed.toString()
    } catch {
      return url
    }
  }
  return imageKitImageUrl(url, {}, 320)
}

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Foto',
    plural: 'Pustaka Media',
  },
  admin: {
    // Judul diambil dari deskripsi foto, bukan nama file dari ImageKit yang panjang dan bernomor acak.
    useAsTitle: 'alt',
    description:
      'Unggah foto sekali, lalu pakai di kamar, spa, wedding, jurnal, galeri, dan halaman website. Video MP4 juga bisa diunggah untuk header beranda. Isi teks alternatif dengan deskripsi isi foto atau video.',
    defaultColumns: ['alt', 'filename', 'mimeType', 'filesize', 'createdAt'],
    listSearchableFields: ['filename', 'alt'],
  },
  access: {
    create: canManageContent,
    read: () => true,
    update: canManageContent,
    delete: canManageContent,
  },
  fields: [
    {
      name: 'seedSource',
      type: 'text',
      unique: true,
      admin: { hidden: true },
      access: { create: () => false, update: () => false, read: ({ req }) => isContentAdmin(req.user) },
    },
    {
      type: 'collapsible',
      label: 'Informasi foto',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'alt',
          type: 'text',
          required: true,
          localized: true,
          label: 'Deskripsi foto (teks alt)',
          admin: {
            description:
              'Jelaskan apa yang terlihat di foto, bukan kumpulan kata kunci. Dibaca oleh pembaca layar dan mesin pencari.',
          },
        },
        {
          name: 'caption',
          type: 'textarea',
          localized: true,
          label: 'Keterangan foto',
          admin: { description: 'Keterangan opsional yang muncul di bawah foto.' },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Pengaturan teknis ImageKit (khusus admin)',
      // Editor tidak perlu melihat URL dan ID teknis. Admin tetap bisa memeriksanya.
      admin: {
        initCollapsed: true,
        condition: (_data, _siblingData, { user }) => isContentAdmin(user),
      },
      fields: [
        { name: 'url', type: 'text', access: { create: () => false, update: () => false }, admin: { readOnly: true }, label: 'URL Publik' },
        { name: 'imagekitFileId', type: 'text', access: { create: () => false, update: () => false }, admin: { readOnly: true }, label: 'ImageKit File ID' },
      ],
    },
  ],
  upload: {
    disableLocalStorage: true,
    // Browser mengunduh URL tempel langsung dari ImageKit dan sering gagal, jadi hanya unggah berkas.
    pasteURL: false,
    // Video hanya dipakai untuk header beranda. ImageKit menyimpan dan mengirim video seperti foto.
    mimeTypes: ['image/*', 'video/mp4', 'video/webm'],
    adminThumbnail: thumbnailUrl,
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        if (typeof doc.url === 'string' && String(doc.mimeType ?? '').startsWith('image/')) {
          doc.url = imageKitImageUrl(doc.url, { width: Number(doc.width), height: Number(doc.height) })
        }
        doc.thumbnailURL = thumbnailUrl({ doc })
        return doc
      },
    ],
    beforeChange: [
      async ({ data, req }) => {
        if (req.file && req.file.data) {
          const client = getImageKit()
          let response
          try {
            response = await client.files.upload({
              file: req.file.data.toString('base64'),
              fileName: req.file.name,
              folder: '/susanspa',
              // Nama yang sama tidak boleh menimpa foto lama yang sudah dipakai di website.
              useUniqueFileName: true,
            })
          } catch (error) {
            req.payload.logger.error({ err: error, msg: 'Upload ke ImageKit gagal' })
            throw new APIError(
              'Foto gagal diunggah ke ImageKit. Coba lagi. Jika terus gagal, periksa kunci ImageKit di server.',
              502,
              undefined,
              true,
            )
          }
          if (!response.fileId || !response.url) {
            throw new APIError('ImageKit tidak mengembalikan ID dan URL berkas yang valid.', 502, undefined, true)
          }
          try {
            await queueMediaCleanup(req.payload, response.fileId)
          } catch (error) {
            try {
              await client.files.delete(response.fileId)
            } catch (cleanupError) {
              req.payload.logger.error({ err: cleanupError, fileId: response.fileId, msg: 'Upload batal; file ImageKit perlu dibersihkan secara manual' })
            }
            throw error
          }
          data.url = response.url
          data.imagekitFileId = response.fileId
          // Nama dari ImageKit sudah unik. Nama asli dari pengunggah bisa bentrok dengan foto lain di database.
          data.filename = response.name
          data.filesize = response.size
          data.width = response.width
          data.height = response.height
          data.mimeType = req.file.mimetype
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, req }) => {
        if (previousDoc?.imagekitFileId && previousDoc.imagekitFileId !== doc.imagekitFileId) {
          await queueMediaCleanup(req.payload, previousDoc.imagekitFileId, req)
        }
        return doc
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        if (doc.imagekitFileId) await queueMediaCleanup(req.payload, doc.imagekitFileId, req)
      },
    ],
  },
}
