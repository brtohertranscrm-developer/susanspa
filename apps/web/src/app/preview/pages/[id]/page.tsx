import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCustomPagePreview } from '@/lib/custom-pages';
import CustomPageClient from '@/app/[slug]/CustomPageClient';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Pratinjau halaman', robots: { index: false, follow: false }, referrer: 'no-referrer' };

export default async function PagePreview({ params, searchParams }: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string; locale?: string }>;
}) {
  const [{ id }, { token, locale }] = await Promise.all([params, searchParams]);
  const page = token ? await getCustomPagePreview(id, token, locale) : null;
  if (!page) notFound();
  return <CustomPageClient page={page} />;
}
