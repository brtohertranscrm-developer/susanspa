import { getPageHero } from '@/lib/cms';
import BallroomPageClient from './BallroomPageClient';

export default async function BallroomPage() {
  const heroImage = await getPageHero('ballroom', 'https://ik.imagekit.io/ro8484nadw/SUSAN%20SPA/update%20konten%20susan%20spa/MNP_4055%20copy.avif?tr=w-1920');
  return <BallroomPageClient heroImage={heroImage} />;
}
