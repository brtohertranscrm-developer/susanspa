'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Users,
  Maximize2,
  BedDouble,
  CheckCircle2,
  Calendar,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { formatCurrencyIdr } from '@/lib/utils';
import { roomCapacity, roomCategoryLabel } from '@/lib/room-display';
import type { Room } from '@/types';

export default function RoomDetailClient({ room, rooms }: { room: Room; rooms: Room[] }) {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header rooms={rooms} onOpenReserve={() => setIsReserveModalOpen(true)} />

      {/* Breadcrumb Navigation Bar */}
      <div className="pt-28 pb-4 bg-forest-deep text-ivory border-b border-champagne/20">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <Link href="/stay" className="inline-flex items-center space-x-2 text-champagne hover:text-champagne-light">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Accommodations</span>
          </Link>
          <span className="text-ivory/60 hidden sm:inline">
            Stay / {roomCategoryLabel(room.category)} / {room.name}
          </span>
        </div>
      </div>

      {/* Main Room Layout Grid */}
      <section className="py-12 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title & Price Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone/30">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-botanical font-semibold block">
              {roomCategoryLabel(room.category)}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-forest-deep leading-tight">
              {room.name}
            </h1>
            <p className="text-sm text-charcoal/80 font-normal">{room.tagline}</p>
          </div>

          <div className="text-left md:text-right shrink-0 bg-forest-deep text-ivory p-6 rounded-2xl border border-champagne/30 space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-ivory/70 block">Rates & Availability</span>
            <div className="font-serif text-3xl text-champagne font-bold">
              {room.startingPriceIdr != null && room.startingPriceIdr > 0 ? formatCurrencyIdr(room.startingPriceIdr) : 'Contact for rates'}
            </div>
            <button
              onClick={() => setIsReserveModalOpen(true)}
              className="w-full bg-champagne hover:bg-champagne-light text-forest-deep font-semibold uppercase tracking-wider text-xs py-2.5 rounded-xl shadow-lg transition-colors flex items-center justify-center"
            >
              <span>Inquire Stay Dates</span>
            </button>
          </div>
        </div>

        {/* Gallery Showcase */}
        <div className="space-y-4">
          <div className="relative aspect-[16/9] w-full overflow-hidden shadow-2xl border border-stone/30">
            <Image
              src={room.images[selectedImageIndex]}
              alt={room.name}
              fill
              preload
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {room.images.map((img, idx) => (
              <button
                key={idx}
                aria-label={`View ${room.name} photo ${idx + 1}`}
                aria-pressed={selectedImageIndex === idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative aspect-[4/3] overflow-hidden border-2 transition-all ${
                  selectedImageIndex === idx ? 'border-champagne scale-95 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={img} alt={`${room.name} photo ${idx + 1}`} fill sizes="(max-width: 1280px) 25vw, 320px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Room Specifications & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-6">
          {/* Left 2 Cols: Description & Amenities */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h2 className="font-serif text-2xl text-forest-deep">Room Overview</h2>
              <p className="text-sm text-charcoal/80 leading-relaxed font-normal">
                {room.longDescription}
              </p>
            </div>

            {/* Specs Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-ivory-warm p-6 rounded-2xl border border-stone/30 text-center">
              <div>
                <Maximize2 className="w-5 h-5 text-champagne mx-auto mb-1" />
                <span className="text-[10px] uppercase text-charcoal/60 block">Room Size</span>
                <span className="font-serif text-lg text-forest-deep font-semibold">{room.sizeSqm ? `${room.sizeSqm} sqm` : 'Please confirm'}</span>
              </div>
              <div>
                <Users className="w-5 h-5 text-champagne mx-auto mb-1" />
                <span className="text-[10px] uppercase text-charcoal/60 block">Capacity</span>
                <span className="font-serif text-lg text-forest-deep font-semibold">{roomCapacity(room)}</span>
              </div>
              <div>
                <BedDouble className="w-5 h-5 text-champagne mx-auto mb-1" />
                <span className="text-[10px] uppercase text-charcoal/60 block">Bed Layout</span>
                <span className="font-serif text-lg text-forest-deep font-semibold block">{room.bedType || 'Please confirm'}</span>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-4 pt-4">
              <h3 className="font-serif text-2xl text-forest-deep">Room Amenities</h3>
              {room.amenities.length === 0 && <p className="text-sm text-charcoal/80">Please contact our reservation team for the available room amenities.</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 rounded-xl bg-white border border-stone/20 text-xs text-charcoal/90">
                    <CheckCircle2 className="w-4 h-4 text-champagne shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Policies & Reservation Card */}
          <div className="space-y-6">
            <div className="bg-forest-deep text-ivory p-8 rounded-3xl border border-champagne/30 space-y-6 shadow-xl">
              <h3 className="font-serif text-2xl text-champagne">Resort Policies</h3>

              <div className="space-y-3 text-xs text-ivory/80">
                {room.policies.length === 0 && <p>Please confirm check-in times, child and extra-bed arrangements, and cancellation terms with our reservation team.</p>}
                {room.policies.map((pol, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <ShieldCheck className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                    <span>{pol}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <button
                  onClick={() => setIsReserveModalOpen(true)}
                  className="w-full bg-champagne hover:bg-champagne-light text-forest-deep py-3.5 rounded-full font-semibold uppercase tracking-wider text-xs shadow-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve This Category</span>
                </button>

                <a
                  href={`https://wa.me/6281228111111?text=${encodeURIComponent(
                    `Hello Susan Spa Resort, I would like to inquire about availability for ${room.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-champagne/40 text-ivory hover:bg-forest py-3 rounded-full font-medium uppercase tracking-wider text-xs transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Ask WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <ReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        rooms={rooms}
        preselectedRoomSlug={room.slug}
      />
    </div>
  );
}
