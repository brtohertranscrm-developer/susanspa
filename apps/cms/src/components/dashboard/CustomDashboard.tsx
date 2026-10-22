import type { BasePayload } from 'payload'
import React from 'react'
import { getContentStatus } from '../../lib/contentStatus'
import { ENTITY_ICONS } from '../../lib/navigation'
import { DashboardClient, type CreateLink } from './DashboardClient'
import type { Destination, SearchSource } from './SearchBox'

interface Props {
  payload: BasePayload
  user?: { fullName?: string; email?: string } | null
}

const SEARCH_SOURCES: SearchSource[] = [
  { collection: 'rooms', titleField: 'name', type: 'Kamar' },
  { collection: 'spa-treatments', titleField: 'title', type: 'Spa' },
  { collection: 'wedding-packages', titleField: 'title', type: 'Wedding' },
  { collection: 'resort-content', titleField: 'title', type: 'Fasilitas & Wisata' },
  { collection: 'offers', titleField: 'title', type: 'Promo' },
  { collection: 'journal-articles', titleField: 'title', type: 'Jurnal' },
  { collection: 'gallery-items', titleField: 'title', type: 'Galeri' },
  { collection: 'pages', titleField: 'title', type: 'Halaman' },
]

const CREATE_LINKS: CreateLink[] = [
  { label: 'Kamar', href: '/cms/collections/rooms/create' },
  { label: 'Perawatan spa', href: '/cms/collections/spa-treatments/create' },
  { label: 'Paket wedding', href: '/cms/collections/wedding-packages/create' },
  { label: 'Fasilitas atau tempat wisata', href: '/cms/collections/resort-content/create' },
  { label: 'Promo', href: '/cms/collections/offers/create' },
  { label: 'Artikel jurnal', href: '/cms/collections/journal-articles/create' },
  { label: 'Foto galeri', href: '/cms/collections/gallery-items/create' },
  { label: 'Halaman tambahan', href: '/cms/collections/pages/create' },
]

const JAKARTA = 'Asia/Jakarta'

function greetingFor(date: Date) {
  const hour = Number(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone: JAKARTA }).format(date))
  if (hour < 11) return 'Selamat pagi'
  if (hour < 15) return 'Selamat siang'
  if (hour < 18) return 'Selamat sore'
  return 'Selamat malam'
}

export async function CustomDashboard({ payload, user }: Props) {
  const now = new Date()
  const status = await getContentStatus(payload)

  // Menu CMS yang bisa dicari lewat namanya, misalnya "Halaman Spa" atau "Header".
  const destinations: Destination[] = [
    ...payload.config.collections
      .filter((collection) => collection.admin?.group && !collection.admin?.hidden)
      .map((collection) => ({
        label: String(collection.labels?.plural ?? collection.slug),
        href: `/cms/collections/${collection.slug}`,
        group: String(collection.admin?.group),
      })),
    ...payload.config.globals.map((global) => ({
      label: String(global.label ?? global.slug),
      href: `/cms/globals/${global.slug}`,
      group: String(global.admin?.group ?? 'Halaman'),
    })),
  ]

  return (
    <DashboardClient
      greeting={greetingFor(now)}
      name={user?.fullName || user?.email || 'Editor'}
      today={new Intl.DateTimeFormat('id-ID', { dateStyle: 'full', timeZone: JAKARTA }).format(now)}
      status={status}
      icons={ENTITY_ICONS}
      searchSources={SEARCH_SOURCES}
      destinations={destinations}
      createLinks={CREATE_LINKS}
    />
  )
}

export default CustomDashboard
