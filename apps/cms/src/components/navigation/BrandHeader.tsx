'use client'

import React from 'react'

export const BrandHeader: React.FC = () => {
  return (
    <div className="susan-brand-header">
      <div className="susan-brand-header__badge">
        <span className="susan-brand-header__dot" />
        <span className="susan-brand-header__tag">Susan Spa & Resort</span>
      </div>
      <h1 className="susan-brand-header__title">SUSAN SPA</h1>
      <p className="susan-brand-header__subtitle">Content Manager</p>
    </div>
  )
}

export default BrandHeader
