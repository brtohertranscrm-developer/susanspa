import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { termsPage } from '@susan/contracts/content';
import { LegalPage } from '@/components/global/LegalPage';
import { getPageContent, seoMetadata } from '@/lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent(termsPage);
  return seoMetadata(content.seo);
}

export default async function TermsPage() {
  const content = await getPageContent(termsPage);
  if (!content.enabled) notFound();
  return <LegalPage content={content} />;
}
