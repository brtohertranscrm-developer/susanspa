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
} from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { ReservationModal } from '@/components/global/ReservationModal';
import { FeaturedRoomsCarousel } from '@/components/ui/FeaturedRoomsCarousel';
import { BestOfShowcase } from '@/components/ui/BestOfShowcase';
import { SITE_CONFIG } from '@/data/site';
import type { Room } from '@/types';

const HERO_SLIDES = [
  {
    image: 'https://dksw6vf0i66fe.cloudfront.net/website_page_image/image/12d19f0e-b71c-4715-8fef-8955de6a998d_1726641103.webp',
    title: 'Kesejukan Lereng Gunung Ungaran',
    subtitle: 'Menikmati Panorama Pegunungan yang Menenangkan & Asri di Ketinggian ±1.100 mdpl',
  },
  {
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop',
    title: 'Relaksasi Spa on the Sky',
    subtitle: 'Sentuhan Tradisi Herbal Keraton Jawa Berpadu Kemurnian Udara Pegunungan',
  },
  {
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop',
    title: 'Kemegahan Kapel Kaca La Kana',
    subtitle: 'Mewujudkan Momen Sakral Bersejarah Berlatar Lanskap Lembah & Langit Terbuka',
  },
  {
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop',
    title: 'Kenyamanan Menginap di Atas Awan',
    subtitle: 'Harmoni Kebugaran Tradisional, Akomodasi Nyaman, dan Udara Sejuk Pegunungan',
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
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-ivory space-y-6 my-auto pt-6">
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

      {/* ========================================================================= */}
      {/* 02: SECTION: HIGHLAND SANCTUARY OVERVIEW (Centered Editorial Story) */}
      {/* ========================================================================= */}
      <section id="overview" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#1E5638] font-bold block">
            SELAMAT DATANG DI BANDUNGAN
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#14241E] leading-tight font-normal">
            Ketenangan di Atas Awan, Ketinggian 1.100 Meter
          </h2>
          <div className="space-y-4 text-base sm:text-lg text-[#23332B]/85 leading-relaxed font-normal pt-2">
            <p>
              Susan Spa & Resort merupakan destinasi peristirahatan dan pemulihan jiwa di lereng Gunung Ungaran, Bandungan. Dikelilingi udara pegunungan yang senantiasa sejuk dan panorama lembah hijau yang membentang luas, kami menyambut kehadiran Anda untuk menikmati perpaduan kenyamanan akomodasi modern serta ketenangan alam yang bersahaja.
            </p>
            <p>
              Setiap sudut resort dirancang secara cermat guna memberikan ruang bernapas yang leluasa: melepas kepenatan rutinitas harian, menikmati ritual herbal luhur di Spa on the Sky, dan merayakan momen berharga bersama keluarga.
            </p>
          </div>

          <div className="pt-6">
            <Link
              href="/facilities"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#14241E] hover:text-[#1E5638] font-bold border-b border-[#14241E] hover:border-[#1E5638] pb-1 transition-colors"
            >
              <span>Jelajahi Seluruh Fasilitas Resort</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03: SECTION: CURATED STAYS (The Villas Layout - Luxury Nihi Style) */}
      {/* ========================================================================= */}
      <section id="rooms" className="py-20 sm:py-28 bg-white border-t border-stone-200/60 overflow-hidden">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedRoomsCarousel
            rooms={displayRooms}
            onInquire={(slug) => handleOpenReserve('room', slug)}
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04: SECTION: THE BEST OF SUSAN SPA (Curated Luxury Showcase - Nihi Style) */}
      {/* ========================================================================= */}
      <div id="destinations">
        <BestOfShowcase />
      </div>

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
      />
    </div>
  );
}
