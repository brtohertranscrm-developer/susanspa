import type { CollectionConfig } from 'payload'
import { isContentAdmin } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Pengguna', plural: 'Pengguna' },
  admin: {
    group: 'Pengaturan',
    useAsTitle: 'fullName',
    description:
      'Akun yang bisa masuk ke panel ini. Hanya Admin konten yang dapat menambah akun, mengubah peran, atau menghapus akun.',
    defaultColumns: ['fullName', 'email', 'roles', 'createdAt'],
    listSearchableFields: ['fullName', 'email'],
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    tokenExpiration: 24 * 60 * 60,
  },
  access: {
    create: async ({ req }) => {
      if (req.user) return isContentAdmin(req.user)
      const existing = await req.payload.count({ collection: 'users' })
      return existing.totalDocs === 0
    },
    read: ({ req }) => {
      if (!req.user) return false
      if (isContentAdmin(req.user)) return true
      return { id: { equals: req.user.id } }
    },
    update: ({ req }) => {
      if (!req.user) return false
      if (isContentAdmin(req.user)) return true
      return { id: { equals: req.user.id } }
    },
    delete: ({ req }) => Boolean(req.user && isContentAdmin(req.user)),
  },
  fields: [
    {
      name: 'fullName',
      label: 'Nama lengkap',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      label: 'Peran',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['content-editor'],
      options: [
        { label: 'Admin konten', value: 'content-admin' },
        { label: 'Editor konten', value: 'content-editor' },
      ],
      admin: {
        description:
          'Admin konten mengelola semua konten dan semua akun. Editor konten mengelola konten, tetapi hanya bisa mengubah akunnya sendiri.',
      },
      access: {
        update: ({ req }) => Boolean(req.user && isContentAdmin(req.user)),
      },
    },
  ],
}
