import { notFound } from 'next/navigation';
import { WEDDING_PACKAGES } from '@/data/weddings';
import WeddingDetailTemplate from './WeddingDetailTemplate';
import { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = WEDDING_PACKAGES.find((p) => p.slug === slug);
  if (!pkg) return { title: 'Wedding Package Not Found | Susan Spa & Resort' };

  return {
    title: `${pkg.name} | Susan Spa & Resort Wedding`,
    description: pkg.description,
  };
}

export default async function WeddingDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = WEDDING_PACKAGES.find((item) => item.slug === slug);
  if (!pkg) notFound();

  return <WeddingDetailTemplate pkg={pkg} />;
}
