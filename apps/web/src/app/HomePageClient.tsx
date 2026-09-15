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
import { RoomCard } from '@/components/ui/RoomCard';
import { FeaturedFacilitiesCarousel } from '@/components/ui/FeaturedFacilitiesCarousel';
import { OFFERS } from '@/data/offers';
import { NEARBY_DESTINATIONS } from '@/data/nearby';
import { SITE_CONFIG } from '@/data/site';
import type { Room } from '@/types';

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop',
    title: 'Resort & Mountain View',
    subtitle: 'Where the Mountains Invite You to Slow Down',
    tag: 'Bandungan Highlands ~1,100m ASL',
  },
  {
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop',
    title: 'La Kana Glass Chapel',
    subtitle: 'Your Dream Wedding Above the Clouds',
    tag: 'Sacred Celebrations',
  },
  {
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2000&auto=format&fit=crop',
    title: 'Heated Infinity Pool & Valley',
    subtitle: 'Warm Springs & Gentle Highland Air',
    tag: 'Restorative Leisure',
  },
  {
    image: 'https://dksw6vf0i66fe.cloudfront.net/room_type_image/image/32b5388a-b0ce-4bce-b95c-5efd4da8c259_1726474989.JPG',
    title: 'Luxury Suites & Villas',
    subtitle: 'Comfort, Elegance & Mountain Serenity',
    tag: 'Grand Suite Private Jacuzzi',
  },
  {
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop',
    title: 'Spa on the Sky Sanctuary',
    subtitle: 'Centuries-Old Javanese Botanical Healing',
    tag: 'Holistic Wellness',
  },
];

const USP_LIST = [
  'Mountain Resort',
  'Wellness & Relaxation',
  'Spa on the Sky',
  'Luxury Suites & Villas',
  'Family Getaway',
  'La Kana Wedding',
  'Highland Leisure',
];

// Curated wellness offerings (multi-column list format inspired by reference)
const SPA_OFFERINGS_COL1 = [
  'Private Hydrotherapy Jacuzzi',
  'Javanese Herbal Thermal Sauna',
  'Traditional Aromatherapy Massage',
  'Botanical Body Scrubs (Lulur Tradisional)',
];

const SPA_OFFERINGS_COL2 = [
  'Certified Mountain Wellness Therapists',
  'Romantic Couple Treatment Suites',
  'Heated Indoor Panoramic Swimming Pool',
  'Sky Garden Herbal Tea Lounge',
];

const SPA_GALLERY_STRIP = [
  {
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop',
    title: 'Herbal Massage Therapy',
  },
  {
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop',
    title: 'Warm Water Hydrotherapy',
  },
  {
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop',
    title: 'Thermal Sauna Rituals',
  },
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
    title: 'Highland Fresh Atmosphere',
  },
];

// Featured rooms to display on homepage
const FEATURED_ROOM_SLUGS = [
  'aurora-junior-suite',
  'family-suite-room',
  'grand-suite',
  'prince-suite',
  'president-suite',
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

  // Filter 6 featured rooms
  const featuredRooms = rooms
    .filter((room) => FEATURED_ROOM_SLUGS.includes(room.slug))
    .sort(
      (a, b) =>
        FEATURED_ROOM_SLUGS.indexOf(a.slug) - FEATURED_ROOM_SLUGS.indexOf(b.slug)
    );

  const displayRooms = featuredRooms.length >= 4 ? featuredRooms : rooms.slice(0, 6);

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
            A highland sanctuary in Bandungan offering{' '}
            <span className="italic font-normal text-champagne">
              world-class serenity
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-ivory/85 max-w-2xl mx-auto font-light leading-relaxed">
            Committed to restorative mountain stays, centuries-old Javanese botanical wellness, and sacred celebrations above the clouds.
          </p>

          <div className="pt-2 flex items-center justify-center space-x-4">
            <button
              onClick={() => handleOpenReserve('room')}
              className="bg-ivory hover:bg-champagne text-forest-deep px-8 py-3.5 rounded-full font-semibold uppercase tracking-[0.18em] text-xs transition-all duration-300 transform hover:scale-105"
            >
              Book Your Stay
            </button>

            <a
              href="#intro"
              className="border border-white/30 hover:border-champagne hover:text-champagne text-ivory px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Our Philosophy
            </a>
          </div>

          {/* Direct Sub-Nav Links with Arrows (like reference design) */}
          <div className="pt-8 hidden sm:flex items-center justify-center space-x-8 text-xs uppercase tracking-wider text-ivory/75 font-medium">
            <a
              href="#rooms"
              className="hover:text-champagne transition-colors flex items-center space-x-1.5 border-b border-transparent hover:border-champagne pb-1"
            >
              <span>Curated Suites</span>
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
              <span>La Kana Chapel</span>
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
            <BookingBar onSearch={handleBookingSearch} ctaText="Book Now" />
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
        <BookingBar onSearch={handleBookingSearch} ctaText="Book Now" />
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
                WELCOME TO SUSAN SPA & RESORT
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep leading-tight font-normal">
                Serenity Above the Clouds, 1,100 Meters Altitude.
              </h2>
              <p className="editorial-body">
                Susan Spa & Resort merupakan destinasi peristirahatan dan pemulihan jiwa di lereng Gunung Ungaran, Bandungan. Dikelilingi udara pegunungan yang senantiasa sejuk dan panorama lembah hijau yang membentang luas, kami menghadirkan perpaduan kenyamanan akomodasi modern dan ketenangan alam.
              </p>
              <p className="editorial-body">
                Setiap sudut resort dirancang untuk memberikan ruang bernapas yang leluasa, memulihkan energi dari hiruk-pikuk keseharian, serta merayakan momen-momen paling berharga bersama orang terkasih.
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
                Established Sanctuary • Bandungan, Central Java
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
                <span className="italic">Our approach to restorative wellness is different.</span>
              </h3>
              <p className="editorial-body">
                Alih-alih sekadar tempat menginap, kami mengajak Anda menyelami ritme hidup yang lebih perlahan dan sadar. Dari sentuhan botanical spa tradisional khas Jawa, kehangatan kolam renang air hangat berlatar perbukitan, hingga udara bersih pegunungan yang menyegarkan raga.
              </p>
              <p className="editorial-body">
                Di sini, kemewahan tidak didefinisikan oleh kemegahan yang berlebih, melainkan oleh keheningan, privasi, dan keasrian alam yang meremajakan seluruh indra Anda.
              </p>

              <div className="pt-2">
                <Link
                  href="/facilities"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-forest-deep hover:text-champagne font-bold border-b border-forest-deep hover:border-champagne pb-1 transition-colors"
                >
                  <span>Discover All Resort Experiences</span>
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
      {/* 04 — SECTION: FEATURED ROOMS & SUITES (Clean Pure White `#FFFFFF`) */}
      {/* ========================================================================= */}
      <section id="rooms" className="py-24 sm:py-32 bg-white text-forest-deep">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-stone-200/70">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-botanical font-bold block">
                ACCOMMODATION SELECTION
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep font-normal">
                Suites & Villas Tailored for Rejuvenation
              </h2>
              <p className="editorial-body text-sm sm:text-base">
                Pilihan akomodasi unggulan dengan kenyamanan elegan, balkon berpanorama asri, serta privasi eksklusif di lereng Gunung Ungaran.
              </p>
            </div>

            <Link
              href="/rooms"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-forest-deep hover:text-champagne font-bold border-b border-forest-deep hover:border-champagne pb-1 shrink-0 transition-colors"
            >
              <span>View All 11 Room Types</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Clean Flat Room Cards Grid (6 curated rooms) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onInquire={(slug) => handleOpenReserve('room', slug)}
              />
            ))}
          </div>

          {/* Bottom Link */}
          <div className="text-center pt-6">
            <Link
              href="/rooms"
              className="inline-flex items-center space-x-2 border border-stone-300 hover:border-forest text-forest hover:bg-forest hover:text-champagne px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300"
            >
              <span>Explore All Rooms & Villas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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
                SIGNATURE WELLNESS
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep leading-tight font-normal">
                Spa on the Sky Sanctuary
              </h2>
              <p className="editorial-body">
                Terletak di titik tertinggi resort pada ketinggian 1,100 meter di atas permukaan laut, Spa on the Sky memadukan warisan resep herbal luhur Jawa dengan fasilitas hidroterapi modern.
              </p>
              <p className="editorial-body">
                Lepaskan kepenatan tubuh Anda dalam hangatnya private jacuzzi berlatar kabut gunung, nikmati sauna herbal aromatik, dan rasakan sentuhan terapis profesional bersertifikat.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/facilities"
                  className="bg-forest-deep hover:bg-forest text-champagne px-7 py-3 rounded-full font-semibold uppercase tracking-[0.18em] text-xs text-center transition-colors"
                >
                  Explore Spa Rituals
                </Link>
                <button
                  onClick={() => handleOpenReserve('spa')}
                  className="border border-stone-300 hover:border-forest text-forest hover:bg-forest hover:text-ivory px-7 py-3 rounded-full font-semibold uppercase tracking-wider text-xs transition-colors"
                >
                  Inquire Spa Concierge
                </button>
              </div>
            </div>

            {/* Right: Structured 2-Column Scannable Offerings List with Delicate Luxury Dots */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/80 space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-champagne-dark font-bold block">
                  HOLISTIC BOTANICAL REPERTOIRE
                </span>
                <h3 className="font-serif text-2xl text-forest-deep font-normal">
                  Our Signature Treatments & Rituals
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
                <span>Available daily for in-house guests & day visitors</span>
                <Link
                  href="/facilities"
                  className="text-forest hover:text-champagne font-semibold tracking-wide flex items-center space-x-1"
                >
                  <span>Full Spa Menu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Strip: 4 Editorial Photos ("What We Offer" horizontal visual showcase) */}
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-stone-500 font-bold block">
              VISUAL REPERTOIRE
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
                ICONIC HIGHLAND GLASS CHAPEL
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-normal">
                La Kana Glass Chapel
              </h3>
              <p className="text-xs text-ivory/80 font-light">
                Altar kaca transparan berpanorama pegunungan di atas awan.
              </p>
            </div>
          </div>

          {/* Copy Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-champagne font-bold block">
              SACRED CELEBRATIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-ivory leading-tight font-normal">
              Your Dream Wedding Above the Clouds
            </h2>
            <p className="text-sm sm:text-base text-ivory/85 leading-relaxed font-light">
              Susan Spa & Resort menawarkan venue pernikahan sakral Holy Matrimony, outdoor garden celebration, dan pre-wedding session di kawasan pegunungan Bandungan yang romantis dan sejuk.
            </p>

            {/* Inclusions List */}
            <ul className="space-y-3 text-xs sm:text-sm text-ivory/90 pt-2 font-light">
              <li className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-forest-deep border border-champagne/30 text-champagne flex items-center justify-center shrink-0">
                  <Church className="w-3 h-3" />
                </div>
                <span>La Kana Glass Chapel — Altar Kaca Ikonik Penuh Cahaya</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-forest-deep border border-champagne/30 text-champagne flex items-center justify-center shrink-0">
                  <Sparkles className="w-3 h-3" />
                </div>
                <span>Outdoor Wedding di Sky Garden & Balcony Area</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-forest-deep border border-champagne/30 text-champagne flex items-center justify-center shrink-0">
                  <Church className="w-3 h-3" />
                </div>
                <span>Frangipani Grand Ballroom untuk Jamuan Resepsi</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-forest-deep border border-champagne/30 text-champagne flex items-center justify-center shrink-0">
                  <Calendar className="w-3 h-3" />
                </div>
                <span>Curated Holy Matrimony & Complete Wedding Packages</span>
              </li>
            </ul>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/wedding"
                className="w-full sm:w-auto bg-ivory hover:bg-champagne text-forest-deep px-8 py-3.5 rounded-full font-semibold uppercase tracking-[0.18em] text-xs transition-colors text-center"
              >
                Explore Wedding Packages
              </Link>
              <button
                onClick={() => handleOpenReserve('wedding')}
                className="w-full sm:w-auto border border-white/30 text-ivory hover:border-champagne hover:text-champagne px-8 py-3.5 rounded-full font-semibold uppercase tracking-wider text-xs transition-colors"
              >
                Wedding Inquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07 — SECTION: SPECIAL OFFERS (Clean Pure White `#FFFFFF` - if active) */}
      {/* ========================================================================= */}
      {OFFERS.length > 0 && (
        <section className="py-24 sm:py-32 bg-white text-forest-deep border-b border-stone-200/70">
          <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-stone-200/70">
              <div className="space-y-3 max-w-2xl">
                <span className="text-xs uppercase tracking-[0.25em] text-botanical font-bold block">
                  EXCLUSIVE OFFERS
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep font-normal">
                  Special Offers & Seasonal Packages
                </h2>
                <p className="editorial-body text-sm sm:text-base">
                  Penawaran musiman eksklusif untuk pengalaman liburan dan relaksasi terbaik di Bandungan.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {OFFERS.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 flex flex-col justify-between hover:border-champagne transition-colors"
                >
                  <div className="relative aspect-[16/10] bg-stone-100">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-forest-deep text-champagne text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-champagne/30">
                        {offer.badge}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] text-champagne-dark uppercase tracking-wider block font-bold">
                        {offer.validity}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-forest-deep font-normal">
                        {offer.title}
                      </h3>
                      <p className="text-xs text-[#4A5852] line-clamp-3 leading-relaxed font-normal">
                        {offer.description}
                      </p>
                    </div>
                    <button
                      onClick={() => handleOpenReserve('room')}
                      className="w-full border border-stone-300 hover:border-forest text-forest hover:bg-forest hover:text-ivory py-2.5 px-4 rounded-full text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center space-x-1"
                    >
                      <span>View Offer</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 08 — SECTION: NEARBY DESTINATIONS (Clean Warm Off-White `#FAF8F5`) */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 bg-[#FAF8F5] text-forest-deep">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-stone-200/70">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-botanical font-bold block">
                DESTINATION HIGHLIGHTS
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep font-normal">
                Nearby Attractions in Bandungan
              </h2>
              <p className="editorial-body text-sm sm:text-base">
                Jelajahi atraksi wisata populer di sekitar Susan Spa & Resort, mulai dari taman bunga highland hingga candi bersejarah.
              </p>
            </div>

            <Link
              href="/nearby"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-forest-deep hover:text-champagne font-bold border-b border-forest-deep hover:border-champagne pb-1 shrink-0 transition-colors"
            >
              <span>Explore Nearby Attractions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 4 Clean Flat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {NEARBY_DESTINATIONS.map((dest) => (
              <div
                key={dest.id}
                className="group bg-white border border-stone-200/80 rounded-3xl overflow-hidden hover:border-champagne transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-forest-deep/90 text-champagne text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-champagne/20 font-semibold">
                    {dest.distance}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg text-forest-deep group-hover:text-champagne transition-colors font-medium">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-[#4A5852] line-clamp-2 leading-relaxed font-normal">
                      {dest.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center space-x-2">
                    <Link
                      href={`/nearby/${dest.slug}`}
                      className="flex-1 bg-forest-deep text-champagne text-center py-2 px-3 rounded-full text-[11px] font-semibold uppercase tracking-wider hover:bg-forest transition-colors"
                    >
                      Explore
                    </Link>

                    {dest.mapUrl && (
                      <a
                        href={dest.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border border-stone-300 rounded-full text-stone-600 hover:text-forest hover:border-forest transition-colors"
                        title="Get Direction"
                      >
                        <MapPin className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 09 — SECTION: LOCATION & ACCESS (Solid Luxury Forest Green `#10241F`) */}
      {/* ========================================================================= */}
      <section className="py-24 sm:py-32 bg-forest-deep text-ivory border-t border-white/15">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-champagne font-bold block">
              LOCATION & ACCESS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-ivory font-normal">
              Find Us in Bandungan Highlands
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            {/* Address & Contact Info Card with Flat Clean Hairline Border */}
            <div className="bg-forest p-8 sm:p-9 rounded-3xl border border-white/15 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-champagne block font-semibold">
                  Official Address
                </span>
                <p className="font-serif text-lg text-ivory leading-relaxed font-normal">
                  {SITE_CONFIG.address.street}
                  <br />
                  {SITE_CONFIG.address.village}, {SITE_CONFIG.address.district}
                  <br />
                  {SITE_CONFIG.address.regency}
                  <br />
                  {SITE_CONFIG.address.province} {SITE_CONFIG.address.postalCode}
                </p>
              </div>

              <div className="space-y-1 pt-2 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-[0.2em] text-champagne block font-semibold">
                  Phone Concierge
                </span>
                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="font-serif text-xl text-ivory hover:text-champagne transition-colors block"
                >
                  {SITE_CONFIG.contact.phoneFormatted}
                </a>
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <a
                  href={SITE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-ivory hover:bg-champagne text-forest-deep py-3 rounded-full text-xs uppercase tracking-[0.18em] font-semibold text-center transition-colors flex items-center justify-center space-x-2"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>

                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
                    'Halo Susan Spa & Resort, mohon panduan arah menuju lokasi resort.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-white/20 text-ivory hover:border-champagne hover:text-champagne py-3 rounded-full text-xs uppercase tracking-wider font-semibold text-center transition-colors"
                >
                  Chat WhatsApp Concierge
                </a>
              </div>
            </div>

            {/* Google Maps Embed Container with Clean Hairline Border */}
            <div className="lg:col-span-2 relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border border-white/15 bg-forest">
              <iframe
                title="Susan Spa & Resort Google Maps Location"
                src={SITE_CONFIG.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              />
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
