import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { galleryPage } from '@susan/contracts/content';
import { getGalleryItems } from '@/lib/cms';
import { getPageContent, seoMetadata } from '@/lib/content';
import GalleryPageClient from './GalleryPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent(galleryPage);
  return seoMetadata(content.seo);
}

export default async function GalleryPage() {
  const [items, content] = await Promise.all([getGalleryItems(), getPageContent(galleryPage)]);
  if (!content.enabled) notFound();
  return <GalleryPageClient items={items} content={content} />;
}
