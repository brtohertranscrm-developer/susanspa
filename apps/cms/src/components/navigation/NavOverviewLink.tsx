'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard } from 'lucide-react'

export const NavOverviewLink: React.FC = () => {
  const pathname = usePathname()
  const isActive = pathname === '/cms' || pathname === '/cms/'

  return (
    <div style={{ marginBottom: '8px' }}>
      <Link
        href="/cms"
        className={`susan-nav-link ${isActive ? 'susan-nav-link--active' : ''}`}
      >
        <div className="susan-nav-link__main">
          <LayoutDashboard size={18} className="susan-nav-link__icon" />
          <span>Ringkasan</span>
        </div>
      </Link>
    </div>
  )
}

export default NavOverviewLink
