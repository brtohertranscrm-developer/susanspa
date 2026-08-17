'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { FACILITIES } from '@/data/facilities';

export default function FacilitiesPage() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      <section className="relative pt-32 pb-20 bg-forest-deep text-ivory text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2000&auto=format&fit=crop"
            alt="Resort Facilities"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/80 to-forest-deep/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">RESORT AMENITIES</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-normal">Highland Leisure & Fitness</h1>
          <p className="text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto font-light leading-relaxed">
            From our heated mountain infinity pool to the Sky Garden observation deck and Eden playground, experience holistic leisure at ~1,100 meters elevation.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FACILITIES.map((facility) => (
            <div key={facility.id} className="bg-forest-deep text-ivory rounded-3xl overflow-hidden border border-champagne/30 shadow-xl flex flex-col justify-between">
              <div className="relative aspect-[16/10]">
                <Image src={facility.image} alt={facility.title} fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-forest-deep/90 text-champagne text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-champagne/30">
                  {facility.category} • {facility.operatingHours}
                </div>
              </div>
              <div className="p-8 space-y-4">
                <h3 className="font-serif text-2xl text-ivory">{facility.title}</h3>
                <p className="text-xs text-ivory/70 leading-relaxed">{facility.description}</p>
                <div className="pt-2 space-y-1">
                  {facility.highlights.map((h, idx) => (
                    <div key={idx} className="text-xs text-champagne flex items-center space-x-2">
                      <span>•</span>
                      <span>{h}</span>
                    </div>
                  ))}
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
