'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Compass,
} from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { BookingBar, type BookingSearchParams } from '@/components/global/BookingBar';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { ReservationModal } from '@/components/global/ReservationModal';
import { FeaturedRoomsCarousel } from '@/components/ui/FeaturedRoomsCarousel';
import { SITE_CONFIG } from '@/data/site';
import type { Room } from '@/types';

const HERO_SLIDES = [
  {
    image: 'https://dksw6vf0i66fe.cloudfront.net/website_page_image/image/12d19f0e-b71c-4715-8fef-8955de6a998d_1726641103.webp',
    title: 'Kesejukan Lereng Gunung Ungaran',
    subtitle: 'Menikmati Panorama Pegunungan yang Menenangkan & Asri di Ketinggian ±1.100 mdpl',
    tag: 'Kawasan Sejuk Bandungan ~1.100 mdpl',
  },
  {
    image: 'https://dksw6vf0i66fe.cloudfront.net/website_page_image/image/13c64aea-a3c8-4ad7-a0de-c03ba7d12f43_1726641104.webp',
    title: 'Kemegahan Alam & Kapel Kaca La Kana',
    subtitle: 'Ikrarkan Momen Sakral Berlatar Keindahan Gunung Ungaran yang Memukau',
    tag: 'Ikon Eksklusif Jawa Tengah',
  },
  {
    image: 'https://dksw6vf0i66fe.cloudfront.net/website_page_image/image/7d9e523a-c43f-4322-b4a5-8cc24fe1b2b4_1726648300.jpg',
    title: 'Peristirahatan Nyaman di Atas Awan',
    subtitle: 'Harmoni Kebugaran Tradisional, Akomodasi Nyaman, dan Udara Sejuk Pegunungan',
    tag: 'Sanctuary Relaksasi Keluarga',
  },
];

const SPA_HIGHLIGHTS = [
  {
    title: 'Jacuzzi Hidroterapi Air Hangat Pribadi',
    desc: 'Berendam air hangat dengan pemandangan terbuka lembah hijau pegunungan yang menyejukkan pikiran.',
  },
  {
    title: 'Sauna Herbal Aromatik Khas Jawa',
    desc: 'Relaksasi uap herbal racikan rempah alami guna melancarkan sirkulasi dan menyegarkan raga.',
  },
  {
    title: 'Pijat Tradisional & Ruang Perawatan Privat',
    desc: 'Sentuhan terapis tersertifikasi dengan minyak aromaterapi pilihan dalam kenyamanan ruang perawatan pasangan.',
  },
];

const WEDDING_HIGHLIGHTS = [
  {
    title: 'Kapel Kaca La Kana Ikonik',
    desc: 'Dinding kaca transparan dengan sudut pandang panorama bebas pegunungan untuk momen pemberkatan sakral.',
  },
  {
    title: 'Outdoor Sky Garden & Grand Ballroom',
    desc: 'Pilihan resepsi terbuka bernuansa asri romantis maupun jamuan makan malam elegan di ballroom berkapasitas luas.',
  },
  {
    title: 'Pendampingan Wedding Coordinator',
    desc: 'Koordinasi menyeluruh bersama tim berpengalaman guna memastikan kelancaran setiap detail hari bahagia Anda.',
  },
];

// Featured rooms to display on homepage (Top 3 flagship categories)
const FEATURED_ROOM_SLUGS = [
  'aurora-junior-suite',
  'grand-suite',
  'villa-4-bedrooms',
];

export default function HomePageClient({ rooms }: { rooms: Room[] }) {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isHeroAutoplayPaused, setIsHeroAutoplayPaused] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [modalRoomSlug, setModalRoomSlug] = useState<string | undefined>();
  const [modalType, setModalType] = useState<'room' | 'spa' | 'wedding' | 'event'>('room');
  const [bookingSearch, setBookingSearch] = useState<BookingSearchParams | undefined>();

  // Auto cycle hero carousel with user pause and reduced motion respect
  useEffect(() => {
    if (isHeroAutoplayPaused || isHeroHovered) return;

    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isHeroAutoplayPaused, isHeroHovered]);

  const handleOpenReserve = (type: 'room' | 'spa' | 'wedding' | 'event' = 'room', roomSlug?: string) => {
    setModalType(type);
    setModalRoomSlug(roomSlug);
    setIsReserveModalOpen(true);
  };

  const handleBookingSearch = (params: BookingSearchParams) => {
    setBookingSearch(params);
    handleOpenReserve('room');
  };

  // Filter top 3 featured rooms
  const featuredRooms = rooms
    .filter((room) => FEATURED_ROOM_SLUGS.includes(room.slug))
    .sort(
      (a, b) =>
        FEATURED_ROOM_SLUGS.indexOf(a.slug) - FEATURED_ROOM_SLUGS.indexOf(b.slug)
    );

  const displayRooms = featuredRooms.length === 3 ? featuredRooms : rooms.slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-[#14241E] font-sans selection:bg-champagne selection:text-forest-deep">
      {/* Global Navigation Header */}
      <Header rooms={rooms} onOpenReserve={() => handleOpenReserve('room')} />

      {/* ========================================================================= */}
      {/* 01: HERO SECTION (Refined Altitude Arrival with Seamless Booking Bar) */}
      {/* ========================================================================= */}
      <section
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
        className="relative min-h-[85vh] sm:min-h-[88vh] flex flex-col justify-between pt-24 pb-8 overflow-hidden bg-forest-deep"
      >
        {/* Background Image Carousel with Calibrated Gradient Overlay */}
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              currentHeroSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/60 to-forest-deep/40" />
          </div>
        ))}

        {/* Hero Central Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-ivory space-y-5 my-auto pt-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-forest-deep/80 border border-white/20 text-champagne text-xs uppercase tracking-[0.25em] backdrop-blur-md">
            <Compass className="w-3.5 h-3.5" />
            <span>{HERO_SLIDES[currentHeroSlide].tag}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.14] text-white tracking-tight max-w-3xl mx-auto">
            Peristirahatan menenangkan di lereng Bandungan dengan{' '}
            <span className="italic font-normal text-champagne">
              ketenangan jiwa sejati
            </span>
          </h1>

          <p className="text-sm sm:text-base text-ivory/90 max-w-2xl mx-auto font-light leading-relaxed">
            Menghadirkan kenyamanan menginap di sejuknya hawa pegunungan ~1.100 mdpl, ritual herbal luhur di Spa on the Sky, dan perayaan pernikahan khidmat di Kapel La Kana.
          </p>

          <div className="pt-2 flex items-center justify-center space-x-3.5">
            <button
              onClick={() => handleOpenReserve('room')}
              className="bg-ivory hover:bg-champagne text-forest-deep px-7 py-3 rounded-full font-semibold uppercase tracking-[0.16em] text-xs transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Reservasi Kamar
            </button>

            <a
              href="#overview"
              className="border border-white/40 hover:border-champagne hover:text-champagne text-ivory px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Mengenal Susan Spa
            </a>
          </div>

          {/* Quick Anchor Links */}
          <div className="pt-4 hidden sm:flex items-center justify-center space-x-7 text-xs uppercase tracking-wider text-ivory/80 font-medium">
            <a
              href="#rooms"
              className="hover:text-champagne transition-colors flex items-center space-x-1 border-b border-transparent hover:border-champagne pb-0.5"
            >
              <span>Pilihan Kamar</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-champagne" />
            </a>
            <span className="text-white/25">•</span>
            <a
              href="#spa"
              className="hover:text-champagne transition-colors flex items-center space-x-1 border-b border-transparent hover:border-champagne pb-0.5"
            >
              <span>Spa on the Sky</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-champagne" />
            </a>
            <span className="text-white/25">•</span>
            <a
              href="#wedding"
              className="hover:text-champagne transition-colors flex items-center space-x-1 border-b border-transparent hover:border-champagne pb-0.5"
            >
              <span>Kapel La Kana</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-champagne" />
            </a>
          </div>
        </div>

        {/* Carousel Slide Indicators & Booking Bar Dock */}
        <div className="relative z-10 w-full max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex items-center justify-center space-x-3">
            <div className="flex space-x-2">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentHeroSlide(i)}
                  aria-label={`Pindah ke slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentHeroSlide === i ? 'w-8 bg-champagne' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setIsHeroAutoplayPaused((prev) => !prev)}
              className="text-ivory/70 hover:text-champagne p-1 rounded-full transition-colors focus:outline-none"
              aria-label={isHeroAutoplayPaused ? 'Putar rotasi slide' : 'Jeda rotasi slide'}
              title={isHeroAutoplayPaused ? 'Putar rotasi slide' : 'Jeda rotasi slide'}
            >
              {isHeroAutoplayPaused ? (
                <Play className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Pause className="w-3.5 h-3.5 fill-current" />
              )}
            </button>
          </div>

          {/* Desktop Clean Booking Widget */}
          <div className="hidden md:block">
            <BookingBar onSearch={handleBookingSearch} ctaText="Cek Ketersediaan" />
          </div>
        </div>

        {/* Carousel Arrow Controls */}
        <button
          onClick={() =>
            setCurrentHeroSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))
          }
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-forest-deep/60 hover:bg-forest-deep text-ivory hover:text-champagne border border-white/20 hidden lg:flex items-center justify-center transition-colors"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() =>
            setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length)
          }
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-forest-deep/60 hover:bg-forest-deep text-ivory hover:text-champagne border border-white/20 hidden lg:flex items-center justify-center transition-colors"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </section>

      {/* Mobile Booking Widget */}
      <div className="md:hidden p-4 bg-forest-deep border-b border-white/15">
        <BookingBar onSearch={handleBookingSearch} ctaText="Cek Ketersediaan" />
      </div>

      {/* ========================================================================= */}
      {/* 02: SECTION: HIGHLAND SANCTUARY OVERVIEW (Clean 2-Column Editorial Story) */}
      {/* ========================================================================= */}
      <section id="overview" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-wide mx-auto bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase tracking-[0.25em] text-[#1E5638] font-bold block">
              SELAMAT DATANG DI BANDUNGAN
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#14241E] leading-tight font-normal">
              Ketenangan di Atas Awan, Ketinggian 1.100 Meter
            </h2>
            <p className="text-sm sm:text-base text-[#23332B] leading-relaxed font-normal">
              Susan Spa & Resort merupakan destinasi peristirahatan dan pemulihan jiwa di lereng Gunung Ungaran, Bandungan. Dikelilingi udara pegunungan yang senantiasa sejuk dan panorama lembah hijau yang membentang luas, kami menyambut kehadiran Bapak/Ibu untuk menikmati perpaduan kenyamanan akomodasi modern serta ketenangan alam yang bersahaja.
            </p>
            <p className="text-sm sm:text-base text-[#23332B] leading-relaxed font-normal">
              Setiap sudut resort dirancang secara cermat guna memberikan ruang bernapas yang leluasa: melepas kepenatan rutinitas harian, menikmati ritual herbal luhur di Spa on the Sky, dan merayakan momen berharga bersama keluarga.
            </p>

            <div className="pt-2">
              <Link
                href="/facilities"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.18em] text-[#14241E] hover:text-[#1E5638] font-bold border-b border-[#14241E] hover:border-[#1E5638] pb-1 transition-colors"
              >
                <span>Jelajahi Seluruh Fasilitas Resort</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Photographic Visual */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/11] rounded-3xl overflow-hidden border border-stone-200/90 bg-stone-100 shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop"
                alt="Resort landscape in Bandungan highlands"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-stone-200 text-[11px] text-[#14241E] font-semibold tracking-wide">
                ±1.100 mdpl • Lereng Gunung Ungaran, Bandungan
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03: SECTION: CURATED STAYS (3 Flagship Categories with High Contrast) */}
      {/* ========================================================================= */}
      <section id="rooms" className="py-16 sm:py-20 bg-[#FAF8F5] border-y border-stone-200/70 overflow-hidden">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedRoomsCarousel
            rooms={displayRooms}
            onInquire={(slug) => handleOpenReserve('room', slug)}
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04: SECTION: SIGNATURE WELLNESS & SPA (Focused Editorial Presentation) */}
      {/* ========================================================================= */}
      <section id="spa" className="py-16 sm:py-20 bg-white border-b border-stone-200/70 overflow-hidden">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Photographic Showcase */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-stone-200/90 bg-stone-100 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop"
                  alt="Spa and wellness at Susan Spa & Resort"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-stone-200 text-[11px] text-[#14241E] font-semibold tracking-wide">
                  Spa on the Sky • Ketinggian 1.100 mdpl
                </div>
              </div>
            </div>

            {/* Right Story & Curated Offerings */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.25em] text-[#1E5638] font-bold block">
                  KEBUGARAN & SPA ALAMI
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#14241E] leading-tight font-normal">
                  Spa on the Sky Sanctuary
                </h2>
                <p className="text-sm sm:text-base text-[#23332B] font-light leading-relaxed">
                  Terletak di titik tertinggi resort pada ketinggian ±1.100 mdpl, Spa on the Sky memadukan ramuan herbal tradisional Jawa dengan fasilitas hidroterapi modern. Udara sejuk pegunungan dan keheningan alam menghadirkan relaksasi tubuh serta kejernihan pikiran yang menyeluruh.
                </p>
              </div>

              {/* 3 Scannable Highlights */}
              <div className="space-y-3 pt-1">
                {SPA_HIGHLIGHTS.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 space-y-1"
                  >
                    <h3 className="text-sm font-semibold text-[#14241E]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#23332B] font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/spa"
                  className="bg-[#14241E] hover:bg-[#1D362B] text-champagne px-7 py-3 rounded-full font-semibold uppercase tracking-[0.16em] text-xs text-center transition-colors shadow-sm"
                >
                  Lihat Menu Perawatan
                </Link>
                <button
                  onClick={() => handleOpenReserve('spa')}
                  className="border border-stone-300 hover:border-[#14241E] text-[#14241E] hover:bg-[#14241E] hover:text-ivory px-7 py-3 rounded-full font-semibold uppercase tracking-wider text-xs transition-colors"
                >
                  Hubungi Spa Concierge
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05: SECTION: SACRED WEDDINGS AT LA KANA (Solid Luxury Forest `#12221B`) */}
      {/* ========================================================================= */}
      <section id="wedding" className="py-16 sm:py-20 bg-[#12221B] text-ivory relative overflow-hidden">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Narrative & Inclusions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-champagne font-bold block">
                MOMEN PERNIKAHAN SAKRAL
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ivory leading-tight font-normal">
                Ikrar Janji Suci di Kapel Kaca La Kana
              </h2>
              <p className="text-sm sm:text-base text-ivory/90 leading-relaxed font-light">
                Susan Spa & Resort menghadirkan venue pernikahan sakral berlatar kemegahan lereng Gunung Ungaran. Altar berdinding kaca transparan menyatu harmonis dengan panorama alam terbuka yang sejuk dan menawan.
              </p>
            </div>

            {/* 3 Scannable Wedding Highlights */}
            <div className="space-y-3 pt-1">
              {WEDDING_HIGHLIGHTS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1"
                >
                  <h3 className="text-sm font-semibold text-champagne">
                    {item.title}
                  </h3>
                  <p className="text-xs text-ivory/85 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/wedding"
                className="w-full sm:w-auto bg-ivory hover:bg-champagne text-[#14241E] px-7 py-3 rounded-full font-semibold uppercase tracking-[0.16em] text-xs transition-colors text-center shadow-sm"
              >
                Pelajari Paket Pernikahan
              </Link>
              <button
                onClick={() => handleOpenReserve('wedding')}
                className="w-full sm:w-auto border border-white/30 text-ivory hover:border-champagne hover:text-champagne px-7 py-3 rounded-full font-semibold uppercase tracking-wider text-xs transition-colors"
              >
                Konsultasi Pernikahan
              </button>
            </div>
          </div>

          {/* Right Chapel Visual */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/20 bg-forest-deep shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"
                alt="La Kana Chapel Susan Spa & Resort"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12221B]/80 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 bg-forest-deep/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-champagne/30 text-[11px] text-champagne font-semibold tracking-wide">
                Kapel Kaca Ikonik La Kana • Bandungan
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06: COMPACT LOCATION & ACCESS STRIP (Solid Luxury Surface `#0E1A15`) */}
      {/* ========================================================================= */}
      <section id="location" className="py-12 sm:py-16 bg-[#0E1A15] text-ivory border-t border-white/10">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#14241E] rounded-3xl p-6 sm:p-10 border border-white/15 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left max-w-xl">
              <span className="text-[11px] uppercase tracking-[0.25em] text-champagne font-bold block">
                LOKASI & AKSES RESORT
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-ivory font-normal">
                Kunjungi Susan Spa & Resort di Bandungan
              </h2>
              <p className="text-xs sm:text-sm text-ivory/85 leading-relaxed font-light">
                {SITE_CONFIG.address.fullFormatted}. Berada di ketinggian ±1.100 mdpl lereng Gunung Ungaran dengan udara sejuk dan pemandangan asri.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              <a
                href={SITE_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-ivory hover:bg-champagne text-[#14241E] px-7 py-3 rounded-full text-xs uppercase tracking-[0.16em] font-semibold text-center transition-colors flex items-center justify-center space-x-2 shadow-sm"
              >
                <MapPin className="w-4 h-4" />
                <span>Buka Google Maps</span>
              </a>

              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
                  'Halo Susan Spa & Resort, mohon panduan arah menuju lokasi resort.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto border border-white/30 text-ivory hover:border-champagne hover:text-champagne px-7 py-3 rounded-full text-xs uppercase tracking-wider font-semibold text-center transition-colors"
              >
                Chat Petunjuk Arah
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppCTA />

      {/* Interactive Reservation Modal */}
      <ReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        rooms={rooms}
        preselectedRoomSlug={modalRoomSlug}
        preselectedType={modalType}
        initialCheckIn={bookingSearch?.checkIn}
        initialCheckOut={bookingSearch?.checkOut}
        initialGuests={bookingSearch?.guests}
      />
    </div>
  );
}
