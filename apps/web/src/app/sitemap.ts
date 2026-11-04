import { MetadataRoute } from 'next';
import {
  aboutPage,
  ballroomPage,
  contactPage,
  diningPage,
  eventsPage,
  experiencesPage,
  facilitiesPage,
  galleryPage,
  journalPage,
  nearbyPage,
  offersPage,
  privacyPage,
  reservePage,
  roomsPage,
  spaPage,
  termsPage,
  weddingPage,
} from '@susan/contracts/content';
import { getJournalArticles, getRooms } from '@/lib/cms';
import { getPageContent } from '@/lib/content';
import { getCustomPageSlugs } from '@/lib/custom-pages';

// Halaman bawaan yang bisa dimatikan dari CMS. Beranda selalu tampil.
const SWITCHABLE_PAGES = [
  ['/rooms', roomsPage],
  ['/spa', spaPage],
  ['/facilities', facilitiesPage],
  ['/dining', diningPage],
  ['/wedding', weddingPage],
  ['/events', eventsPage],
  ['/ballroom', ballroomPage],
  ['/experiences', experiencesPage],
  ['/offers', offersPage],
  ['/gallery', galleryPage],
  ['/about', aboutPage],
  ['/nearby', nearbyPage],
  ['/journal', journalPage],
  ['/contact', contactPage],
  ['/reserve', reservePage],
  ['/privacy', privacyPage],
  ['/terms', termsPage],
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.susansparesort.com';
  const [rooms, articles, customPages, switchable] = await Promise.all([
    getRooms(),
    getJournalArticles(),
    getCustomPageSlugs(),
    Promise.all(
      SWITCHABLE_PAGES.map(async ([route, spec]) => ({ route, enabled: (await getPageContent(spec)).enabled })),
    ),
  ]);

  const staticRoutes = ['', ...switchable.filter((page) => page.enabled).map((page) => page.route)].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const customRoutes = customPages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const roomRoutes = rooms.map((room) => ({
    url: `${baseUrl}/rooms/${room.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const articleRoutes = articles.map((article) => ({
    url: `${baseUrl}/journal/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...customRoutes, ...roomRoutes, ...articleRoutes];
}
