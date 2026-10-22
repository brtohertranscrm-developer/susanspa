import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCustomPage, getCustomPageSlugs } from '@/lib/custom-pages';
import CustomPageClient from './CustomPageClient';

type Props = { params: Promise<{ slug: string }> };

// Halaman yang baru diterbitkan di CMS tetap bisa dibuka walau belum ada saat build.
export const dynamicParams = true;

export async function generateStaticParams() {
  const pages = await getCustomPageSlugs();
  return pages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getCustomPage(slug);
  if (!page) return {};
  return {
    title: page.seoTitle || page.title,
    ...(page.seoDescription ? { description: page.seoDescription } : {}),
  };
}

export default async function CustomPage({ params }: Props) {
  const { slug } = await params;
  const page = await getCustomPage(slug);
  if (!page) notFound();
  return <CustomPageClient page={page} />;
}
