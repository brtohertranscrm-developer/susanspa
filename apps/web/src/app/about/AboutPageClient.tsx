'use client';

import React, { useState } from 'react';
import { Compass, Heart, Leaf, Mountain } from 'lucide-react';
import type { aboutPage, PageContent } from '@susan/contracts/content';
import { Header } from '@/components/global/Header';
import { PageHero } from '@/components/global/PageHero';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { useSiteConfig } from '@/components/global/SiteConfigProvider';

// Ikon "letter" menampilkan huruf pertama nama resor.
const PILLAR_ICONS = { compass: Compass, heart: Heart, leaf: Leaf, mountain: Mountain, letter: null };

export default function AboutPageClient({ content }: { content: PageContent<typeof aboutPage> }) {
  const site = useSiteConfig();
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      <PageHero hero={content.hero} />

      <section id="content" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl text-forest-deep">{content.storyTitle}</h2>
        <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-normal whitespace-pre-line">
          {content.storyBody}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-left">
          {content.pillars.map((pillar, index) => {
            const Icon = PILLAR_ICONS[pillar.icon];
            return (
              <div key={index} className="p-6 bg-ivory-warm rounded-2xl border border-stone/30 space-y-2">
                {Icon ? (
                  <Icon className="w-6 h-6 text-champagne" />
                ) : (
                  <span className="font-serif text-xl font-bold text-champagne block">{site.name.charAt(0)}</span>
                )}
                <h3 className="font-serif text-lg text-forest-deep">{pillar.title}</h3>
                <p className="text-xs text-charcoal/70">{pillar.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <ReservationModal isOpen={isReserveModalOpen} onClose={() => setIsReserveModalOpen(false)} />
    </div>
  );
}
