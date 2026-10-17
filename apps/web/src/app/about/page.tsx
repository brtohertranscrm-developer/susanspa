import { getPageHero } from '@/lib/cms';
import AboutPageClient from './AboutPageClient';

export default async function AboutPage() {
  const heroImage = await getPageHero('about', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop');
  return <AboutPageClient heroImage={heroImage} />;
}
