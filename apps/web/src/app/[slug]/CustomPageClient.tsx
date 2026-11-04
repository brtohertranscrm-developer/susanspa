'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';
import { ReservationModal } from '@/components/global/ReservationModal';
import { WhatsAppCTA } from '@/components/global/WhatsAppCTA';
import { useSiteConfig } from '@/components/global/SiteConfigProvider';
import { RichText } from '@/components/ui/RichText';
import type { CustomPage, CustomSection } from '@/lib/custom-pages';

const buttonClass =
  'inline-flex items-center justify-center gap-2 min-h-[44px] bg-champagne hover:bg-champagne-light text-forest-deep px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-forest-deep focus-visible:outline-none';

// Alamat luar dibuka di tab baru, alamat di website ini memakai navigasi Next.
function SmartLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function Paragraphs({ text, className }: { text?: string | null; className?: string }) {
  if (!text?.trim()) return null;
  return (
    <div className={className}>
      {text
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph, index) => (
          <p key={index} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
    </div>
  );
}

function Section({ section, onReserve }: { section: CustomSection; onReserve: () => void }) {
  const site = useSiteConfig();

  switch (section.blockType) {
    case 'text':
      return (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 space-y-5">
          {section.heading && <h2 className="font-serif text-3xl sm:text-4xl text-forest-deep">{section.heading}</h2>}
          <RichText content={section.body} className="rich-text" />
        </section>
      );

    case 'imageText': {
      const imageLeft = section.imagePosition === 'left';
      return (
        <section className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className={`space-y-5 ${imageLeft ? 'lg:order-2' : ''}`}>
            {section.eyebrow && (
              <span className="text-xs uppercase tracking-wider text-botanical font-semibold block">{section.eyebrow}</span>
            )}
            <h2 className="font-serif text-3xl sm:text-4xl text-forest-deep">{section.heading}</h2>
            <Paragraphs text={section.body} className="space-y-3 text-sm text-charcoal/80 leading-relaxed" />
            {section.buttonLabel && section.buttonUrl && (
              <SmartLink href={section.buttonUrl} className={buttonClass}>
                {section.buttonLabel}
              </SmartLink>
            )}
          </div>
          {section.image && (
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-3xl border border-stone/30 shadow-xl ${
                imageLeft ? 'order-first lg:order-1' : ''
              }`}
            >
              <Image
                src={section.image.url}
                alt={section.image.alt || section.heading}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          )}
        </section>
      );
    }

    case 'gallery':
      return (
        <section className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {section.heading && (
            <h2 className="font-serif text-3xl sm:text-4xl text-forest-deep text-center">{section.heading}</h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {section.images
              .filter((row) => row.image)
              .map((row) => (
                <figure key={row.id} className="space-y-2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-forest-deep">
                    <Image
                      src={row.image!.url}
                      alt={row.image!.alt || row.caption || ''}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  {row.caption && <figcaption className="text-xs text-charcoal/70">{row.caption}</figcaption>}
                </figure>
              ))}
          </div>
        </section>
      );

    case 'cards':
      return (
        <section className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {(section.heading || section.intro) && (
            <div className="text-center max-w-2xl mx-auto space-y-3">
              {section.heading && <h2 className="font-serif text-3xl sm:text-4xl text-forest-deep">{section.heading}</h2>}
              <Paragraphs text={section.intro} className="space-y-3 text-sm text-charcoal/70 leading-relaxed" />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.cards.map((card) => (
              <article
                key={card.id}
                className="bg-white rounded-2xl border border-stone/20 overflow-hidden shadow-sm flex flex-col"
              >
                {card.image && (
                  <div className="relative aspect-[16/10] bg-forest-deep">
                    <Image
                      src={card.image.url}
                      alt={card.image.alt || card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6 space-y-2 flex-1 flex flex-col">
                  <h3 className="font-serif text-xl text-forest-deep">{card.title}</h3>
                  <Paragraphs text={card.body} className="space-y-2 text-xs text-charcoal/70 leading-relaxed flex-1" />
                  {card.linkLabel && card.linkUrl && (
                    <SmartLink
                      href={card.linkUrl}
                      className="inline-flex items-center min-h-[44px] text-xs uppercase tracking-wider font-semibold text-forest-deep hover:text-terracotta underline underline-offset-4"
                    >
                      {card.linkLabel}
                    </SmartLink>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      );

    case 'cta': {
      const action = section.buttonAction ?? 'reserve';
      return (
        <section className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-forest-deep text-ivory rounded-3xl p-8 sm:p-12 text-center space-y-5 border border-champagne/30 shadow-2xl">
            {section.eyebrow && (
              <span className="text-xs uppercase tracking-[0.25em] text-champagne font-bold block">{section.eyebrow}</span>
            )}
            <h2 className="font-serif text-3xl sm:text-5xl text-ivory max-w-2xl mx-auto">{section.heading}</h2>
            <Paragraphs text={section.body} className="space-y-3 text-sm text-ivory/75 max-w-xl mx-auto" />
            <div className="pt-2">
              {action === 'reserve' && (
                <button type="button" onClick={onReserve} className={buttonClass}>
                  {section.buttonLabel}
                </button>
              )}
              {action === 'whatsapp' && (
                <a
                  href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(section.whatsappMessage || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass}
                >
                  <MessageCircle className="w-4 h-4" />
                  {section.buttonLabel}
                </a>
              )}
              {action === 'link' && section.buttonUrl && (
                <SmartLink href={section.buttonUrl} className={buttonClass}>
                  {section.buttonLabel}
                </SmartLink>
              )}
            </div>
          </div>
        </section>
      );
    }

    default:
      return null;
  }
}

export default function CustomPageClient({ page }: { page: CustomPage }) {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const title = page.heroTitle || page.title;

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header onOpenReserve={() => setIsReserveModalOpen(true)} />

      {page.heroImage ? (
        <section className="relative min-h-[70svh] flex flex-col justify-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0 bg-forest-deep">
            <Image
              src={page.heroImage.url}
              alt={page.heroImage.alt || title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
          </div>
          <div className="relative z-10 w-full px-4 sm:px-6 py-28 text-center space-y-4">
            {page.heroEyebrow && (
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/90 font-medium block">
                {page.heroEyebrow}
              </span>
            )}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white tracking-tight max-w-5xl mx-auto drop-shadow-lg">
              {title}
            </h1>
            {page.heroSubtitle && (
              <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                {page.heroSubtitle}
              </p>
            )}
          </div>
        </section>
      ) : (
        <section className="pt-32 pb-16 bg-forest-deep text-ivory text-center">
          <div className="max-w-4xl mx-auto px-4 space-y-3">
            {page.heroEyebrow && (
              <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block">{page.heroEyebrow}</span>
            )}
            <h1 className="font-serif text-4xl sm:text-6xl text-ivory font-normal">{title}</h1>
            {page.heroSubtitle && <p className="text-sm text-ivory/80 max-w-xl mx-auto">{page.heroSubtitle}</p>}
          </div>
        </section>
      )}

      <main className="py-16 sm:py-20 space-y-16 sm:space-y-20">
        {page.sections.map((section) => (
          <Section key={section.id} section={section} onReserve={() => setIsReserveModalOpen(true)} />
        ))}
      </main>

      <Footer />
      <WhatsAppCTA />
      <ReservationModal isOpen={isReserveModalOpen} onClose={() => setIsReserveModalOpen(false)} />
    </div>
  );
}
