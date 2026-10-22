import type { Metadata } from 'next';
import { homePage } from '@susan/contracts/content';
import HomePageClient from './HomePageClient';
import { getRooms } from '@/lib/cms';
import { getPageContent, seoMetadata } from '@/lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent(homePage);
  return seoMetadata(content.seo);
}

export default async function HomePage() {
  const [rooms, content] = await Promise.all([getRooms(), getPageContent(homePage)]);
  return <HomePageClient rooms={rooms} content={content} />;
}
