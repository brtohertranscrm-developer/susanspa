'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { RoomCard } from '@/components/ui/RoomCard';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { ROOMS } from '@/data/rooms';

export default function StayPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [selectedRoomSlug, setSelectedRoomSlug] = useState<string | undefined>();

  const categories = ['All', 'Villa', 'Suite', 'Deluxe', 'Family'];

  const filteredRooms = activeCategory === 'All'
    ? ROOMS
    : ROOMS.filter((room) => room.category === activeCategory);

  const handleInquire = (slug: string) => {
    setSelectedRoomSlug(slug);
    setIsReserveModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 bg-forest-deep text-ivory text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2000&auto=format&fit=crop"
            alt="Susan Spa Accommodations"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/80 to-forest-deep/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">
            ACCOMMODATIONS & VILLAS
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-normal">
            Restful Sanctuaries Above the Clouds
          </h1>
          <p className="text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto font-light leading-relaxed">
            Discover multi-bedroom private mountain villas, romantic hydrotherapy jacuzzi suites, and comfortable family rooms overlooking Bandungan’s highland scenery.
          </p>
        </div>
      </section>

      {/* Main Accommodations Area */}
      <section className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-forest-deep text-champagne border border-champagne shadow-lg'
                  : 'bg-ivory-warm text-charcoal/80 hover:text-forest border border-stone/30'
              }`}
            >
              {cat === 'All' ? 'All Accommodations' : `${cat}s`}
            </button>
          ))}
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} onInquire={handleInquire} />
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <ReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        preselectedRoomSlug={selectedRoomSlug}
      />
    </div>
  );
}
