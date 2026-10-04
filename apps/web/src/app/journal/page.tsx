import { getJournalArticles } from '@/lib/cms';
import JournalPageClient from './JournalPageClient';

export default async function JournalPage() {
  const articles = await getJournalArticles();
  return <JournalPageClient articles={articles} />;
}
