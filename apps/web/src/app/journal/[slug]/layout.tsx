import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { JOURNAL_ARTICLES } from '@/data/journal';

type Props = { children: ReactNode; params: Promise<{ slug: string }> };

export const generateStaticParams = () => JOURNAL_ARTICLES.map((article) => ({ slug: article.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = JOURNAL_ARTICLES.find((item) => item.slug === slug);
  if (!article) notFound();
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, images: [article.coverImage], type: 'article' },
  };
}

export default async function ArticleLayout({ children, params }: Props) {
  const { slug } = await params;
  if (!JOURNAL_ARTICLES.some((article) => article.slug === slug)) notFound();
  return children;
}
