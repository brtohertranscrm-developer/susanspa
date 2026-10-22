import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ballroomPage } from '@susan/contracts/content';
import { getPageContent, seoMetadata } from '@/lib/content';
import BallroomPageClient from './BallroomPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent(ballroomPage);
  return seoMetadata(content.seo);
}

export default async function BallroomPage() {
  const content = await getPageContent(ballroomPage);
  if (!content.enabled) notFound();
  return <BallroomPageClient content={content} />;
}
