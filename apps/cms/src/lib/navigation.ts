// Susunan menu samping CMS. Payload menampilkan grup sesuai urutan koleksi pertama di grup itu,
// jadi urutan grup di sini harus sejalan dengan urutan koleksi di payload.config.ts.
export const NAV_GROUPS = {
  main: 'Halaman Utama',
  rooms: 'Kamar & Villa',
  spa: 'Spa',
  wedding: 'Wedding & Acara',
  resort: 'Fasilitas, Kuliner & Wisata',
  stories: 'Promo, Jurnal & Galeri',
  media: 'Media',
  settings: 'Pengaturan',
  appearance: 'Tampilan Situs',
} as const

type NavEntry = { group: string; label?: string; singular?: string }

export const NAV: Record<string, NavEntry> = {
  pages: { group: NAV_GROUPS.main },
  'page-home': { group: NAV_GROUPS.main, label: 'Beranda' },
  'page-about': { group: NAV_GROUPS.main, label: 'Tentang Kami' },
  'page-contact': { group: NAV_GROUPS.main, label: 'Kontak' },
  'page-reserve': { group: NAV_GROUPS.main, label: 'Reservasi' },
  'page-privacy': { group: NAV_GROUPS.main },
  'page-terms': { group: NAV_GROUPS.main },

  rooms: { group: NAV_GROUPS.rooms, label: 'Daftar Kamar', singular: 'Kamar' },
  'page-rooms': { group: NAV_GROUPS.rooms },

  'spa-treatments': { group: NAV_GROUPS.spa, label: 'Daftar Perawatan', singular: 'Perawatan Spa' },
  'page-spa': { group: NAV_GROUPS.spa },

  'wedding-packages': { group: NAV_GROUPS.wedding, label: 'Paket Wedding' },
  'page-wedding': { group: NAV_GROUPS.wedding },
  'page-ballroom': { group: NAV_GROUPS.wedding },
  'page-events': { group: NAV_GROUPS.wedding },

  'resort-content': { group: NAV_GROUPS.resort, label: 'Daftar Fasilitas & Tempat', singular: 'Fasilitas / Tempat' },
  'page-facilities': { group: NAV_GROUPS.resort },
  'page-dining': { group: NAV_GROUPS.resort },
  'page-experiences': { group: NAV_GROUPS.resort },
  'page-nearby': { group: NAV_GROUPS.resort },

  offers: { group: NAV_GROUPS.stories, label: 'Daftar Promo' },
  'journal-articles': { group: NAV_GROUPS.stories, label: 'Artikel Jurnal', singular: 'Artikel' },
  'gallery-items': { group: NAV_GROUPS.stories, label: 'Foto Galeri', singular: 'Foto Galeri' },
  testimonials: { group: NAV_GROUPS.stories },
  'page-offers': { group: NAV_GROUPS.stories },
  'page-journal': { group: NAV_GROUPS.stories },
  'page-gallery': { group: NAV_GROUPS.stories },

  media: { group: NAV_GROUPS.media },

  users: { group: NAV_GROUPS.settings },
  'site-settings': { group: NAV_GROUPS.settings },

  'site-layout': { group: NAV_GROUPS.appearance },
  'ui-text': { group: NAV_GROUPS.appearance },
  'form-text': { group: NAV_GROUPS.appearance },
}
