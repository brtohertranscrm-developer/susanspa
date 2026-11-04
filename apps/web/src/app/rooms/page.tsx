import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { roomsPage } from '@susan/contracts/content';
import { getRooms } from '@/lib/cms';
import { getPageContent, seoMetadata } from '@/lib/content';
import RoomsPageClient from './RoomsPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent(roomsPage);
  return seoMetadata(content.seo);
}

export default async function RoomsPage() {
  const [rooms, content] = await Promise.all([getRooms(), getPageContent(roomsPage)]);
  if (!content.enabled) notFound();
  return <RoomsPageClient rooms={rooms} content={content} />;
}
