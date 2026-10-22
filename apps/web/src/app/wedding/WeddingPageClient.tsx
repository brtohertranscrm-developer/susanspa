'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Users,
  MapPin,
  CheckCircle2,
  Church,
} from 'lucide-react';
import type { weddingPage, PageContent } from '@susan/contracts/content';
import { Header } from '@/components/global/Header';
import { PageHero } from '@/components/global/PageHero';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import type { WeddingPackage } from '@/types';

const VENUE_ICONS = { church: Church, users: Users, map: MapPin };

export default function WeddingPageClient({ packages, content }: { packages: WeddingPackage[]; content: PageContent<typeof weddingPage> }) {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>();

  const handleInquire = (slug?: string) => {
    setSelectedSlug(slug);
    setIsReserveModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => handleInquire()} />

      {/* Hero Visual: La Kana Chapel + Mountain Background */}
      <PageHero hero={content.hero} target="#packages" />

      {/* Wedding Packages Section */}
      <section id="packages" className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-botanical font-bold block">
            {content.packages.eyebrow}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-forest-deep">
            {content.packages.title}
          </h2>
          <p className="text-sm text-charcoal/70 leading-relaxed">
            {content.packages.intro}
          </p>
        </div>

        {/* 3 Packages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-forest-deep text-ivory overflow-hidden border border-champagne/30 shadow-xl flex flex-col justify-between group hover:border-champagne/70 transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={pkg.image || ''}
                  alt={pkg.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-forest-deep/90 text-champagne text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-champagne/30 font-semibold">
                  {pkg.capacity || pkg.guestCapacity}
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-champagne block font-semibold">
                    {Array.isArray(pkg.venue) ? pkg.venue.join(' • ') : pkg.venue}
                  </span>
                  <h3 className="font-serif text-2xl text-ivory group-hover:text-champagne transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-ivory/75 line-clamp-3 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                {/* Inclusions Highlights */}
                <div className="space-y-2 border-t border-white/10 pt-4 text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-champagne/90 font-semibold block">
                    {content.inclusionsHeading}
                  </span>
                  <ul className="space-y-1.5 text-ivory/80">
                    {pkg.inclusions.slice(0, 4).map((inc, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-champagne shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTAs */}
                <div className="pt-2 flex items-center space-x-2">
                  <Link
                    href={`/wedding/${pkg.slug}`}
                    className="flex-1 border border-champagne/40 hover:bg-forest text-ivory text-xs uppercase tracking-wider font-semibold py-2.5 rounded-xl text-center transition-colors"
                  >
                    {content.detailButtonLabel}
                  </Link>
                  <button
                    onClick={() => handleInquire(pkg.slug)}
                    className="bg-champagne hover:bg-champagne-light text-forest-deep text-xs uppercase tracking-wider font-bold py-2.5 px-4 rounded-xl transition-colors shadow-sm"
                  >
                    {content.consultButtonLabel}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Venues & Atmosphere Highlight */}
      <section className="py-20 bg-ivory-warm border-t border-stone/20">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center">
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-botanical font-bold block">
              {content.venues.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-forest-deep">
              {content.venues.title}
            </h2>
            {content.venues.intro && <p className="text-sm text-charcoal/70 leading-relaxed">{content.venues.intro}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.venueList.map((venue, index) => {
              const Icon = VENUE_ICONS[venue.icon];
              return (
                <div key={index} className="bg-white rounded-2xl border border-stone/20 overflow-hidden shadow-sm text-left flex flex-col">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-forest-deep">
                    <Image src={venue.image} alt={venue.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  </div>
                  <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-champagne">
                        <Icon className="w-5 h-5 text-champagne" />
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-botanical">{venue.label}</span>
                      </div>
                      <h3 className="font-serif text-xl text-forest-deep">{venue.title}</h3>
                      <p className="text-xs text-charcoal/70 leading-relaxed">{venue.body}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <ReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        preselectedType="wedding"
        preselectedRoomSlug={selectedSlug}
      />
    </div>
  );
}
