'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { DINING_VENUES } from '@/data/dining';

export default function DiningPage() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      <section className="relative pt-32 pb-20 bg-forest-deep text-ivory text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop"
            alt="Sky Garden Restaurant"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/80 to-forest-deep/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">PENGALAMAN KULINER PEGUNUNGAN</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-normal">Restoran & Kuliner Pilihan</h1>
          <p className="text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto font-light leading-relaxed">
            Nikmati kelezatan sajian khas Nusantara, cita rasa Jawa autentik, dan hidangan Barat yang diolah dengan bahan-bahan segar dari perkebunan pegunungan Bandungan.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {DINING_VENUES.map((venue) => (
          <div key={venue.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-forest-deep text-ivory rounded-3xl p-8 sm:p-12 border border-champagne/30 shadow-2xl">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image src={venue.image} alt={venue.name} fill className="object-cover" />
            </div>

            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-champagne block">{venue.operatingHours}</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ivory">{venue.name}</h2>
              <p className="text-xs text-champagne/90 italic">{venue.subtitle}</p>
              <p className="text-xs text-ivory/80 leading-relaxed">{venue.description}</p>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-wider text-champagne block">Menu Pilihan</span>
                <ul className="space-y-1 text-xs text-ivory/90">
                  {venue.menuHighlights.map((dish, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="text-champagne">•</span>
                      <span>{dish}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setIsReserveModalOpen(true)}
                className="bg-champagne hover:bg-champagne-light text-forest-deep px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg"
              >
                Reservasi Meja Restoran
              </button>
            </div>
          </div>
        ))}
      </section>

      <Footer />
      <WhatsAppCTA message="Halo Concierge Restoran Susan Spa, saya ingin menanyakan reservasi meja di Sky Garden Restaurant." />
      <ReservationModal isOpen={isReserveModalOpen} onClose={() => setIsReserveModalOpen(false)} />
    </div>
  );
}
