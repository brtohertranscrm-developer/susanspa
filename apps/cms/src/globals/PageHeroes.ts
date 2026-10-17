import type { Field, GlobalConfig } from 'payload'
import { canManageContent } from '../access'

// Kunci tiap halaman harus sama dengan yang dipakai web di getPageHero (apps/web/src/lib/cms.ts).
const HERO_PAGES = [
  { name: 'about', label: 'Tentang Kami (/about)' },
  { name: 'events', label: 'Acara & Meeting (/events)' },
  { name: 'ballroom', label: 'Ballroom & Meeting Room (/ballroom)' },
  { name: 'dining', label: 'Restoran & Kafe (/dining)' },
  { name: 'experiences', label: 'Pengalaman (/experiences)' },
  { name: 'facilities', label: 'Fasilitas (/facilities)' },
  { name: 'gallery', label: 'Galeri (/gallery)' },
  { name: 'nearby', label: 'Wisata Sekitar (/nearby)' },
  { name: 'offers', label: 'Promo (/offers)' },
  { name: 'rooms', label: 'Kamar & Villa (/rooms)' },
  { name: 'spa', label: 'Spa (/spa)' },
  { name: 'wedding', label: 'Wedding (/wedding)' },
]

const heroFields: Field[] = HERO_PAGES.map(({ name, label }) => ({
  name,
  type: 'upload',
  relationTo: 'media',
  label,
}))

export const PageHeroes: GlobalConfig = {
  slug: 'page-heroes',
  label: 'Foto Hero Halaman',
  admin: {
    group: 'Konten website',
    description:
      'Foto besar di bagian atas tiap halaman. Kosongkan untuk memakai foto bawaan. Perubahan tampil di website sekitar 5 menit setelah disimpan.',
  },
  access: {
    read: () => true,
    update: canManageContent,
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Foto per halaman',
      admin: { initCollapsed: false },
      fields: heroFields,
    },
  ],
}
