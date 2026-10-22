'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import { fillTemplate, type diningPage, type PageContent } from '@susan/contracts/content';
import { Header } from '@/components/global/Header';
import { PageHero } from '@/components/global/PageHero';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { useSiteConfig } from '@/components/global/SiteConfigProvider';
import type { DiningVenue } from '@/types';

export default function DiningPageClient({ venues, content }: { venues: DiningVenue[]; content: PageContent<typeof diningPage> }) {
  const site = useSiteConfig();
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      <PageHero hero={content.hero} />

      <section id="content" className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {venues.map((venue) => (
          <div key={venue.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-forest-deep text-ivory p-8 sm:p-12 border border-champagne/30 shadow-2xl">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={venue.image} alt={venue.name} fill className="object-cover" />
            </div>

            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-champagne block">{venue.operatingHours}</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ivory">{venue.name}</h2>
              <p className="text-xs text-champagne/90 italic">{venue.subtitle}</p>
              <p className="text-xs text-ivory/80 leading-relaxed">{venue.description}</p>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-wider text-champagne block">{content.menuHeading}</span>
                <ul className="space-y-1 text-xs text-ivory/90">
                  {venue.menuHighlights?.map((dish, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="text-champagne">•</span>
                      <span>{dish}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
                  fillTemplate(content.reserveMessage, { nama: venue.name })
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-champagne hover:bg-champagne-light text-forest-deep px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{content.reserveButtonLabel}</span>
              </a>
            </div>
          </div>
        ))}
      </section>

      <Footer />
      <WhatsAppCTA message={content.whatsappMessage} />
      <ReservationModal isOpen={isReserveModalOpen} onClose={() => setIsReserveModalOpen(false)} />
    </div>
  );
}
