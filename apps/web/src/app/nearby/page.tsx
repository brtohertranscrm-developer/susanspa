'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { NEARBY_DESTINATIONS } from '@/data/nearby';

export default function NearbyPage() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      <section className="relative pt-32 pb-20 bg-forest-deep text-ivory text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop"
            alt="Bandungan Attractions"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/80 to-forest-deep/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">REGIONAL DESTINATIONS</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-normal">Explore Bandungan & Beyond</h1>
          <p className="text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto font-light leading-relaxed">
            Discover ancient 8th-century stone temples, botanical flower gardens, historical vintage trains, and natural sulfur hot springs near Susan Spa & Resort.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {NEARBY_DESTINATIONS.map((dest) => (
            <div key={dest.id} className="bg-forest-deep text-ivory rounded-3xl overflow-hidden border border-champagne/30 shadow-xl flex flex-col justify-between">
              <div className="relative aspect-[16/10]">
                <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-forest-deep/90 text-champagne text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-champagne/30 flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{dest.distanceKm} km ({dest.driveTimeMinutes} mins drive)</span>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <span className="text-[10px] uppercase tracking-widest text-champagne">{dest.category} Heritage</span>
                <h3 className="font-serif text-2xl text-ivory">{dest.name}</h3>
                <p className="text-xs text-ivory/70 leading-relaxed">{dest.description}</p>
                <div className="p-3 bg-forest rounded-xl border border-white/10 text-xs text-champagne font-medium">
                  <strong>Insider Tip:</strong> {dest.tips}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <ReservationModal isOpen={isReserveModalOpen} onClose={() => setIsReserveModalOpen(false)} />
    </div>
  );
}
