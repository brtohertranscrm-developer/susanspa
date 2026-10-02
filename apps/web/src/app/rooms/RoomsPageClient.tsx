'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { RoomCard } from '@/components/ui/RoomCard';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import type { Room } from '@/types';
import { roomCategoryLabel } from '@/lib/room-display';

export default function RoomsPageClient({ rooms }: { rooms: Room[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [selectedRoomSlug, setSelectedRoomSlug] = useState<string | undefined>();

  const categories = [...new Set(rooms.map((room) => room.category))];

  const filteredRooms =
    activeCategory === 'All'
      ? rooms
      : rooms.filter((room) => room.category === activeCategory);

  const handleInquire = (slug: string) => {
    setSelectedRoomSlug(slug);
    setIsReserveModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header rooms={rooms} onOpenReserve={() => setIsReserveModalOpen(true)} />

      {/* Hero Header */}
      <section className="relative pt-36 pb-24 bg-forest-deep text-ivory text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rooms/room-1.jpg"
            alt="Susan Spa Rooms & Suites"
            fill
            priority
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/80 to-forest-deep/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-bold block">
            PILIHAN AKOMODASI RESORT
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-normal">
            Koleksi Kamar & Villa
          </h1>
          <p className="text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto font-light leading-relaxed">
            Kenyamanan beristirahat di tengah ketenangan dan segarnya udara pegunungan Bandungan.
          </p>
        </div>
      </section>

      {/* Main Accommodations Area */}
      <section className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {(['All', ...categories] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-forest-deep text-champagne border border-champagne shadow-lg'
                  : 'bg-ivory-warm text-charcoal/80 hover:text-forest border border-stone/30'
              }`}
            >
              {cat === 'All'
                ? `Semua Kamar (${rooms.length})`
                : cat === 'Family'
                ? 'Kamar Keluarga'
                : roomCategoryLabel(cat)}
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
        rooms={rooms}
        preselectedRoomSlug={selectedRoomSlug}
      />
    </div>
  );
}
