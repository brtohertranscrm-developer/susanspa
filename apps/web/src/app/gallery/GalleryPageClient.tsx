'use client';

import React, { useState } from 'react';
import type { galleryPage, PageContent } from '@susan/contracts/content';
import { Header } from '@/components/global/Header';
import { PageHero } from '@/components/global/PageHero';
import { Footer } from '@/components/global/Footer';
import { GalleryGrid } from '@/components/ui/GalleryGrid';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import type { GalleryItem } from '@/data/gallery';

export default function GalleryPageClient({ items, content }: { items: GalleryItem[]; content: PageContent<typeof galleryPage> }) {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      {/* Hero Header */}
      <PageHero hero={content.hero} />

      {/* Masonry Filtered Gallery Grid */}
      <section id="content" className="py-16 max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
        <GalleryGrid items={items} />
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
