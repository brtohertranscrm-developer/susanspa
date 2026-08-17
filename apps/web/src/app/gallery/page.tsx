'use client';

import React, { useState } from 'react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { GalleryGrid } from '@/components/ui/GalleryGrid';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';

export default function GalleryPage() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      <section className="pt-32 pb-16 bg-forest-deep text-ivory text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">VISUAL PORTFOLIO</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-normal">Resort Gallery</h1>
          <p className="text-sm text-ivory/80 max-w-xl mx-auto">Explore high-definition imagery of La Kana Chapel, mountain villas, spa suites, and resort grounds.</p>
        </div>
      </section>

      <section className="py-16 max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
        <GalleryGrid />
      </section>

      <Footer />
      <WhatsAppCTA />
      <ReservationModal isOpen={isReserveModalOpen} onClose={() => setIsReserveModalOpen(false)} />
    </div>
  );
}
