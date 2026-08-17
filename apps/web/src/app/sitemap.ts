import { MetadataRoute } from 'next';
import { JOURNAL_ARTICLES } from '@/data/journal';
import { getRooms } from '@/lib/cms';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.susansparesort.com';
  const rooms = await getRooms();

  const staticRoutes = [
    '',
    '/stay',
    '/spa',
    '/facilities',
    '/dining',
    '/weddings',
    '/events',
    '/experiences',
    '/offers',
    '/gallery',
    '/about',
    '/nearby',
    '/journal',
    '/contact',
    '/reserve',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const roomRoutes = rooms.map((room) => ({
    url: `${baseUrl}/stay/${room.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const articleRoutes = JOURNAL_ARTICLES.map((article) => ({
    url: `${baseUrl}/journal/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...roomRoutes, ...articleRoutes];
}
