'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Church,
  Compass,
  MapPin,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { BookingBar, type BookingSearchParams } from '@/components/global/BookingBar';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { ReservationModal } from '@/components/global/ReservationModal';
import { FeaturedRoomsCarousel } from '@/components/ui/FeaturedRoomsCarousel';
import { FeaturedFacilitiesCarousel } from '@/components/ui/FeaturedFacilitiesCarousel';
import { SITE_CONFIG } from '@/data/site';
import type { Room } from '@/types';

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop',
    title: 'Kesejukan Lereng Gunung Ungaran',
    subtitle: 'Menikmati Udara Pegunungan yang Menenangkan & Asri',
    tag: 'Kawasan Sejuk Bandungan ~1.100 mdpl',
  },
  {
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop',
    title: 'Kapel Kaca La Kana',
    subtitle: 'Ikrarkan Janji Suci Pernikahan Berlatar Awan & Perbukitan',
    tag: 'Momen Pernikahan Khidmat',
  },
  {
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2000&auto=format&fit=crop',
    title: 'Kolam Renang Air Hangat & Lembah',
    subtitle: 'Kenyamanan Berendam Air Hangat di Ketinggian Bukit',
    tag: 'Relaksasi & Rekreasi Keluarga',
  },
  {
    image: 'https://dksw6vf0i66fe.cloudfront.net/room_type_image/image/32b5388a-b0ce-4bce-b95c-5efd4da8c259_1726474989.JPG',
    title: 'Koleksi Kamar & Villa Eksklusif',
    subtitle: 'Ruang Beristirahat Nyaman dengan Balkon Alam Pegunungan',
    tag: 'Pilihan Suite & Villa Nyaman',
  },
  {
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop',
    title: 'Spa on the Sky Sanctuary',
    subtitle: 'Ritual Perawatan Tradisional Jawa di Ketinggian',
    tag: 'Kebugaran Alami & Holistik',
  },
];

const USP_LIST = [
  'Resort Lereng Pegunungan',
  'Kebugaran & Relaksasi Holistik',
  'Spa on the Sky 1.100 mdpl',
  'Suite & Villa Keluarga Nyaman',
  'Kolam Renang Air Hangat',
  'Kapel Kaca Ikonik La Kana',
  'Panorama Lembah & Udara Sejuk',
];

// Curated wellness offerings (multi-column list format)
const SPA_OFFERINGS_COL1 = [
  'Jacuzzi Hidroterapi Air Hangat Pribadi',
  'Sauna Herbal Aromatik Khas Jawa',
  'Pijat Tradisional Aromaterapi Menenangkan',
  'Lulur Tradisional Rempah Alami',
];

const SPA_OFFERINGS_COL2 = [
  'Terapis Berpengalaman & Tersertifikasi',
  'Ruang Perawatan Privat Pasangan (Couple Suite)',
  'Kolam Renang Air Hangat Menghadap Lembah',
  'Seduhan Teh Herbal di Sky Garden',
];

const SPA_GALLERY_STRIP = [
  {
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop',
    title: 'Pijat Herbal Tradisional',
  },
  {
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop',
    title: 'Hidroterapi Air Hangat',
  },
  {
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop',
    title: 'Relaksasi Sauna Rempah',
  },
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
    title: 'Udara Sejuk Pegunungan',
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
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [modalRoomSlug, setModalRoomSlug] = useState<string | undefined>();
  const [modalType, setModalType] = useState<'room' | 'spa' | 'wedding' | 'event'>('room');
  const [bookingSearch, setBookingSearch] = useState<BookingSearchParams | undefined>();

  // Auto cycle hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

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
    <div className="min-h-screen bg-white text-[#252A28] font-sans selection:bg-champagne selection:text-forest-deep">
      {/* Global Navigation Header */}
      <Header rooms={rooms} onOpenReserve={() => handleOpenReserve('room')} />

      {/* ========================================================================= */}
      {/* 01 — HERO SECTION (Atmospheric Scenic & Clean Editorial Presentation) */}
      {/* ========================================================================= */}
      <section className="relative min-h-[94vh] flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-forest-deep">
        {/* Background Image Carousel with Soft Gradient Overlay */}
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
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/55 to-forest-deep/35" />
          </div>
        ))}

        {/* Hero Central Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-ivory space-y-6 my-auto pt-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-forest-deep/75 border border-white/20 text-champagne text-xs uppercase tracking-[0.25em] backdrop-blur-md">
            <Compass className="w-3.5 h-3.5" />
            <span>{HERO_SLIDES[currentHeroSlide].tag}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.12] text-ivory tracking-tight max-w-4xl mx-auto">
            Peristirahatan menenangkan di lereng Bandungan dengan{' '}
            <span className="italic font-normal text-champagne">
              ketenangan jiwa sejati
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-ivory/85 max-w-2xl mx-auto font-light leading-relaxed">
            Menghadirkan kenyamanan menginap di sejuknya hawa pegunungan ~1.100 mdpl, ritual herbal luhur di Spa on the Sky, dan perayaan pernikahan khidmat di Kapel La Kana.
          </p>

          <div className="pt-2 flex items-center justify-center space-x-4">
            <button
              onClick={() => handleOpenReserve('room')}
              className="bg-ivory hover:bg-champagne text-forest-deep px-8 py-3.5 rounded-full font-semibold uppercase tracking-[0.18em] text-xs transition-all duration-300 transform hover:scale-105"
            >
              Reservasi Kamar
            </button>

            <a
              href="#intro"
              className="border border-white/30 hover:border-champagne hover:text-champagne text-ivory px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Mengenal Susan Spa
            </a>
          </div>

          {/* Direct Sub-Nav Links with Arrows */}
          <div className="pt-8 hidden sm:flex items-center justify-center space-x-8 text-xs uppercase tracking-wider text-ivory/75 font-medium">
            <a
              href="#rooms"
              className="hover:text-champagne transition-colors flex items-center space-x-1.5 border-b border-transparent hover:border-champagne pb-1"
            >
              <span>Pilihan Kamar</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-champagne" />
            </a>
            <span className="text-white/25">•</span>
            <a
              href="#spa"
              className="hover:text-champagne transition-colors flex items-center space-x-1.5 border-b border-transparent hover:border-champagne pb-1"
            >
              <span>Spa on the Sky</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-champagne" />
            </a>
            <span className="text-white/25">•</span>
            <a
              href="#wedding"
              className="hover:text-champagne transition-colors flex items-center space-x-1.5 border-b border-transparent hover:border-champagne pb-1"
            >
              <span>Kapel La Kana</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-champagne" />
            </a>
          </div>
        </div>

        {/* Carousel Navigation Controls */}
        <div className="relative z-10 w-full max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Slide Indicator Dots */}
          <div className="flex justify-center space-x-2 pb-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentHeroSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-300 ${
                  currentHeroSlide === i ? 'w-8 bg-champagne' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Desktop Clean Flat Booking Widget */}
          <div className="hidden md:block">
            <BookingBar onSearch={handleBookingSearch} ctaText="Cek Ketersediaan" />
          </div>
        </div>

        {/* Carousel Arrows */}
        <button
          onClick={() =>
            setCurrentHeroSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))
          }
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-forest-deep/60 hover:bg-forest-deep text-ivory hover:text-champagne border border-white/15 hidden lg:flex items-center justify-center transition-colors"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() =>
            setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length)
          }
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-forest-deep/60 hover:bg-forest-deep text-ivory hover:text-champagne border border-white/15 hidden lg:flex items-center justify-center transition-colors"
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
      {/* 02 — SECTION: WELCOME & EDITORIAL PHILOSOPHY (Clean Pure White `#FFFFFF`) */}
      {/* ========================================================================= */}
      <section id="intro" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-wide mx-auto bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Asymmetric Column: Brand Story & Portrait Image */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs uppercase tracking-[0.25em] text-botanical font-bold block">
                SELAMAT DATANG DI SUSAN SPA & RESORT
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep leading-tight font-normal">
                Ketenangan di Atas Awan, Ketinggian 1.100 Meter
              </h2>
              <p className="editorial-body">
                Susan Spa & Resort merupakan destinasi peristirahatan dan pemulihan jiwa di lereng Gunung Ungaran, Bandungan. Dikelilingi udara pegunungan yang senantiasa sejuk dan panorama lembah hijau yang membentang luas, kami menyambut kehadiran Bapak/Ibu untuk menikmati perpaduan kenyamanan akomodasi modern serta ketenangan alam yang bersahaja.
              </p>
              <p className="editorial-body">
                Setiap sudut resort dirancang secara cermat guna memberikan ruang bernapas yang leluasa, melepaskan kepenatan dari kesibukan harian, serta merayakan momen-momen berharga bersama keluarga dan orang terkasih.
              </p>
            </div>

            {/* Portrait Image with subtle hairline border */}
            <div className="relative aspect-[4/5] max-w-md rounded-3xl overflow-hidden border border-stone-200/90 bg-stone-100">
              <Image
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop"
                alt="Spa and relaxation at Susan Spa & Resort"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-stone-200 text-[11px] text-forest-deep font-medium tracking-wide">
                Destinasi Peristirahatan Sejuk • Bandungan, Jawa Tengah
              </div>
            </div>
          </div>

          {/* Right Asymmetric Column: Landscape Architecture & Philosophy */}
          <div className="lg:col-span-6 space-y-8 pt-4 lg:pt-12">
            {/* Architectural Heritage Photo */}
            <div className="relative aspect-[16/11] rounded-3xl overflow-hidden border border-stone-200/90 bg-stone-100">
              <Image
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop"
                alt="Resort landscape in Bandungan highlands"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
            </div>

            {/* Editorial Philosophy Statement */}
            <div className="space-y-4 max-w-xl">
              <h3 className="font-serif text-2xl sm:text-3xl text-forest-deep font-normal leading-snug">
                <span className="italic">Pendekatan kami dalam merawat kebugaran dan kenyamanan Anda.</span>
              </h3>
              <p className="editorial-body">
                Lebih dari sekadar tempat menginap, kami mengundang Anda menyelami ritme istirahat yang lebih tenang dan bermakna. Mulai dari sentuhan lulur dan rempah botanical khas Jawa, kehangatan kolam renang indoor berlatar bukit hijau, hingga udara bersih pegunungan yang memulihkan kesegaran raga.
              </p>
              <p className="editorial-body">
                Bagi kami, esensi keramahan sejati hadir dari keheningan yang menentramkan, privasi yang terjaga, serta keasrian alam yang meremajakan seluruh panca indra.
              </p>

              <div className="pt-2">
                <Link
                  href="/facilities"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-forest-deep hover:text-champagne font-bold border-b border-forest-deep hover:border-champagne pb-1 transition-colors"
                >
                  <span>Jelajahi Seluruh Pengalaman Resort</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 7 Core USPs in Minimalist Badges */}
        <div className="mt-16 pt-10 border-t border-stone-200/70">
          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {USP_LIST.map((usp, idx) => (
              <div
                key={idx}
                className="inline-flex items-center space-x-2 bg-[#FAF8F5] border border-stone-200/80 px-4 py-2.5 rounded-full text-xs font-medium text-forest-deep transition-colors hover:border-champagne"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-champagne-dark shrink-0" />
                <span>{usp}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03 — SECTION: FEATURED FACILITIES (Solid Luxury Forest Green `#19372F`) */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 bg-forest text-ivory overflow-hidden">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedFacilitiesCarousel />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04 — SECTION: FEATURED ROOMS & SUITES (Compact Horizontal Snap Scroll) */}
      {/* ========================================================================= */}
      <section id="rooms" className="py-24 sm:py-32 bg-white text-forest-deep overflow-hidden">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedRoomsCarousel
            rooms={displayRooms}
            onInquire={(slug) => handleOpenReserve('room', slug)}
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05 — SECTION: SIGNATURE WELLNESS & SPA (Clean Warm White `#FAF8F5`) */}
      {/* (Inspired by the structured "What We Treat / What We Offer" reference design) */}
      {/* ========================================================================= */}
      <section id="spa" className="py-24 sm:py-32 bg-[#FAF8F5] text-forest-deep border-y border-stone-200/70">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Top Row: Editorial Narrative on Left & Structured Curated List on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Headline & Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-botanical font-bold block">
                KEBUGARAN & SPA ALAMI
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep leading-tight font-normal">
                Spa on the Sky Sanctuary
              </h2>
              <p className="editorial-body">
                Terletak di titik tertinggi resort pada ketinggian 1.100 meter di atas permukaan laut, Spa on the Sky memadukan kebaikan ramuan herbal tradisional Jawa dengan fasilitas hidroterapi modern.
              </p>
              <p className="editorial-body">
                Lepaskan kepenatan tubuh Anda dalam kehangatan private jacuzzi berlatar kabut pegunungan, nikmati sauna herbal aromatik, dan rasakan sentuhan relaksasi dari para terapis berpengalaman kami.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/facilities"
                  className="bg-forest-deep hover:bg-forest text-champagne px-7 py-3 rounded-full font-semibold uppercase tracking-[0.18em] text-xs text-center transition-colors"
                >
                  Lihat Menu Perawatan
                </Link>
                <button
                  onClick={() => handleOpenReserve('spa')}
                  className="border border-stone-300 hover:border-forest text-forest hover:bg-forest hover:text-ivory px-7 py-3 rounded-full font-semibold uppercase tracking-wider text-xs transition-colors"
                >
                  Hubungi Spa Concierge
                </button>
              </div>
            </div>

            {/* Right: Structured 2-Column Scannable Offerings List with Delicate Luxury Dots */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/80 space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-champagne-dark font-bold block">
                  PILIHAN RITUAL KEBUGARAN
                </span>
                <h3 className="font-serif text-2xl text-forest-deep font-normal">
                  Perawatan & Terapi Unggulan Kami
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 pt-2 text-sm text-[#2C3833]">
                {/* Column 1 */}
                <ul className="space-y-3.5">
                  {SPA_OFFERINGS_COL1.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <span className="luxury-bullet" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Column 2 */}
                <ul className="space-y-3.5">
                  {SPA_OFFERINGS_COL2.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <span className="luxury-bullet" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Tersedia setiap hari untuk tamu menginap maupun kunjungan harian</span>
                <Link
                  href="/facilities"
                  className="text-forest hover:text-champagne font-semibold tracking-wide flex items-center space-x-1"
                >
                  <span>Daftar Perawatan Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Strip: 4 Editorial Photos */}
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-stone-500 font-bold block">
              GALERI PENGALAMAN SPA
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SPA_GALLERY_STRIP.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-stone-200/80 bg-stone-100"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 text-ivory text-xs font-serif">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06 — SECTION: SACRED WEDDINGS AT LA KANA (Solid Luxury Forest Green `#19372F`) */}
      {/* ========================================================================= */}
      <section id="wedding" className="py-24 sm:py-32 bg-forest text-ivory relative overflow-hidden">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Media Stack (La Kana Chapel) with Hairline Border & Zero Muddy Shadow */}
          <div className="lg:col-span-6 relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/20 group bg-forest-deep">
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop"
              alt="La Kana Chapel Susan Spa & Resort"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent opacity-50" />

            <div className="absolute bottom-8 left-8 right-8 text-ivory space-y-1.5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-champagne block font-semibold">
                KAPEL KACA IKONIK HIGHLAND
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-normal">
                Kapel Kaca La Kana
              </h3>
              <p className="text-xs text-ivory/80 font-light">
                Altar kaca transparan dengan panorama pegunungan yang menyejukkan.
              </p>
            </div>
          </div>

          {/* Copy Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-champagne font-bold block">
              MOMEN PERNIKAHAN SAKRAL
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-ivory leading-tight font-normal">
              Wujudkan Ikrar Janji Suci di Ketinggian Lereng Bandungan
            </h2>
            <p className="text-sm sm:text-base text-ivory/85 leading-relaxed font-light">
              Susan Spa & Resort menghadirkan venue pernikahan sakral untuk Holy Matrimony, jamuan makan elegan di ballroom maupun outdoor garden, hingga sesi pemotretan pre-wedding berlatar panorama perbukitan yang sejuk dan menawan.
            </p>

            {/* Inclusions List */}
            <ul className="space-y-3 text-xs sm:text-sm text-ivory/90 pt-2 font-light">
              <li className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-forest-deep border border-champagne/30 text-champagne flex items-center justify-center shrink-0">
                  <Church className="w-3 h-3" />
                </div>
                <span>Kapel Kaca La Kana — Dinding Kaca Transparan Menghadap Panorama Bebas</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-forest-deep border border-champagne/30 text-champagne flex items-center justify-center shrink-0">
                  <Sparkles className="w-3 h-3" />
                </div>
                <span>Outdoor Sky Garden & Balcony — Pesta Terbuka Bernuansa Asri & Romantis</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-forest-deep border border-champagne/30 text-champagne flex items-center justify-center shrink-0">
                  <Church className="w-3 h-3" />
                </div>
                <span>Frangipani Grand Ballroom — Ruang Resepsi Nyaman dengan Penataan Elegan</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-forest-deep border border-champagne/30 text-champagne flex items-center justify-center shrink-0">
                  <Calendar className="w-3 h-3" />
                </div>
                <span>Paket Pernikahan Terencana — Didampingi Wedding Coordinator Berpengalaman</span>
              </li>
            </ul>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/wedding"
                className="w-full sm:w-auto bg-ivory hover:bg-champagne text-forest-deep px-8 py-3.5 rounded-full font-semibold uppercase tracking-[0.18em] text-xs transition-colors text-center"
              >
                Pelajari Paket Pernikahan
              </Link>
              <button
                onClick={() => handleOpenReserve('wedding')}
                className="w-full sm:w-auto border border-white/30 text-ivory hover:border-champagne hover:text-champagne px-8 py-3.5 rounded-full font-semibold uppercase tracking-wider text-xs transition-colors"
              >
                Konsultasi Pernikahan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06 — COMPACT LOCATION & ACCESS STRIP (Solid Luxury Forest Green `#10241F`) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-forest-deep text-ivory border-t border-white/10">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-forest rounded-3xl p-8 sm:p-12 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-xl">
              <span className="text-xs uppercase tracking-[0.25em] text-champagne font-bold block">
                LOKASI & AKSES RESORT
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-ivory font-normal">
                Kunjungi Susan Spa & Resort di Bandungan
              </h2>
              <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-light">
                {SITE_CONFIG.address.fullFormatted}. Berada di ketinggian ±1.100 mdpl lereng Gunung Ungaran dengan udara sejuk dan pemandangan asri.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full lg:w-auto shrink-0">
              <a
                href={SITE_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-ivory hover:bg-champagne text-forest-deep px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.18em] font-semibold text-center transition-colors flex items-center justify-center space-x-2 shadow-md"
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
                className="w-full sm:w-auto border border-white/30 text-ivory hover:border-champagne hover:text-champagne px-7 py-3.5 rounded-full text-xs uppercase tracking-wider font-semibold text-center transition-colors"
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
