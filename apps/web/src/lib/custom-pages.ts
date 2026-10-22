import 'server-only';

import type { RichTextRoot } from '@/components/ui/RichText';

const cmsApiUrl = process.env.CMS_API_URL?.replace(/\/$/, '');

interface CmsMedia {
  url?: string | null;
  alt?: string | null;
}

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

const absoluteUrl = (url: string) =>
  /^https?:\/\//.test(url) || !cmsApiUrl ? url : `${cmsApiUrl}${url.startsWith('/') ? '' : '/'}${url}`;

const toImage = (media: unknown): CustomImage | null => {
  const value = media as CmsMedia | null;
  return value?.url ? { url: absoluteUrl(value.url), alt: value.alt ?? '' } : null;
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
  try {
    const response = await fetch(`${cmsApiUrl}/api/pages?${query}`, {
      next: { revalidate: 300 },
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) {
      console.warn(`Halaman tambahan dari CMS gagal dimuat: HTTP ${response.status}`);
      return [];
    }
    return ((await response.json()) as { docs: Record<string, unknown>[] }).docs;
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
  return {
    ...(doc as unknown as CustomPage),
    heroImage: toImage(doc.heroImage),
    sections: ((doc.sections as Record<string, unknown>[] | undefined) ?? []).map(normalizeSection),
  };
}

export async function getCustomPageSlugs(): Promise<{ slug: string; updatedAt?: string }[]> {
  const query = new URLSearchParams({ limit: '200', depth: '0', 'select[slug]': 'true', 'select[updatedAt]': 'true' });
  const docs = await fetchPages(query.toString());
  return docs
    .filter((doc): doc is { slug: string; updatedAt?: string } => typeof doc.slug === 'string')
    .map(({ slug, updatedAt }) => ({ slug, updatedAt }));
}
