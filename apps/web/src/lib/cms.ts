import 'server-only';

import { ROOMS } from '@/data/rooms';
import type { Room } from '@/types';

interface CmsListResponse<T> {
  docs: T[];
}

interface CmsMedia {
  url?: string | null;
}

interface CmsRoom {
  id: string | number;
  slug: string;
  name: string;
  category: Room['category'];
  tagline?: string | null;
  shortDescription?: string | null;
  longDescription?: string | null;
  startingPriceLabel?: number | null;
  sizeSqm?: number | null;
  capacityAdults?: number | null;
  capacityChildren?: number | null;
  bedType?: string | null;
  images?: Array<{ image?: CmsMedia | string | number | null }> | null;
  amenities?: Array<{ label?: string | null }> | null;
  policies?: Array<{ label?: string | null }> | null;
  sortOrder?: number | null;
}

const cmsApiUrl = process.env.CMS_API_URL?.replace(/\/$/, '');

function absoluteCmsUrl(pathname: string) {
  if (/^https?:\/\//.test(pathname) || !cmsApiUrl) return pathname;
  return `${cmsApiUrl}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
}

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
  if (documents.length === 0) return ROOMS;

  return documents.map((document) => {
    const demoRoom = ROOMS.find((room) => room.slug === document.slug);
    const images = (document.images || [])
      .map(({ image }) => (typeof image === 'object' && image?.url ? absoluteCmsUrl(image.url) : null))
      .filter((url): url is string => Boolean(url));
    const amenities = (document.amenities || [])
      .map(({ label }) => label)
      .filter((label): label is string => Boolean(label));
    const policies = (document.policies || [])
      .map(({ label }) => label)
      .filter((label): label is string => Boolean(label));

    return {
      id: String(document.id),
      slug: document.slug,
      name: document.name,
      category: document.category,
      tagline: document.tagline || demoRoom?.tagline || '',
      description: document.shortDescription || demoRoom?.description || '',
      longDescription:
        document.longDescription || document.shortDescription || demoRoom?.longDescription || '',
      sizeSqm: document.sizeSqm ?? demoRoom?.sizeSqm ?? 0,
      capacityAdults: document.capacityAdults ?? demoRoom?.capacityAdults ?? 2,
      capacityChildren: document.capacityChildren ?? demoRoom?.capacityChildren ?? 0,
      bedType: document.bedType || demoRoom?.bedType || '',
      view: demoRoom?.view || 'Bandungan Highlands',
      startingPriceIdr: document.startingPriceLabel ?? demoRoom?.startingPriceIdr ?? 0,
      featured: (document.sortOrder ?? 99) < 3,
      images: images.length > 0 ? images : demoRoom?.images || ROOMS[0].images,
      amenities: amenities.length > 0 ? amenities : demoRoom?.amenities || [],
      highlights: demoRoom?.highlights || amenities.slice(0, 3),
      policies: policies.length > 0 ? policies : demoRoom?.policies || [],
    };
  });
}
