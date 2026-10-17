import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getJournalArticles } from '@/lib/cms';

type Props = { children: ReactNode; params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const articles = await getJournalArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = (await getJournalArticles()).find((item) => item.slug === slug);
  if (!article) notFound();
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, images: [article.coverImage], type: 'article' },
  };
}

export default async function ArticleLayout({ children, params }: Props) {
  const { slug } = await params;
  const articles = await getJournalArticles();
  if (!articles.some((article) => article.slug === slug)) notFound();
  return children;
}
