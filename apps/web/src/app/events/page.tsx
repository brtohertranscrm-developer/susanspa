import type { Metadata } from 'next';
import { eventsPage } from '@susan/contracts/content';
import { getPageContent, seoMetadata } from '@/lib/content';
import EventsPageClient from './EventsPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent(eventsPage);
  return seoMetadata(content.seo);
}

export default async function EventsPage() {
  const content = await getPageContent(eventsPage);
  return <EventsPageClient content={content} />;
}
