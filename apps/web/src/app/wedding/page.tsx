import { getPageHero, getWeddingPackages } from '@/lib/cms';
import WeddingPageClient from './WeddingPageClient';

export default async function WeddingPage() {
  const packages = await getWeddingPackages();
  const heroImage = await getPageHero('wedding', '/images/wedding/wedding-chapel-1.jpg');
  return <WeddingPageClient packages={packages} heroImage={heroImage} />;
}
