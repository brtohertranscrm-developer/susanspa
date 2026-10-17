import { getJournalArticles } from '@/lib/cms';
import JournalDetailClient from './JournalDetailClient';

type Props = { params: Promise<{ slug: string }> };

export default async function JournalDetailPage({ params }: Props) {
  const { slug } = await params;
  const articles = await getJournalArticles();
  return <JournalDetailClient article={articles.find((item) => item.slug === slug) ?? null} />;
}
