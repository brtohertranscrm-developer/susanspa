'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import type { offersPage, PageContent } from '@susan/contracts/content';
import { Header } from '@/components/global/Header';
import { PageHero } from '@/components/global/PageHero';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import type { Offer } from '@/types';

export default function OffersPageClient({ offers, content }: { offers: Offer[]; content: PageContent<typeof offersPage> }) {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      <PageHero hero={content.hero} />

      <section id="content" className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer) => (
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
                    <span className="text-[10px] uppercase tracking-wider text-champagne font-semibold block">{content.inclusionsHeading}</span>
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
                  <span>{content.reserveButtonLabel}</span>
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
