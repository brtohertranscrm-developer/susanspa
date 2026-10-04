import type { CollectionConfig } from 'payload'
import { canManageContent, publicPublishedOrEditor } from '../access'
import { slugField, sortOrderField } from '../lib/fields'
import { previewUrl } from '../lib/publicLinks'

export const Rooms: CollectionConfig = {
  slug: 'rooms',
  labels: { singular: 'Kamar', plural: 'Kamar' },
  admin: {
    group: 'Kamar & Layanan',
    useAsTitle: 'name',
    description:
      'Kamar, suite, dan villa di halaman Rooms. Harga di sini hanya untuk tampilan; harga checkout tetap dihitung booking engine.',
    defaultColumns: ['name', 'category', 'startingPriceLabel', '_status', 'updatedAt'],
    listSearchableFields: ['name', 'slug'],
    pagination: { defaultLimit: 25, limits: [10, 25, 50, 100] },
    preview: previewUrl('rooms'),
  },
  defaultSort: 'sortOrder',
  access: {
    create: canManageContent,
    read: publicPublishedOrEditor,
    update: canManageContent,
    delete: canManageContent,
  },
  versions: { drafts: { autosave: true }, maxPerDoc: 25 },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Informasi',
          fields: [
            {
              name: 'name',
              label: 'Nama kamar',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'tagline',
              label: 'Kalimat pembuka',
              type: 'text',
              localized: true,
              admin: { description: 'Satu kalimat singkat di bawah nama kamar.' },
            },
            {
              name: 'shortDescription',
              label: 'Deskripsi singkat',
              type: 'textarea',
              localized: true,
              admin: { description: 'Ringkasan 1 sampai 2 kalimat.' },
            },
            {
              name: 'longDescription',
              label: 'Deskripsi lengkap',
              type: 'textarea',
              localized: true,
              admin: { rows: 8, description: 'Penjelasan rinci untuk halaman detail kamar.' },
            },
            {
              type: 'row',
              fields: [
                { name: 'sizeSqm', label: 'Luas (m²)', type: 'number', min: 0 },
                { name: 'capacityAdults', label: 'Dewasa (maks.)', type: 'number', min: 1, defaultValue: 2 },
                { name: 'capacityChildren', label: 'Anak (maks.)', type: 'number', min: 0, defaultValue: 0 },
              ],
            },
            { name: 'bedType', label: 'Tipe tempat tidur', type: 'text', localized: true },
          ],
        },
        {
          label: 'Foto',
          fields: [
            {
              name: 'images',
              label: 'Foto kamar',
              labels: { singular: 'Foto', plural: 'Foto' },
              type: 'array',
              minRows: 1,
              admin: {
                description:
                  'Minimal 1 foto. Urutan di sini menjadi urutan di website. Seret baris untuk mengubahnya.',
              },
              fields: [{ name: 'image', label: 'Foto', type: 'upload', relationTo: 'media', required: true }],
            },
          ],
        },
        {
          label: 'Fasilitas & aturan',
          fields: [
            {
              name: 'amenities',
              label: 'Fasilitas kamar',
              labels: { singular: 'Fasilitas', plural: 'Fasilitas' },
              type: 'array',
              fields: [{ name: 'label', label: 'Nama fasilitas', type: 'text', required: true, localized: true }],
            },
            {
              name: 'policies',
              label: 'Aturan kamar',
              labels: { singular: 'Aturan', plural: 'Aturan' },
              type: 'array',
              fields: [{ name: 'label', label: 'Isi aturan', type: 'text', required: true, localized: true }],
            },
          ],
        },
        {
          label: 'Harga & booking',
          fields: [
            {
              name: 'startingPriceLabel',
              label: 'Harga mulai dari (Rp)',
              type: 'number',
              min: 0,
              admin: {
                description:
                  'Harga untuk tampilan, ditulis angka saja tanpa titik. Harga checkout tetap dari booking engine.',
              },
            },
            {
              name: 'bookingRoomTypeId',
              label: 'ID tipe kamar di booking engine',
              type: 'text',
              unique: true,
              admin: { description: 'Hanya referensi. Harga dan ketersediaan tetap milik booking engine.' },
            },
          ],
        },
      ],
    },
    slugField('name'),
    {
      name: 'category',
      label: 'Kategori',
      type: 'select',
      required: true,
      options: ['Villa', 'Suite', 'Deluxe', 'Family'],
      admin: { position: 'sidebar' },
    },
    sortOrderField(),
  ],
}
