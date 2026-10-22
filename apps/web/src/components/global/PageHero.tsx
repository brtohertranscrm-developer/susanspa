'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useUiText } from '@/components/global/SiteContentProvider';

interface PageHeroProps {
  hero: { image: string; imageAlt: string; title: string; subtitle: string; scrollLabel: string };
  target?: string;
  priority?: boolean;
  /** Tinggi 70% layar di ponsel agar isi halaman langsung terlihat. */
  compactOnMobile?: boolean;
}

export function PageHero({ hero, target = '#content', priority = true, compactOnMobile = false }: PageHeroProps) {
  const ui = useUiText();

  return (
    <section
      className={`relative flex flex-col justify-center overflow-hidden bg-black ${
        compactOnMobile ? 'min-h-[70svh] md:h-screen' : 'h-screen min-h-screen'
      }`}
    >
      <div className="absolute inset-0 z-0 bg-forest-deep">
        <Image src={hero.image} alt={hero.imageAlt} fill priority={priority} sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className={`relative z-10 w-full px-4 sm:px-6 ${compactOnMobile ? 'py-28' : ''} text-center flex flex-col items-center justify-center`}>
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal text-white text-center tracking-tight max-w-5xl mx-auto drop-shadow-lg">
          {hero.title}
        </h1>
        {hero.subtitle && (
          <p className="mt-4 sm:mt-6 text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-white/90 max-w-2xl mx-auto font-medium text-center drop-shadow-md">
            {hero.subtitle}
          </p>
        )}
      </div>

      <ScrollCue target={target} label={hero.scrollLabel} hint={ui.common.scrollHint} />
    </section>
  );
}

export function ScrollCue({ target, label, hint }: { target: string; label: string; hint: string }) {
  return (
    <a
      href={target}
      className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center space-y-1.5 group cursor-pointer focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none rounded-md"
    >
      <span className="text-white text-lg sm:text-xl font-serif drop-shadow-md">{label}</span>
      <span className="text-white/70 text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-sans group-hover:text-white transition-colors">
        {hint}
      </span>
      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 group-hover:text-white group-hover:translate-y-1 transition-all duration-300" />
    </a>
  );
}
