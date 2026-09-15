'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { JOURNAL_ARTICLES } from '@/data/journal';

export default function JournalDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  if (!article) {
    return (
      <div className="min-h-screen bg-ivory text-charcoal flex flex-col justify-between">
        <Header />
        <div className="py-32 text-center space-y-4">
          <h1 className="font-serif text-3xl text-forest-deep">Artikel Tidak Ditemukan</h1>
          <Link href="/journal" className="inline-block bg-champagne text-forest-deep px-6 py-2.5 rounded-full text-xs font-semibold uppercase">
            Kembali ke Jurnal
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      <div className="pt-28 pb-4 bg-forest-deep text-ivory border-b border-champagne/20">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between text-xs">
          <Link href="/journal" className="inline-flex items-center space-x-2 text-champagne hover:text-champagne-light">
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Jurnal</span>
          </Link>
          <span className="text-ivory/60">{article.category}</span>
        </div>
      </div>

      <article className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-4 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-botanical font-semibold block">{article.category}</span>
          <h1 className="font-serif text-3xl sm:text-5xl text-forest-deep leading-tight">{article.title}</h1>

          <div className="flex items-center justify-center space-x-4 text-xs text-charcoal/60 pt-2">
            <span>Oleh {article.author.name} ({article.author.role})</span>
            <span>•</span>
            <span>{article.publishedAt}</span>
          </div>
        </div>

        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-2xl border border-stone/30">
          <Image src={article.coverImage} alt={article.title} fill priority className="object-cover" />
        </div>

        {article.quote && (
          <blockquote className="p-8 bg-forest-deep text-ivory rounded-2xl border border-champagne/40 font-serif text-xl italic text-center text-champagne">
            “{article.quote}”
          </blockquote>
        )}

        <div className="space-y-6 text-sm text-charcoal/80 leading-relaxed font-normal pt-4">
          {article.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </article>

      <Footer />
      <WhatsAppCTA />
      <ReservationModal isOpen={isReserveModalOpen} onClose={() => setIsReserveModalOpen(false)} />
    </div>
  );
}
