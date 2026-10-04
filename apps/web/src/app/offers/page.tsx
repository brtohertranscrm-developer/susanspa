import { getOffers } from '@/lib/cms';
import OffersPageClient from './OffersPageClient';

export default async function OffersPage() {
  const offers = await getOffers();
  return <OffersPageClient offers={offers} />;
}
