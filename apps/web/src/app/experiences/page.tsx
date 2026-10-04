import { getExperiences } from '@/lib/cms';
import ExperiencesPageClient from './ExperiencesPageClient';

export default async function ExperiencesPage() {
  const experiences = await getExperiences();
  return <ExperiencesPageClient experiences={experiences} />;
}
