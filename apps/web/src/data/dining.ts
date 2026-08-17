import { DiningVenue } from '@/types';

export const DINING_VENUES: DiningVenue[] = [
  {
    id: 'sky-garden-restaurant',
    name: 'Sky Garden Restaurant & Lounge',
    subtitle: 'Signature Highland Dining with Panoramic Valley Views',
    cuisine: 'Authentic Indonesian, Javanese Heritage & Western Fine Comfort',
    ambiance: 'Glass-walled romantic dining room & open-air terrace',
    operatingHours: '06:30 - 22:30 Daily',
    description: 'Perched above the resort gardens, Sky Garden Restaurant serves culinary creations prepared with fresh organic mountain produce sourced daily from Bandungan growers.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop',
    menuHighlights: [
      'Nasi Goreng Susan Special with Grilled Tiger Prawns',
      'Soto Ayam Highland Spice Infusion',
      'Charcoal-Grilled Wagyu Ribeye with Herbal Butter',
      'Wedang Ronde & Traditional Bandungan Dessert',
    ],
  },
  {
    id: 'private-chapel-dining',
    name: 'La Kana Romantic Candlelight Dinner',
    subtitle: 'Exclusive Two-Person Private Dining at La Kana Deck',
    cuisine: '5-Course Gourmet Degustation Menu',
    ambiance: 'Intimate candlelight, violin accompaniment, and starry night mountain skies',
    operatingHours: '19:00 - 22:00 (Advance Reservation Required)',
    description: 'An unforgettable private dining experience reserved for one couple per evening at the terrace of La Kana Chapel.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop',
    menuHighlights: [
      'Pan-Seared Salmon with Lemon Herb Emulsion',
      'Truffle Mushroom Cream Soup',
      'Artisanal Chocolate Fondant with Strawberry Sorbet',
      'Complimentary Sparkling Rose Wine',
    ],
  },
];
