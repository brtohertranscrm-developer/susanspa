'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Sparkles,
  Church,
  Compass,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { BookingBar, type BookingSearchParams } from '@/components/global/BookingBar';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { ReservationModal } from '@/components/global/ReservationModal';
import { RoomCard } from '@/components/ui/RoomCard';
import { FEATURED_FACILITIES } from '@/data/facilities';
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
  'Mountain resort',
  'Wellness & relaxation',
  'Spa on the Sky',
  'Accommodation',
  'Family getaway',
  'Wedding destination',
  'Leisure experience',
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
    }, 6000);
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

  // Filter 4-6 featured rooms
  const featuredRooms = rooms
    .filter((room) => FEATURED_ROOM_SLUGS.includes(room.slug))
    .sort(
      (a, b) =>
        FEATURED_ROOM_SLUGS.indexOf(a.slug) - FEATURED_ROOM_SLUGS.indexOf(b.slug)
    );

  const displayRooms = featuredRooms.length >= 4 ? featuredRooms : rooms.slice(0, 6);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans selection:bg-champagne selection:text-forest-deep">
      {/* Global Navigation Header */}
      <Header rooms={rooms} onOpenReserve={() => handleOpenReserve('room')} />

      {/* ========================================================================= */}
      {/* 01 — HERO CAROUSEL & BOOKING WIDGET */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-20 overflow-hidden bg-forest-deep">
        {/* Carousel Background Images */}
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

        {/* Hero Copy Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-ivory space-y-6 pt-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-forest-deep/80 border border-champagne/40 text-champagne text-xs uppercase tracking-[0.25em] backdrop-blur-md">
            <Compass className="w-3.5 h-3.5" />
            <span>{HERO_SLIDES[currentHeroSlide].tag}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] text-ivory tracking-tight max-w-4xl mx-auto">
            {HERO_SLIDES[currentHeroSlide].subtitle.split(' ').slice(0, -2).join(' ')}{' '}
            <span className="italic text-champagne">
              {HERO_SLIDES[currentHeroSlide].subtitle.split(' ').slice(-2).join(' ')}
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-ivory/85 max-w-2xl mx-auto font-light leading-relaxed">
            Susan Spa & Resort — destinasi resort dan relaksasi spa di kawasan Gunung Ungaran, Bandungan.
          </p>

          <div className="pt-2 flex items-center justify-center space-x-4">
            <button
              onClick={() => handleOpenReserve('room')}
              className="bg-champagne hover:bg-champagne-light text-forest-deep px-8 py-3.5 rounded-full font-bold uppercase tracking-[0.2em] text-xs shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Book Your Stay
            </button>

            <a
              href="#intro"
              className="border border-champagne/40 hover:bg-forest/60 text-ivory px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Discover More
            </a>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={() =>
            setCurrentHeroSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-forest-deep/60 hover:bg-forest-deep text-ivory hover:text-champagne border border-white/10 hidden md:flex items-center justify-center transition-colors"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() =>
            setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length)
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-forest-deep/60 hover:bg-forest-deep text-ivory hover:text-champagne border border-white/10 hidden md:flex items-center justify-center transition-colors"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentHeroSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentHeroSlide === i ? 'w-8 bg-champagne' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Desktop Booking Widget */}
        <div className="absolute bottom-4 left-4 right-4 z-20 hidden md:block">
          <BookingBar onSearch={handleBookingSearch} ctaText="Book Now" />
        </div>
      </section>

      {/* Mobile Booking Widget */}
      <div className="md:hidden p-4 bg-forest-deep border-b border-champagne/20">
        <BookingBar onSearch={handleBookingSearch} ctaText="Book Now" />
      </div>

      {/* ========================================================================= */}
      {/* 02 — SECTION 2: INTRODUCTION */}
      {/* ========================================================================= */}
      <section id="intro" className="py-24 px-4 sm:px-6 lg:px-8 max-w-wide mx-auto space-y-10">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <span className="text-xs uppercase tracking-[0.25em] text-botanical font-bold block">
            BRAND INTRODUCTION
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep leading-tight">
            Susan Spa & Resort
          </h2>
          <div className="w-16 h-[2px] bg-champagne mx-auto my-3" />
          <p className="text-sm sm:text-base text-charcoal/85 leading-relaxed font-normal">
            Susan Spa & Resort merupakan resort dan spa destination yang berlokasi di Bandungan, Semarang, Jawa Tengah.
          </p>
          <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed font-normal">
            Berada sekitar <strong className="text-forest-deep font-semibold">1,100 meter di atas permukaan laut di kawasan Gunung Ungaran</strong>, resort menawarkan suasana pegunungan dan panorama dari dataran tinggi.
          </p>
        </div>

        {/* 7 Core USPs */}
        <div className="pt-4">
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {USP_LIST.map((usp, idx) => (
              <div
                key={idx}
                className="inline-flex items-center space-x-2 bg-ivory-warm border border-stone/30 hover:border-champagne px-4 py-2.5 rounded-full text-xs font-medium text-forest-deep shadow-sm transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-champagne shrink-0" />
                <span>{usp}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-2">
          <Link
            href="/facilities"
            className="inline-flex items-center space-x-2 bg-forest-deep hover:bg-forest text-champagne px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-lg transition-all duration-300"
          >
            <span>Discover Susan Spa & Resort</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03 — SECTION: FEATURED FACILITIES */}
      {/* ========================================================================= */}
      <section className="py-24 bg-forest-deep text-ivory">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">
                RESORT EXPERIENCES
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-ivory">
                Featured Facilities
              </h2>
              <p className="text-sm text-ivory/70 leading-relaxed">
                Nikmati fasilitas unggulan kami mulai dari kolam renang air hangat, relaksasi spa di atas awan, hingga kapel kaca ikonik La Kana.
              </p>
            </div>

            <Link
              href="/facilities"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-champagne hover:text-champagne-light font-semibold border-b border-champagne pb-1 shrink-0"
            >
              <span>Explore All Facilities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 9 Featured Facilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {FEATURED_FACILITIES.map((facility) => (
              <div
                key={facility.id}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-champagne/20 shadow-lg hover:border-champagne/60 transition-all duration-500 flex flex-col justify-end p-6"
              >
                <Image
                  src={facility.image}
                  alt={facility.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/50 to-transparent" />

                <div className="relative z-10 space-y-1.5">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-champagne block font-semibold">
                    {facility.category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-ivory group-hover:text-champagne transition-colors">
                    {facility.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/facilities"
              className="inline-flex items-center space-x-2 bg-champagne hover:bg-champagne-light text-forest-deep px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-lg transition-colors"
            >
              <span>Explore All Facilities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04 — SECTION: FEATURED ROOMS (4-6 Kamar) */}
      {/* ========================================================================= */}
      <section className="py-24 bg-ivory text-charcoal">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-botanical font-semibold block">
                ACCOMMODATION SELECTION
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep">
                Featured Rooms & Suites
              </h2>
              <p className="text-sm text-charcoal/75 leading-relaxed">
                Pilihan akomodasi unggulan dengan kenyamanan elegan, balkon berpanorama asri, serta privasi eksklusif di lereng Gunung Ungaran.
              </p>
            </div>

            <Link
              href="/rooms"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-forest-deep hover:text-champagne font-semibold border-b border-forest-deep pb-1 shrink-0 transition-colors"
            >
              <span>View All Rooms</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Room Cards Grid (4-6 rooms) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onInquire={(slug) => handleOpenReserve('room', slug)}
              />
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/rooms"
              className="inline-flex items-center space-x-2 bg-forest-deep hover:bg-forest text-champagne px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-lg transition-colors"
            >
              <span>View All Rooms</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05 — SECTION: SPA / WELLNESS HIGHLIGHT */}
      {/* ========================================================================= */}
      <section className="py-24 bg-forest text-ivory relative overflow-hidden">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual Stack */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-champagne/20">
                <Image
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop"
                  alt="Spa Treatment"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl border border-champagne/20">
                <Image
                  src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop"
                  alt="Jacuzzi Hydrotherapy"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl border border-champagne/20">
                <Image
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop"
                  alt="Treatment Room"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-champagne/20">
                <Image
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop"
                  alt="Mountain Atmosphere"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Copy Column */}
          <div className="space-y-6 lg:pl-6">
            <span className="text-xs uppercase tracking-[0.25em] text-champagne font-bold block">
              SIGNATURE WELLNESS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-ivory leading-tight">
              Spa on the Sky
            </h2>
            <p className="text-sm sm:text-base text-ivory/80 leading-relaxed font-normal">
              Luxury wellness experience dengan panorama pegunungan Bandungan. Menggabungkan tradisi herbal luhur Jawa dengan kenyamanan modern di ketinggian 1,100 meter di atas permukaan laut.
            </p>
            <p className="text-sm text-ivory/70 leading-relaxed">
              Manjakan diri Anda dengan private jacuzzi hydrotherapy, herbal thermal sauna, serta terapis profesional bersertifikat dalam suasana pegunungan yang sejuk dan menenangkan.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link
                href="/facilities"
                className="bg-champagne hover:bg-champagne-light text-forest-deep px-8 py-3.5 rounded-full font-bold uppercase tracking-[0.2em] text-xs text-center shadow-lg transition-colors"
              >
                Discover Our Spa
              </Link>
              <button
                onClick={() => handleOpenReserve('spa')}
                className="border border-champagne/50 hover:bg-forest-deep text-champagne px-8 py-3.5 rounded-full font-semibold uppercase tracking-wider text-xs transition-colors"
              >
                Inquire Spa Ritual
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06 — SECTION: WEDDING HIGHLIGHT */}
      {/* ========================================================================= */}
      <section className="py-24 bg-ivory text-charcoal relative overflow-hidden">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Media Stack (La Kana Chapel) */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-stone/30 group">
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop"
              alt="La Kana Chapel Susan Spa & Resort"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent opacity-60" />

            <div className="absolute bottom-8 left-8 right-8 text-ivory space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-champagne block font-semibold">
                ICONIC WEDDING VENUE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-ivory">
                La Kana Glass Chapel
              </h3>
              <p className="text-xs text-ivory/80">
                Altar kaca transparan dengan panorama pegunungan di atas awan.
              </p>
            </div>
          </div>

          {/* Copy Column */}
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-botanical font-bold block">
              SACRED CELEBRATIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep leading-tight">
              Your Dream Wedding Above the Clouds
            </h2>
            <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-normal">
              Susan Spa & Resort menawarkan venue wedding, Holy Matrimony, outdoor celebration, dan pre-wedding experience di kawasan pegunungan Bandungan yang romantis dan sejuk.
            </p>

            <ul className="space-y-3 text-xs sm:text-sm text-charcoal/90 pt-2">
              <li className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-forest text-champagne flex items-center justify-center shrink-0">
                  <Church className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium">La Kana Chapel — Kapel Kaca Ikonik</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-forest text-champagne flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium">Outdoor Wedding di Sky Garden Area</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-forest text-champagne flex items-center justify-center shrink-0">
                  <Church className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium">Frangipani Grand Ballroom</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-forest text-champagne flex items-center justify-center shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium">Curated Wedding Packages</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-forest text-champagne flex items-center justify-center shrink-0">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium">Scenic Pre-Wedding Locations</span>
              </li>
            </ul>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/wedding"
                className="w-full sm:w-auto bg-champagne hover:bg-champagne-light text-forest-deep px-8 py-3.5 rounded-full font-bold uppercase tracking-[0.2em] text-xs shadow-lg transition-colors text-center"
              >
                Explore Wedding Packages
              </Link>
              <button
                onClick={() => handleOpenReserve('wedding')}
                className="w-full sm:w-auto border border-forest-deep text-forest-deep hover:bg-forest-deep hover:text-champagne px-8 py-3.5 rounded-full font-semibold uppercase tracking-wider text-xs transition-colors"
              >
                Wedding Inquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07 — SECTION: SPECIAL OFFERS (Dynamic, hide if empty) */}
      {/* ========================================================================= */}
      {OFFERS.length > 0 && (
        <section className="py-24 bg-forest-deep text-ivory">
          <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">
                  EXCLUSIVE OFFERS
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-ivory">
                  Special Offers & Packages
                </h2>
                <p className="text-sm text-ivory/70 leading-relaxed">
                  Penawaran musiman eksklusif untuk pengalaman liburan dan relaksasi terbaik di Bandungan.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {OFFERS.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-forest rounded-3xl overflow-hidden border border-champagne/30 shadow-xl flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-champagne text-forest-deep text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                        {offer.badge}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="text-[10px] text-champagne uppercase tracking-wider block font-medium">
                        {offer.validity}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-ivory">
                        {offer.title}
                      </h3>
                      <p className="text-xs text-ivory/70 line-clamp-3 leading-relaxed">
                        {offer.description}
                      </p>
                    </div>
                    <button
                      onClick={() => handleOpenReserve('room')}
                      className="w-full bg-champagne hover:bg-champagne-light text-forest-deep py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider font-bold transition-colors flex items-center justify-center space-x-1 shadow-sm"
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
      {/* 08 — SECTION: NEARBY DESTINATIONS (4 Destinasi) */}
      {/* ========================================================================= */}
      <section className="py-24 bg-ivory text-charcoal">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-botanical font-semibold block">
                DESTINATION HIGHLIGHTS
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep">
                Nearby Destinations
              </h2>
              <p className="text-sm text-charcoal/75 leading-relaxed">
                Jelajahi atraksi wisata populer di sekitar Susan Spa & Resort, mulai dari taman bunga highland hingga candi bersejarah.
              </p>
            </div>

            <Link
              href="/nearby"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-forest-deep hover:text-champagne font-semibold border-b border-forest-deep pb-1 shrink-0 transition-colors"
            >
              <span>Explore Nearby Attractions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {NEARBY_DESTINATIONS.map((dest) => (
              <div
                key={dest.id}
                className="group bg-ivory-warm border border-stone/30 rounded-3xl overflow-hidden hover:border-champagne transition-all shadow-md flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
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
                    <h3 className="font-serif text-lg text-forest-deep group-hover:text-champagne transition-colors font-semibold">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-charcoal/70 line-clamp-2 leading-relaxed">
                      {dest.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center space-x-2">
                    <Link
                      href={`/nearby/${dest.slug}`}
                      className="flex-1 bg-forest-deep text-champagne text-center py-2 px-3 rounded-xl text-[11px] font-semibold uppercase tracking-wider hover:bg-forest transition-colors"
                    >
                      Explore
                    </Link>

                    {dest.mapUrl && (
                      <a
                        href={dest.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border border-stone/30 rounded-xl text-charcoal/80 hover:text-champagne hover:border-champagne transition-colors"
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

          <div className="text-center pt-2">
            <Link
              href="/nearby"
              className="inline-flex items-center space-x-2 bg-forest-deep hover:bg-forest text-champagne px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-lg transition-colors"
            >
              <span>Explore Nearby Attractions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 09 — SECTION: LOCATION (Find Us in Bandungan) */}
      {/* ========================================================================= */}
      <section className="py-24 bg-forest-deep text-ivory border-t border-champagne/20">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-champagne font-bold block">
              LOCATION & ACCESS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-ivory">
              Find Us in Bandungan
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            {/* Address & Contact Info Card */}
            <div className="bg-forest p-8 rounded-3xl border border-champagne/30 space-y-6 shadow-xl">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-champagne block font-semibold">
                  Official Address
                </span>
                <p className="font-serif text-lg text-ivory leading-relaxed">
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
                  className="w-full bg-champagne hover:bg-champagne-light text-forest-deep py-3 rounded-full text-xs uppercase tracking-[0.2em] font-bold text-center transition-colors shadow-md flex items-center justify-center space-x-2"
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
                  className="w-full border border-champagne/40 text-ivory hover:bg-forest-deep py-3 rounded-full text-xs uppercase tracking-wider font-semibold text-center transition-colors"
                >
                  Chat WhatsApp Concierge
                </a>
              </div>
            </div>

            {/* Google Maps Embed Container */}
            <div className="lg:col-span-2 relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border border-champagne/30 shadow-2xl bg-forest">
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
