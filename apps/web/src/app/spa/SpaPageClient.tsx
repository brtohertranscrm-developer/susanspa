'use client';

import React, { useState } from 'react';
import type { spaPage, PageContent } from '@susan/contracts/content';
import { Header } from '@/components/global/Header';
import { PageHero } from '@/components/global/PageHero';
import { Footer } from '@/components/global/Footer';
import { TreatmentCard } from '@/components/ui/TreatmentCard';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import type { SpaTreatment } from '@/types';

export default function SpaPageClient({ treatments, content }: { treatments: SpaTreatment[]; content: PageContent<typeof spaPage> }) {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      {/* Spa Hero */}
      <PageHero hero={content.hero} />

      {/* Treatment Menu */}
      <section id="content" className="py-20 max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-botanical font-semibold block">{content.menu.eyebrow}</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-forest-deep">{content.menu.title}</h2>
          {content.menu.intro && <p className="text-sm text-charcoal/70 leading-relaxed">{content.menu.intro}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments.map((treatment) => (
            <TreatmentCard
              key={treatment.id}
              treatment={treatment}
              onBook={() => setIsReserveModalOpen(true)}
            />
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <ReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        preselectedType="spa"
      />
    </div>
  );
}
