'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Compass,
  ArrowRight,
  ShieldCheck,
  Award,
  Heart,
  Church,
  Calendar,
  ChevronRight,
  Sun,
  Wind,
  MapPin,
  Phone,
} from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { BookingBar } from '@/components/global/BookingBar';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { ReservationModal } from '@/components/global/ReservationModal';
import { RoomCard } from '@/components/ui/RoomCard';
import { TreatmentCard } from '@/components/ui/TreatmentCard';
import { WeddingCard } from '@/components/ui/WeddingCard';
import { TestimonialCarousel } from '@/components/ui/TestimonialCarousel';
import { ROOMS } from '@/data/rooms';
import { SPA_TREATMENTS } from '@/data/spa';
import { WEDDING_PACKAGES } from '@/data/weddings';
import { OFFERS } from '@/data/offers';
import { NEARBY_DESTINATIONS } from '@/data/nearby';

export default function HomePage() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [modalRoomSlug, setModalRoomSlug] = useState<string | undefined>();
  const [modalType, setModalType] = useState<'room' | 'spa' | 'wedding' | 'event'>('room');

  const handleOpenReserve = (type: 'room' | 'spa' | 'wedding' | 'event' = 'room', roomSlug?: string) => {
    setModalType(type);
    setModalRoomSlug(roomSlug);
    setIsReserveModalOpen(true);
  };

  const handleBookingSearch = (params: any) => {
    handleOpenReserve('room', params.category !== 'All Categories' ? params.category : undefined);
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans selection:bg-champagne selection:text-forest-deep">
      {/* Main Navigation Header */}
      <Header onOpenReserve={() => handleOpenReserve('room')} />

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-20 overflow-hidden bg-forest-deep">
        {/* Background Image / Video Fallback */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop"
            alt="Susan Spa & Resort Mountain Sanctuary"
            fill
            priority
            className="object-cover scale-105 animate-pulse-subtle opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/60 to-forest-deep/30" />
        </div>

        {/* Hero Copy Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-ivory space-y-6 pt-12">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-forest-deep/80 border border-champagne/40 text-champagne text-xs uppercase tracking-[0.25em] backdrop-blur-md animate-slide-up">
            <span>A Serene Escape Above Bandungan</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] text-ivory tracking-tight max-w-4xl mx-auto">
            Where the Mountains Invite You to <span className="italic text-champagne">Slow Down</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-ivory/80 max-w-2xl mx-auto font-light leading-relaxed">
            Discover restorative stays, elevated wellness spa rituals, and memorable celebrations surrounded by the cool mountain air of Central Java.
          </p>
        </div>

        {/* Floating Quick Reservation Widget */}
        <div className="absolute bottom-6 left-4 right-4 z-20 hidden md:block">
          <BookingBar onSearch={handleBookingSearch} />
        </div>
      </section>

      {/* Mobile Booking Bar */}
      <div className="md:hidden p-4 bg-forest-deep border-b border-champagne/20">
        <BookingBar onSearch={handleBookingSearch} />
      </div>

      {/* Brand Introduction Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-wide mx-auto text-center space-y-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-botanical font-semibold block">
            ELEVATED MOUNTAIN SANCTUARY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep leading-tight">
            Restorative Wellness & Timeless Javanese Hospitality
          </h2>
          <div className="w-16 h-[2px] bg-champagne mx-auto my-4" />
          <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-normal">
            Perched at an elevation of approximately 1,100 meters on the peaceful slopes of Mount Ungaran, Susan Spa & Resort offers a gentle haven away from urban noise. Here, morning mist greets you over landscaped flower gardens, private hydrotherapy whirlpools soothe tired muscles, and the majestic glass architecture of La Kana Chapel creates an extraordinary setting for life’s most sacred celebrations.
          </p>
        </div>

        {/* Key Resort Highlights Grid with Square Category Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-8">
          {/* Card 1: Mountain Altitude */}
          <div className="group bg-ivory-warm border border-stone/30 rounded-3xl p-4 sm:p-5 space-y-4 text-center hover:border-champagne transition-all duration-500 shadow-sm hover:shadow-xl flex flex-col justify-between">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-inner">
              <Image
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop"
                alt="1,100m ASL Altitude Bandungan"
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="space-y-2 px-1 pb-2">
              <h3 className="font-serif text-xl sm:text-2xl text-forest-deep group-hover:text-champagne transition-colors">
                1,100m ASL Altitude
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed font-normal">
                Cool, fresh highland climate averaging 18°C to 24°C year-round.
              </p>
            </div>
          </div>

          {/* Card 2: Signature Spa Rituals */}
          <div className="group bg-ivory-warm border border-stone/30 rounded-3xl p-4 sm:p-5 space-y-4 text-center hover:border-champagne transition-all duration-500 shadow-sm hover:shadow-xl flex flex-col justify-between">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-inner">
              <Image
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop"
                alt="Signature Spa Rituals"
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="space-y-2 px-1 pb-2">
              <h3 className="font-serif text-xl sm:text-2xl text-forest-deep group-hover:text-champagne transition-colors">
                Signature Spa Rituals
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed font-normal">
                Traditional Javanese herbal bath rituals and thermal volcanic stone therapy.
              </p>
            </div>
          </div>

          {/* Card 3: La Kana Chapel */}
          <div className="group bg-ivory-warm border border-stone/30 rounded-3xl p-4 sm:p-5 space-y-4 text-center hover:border-champagne transition-all duration-500 shadow-sm hover:shadow-xl flex flex-col justify-between">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-inner">
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
                alt="La Kana Chapel"
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="space-y-2 px-1 pb-2">
              <h3 className="font-serif text-xl sm:text-2xl text-forest-deep group-hover:text-champagne transition-colors">
                La Kana Chapel
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed font-normal">
                Iconic glass altar chapel framing sweeping views of Mount Ungaran.
              </p>
            </div>
          </div>

          {/* Card 4: Sky Garden Dining */}
          <div className="group bg-ivory-warm border border-stone/30 rounded-3xl p-4 sm:p-5 space-y-4 text-center hover:border-champagne transition-all duration-500 shadow-sm hover:shadow-xl flex flex-col justify-between">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-inner">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop"
                alt="Sky Garden Dining"
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="space-y-2 px-1 pb-2">
              <h3 className="font-serif text-xl sm:text-2xl text-forest-deep group-hover:text-champagne transition-colors">
                Sky Garden Dining
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed font-normal">
                Fresh organic farm-to-table cuisine overlooking Bandungan valley.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Accommodations Showcase */}
      <section className="py-24 bg-forest-deep text-ivory">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">
                ACCOMMODATIONS & SANCTUARIES
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-ivory">
                Crafted for Restful Mountain Comfort
              </h2>
              <p className="text-sm text-ivory/70 leading-relaxed">
                From multi-bedroom private villas with heated dip pools to romantic hydrotherapy jacuzzi suites, each space is designed with natural textures and panoramic views.
              </p>
            </div>

            <Link
              href="/stay"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-champagne hover:text-champagne-light font-semibold border-b border-champagne pb-1 shrink-0"
            >
              <span>View All Accommodations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Room Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROOMS.slice(0, 3).map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onInquire={(slug) => handleOpenReserve('room', slug)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* La Kana Chapel & Weddings Feature Section */}
      <section className="py-24 bg-ivory relative overflow-hidden">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Media Stack */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-stone/30 group">
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop"
              alt="La Kana Chapel Wedding Ceremony"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent opacity-60" />

            <div className="absolute bottom-8 left-8 right-8 text-ivory space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-champagne block">
                ICONIC WEDDING VENUE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-ivory">
                La Kana Glass Chapel
              </h3>
              <p className="text-xs text-ivory/80">
                Central Java’s premier glass altar chapel overlooking mountain peaks.
              </p>
            </div>
          </div>

          {/* Right Content Column */}
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-botanical font-semibold block">
              SACRED CELEBRATIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep leading-tight">
              Begin Your Forever Above the Clouds
            </h2>
            <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-normal">
              Exchange your sacred vows surrounded by sweeping views of Mount Ungaran at La Kana Chapel. Whether planning an intimate gathering for 50 guests or a grand fairy-light evening reception on the Sky Garden lawn for 800 guests, our wedding specialists ensure your celebration is flawlessly crafted.
            </p>

            <ul className="space-y-3 text-xs sm:text-sm text-charcoal/90 pt-2">
              <li className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-forest text-champagne flex items-center justify-center shrink-0">
                  <Church className="w-3.5 h-3.5" />
                </div>
                <span>Full Glass Altar Framing Mountain Horizons</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-forest text-champagne flex items-center justify-center shrink-0">
                  <Church className="w-3.5 h-3.5" />
                </div>
                <span>Manicured Sky Lawn for Evening Outdoor Receptions</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-forest text-champagne flex items-center justify-center shrink-0">
                  <Heart className="w-3.5 h-3.5" />
                </div>
                <span>Bridal Villa with Private Hydrotherapy Whirlpool</span>
              </li>
            </ul>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => handleOpenReserve('wedding')}
                className="w-full sm:w-auto bg-champagne hover:bg-champagne-light text-forest-deep px-8 py-3.5 rounded-full font-semibold uppercase tracking-wider text-xs shadow-lg transition-colors flex items-center justify-center"
              >
                <span>Request Wedding Proposal</span>
              </button>

              <Link
                href="/weddings"
                className="w-full sm:w-auto text-xs uppercase tracking-wider text-forest font-semibold hover:text-champagne transition-colors text-center py-3"
              >
                Explore Wedding Packages →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Spa & Wellness Sanctuary Section */}
      <section className="py-24 bg-forest text-ivory">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">
              SUSAN WELLNESS SANCTUARY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-ivory">
              Restorative Botanical Therapies
            </h2>
            <p className="text-sm text-ivory/70 leading-relaxed">
              Combine centuries-old Javanese herbal rituals with warm volcanic stone therapy and thermal hydrotherapy baths designed to melt away muscle fatigue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SPA_TREATMENTS.slice(0, 3).map((treatment) => (
              <TreatmentCard
                key={treatment.id}
                treatment={treatment}
                onBook={(slug) => handleOpenReserve('spa')}
              />
            ))}
          </div>

          <div className="text-center pt-6">
            <Link
              href="/spa"
              className="inline-flex items-center space-x-2 bg-forest-deep hover:bg-forest-muted text-champagne border border-champagne/40 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg"
            >
              <span>Explore Full Spa Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers & Packages */}
      <section className="py-24 bg-ivory">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-botanical font-semibold block">
                CURATED EXPERIENCES
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep">
                Exclusive Packages & Promotions
              </h2>
            </div>
            <Link
              href="/offers"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-forest font-semibold hover:text-champagne border-b border-forest pb-1 shrink-0"
            >
              <span>View All Offers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {OFFERS.slice(0, 2).map((offer) => (
              <div
                key={offer.id}
                className="bg-forest-deep text-ivory rounded-3xl overflow-hidden border border-champagne/30 grid grid-cols-1 sm:grid-cols-2 shadow-xl"
              >
                <div className="relative aspect-square sm:aspect-auto">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-champagne text-forest-deep text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                      {offer.badge}
                    </span>
                  </div>
                </div>
                <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] text-champagne uppercase tracking-wider block">{offer.validity}</span>
                    <h3 className="font-serif text-xl sm:text-2xl text-ivory">{offer.title}</h3>
                    <p className="text-xs text-ivory/70 line-clamp-3">{offer.description}</p>
                  </div>
                  <button
                    onClick={() => handleOpenReserve('room')}
                    className="bg-champagne hover:bg-champagne-light text-forest-deep py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center space-x-1"
                  >
                    <span>Inquire Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Reviews & Stories Section */}
      <section className="py-24 bg-forest-deep text-ivory">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">
              GUEST EXPERIENCES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-ivory">
              Stories from Bandungan
            </h2>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* Nearby Bandungan Destinations Preview */}
      <section className="py-24 bg-ivory">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-botanical font-semibold block">
                DESTINATION DISCOVERY
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep">
                Explore Gedong Songo & Beyond
              </h2>
            </div>
            <Link href="/nearby" className="text-xs uppercase tracking-wider text-forest font-semibold hover:text-champagne border-b border-forest pb-1">
              Explore Regional Map →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {NEARBY_DESTINATIONS.map((dest) => (
              <div key={dest.id} className="group bg-ivory-warm border border-stone/30 rounded-2xl overflow-hidden hover:border-champagne transition-all shadow-md">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={dest.image} alt={dest.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 bg-forest-deep/80 text-champagne text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-champagne/20">
                    {dest.distanceKm} km ({dest.driveTimeMinutes} mins)
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-lg text-forest-deep group-hover:text-champagne transition-colors">{dest.name}</h3>
                  <p className="text-xs text-charcoal/70 line-clamp-2 leading-relaxed">{dest.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Map Callout Banner */}
      <section className="bg-forest-deep text-ivory py-16 border-t border-champagne/20">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">VISIT SUSAN SPA & RESORT</span>
            <h3 className="font-serif text-2xl sm:text-3xl text-ivory">Dusun Piyoto, Bandungan, Central Java</h3>
            <p className="text-xs text-ivory/70">Approximately 45 minutes drive from Semarang City / Ahmad Yani International Airport.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
            <Link
              href="/contact"
              className="bg-champagne hover:bg-champagne-light text-forest-deep px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold text-center transition-colors shadow-lg"
            >
              Get Interactive Directions
            </Link>
            <a
              href="tel:+62298711111"
              className="border border-champagne/40 hover:bg-forest text-ivory px-6 py-3 rounded-full text-xs uppercase tracking-wider font-medium text-center transition-colors"
            >
              Call Resort Concierge
            </a>
          </div>
        </div>
      </section>

      {/* Footer & Floating CTA */}
      <Footer />
      <WhatsAppCTA />

      {/* Reservation Inquiry Modal */}
      <ReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        preselectedRoomSlug={modalRoomSlug}
        preselectedType={modalType}
      />
    </div>
  );
}
