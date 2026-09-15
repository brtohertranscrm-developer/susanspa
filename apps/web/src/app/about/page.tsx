'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Compass, Heart } from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';

export default function AboutPage() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      <section className="relative pt-32 pb-20 bg-forest-deep text-ivory text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop"
            alt="About Susan Spa"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/80 to-forest-deep/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">KISAH & FILOSOFI KAMI</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-normal">Peristirahatan Sejuk di Atas Bandungan</h1>
          <p className="text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto font-light leading-relaxed">
            Berdiri di ketinggian ±1.100 mdpl pada lereng selatan Gunung Ungaran, Jawa Tengah.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl text-forest-deep">Kesejukan Alami & Keramahan Penuh Ketulusan</h2>
        <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-normal">
          Dihadirkan sebagai tempat rehat yang menenangkan dari padatnya ritme perkotaan, Susan Spa & Resort memadukan keramahtamahan tradisi Jawa dengan fasilitas kenyamanan modern. Dikelilingi udara pegunungan yang bersih, rimbunnya pepohonan lereng bukit, dan panorama lembah yang membentang luas.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-left">
          <div className="p-6 bg-ivory-warm rounded-2xl border border-stone/30 space-y-2">
            <Compass className="w-6 h-6 text-champagne" />
            <h3 className="font-serif text-lg text-forest-deep">Hawa Sejuk Pegunungan</h3>
            <p className="text-xs text-charcoal/70">Suhu udara rata-rata 18°C hingga 24°C di ketinggian ±1.100 mdpl sepanjang tahun.</p>
          </div>

          <div className="p-6 bg-ivory-warm rounded-2xl border border-stone/30 space-y-2">
            <span className="font-serif text-xl font-bold text-champagne block">S</span>
            <h3 className="font-serif text-lg text-forest-deep">Tradisi Spa Autentik</h3>
            <p className="text-xs text-charcoal/70">Terinspirasi dari ritual perawatan lulur rempah warisan budaya keraton Jawa.</p>
          </div>

          <div className="p-6 bg-ivory-warm rounded-2xl border border-stone/30 space-y-2">
            <Heart className="w-6 h-6 text-champagne" />
            <h3 className="font-serif text-lg text-forest-deep">Destinasi Pernikahan Ikonik</h3>
            <p className="text-xs text-charcoal/70">Menghadirkan kapel kaca La Kana dengan latar panorama perbukitan yang megah.</p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <ReservationModal isOpen={isReserveModalOpen} onClose={() => setIsReserveModalOpen(false)} />
    </div>
  );
}
