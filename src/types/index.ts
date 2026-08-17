export interface Room {
  id: string;
  slug: string;
  name: string;
  category: 'Villa' | 'Suite' | 'Deluxe' | 'Superior' | 'Family';
  tagline: string;
  description: string;
  longDescription: string;
  sizeSqm: number;
  capacityAdults: number;
  capacityChildren: number;
  bedType: string;
  view: string;
  startingPriceIdr: number;
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
  category: 'Signature' | 'Body Therapy' | 'Facial & Beauty' | 'Couples Sanctuary' | 'Thermal Baths';
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
  venue: 'La Kana Chapel' | 'Sky Garden Lawn' | 'Grand Ballroom' | 'Poolside Oasis';
  guestCapacity: string;
  priceStartingIdr: number;
  tagline: string;
  description: string;
  inclusions: string[];
  image: string;
  featured: boolean;
}

export interface Facility {
  id: string;
  title: string;
  category: 'Wellness' | 'Leisure' | 'Dining' | 'Events' | 'Family';
  description: string;
  operatingHours: string;
  image: string;
  highlights: string[];
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
  name: string;
  distanceKm: number;
  driveTimeMinutes: number;
  category: 'Historical' | 'Nature' | 'Family' | 'Cultural';
  description: string;
  image: string;
  tips: string;
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
