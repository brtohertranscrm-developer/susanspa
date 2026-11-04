import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { contactPage } from '@susan/contracts/content';
import { getPageContent, seoMetadata } from '@/lib/content';
import ContactPageClient from './ContactPageClient';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent(contactPage);
  return seoMetadata(content.seo);
}

export default async function ContactPage() {
  const content = await getPageContent(contactPage);
  if (!content.enabled) notFound();
  return <ContactPageClient content={content} />;
}
