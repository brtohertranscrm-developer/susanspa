import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { facilitiesPage } from '@susan/contracts/content';
import { getFacilities } from '@/lib/cms';
import { getPageContent, seoMetadata } from '@/lib/content';
import FacilitiesPageClient from './FacilitiesPageClient';
import type { FacilityGroup } from '@/data/facilities';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent(facilitiesPage);
  return seoMetadata(content.seo);
}

export default async function FacilitiesPage() {
  const [facilities, content] = await Promise.all([getFacilities(), getPageContent(facilitiesPage)]);

  // Urutan dan judul kelompok diatur di CMS. Kelompok tanpa fasilitas tidak ditampilkan.
  const groups: FacilityGroup[] = content.groups
    .map((group) => ({
      category: group.category,
      label: group.label || group.category,
      title: group.title,
      description: group.description,
      items: facilities.filter((facility) => facility.category === group.category),
    }))
    .filter((group) => group.items.length > 0);

  if (!content.enabled) notFound();
  return <FacilitiesPageClient facilityGroups={groups} content={content} />;
}
