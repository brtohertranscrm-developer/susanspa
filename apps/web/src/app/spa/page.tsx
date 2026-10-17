import { getSpaTreatments, getPageHero } from '@/lib/cms';
import SpaPageClient from './SpaPageClient';

export default async function SpaPage() {
  const [treatments, heroImage] = await Promise.all([
    getSpaTreatments(),
    getPageHero('spa', 'https://ik.imagekit.io/ro8484nadw/SUSAN%20SPA/update%20konten%20susan%20spa/IMG_0174.avif?tr=w-1920'),
  ]);
  return <SpaPageClient treatments={treatments} heroImage={heroImage} />;
}
