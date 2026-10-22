import 'server-only';

import type { Metadata } from 'next';
import { cache } from 'react';
import {
  defaultsOf,
  siteLayout,
  uiText,
  type ContentField,
  type ContentPage,
  type PageContent,
} from '@susan/contracts/content';

const cmsApiUrl = process.env.CMS_API_URL?.replace(/\/$/, '');

type CmsValue = Record<string, unknown> | null | undefined;

const absoluteUrl = (url: string) =>
  /^https?:\/\//.test(url) || !cmsApiUrl ? url : `${cmsApiUrl}${url.startsWith('/') ? '' : '/'}${url}`;

const mediaUrl = (value: unknown): string | undefined => {
  const url = (value as { url?: unknown } | null)?.url;
  return typeof url === 'string' && url ? absoluteUrl(url) : undefined;
};

// Nilai CMS menimpa bawaan per field. Teks kosong atau field yang belum ada di database memakai teks bawaan,
// foto kosong memakai foto bawaan. Daftar dari CMS dipakai apa adanya, termasuk bila sengaja dikosongkan.
function merge(fields: readonly ContentField[], cms: CmsValue, defaults: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const field of fields) {
    const value = cms?.[field.name];
    const fallback = defaults[field.name];
    switch (field.kind) {
      case 'text':
        result[field.name] = typeof value === 'string' && value.trim() ? value : fallback;
        break;
      case 'image':
      case 'video':
        result[field.name] = mediaUrl(value) ?? fallback;
        break;
      case 'checkbox':
        result[field.name] = typeof value === 'boolean' ? value : fallback;
        break;
      case 'select':
        result[field.name] = field.options.some((option) => option.value === value) ? value : fallback;
        break;
      case 'group':
        result[field.name] = merge(field.fields, value as CmsValue, fallback as Record<string, unknown>);
        break;
      case 'list': {
        const defaultRows = fallback as Record<string, unknown>[];
        result[field.name] = Array.isArray(value)
          ? value.map((row, index) =>
              merge(field.fields, row as CmsValue, defaultRows[index] ?? defaultsOf(field.fields)),
            )
          : defaultRows;
        break;
      }
    }
  }
  return result;
}

const fetchGlobal = cache(async (slug: string): Promise<CmsValue> => {
  if (!cmsApiUrl) return null;
  try {
    const response = await fetch(`${cmsApiUrl}/api/globals/${slug}?locale=id&depth=1`, {
      next: { revalidate: 300 },
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) {
      console.warn(`Konten ${slug} dari CMS gagal dimuat: HTTP ${response.status}`);
      return null;
    }
    return (await response.json()) as Record<string, unknown>;
  } catch (error) {
    console.warn(`Konten ${slug} dari CMS tidak bisa dihubungi:`, error);
    return null;
  }
});

/** Isi halaman dari CMS, dilengkapi teks dan foto bawaan untuk bagian yang belum diisi. */
export async function getPageContent<P extends ContentPage>(spec: P): Promise<PageContent<P>> {
  const cms = await fetchGlobal(spec.slug);
  return merge(spec.fields, cms, defaultsOf(spec.fields)) as PageContent<P>;
}

export type LayoutContent = PageContent<typeof siteLayout>;
export type UiText = PageContent<typeof uiText>;

export const getLayoutContent = () => getPageContent(siteLayout);
export const getUiText = () => getPageContent(uiText);

/** Judul dan deskripsi halaman dari bagian "SEO halaman". Field kosong memakai bawaan situs. */
export function seoMetadata(seo: { title: string; description: string }): Metadata {
  return {
    ...(seo.title.trim() ? { title: seo.title } : {}),
    ...(seo.description.trim() ? { description: seo.description } : {}),
  };
}
