import type { CollectionConfig, Field } from 'payload'
import { canManageContent, publicPublishedOrEditor } from '../access'

const commonFields: Field[] = [
  { name: 'title', type: 'text', required: true, localized: true },
  { name: 'slug', type: 'text', required: true, unique: true, index: true },
  { name: 'summary', type: 'textarea', localized: true },
  { name: 'description', type: 'textarea', localized: true },
  { name: 'featuredImage', type: 'upload', relationTo: 'media' },
  { name: 'sortOrder', type: 'number', defaultValue: 0, index: true },
]

const contentCollection = (
  slug: string,
  singularLabel: string,
  pluralLabel: string,
  fields: Field[] = [],
): CollectionConfig => ({
  slug,
  labels: { singular: singularLabel, plural: pluralLabel },
  admin: { group: 'Hospitality', useAsTitle: 'title' },
  access: {
    create: canManageContent,
    read: publicPublishedOrEditor,
    update: canManageContent,
    delete: canManageContent,
  },
  versions: { drafts: true, maxPerDoc: 25 },
  fields: [...commonFields, ...fields],
})

export const SpaTreatments = contentCollection('spa-treatments', 'Spa Treatment', 'Spa Treatments', [
  { name: 'durationMinutes', type: 'number', min: 1 },
  { name: 'priceLabel', type: 'number', min: 0 },
  { name: 'benefits', type: 'array', fields: [{ name: 'label', type: 'text', localized: true }] },
])

export const WeddingPackages = contentCollection('wedding-packages', 'Wedding Package', 'Wedding Packages', [
  { name: 'capacity', type: 'number', min: 1 },
  { name: 'venue', type: 'text', localized: true },
  { name: 'priceLabel', type: 'number', min: 0 },
  { name: 'inclusions', type: 'array', fields: [{ name: 'label', type: 'text', localized: true }] },
])

export const Offers = contentCollection('offers', 'Offer', 'Offers', [
  { name: 'validFrom', type: 'date' },
  { name: 'validUntil', type: 'date' },
  { name: 'terms', type: 'textarea', localized: true },
])

export const ResortContent = contentCollection('resort-content', 'Resort Content', 'Resort Content', [
  {
    name: 'kind',
    type: 'select',
    required: true,
    index: true,
    options: [
      { label: 'Facility', value: 'facility' },
      { label: 'Dining', value: 'dining' },
      { label: 'Experience', value: 'experience' },
      { label: 'Nearby Destination', value: 'nearby' },
    ],
  },
  { name: 'location', type: 'text', localized: true },
  { name: 'distanceLabel', type: 'text', localized: true },
])
