import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { aboutPage } from '@susan/contracts/content';
import { getPageContent, seoMetadata } from '@/lib/content';
import AboutPageClient from './AboutPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent(aboutPage);
  return seoMetadata(content.seo);
}

export default async function AboutPage() {
  const content = await getPageContent(aboutPage);
  if (!content.enabled) notFound();
  return <AboutPageClient content={content} />;
}
