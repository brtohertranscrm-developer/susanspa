import type { NumberField, TextField } from 'payload'
import { slugify } from './slugify'

// Tidak memakai slugField bawaan Payload karena menambah kolom checkbox di setiap tabel dan butuh migration.
export const slugField = (source: 'title' | 'name'): TextField => ({
  name: 'slug',
  label: 'Alamat halaman (slug)',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description:
      'Terisi otomatis dari judul saat membuat konten baru. Jangan diubah setelah tayang, karena link yang sudah dibagikan akan berhenti bekerja.',
    components: {
      Field: { path: '/components/SlugField#SlugField', clientProps: { source } },
    },
  },
  hooks: {
    beforeValidate: [
      ({ value, siblingData }) => {
        if (typeof value === 'string' && value.trim()) return slugify(value)
        const base = siblingData?.[source]
        return typeof base === 'string' ? slugify(base) : value
      },
    ],
  },
})

export const sortOrderField = (indexed = true): NumberField => ({
  name: 'sortOrder',
  label: 'Urutan tampil',
  type: 'number',
  defaultValue: 0,
  index: indexed,
  admin: {
    position: 'sidebar',
    description: 'Angka kecil tampil lebih dulu di website. Boleh sama.',
  },
})
