import type { ServerProps } from 'payload'

export function UserAvatar({ user }: Pick<ServerProps, 'user'>) {
  const name = String((user as { fullName?: string } | null)?.fullName || user?.email || '')
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

  return (
    <span className="user-avatar" aria-hidden="true">
      {initials || '?'}
    </span>
  )
}
