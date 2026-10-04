import type { CollectionConfig } from 'payload'
import { canManageContent, publicPublishedOrEditor } from '../access'

export const Rooms: CollectionConfig = {
  slug: 'rooms',
  admin: {
    group: 'Hospitality',
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'bookingRoomTypeId', '_status'],
  },
  access: {
    create: canManageContent,
    read: publicPublishedOrEditor,
    update: canManageContent,
    delete: canManageContent,
  },
  versions: { drafts: { autosave: true }, maxPerDoc: 25 },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: ['Villa', 'Suite', 'Deluxe', 'Family'],
    },
    {
      name: 'bookingRoomTypeId',
      label: 'Booking Engine Room Type ID',
      type: 'text',
      unique: true,
      admin: { description: 'Referensi saja. Harga dan availability tetap milik booking engine.' },
    },
    { name: 'tagline', type: 'text', localized: true },
    { name: 'shortDescription', type: 'textarea', localized: true },
    { name: 'longDescription', type: 'textarea', localized: true },
    { name: 'startingPriceLabel', type: 'number', min: 0, admin: { description: 'Harga display; harga checkout tetap dari booking engine.' } },
    {
      type: 'row',
      fields: [
        { name: 'sizeSqm', type: 'number', min: 0 },
        { name: 'capacityAdults', type: 'number', min: 1, defaultValue: 2 },
        { name: 'capacityChildren', type: 'number', min: 0, defaultValue: 0 },
      ],
    },
    { name: 'bedType', type: 'text', localized: true },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    {
      name: 'amenities',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true, localized: true }],
    },
    {
      name: 'policies',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true, localized: true }],
    },
    { name: 'sortOrder', type: 'number', defaultValue: 0, index: true },
  ],
}
