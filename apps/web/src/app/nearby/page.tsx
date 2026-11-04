import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { nearbyPage } from '@susan/contracts/content';
import { getNearbyDestinations } from '@/lib/cms';
import { getPageContent, seoMetadata } from '@/lib/content';
import NearbyPageClient from './NearbyPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent(nearbyPage);
  return seoMetadata(content.seo);
}

export default async function NearbyPage() {
  const [destinations, content] = await Promise.all([getNearbyDestinations(), getPageContent(nearbyPage)]);
  if (!content.enabled) notFound();
  return <NearbyPageClient destinations={destinations} content={content} />;
}
