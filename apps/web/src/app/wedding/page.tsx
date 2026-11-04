import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { weddingPage } from '@susan/contracts/content';
import { getWeddingPackages } from '@/lib/cms';
import { getPageContent, seoMetadata } from '@/lib/content';
import WeddingPageClient from './WeddingPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent(weddingPage);
  return seoMetadata(content.seo);
}

export default async function WeddingPage() {
  const [packages, content] = await Promise.all([getWeddingPackages(), getPageContent(weddingPage)]);
  if (!content.enabled) notFound();
  return <WeddingPageClient packages={packages} content={content} />;
}
