'use client';

import React, { useState } from 'react';
import Image from 'next/image';
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

      {/* Hero Header */}
      <section className="relative pt-36 pb-24 bg-forest-deep text-ivory text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop"
            alt="Susan Spa Gallery"
            fill
            priority
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/80 to-forest-deep/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-bold block">
            VISUAL SANCTUARY
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-normal">
            Resort Gallery
          </h1>
          <p className="text-sm sm:text-base text-ivory/80 max-w-xl mx-auto font-light leading-relaxed">
            Keindahan visual Susan Spa & Resort: kapel kaca La Kana, suite & villa mewah, ketenangan spa di atas awan, dan lanskap pegunungan Bandungan.
          </p>
        </div>
      </section>

      {/* Masonry Filtered Gallery Grid */}
      <section className="py-16 max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
        <GalleryGrid />
      </section>

      <Footer />
      <WhatsAppCTA />
      <ReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
      />
    </div>
  );
}
