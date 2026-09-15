'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Navigation, ArrowLeft, ArrowRight, Lightbulb, Hotel } from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import type { NearbyDestination } from '@/types';

interface NearbyDetailTemplateProps {
  destination: NearbyDestination;
}

export default function NearbyDetailTemplate({ destination }: NearbyDetailTemplateProps) {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      {/* Breadcrumb Navigation Bar */}
      <div className="pt-28 pb-4 bg-forest-deep text-ivory border-b border-champagne/20">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <Link
            href="/nearby"
            className="inline-flex items-center space-x-2 text-champagne hover:text-champagne-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Nearby Destinations</span>
          </Link>
          <span className="text-ivory/60 hidden sm:inline">
            Explore Bandungan / {destination.name}
          </span>
        </div>
      </div>

      {/* Destination Hero */}
      <section className="relative pt-20 pb-28 bg-forest-deep text-ivory overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            priority
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/80 to-forest-deep/50" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-forest-deep/90 text-champagne text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-champagne/30 font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>{destination.distance} from Susan Spa & Resort</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-normal">
            {destination.name}
          </h1>

          <p className="text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto font-light leading-relaxed">
            {destination.description}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            {destination.mapUrl && (
              <a
                href={destination.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-champagne hover:bg-champagne-light text-forest-deep px-8 py-3.5 rounded-full font-bold uppercase tracking-[0.2em] text-xs shadow-lg transition-transform hover:scale-105 inline-flex items-center space-x-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Direction (Google Maps)</span>
              </a>
            )}

            <button
              onClick={() => setIsReserveModalOpen(true)}
              className="border border-champagne/50 hover:bg-forest text-champagne px-8 py-3.5 rounded-full font-semibold uppercase tracking-wider text-xs transition-colors inline-flex items-center space-x-2"
            >
              <Hotel className="w-4 h-4" />
              <span>Stay at Susan Spa & Resort</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Details Section */}
      <section className="py-16 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content & Visual */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-2xl border border-stone/30">
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-forest-deep">
                Tentang {destination.name}
              </h2>
              <p className="text-sm sm:text-base text-charcoal/85 leading-relaxed font-normal">
                {destination.description}
              </p>
            </div>

            {destination.tips && (
              <div className="bg-ivory-warm p-6 rounded-2xl border border-stone/30 flex items-start space-x-3">
                <Lightbulb className="w-5 h-5 text-champagne shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <strong className="text-forest-deep block font-semibold uppercase tracking-wider">
                    Traveler Tips
                  </strong>
                  <p className="text-charcoal/80 leading-relaxed">{destination.tips}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Card */}
          <div className="space-y-6">
            <div className="bg-forest-deep text-ivory p-8 rounded-3xl border border-champagne/30 space-y-6 shadow-xl sticky top-28">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-champagne block font-semibold">
                  DESTINATION DETAILS
                </span>
                <h3 className="font-serif text-2xl text-ivory">{destination.name}</h3>
              </div>

              <div className="space-y-3 text-xs border-y border-white/10 py-4 text-ivory/80">
                <div>
                  <span className="text-[10px] uppercase text-champagne/80 font-semibold block">
                    Distance from Resort
                  </span>
                  <span className="font-serif text-lg text-ivory font-medium">
                    {destination.distance}
                  </span>
                </div>

                {destination.address && (
                  <div>
                    <span className="text-[10px] uppercase text-champagne/80 font-semibold block">
                      Address
                    </span>
                    <span className="text-xs text-ivory/80 leading-relaxed block">
                      {destination.address}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-2">
                {destination.mapUrl && (
                  <a
                    href={destination.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-champagne hover:bg-champagne-light text-forest-deep py-3.5 rounded-full font-bold uppercase tracking-wider text-xs shadow-lg transition-colors flex items-center justify-center space-x-2 text-center"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Direction</span>
                  </a>
                )}

                <button
                  onClick={() => setIsReserveModalOpen(true)}
                  className="w-full border border-champagne/50 text-champagne hover:bg-forest py-3.5 rounded-full font-semibold uppercase tracking-wider text-xs transition-colors flex items-center justify-center space-x-2 text-center"
                >
                  <Hotel className="w-4 h-4" />
                  <span>Stay at Susan Spa & Resort</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-forest-deep text-ivory rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-champagne/30 shadow-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-bold block">
            HIGHLAND GETAWAY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-ivory max-w-2xl mx-auto">
            Stay at Susan Spa & Resort
          </h2>
          <p className="text-sm text-ivory/75 max-w-xl mx-auto">
            Jadikan Susan Spa & Resort sebagai tempat peristirahatan sempurna setelah seharian menjelajahi keindahan Bandungan.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/rooms"
              className="bg-champagne hover:bg-champagne-light text-forest-deep px-8 py-3.5 rounded-full font-bold uppercase tracking-[0.2em] text-xs shadow-lg transition-transform hover:scale-105 inline-flex items-center space-x-2"
            >
              <span>Explore All Rooms</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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
