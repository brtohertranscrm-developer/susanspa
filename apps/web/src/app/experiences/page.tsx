import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { experiencesPage } from '@susan/contracts/content';
import { getExperiences } from '@/lib/cms';
import { getPageContent, seoMetadata } from '@/lib/content';
import ExperiencesPageClient from './ExperiencesPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent(experiencesPage);
  return seoMetadata(content.seo);
}

export default async function ExperiencesPage() {
  const [experiences, content] = await Promise.all([getExperiences(), getPageContent(experiencesPage)]);
  if (!content.enabled) notFound();
  return <ExperiencesPageClient experiences={experiences} content={content} />;
}
