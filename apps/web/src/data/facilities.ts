import { Facility } from '@/types';

export interface FacilityGroup {
  category: 'Wellness' | 'Dining' | 'Family & Recreation' | 'Events' | 'Guest Services';
  title: string;
  description: string;
  items: Facility[];
}

export const FACILITIES: Facility[] = [
  // Wellness
  {
    id: 'spa',
    title: 'Susan Spa on the Sky',
    category: 'Wellness',
    description: 'Luxury wellness experience dengan panorama pegunungan Bandungan. Menyajikan ritual herbal Jawa dan signature massage untuk relaksasi tubuh dan pikiran.',
    operatingHours: '09:00 - 21:00 Daily',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop',
    highlights: ['Signature herbal treatments', 'Private treatment suites', 'Certified master therapists'],
    iconName: 'Sparkles',
  },
  {
    id: 'sauna',
    title: 'Highland Herbal Sauna',
    category: 'Wellness',
    description: 'Ruang sauna dengan infus rempah alami untuk detoksifikasi optimal di tengah sejuknya udara pegunungan Bandungan.',
    operatingHours: '07:00 - 20:00 Daily',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1600&auto=format&fit=crop',
    highlights: ['Herbal aroma infusion', 'Detoxification therapy', 'Relaxing wood bench interior'],
    iconName: 'Flame',
  },
  {
    id: 'jacuzzi',
    title: 'Hydrotherapy Jacuzzi',
    category: 'Wellness',
    description: 'Pusaran air hangat hydrotherapy yang merilekskan otot-otot tegang dengan panorama alam lereng Gunung Ungaran.',
    operatingHours: '06:00 - 20:00 Daily',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1600&auto=format&fit=crop',
    highlights: ['Warm temperature controlled', 'Targeted massage hydro-jets', 'Mountain view deck'],
    iconName: 'Waves',
  },
  {
    id: 'fitness-center',
    title: 'Fitness Center',
    category: 'Wellness',
    description: 'Pusat kebugaran lengkap dengan peralatan cardio dan beban modern serta pemandangan taman tropis.',
    operatingHours: '06:00 - 21:00 Daily',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop',
    highlights: ['Treadmills & ellipticals', 'Free weights & benches', 'Garden vista'],
    iconName: 'Dumbbell',
  },
  {
    id: 'heated-pool',
    title: 'Heated Swimming Pool',
    category: 'Wellness',
    description: 'Kolam renang berair hangat semi-indoor dengan pemandangan terbuka menghadap lembah dan bukit hijau Bandungan.',
    operatingHours: '06:00 - 20:00 Daily',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1600&auto=format&fit=crop',
    highlights: ['Warm water maintained ~30°C', 'Valley panorama', 'Sun loungers & pool towel service'],
    iconName: 'Droplets',
  },

  // Dining
  {
    id: 'restaurant',
    title: 'Sky Garden Restaurant',
    category: 'Dining',
    description: 'Restoran utama menyajikan hidangan autentik Nusantara, Asia, dan Western dengan pemandangan pegunungan dari ketinggian 1,100m ASL.',
    operatingHours: '06:00 - 22:00 Daily',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop',
    highlights: ['Buffet breakfast & a la carte', 'Panoramic outdoor terrace', 'Fresh local ingredients'],
    iconName: 'Utensils',
  },
  {
    id: 'cafe',
    title: 'Panoramic Cafe',
    category: 'Dining',
    description: 'Tempat bersantai menikmati udara segar pegunungan ditemani artisan pastries, light bites, dan mocktail segar.',
    operatingHours: '10:00 - 22:00 Daily',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1600&auto=format&fit=crop',
    highlights: ['Pastries & light snacks', 'Highland cool breeze', 'Instagrammable seats'],
    iconName: 'Coffee',
  },
  {
    id: 'coffee-tea',
    title: 'Specialty Coffee & Tea Lounge',
    category: 'Dining',
    description: 'Koleksi seduhan kopi lokal Jawa Tengah dan ragam teh herbal hangat yang menyegarkan tubuh di udara dingin.',
    operatingHours: '07:00 - 22:00 Daily',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1600&auto=format&fit=crop',
    highlights: ['Single-origin Javanese coffee', 'Artisan herbal tea blends', 'Cozy fireplace seating'],
    iconName: 'CupSoda',
  },

  // Family & Recreation
  {
    id: 'kids-playground',
    title: 'Kids Playground',
    category: 'Family & Recreation',
    description: 'Taman bermain anak outdoor yang aman dan menyenangkan di tengah taman hijau berhawa sejuk.',
    operatingHours: '08:00 - 18:00 Daily',
    image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=1600&auto=format&fit=crop',
    highlights: ['Outdoor swings & slides', 'Safe soft ground cover', 'Lush flower garden surroundings'],
    iconName: 'Smile',
  },
  {
    id: 'mini-zoo',
    title: 'Mini Zoo & Animal Interaction',
    category: 'Family & Recreation',
    description: 'Wahana edukatif keluarga untuk berinteraksi dan memberi makan satwa jinak seperti kelinci dan burung.',
    operatingHours: '08:00 - 17:00 Daily',
    image: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?q=80&w=1600&auto=format&fit=crop',
    highlights: ['Animal feeding experience', 'Kid-friendly education', 'Supervised enclosure'],
    iconName: 'HeartHandshake',
  },
  {
    id: 'horse-riding',
    title: 'Highland Horse Riding',
    category: 'Family & Recreation',
    description: 'Pengalaman berkuda mengitari jalur asri lereng resort didampingi pemandu terlatih.',
    operatingHours: '08:00 - 16:30 Daily',
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=1600&auto=format&fit=crop',
    highlights: ['Scenic resort track', 'Gentle trained ponies & horses', 'Guided supervision'],
    iconName: 'Compass',
  },

  // Events
  {
    id: 'la-kana-chapel',
    title: 'La Kana Chapel',
    category: 'Events',
    description: 'Kapel kaca ikonik di atas awan dengan altar transparan berlatar panorama Gunung Ungaran untuk Holy Matrimony dan momen sakral tak terlupakan.',
    operatingHours: 'By Reservation',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
    highlights: ['Full glass altar architecture', 'Panoramic mountain backdrop', 'Intimate seating up to 100 guests'],
    iconName: 'Church',
  },
  {
    id: 'grand-ballroom',
    title: 'Frangipani Grand Ballroom',
    category: 'Events',
    description: 'Ballroom megah berkapasitas besar untuk resepsi pernikahan, gala dinner, dan seminar prestisius.',
    operatingHours: 'By Reservation',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600&auto=format&fit=crop',
    highlights: ['Capacity up to 500 guests', 'Professional sound & lighting', 'Flexible banquet setups'],
    iconName: 'Crown',
  },
  {
    id: 'meeting-room',
    title: 'Meeting & Conference Rooms',
    category: 'Events',
    description: 'Ruang pertemuan representatif dengan fasilitas audio-visual modern dan layanan coffee break eksklusif.',
    operatingHours: 'By Reservation',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1600&auto=format&fit=crop',
    highlights: ['High-speed WiFi & projector', 'Executive boardroom layout', 'Customizable catering packages'],
    iconName: 'Briefcase',
  },

  // Guest Services
  {
    id: 'free-wifi',
    title: 'Free High-Speed WiFi',
    category: 'Guest Services',
    description: 'Konektivitas internet berkecepatan tinggi di seluruh area kamar, villa, restoran, hingga fasilitas publik resort.',
    operatingHours: '24 Hours',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1600&auto=format&fit=crop',
    highlights: ['Resort-wide coverage', 'Fast streaming capability', 'Complimentary access'],
    iconName: 'Wifi',
  },
  {
    id: 'laundry',
    title: 'Laundry & Dry Cleaning',
    category: 'Guest Services',
    description: 'Layanan pencucian dan setrika profesional untuk kenyamanan maksimal selama Anda menginap.',
    operatingHours: '07:00 - 19:00 Daily',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=1600&auto=format&fit=crop',
    highlights: ['Same-day service available', 'Gentle fabric care', 'Convenient room pickup'],
    iconName: 'Shirt',
  },
  {
    id: 'security-24h',
    title: '24-Hour Security & CCTV',
    category: 'Guest Services',
    description: 'Sistem pengamanan terpadu 24 jam dengan petugas keamanan profesional dan pemantauan kamera CCTV di seluruh area resort.',
    operatingHours: '24 Hours',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1600&auto=format&fit=crop',
    highlights: ['24/7 on-site patrol', 'Secure gate access', 'Peace of mind guaranteed'],
    iconName: 'ShieldCheck',
  },
  {
    id: 'welcome-drink',
    title: 'Highland Welcome Drink',
    category: 'Guest Services',
    description: 'Sajian minuman sambutan tradisional hangat atau segar khas Bandungan menyapa kedatangan Anda di lobby resort.',
    operatingHours: 'Check-in hours',
    image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?q=80&w=1600&auto=format&fit=crop',
    highlights: ['Authentic local herbal blend', 'Refreshed upon arrival', 'Hospitality touch'],
    iconName: 'GlassWater',
  },
  {
    id: 'wake-up-service',
    title: 'Wake-Up Call Service',
    category: 'Guest Services',
    description: 'Layanan panggilan bangun pagi tepat waktu dari staf front office untuk memastikan Anda tidak melewatkan sunrise atau agenda penting.',
    operatingHours: '24 Hours on request',
    image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=1600&auto=format&fit=crop',
    highlights: ['Personalized alarm call', 'Front desk assistance', 'Sunrise viewing prep'],
    iconName: 'Bell',
  },
];

export const FACILITY_GROUPS: FacilityGroup[] = [
  {
    category: 'Wellness',
    title: 'Wellness & Relaxation',
    description: 'Fasilitas relaksasi eksklusif di atas awan untuk meremajakan tubuh dan pikiran.',
    items: FACILITIES.filter((f) => f.category === 'Wellness'),
  },
  {
    category: 'Dining',
    title: 'Dining & Refreshments',
    description: 'Kelezatan kuliner lokal dan internasional dengan pemandangan pegunungan yang memukau.',
    items: FACILITIES.filter((f) => f.category === 'Dining'),
  },
  {
    category: 'Family & Recreation',
    title: 'Family & Recreation',
    description: 'Aktivitas seru dan edukatif untuk menciptakan kenangan indah bersama keluarga tercinta.',
    items: FACILITIES.filter((f) => f.category === 'Family & Recreation'),
  },
  {
    category: 'Events',
    title: 'Weddings & Celebrations',
    description: 'Venue prestisius untuk momen sakral pernikahan, perayaan pribadi, dan pertemuan korporat.',
    items: FACILITIES.filter((f) => f.category === 'Events'),
  },
  {
    category: 'Guest Services',
    title: 'Guest Services & Hospitality',
    description: 'Kenyamanan dan ketenangan menginap didukung layanan prima 24 jam.',
    items: FACILITIES.filter((f) => f.category === 'Guest Services'),
  },
];

// 9 Featured Facilities recommended for Homepage
export const FEATURED_FACILITIES = [
  { id: 'heated-pool', name: 'Heated Swimming Pool', category: 'Wellness', image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop' },
  { id: 'spa', name: 'Spa on the Sky', category: 'Wellness', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop' },
  { id: 'jacuzzi', name: 'Jacuzzi Whirlpool', category: 'Wellness', image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop' },
  { id: 'sauna', name: 'Herbal Sauna', category: 'Wellness', image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop' },
  { id: 'fitness-center', name: 'Fitness Center', category: 'Wellness', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop' },
  { id: 'kids-playground', name: 'Kids Playground', category: 'Family', image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800&auto=format&fit=crop' },
  { id: 'la-kana-chapel', name: 'La Kana Chapel', category: 'Events', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop' },
  { id: 'restaurant', name: 'Sky Garden Restaurant', category: 'Dining', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop' },
  { id: 'free-wifi', name: 'Free High-Speed WiFi', category: 'Guest Services', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop' },
];
