import { ROOMS } from '@/data/rooms';
import type { Room } from '@/types';

interface CmsMedia {
  url?: string | null;
}

export interface CmsRoom {
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

export function resolveRoomCatalog(documents: CmsRoom[], cmsApiUrl?: string): Room[] {
  function absoluteCmsUrl(pathname: string) {
    if (/^https?:\/\//.test(pathname) || !cmsApiUrl) return pathname;
    return `${cmsApiUrl.replace(/\/$/, '')}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
  }

  // Retire only the known demo entries; keep all other published CMS additions.
  // No CMS records or booking history are deleted by this presentation change.
  const retiredDemoSlugs = new Set(['grand-villa', 'royal-suite', 'jacuzzi-villa', 'family-suite', 'deluxe-mountain']);
  const cmsRooms = documents.filter((document) => !retiredDemoSlugs.has(document.slug)).map((document) => {
    const referenceRoom = ROOMS.find((room) => room.slug === document.slug);
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
      tagline: document.tagline || referenceRoom?.tagline || '',
      description: document.shortDescription || referenceRoom?.description || '',
      longDescription:
        document.longDescription || document.shortDescription || referenceRoom?.longDescription || '',
      sizeSqm: document.sizeSqm ?? referenceRoom?.sizeSqm ?? null,
      capacityAdults: document.capacityAdults ?? referenceRoom?.capacityAdults ?? null,
      capacityChildren: document.capacityChildren ?? referenceRoom?.capacityChildren ?? null,
      bedType: document.bedType || referenceRoom?.bedType || null,
      view: referenceRoom?.view || null,
      startingPriceIdr: document.startingPriceLabel ?? referenceRoom?.startingPriceIdr ?? null,
      featured: (document.sortOrder ?? 99) < 3,
      images: images.length > 0 ? images : referenceRoom?.images || ROOMS[0].images,
      amenities: amenities.length > 0 ? amenities : referenceRoom?.amenities || [],
      highlights: referenceRoom?.highlights || amenities.slice(0, 3),
      policies: policies.length > 0 ? policies : referenceRoom?.policies || [],
    };
  });

  // A partially populated CMS must not hide the remaining official room types.
  return [
    ...ROOMS.map((room) => cmsRooms.find((entry) => entry.slug === room.slug) || room),
    ...cmsRooms.filter((room) => !ROOMS.some((entry) => entry.slug === room.slug)),
  ];
}
