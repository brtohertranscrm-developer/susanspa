import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { spaPage } from '@susan/contracts/content';
import { getSpaTreatments } from '@/lib/cms';
import { getPageContent, seoMetadata } from '@/lib/content';
import SpaPageClient from './SpaPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent(spaPage);
  return seoMetadata(content.seo);
}

export default async function SpaPage() {
  const [treatments, content] = await Promise.all([getSpaTreatments(), getPageContent(spaPage)]);
  if (!content.enabled) notFound();
  return <SpaPageClient treatments={treatments} content={content} />;
}
