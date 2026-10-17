import { getPageHero, getWeddingPackages } from '@/lib/cms';
import WeddingPageClient from './WeddingPageClient';

export default async function WeddingPage() {
  const [packages, heroImage] = await Promise.all([
    getWeddingPackages(),
    getPageHero('wedding', '/images/wedding/wedding-chapel-1.jpg'),
  ]);
  return <WeddingPageClient packages={packages} heroImage={heroImage} />;
}
