import { ROOMS } from './rooms';

export type GalleryCategory =
  | 'Semua'
  | 'Kamar & Villa'
  | 'Kawasan Resort'
  | 'Spa & Wellness'
  | 'Pernikahan'
  | 'Restoran'
  | 'Fasilitas'
  | 'Lanskap Alam';

export interface GalleryItem {
  id: string;
  category: Exclude<GalleryCategory, 'Semua'>;
  title: string;
  image: string;
  aspectRatio?: 'square' | 'wide' | 'tall';
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'Semua',
  'Kamar & Villa',
  'Kawasan Resort',
  'Spa & Wellness',
  'Pernikahan',
  'Restoran',
  'Fasilitas',
  'Lanskap Alam',
];

export const GALLERY_ITEMS: GalleryItem[] = [
  // Wedding / La Kana Chapel
  {
    id: 'w-1',
    category: 'Pernikahan',
    title: 'La Kana Glass Chapel',
    image: '/images/wedding/wedding-chapel-1.jpg',
    aspectRatio: 'wide',
  },
  {
    id: 'w-2',
    category: 'Pernikahan',
    title: 'Penataan Altar & Suasana Pernikahan',
    image: '/images/wedding/wedding-chapel-2.jpg',
    aspectRatio: 'tall',
  },
  {
    id: 'w-3',
    category: 'Pernikahan',
    title: 'Keanggunan Venue La Kana',
    image: '/images/wedding/wedding-chapel-1.jpg',
    aspectRatio: 'wide',
  },

  // Rooms
  {
    id: 'r-1',
    category: 'Kamar & Villa',
    title: 'Aurora Junior Suite & Balkon Pribadi',
    image: ROOMS.find((r) => r.slug === 'aurora-junior-suite')?.images[0] || '',
    aspectRatio: 'wide',
  },
  {
    id: 'r-2',
    category: 'Kamar & Villa',
    title: 'Jacuzzi Pribadi di Grand Suite',
    image: ROOMS.find((r) => r.slug === 'grand-suite')?.images[0] || '',
    aspectRatio: 'square',
  },
  {
    id: 'r-3',
    category: 'Kamar & Villa',
    title: 'President Suite dengan Panorama Luas',
    image: ROOMS.find((r) => r.slug === 'president-suite')?.images[0] || '',
    aspectRatio: 'wide',
  },
  {
    id: 'r-4',
    category: 'Kamar & Villa',
    title: 'Family Suite Room Double View',
    image: ROOMS.find((r) => r.slug === 'family-suite-room')?.images[0] || '',
    aspectRatio: 'square',
  },
  {
    id: 'r-5',
    category: 'Kamar & Villa',
    title: 'Prince Suite dengan Pemandangan Balkon',
    image: ROOMS.find((r) => r.slug === 'prince-suite')?.images[0] || '',
    aspectRatio: 'tall',
  },
  {
    id: 'r-6',
    category: 'Kamar & Villa',
    title: 'Villa 1 Big Room Bernuansa Kayu Hangat',
    image: ROOMS.find((r) => r.slug === 'villa-1-big-room')?.images[0] || '',
    aspectRatio: 'wide',
  },

  // Spa & Wellness
  {
    id: 's-1',
    category: 'Spa & Wellness',
    title: 'Ruang Perawatan Spa on the Sky',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'wide',
  },
  {
    id: 's-2',
    category: 'Spa & Wellness',
    title: 'Ritual Mandi Rempah Tradisional Jawa',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'square',
  },
  {
    id: 's-3',
    category: 'Spa & Wellness',
    title: 'Thermal Sauna & Ruang Steam Herbal',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'tall',
  },
  {
    id: 's-4',
    category: 'Spa & Wellness',
    title: 'Kolam Jacuzzi Hydrotherapy Hangat',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'square',
  },

  // Resort & Landscape
  {
    id: 'res-1',
    category: 'Kawasan Resort',
    title: 'Kawasan Susan Spa & Resort di Dataran Tinggi',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'wide',
  },
  {
    id: 'res-2',
    category: 'Kawasan Resort',
    title: 'Arsitektur Tropis di Lereng Bukit Hijau',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'square',
  },
  {
    id: 'land-1',
    category: 'Lanskap Alam',
    title: 'Fajar Gunung Ungaran dari Ketinggian ~1.100 mdpl',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'wide',
  },
  {
    id: 'land-2',
    category: 'Lanskap Alam',
    title: 'Lautan Kabut dari Dek Observasi Resort',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'tall',
  },

  // Dining
  {
    id: 'd-1',
    category: 'Restoran',
    title: 'Santap Romantis di Sky Garden Cafe',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'wide',
  },
  {
    id: 'd-2',
    category: 'Restoran',
    title: 'Kopi Hangat & Panorama Alam di Cafe',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'square',
  },

  // Facilities
  {
    id: 'f-1',
    category: 'Fasilitas',
    title: 'Kolam Renang Air Hangat Menghadap Lembah',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'wide',
  },
  {
    id: 'f-2',
    category: 'Fasilitas',
    title: 'Taman Bermain Outdoor Anak',
    image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'square',
  },
  {
    id: 'f-3',
    category: 'Fasilitas',
    title: 'Pusat Kebugaran dengan Pemandangan Taman',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'tall',
  },
];
