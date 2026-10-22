'use client';

import React, { useState } from 'react';
import { fillTemplate, type roomsPage, type PageContent } from '@susan/contracts/content';
import { Header } from '@/components/global/Header';
import { PageHero } from '@/components/global/PageHero';
import { Footer } from '@/components/global/Footer';
import { RoomCard } from '@/components/ui/RoomCard';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import type { Room } from '@/types';
import { roomCategoryLabel } from '@/lib/room-display';

export default function RoomsPageClient({ rooms, content }: { rooms: Room[]; content: PageContent<typeof roomsPage> }) {
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
      <PageHero hero={content.hero} />

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
                ? fillTemplate(content.allFilterLabel, { jumlah: rooms.length })
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
