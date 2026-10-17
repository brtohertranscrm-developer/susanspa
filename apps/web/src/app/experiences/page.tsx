import { getExperiences, getPageHero } from '@/lib/cms';
import ExperiencesPageClient from './ExperiencesPageClient';

export default async function ExperiencesPage() {
  const experiences = await getExperiences();
  const heroImage = await getPageHero('experiences', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop');
  return <ExperiencesPageClient experiences={experiences} heroImage={heroImage} />;
}
