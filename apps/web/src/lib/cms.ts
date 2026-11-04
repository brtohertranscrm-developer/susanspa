import 'server-only';

import { cache } from 'react';
import { websiteImageSlots } from '@susan/contracts';
import { resolveCmsMedia, type CmsMedia } from './cms-media';
import type { WebsiteImages } from '@/components/global/WebsiteImages';
import { richTextParagraphs } from './cms-richtext';

import { resolveRoomCatalog, type CmsRoom } from '@/lib/room-catalog';
import { SPA_TREATMENTS } from '@/data/spa';
import { WEDDING_PACKAGES } from '@/data/weddings';
import { OFFERS } from '@/data/offers';
import { FACILITIES } from '@/data/facilities';
import { GALLERY_ITEMS } from '@/data/gallery';
import { DINING_VENUES } from '@/data/dining';
import { EXPERIENCES } from '@/data/experiences';
import { NEARBY_DESTINATIONS } from '@/data/nearby';
import { JOURNAL_ARTICLES } from '@/data/journal';
import type { 
  Room, SpaTreatment, WeddingPackage, Offer, 
  ResortFacility, GalleryItem, DiningVenue, 
  Experience, NearbyDestination, JournalArticle 
} from '@/types';

interface CmsListResponse<T> {
  docs: T[];
}

interface CmsContent {
  id: string | number;
  slug: string;
  title: string;
  summary?: string | null;
  description?: string | null;
  durationMinutes?: number | null;
  priceLabel?: number | null;
  benefits?: Array<{ label: string }> | null;
  inclusions?: Array<{ label: string }> | null;
  featuredImage?: CmsMedia | null;
  image?: (CmsMedia & { width?: number; height?: number }) | null;
  coverImage?: CmsMedia | null;
  capacity?: number | null;
  venue?: string | null;
  validUntil?: string | null;
  terms?: string | null;
  kind?: string | null;
  location?: string | null;
  distanceLabel?: string | null;
  category?: string | null;
  publishedAt?: string | null;
  excerpt?: string | null;
  content?: Parameters<typeof richTextParagraphs>[0];
}

const cmsApiUrl = process.env.CMS_API_URL?.replace(/\/$/, '');
const cmsMediaUrl = process.env.CMS_PUBLIC_URL?.replace(/\/$/, '') || cmsApiUrl;

export async function getCmsCollection<T>(
  collection: string,
  fallback: T[],
  options: { locale?: 'id' | 'en'; limit?: number; depth?: number } = {},
): Promise<T[]> {
  if (!cmsApiUrl) return fallback;

  const query = new URLSearchParams({
    locale: options.locale || 'id',
    limit: String(options.limit || 100),
    depth: String(options.depth ?? 2),
    sort: 'sortOrder',
    draft: 'false',
    'where[_status][equals]': 'published',
  });

  try {
    const response = await fetch(`${cmsApiUrl}/api/${collection}?${query}`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) {
      console.warn(`CMS collection ${collection} unavailable (${response.status}); using fallback.`);
      return fallback;
    }
    const data = (await response.json()) as CmsListResponse<T>;
    return Array.isArray(data.docs) && data.docs.length > 0 ? data.docs : fallback;
  } catch {
    console.warn(`CMS collection ${collection} could not be loaded; using fallback.`);
    return fallback;
  }
}

export async function getRooms(locale: 'id' | 'en' = 'id'): Promise<Room[]> {
  const documents = await getCmsCollection<CmsRoom>('rooms', [], { locale, depth: 2 });
  return resolveRoomCatalog(documents, cmsMediaUrl);
}

export async function getSpaTreatments(locale: 'id' | 'en' = 'id'): Promise<SpaTreatment[]> {
  const docs = await getCmsCollection<CmsContent>('spa-treatments', [], { locale, depth: 1 });
  if (!docs || docs.length === 0) return SPA_TREATMENTS;
  return docs.map((doc) => ({
    id: doc.slug,
    slug: doc.slug,
    title: doc.title,
    category: 'Spa',
    tagline: doc.summary || '',
    durationMinutes: doc.durationMinutes || 60,
    priceIdr: doc.priceLabel || 0,
    benefits: (doc.benefits || []).map((benefit) => benefit.label),
    description: doc.description || '',
    image: resolveCmsMedia(doc.featuredImage, SPA_TREATMENTS.find((item) => item.id === doc.slug)?.image || SPA_TREATMENTS[0].image, cmsMediaUrl),
    featured: true,
  }));
}

export async function getWeddingPackages(locale: 'id' | 'en' = 'id'): Promise<WeddingPackage[]> {
  const docs = await getCmsCollection<CmsContent>('wedding-packages', [], { locale, depth: 1 });
  if (!docs || docs.length === 0) return WEDDING_PACKAGES;
  return docs.map((doc) => ({
    id: doc.slug,
    slug: doc.slug,
    name: doc.title,
    venue: doc.venue || '',
    capacity: String(doc.capacity || 100),
    priceIdr: doc.priceLabel || 0,
    tagline: doc.summary || '',
    description: doc.description || '',
    inclusions: (doc.inclusions || []).map((inclusion) => inclusion.label),
    image: resolveCmsMedia(doc.featuredImage, WEDDING_PACKAGES.find((item) => item.id === doc.slug)?.image || WEDDING_PACKAGES[0].image, cmsMediaUrl),
    featured: true,
  }));
}

export async function getOffers(locale: 'id' | 'en' = 'id'): Promise<Offer[]> {
  const docs = await getCmsCollection<CmsContent>('offers', [], { locale, depth: 1 });
  if (!docs || docs.length === 0) return OFFERS;
  return docs.map((doc) => ({
    id: doc.slug,
    slug: doc.slug,
    title: doc.title,
    badge: 'Special Offer',
    validity: doc.validUntil || '',
    inclusions: [],
    category: 'Offer',
    validUntil: doc.validUntil || '',
    shortDescription: doc.summary || '',
    description: doc.description || '',
    terms: doc.terms || '',
    image: resolveCmsMedia(doc.featuredImage, OFFERS.find((item) => item.id === doc.slug)?.image || OFFERS[0].image, cmsMediaUrl),
    featured: true,
  }));
}

export async function getFacilities(locale: 'id' | 'en' = 'id'): Promise<ResortFacility[]> {
  const docs = await getCmsCollection<CmsContent>('resort-content', [], { locale, depth: 1 });
  const facilities = docs.filter((document) => document.kind === 'facility');
  if (!facilities || facilities.length === 0) return FACILITIES;
  return facilities.map((doc) => ({
    id: doc.slug,
    slug: doc.slug,
    title: doc.title,
    category: 'Facility',
    description: doc.description || '',
    location: doc.location || '',
    operatingHours: '',
    image: resolveCmsMedia(doc.featuredImage, FACILITIES.find((item) => item.id === doc.slug)?.image || FACILITIES[0].image, cmsMediaUrl),
  }));
}

export async function getGalleryItems(locale: 'id' | 'en' = 'id'): Promise<GalleryItem[]> {
  const docs = await getCmsCollection<CmsContent>('gallery-items', [], { locale, depth: 1 });
  if (!docs || docs.length === 0) return GALLERY_ITEMS;
  return docs.map((doc) => ({
    id: String(doc.id),
    title: doc.title || '',
    category: ({ Rooms: 'Kamar & Villa', Spa: 'Spa & Wellness', Weddings: 'Pernikahan', 'La Kana Chapel': 'Pernikahan', Dining: 'Restoran', Grounds: 'Kawasan Resort' } as Record<string, string>)[doc.category || ''] || doc.category || 'Kawasan Resort',
    image: resolveCmsMedia(doc.image, GALLERY_ITEMS.find((item) => item.id === doc.slug)?.image || GALLERY_ITEMS[0].image, cmsMediaUrl),
    width: doc.image?.width || 800,
    height: doc.image?.height || 600,
    aspectRatio: (doc.image?.height || 600) > (doc.image?.width || 800) ? 'tall' : (doc.image?.width || 800) > (doc.image?.height || 600) ? 'wide' : 'square',
  }));
}

export async function getDining(locale: 'id' | 'en' = 'id'): Promise<DiningVenue[]> {
  const docs = await getCmsCollection<CmsContent>('resort-content', [], { locale, depth: 1 });
  const dining = docs.filter((document) => document.kind === 'dining');
  if (!dining || dining.length === 0) return DINING_VENUES;
  return dining.map((doc) => ({
    id: doc.slug,
    name: doc.title,
    subtitle: doc.summary || '',
    cuisine: doc.location || 'Local & International',
    ambiance: 'Elegant',
    operatingHours: '07:00 - 22:00',
    description: doc.description || '',
    image: resolveCmsMedia(doc.featuredImage, DINING_VENUES.find((item) => item.id === doc.slug)?.image || DINING_VENUES[0].image, cmsMediaUrl),
    menuHighlights: [],
  }));
}

export async function getExperiences(locale: 'id' | 'en' = 'id'): Promise<Experience[]> {
  const docs = await getCmsCollection<CmsContent>('resort-content', [], { locale, depth: 1 });
  const experiences = docs.filter((document) => document.kind === 'experience');
  if (!experiences || experiences.length === 0) return EXPERIENCES;
  return experiences.map((doc) => ({
    id: doc.slug,
    slug: doc.slug,
    title: doc.title,
    category: 'Nature & Adventure',
    duration: '2 Hours',
    location: doc.location || 'Bandungan',
    description: doc.description || doc.summary || '',
    image: resolveCmsMedia(doc.featuredImage, EXPERIENCES.find((item) => item.id === doc.slug)?.image || EXPERIENCES[0].image, cmsMediaUrl),
    highlights: [],
  }));
}

export async function getNearbyDestinations(locale: 'id' | 'en' = 'id'): Promise<NearbyDestination[]> {
  const docs = await getCmsCollection<CmsContent>('resort-content', [], { locale, depth: 1 });
  const nearby = docs.filter((document) => document.kind === 'nearby');
  if (!nearby || nearby.length === 0) return NEARBY_DESTINATIONS;
  return nearby.map((doc) => ({
    id: doc.slug,
    slug: doc.slug,
    name: doc.title,
    distance: doc.distanceLabel || '10 mins',
    description: doc.description || doc.summary || '',
    image: resolveCmsMedia(doc.featuredImage, NEARBY_DESTINATIONS.find((item) => item.id === doc.slug)?.image || NEARBY_DESTINATIONS[0].image, cmsMediaUrl),
  }));
}

export async function getJournalArticles(locale: 'id' | 'en' = 'id'): Promise<JournalArticle[]> {
  const docs = await getCmsCollection<CmsContent>('journal-articles', [], { locale, depth: 1 });
  if (!docs || docs.length === 0) return JOURNAL_ARTICLES;
  return docs.map((doc) => ({
    id: doc.slug,
    slug: doc.slug,
    title: doc.title,
    category: (['Wellness', 'Bandungan Guide', 'Weddings', 'Resort News'].includes(doc.category || '') ? doc.category : 'Resort News') as JournalArticle['category'],
    publishedAt: doc.publishedAt || new Date().toISOString(),
    readTime: '5 min read',
    excerpt: doc.excerpt || '',
    content: richTextParagraphs(doc.content),
    author: {
      name: 'Susan Spa',
      role: 'Editorial',
      avatar: '/images/susan-spa-logo.png',
    },
    coverImage: resolveCmsMedia(doc.coverImage, JOURNAL_ARTICLES.find((item) => item.slug === doc.slug)?.coverImage || JOURNAL_ARTICLES[0].coverImage, cmsMediaUrl),
  }));
}

export const getWebsiteImages = cache(async (): Promise<WebsiteImages> => {
  if (!cmsApiUrl) return {};
  try {
    const response = await fetch(
      `${cmsApiUrl}/api/globals/site-settings?depth=1&locale=id&draft=false`,
      { cache: 'no-store', headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(4000) },
    );
    if (!response.ok) {
      console.warn(`CMS site settings unavailable (${response.status}); using default images.`);
      return {};
    }
    const settings = await response.json();
    const images: WebsiteImages = {};
    for (const { name } of websiteImageSlots) {
      const media = settings.websiteImages?.[name] as CmsMedia | undefined;
      const url = resolveCmsMedia(media, '', cmsMediaUrl);
      if (url) images[name] = { url, alt: media?.alt || undefined };
    }
    const socialUrl = resolveCmsMedia(settings.defaultSeoImage, '', cmsMediaUrl);
    if (socialUrl) images.socialImage = { url: socialUrl, alt: settings.defaultSeoImage?.alt || undefined };
    return images;
  } catch {
    console.warn('CMS site settings could not be loaded; using default images.');
    return {};
  }
});
