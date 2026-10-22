import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { offersPage } from '@susan/contracts/content';
import { getOffers } from '@/lib/cms';
import { getPageContent, seoMetadata } from '@/lib/content';
import OffersPageClient from './OffersPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent(offersPage);
  return seoMetadata(content.seo);
}

export default async function OffersPage() {
  const [offers, content] = await Promise.all([getOffers(), getPageContent(offersPage)]);
  if (!content.enabled) notFound();
  return <OffersPageClient offers={offers} content={content} />;
}
