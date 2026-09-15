import 'server-only';

import { resolveRoomCatalog, type CmsRoom } from '@/lib/room-catalog';
import type { Room } from '@/types';

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
