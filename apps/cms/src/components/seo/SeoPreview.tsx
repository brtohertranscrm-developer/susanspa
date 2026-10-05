'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'

export const SeoPreview: React.FC = () => {
  const formValues = useFormFields(([fields]) => ({
    title: (fields?.seoTitle?.value || fields?.defaultSeoTitle?.value || fields?.title?.value || fields?.name?.value || '') as string,
    desc: (fields?.seoDescription?.value || fields?.defaultSeoDescription?.value || fields?.excerpt?.value || fields?.summary?.value || fields?.shortDescription?.value || '') as string,
    slug: (fields?.slug?.value || '') as string,
  }))

  const titleLength = formValues.title ? String(formValues.title).length : 0
  const descLength = formValues.desc ? String(formValues.desc).length : 0

  const webUrl = 'susansparesort.com'
  const displayTitle = formValues.title || 'Susan Spa & Resort | Luxury Wellness Sanctuary'
  const displayDesc = formValues.desc || 'Temukan ketenangan dan kemewahan alami di Susan Spa & Resort Bandungan, Semarang.'
  const displayPath = formValues.slug ? `/${formValues.slug}` : ''

  return (
    <div className="susan-seo-card">
      <div className="susan-seo-card__header">
        <span className="susan-seo-card__title">PRATINJAU HASIL PENCARIAN GOOGLE</span>
        <span className="susan-seo-card__badge">Search Preview</span>
      </div>

      {/* Snippet Card */}
      <div className="susan-seo-snippet">
        <div className="susan-seo-snippet__url">
          <span className="susan-seo-snippet__favicon">🌿</span>
          <span className="susan-seo-snippet__domain">https://www.{webUrl}{displayPath}</span>
        </div>
        <div className="susan-seo-snippet__headline">{displayTitle}</div>
        <div className="susan-seo-snippet__description">{displayDesc}</div>
      </div>

      {/* Character Guidance */}
      <div className="susan-seo-meters">
        <div className="susan-seo-meter">
          <div className="susan-seo-meter__label">
            <span>Judul SEO Target (50 - 60 kar):</span>
            <span className={`susan-seo-meter__count ${titleLength > 60 ? 'susan-seo-meter__count--warn' : 'susan-seo-meter__count--ok'}`}>
              {titleLength} / 60
            </span>
          </div>
          <div className="susan-seo-meter__bar">
            <div
              className={`susan-seo-meter__fill ${titleLength > 60 ? 'susan-seo-meter__fill--warn' : ''}`}
              style={{ width: `${Math.min(100, (titleLength / 60) * 100)}%` }}
            />
          </div>
        </div>

        <div className="susan-seo-meter">
          <div className="susan-seo-meter__label">
            <span>Meta Deskripsi Target (140 - 160 kar):</span>
            <span className={`susan-seo-meter__count ${descLength > 160 ? 'susan-seo-meter__count--warn' : 'susan-seo-meter__count--ok'}`}>
              {descLength} / 160
            </span>
          </div>
          <div className="susan-seo-meter__bar">
            <div
              className={`susan-seo-meter__fill ${descLength > 160 ? 'susan-seo-meter__fill--warn' : ''}`}
              style={{ width: `${Math.min(100, (descLength / 160) * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeoPreview
