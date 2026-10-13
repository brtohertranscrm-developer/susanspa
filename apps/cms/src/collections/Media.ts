import ImageKit from '@imagekit/nodejs'
import { APIError, type CollectionConfig } from 'payload'
import { canManageContent } from '../access'

let imagekit: ImageKit | null = null

// Kunci hanya dibaca dari environment. Klien dibuat saat dibutuhkan agar CMS tetap bisa berjalan tanpa kunci.
// baseURL sengaja tidak diisi. Isi dengan URL pengiriman (ik.imagekit.io) membuat SDK mengirim upload ke host
// yang tidak menerima upload. Tanpa baseURL, SDK memakai upload.imagekit.io dan api.imagekit.io sendiri.
const getImageKit = () => {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
  if (!privateKey) {
    throw new APIError(
      'Unggah foto belum bisa dipakai karena IMAGEKIT_PRIVATE_KEY belum diatur di server.',
      500,
      undefined,
      true,
    )
  }
  imagekit ??= new ImageKit({ privateKey })
  return imagekit
}

// ImageKit tidak bisa mengubah ukuran foto di atas 25 megapixel. Foto seperti itu ditampilkan apa adanya.
const IMAGEKIT_TRANSFORM_MAX_PIXELS = 25_000_000

// Pustaka menampilkan versi 320 px dari ImageKit agar foto asli beresolusi tinggi tidak diunduh untuk setiap kotak.
const thumbnailUrl = ({ doc }: { doc: Record<string, unknown> }) => {
  const url = typeof doc.url === 'string' ? doc.url : null
  if (!url) return null
  if (!url.includes('ik.imagekit.io')) return url
  const width = Number(doc.width)
  const height = Number(doc.height)
  const tooLarge = width > 0 && height > 0 && width * height > IMAGEKIT_TRANSFORM_MAX_PIXELS
  return tooLarge ? url : `${url}${url.includes('?') ? '&' : '?'}tr=w-320`
}

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Foto & Media',
    plural: 'Pustaka Media',
  },
  admin: {
    group: 'Media',
    description:
      'Unggah foto sekali, lalu pakai di kamar, spa, wedding, jurnal, dan galeri. Isi teks alternatif dengan deskripsi isi foto.',
    defaultColumns: ['filename', 'alt', 'mimeType', 'filesize', 'createdAt'],
    listSearchableFields: ['filename', 'alt'],
    pagination: { defaultLimit: 24, limits: [12, 24, 48, 96] },
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
          admin: {
            description:
              'Jelaskan apa yang terlihat di foto, bukan kumpulan kata kunci. Dibaca oleh pembaca layar dan mesin pencari.',
          },
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
    {
      type: 'collapsible',
      label: 'Pengaturan Teknis Penyimpanan (ImageKit)',
      admin: { initCollapsed: true },
      fields: [
        { name: 'url', type: 'text', admin: { readOnly: true }, label: 'URL Publik' },
        { name: 'imagekitFileId', type: 'text', admin: { readOnly: true }, label: 'ImageKit File ID' },
      ],
    },
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
    afterDelete: [
      async ({ doc }) => {
        if (doc.imagekitFileId) {
          try {
            await getImageKit().files.delete(doc.imagekitFileId)
          } catch (e) {
            console.error('Failed to delete imagekit file', e)
          }
        }
      },
    ],
  },
}
