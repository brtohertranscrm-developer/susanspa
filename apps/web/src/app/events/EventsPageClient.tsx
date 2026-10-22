'use client';

import React, { useState } from 'react';
import type { eventsPage, PageContent } from '@susan/contracts/content';
import { Header } from '@/components/global/Header';
import { PageHero } from '@/components/global/PageHero';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';

export default function EventsPageClient({ content }: { content: PageContent<typeof eventsPage> }) {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      <PageHero hero={content.hero} />

      <section id="content" className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.cards.map((card, index) => (
            <div key={index} className="bg-forest-deep text-ivory p-8 rounded-3xl border border-champagne/30 space-y-4 shadow-xl">
              <span className="text-xs uppercase tracking-wider text-champagne font-semibold block">{card.eyebrow}</span>
              <h2 className="font-serif text-3xl text-ivory">{card.title}</h2>
              <p className="text-xs text-ivory/70 leading-relaxed">{card.body}</p>
              <button
                onClick={() => setIsReserveModalOpen(true)}
                className="bg-champagne hover:bg-champagne-light text-forest-deep px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                {card.buttonLabel}
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppCTA message={content.whatsappMessage} />
      <ReservationModal isOpen={isReserveModalOpen} onClose={() => setIsReserveModalOpen(false)} preselectedType="event" />
    </div>
  );
}
