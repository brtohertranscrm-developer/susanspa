export const websiteImageSlots = [
  { name: 'homePoster', label: 'Beranda - Poster video utama' },
  { name: 'roomsHero', label: 'Kamar - Banner utama' },
  { name: 'spaHero', label: 'Spa - Banner utama' },
  { name: 'diningHero', label: 'Dining - Banner utama' },
  { name: 'facilitiesHero', label: 'Fasilitas - Banner utama' },
  { name: 'weddingHero', label: 'Wedding - Banner utama' },
  { name: 'weddingVenue', label: 'Wedding - Foto venue' },
  { name: 'weddingCelebration', label: 'Wedding - Foto perayaan' },
  { name: 'galleryHero', label: 'Galeri - Banner utama' },
  { name: 'offersHero', label: 'Promo - Banner utama' },
  { name: 'experiencesHero', label: 'Pengalaman - Banner utama' },
  { name: 'nearbyHero', label: 'Wisata sekitar - Banner utama' },
  { name: 'aboutHero', label: 'Tentang resort - Banner utama' },
  { name: 'eventsHero', label: 'Acara - Banner utama' },
  { name: 'showcaseSpa', label: 'Beranda Best of - Spa' },
  { name: 'showcaseWedding', label: 'Beranda Best of - Wedding' },
  { name: 'showcaseDining', label: 'Beranda Best of - Dining' },
  { name: 'showcaseOffers', label: 'Beranda Best of - Promo' },
  { name: 'logoGold', label: 'Logo - Header emas' },
  { name: 'logoDark', label: 'Logo - Menu gelap' },
] as const

export type WebsiteImageSlot = (typeof websiteImageSlots)[number]['name'] | 'socialImage'
