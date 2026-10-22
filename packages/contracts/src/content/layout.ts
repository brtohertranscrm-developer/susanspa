import { checkbox, group, image, list, page, select, text, textarea } from './schema.js'

const link = (labelDefault = '', hrefDefault = '/') => [text('label', 'Teks', labelDefault), text('href', 'Alamat tujuan', hrefDefault)] as const

export const PROPERTY_ICONS = [
  { label: 'Hotel', value: 'hotel' },
  { label: 'Kapel', value: 'church' },
  { label: 'Restoran', value: 'dining' },
  { label: 'Kolam', value: 'pool' },
  { label: 'Taman', value: 'park' },
  { label: 'Spa', value: 'spa' },
] as const

export const siteLayout = page(
  'site-layout',
  'Header, Menu & Footer',
  [
    group('logos', 'Logo', [
      image('header', 'Logo di header', '/images/susan-spa-logo-gold.png', {
        description: 'Tampil di atas foto header. PNG atau SVG dengan latar transparan.',
      }),
      checkbox('headerWhite', 'Ubah logo header menjadi putih', true, {
        description: 'Aktifkan bila logo berwarna gelap agar terbaca di atas foto. Matikan bila logo sudah putih atau ingin warna asli.',
      }),
      image('menu', 'Logo di menu', '/images/susan-spa-logo-dark.png', { description: 'Tampil di menu layar penuh yang berlatar putih.' }),
      image('favicon', 'Ikon tab browser', '/images/susan-spa-logo-dark.png', { description: 'Gambar persegi, minimal 512 x 512 px.' }),
    ]),
    group('header', 'Header', [
      text('menuLabel', 'Teks tombol menu', 'Resort'),
      text('reserveLabel', 'Teks tombol reservasi', 'Reserve'),
    ]),
    group('menu', 'Menu layar penuh', [
      list(
        'categories',
        'Kategori menu',
        [
          ...link(),
          list('links', 'Submenu', link(), [], { rowLabel: 'Submenu', description: 'Kosongkan bila kategori langsung membuka halaman.' }),
        ],
        [
          {
            label: 'Kamar & Villa',
            href: '/rooms',
            links: [
              { label: 'Semua Kamar & Villa', href: '/rooms' },
              { label: 'Villa Kolam Renang Privat', href: '/rooms' },
              { label: 'Suite Keluarga & Mewah', href: '/rooms' },
              { label: 'Reservasi Menginap', href: '/reserve' },
            ],
          },
          {
            label: 'Wellness & Spa',
            href: '/spa',
            links: [
              { label: 'Susan Spa & Signature Rituals', href: '/spa' },
              { label: 'Kolam Air Hangat Semispoor', href: '/facilities' },
              { label: 'Fasilitas Kebugaran & Sauna', href: '/facilities' },
              { label: 'Reservasi Perawatan Spa', href: '/spa' },
            ],
          },
          {
            label: 'Restoran & Kuliner',
            href: '/dining',
            links: [
              { label: 'Sky Garden Cafe & Resto', href: '/dining' },
              { label: 'Menu & Pengalaman Bersantap', href: '/dining' },
              { label: 'Romantic Mountain Dinner', href: '/dining' },
            ],
          },
          {
            label: 'Pengalaman & Rekreasi',
            href: '/experiences',
            links: [
              { label: 'Aktivitas & Fasilitas Resort', href: '/facilities' },
              { label: 'Eden Park Bandungan', href: '/facilities' },
              { label: 'Wisata Sekitar Bandungan', href: '/nearby' },
              { label: 'Galeri Foto & Video', href: '/gallery' },
            ],
          },
          {
            label: 'La Kana The Royal Wedding Venue',
            href: '/wedding',
            links: [
              { label: 'La Kana The Royal Wedding Venue', href: '/wedding' },
              { label: 'Paket & Venue Pernikahan', href: '/wedding' },
              { label: 'Pertemuan & Acara Privat', href: '/events' },
              { label: 'Konsultasi Wedding & Event', href: '/wedding' },
            ],
          },
          { label: 'Ballroom & Meeting Room', href: '/ballroom', links: [] },
          { label: 'Paket & Penawaran', href: '/offers', links: [] },
          {
            label: 'Tentang Susan Spa',
            href: '/about',
            links: [
              { label: 'Kisah & Filosofi Resort', href: '/about' },
              { label: 'Jurnal & Inspirasi Liburan', href: '/journal' },
              { label: 'Galeri Resort', href: '/gallery' },
            ],
          },
          { label: 'Kontak & Lokasi', href: '/contact', links: [] },
        ],
        { rowLabel: 'Kategori' },
      ),
      list(
        'quickLinks',
        'Tautan kecil di bawah menu',
        link(),
        [
          { label: 'SUSANSPARESORT.COM', href: '/' },
          { label: 'LA KANA THE ROYAL WEDDING VENUE', href: '/wedding' },
        ],
        { rowLabel: 'Tautan' },
      ),
      text('closeLabel', 'Teks tombol tutup', 'Close'),
      text('viewPageLabel', 'Tautan ke halaman kategori', 'Lihat Halaman Utama ›'),
      text('emptyCategoryText', 'Teks kategori tanpa submenu', 'Temukan informasi lengkap mengenai {nama} di Susan Spa & Resort.', {
        description: '{nama} diganti nama kategori.',
      }),
      text('visitPageLabel', 'Tombol kategori tanpa submenu', 'Kunjungi Halaman'),
      textarea('whatsappMessage', 'Pesan WhatsApp dari menu', 'Halo Susan Spa & Resort, saya ingin bertanya seputar reservasi.'),
      text('weatherLocation', 'Lokasi cuaca', 'BANDUNGAN, KAB. SEMARANG'),
      text('altitude', 'Keterangan ketinggian', '(1.100 mdpl)'),
      text('propertyHeading', 'Judul kolom alamat', 'SUSAN SPA & RESORT'),
      text('frontDeskHeading', 'Judul kontak darurat', 'KONTAK DARURAT & FRONT DESK'),
      text('frontDeskLabel', 'Label telepon front office', 'Front Office (24 Jam):'),
      text('serviceHeading', 'Judul kolom layanan', 'LAYANAN INFORMASI & RESERVASI'),
      text('serviceHours', 'Jam layanan tamu', 'Layanan Tamu: Setiap Hari 07:00 - 22:00 WIB'),
      text('propertiesHeading', 'Judul daftar destinasi', 'FASILITAS & DESTINASI KAMI'),
      list(
        'properties',
        'Daftar destinasi di bagian bawah menu',
        [select('icon', 'Ikon', PROPERTY_ICONS, 'hotel'), ...link()],
        [
          { icon: 'hotel', label: 'SUSAN SPA & RESORT', href: '/' },
          { icon: 'church', label: 'LA KANA THE ROYAL WEDDING VENUE', href: '/wedding' },
          { icon: 'dining', label: 'SKY GARDEN RESTAURANT', href: '/dining' },
          { icon: 'pool', label: 'SEMISPOOR WARM POOL', href: '/facilities' },
          { icon: 'park', label: 'EDEN PARK BANDUNGAN', href: '/facilities' },
        ],
        { rowLabel: 'Destinasi' },
      ),
    ]),
    group('footer', 'Footer', [
      text('copyright', 'Teks hak cipta', 'Susan Spa & Resort is a registered trademark. © {tahun}. All rights reserved.', {
        description: '{tahun} diganti tahun berjalan.',
      }),
      list(
        'legalLinks',
        'Tautan kecil',
        link(),
        [
          { label: 'Sitemap', href: '/sitemap.xml' },
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Service', href: '/terms' },
        ],
        { rowLabel: 'Tautan' },
      ),
      text('contactLabel', 'Tombol kontak', 'Contact Us'),
      text('contactHref', 'Alamat tombol kontak', '/contact'),
      text('directionsLabel', 'Tombol petunjuk arah', 'Getting Here'),
      text('shareLabel', 'Tombol bagikan', 'Share'),
      text('shareCopiedLabel', 'Teks setelah tautan disalin', 'Tautan disalin'),
    ]),
    group('whatsapp', 'Tombol WhatsApp melayang', [
      text('label', 'Teks tombol', 'WhatsApp Concierge'),
      textarea(
        'message',
        'Pesan bawaan',
        'Halo Susan Spa & Resort, perkenalkan saya ingin menanyakan ketersediaan kamar dan paket reservasi. Mohon informasinya, terima kasih.',
      ),
    ]),
  ],
  'Logo, isi menu, dan footer yang tampil di semua halaman.',
)
