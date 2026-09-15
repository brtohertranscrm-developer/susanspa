import { notFound } from 'next/navigation';
import { NEARBY_DESTINATIONS } from '@/data/nearby';
import NearbyDetailTemplate from './NearbyDetailTemplate';
import { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dest = NEARBY_DESTINATIONS.find((d) => d.slug === slug);
  if (!dest) return { title: 'Destinasi Tidak Ditemukan | Susan Spa & Resort' };

  return {
    title: `${dest.name} | Wisata Sekitar Bandungan`,
    description: dest.description,
  };
}

export default async function NearbyDetailPage({ params }: Props) {
  const { slug } = await params;
  const destination = NEARBY_DESTINATIONS.find((item) => item.slug === slug);
  if (!destination) notFound();

  return <NearbyDetailTemplate destination={destination} />;
}
