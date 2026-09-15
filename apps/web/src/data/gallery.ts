import { ROOMS } from './rooms';

export type GalleryCategory =
  | 'All'
  | 'Rooms'
  | 'Resort'
  | 'Spa & Wellness'
  | 'Wedding'
  | 'Dining'
  | 'Facilities'
  | 'Landscape';

export interface GalleryItem {
  id: string;
  category: Exclude<GalleryCategory, 'All'>;
  title: string;
  image: string;
  aspectRatio?: 'square' | 'wide' | 'tall';
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'All',
  'Rooms',
  'Resort',
  'Spa & Wellness',
  'Wedding',
  'Dining',
  'Facilities',
  'Landscape',
];

export const GALLERY_ITEMS: GalleryItem[] = [
  // Wedding / La Kana Chapel
  {
    id: 'w-1',
    category: 'Wedding',
    title: 'La Kana Glass Chapel at Sunset',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'wide',
  },
  {
    id: 'w-2',
    category: 'Wedding',
    title: 'Holy Matrimony Altar Setup',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'tall',
  },
  {
    id: 'w-3',
    category: 'Wedding',
    title: 'Sky Lawn Evening Reception',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'wide',
  },

  // Rooms
  {
    id: 'r-1',
    category: 'Rooms',
    title: 'Aurora Junior Suite & Balcony',
    image: ROOMS.find((r) => r.slug === 'aurora-junior-suite')?.images[0] || '',
    aspectRatio: 'wide',
  },
  {
    id: 'r-2',
    category: 'Rooms',
    title: 'Grand Suite Private Jacuzzi',
    image: ROOMS.find((r) => r.slug === 'grand-suite')?.images[0] || '',
    aspectRatio: 'square',
  },
  {
    id: 'r-3',
    category: 'Rooms',
    title: 'President Suite Panoramic Bedroom',
    image: ROOMS.find((r) => r.slug === 'president-suite')?.images[0] || '',
    aspectRatio: 'wide',
  },
  {
    id: 'r-4',
    category: 'Rooms',
    title: 'Family Suite Room Double View',
    image: ROOMS.find((r) => r.slug === 'family-suite-room')?.images[0] || '',
    aspectRatio: 'square',
  },
  {
    id: 'r-5',
    category: 'Rooms',
    title: 'Prince Suite Balcony Vista',
    image: ROOMS.find((r) => r.slug === 'prince-suite')?.images[0] || '',
    aspectRatio: 'tall',
  },
  {
    id: 'r-6',
    category: 'Rooms',
    title: 'Villa 1 Big Room Traditional Upper Floor',
    image: ROOMS.find((r) => r.slug === 'villa-1-big-room')?.images[0] || '',
    aspectRatio: 'wide',
  },

  // Spa & Wellness
  {
    id: 's-1',
    category: 'Spa & Wellness',
    title: 'Spa on the Sky Treatment Sanctuary',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'wide',
  },
  {
    id: 's-2',
    category: 'Spa & Wellness',
    title: 'Traditional Javanese Herbal Bath Ritual',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'square',
  },
  {
    id: 's-3',
    category: 'Spa & Wellness',
    title: 'Herbal Thermal Sauna & Steam Suite',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'tall',
  },
  {
    id: 's-4',
    category: 'Spa & Wellness',
    title: 'Hydrotherapy Whirlpool Jets',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'square',
  },

  // Resort & Landscape
  {
    id: 'res-1',
    category: 'Resort',
    title: 'Susan Spa & Resort Highland Sanctuary',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'wide',
  },
  {
    id: 'res-2',
    category: 'Resort',
    title: 'Lush Tropical Hillside Architecture',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'square',
  },
  {
    id: 'land-1',
    category: 'Landscape',
    title: 'Mount Ungaran Misty Sunrise at 1,100m ASL',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'wide',
  },
  {
    id: 'land-2',
    category: 'Landscape',
    title: 'Valley Cloud Inversion from Observation Deck',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'tall',
  },

  // Dining
  {
    id: 'd-1',
    category: 'Dining',
    title: 'Sky Garden Candlelight Dining',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'wide',
  },
  {
    id: 'd-2',
    category: 'Dining',
    title: 'Artisan Coffee & Panoramic Cafe',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'square',
  },

  // Facilities
  {
    id: 'f-1',
    category: 'Facilities',
    title: 'Heated Mountain Infinity Swimming Pool',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'wide',
  },
  {
    id: 'f-2',
    category: 'Facilities',
    title: 'Kids Outdoor Adventure Playground',
    image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'square',
  },
  {
    id: 'f-3',
    category: 'Facilities',
    title: 'Highland Fitness Center with Garden View',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop',
    aspectRatio: 'tall',
  },
];
