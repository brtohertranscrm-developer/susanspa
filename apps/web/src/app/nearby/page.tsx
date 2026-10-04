import { getNearbyDestinations } from '@/lib/cms';
import NearbyPageClient from './NearbyPageClient';

export default async function NearbyPage() {
  const destinations = await getNearbyDestinations();
  return <NearbyPageClient destinations={destinations} />;
}
