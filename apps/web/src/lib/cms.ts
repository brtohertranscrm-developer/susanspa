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
import { GALLERY_ITEMS, type GalleryCategory, type GalleryItem } from '@/data/gallery';
import { DINING_VENUES } from '@/data/dining';
import { EXPERIENCES } from '@/data/experiences';
import { NEARBY_DESTINATIONS } from '@/data/nearby';
import { JOURNAL_ARTICLES } from '@/data/journal';
import type {
  Room, SpaTreatment, WeddingPackage, Offer,
  ResortFacility, DiningVenue,
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
  categoryLabel?: string | null;
  facilityCategory?: ResortFacility['category'] | null;
  badge?: string | null;
  validityLabel?: string | null;
  highlights?: Array<{ label: string }> | null;
  schedule?: Array<{ label: string }> | null;
  gallery?: Array<{ image?: CmsMedia | null }> | null;
  operatingHours?: string | null;
  duration?: string | null;
  address?: string | null;
  tips?: string | null;
  mapUrl?: string | null;
  readTime?: string | null;
  quote?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  authorName?: string | null;
  authorRole?: string | null;
  authorAvatar?: CmsMedia | null;
}

// Kategori galeri di CMS dipetakan ke tab kategori di halaman galeri.
const GALLERY_CATEGORY_BY_CMS: Record<string, Exclude<GalleryCategory, 'Semua'>> = {
  Rooms: 'Kamar & Villa',
  Spa: 'Spa & Wellness',
  Weddings: 'Pernikahan',
  'La Kana Chapel': 'Pernikahan',
  Dining: 'Restoran',
  Grounds: 'Kawasan Resort',
};

const cmsApiUrl = process.env.CMS_API_URL?.replace(/\/$/, '');
const cmsMediaUrl = process.env.CMS_PUBLIC_URL?.replace(/\/$/, '') || cmsApiUrl;

if (!cmsApiUrl) {
  console.warn('CMS_API_URL belum diisi. Website memakai data bawaan dari kode.');
}

const publishedDateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Jakarta',
});

const formatPublishedAt = (value?: string | null) => {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? publishedDateFormatter.format(date) : undefined;
};

const labels = (rows: unknown): string[] =>
  Array.isArray(rows) ? rows.map((row) => row?.label).filter((label): label is string => typeof label === 'string' && Boolean(label.trim())) : [];

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
      console.warn(`Koleksi ${collection} dari CMS gagal dimuat: HTTP ${response.status}`);
      return fallback;
    }
    const data = (await response.json()) as CmsListResponse<T>;
    return data.docs.length > 0 ? data.docs : fallback;
  } catch (error) {
    console.warn(`Koleksi ${collection} dari CMS tidak bisa dihubungi:`, error);
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
  return docs.map((doc: CmsContent) => ({
    id: doc.slug,
    slug: doc.slug,
    title: doc.title,
    category: doc.categoryLabel || 'Spa',
    tagline: doc.summary || '',
    durationMinutes: doc.durationMinutes || 60,
    priceIdr: doc.priceLabel || 0,
    benefits: (doc.benefits || []).map((benefit) => benefit.label),
    description: doc.description || '',
    image: resolveCmsMedia(doc.featuredImage, '', cmsMediaUrl) || SPA_TREATMENTS[0].image,
    featured: true,
  }));
}

export async function getWeddingPackages(locale: 'id' | 'en' = 'id'): Promise<WeddingPackage[]> {
  const docs = await getCmsCollection<CmsContent>('wedding-packages', [], { locale, depth: 1 });
  if (!docs || docs.length === 0) return WEDDING_PACKAGES;
  return docs.map((doc: CmsContent) => {
    // Field yang belum diisi di CMS diambil dari data bawaan dengan slug yang sama.
    const reference = WEDDING_PACKAGES.find((item) => item.slug === doc.slug);
    const image: string | undefined = resolveCmsMedia(doc.featuredImage, '', cmsMediaUrl);
    const inclusions: string[] = labels(doc.inclusions);
    const schedule = labels(doc.schedule);
    const gallery: string[] = (doc.gallery || []).map((row) => resolveCmsMedia(row.image, '', cmsMediaUrl)).filter(Boolean);
    return {
      ...reference,
      id: doc.slug,
      slug: doc.slug,
      name: doc.title,
      capacity: doc.capacity ? `${doc.capacity} Tamu Undangan` : reference?.capacity,
      venue: doc.venue || reference?.venue,
      priceStartingIdr: doc.priceLabel ?? reference?.priceStartingIdr,
      tagline: doc.summary || reference?.tagline || '',
      description: doc.description || reference?.description || '',
      inclusions: inclusions.length > 0 ? inclusions : (reference?.inclusions ?? []),
      category: doc.category || reference?.category,
      schedule: schedule.length > 0 ? schedule : reference?.schedule,
      image: image || reference?.image || WEDDING_PACKAGES[0].image,
      images: image ? [image, ...gallery] : gallery.length > 0 ? gallery : reference?.images,
      featured: true,
    };
  });
}

export async function getOffers(locale: 'id' | 'en' = 'id'): Promise<Offer[]> {
  const docs = await getCmsCollection<CmsContent>('offers', [], { locale, depth: 1 });
  if (!docs || docs.length === 0) return OFFERS;
  return docs.map((doc: CmsContent) => ({
    id: doc.slug,
    slug: doc.slug,
    title: doc.title,
    badge: doc.badge || 'Special Offer',
    validity: doc.validityLabel || formatPublishedAt(doc.validUntil) || '',
    inclusions: labels(doc.inclusions),
    category: 'Offer',
    validUntil: doc.validUntil || '',
    shortDescription: doc.summary || '',
    description: doc.description || '',
    terms: doc.terms || '',
    image: resolveCmsMedia(doc.featuredImage, '', cmsMediaUrl) || OFFERS[0].image,
    featured: true,
  }));
}

export async function getFacilities(locale: 'id' | 'en' = 'id'): Promise<ResortFacility[]> {
  const docs = await getCmsCollection<CmsContent>('resort-content', [], { locale, depth: 1 });
  const facilities = docs.filter((document: CmsContent) => document.kind === 'facility');
  if (!facilities || facilities.length === 0) return FACILITIES;
  return facilities.map((doc: CmsContent) => {
    const reference = FACILITIES.find((item) => item.id === doc.slug);
    const highlights = labels(doc.highlights);
    return {
      id: doc.slug,
      title: doc.title,
      category: doc.facilityCategory || reference?.category || 'Wellness',
      description: doc.description || doc.summary || '',
      operatingHours: doc.operatingHours || reference?.operatingHours || '',
      image: resolveCmsMedia(doc.featuredImage, '', cmsMediaUrl) || reference?.image || FACILITIES[0].image,
      highlights: highlights.length > 0 ? highlights : reference?.highlights,
    };
  });
}

export async function getGalleryItems(locale: 'id' | 'en' = 'id'): Promise<GalleryItem[]> {
  const docs = await getCmsCollection<CmsContent>('gallery-items', [], { locale, depth: 1 });
  if (!docs || docs.length === 0) return GALLERY_ITEMS;
  return docs.map((doc: CmsContent) => ({
    id: String(doc.id),
    title: doc.title || '',
    category: GALLERY_CATEGORY_BY_CMS[doc.category || ''] ?? 'Kawasan Resort',
    image: resolveCmsMedia(doc.image, GALLERY_ITEMS[0].image, cmsMediaUrl),
    aspectRatio: doc.image?.width && doc.image?.height
      ? (doc.image.width / doc.image.height > 1.25 ? 'wide' : doc.image.width / doc.image.height < 0.8 ? 'tall' : 'square')
      : 'square',
  }));
}

export async function getDining(locale: 'id' | 'en' = 'id'): Promise<DiningVenue[]> {
  const docs = await getCmsCollection<CmsContent>('resort-content', [], { locale, depth: 1 });
  const dining = docs.filter((document: CmsContent) => document.kind === 'dining');
  if (!dining || dining.length === 0) return DINING_VENUES;
  return dining.map((doc: CmsContent) => {
    const reference = DINING_VENUES.find((item) => item.id === doc.slug);
    const highlights = labels(doc.highlights);
    return {
      id: doc.slug,
      name: doc.title,
      subtitle: doc.summary || '',
      cuisine: doc.location || reference?.cuisine || '',
      ambiance: reference?.ambiance || '',
      operatingHours: doc.operatingHours || reference?.operatingHours || '',
      description: doc.description || '',
      image: resolveCmsMedia(doc.featuredImage, '', cmsMediaUrl) || reference?.image || DINING_VENUES[0].image,
      menuHighlights: highlights.length > 0 ? highlights : (reference?.menuHighlights ?? []),
    };
  });
}

export async function getExperiences(locale: 'id' | 'en' = 'id'): Promise<Experience[]> {
  const docs = await getCmsCollection<CmsContent>('resort-content', [], { locale, depth: 1 });
  const experiences = docs.filter((document: CmsContent) => document.kind === 'experience');
  if (!experiences || experiences.length === 0) return EXPERIENCES;
  return experiences.map((doc: CmsContent) => {
    const reference = EXPERIENCES.find((item) => item.slug === doc.slug);
    const highlights = labels(doc.highlights);
    return {
      id: doc.slug,
      slug: doc.slug,
      title: doc.title,
      category: doc.categoryLabel || reference?.category || '',
      duration: doc.duration || reference?.duration || '',
      location: doc.location || reference?.location || '',
      description: doc.description || doc.summary || '',
      image: resolveCmsMedia(doc.featuredImage, '', cmsMediaUrl) || reference?.image || EXPERIENCES[0].image,
      highlights: highlights.length > 0 ? highlights : (reference?.highlights ?? []),
    };
  });
}

export async function getNearbyDestinations(locale: 'id' | 'en' = 'id'): Promise<NearbyDestination[]> {
  const docs = await getCmsCollection<CmsContent>('resort-content', [], { locale, depth: 1 });
  const nearby = docs.filter((document: CmsContent) => document.kind === 'nearby');
  if (!nearby || nearby.length === 0) return NEARBY_DESTINATIONS;
  return nearby.map((doc: CmsContent) => {
    // Alamat, tips, dan tautan peta belum ada di CMS, jadi diambil dari data bawaan dengan slug yang sama.
    const reference = NEARBY_DESTINATIONS.find((item) => item.slug === doc.slug);
    const image: string | undefined = resolveCmsMedia(doc.featuredImage, '', cmsMediaUrl);
    return {
      ...reference,
      id: doc.slug,
      slug: doc.slug,
      name: doc.title,
      category: doc.categoryLabel || reference?.category,
      address: doc.address || reference?.address,
      tips: doc.tips || reference?.tips,
      mapUrl: doc.mapUrl || reference?.mapUrl,
      distance: doc.distanceLabel || reference?.distance || '',
      description: doc.description || doc.summary || reference?.description || '',
      image: image || reference?.image || NEARBY_DESTINATIONS[0].image,
      images: image ? [image] : reference?.images,
    };
  });
}

export async function getJournalArticles(locale: 'id' | 'en' = 'id'): Promise<JournalArticle[]> {
  const docs = await getCmsCollection<CmsContent>('journal-articles', [], { locale, depth: 1 });
  if (!docs || docs.length === 0) return JOURNAL_ARTICLES;
  return docs.map((doc: CmsContent) => {
    // Kutipan dan data penulis belum ada di CMS, jadi diambil dari data bawaan dengan slug yang sama.
    const reference = JOURNAL_ARTICLES.find((article) => article.slug === doc.slug);
    const content = richTextParagraphs(doc.content);
    return {
      ...reference,
      id: doc.slug,
      slug: doc.slug,
      title: doc.title,
      category: (['Wellness', 'Bandungan Guide', 'Weddings', 'Resort News'].includes(doc.category || '')
        ? doc.category : reference?.category || 'Resort News') as JournalArticle['category'],
      publishedAt: formatPublishedAt(doc.publishedAt) ?? reference?.publishedAt ?? '',
      readTime: doc.readTime || reference?.readTime || '',
      quote: doc.quote || reference?.quote,
      seoTitle: doc.seoTitle || undefined,
      seoDescription: doc.seoDescription || undefined,
      excerpt: doc.excerpt || reference?.excerpt || '',
      content: content.length > 0 ? content : (reference?.content ?? []),
      author: {
        name: doc.authorName || reference?.author.name || 'Susan Spa',
        role: doc.authorRole || reference?.author.role || 'Editorial',
        avatar: resolveCmsMedia(doc.authorAvatar, '', cmsMediaUrl) || reference?.author.avatar || '/images/susan-spa-logo.png',
      },
      coverImage: resolveCmsMedia(doc.coverImage, '', cmsMediaUrl) || reference?.coverImage || JOURNAL_ARTICLES[0].coverImage,
    };
  });
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
