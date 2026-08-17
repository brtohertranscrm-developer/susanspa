'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { JOURNAL_ARTICLES } from '@/data/journal';

export default function JournalPage() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      <section className="pt-32 pb-16 bg-forest-deep text-ivory text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">EDITORIAL & STORIES</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-normal">The Susan Journal</h1>
          <p className="text-sm text-ivory/80 max-w-xl mx-auto">Wellness guides, wedding inspirations, and Bandungan mountain travel stories.</p>
        </div>
      </section>

      <section className="py-16 max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.map((article) => (
            <div key={article.id} className="bg-forest-deep text-ivory rounded-3xl overflow-hidden border border-champagne/30 shadow-xl flex flex-col justify-between">
              <div className="relative aspect-[16/10]">
                <Image src={article.coverImage} alt={article.title} fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-forest-deep/90 text-champagne text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-champagne/30">
                  {article.category}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-[10px] text-champagne">
                    <span>{article.publishedAt}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl text-ivory leading-snug">{article.title}</h3>
                  <p className="text-xs text-ivory/70 line-clamp-3 leading-relaxed">{article.excerpt}</p>
                </div>

                <Link
                  href={`/journal/${article.slug}`}
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-champagne hover:text-champagne-light font-semibold pt-2 border-t border-white/10"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
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
