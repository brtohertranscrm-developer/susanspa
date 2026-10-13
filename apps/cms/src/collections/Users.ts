import type { CollectionConfig } from 'payload'
import { isContentAdmin } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Pengguna',
    plural: 'Pengguna',
  },
  admin: {
    group: 'Pengaturan',
    useAsTitle: 'email',
    // Editor hanya bisa membuka akunnya sendiri lewat menu Akun. Daftar pengguna hanya untuk admin.
    hidden: ({ user }) => !isContentAdmin(user),
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
      type: 'text',
      required: true,
      label: 'Nama Lengkap',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      label: 'Peran',
      defaultValue: ['content-editor'],
      options: [
        { label: 'Admin konten', value: 'content-admin' },
        { label: 'Editor konten', value: 'content-editor' },
      ],
      access: {
        update: ({ req }) => Boolean(req.user && isContentAdmin(req.user)),
      },
    },
  ],
}
