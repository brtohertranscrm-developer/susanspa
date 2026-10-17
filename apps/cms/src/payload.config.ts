import { postgresAdapter } from '@payloadcms/db-postgres'
import { id } from '@payloadcms/translations/languages/id'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { GalleryItems, JournalArticles, Testimonials } from './collections/Editorial'
import { Media } from './collections/Media'
import { Offers, ResortContent, SpaTreatments, WeddingPackages } from './collections/MarketingContent'
import { lexicalId } from './i18n/id'
import { Rooms } from './collections/Rooms'
import { Users } from './collections/Users'
import { PageHeroes } from './globals/PageHeroes'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const directory = path.dirname(filename)
const cmsUrl = process.env.CMS_PUBLIC_URL || 'http://localhost:3001'
const webUrl = process.env.WEB_URL || 'http://localhost:3000'

export default buildConfig({
  serverURL: cmsUrl,
  routes: { admin: '/cms' },
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(directory) },
    meta: {
      titleSuffix: ' | Susan Spa CMS',
      defaultOGImageType: 'off',
    },
    theme: 'light',
    dateFormat: 'd MMM yyyy, HH:mm',
    components: {
      graphics: {
        Logo: '@/components/navigation/BrandHeader#BrandHeader',
      },
      beforeNav: ['@/components/navigation/BrandHeader#BrandHeader'],
      beforeNavLinks: ['@/components/navigation/NavOverviewLink#NavOverviewLink'],
      afterNavLinks: ['@/components/navigation/NavWebsiteLink#NavWebsiteLink'],
      views: {
        dashboard: {
          Component: '@/components/dashboard/CustomDashboard#CustomDashboard',
        },
      },
    },
  },
  i18n: {
    supportedLanguages: { id },
    fallbackLanguage: 'id',
    translations: {
      id: {
        lexical: lexicalId,
        general: {
          noResultsFound: 'Belum ada data yang tampil',
          noResultsDescription:
            'Belum ada yang dibuat, atau tidak ada yang cocok dengan pencarian dan filter di atas. Hapus filter, atau buat yang baru.',
        },
        // Istilah status dibuat konkret: draf belum tampil di website, yang diterbitkan sudah tampil.
        version: {
          publish: 'Terbitkan',
          publishChanges: 'Terbitkan ke website',
          saveDraft: 'Simpan draf',
          draft: 'Draf (belum tampil)',
          published: 'Tayang di website',
          unpublish: 'Tarik dari website',
          unpublished: 'Belum tayang',
          revertToPublished: 'Kembali ke versi yang tayang',
          changed: 'Ada perubahan belum tayang',
          publishIn: 'Terbitkan di {{locale}}',
          unpublishIn: 'Tarik dari {{locale}}',
        },
      },
    },
  },
  collections: [
    Rooms,
    SpaTreatments,
    WeddingPackages,
    ResortContent,
    GalleryItems,
    JournalArticles,
    Offers,
    Testimonials,
    Media,
    Users,
  ].map((collection) => ({ ...collection, admin: { ...collection.admin, hideAPIURL: true } })),
  // Tab "API" berisi JSON mentah yang tidak dibutuhkan tim konten. Rutenya tetap ada untuk admin.
  globals: [SiteSettings, PageHeroes].map((global) => ({ ...global, admin: { ...global.admin, hideAPIURL: true } })),
  localization: {
    locales: [
      { code: 'id', label: 'Bahasa Indonesia' },
      { code: 'en', label: 'English' },
    ],
    defaultLocale: 'id',
    fallback: true,
  },
  cors: [webUrl],
  csrf: [webUrl, cmsUrl],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
  }),
  secret: process.env.PAYLOAD_SECRET || 'local-development-secret-change-before-production',
  typescript: { outputFile: path.resolve(directory, 'payload-types.ts') },
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URL ||
        'postgres://susan_cms:susan_cms_local@127.0.0.1:5433/susan_cms',
    },
  }),
  sharp,
})
