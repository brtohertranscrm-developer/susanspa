'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  MapPin,
  ChevronDown,
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
    image: '/images/hero/hero-facade.jpg',
    title: 'Kesejukan Lereng Gunung Ungaran',
    subtitle: 'Menikmati Panorama Pegunungan yang Menenangkan & Asri di Ketinggian ±1.100 mdpl',
  },
  {
    image: '/images/hero/hero-drone.jpg',
    title: 'Panorama Udara Susan Spa & Resort',
    subtitle: 'Pemandangan Spektakuler Lembah & Alam Pegunungan dari Ketinggian ±1.100 mdpl',
  },
  {
    image: '/images/hero/hero-resort.jpg',
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
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [modalRoomSlug, setModalRoomSlug] = useState<string | undefined>();
  const [modalType, setModalType] = useState<'room' | 'spa' | 'wedding' | 'event'>('room');

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
        className="relative h-screen min-h-screen flex flex-col justify-center overflow-hidden bg-black"
      >
        {/* Background Video with Calibrated Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-forest-deep">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/hero/hero-resort.jpg"
            className="w-full h-full object-cover pointer-events-none"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Hero Central Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 text-center flex flex-col items-center justify-center">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-white text-center tracking-tight max-w-5xl mx-auto drop-shadow-lg">
            Susan Spa & Resort
          </h1>
          
          <p className="mt-4 sm:mt-6 text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-white/90 max-w-2xl mx-auto font-medium text-center drop-shadow-md">
            Ketenangan Alam. Kenyamanan Berkelas.
          </p>
        </div>

        {/* Bottom CTA (Explore Below) */}
        <a 
          href="#overview"
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center space-y-1.5 group cursor-pointer"
        >
          <span className="text-white text-lg sm:text-xl font-serif drop-shadow-md">Jelajahi Resort</span>
          <span className="text-white/70 text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-sans group-hover:text-white transition-colors">Explore Below</span>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white group-hover:translate-y-1 transition-all duration-300" />
        </a>
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
