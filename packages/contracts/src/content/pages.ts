import { group, image, list, page, select, text, textarea, video } from './schema.js'
import { IMAGEKIT_BASE, hero, sectionHeading, seo, simpleHero } from './shared.js'

const UNSPLASH = 'https://images.unsplash.com'

export const FACILITY_CATEGORIES = [
  { label: 'Wellness', value: 'Wellness' },
  { label: 'Restoran & kafe', value: 'Dining' },
  { label: 'Keluarga & rekreasi', value: 'Family & Recreation' },
  { label: 'Acara & pernikahan', value: 'Events' },
  { label: 'Layanan tamu', value: 'Guest Services' },
] as const

export type FacilityCategory = (typeof FACILITY_CATEGORIES)[number]['value']

export const homePage = page(
  'page-home',
  'Beranda',
  [
    group('hero', 'Header beranda', [
      video('video', 'Video header', '/videos/hero.mp4', {
        description: 'Video MP4 yang diputar otomatis tanpa suara. Kosongkan untuk memakai video bawaan.',
      }),
      image('poster', 'Foto sebelum video tampil', '/images/hero/hero-resort.jpg'),
      text('title', 'Judul besar', 'Susan Spa & Resort'),
      text('subtitle', 'Subjudul', 'Ketenangan Alam. Kenyamanan Berkelas.'),
      text('scrollLabel', 'Teks ajakan gulir ke bawah', 'Jelajahi Resort'),
    ]),
    sectionHeading('intro', 'Bagian sambutan', {
      eyebrow: 'SELAMAT DATANG DI BANDUNGAN',
      title: 'Ketenangan di Atas Awan, Ketinggian 1.100 Meter',
      intro:
        'Susan Spa & Resort merupakan destinasi peristirahatan dan pemulihan jiwa di lereng Gunung Ungaran, Bandungan. Dikelilingi udara pegunungan yang senantiasa sejuk dan panorama lembah hijau yang membentang luas, kami menyambut kehadiran Anda untuk menikmati perpaduan kenyamanan akomodasi modern serta ketenangan alam yang bersahaja.\n\nSetiap sudut resort dirancang secara cermat guna memberikan ruang bernapas yang leluasa: melepas kepenatan rutinitas harian, menikmati ritual herbal luhur di Spa on the Sky, dan merayakan momen berharga bersama keluarga.',
    }),
    text('introLinkLabel', 'Tombol di bawah sambutan', 'Jelajahi Seluruh Fasilitas Resort'),
    text('introLinkUrl', 'Alamat tombol di bawah sambutan', '/facilities'),
    list(
      'featuredRooms',
      'Kamar unggulan',
      [text('slug', 'Slug kamar', '', { description: 'Lihat slug di menu Kamar, bagian Pengaturan teknis.' })],
      [{ slug: 'aurora-junior-suite' }, { slug: 'grand-suite' }, { slug: 'villa-4-bedrooms' }],
      { rowLabel: 'Kamar', description: 'Urutan di sini menjadi urutan di beranda. Kosongkan untuk menampilkan tiga kamar pertama.' },
    ),
    text('roomsTitle', 'Judul bagian kamar', 'The Villas'),
    textarea(
      'roomsIntro',
      'Paragraf bagian kamar',
      'Dari peristirahatan romantis pasangan hingga hunian luas villa keluarga, setiap akomodasi di Susan Spa & Resort menghadirkan suaka privat dengan ketenangan dan karakter tersendiri.',
    ),
    text('roomsCardLabel', 'Label kecil di kartu kamar', 'SUSAN SPA & RESORT'),
    text('roomsButtonLabel', 'Tombol semua kamar', 'VIEW ALL VILLAS'),
    text('bestOfTitle', 'Judul bagian sorotan', 'The Best of Susan Spa'),
    list(
      'bestOf',
      'Kartu sorotan',
      [image('image', 'Foto', ''), text('title', 'Judul', ''), text('href', 'Alamat tujuan', '/')],
      [
        { image: `${IMAGEKIT_BASE}/MNP_4476.avif?tr=w-1200`, title: 'Spa on the Sky Sanctuary', href: '/spa' },
        { image: '/images/wedding/wedding-chapel-1.jpg', title: 'Momen Pernikahan di La Kana', href: '/wedding' },
        { image: `${IMAGEKIT_BASE}/MNP_4164%20copy.avif?tr=w-1200`, title: 'Sky Garden Dining & Panorama', href: '/dining' },
        { image: `${IMAGEKIT_BASE}/MNP_3499%20copy%202.avif?tr=w-1200`, title: 'Paket Liburan & Penawaran', href: '/offers' },
      ],
      { rowLabel: 'Kartu' },
    ),
    sectionHeading('location', 'Bagian lokasi', {
      eyebrow: 'LOKASI & AKSES RESORT',
      title: 'Kunjungi Susan Spa & Resort di Bandungan',
      intro: '{alamat}. Berada di ketinggian ±1.100 mdpl lereng Gunung Ungaran dengan udara sejuk dan pemandangan asri.',
    }),
    text('mapsButtonLabel', 'Tombol Google Maps', 'Buka Google Maps'),
    text('directionsButtonLabel', 'Tombol petunjuk arah WhatsApp', 'Chat Petunjuk Arah'),
    textarea('directionsMessage', 'Pesan WhatsApp petunjuk arah', 'Halo Susan Spa & Resort, mohon panduan arah menuju lokasi resort.'),
    seo({ title: '', description: '' }),
  ],
  'Isi halaman depan. Tulis {alamat} untuk menampilkan alamat dari Pengaturan Situs.',
)

export const aboutPage = page('page-about', 'Tentang Kami', [
  hero({
    image: `${UNSPLASH}/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop`,
    imageAlt: 'Suasana Susan Spa & Resort',
    title: 'Peristirahatan Sejuk di Atas Bandungan',
    subtitle: 'KISAH & FILOSOFI KAMI',
    scrollLabel: 'Jelajahi',
  }),
  text('storyTitle', 'Judul kisah', 'Kesejukan Alami & Keramahan Penuh Ketulusan'),
  textarea(
    'storyBody',
    'Isi kisah',
    'Dihadirkan sebagai tempat rehat yang menenangkan dari padatnya ritme perkotaan, Susan Spa & Resort memadukan keramahtamahan tradisi Jawa dengan fasilitas kenyamanan modern. Dikelilingi udara pegunungan yang bersih, rimbunnya pepohonan lereng bukit, dan panorama lembah yang membentang luas.',
  ),
  list(
    'pillars',
    'Kartu keunggulan',
    [
      select('icon', 'Ikon', [
        { label: 'Kompas', value: 'compass' },
        { label: 'Huruf S', value: 'letter' },
        { label: 'Hati', value: 'heart' },
        { label: 'Daun', value: 'leaf' },
        { label: 'Gunung', value: 'mountain' },
      ], 'compass'),
      text('title', 'Judul', ''),
      textarea('body', 'Isi', ''),
    ],
    [
      { icon: 'compass', title: 'Hawa Sejuk Pegunungan', body: 'Suhu udara rata-rata 18°C hingga 24°C di ketinggian ±1.100 mdpl sepanjang tahun.' },
      { icon: 'letter', title: 'Tradisi Spa Autentik', body: 'Terinspirasi dari ritual perawatan lulur rempah warisan budaya keraton Jawa.' },
      { icon: 'heart', title: 'Destinasi Pernikahan Ikonik', body: 'Menghadirkan kapel kaca La Kana dengan latar panorama perbukitan yang megah.' },
    ],
    { rowLabel: 'Kartu' },
  ),
  seo({ title: 'Tentang Kami', description: '' }),
])

export const roomsPage = page('page-rooms', 'Kamar & Villa', [
  hero({
    image: '/images/rooms/room-1.jpg',
    imageAlt: 'Kamar dan suite Susan Spa & Resort',
    title: 'Koleksi Kamar & Villa',
    subtitle: 'PILIHAN AKOMODASI RESORT',
    scrollLabel: 'Jelajahi Kamar',
  }),
  text('allFilterLabel', 'Tombol filter semua kamar', 'Semua Kamar ({jumlah})', { description: '{jumlah} diganti jumlah kamar.' }),
  seo({
    title: 'Kamar, Suite & Villa',
    description: 'Kenyamanan, kehangatan, dan ketenangan lereng pegunungan Bandungan. Jelajahi 11 pilihan suite, villa, dan kamar keluarga kami.',
  }),
])

export const spaPage = page('page-spa', 'Spa', [
  hero({
    image: `${IMAGEKIT_BASE}/IMG_0174.avif?tr=w-1920`,
    imageAlt: 'Ruang perawatan Susan Spa',
    title: 'Ritual Spa Tradisional',
    subtitle: 'KESEGARAN & KETENANGAN ALAMI',
    scrollLabel: 'Jelajahi Perawatan',
  }),
  sectionHeading('menu', 'Bagian daftar perawatan', {
    eyebrow: 'PILIHAN PERAWATAN SPA',
    title: 'Pengalaman Relaksasi Menyeluruh',
  }),
  seo({
    title: 'Spa & Wellness Sanctuary',
    description: 'Rasakan kesegaran ritual lulur rempah tradisional Jawa, terapi batu basal hangat Gunung Ungaran, dan hidroterapi di Susan Spa & Resort.',
  }),
])

export const diningPage = page('page-dining', 'Restoran & Kafe', [
  hero({
    image: `${IMAGEKIT_BASE}/MNP_4164%20copy.avif?tr=w-1920`,
    imageAlt: 'Sky Garden Restaurant',
    title: 'Restoran & Kuliner Pilihan',
    subtitle: 'PENGALAMAN KULINER PEGUNUNGAN',
    scrollLabel: 'Jelajahi',
  }),
  text('menuHeading', 'Judul daftar menu', 'Menu Pilihan'),
  text('reserveButtonLabel', 'Tombol reservasi meja', 'Reservasi Meja Restoran'),
  textarea('reserveMessage', 'Pesan WhatsApp reservasi meja', 'Halo Tim Restoran Susan Spa & Resort, saya ingin reservasi meja di {nama}.', {
    description: '{nama} diganti nama restoran.',
  }),
  textarea('whatsappMessage', 'Pesan tombol WhatsApp melayang', 'Halo Concierge Restoran Susan Spa, saya ingin menanyakan reservasi meja di Sky Garden Restaurant.'),
  seo({ title: 'Restoran & Kafe', description: '' }),
])

export const experiencesPage = page('page-experiences', 'Pengalaman', [
  hero({
    image: `${UNSPLASH}/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop`,
    imageAlt: 'Aktivitas di sekitar resort',
    title: 'Pengalaman Berkesan di Dataran Tinggi',
    subtitle: 'AKTIVITAS & EKSPLORASI RESORT',
    scrollLabel: 'Jelajahi',
  }),
  text('reserveButtonLabel', 'Tombol reservasi', 'Reservasi Aktivitas'),
  seo({ title: 'Pengalaman', description: '' }),
])

export const facilitiesPage = page('page-facilities', 'Fasilitas', [
  hero({
    image: `${UNSPLASH}/photo-1576013551627-0cc20b96c2a7?q=80&w=2000&auto=format&fit=crop`,
    imageAlt: 'Fasilitas Susan Spa & Resort',
    title: 'Fasilitas Resort',
    subtitle: 'FASILITAS & PENGALAMAN RESORT',
    scrollLabel: 'Jelajahi Fasilitas',
  }),
  text('allFilterLabel', 'Tombol filter semua fasilitas', 'Semua Fasilitas'),
  list(
    'groups',
    'Kelompok fasilitas',
    [
      select('category', 'Kategori', FACILITY_CATEGORIES, 'Wellness'),
      text('label', 'Nama tombol filter', ''),
      text('title', 'Judul kelompok', ''),
      textarea('description', 'Deskripsi kelompok', ''),
    ],
    [
      {
        category: 'Wellness',
        label: 'Wellness',
        title: 'Wellness & Relaksasi Holistik',
        description: 'Fasilitas pemulihan kebugaran tubuh dan ketenangan pikiran di atas awan lereng Gunung Ungaran.',
      },
      {
        category: 'Dining',
        label: 'Kuliner',
        title: 'Santapan & Minuman Segar',
        description: 'Kelezatan kuliner Nusantara dan internasional dengan latar panorama pegunungan yang menyejukkan.',
      },
      {
        category: 'Family & Recreation',
        label: 'Keluarga & Rekreasi',
        title: 'Keluarga & Rekreasi Alam',
        description: 'Aktivitas menyenangkan dan sarana rekreasi untuk menciptakan momen berharga bersama keluarga tercinta.',
      },
      {
        category: 'Events',
        label: 'Acara',
        title: 'Pernikahan & Acara Spesial',
        description: 'Venue berkelas dan tertata anggun untuk ikrar pernikahan sakral, perayaan pribadi, serta pertemuan bisnis.',
      },
      {
        category: 'Guest Services',
        label: 'Layanan Tamu',
        title: 'Layanan Keramahan Tamu',
        description: 'Kenyamanan, keamanan, dan kemudahan istirahat Anda senantiasa didukung layanan prima staf kami selama 24 jam.',
      },
    ],
    { rowLabel: 'Kelompok', description: 'Fasilitas masuk ke kelompok sesuai Kategori Fasilitas di menu Info Resort.' },
  ),
  sectionHeading('cta', 'Ajakan di bawah halaman', {
    eyebrow: 'PERISTIRAHATAN MENENANGKAN DI BANDUNGAN',
    title: 'Nikmati Pengalaman Menenangkan Bersama Kami',
    intro: 'Kami mengundang Bapak/Ibu untuk menikmati seluruh fasilitas unggulan Susan Spa & Resort dalam suasana pegunungan yang asri dan sejuk.',
  }),
  text('ctaButtonLabel', 'Tombol ajakan', 'Reservasi Kamar Sekarang'),
  seo({ title: 'Fasilitas', description: '' }),
])

export const galleryPage = page('page-gallery', 'Galeri', [
  hero({
    image: '/images/wedding/wedding-chapel-1.jpg',
    imageAlt: 'Galeri Susan Spa & Resort',
    title: 'Galeri Susan Spa',
    subtitle: 'MOMEN & KEINDAHAN RESORT',
    scrollLabel: 'Lihat Galeri',
  }),
  seo({ title: 'Galeri', description: '' }),
])

export const nearbyPage = page('page-nearby', 'Wisata Sekitar', [
  hero({
    image: `${UNSPLASH}/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop`,
    imageAlt: 'Pemandangan Bandungan',
    title: 'Wisata Sekitar',
    subtitle: 'PANDUAN DESTINASI',
    scrollLabel: 'Lihat Destinasi',
  }),
  seo({ title: 'Wisata Sekitar', description: '' }),
])

export const offersPage = page('page-offers', 'Promo', [
  hero({
    image: `${UNSPLASH}/photo-1591088398332-8a7791972843?q=80&w=2000&auto=format&fit=crop`,
    imageAlt: 'Paket menginap Susan Spa & Resort',
    title: 'Paket Menginap Pilihan',
    subtitle: 'PENAWARAN SPESIAL',
    scrollLabel: 'Lihat Paket',
  }),
  text('inclusionsHeading', 'Judul daftar inklusi', 'Inklusi Paket'),
  text('reserveButtonLabel', 'Tombol tanya paket', 'Tanya Ketersediaan Paket'),
  seo({ title: 'Promo & Paket', description: '' }),
])

export const weddingPage = page('page-wedding', 'Wedding', [
  hero({
    image: '/images/wedding/wedding-chapel-1.jpg',
    imageAlt: 'La Kana Chapel Susan Spa & Resort',
    title: 'Tempat Pernikahan Termewah Impian Anda',
    subtitle: 'Perayaan Cinta Berlatar Keindahan Gunung Ungaran',
    scrollLabel: 'Jelajahi Paket',
  }),
  sectionHeading('packages', 'Bagian paket', {
    eyebrow: 'PILIHAN PAKET PERNIKAHAN',
    title: 'Paket Pernikahan Pilihan',
    intro: 'Pilihan paket pernikahan terpadu di Kapel Kaca La Kana, didukung jamuan prasmanan istimewa serta pendampingan wedding coordinator profesional.',
  }),
  text('inclusionsHeading', 'Judul daftar inklusi di kartu', 'Fasilitas & Inklusi Utama:'),
  text('detailButtonLabel', 'Tombol detail paket', 'Detail Paket'),
  text('consultButtonLabel', 'Tombol konsultasi', 'Konsultasi'),
  sectionHeading('venues', 'Bagian venue', {
    eyebrow: 'VENUE PERNIKAHAN IKONIK',
    title: 'Pilihan Venue Pernikahan Ikonik',
  }),
  list(
    'venueList',
    'Daftar venue',
    [
      image('image', 'Foto', ''),
      select('icon', 'Ikon', [
        { label: 'Kapel', value: 'church' },
        { label: 'Tamu', value: 'users' },
        { label: 'Lokasi', value: 'map' },
      ], 'church'),
      text('label', 'Label kecil', ''),
      text('title', 'Nama venue', ''),
      textarea('body', 'Deskripsi', ''),
    ],
    [
      {
        image: '/images/wedding/wedding-chapel-1.jpg',
        icon: 'church',
        label: 'Indoor Chapel',
        title: 'La Kana Chapel',
        body: 'Kapel kaca berarsitektur segitiga modern dengan altar bening berlatar pegunungan Ungaran, menciptakan momen janji suci yang sakral dan megah.',
      },
      {
        image: '/images/wedding/wedding-chapel-2.jpg',
        icon: 'users',
        label: 'Outdoor Garden',
        title: 'Sky Garden Outdoor Lawn',
        body: 'Halaman rumput asri berhawa sejuk pegunungan untuk perayaan resepsi pesta kebun beratapkan langit senja atau gemerlap lampu malam hari.',
      },
      {
        image: '/images/wedding/wedding-chapel-1.jpg',
        icon: 'map',
        label: 'Grand Ballroom',
        title: 'Frangipani Ballroom',
        body: 'Ruang resepsi indoor elegan dengan pencahayaan hangat, panggung megah, dan penataan meja perjamuan makan formal yang nyaman.',
      },
    ],
    { rowLabel: 'Venue' },
  ),
  seo({ title: 'Wedding La Kana Chapel', description: '' }),
])

export const ballroomPage = page('page-ballroom', 'Ballroom & Meeting', [
  hero({
    image: `${IMAGEKIT_BASE}/MNP_4055%20copy.avif?tr=w-1920`,
    imageAlt: 'Ballroom Susan Spa & Resort dengan meja bundar berhias kain emas dan panggung di bagian belakang',
    title: 'Ballroom & Meeting Room',
    subtitle: 'Resepsi, Seminar & Pertemuan Bisnis',
    scrollLabel: 'Jelajahi',
  }),
  list(
    'spaces',
    'Ruangan',
    [
      image('image', 'Foto', ''),
      text('imageAlt', 'Deskripsi foto', ''),
      text('eyebrow', 'Label kecil', ''),
      text('title', 'Nama ruangan', ''),
      textarea('body', 'Deskripsi', ''),
      list('features', 'Keunggulan', [text('label', 'Keunggulan', '')], [], { rowLabel: 'Keunggulan' }),
      text('buttonLabel', 'Tombol', 'Konsultasi Acara'),
    ],
    [
      {
        image: `${IMAGEKIT_BASE}/MNP_4388%20copy.avif?tr=w-1600`,
        imageAlt: 'Ballroom dengan susunan kursi teater menghadap panggung dan dua layar proyektor',
        eyebrow: 'Ballroom',
        title: 'Frangipani Grand Ballroom',
        body: 'Ballroom luas dan megah berfasilitas audio-visual modern, siap mengakomodasi resepsi pernikahan, jamuan makan malam keluarga, maupun seminar perusahaan.',
        features: [{ label: 'Tata suara & pencahayaan profesional' }, { label: 'Penataan ruangan fleksibel' }],
        buttonLabel: 'Konsultasi Acara',
      },
      {
        image: `${IMAGEKIT_BASE}/MNP_4026%20copy.avif?tr=w-1600`,
        imageAlt: 'Ruang meeting dengan susunan meja berbentuk U, kursi berpita bermotif, dan proyektor',
        eyebrow: 'Ruang Pertemuan',
        title: 'Meeting & Conference Rooms',
        body: 'Ruang pertemuan representatif dengan tata letak fleksibel, fasilitas proyektor modern, dan layanan jamuan rehat kopi eksklusif untuk kelancaran agenda bisnis Anda.',
        features: [
          { label: 'Koneksi WiFi cepat & proyektor' },
          { label: 'Tata ruang rapat eksekutif' },
          { label: 'Paket katering dapat disesuaikan' },
        ],
        buttonLabel: 'Konsultasi Acara',
      },
    ],
    { rowLabel: 'Ruangan', description: 'Foto dan teks tampil bergantian kiri dan kanan.' },
  ),
  textarea('whatsappMessage', 'Pesan tombol WhatsApp melayang', 'Halo Tim Acara Susan Spa & Resort, saya ingin berkonsultasi mengenai penggunaan ballroom dan ruang meeting.'),
  seo({
    title: 'Ballroom & Meeting Room',
    description: 'Ballroom luas berfasilitas audio-visual modern untuk resepsi, jamuan, dan seminar, serta ruang meeting dengan proyektor dan layanan rehat kopi.',
  }),
])

export const eventsPage = page('page-events', 'Acara & Meeting', [
  hero({
    image: `${UNSPLASH}/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop`,
    imageAlt: 'Ruang acara Susan Spa & Resort',
    title: 'Ruang Pertemuan & Acara Privat',
    subtitle: 'PERTEMUAN BISNIS & GATHERING',
    scrollLabel: 'Jelajahi',
  }),
  list(
    'cards',
    'Kartu ruang acara',
    [text('eyebrow', 'Label kecil', ''), text('title', 'Judul', ''), textarea('body', 'Isi', ''), text('buttonLabel', 'Tombol', 'Konsultasi Acara')],
    [
      {
        eyebrow: 'BALLROOM & RUANG PERTEMUAN',
        title: 'Grand Mountain Ballroom',
        body: 'Dilengkapi sistem audio visual modern, koneksi Wi-Fi stabil, dan tata pendingin udara. Siap mengakomodasi hingga 350 peserta dalam susunan teater.',
        buttonLabel: 'Konsultasi Acara',
      },
      {
        eyebrow: 'AREA OUTDOOR & TEAM BUILDING',
        title: 'Sky Lawn Outward Bound',
        body: 'Hamparan rumput hijau asri yang luas, ideal untuk aktivitas team-building, peregangan pagi, serta acara malam ramah tamah bernuansa alam terbuka.',
        buttonLabel: 'Konsultasi Acara',
      },
    ],
    { rowLabel: 'Kartu' },
  ),
  textarea('whatsappMessage', 'Pesan tombol WhatsApp melayang', 'Halo Tim Acara Susan Spa & Resort, saya ingin berkonsultasi mengenai penyelenggaraan meeting/gathering.'),
  seo({
    title: 'Ruang Pertemuan & Acara Privat',
    description: 'Penyelenggaraan retreat perusahaan, rapat kerja strategis, dan acara gathering keluarga di sejuknya lereng Bandungan.',
  }),
])

export const journalPage = page('page-journal', 'Jurnal', [
  simpleHero({
    eyebrow: 'ARTIKEL & INSPIRASI',
    title: 'Jurnal Susan Spa & Resort',
    intro: 'Inspirasi kebugaran alami, panduan pernikahan impian, dan kisah perjalanan di lereng pegunungan Bandungan.',
  }),
  text('readMoreLabel', 'Tombol baca artikel', 'Baca Selengkapnya'),
  seo({
    title: 'Jurnal & Inspirasi',
    description: 'Inspirasi kebugaran alami, panduan pernikahan sakral, dan kisah perjalanan di lereng pegunungan Bandungan.',
  }),
])

export const contactPage = page('page-contact', 'Kontak', [
  simpleHero({
    eyebrow: 'HUBUNGI KAMI',
    title: 'Kontak & Lokasi Resort',
    intro: 'Kami siap melayani kebutuhan informasi, reservasi kamar, jadwal spa, hingga konsultasi pernikahan Anda di Susan Spa & Resort.',
  }),
  sectionHeading('location', 'Bagian alamat', {
    eyebrow: 'ALAMAT RESMI & LAYANAN CONCIERGE',
    title: 'Lokasi di Dataran Tinggi Bandungan',
    intro: 'Susan Spa & Resort terletak di dataran tinggi lereng Gunung Ungaran (~1.100 mdpl) dengan suasana sejuk dan pemandangan lembah yang memukau.',
  }),
  text('addressCardTitle', 'Judul kartu alamat', 'Alamat Susan Spa & Resort'),
  text('whatsappEyebrow', 'Label kartu WhatsApp', 'Respon Cepat'),
  text('whatsappTitle', 'Judul kartu WhatsApp', 'WhatsApp Concierge'),
  text('whatsappBody', 'Isi kartu WhatsApp', 'Konsultasi cepat dan ramah bersama staf reservasi kami.'),
  textarea('whatsappMessage', 'Pesan WhatsApp', 'Halo Susan Spa & Resort, saya ingin bertanya tentang informasi reservasi.'),
  sectionHeading('form', 'Bagian formulir', {
    eyebrow: 'FORMULIR PERTANYAAN & RESERVASI',
    title: 'Kirim Pesan Kepada Kami',
    intro: 'Silakan sampaikan pertanyaan atau rencana kunjungan Anda, tim concierge kami akan segera merespons dengan senang hati.',
  }),
  group('formLabels', 'Label formulir', [
    text('nameLabel', 'Label nama', 'Nama Lengkap *'),
    text('namePlaceholder', 'Contoh isian nama', 'Nama lengkap Anda'),
    text('emailLabel', 'Label email', 'Alamat Email *'),
    text('emailPlaceholder', 'Contoh isian email', 'alamat@email.com'),
    text('phoneLabel', 'Label telepon', 'Nomor Telepon / WhatsApp *'),
    text('phonePlaceholder', 'Contoh isian telepon', '+62 812 xxxx xxxx'),
    text('subjectLabel', 'Label topik', 'Topik Pertanyaan / Keperluan'),
    text('subjectPlaceholder', 'Contoh isian topik', 'Contoh: Reservasi Kamar, Paket Wedding, Spa'),
    text('messageLabel', 'Label pesan', 'Pesan / Detail Kebutuhan Anda *'),
    text('messagePlaceholder', 'Contoh isian pesan', 'Tuliskan pesan atau pertanyaan Anda di sini...'),
    text('submitLabel', 'Tombol kirim', 'Kirim Pesan'),
    text('submittingLabel', 'Tombol saat mengirim', 'Sedang Mengirim...'),
    text('errorMessage', 'Pesan bila gagal terkirim', 'Pesan belum dapat dikirim.'),
  ]),
  text('successTitle', 'Judul setelah pesan terkirim', 'Terima Kasih'),
  textarea('successBody', 'Isi setelah pesan terkirim', 'Pesan Anda telah berhasil kami terima. Tim reservasi kami akan merespons melalui Email atau WhatsApp segera.'),
  text('sendAnotherLabel', 'Tombol kirim pesan lain', 'Kirim Pesan Lain'),
  sectionHeading('map', 'Bagian peta', { eyebrow: 'PETA LOKASI INTERAKTIF', title: 'Petunjuk Arah Google Maps' }),
  text('mapButtonLabel', 'Tombol rute', 'Buka Rute Perjalanan'),
  seo({
    title: 'Kontak & Lokasi',
    description: 'Hubungi concierge Susan Spa & Resort Bandungan untuk reservasi kamar, perawatan spa, paket pernikahan, dan acara pertemuan.',
  }),
])

export const reservePage = page('page-reserve', 'Reservasi', [
  simpleHero({
    eyebrow: 'LAYANAN RESERVASI RESMI',
    title: 'Rencanakan Kunjungan Anda di Susan Spa & Resort',
    intro:
      'Ketinggian ±1.100 mdpl lereng Gunung Ungaran, Bandungan. Silakan lengkapi formulir reservasi di bawah ini atau hubungi tim reservasi kami secara langsung via WhatsApp.',
  }),
  group('formLabels', 'Label formulir', [
    text('typeLabel', 'Label pilihan kategori', 'Pilih Kategori Reservasi'),
    text('typeRoom', 'Kategori kamar', 'Kamar & Villa'),
    text('typeSpa', 'Kategori spa', 'Spa & Wellness'),
    text('typeWedding', 'Kategori pernikahan', 'Pernikahan'),
    text('roomLabel', 'Label pilihan kamar', 'Pilihan Tipe Kamar / Villa *'),
    text('checkInLabel', 'Label check-in', 'Check-In *'),
    text('checkOutLabel', 'Label check-out', 'Check-Out *'),
    text('guestsLabel', 'Label jumlah tamu', 'Jumlah Tamu *'),
    text('guestsOption', 'Pilihan jumlah tamu', '{jumlah} Tamu', { description: '{jumlah} diganti angka.' }),
    text('targetDateLabel', 'Label tanggal kunjungan', 'Rencana Tanggal Kunjungan *'),
    text('nameLabel', 'Label nama', 'Nama Lengkap Anda *'),
    text('namePlaceholder', 'Contoh isian nama', 'Nama lengkap pemesan'),
    text('phoneLabel', 'Label WhatsApp', 'Nomor WhatsApp Aktif *'),
    text('phonePlaceholder', 'Contoh isian WhatsApp', '+62 812 xxxx xxxx'),
    text('emailLabel', 'Label email', 'Alamat Email *'),
    text('emailPlaceholder', 'Contoh isian email', 'alamat@email.com'),
    text('notesLabel', 'Label catatan', 'Permintaan Khusus / Catatan Tambahan (Opsional)'),
    text('notesPlaceholder', 'Contoh isian catatan', 'Contoh: Permintaan early check-in, dekorasi khusus honeymoon, dll.'),
    text('submitLabel', 'Tombol kirim', 'Kirim Permintaan Reservasi'),
    text('submittingLabel', 'Tombol saat mengirim', 'Memproses Reservasi...'),
    textarea('submitNote', 'Catatan di bawah tombol', 'Tim kami akan menghubungi Anda untuk konfirmasi ketersediaan dan detail instruksi pembayaran.'),
    text('errorMessage', 'Pesan bila gagal terkirim', 'Terjadi kendala saat mengirim reservasi.'),
  ]),
  text('successTitle', 'Judul setelah formulir terkirim', 'Permintaan Reservasi Berhasil Diterima'),
  textarea(
    'successBody',
    'Isi setelah formulir terkirim',
    'Terima kasih, Bapak/Ibu {nama}. Data permintaan Anda telah tercatat dengan kode referensi: {kode}.',
    { description: '{nama} diganti nama pemesan, {kode} diganti kode referensi.' },
  ),
  text('summaryService', 'Ringkasan: label layanan', 'Layanan'),
  text('summaryRoom', 'Ringkasan: label akomodasi', 'Akomodasi'),
  text('summaryStay', 'Ringkasan: label jadwal menginap', 'Jadwal Menginap'),
  text('summaryStayValue', 'Ringkasan: isi jadwal menginap', '{masuk} s.d. {keluar}', { description: '{masuk} dan {keluar} diganti tanggal.' }),
  text('summaryGuests', 'Ringkasan: label jumlah tamu', 'Jumlah Tamu'),
  text('summaryDate', 'Ringkasan: label tanggal', 'Rencana Tanggal'),
  text('confirmButton', 'Tombol konfirmasi WhatsApp', 'Konfirmasi via WhatsApp'),
  textarea(
    'confirmMessage',
    'Pesan konfirmasi WhatsApp',
    'Halo Susan Spa & Resort, saya telah mengirim formulir reservasi dengan kode ref: {kode} atas nama {nama}.',
  ),
  text('newReservationButton', 'Tombol reservasi baru', 'Buat Reservasi Baru'),
  text('roomDetailLink', 'Tautan detail kamar', 'Lihat Detail Lengkap Kamar'),
  text('bedFallback', 'Tipe kasur bila kosong', 'Kasur Nyaman'),
  text('helpTitle', 'Judul kartu bantuan', 'Butuh Bantuan Cepat?'),
  text('helpSubtitle', 'Subjudul kartu bantuan', 'Hubungi langsung staf concierge Susan Spa'),
  textarea('helpBody', 'Isi kartu bantuan', 'Untuk pertanyaan ketersediaan tanggal, promo grup, atau pengaturan pernikahan di La Kana, tim kami aktif melayani setiap hari:'),
  text('helpHours', 'Jam layanan chat', 'Pelayanan Chat: 07.00 - 22.00 WIB'),
  text('helpButtonLabel', 'Tombol WhatsApp', 'Chat WhatsApp Resmi'),
  textarea('helpMessage', 'Pesan WhatsApp', 'Halo Susan Spa & Resort, saya ingin bertanya mengenai ketersediaan reservasi penginapan.'),
  text('benefitsTitle', 'Judul keuntungan', 'Keuntungan Reservasi Langsung'),
  list(
    'benefits',
    'Keuntungan reservasi langsung',
    [text('label', 'Keuntungan', '')],
    [
      { label: 'Jaminan harga terbaik langsung dari manajemen resort' },
      { label: 'Konfirmasi instan tanpa biaya perantara tersembunyi' },
      { label: 'Fleksibilitas penjadwalan ulang sesuai syarat dan ketentuan' },
    ],
    { rowLabel: 'Keuntungan' },
  ),
  seo({ title: 'Reservasi', description: '' }),
])

const legalPage = <S extends string>(slug: S, label: string, values: { title: string; updated: string; sections: { heading: string; body: string }[] }) =>
  page(slug, label, [
    text('title', 'Judul', values.title),
    text('updated', 'Keterangan pembaruan', values.updated),
    list('sections', 'Isi', [text('heading', 'Subjudul', '', { description: 'Kosongkan untuk paragraf tanpa subjudul.' }), textarea('body', 'Paragraf', '')], values.sections, {
      rowLabel: 'Bagian',
    }),
    seo({ title: values.title, description: '' }),
  ])

export const privacyPage = legalPage('page-privacy', 'Kebijakan Privasi', {
  title: 'Kebijakan Privasi',
  updated: 'Pembaruan Terakhir: Agustus 2026',
  sections: [
    {
      heading: '',
      body: 'Susan Spa & Resort berkomitmen untuk senantiasa menjaga privasi dan keamanan data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data yang Anda berikan saat mengakses situs web kami maupun saat mengajukan permohonan reservasi.',
    },
    {
      heading: 'Informasi yang Kami Terima',
      body: 'Kami mencatat data yang Anda berikan secara sukarela, seperti nama lengkap, alamat email, nomor telepon/WhatsApp, tanggal rencana menginap, serta catatan permohonan khusus saat Anda mengisi formulir reservasi atau menghubungi concierge kami.',
    },
    {
      heading: 'Penggunaan Informasi',
      body: 'Informasi Anda dipergunakan semata-mata untuk mengonfirmasi ketersediaan kamar atau paket, menyusun proposal pernikahan atau acara, menindaklanjuti permohonan layanan tamu, serta menyampaikan penawaran istimewa dari Susan Spa & Resort bila Anda berkenan menerimanya.',
    },
  ],
})

export const termsPage = legalPage('page-terms', 'Syarat & Ketentuan', {
  title: 'Syarat & Ketentuan',
  updated: 'Pembaruan Terakhir: Agustus 2026',
  sections: [
    {
      heading: '',
      body: 'Selamat datang di situs resmi Susan Spa & Resort. Dengan mengakses dan menggunakan layanan di situs ini, Anda menyetujui ketentuan dan panduan yang berlaku berikut ini.',
    },
    {
      heading: 'Ketentuan Reservasi & Permohonan Informasi',
      body: 'Pengisian formulir reservasi secara daring di situs ini merupakan permohonan pengecekan ketersediaan dan penawaran awal. Pemesanan Anda akan terkonfirmasi secara sah setelah tim reservasi kami menerbitkan konfirmasi tertulis resmi atau melalui komunikasi WhatsApp resmi Susan Spa & Resort.',
    },
    {
      heading: 'Waktu Check-in & Check-out',
      body: 'Waktu check-in standar adalah mulai pukul 14:00 WIB, dan waktu check-out standar adalah maksimal pukul 12:00 WIB untuk memastikan kenyamanan dan kesiapan kamar bagi seluruh tamu kami.',
    },
  ],
})
