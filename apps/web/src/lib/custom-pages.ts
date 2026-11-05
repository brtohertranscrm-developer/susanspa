import 'server-only';

import { resolveCmsMedia, type CmsMedia } from './cms-media';

import type { RichTextRoot } from '@/components/ui/RichText';

const cmsApiUrl = process.env.CMS_API_URL?.replace(/\/$/, '');
const cmsMediaUrl = process.env.CMS_PUBLIC_URL?.replace(/\/$/, '') || cmsApiUrl;

export interface CustomImage {
  url: string;
  alt: string;
}

export type CustomSection =
  | { blockType: 'text'; id: string; heading?: string | null; body?: RichTextRoot | null }
  | {
      blockType: 'imageText';
      id: string;
      image: CustomImage | null;
      imagePosition?: 'left' | 'right' | null;
      eyebrow?: string | null;
      heading: string;
      body?: string | null;
      buttonLabel?: string | null;
      buttonUrl?: string | null;
    }
  | {
      blockType: 'gallery';
      id: string;
      heading?: string | null;
      images: { id: string; image: CustomImage | null; caption?: string | null }[];
    }
  | {
      blockType: 'cards';
      id: string;
      heading?: string | null;
      intro?: string | null;
      cards: {
        id: string;
        image: CustomImage | null;
        title: string;
        body?: string | null;
        linkLabel?: string | null;
        linkUrl?: string | null;
      }[];
    }
  | {
      blockType: 'cta';
      id: string;
      eyebrow?: string | null;
      heading: string;
      body?: string | null;
      buttonLabel: string;
      buttonAction?: 'reserve' | 'whatsapp' | 'link' | null;
      buttonUrl?: string | null;
      whatsappMessage?: string | null;
    };

export interface CustomPage {
  slug: string;
  title: string;
  heroImage: CustomImage | null;
  heroEyebrow?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  sections: CustomSection[];
  seoTitle?: string | null;
  seoDescription?: string | null;
  updatedAt?: string;
}

const toImage = (media: unknown): CustomImage | null => {
  const value = media as CmsMedia | null;
  const url = resolveCmsMedia(value, '', cmsMediaUrl);
  return url ? { url, alt: value?.alt ?? '' } : null;
};

// Foto di CMS berupa objek media. Web hanya butuh URL lengkap dan teks alt.
function normalizeSection(section: Record<string, unknown>): CustomSection {
  switch (section.blockType) {
    case 'imageText':
      return { ...section, image: toImage(section.image) } as CustomSection;
    case 'gallery':
      return {
        ...section,
        images: ((section.images as Record<string, unknown>[] | undefined) ?? []).map((row) => ({
          ...row,
          image: toImage(row.image),
        })),
      } as CustomSection;
    case 'cards':
      return {
        ...section,
        cards: ((section.cards as Record<string, unknown>[] | undefined) ?? []).map((card) => ({
          ...card,
          image: toImage(card.image),
        })),
      } as CustomSection;
    default:
      return section as CustomSection;
  }
}

async function fetchPages(query: string): Promise<Record<string, unknown>[]> {
  if (!cmsApiUrl) return [];
  const parameters = new URLSearchParams(query);
  parameters.set('draft', 'false');
  parameters.set('where[_status][equals]', 'published');
  try {
    const response = await fetch(`${cmsApiUrl}/api/pages?${parameters}`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) {
      console.warn(`Halaman tambahan dari CMS gagal dimuat: HTTP ${response.status}`);
      return [];
    }
    const docs: Record<string, unknown>[] = [];
    let page = 1;
    let current = response;
    while (true) {
      const data = await current.json() as { docs: Record<string, unknown>[]; hasNextPage?: boolean; nextPage?: number | null };
      if (!Array.isArray(data.docs)) throw new Error('Invalid CMS pages response');
      docs.push(...data.docs);
      if (!data.hasNextPage) return docs;
      if (!Number.isInteger(data.nextPage) || data.nextPage! <= page) throw new Error('Invalid CMS pagination');
      page = data.nextPage!;
      parameters.set('page', String(page));
      current = await fetch(`${cmsApiUrl}/api/pages?${parameters}`, {
        cache: 'no-store', headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(4000),
      });
      if (!current.ok) throw new Error(`CMS pages HTTP ${current.status}`);
    }
  } catch (error) {
    console.warn('Halaman tambahan dari CMS tidak bisa dihubungi:', error);
    return [];
  }
}

/** Halaman tambahan yang sudah diterbitkan. Draf tidak terbaca karena API publik hanya mengembalikan yang tayang. */
export async function getCustomPage(slug: string): Promise<CustomPage | null> {
  const query = new URLSearchParams({ 'where[slug][equals]': slug, locale: 'id', depth: '1', limit: '1' });
  const [doc] = await fetchPages(query.toString());
  if (!doc) return null;
  return normalizePage(doc);
}

function normalizePage(doc: Record<string, unknown>): CustomPage {
  return {
    ...(doc as unknown as CustomPage),
    heroImage: toImage(doc.heroImage),
    sections: ((doc.sections as Record<string, unknown>[] | undefined) ?? []).map(normalizeSection),
  };
}

export async function getCustomPagePreview(id: string, token: string, locale = 'id'): Promise<CustomPage | null> {
  if (!cmsApiUrl || !/^\d+$/.test(id) || !/^\d+\.[A-Za-z0-9_-]{43}$/.test(token)) return null;
  try {
    const query = new URLSearchParams({ locale: locale === 'en' ? 'en' : 'id' });
    const response = await fetch(`${cmsApiUrl}/api/pages/${encodeURIComponent(id)}/preview?${query}`, {
      cache: 'no-store',
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) return null;
    return normalizePage(await response.json() as Record<string, unknown>);
  } catch {
    return null;
  }
}

export async function getCustomPageSlugs(): Promise<{ slug: string; updatedAt?: string }[]> {
  const query = new URLSearchParams({ limit: '200', depth: '0', 'select[slug]': 'true', 'select[updatedAt]': 'true' });
  const docs = await fetchPages(query.toString());
  return docs
    .filter((doc): doc is { slug: string; updatedAt?: string } => typeof doc.slug === 'string')
    .map(({ slug, updatedAt }) => ({ slug, updatedAt }));
}
