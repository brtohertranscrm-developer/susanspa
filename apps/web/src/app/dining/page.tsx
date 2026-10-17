import { getDining, getPageHero } from '@/lib/cms';
import DiningPageClient from './DiningPageClient';

export default async function DiningPage() {
  const venues = await getDining();
  const heroImage = await getPageHero('dining', 'https://ik.imagekit.io/ro8484nadw/SUSAN%20SPA/update%20konten%20susan%20spa/MNP_4164%20copy.avif?tr=w-1920');
  return <DiningPageClient venues={venues} heroImage={heroImage} />;
}
