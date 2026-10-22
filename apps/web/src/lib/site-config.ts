import 'server-only';

import { SITE_CONFIG, type SiteConfig } from '@/data/site';

const cmsApiUrl = process.env.CMS_API_URL?.replace(/\/$/, '');

// Bentuk global site-settings dari CMS. Field kosong dianggap belum diisi.
interface CmsSiteSettings {
  resortName?: string | null;
  address?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  reservationEmail?: string | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  tiktokUrl?: string | null;
  googleMapsUrl?: string | null;
  mapEmbedUrl?: string | null;
  defaultSeoTitle?: string | null;
  defaultSeoDescription?: string | null;
  defaultSeoImage?: { url?: string | null } | null;
}

export interface SiteSeo {
  title?: string;
  description?: string;
  imageUrl?: string;
}

export interface ResolvedSiteSettings {
  site: SiteConfig;
  seo: SiteSeo;
}

const text = (value?: string | null) => value?.trim() || undefined;

// wa.me hanya menerima angka tanpa tanda plus atau spasi.
const digitsOnly = (value?: string | null) => value?.replace(/\D/g, '') || undefined;

// Untuk tautan tel: tanda plus tetap dipertahankan.
const telephone = (value?: string | null) => value?.replace(/[^\d+]/g, '') || undefined;

// Editor kadang menempel seluruh kode <iframe>. Ambil isi src-nya dan hanya terima peta sematan Google.
const mapEmbed = (value?: string | null) => {
  const raw = text(value);
  const url = raw?.match(/src="([^"]+)"/)?.[1] ?? raw;
  return url?.startsWith('https://www.google.com/maps/embed') ? url : undefined;
};

const absoluteUrl = (url?: string | null) => {
  if (!url) return undefined;
  return /^https?:\/\//.test(url) || !cmsApiUrl ? url : `${cmsApiUrl}${url.startsWith('/') ? '' : '/'}${url}`;
};

async function fetchCmsSiteSettings(): Promise<CmsSiteSettings | null> {
  if (!cmsApiUrl) return null;

  try {
    const response = await fetch(`${cmsApiUrl}/api/globals/site-settings?locale=id&depth=1`, {
      next: { revalidate: 300 },
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) {
      console.warn(`Pengaturan Situs dari CMS gagal dimuat: HTTP ${response.status}`);
      return null;
    }
    return (await response.json()) as CmsSiteSettings;
  } catch (error) {
    console.warn('Pengaturan Situs dari CMS tidak bisa dihubungi:', error);
    return null;
  }
}

function toSiteConfig(cms: CmsSiteSettings): SiteConfig {
  const addressLines = (cms.address ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  const phone = text(cms.phone);

  return {
    ...SITE_CONFIG,
    name: text(cms.resortName) ?? SITE_CONFIG.name,
    address:
      addressLines.length > 0
        ? { ...SITE_CONFIG.address, lines: addressLines, fullFormatted: addressLines.join(', ') }
        : SITE_CONFIG.address,
    contact: {
      ...SITE_CONFIG.contact,
      phone: telephone(phone) ?? SITE_CONFIG.contact.phone,
      phoneFormatted: phone ?? SITE_CONFIG.contact.phoneFormatted,
      whatsapp: digitsOnly(cms.whatsapp) ?? SITE_CONFIG.contact.whatsapp,
      whatsappFormatted: text(cms.whatsapp) ?? SITE_CONFIG.contact.whatsappFormatted,
      email: text(cms.email) ?? SITE_CONFIG.contact.email,
      reservationEmail: text(cms.reservationEmail) ?? SITE_CONFIG.contact.reservationEmail,
    },
    social: {
      ...SITE_CONFIG.social,
      instagram: text(cms.instagramUrl) ?? SITE_CONFIG.social.instagram,
      facebook: text(cms.facebookUrl) ?? SITE_CONFIG.social.facebook,
      tiktok: text(cms.tiktokUrl) ?? SITE_CONFIG.social.tiktok,
    },
    googleMapsUrl: text(cms.googleMapsUrl) ?? SITE_CONFIG.googleMapsUrl,
    mapEmbedUrl: mapEmbed(cms.mapEmbedUrl) ?? SITE_CONFIG.mapEmbedUrl,
  };
}

// Jika CMS tidak bisa dihubungi, website memakai nilai bawaan di data/site.ts.
export async function getSiteSettings(): Promise<ResolvedSiteSettings> {
  const cms = await fetchCmsSiteSettings();
  if (!cms) return { site: SITE_CONFIG, seo: {} };

  return {
    site: toSiteConfig(cms),
    seo: {
      title: text(cms.defaultSeoTitle),
      description: text(cms.defaultSeoDescription),
      imageUrl: absoluteUrl(cms.defaultSeoImage?.url),
    },
  };
}
