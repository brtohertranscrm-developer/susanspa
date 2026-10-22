import 'server-only';

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

type RichTextNode = { type?: string; text?: string; children?: RichTextNode[] };

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

const richTextNodeText = (node: RichTextNode): string =>
  node.text ?? (node.children ?? []).map(richTextNodeText).join('');

// Isi jurnal dari CMS berbentuk Lexical. Setiap paragraf, judul, dan item daftar menjadi satu paragraf.
const richTextToParagraphs = (content: unknown): string[] => {
  const blocks = (content as { root?: { children?: RichTextNode[] } } | null)?.root?.children ?? [];
  return blocks
    .flatMap((block) => (block.type === 'list' ? (block.children ?? []) : [block]))
    .map((block) => richTextNodeText(block).trim())
    .filter(Boolean);
};

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
  return resolveRoomCatalog(documents, cmsApiUrl);
}

export async function getSpaTreatments(locale: 'id' | 'en' = 'id'): Promise<SpaTreatment[]> {
  const docs = await getCmsCollection<any>('spa-treatments', [], { locale, depth: 1 });
  if (!docs || docs.length === 0) return SPA_TREATMENTS;
  return docs.map((doc: any) => ({
    id: doc.slug,
    slug: doc.slug,
    title: doc.title,
    category: doc.categoryLabel || 'Spa',
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
  return docs.map((doc: any) => {
    // Field yang belum diisi di CMS diambil dari data bawaan dengan slug yang sama.
    const reference = WEDDING_PACKAGES.find((item) => item.slug === doc.slug);
    const image: string | undefined = doc.featuredImage?.url;
    const inclusions: string[] = labels(doc.inclusions);
    const schedule = labels(doc.schedule);
    const gallery: string[] = (doc.gallery || []).map((row: any) => row.image?.url).filter(Boolean);
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
  const docs = await getCmsCollection<any>('offers', [], { locale, depth: 1 });
  if (!docs || docs.length === 0) return OFFERS;
  return docs.map((doc: any) => ({
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
    image: doc.featuredImage?.url || OFFERS[0].image,
    featured: true,
  }));
}

export async function getFacilities(locale: 'id' | 'en' = 'id'): Promise<ResortFacility[]> {
  const docs = await getCmsCollection<any>('resort-content', [], { locale, depth: 1 });
  const facilities = docs.filter((d: any) => d.kind === 'facility');
  if (!facilities || facilities.length === 0) return FACILITIES;
  return facilities.map((doc: any) => {
    const reference = FACILITIES.find((item) => item.id === doc.slug);
    const highlights = labels(doc.highlights);
    return {
      id: doc.slug,
      title: doc.title,
      category: doc.facilityCategory || reference?.category || 'Wellness',
      description: doc.description || doc.summary || '',
      operatingHours: doc.operatingHours || reference?.operatingHours || '',
      image: doc.featuredImage?.url || reference?.image || FACILITIES[0].image,
      highlights: highlights.length > 0 ? highlights : reference?.highlights,
    };
  });
}

export async function getGalleryItems(locale: 'id' | 'en' = 'id'): Promise<GalleryItem[]> {
  const docs = await getCmsCollection<any>('gallery-items', [], { locale, depth: 1 });
  if (!docs || docs.length === 0) return GALLERY_ITEMS;
  return docs.map((doc: any) => ({
    id: String(doc.id),
    title: doc.title || '',
    category: GALLERY_CATEGORY_BY_CMS[doc.category] ?? 'Kawasan Resort',
    image: doc.image?.url || GALLERY_ITEMS[0].image,
  }));
}

export async function getDining(locale: 'id' | 'en' = 'id'): Promise<DiningVenue[]> {
  const docs = await getCmsCollection<any>('resort-content', [], { locale, depth: 1 });
  const dining = docs.filter((d: any) => d.kind === 'dining');
  if (!dining || dining.length === 0) return DINING_VENUES;
  return dining.map((doc: any) => {
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
      image: doc.featuredImage?.url || reference?.image || DINING_VENUES[0].image,
      menuHighlights: highlights.length > 0 ? highlights : (reference?.menuHighlights ?? []),
    };
  });
}

export async function getExperiences(locale: 'id' | 'en' = 'id'): Promise<Experience[]> {
  const docs = await getCmsCollection<any>('resort-content', [], { locale, depth: 1 });
  const experiences = docs.filter((d: any) => d.kind === 'experience');
  if (!experiences || experiences.length === 0) return EXPERIENCES;
  return experiences.map((doc: any) => {
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
      image: doc.featuredImage?.url || reference?.image || EXPERIENCES[0].image,
      highlights: highlights.length > 0 ? highlights : (reference?.highlights ?? []),
    };
  });
}

export async function getNearbyDestinations(locale: 'id' | 'en' = 'id'): Promise<NearbyDestination[]> {
  const docs = await getCmsCollection<any>('resort-content', [], { locale, depth: 1 });
  const nearby = docs.filter((d: any) => d.kind === 'nearby');
  if (!nearby || nearby.length === 0) return NEARBY_DESTINATIONS;
  return nearby.map((doc: any) => {
    // Alamat, tips, dan tautan peta belum ada di CMS, jadi diambil dari data bawaan dengan slug yang sama.
    const reference = NEARBY_DESTINATIONS.find((item) => item.slug === doc.slug);
    const image: string | undefined = doc.featuredImage?.url;
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
  const docs = await getCmsCollection<any>('journal-articles', [], { locale, depth: 1 });
  if (!docs || docs.length === 0) return JOURNAL_ARTICLES;
  return docs.map((doc: any) => {
    // Kutipan dan data penulis belum ada di CMS, jadi diambil dari data bawaan dengan slug yang sama.
    const reference = JOURNAL_ARTICLES.find((article) => article.slug === doc.slug);
    const content = richTextToParagraphs(doc.content);
    return {
      ...reference,
      id: doc.slug,
      slug: doc.slug,
      title: doc.title,
      category: doc.category || reference?.category || 'Resort News',
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
        avatar: doc.authorAvatar?.url || reference?.author.avatar || '/images/susan-spa-logo.png',
      },
      coverImage: doc.coverImage?.url || reference?.coverImage || JOURNAL_ARTICLES[0].coverImage,
    };
  });
}
