import type { Access } from 'payload'

type UserWithRoles = {
  id: string | number
  roles?: Array<'content-admin' | 'content-editor'>
}

const getRoles = (user: unknown) => (user as UserWithRoles | null)?.roles ?? []

export const isContentAdmin = (user: unknown) => getRoles(user).includes('content-admin')

export const canManageContent: Access = ({ req }) =>
  Boolean(
    req.user &&
      (getRoles(req.user).includes('content-admin') ||
        getRoles(req.user).includes('content-editor')),
  )

export const contentAdminOnly: Access = ({ req }) => Boolean(req.user && isContentAdmin(req.user))

export const publicPublishedOrEditor: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}
