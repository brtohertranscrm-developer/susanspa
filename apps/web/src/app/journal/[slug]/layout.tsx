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
  // Judul dan deskripsi SEO dari CMS dipakai bila diisi, selain itu judul dan ringkasan artikel.
  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;
  return {
    title,
    description,
    openGraph: { title, description, images: [article.coverImage], type: 'article' },
  };
}

export default async function ArticleLayout({ children, params }: Props) {
  const { slug } = await params;
  const articles = await getJournalArticles();
  if (!articles.some((article) => article.slug === slug)) notFound();
  return children;
}
