'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
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
      <section className="relative h-screen min-h-screen flex flex-col justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 bg-forest-deep">
          <Image
            src="https://ik.imagekit.io/ro8484nadw/SUSAN%20SPA/MNP_3585%20copy.jpeg?updatedAt=1790906706347"
            alt="Susan Spa Rooms & Suites"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 text-center flex flex-col items-center justify-center">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal text-white text-center tracking-tight max-w-5xl mx-auto drop-shadow-lg">
            Koleksi Kamar & Villa
          </h1>
          
          <p className="mt-4 sm:mt-6 text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-white/90 max-w-2xl mx-auto font-medium text-center drop-shadow-md">
            PILIHAN AKOMODASI RESORT
          </p>
        </div>

        <a 
          href="#content"
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center space-y-1.5 group cursor-pointer"
        >
          <span className="text-white text-lg sm:text-xl font-serif drop-shadow-md">Jelajahi Kamar</span>
          <span className="text-white/70 text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-sans group-hover:text-white transition-colors">Explore Below</span>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white group-hover:translate-y-1 transition-all duration-300" />
        </a>
      </section>

      {/* Main Accommodations Area */}
      <section id="content" className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
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
