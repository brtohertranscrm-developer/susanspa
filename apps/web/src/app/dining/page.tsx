import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { diningPage } from '@susan/contracts/content';
import { getDining } from '@/lib/cms';
import { getPageContent, seoMetadata } from '@/lib/content';
import DiningPageClient from './DiningPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent(diningPage);
  return seoMetadata(content.seo);
}

export default async function DiningPage() {
  const [venues, content] = await Promise.all([getDining(), getPageContent(diningPage)]);
  if (!content.enabled) notFound();
  return <DiningPageClient venues={venues} content={content} />;
}
