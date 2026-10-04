'use client'

import { Link, useConfig } from '@payloadcms/ui'
import { usePathname } from 'next/navigation'
import { formatAdminURL } from 'payload/shared'

export function NavDashboardLink() {
  const pathname = usePathname()
  const { config } = useConfig()
  const href = formatAdminURL({ adminRoute: config.routes.admin, path: '' }) || config.routes.admin
  const isActive = pathname === href || pathname === `${href}/`

  return (
    <Link
      id="nav-dashboard"
      className="nav__link"
      href={href}
      prefetch={false}
      aria-current={isActive ? 'page' : undefined}
    >
      {isActive && <span className="nav__link-indicator" />}
      <span className="nav__link-label">Ringkasan</span>
    </Link>
  )
}
