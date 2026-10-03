import 'server-only';

import { resolveRoomCatalog, type CmsRoom } from '@/lib/room-catalog';
import type { Room, SpaTreatment, WeddingPackage, Offer, ResortFacility, GalleryItem } from '@/types';
import { SPA_TREATMENTS } from '@/data/spa';
import { WEDDING_PACKAGES } from '@/data/weddings';
import { OFFERS } from '@/data/offers';
import { FACILITIES } from '@/data/facilities';
import { GALLERY_ITEMS } from '@/data/gallery';

interface CmsListResponse<T> {
  docs: T[];
}

const cmsApiUrl = process.env.CMS_API_URL?.replace(/\/$/, '');

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
  });

  try {
    const response = await fetch(`${cmsApiUrl}/api/${collection}?${query}`, {
      next: { revalidate: 300 },
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return fallback;
    const data = (await response.json()) as CmsListResponse<T>;
    return data.docs.length > 0 ? data.docs : fallback;
  } catch {
    return fallback;
  }
}

export async function getRooms(locale: 'id' | 'en' = 'id'): Promise<Room[]> {
  const documents = await getCmsCollection<CmsRoom>('rooms', [], { locale, depth: 2 });
  return resolveRoomCatalog(documents, cmsApiUrl);
}

export async function getSpaTreatments(locale: 'id' | 'en' = 'id'): Promise<SpaTreatment[]> {
  const docs = await getCmsCollection<any>('spa-treatments', [], { locale, depth: 1 });
  if (!docs || docs.length === 0) return SPA_TREATMENTS;
  return docs.map((doc: any) => ({
    id: doc.slug,
    slug: doc.slug,
    title: doc.title,
    category: 'Spa',
    tagline: doc.summary || '',
    durationMinutes: doc.durationMinutes || 60,
    priceIdr: doc.priceLabel || 0,
    benefits: (doc.benefits || []).map((b: any) => b.label),
    description: doc.description || '',
    image: doc.featuredImage?.url || SPA_TREATMENTS[0].image,
    featured: true,
  }));
}

export async function getWeddingPackages(locale: 'id' | 'en' = 'id'): Promise<WeddingPackage[]> {
  const docs = await getCmsCollection<any>('wedding-packages', [], { locale, depth: 1 });
  if (!docs || docs.length === 0) return WEDDING_PACKAGES;
  return docs.map((doc: any) => ({
    id: doc.slug,
    slug: doc.slug,
    title: doc.title,
    venue: doc.venue || '',
    capacity: doc.capacity || 100,
    priceIdr: doc.priceLabel || 0,
    tagline: doc.summary || '',
    description: doc.description || '',
    inclusions: (doc.inclusions || []).map((i: any) => i.label),
    image: doc.featuredImage?.url || WEDDING_PACKAGES[0].image,
    featured: true,
  }));
}

export async function getOffers(locale: 'id' | 'en' = 'id'): Promise<Offer[]> {
  const docs = await getCmsCollection<any>('offers', [], { locale, depth: 1 });
  if (!docs || docs.length === 0) return OFFERS;
  return docs.map((doc: any) => ({
    id: doc.slug,
    slug: doc.slug,
    title: doc.title,
    category: 'Offer',
    validUntil: doc.validUntil || '',
    shortDescription: doc.summary || '',
    description: doc.description || '',
    terms: doc.terms || '',
    image: doc.featuredImage?.url || OFFERS[0].image,
    featured: true,
  }));
}

export async function getFacilities(locale: 'id' | 'en' = 'id'): Promise<ResortFacility[]> {
  const docs = await getCmsCollection<any>('resort-content', [], { locale, depth: 1 });
  const facilities = docs.filter((d: any) => d.kind === 'facility');
  if (!facilities || facilities.length === 0) return FACILITIES;
  return facilities.map((doc: any) => ({
    id: doc.slug,
    slug: doc.slug,
    name: doc.title,
    category: 'Facility',
    description: doc.description || '',
    location: doc.location || '',
    operatingHours: '',
    image: doc.featuredImage?.url || FACILITIES[0].image,
  }));
}

export async function getGalleryItems(locale: 'id' | 'en' = 'id'): Promise<GalleryItem[]> {
  const docs = await getCmsCollection<any>('gallery-items', [], { locale, depth: 1 });
  if (!docs || docs.length === 0) return GALLERY_ITEMS;
  return docs.map((doc: any) => ({
    id: doc.id,
    title: doc.title || '',
    category: 'Resort',
    imageUrl: doc.image?.url || GALLERY_ITEMS[0].imageUrl,
    width: doc.image?.width || 800,
    height: doc.image?.height || 600,
  }));
}
