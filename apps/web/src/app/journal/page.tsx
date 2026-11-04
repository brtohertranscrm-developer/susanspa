import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { journalPage } from '@susan/contracts/content';
import { getJournalArticles } from '@/lib/cms';
import { getPageContent, seoMetadata } from '@/lib/content';
import JournalPageClient from './JournalPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent(journalPage);
  return seoMetadata(content.seo);
}

export default async function JournalPage() {
  const [articles, content] = await Promise.all([getJournalArticles(), getPageContent(journalPage)]);
  if (!content.enabled) notFound();
  return <JournalPageClient articles={articles} content={content} />;
}
