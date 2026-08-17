'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Compass, Sparkles, Heart, ShieldCheck } from 'lucide-react';
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
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">OUR STORY & HERITAGE</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-normal">Sanctuary Above Bandungan</h1>
          <p className="text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto font-light leading-relaxed">
            Perched at ~1,100 meters above sea level on the southern ridge of Mount Ungaran, Central Java.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl text-forest-deep">Elevated Serenity & Natural Harmony</h2>
        <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-normal">
          Founded as a peaceful mountain sanctuary, Susan Spa & Resort was created to provide a quiet alternative to city life. Combining traditional Javanese hospitality with modern luxury amenities, our resort seamlessly integrates into the surrounding pine forests and organic flower farms.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-left">
          <div className="p-6 bg-ivory-warm rounded-2xl border border-stone/30 space-y-2">
            <Compass className="w-6 h-6 text-champagne" />
            <h3 className="font-serif text-lg text-forest-deep">Highland Climate</h3>
            <p className="text-xs text-charcoal/70">Averaging 18°C to 24°C year-round at 1,100m elevation.</p>
          </div>

          <div className="p-6 bg-ivory-warm rounded-2xl border border-stone/30 space-y-2">
            <span className="font-serif text-xl font-bold text-champagne block">S</span>
            <h3 className="font-serif text-lg text-forest-deep">Authentic Spa Heritage</h3>
            <p className="text-xs text-charcoal/70">Rooted in ancient Javanese royal herbal traditions.</p>
          </div>

          <div className="p-6 bg-ivory-warm rounded-2xl border border-stone/30 space-y-2">
            <Heart className="w-6 h-6 text-champagne" />
            <h3 className="font-serif text-lg text-forest-deep">Iconic Wedding Destination</h3>
            <p className="text-xs text-charcoal/70">Home to Central Java’s glass altar La Kana Chapel.</p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <ReservationModal isOpen={isReserveModalOpen} onClose={() => setIsReserveModalOpen(false)} />
    </div>
  );
}
