import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { privacyPage } from '@susan/contracts/content';
import { LegalPage } from '@/components/global/LegalPage';
import { getPageContent, seoMetadata } from '@/lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent(privacyPage);
  return seoMetadata(content.seo);
}

export default async function PrivacyPage() {
  const content = await getPageContent(privacyPage);
  if (!content.enabled) notFound();
  return <LegalPage content={content} />;
}
