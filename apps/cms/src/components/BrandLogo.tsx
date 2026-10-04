import { Link } from '@payloadcms/ui'
import type { ServerProps } from 'payload'

// Placeholder teks sampai file logo resmi tersedia. Jangan ganti dengan simbol buatan sendiri.
export function BrandLogo() {
  return (
    <span className="brand-logo">
      <span className="brand-logo__name">Susan Spa &amp; Resort</span>
      <span className="brand-logo__tag">Panel konten</span>
    </span>
  )
}

export function BrandIcon() {
  return (
    <span className="brand-icon" aria-hidden="true">
      S
    </span>
  )
}

export function NavBrand({ payload }: Pick<ServerProps, 'payload'>) {
  return (
    <Link className="nav-brand" href={payload.config.routes.admin} prefetch={false}>
      <BrandLogo />
    </Link>
  )
}
