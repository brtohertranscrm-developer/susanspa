export interface Room {
  id: string;
  slug: string;
  name: string;
  category: 'Villa' | 'Suite' | 'Deluxe' | 'Superior' | 'Family';
  tagline: string;
  description: string;
  longDescription: string;
  sizeSqm: number | null;
  capacityAdults: number | null;
  capacityChildren: number | null;
  bedType: string | null;
  view: string | null;
  startingPriceIdr: number | null;
  featured: boolean;
  images: string[];
  amenities: string[];
  highlights: string[];
  policies: string[];
}

export interface SpaTreatment {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  durationMinutes: number;
  priceIdr: number;
  benefits: string[];
  description: string;
  image: string;
  featured: boolean;
}

export interface WeddingPackage {
  id: string;
  slug: string;
  name: string;
  category?: string;
  capacity?: string;
  venue?: string | string[];
  guestCapacity?: string;
  priceStartingIdr?: number;
  tagline?: string;
  description: string;
  inclusions: string[];
  schedule?: string[];
  image?: string;
  images?: string[];
  featured?: boolean;
}

export interface Facility {
  id: string;
  title: string;
  category: string;
  description: string;
  operatingHours?: string;
  image?: string;
  highlights?: string[];
  iconName?: string;
}

export interface DiningVenue {
  id: string;
  name: string;
  subtitle: string;
  cuisine: string;
  ambiance: string;
  operatingHours: string;
  description: string;
  image: string;
  menuHighlights: string[];
}

export interface Experience {
  id: string;
  slug: string;
  title: string;
  category: 'Nature & Adventure' | 'Wellness & Mindfulness' | 'Cultural' | 'Romantic';
  duration: string;
  location: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface SpecialOffer {
  id: string;
  slug: string;
  title: string;
  badge: string;
  validity: string;
  inclusions: string[];
  description: string;
  image: string;
  featured: boolean;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Wellness' | 'Bandungan Guide' | 'Weddings' | 'Resort News';
  publishedAt: string;
  readTime: string;
  excerpt: string;
  content: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  quote?: string;
}

export interface NearbyDestination {
  id: string;
  slug: string;
  name: string;
  distance: string;
  distanceKm?: number;
  driveTimeMinutes?: number;
  address?: string;
  category?: 'Historical' | 'Nature' | 'Family' | 'Cultural' | string;
  description: string;
  image: string;
  images?: string[];
  tips?: string;
  mapUrl?: string;
}

export interface Testimonial {
  id: string;
  guestName: string;
  stayCategory: string;
  origin: string;
  rating: number;
  quote: string;
  date: string;
  avatar: string;
}

export interface BookingSearchQuery {
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  roomType?: string;
}

export interface LeadInquiryPayload {
  inquiryType: 'room' | 'spa' | 'wedding' | 'event' | 'general';
  fullName: string;
  email: string;
  phoneWhatsApp: string;
  targetDate?: string;
  guestCount?: number;
  preferredRoomOrVenue?: string;
  specialRequests?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  width?: number;
  height?: number;
}

export type Offer = SpecialOffer;
export type ResortFacility = Facility;
