'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { OFFERS } from '@/data/offers';

export default function OffersPage() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      <section className="relative pt-32 pb-20 bg-forest-deep text-ivory text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=2000&auto=format&fit=crop"
            alt="Special Packages"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/80 to-forest-deep/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">PENAWARAN SPESIAL</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-normal">Paket Menginap Pilihan</h1>
          <p className="text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto font-light leading-relaxed">
            Nikmati liburan pegunungan yang lebih berkesan dengan penawaran paket bulan madu romantis, perawatan spa relaksasi, dan paket menginap keluarga.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {OFFERS.map((offer) => (
            <div key={offer.id} className="bg-forest-deep text-ivory overflow-hidden border border-champagne/30 shadow-2xl flex flex-col justify-between">
              <div className="relative aspect-[16/9]">
                <Image src={offer.image} alt={offer.title} fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-champagne text-forest-deep text-[10px] uppercase font-semibold tracking-wider px-3 py-1 rounded-full">
                  {offer.badge}
                </div>
              </div>

              <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[10px] text-champagne uppercase tracking-wider block">{offer.validity}</span>
                  <h3 className="font-serif text-2xl text-ivory">{offer.title}</h3>
                  <p className="text-xs text-ivory/70 leading-relaxed">{offer.description}</p>

                  <div className="pt-3 border-t border-white/10 space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-champagne font-semibold block">Inklusi Paket</span>
                    {offer.inclusions.map((inc, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-ivory/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-champagne shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setIsReserveModalOpen(true)}
                  className="w-full bg-champagne hover:bg-champagne-light text-forest-deep py-3 rounded-full text-xs uppercase tracking-wider font-semibold shadow-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Tanya Ketersediaan Paket</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
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
