'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { EXPERIENCES } from '@/data/experiences';

export default function ExperiencesPage() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      <section className="relative pt-32 pb-20 bg-forest-deep text-ivory text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop"
            alt="Resort Experiences"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/80 to-forest-deep/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">AKTIVITAS & EKSPLORASI RESORT</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-normal">Pengalaman Berkesan di Dataran Tinggi</h1>
          <p className="text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto font-light leading-relaxed">
            Lengkapi liburan Anda di Bandungan dengan kegiatan menyenangkan: trekking candi bersejarah bersama pemandu lokal, yoga saat fajar di Sky Deck, dan wisata edukasi ke kebun bunga asri.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="bg-forest-deep text-ivory overflow-hidden border border-champagne/30 shadow-xl flex flex-col justify-between">
              <div className="relative aspect-[16/10]">
                <Image src={exp.image} alt={exp.title} fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-forest-deep/90 text-champagne text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-champagne/30">
                  {exp.duration} • {exp.location}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-champagne font-semibold block">{exp.category}</span>
                  <h3 className="font-serif text-xl text-ivory">{exp.title}</h3>
                  <p className="text-xs text-ivory/70 leading-relaxed">{exp.description}</p>
                </div>

                <button
                  onClick={() => setIsReserveModalOpen(true)}
                  className="w-full bg-champagne hover:bg-champagne-light text-forest-deep py-2.5 rounded-xl font-semibold uppercase text-xs tracking-wider transition-colors"
                >
                  Reservasi Aktivitas
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
