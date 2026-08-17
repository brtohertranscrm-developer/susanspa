import { MetadataRoute } from 'next';
import { ROOMS } from '@/data/rooms';
import { JOURNAL_ARTICLES } from '@/data/journal';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.susansparesort.com';

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

  const roomRoutes = ROOMS.map((room) => ({
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
