export interface CmsMedia {
  url?: string | null;
  updatedAt?: string | null;
  alt?: string | null;
}

export function resolveCmsMedia(
  media: CmsMedia | string | number | null | undefined,
  fallback = '',
  cmsApiUrl?: string,
): string {
  if (!media || typeof media !== 'object' || typeof media.url !== 'string' || !media.url.trim()) return fallback;
  const pathname = media.url.trim();
  if (!/^https?:\/\//i.test(pathname) && (!pathname.startsWith('/') || pathname.startsWith('//'))) return fallback;
  try {
    const url = new URL(pathname, cmsApiUrl);
    if (!['http:', 'https:'].includes(url.protocol)) return fallback;
    if (media.updatedAt) url.searchParams.set('v', media.updatedAt);
    return url.toString();
  } catch {
    return fallback;
  }
}
