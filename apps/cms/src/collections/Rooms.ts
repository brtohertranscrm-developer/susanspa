import type { CollectionConfig } from 'payload'
import { canManageContent, publicPublishedOrEditor } from '../access'

export const Rooms: CollectionConfig = {
  slug: 'rooms',
  labels: {
    singular: 'Kamar',
    plural: 'Kamar',
  },
  admin: {
    group: 'Website',
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'startingPriceLabel', '_status'],
  },
  access: {
    create: canManageContent,
    read: publicPublishedOrEditor,
    update: canManageContent,
    delete: canManageContent,
  },
  versions: { drafts: { autosave: true }, maxPerDoc: 25 },
  fields: [
    // 1. INFORMASI DASAR (BASIC)
    {
      type: 'collapsible',
      label: 'Informasi Dasar (Basic)',
      admin: { initCollapsed: false },
      fields: [
        { name: 'name', type: 'text', required: true, localized: true, label: 'Nama Kamar' },
        { name: 'tagline', type: 'text', localized: true, label: 'Tagline / Slogan' },
        {
          name: 'category',
          type: 'select',
          required: true,
          label: 'Kategori Kamar',
          options: ['Villa', 'Suite', 'Deluxe', 'Family'],
        },
        { name: 'shortDescription', type: 'textarea', localized: true, label: 'Deskripsi Singkat' },
        { name: 'longDescription', type: 'textarea', localized: true, label: 'Deskripsi Lengkap' },
      ],
    },

    // 2. DETAIL & FASILITAS (DETAILS)
    {
      type: 'collapsible',
      label: 'Detail & Fasilitas Kamar (Details)',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'startingPriceLabel',
          type: 'number',
          min: 0,
          label: 'Harga Mulai Dari (Rp)',
          admin: { description: 'Harga display; ketersediaan & checkout tetap dikelola booking engine.' },
        },
        {
          type: 'row',
          fields: [
            { name: 'sizeSqm', type: 'number', min: 0, label: 'Luas Kamar (m²)' },
            { name: 'capacityAdults', type: 'number', min: 1, defaultValue: 2, label: 'Kapasitas Dewasa' },
            { name: 'capacityChildren', type: 'number', min: 0, defaultValue: 0, label: 'Kapasitas Anak' },
          ],
        },
        { name: 'bedType', type: 'text', localized: true, label: 'Tipe Tempat Tidur' },
        {
          name: 'amenities',
          type: 'array',
          label: 'Fasilitas Kamar (Amenities)',
          fields: [{ name: 'label', type: 'text', required: true, localized: true, label: 'Nama Fasilitas' }],
        },
        {
          name: 'policies',
          type: 'array',
          label: 'Kebijakan Kamar (Policies)',
          fields: [{ name: 'label', type: 'text', required: true, localized: true, label: 'Kebijakan' }],
        },
      ],
    },

    // 3. FOTO & MEDIA (MEDIA)
    {
      type: 'collapsible',
      label: 'Foto Kamar (Photos)',
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'images',
          type: 'array',
          minRows: 1,
          label: 'Galeri Foto Kamar',
          fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Pilih Foto' }],
        },
      ],
    },

    // 4. PENGATURAN TEKNIS (ADVANCED)
    {
      type: 'collapsible',
      label: 'Pengaturan Teknis (Advanced)',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          index: true,
          label: 'URL Slug',
          admin: { description: 'Identifier unik URL kamar.' },
        },
        {
          name: 'bookingRoomTypeId',
          label: 'Booking Engine Room Type ID',
          type: 'text',
          unique: true,
          admin: { description: 'Referensi saja. Harga dan availability tetap milik booking engine.' },
        },
        { name: 'sortOrder', type: 'number', defaultValue: 0, index: true, label: 'Urutan Tampilan' },
      ],
    },
  ],
}
