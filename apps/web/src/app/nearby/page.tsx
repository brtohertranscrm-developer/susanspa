import { getNearbyDestinations, getPageHero } from '@/lib/cms';
import NearbyPageClient from './NearbyPageClient';

export default async function NearbyPage() {
  const [destinations, heroImage] = await Promise.all([
    getNearbyDestinations(),
    getPageHero('nearby', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop'),
  ]);
  return <NearbyPageClient destinations={destinations} heroImage={heroImage} />;
}
