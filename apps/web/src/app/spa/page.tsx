'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { TreatmentCard } from '@/components/ui/TreatmentCard';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { SPA_TREATMENTS } from '@/data/spa';

export default function SpaPage() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      {/* Spa Hero */}
      <section className="relative pt-32 pb-20 bg-forest-deep text-ivory text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2000&auto=format&fit=crop"
            alt="Susan Spa Wellness Sanctuary"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/80 to-forest-deep/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">
            KESEGARAN & KETENANGAN ALAMI
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-normal">
            Ritual Spa Tradisional & Relaksasi Tubuh
          </h1>
          <p className="text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto font-light leading-relaxed">
            Lepaskan penat dan segarkan kembali raga serta pikiran Anda di tengah sejuknya udara pegunungan Bandungan. Nikmati sentuhan lulur rempah Jawa, terapi batu basal hangat Gunung Ungaran, dan kenyamanan berendam air hangat.
          </p>
        </div>
      </section>

      {/* Treatment Menu */}
      <section className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-botanical font-semibold block">PILIHAN PERAWATAN SPA</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-forest-deep">Pengalaman Relaksasi Menyeluruh</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPA_TREATMENTS.map((treatment) => (
            <TreatmentCard
              key={treatment.id}
              treatment={treatment}
              onBook={() => setIsReserveModalOpen(true)}
            />
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <ReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        preselectedType="spa"
      />
    </div>
  );
}
