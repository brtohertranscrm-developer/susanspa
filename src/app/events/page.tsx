'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';

export default function EventsPage() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      <section className="relative pt-32 pb-20 bg-forest-deep text-ivory text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop"
            alt="Meetings and Events"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/80 to-forest-deep/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">CORPORATE & GATHERINGS</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-normal">Meetings & Private Events</h1>
          <p className="text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto font-light leading-relaxed">
            Inspire your executive team with high-altitude corporate retreats, strategy workshops, and memorable family anniversaries in Bandungan.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-forest-deep text-ivory p-8 rounded-3xl border border-champagne/30 space-y-4 shadow-xl">
            <span className="text-xs uppercase tracking-wider text-champagne font-semibold block">BALLROOM & FUNCTION HALLS</span>
            <h2 className="font-serif text-3xl text-ivory">Grand Mountain Ballroom</h2>
            <p className="text-xs text-ivory/70 leading-relaxed">
              Equipped with modern audio-visual systems, high-speed Wi-Fi, and climate control. Accommodates up to 350 delegates in theatre setup.
            </p>
            <button
              onClick={() => setIsReserveModalOpen(true)}
              className="bg-champagne text-forest-deep px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider"
            >
              Request Event Proposal
            </button>
          </div>

          <div className="bg-forest-deep text-ivory p-8 rounded-3xl border border-champagne/30 space-y-4 shadow-xl">
            <span className="text-xs uppercase tracking-wider text-champagne font-semibold block">OUTDOOR TEAM BUILDING</span>
            <h2 className="font-serif text-3xl text-ivory">Sky Lawn Outward Bound</h2>
            <p className="text-xs text-ivory/70 leading-relaxed">
              Expansive manicured lawn ideal for team-building games, morning stretch sessions, and outdoor BBQ networking nights under starry mountain skies.
            </p>
            <button
              onClick={() => setIsReserveModalOpen(true)}
              className="bg-champagne text-forest-deep px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider"
            >
              Request Proposal
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA message="Hello Susan Spa Events Team, I would like to inquire about hosting a meeting/event." />
      <ReservationModal isOpen={isReserveModalOpen} onClose={() => setIsReserveModalOpen(false)} preselectedType="event" />
    </div>
  );
}
