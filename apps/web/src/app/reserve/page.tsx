import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { reservePage } from '@susan/contracts/content';
import { getRooms } from '@/lib/cms';
import { getPageContent, seoMetadata } from '@/lib/content';
import ReservePageClient from './ReservePageClient';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent(reservePage);
  return seoMetadata(content.seo);
}

export default async function ReservePage() {
  const [rooms, content] = await Promise.all([getRooms(), getPageContent(reservePage)]);
  if (!content.enabled) notFound();
  return <ReservePageClient rooms={rooms} content={content} />;
}
