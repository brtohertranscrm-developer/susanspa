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

export type IconKey =
  | 'dashboard'
  | 'file'
  | 'file-plus'
  | 'home'
  | 'info'
  | 'phone'
  | 'calendar-check'
  | 'shield'
  | 'scroll'
  | 'bed'
  | 'hotel'
  | 'sparkles'
  | 'flower'
  | 'heart'
  | 'church'
  | 'presentation'
  | 'calendar'
  | 'utensils'
  | 'palm'
  | 'waves'
  | 'mountain'
  | 'map'
  | 'tag'
  | 'percent'
  | 'notebook'
  | 'book'
  | 'image'
  | 'images'
  | 'message'
  | 'folder'
  | 'users'
  | 'settings'
  | 'sliders'
  | 'layout'
  | 'type'
  | 'clipboard'

// Ikon setiap koleksi dan global di sidebar.
export const ENTITY_ICONS: Record<string, IconKey> = {
  pages: 'file-plus',
  'page-home': 'home',
  'page-about': 'info',
  'page-contact': 'phone',
  'page-reserve': 'calendar-check',
  'page-privacy': 'shield',
  'page-terms': 'scroll',
  rooms: 'bed',
  'page-rooms': 'hotel',
  'spa-treatments': 'sparkles',
  'page-spa': 'flower',
  'wedding-packages': 'heart',
  'page-wedding': 'church',
  'page-ballroom': 'presentation',
  'page-events': 'calendar',
  'resort-content': 'palm',
  'page-facilities': 'waves',
  'page-dining': 'utensils',
  'page-experiences': 'mountain',
  'page-nearby': 'map',
  offers: 'tag',
  'journal-articles': 'notebook',
  'gallery-items': 'image',
  testimonials: 'message',
  'page-offers': 'percent',
  'page-journal': 'book',
  'page-gallery': 'images',
  media: 'folder',
  users: 'users',
  'site-settings': 'settings',
  'site-layout': 'layout',
  'ui-text': 'type',
  'form-text': 'clipboard',
}

type SidebarGroup = { group: string; label: string; icon: IconKey }

// Susunan sidebar: grup NAV_GROUPS tampil sebagai satu baris yang bisa dibuka.
export const SIDEBAR: { top: SidebarGroup[]; sections: { title: string; groups: SidebarGroup[] }[] } = {
  top: [{ group: NAV_GROUPS.main, label: 'Halaman Utama', icon: 'file' }],
  sections: [
    {
      title: 'Konten',
      groups: [
        { group: NAV_GROUPS.rooms, label: 'Kamar & Villa', icon: 'bed' },
        { group: NAV_GROUPS.spa, label: 'Spa', icon: 'sparkles' },
        { group: NAV_GROUPS.wedding, label: 'Wedding & Acara', icon: 'heart' },
        { group: NAV_GROUPS.resort, label: 'Fasilitas & Wisata', icon: 'utensils' },
        { group: NAV_GROUPS.stories, label: 'Promo, Jurnal & Galeri', icon: 'tag' },
        { group: NAV_GROUPS.media, label: 'Pustaka Media', icon: 'folder' },
      ],
    },
    {
      title: 'Situs',
      groups: [
        { group: NAV_GROUPS.appearance, label: 'Header, Menu & Footer', icon: 'layout' },
        { group: NAV_GROUPS.settings, label: 'Pengaturan', icon: 'sliders' },
      ],
    },
  ],
}
