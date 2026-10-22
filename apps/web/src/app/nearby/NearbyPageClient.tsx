'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Navigation, ArrowRight } from 'lucide-react';
import { fillTemplate, type nearbyPage, type PageContent } from '@susan/contracts/content';
import { useUiText } from '@/components/global/SiteContentProvider';
import { Header } from '@/components/global/Header';
import { PageHero } from '@/components/global/PageHero';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import type { NearbyDestination } from '@/types';

export default function NearbyPageClient({ destinations, content }: { destinations: NearbyDestination[]; content: PageContent<typeof nearbyPage> }) {
  const ui = useUiText();
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      {/* Hero Header */}
      <PageHero hero={content.hero} />

      {/* Destinations Grid (4 destinations) */}
      <section id="content" className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-forest-deep text-ivory overflow-hidden border border-champagne/30 shadow-xl flex flex-col justify-between group hover:border-champagne/70 transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-forest-deep/90 text-champagne text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-champagne/30 flex items-center space-x-1.5 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{fillTemplate(ui.nearby.distanceCard, { jarak: dest.distance })}</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-champagne block font-semibold">
                    {dest.category}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-ivory group-hover:text-champagne transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-ivory/75 leading-relaxed">
                    {dest.description}
                  </p>
                </div>

                {/* CTAs: Explore & Get Direction */}
                <div className="pt-2 flex items-center space-x-3">
                  <Link
                    href={`/nearby/${dest.slug}`}
                    className="flex-1 bg-champagne hover:bg-champagne-light text-forest-deep py-3 px-5 rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-colors shadow-sm flex items-center justify-center space-x-1.5"
                  >
                    <span>{ui.nearby.detailButton}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {dest.mapUrl && (
                    <a
                      href={dest.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-champagne/40 hover:bg-forest text-ivory py-3 px-5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center space-x-1.5"
                    >
                      <Navigation className="w-3.5 h-3.5 text-champagne" />
                      <span>{ui.nearby.directionsButton}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
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
