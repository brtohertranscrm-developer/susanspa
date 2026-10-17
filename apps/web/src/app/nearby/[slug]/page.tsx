import { notFound } from 'next/navigation';
import { getNearbyDestinations } from '@/lib/cms';
import NearbyDetailTemplate from './NearbyDetailTemplate';
import { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dest = (await getNearbyDestinations()).find((d) => d.slug === slug);
  if (!dest) return { title: 'Destinasi Tidak Ditemukan | Susan Spa & Resort' };

  return {
    title: `${dest.name} | Wisata Sekitar Bandungan`,
    description: dest.description,
  };
}

export default async function NearbyDetailPage({ params }: Props) {
  const { slug } = await params;
  const destination = (await getNearbyDestinations()).find((item) => item.slug === slug);
  if (!destination) notFound();

  return <NearbyDetailTemplate destination={destination} />;
}
