'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { ballroomPage, PageContent } from '@susan/contracts/content';
import { Header } from '@/components/global/Header';
import { PageHero } from '@/components/global/PageHero';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';

export default function BallroomPageClient({ content }: { content: PageContent<typeof ballroomPage> }) {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      <PageHero hero={content.hero} compactOnMobile />

      <section id="content" className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {content.spaces.map((space, index) => {
          // Ruangan ganjil menaruh foto di kiri agar susunan bergantian seperti sebelumnya.
          const imageFirst = index % 2 === 1;
          return (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
              <div className={`space-y-5 ${imageFirst ? 'lg:order-2' : ''}`}>
                <span className="text-xs uppercase tracking-wider text-botanical font-semibold block">{space.eyebrow}</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-forest-deep">{space.title}</h2>
                <p className="text-sm text-charcoal/80 leading-relaxed">{space.body}</p>
                {space.features.length > 0 && (
                  <ul className="space-y-2 text-sm text-charcoal/80">
                    {space.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <span aria-hidden="true" className="mt-2.5 h-px w-4 bg-champagne shrink-0" />
                        {feature.label}
                      </li>
                    ))}
                  </ul>
                )}
                <button
                  type="button"
                  onClick={() => setIsReserveModalOpen(true)}
                  className="min-h-[44px] bg-champagne hover:bg-champagne-light text-forest-deep px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-forest-deep focus-visible:outline-none"
                >
                  {space.buttonLabel}
                </button>
              </div>

              <div className={`relative aspect-[4/3] overflow-hidden rounded-3xl border border-stone/30 shadow-xl ${imageFirst ? 'order-first lg:order-1' : ''}`}>
                <Image
                  src={space.image}
                  alt={space.imageAlt || space.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </section>

      <Footer />
      <WhatsAppCTA message={content.whatsappMessage} />
      <ReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        preselectedType="event"
      />
    </div>
  );
}
