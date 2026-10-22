import type { ContentField, ContentPage } from '@susan/contracts/content'
import type { Field, GlobalConfig } from 'payload'
import { canManageContent } from '../access'

const ROW_LABEL = '@/components/ArrayRowLabel#ArrayRowLabel'

// Foto tidak bisa diberi nilai awal karena harus menunjuk ke Pustaka Media, jadi dibuang dari baris bawaan.
const stripMedia = (fields: readonly ContentField[], rows: readonly Record<string, unknown>[]) =>
  rows.map((row) => {
    const result: Record<string, unknown> = {}
    for (const field of fields) {
      if (field.kind === 'image' || field.kind === 'video') continue
      const value = row[field.name]
      result[field.name] =
        field.kind === 'list' && Array.isArray(value) ? stripMedia(field.fields, value as Record<string, unknown>[]) : value
    }
    return result
  })

const toPayloadField = (field: ContentField): Field => {
  switch (field.kind) {
    case 'text': {
      const base = { name: field.name, label: field.label, localized: true, defaultValue: field.default, admin: { description: field.description } }
      return field.multiline ? { ...base, type: 'textarea' } : { ...base, type: 'text' }
    }
    case 'image':
      return {
        name: field.name,
        type: 'upload',
        relationTo: 'media',
        label: field.label,
        filterOptions: { mimeType: { contains: 'image' } },
        admin: { description: field.description ?? 'Kosongkan untuk memakai foto bawaan.' },
      }
    case 'video':
      return {
        name: field.name,
        type: 'upload',
        relationTo: 'media',
        label: field.label,
        filterOptions: { mimeType: { contains: 'video' } },
        admin: { description: field.description },
      }
    case 'checkbox':
      return {
        name: field.name,
        type: 'checkbox',
        label: field.label,
        defaultValue: field.default,
        admin: { description: field.description },
      }
    case 'select':
      return {
        name: field.name,
        type: 'select',
        label: field.label,
        required: true,
        options: field.options.map((option) => ({ ...option })),
        defaultValue: field.default,
        admin: { description: field.description },
      }
    case 'list':
      return {
        name: field.name,
        type: 'array',
        label: field.label,
        labels: field.rowLabel ? { singular: field.rowLabel, plural: field.label } : undefined,
        fields: field.fields.map(toPayloadField),
        defaultValue: stripMedia(field.fields, field.default),
        admin: {
          description: field.description,
          initCollapsed: true,
          components: { RowLabel: ROW_LABEL },
        },
      }
    case 'group':
      return {
        name: field.name,
        type: 'group',
        label: field.label,
        fields: field.fields.map(toPayloadField),
        admin: { description: field.description },
      }
  }
}

const countTexts = (fields: readonly ContentField[]): number =>
  fields.reduce((total, field) => total + (field.kind === 'group' ? countTexts(field.fields) : field.kind === 'text' ? 1 : 0), 0)

// Postgres menolak membaca lebih dari 100 kolom terjemahan sekaligus, jadi global yang terlalu besar harus dipecah.
const MAX_TEXTS_PER_GLOBAL = 90

export const contentGlobal = (
  spec: ContentPage,
  options: { group: string; previewPath?: string },
): GlobalConfig => {
  if (countTexts(spec.fields) > MAX_TEXTS_PER_GLOBAL) {
    throw new Error(`Global ${spec.slug} punya lebih dari ${MAX_TEXTS_PER_GLOBAL} teks di luar daftar. Pecah menjadi dua global.`)
  }
  return {
    slug: spec.slug,
    label: spec.label,
    admin: {
      group: options.group,
      description: [spec.description, 'Perubahan tampil di website paling lama 5 menit setelah disimpan.'].filter(Boolean).join(' '),
      ...(options.previewPath
        ? { preview: () => `${(process.env.WEB_URL || 'http://localhost:3000').replace(/\/$/, '')}${options.previewPath}` }
        : {}),
    },
    access: {
      read: () => true,
      update: canManageContent,
    },
    fields: spec.fields.map(toPayloadField),
  }
}

/** Isi awal sebuah global: semua teks bawaan tanpa foto, karena foto memakai fallback di web. */
export const initialData = (fields: readonly ContentField[]): Record<string, unknown> => {
  const result: Record<string, unknown> = {}
  for (const field of fields) {
    if (field.kind === 'image' || field.kind === 'video') continue
    if (field.kind === 'group') result[field.name] = initialData(field.fields)
    else if (field.kind === 'list') result[field.name] = stripMedia(field.fields, field.default)
    else result[field.name] = field.default
  }
  return result
}
