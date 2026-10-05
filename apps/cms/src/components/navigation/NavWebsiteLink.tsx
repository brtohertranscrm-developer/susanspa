'use client'

import React from 'react'
import { ExternalLink } from 'lucide-react'

export const NavWebsiteLink: React.FC = () => {
  const webUrl = process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000'

  return (
    <div className="susan-nav-website-btn">
      <a
        href={webUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="susan-nav-website-link"
        title="Buka Website Susan Spa Resort di tab baru"
      >
        <span>Buka Website</span>
        <ExternalLink size={16} />
      </a>
    </div>
  )
}

export default NavWebsiteLink
