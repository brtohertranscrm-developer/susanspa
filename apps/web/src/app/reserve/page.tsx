'use client';

import React, { useState } from 'react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';

export default function ReservePage() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(true);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      <section className="pt-32 pb-24 max-w-4xl mx-auto px-4 text-center space-y-6">
        <span className="text-xs uppercase tracking-[0.25em] text-botanical font-semibold block">RESERVATION & INQUIRY</span>
        <h1 className="font-serif text-4xl sm:text-5xl text-forest-deep">Book Your Mountain Escape</h1>
        <p className="text-sm text-charcoal/80 max-w-lg mx-auto">
          Request your stay dates, spa treatments, or wedding chapel proposals directly with our concierge team.
        </p>

        <button
          onClick={() => setIsReserveModalOpen(true)}
          className="bg-champagne hover:bg-champagne-light text-forest-deep font-semibold uppercase tracking-wider text-xs px-8 py-4 rounded-full shadow-xl transition-all"
        >
          Open Reservation Console
        </button>
      </section>

      <Footer />
      <WhatsAppCTA />
      <ReservationModal isOpen={isReserveModalOpen} onClose={() => setIsReserveModalOpen(false)} />
    </div>
  );
}
