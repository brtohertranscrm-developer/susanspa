import React from 'react';
import Image from 'next/image';
import { Users, Church, CheckCircle2 } from 'lucide-react';
import { WeddingPackage } from '@/types';
import { formatCurrencyIdr } from '@/lib/utils';

interface WeddingCardProps {
  pkg: WeddingPackage;
  onInquire?: (slug: string) => void;
}

export const WeddingCard: React.FC<WeddingCardProps> = ({ pkg, onInquire }) => {
  return (
    <div className="bg-forest-deep/80 border border-champagne/20 rounded-2xl overflow-hidden hover:border-champagne/60 transition-all duration-500 flex flex-col h-full shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent opacity-80" />

        <div className="absolute top-4 left-4">
          <span className="bg-forest-deep/90 text-champagne text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-champagne/30 backdrop-blur-md flex items-center space-x-1">
            <Church className="w-3 h-3" />
            <span>{pkg.venue}</span>
          </span>
        </div>

        <div className="absolute bottom-4 right-4 text-right">
          <span className="text-[10px] uppercase tracking-wider text-ivory/70 block">Starting From</span>
          <span className="font-serif text-lg text-champagne font-bold">
            {formatCurrencyIdr(pkg.priceStartingIdr)}
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4 text-ivory">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs text-champagne">
            <Users className="w-3.5 h-3.5" />
            <span>{pkg.guestCapacity}</span>
          </div>

          <h3 className="font-serif text-2xl text-ivory">{pkg.name}</h3>
          <p className="text-xs text-ivory/70 leading-relaxed">{pkg.tagline}</p>
        </div>

        {/* Inclusions */}
        <div className="space-y-2 pt-3 border-t border-white/10">
          <span className="text-[10px] uppercase tracking-wider text-champagne font-semibold block">Package Highlights</span>
          <ul className="space-y-1.5 text-xs text-ivory/80">
            {pkg.inclusions.slice(0, 3).map((item, i) => (
              <li key={i} className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-champagne shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => onInquire && onInquire(pkg.slug)}
          className="w-full bg-champagne hover:bg-champagne-light text-forest-deep text-xs uppercase tracking-wider font-semibold py-3 rounded-xl transition-colors flex items-center justify-center shadow-md"
        >
          <span>Request Wedding Proposal</span>
        </button>
      </div>
    </div>
  );
};
