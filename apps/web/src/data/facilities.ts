import { Facility } from '@/types';

export const FACILITIES: Facility[] = [
  {
    id: 'heated-pool',
    title: 'Heated Mountain Infinity Pool',
    category: 'Leisure',
    description: 'Temperature-controlled swimming pool with integrated hydrotherapy jets overlooking Mount Ungaran valley.',
    operatingHours: '06:00 - 20:00 Daily',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1600&auto=format&fit=crop',
    highlights: [
      'Warm temperature maintained at 30°C',
      'Integrated jacuzzi jet lounge',
      'Poolside mocktail bar & sunbeds',
    ],
  },
  {
    id: 'sky-garden',
    title: 'Sky Garden & Observation Deck',
    category: 'Leisure',
    description: 'Landscaped elevated flower garden situated at ~1,100 meters altitude offering 360-degree panoramic mountain views.',
    operatingHours: '06:00 - 22:00 Daily',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1600&auto=format&fit=crop',
    highlights: [
      'Iconic Photo Spots & Viewing Decks',
      'Fresh Mountain Breeze & Flora',
      'Sunset Viewing Sessions',
    ],
  },
  {
    id: 'spa-wellness-center',
    title: 'Susan Spa & Wellness Center',
    category: 'Wellness',
    description: 'Comprehensive holistic sanctuary featuring treatment suites, herbal sauna, steam room, and thermal plunge pools.',
    operatingHours: '09:00 - 21:00 Daily',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop',
    highlights: [
      'Certified Master Therapists',
      'Private Hydrotherapy Suites',
      'Organic Javanese Botanical Products',
    ],
  },
  {
    id: 'eden-kids-park',
    title: 'Eden Playground & Children’s Zone',
    category: 'Family',
    description: 'Safe, gated outdoor playground and indoor activity lounge designed for young resort guests.',
    operatingHours: '08:00 - 18:00 Daily',
    image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=1600&auto=format&fit=crop',
    highlights: [
      'Outdoor Swings & Timber Climbing Frames',
      'Supervised Activity Corner',
    ],
  },
  {
    id: 'fitness-center',
    title: 'Highland Fitness Gym',
    category: 'Wellness',
    description: 'Fully-equipped fitness studio featuring modern cardio machines, free weights, and floor-to-ceiling garden views.',
    operatingHours: '06:00 - 21:00 Daily',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop',
    highlights: [
      'Treadmills & Ellipticals',
      'Yoga & Stretching Area',
    ],
  },
];
