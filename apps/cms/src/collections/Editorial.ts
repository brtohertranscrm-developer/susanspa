import type { CollectionConfig } from 'payload'
import { canManageContent, publicPublishedOrEditor } from '../access'

export const JournalArticles: CollectionConfig = {
  slug: 'journal-articles',
  admin: { group: 'Editorial', useAsTitle: 'title' },
  access: {
    create: canManageContent,
    read: publicPublishedOrEditor,
    update: canManageContent,
    delete: canManageContent,
  },
  versions: { drafts: { autosave: true }, maxPerDoc: 50 },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'excerpt', type: 'textarea', localized: true },
    { name: 'content', type: 'richText', required: true, localized: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'category', type: 'text', localized: true },
    { name: 'publishedAt', type: 'date', index: true },
    { name: 'seoTitle', type: 'text', localized: true, maxLength: 70 },
    { name: 'seoDescription', type: 'textarea', localized: true, maxLength: 170 },
  ],
}

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { group: 'Editorial', useAsTitle: 'guestName' },
  access: {
    create: canManageContent,
    read: publicPublishedOrEditor,
    update: canManageContent,
    delete: canManageContent,
  },
  versions: { drafts: true },
  fields: [
    { name: 'guestName', type: 'text', required: true },
    { name: 'quote', type: 'textarea', required: true, localized: true },
    { name: 'rating', type: 'number', min: 1, max: 5, defaultValue: 5 },
    { name: 'stayCategory', type: 'text', localized: true },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
  ],
}

export const GalleryItems: CollectionConfig = {
  slug: 'gallery-items',
  admin: { group: 'Editorial', useAsTitle: 'title' },
  access: {
    create: canManageContent,
    read: publicPublishedOrEditor,
    update: canManageContent,
    delete: canManageContent,
  },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: ['Rooms', 'Spa', 'Weddings', 'La Kana Chapel', 'Dining', 'Grounds'],
    },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
  ],
}
