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
      titleSuffix: ' | Panel Susan Spa',
      defaultOGImageType: 'off',
    },
    theme: 'all',
    dateFormat: 'd MMM yyyy, HH:mm',
    avatar: { Component: '/components/UserAvatar#UserAvatar' },
    components: {
      graphics: {
        Logo: '/components/BrandLogo#BrandLogo',
        Icon: '/components/BrandLogo#BrandIcon',
      },
      views: { dashboard: { Component: '/components/Dashboard#Dashboard' } },
      beforeNav: ['/components/BrandLogo#NavBrand', '/components/NavKeepOpen#NavKeepOpen'],
      beforeNavLinks: ['/components/NavDashboardLink#NavDashboardLink'],
      afterNavLinks: ['/components/NavWebsiteLink#NavWebsiteLink'],
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
      },
    },
  },
  collections: [
    Rooms,
    SpaTreatments,
    WeddingPackages,
    Offers,
    ResortContent,
    JournalArticles,
    Testimonials,
    GalleryItems,
    Media,
    Users,
  ],
  globals: [SiteSettings],
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
