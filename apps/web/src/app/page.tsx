import HomePageClient from './HomePageClient';
import { getRooms, getSpaTreatments, getWeddingPackages, getDining, getOffers } from '@/lib/cms';

export default async function HomePage() {
  const [rooms, treatments, packages, venues, offers] = await Promise.all([getRooms(), getSpaTreatments(), getWeddingPackages(), getDining(), getOffers()]);
  const showcaseImages = { spa: treatments[0]?.image, wedding: packages[0]?.image, dining: venues[0]?.image, offers: offers[0]?.image };
  return <HomePageClient rooms={rooms} showcaseImages={showcaseImages} />;
}
