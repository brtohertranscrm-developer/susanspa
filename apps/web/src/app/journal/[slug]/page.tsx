import { notFound } from 'next/navigation';
import { getJournalArticles } from '@/lib/cms';
import JournalDetailClient from './JournalDetailClient';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = (await getJournalArticles()).find((item) => item.slug === slug);
  if (!article) notFound();
  return <JournalDetailClient article={article} />;
}
