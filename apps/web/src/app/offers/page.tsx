import { getOffers, getPageHero } from '@/lib/cms';
import OffersPageClient from './OffersPageClient';

export default async function OffersPage() {
  const [offers, heroImage] = await Promise.all([
    getOffers(),
    getPageHero('offers', 'https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=2000&auto=format&fit=crop'),
  ]);
  return <OffersPageClient offers={offers} heroImage={heroImage} />;
}
