import React from 'react';
import Image from 'next/image';
import { Clock, CheckCircle2 } from 'lucide-react';
import { SpaTreatment } from '@/types';
import { formatCurrencyIdr } from '@/lib/utils';

interface TreatmentCardProps {
  treatment: SpaTreatment;
  onBook?: (slug: string) => void;
}

export const TreatmentCard: React.FC<TreatmentCardProps> = ({ treatment, onBook }) => {
  return (
    <div className="bg-forest-deep/80 border border-champagne/20 overflow-hidden hover:border-champagne/60 transition-all duration-500 flex flex-col h-full shadow-lg">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={treatment.image}
          alt={treatment.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent opacity-80" />

        <div className="absolute top-4 left-4">
          <span className="bg-forest-deep/90 text-champagne text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-champagne/30 backdrop-blur-md">
            {treatment.category}
          </span>
        </div>

        <div className="absolute bottom-4 right-4 text-right">
          <span className="font-serif text-lg text-champagne font-bold">
            {formatCurrencyIdr(treatment.priceIdr)}
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4 text-ivory">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs text-champagne">
            <Clock className="w-3.5 h-3.5" />
            <span>{treatment.durationMinutes} Menit Perawatan</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-ivory">{treatment.title}</h3>
          <p className="text-xs text-ivory/70 leading-relaxed">{treatment.description}</p>
        </div>

        {/* Benefits list */}
        <div className="space-y-1.5 pt-2 border-t border-white/10">
          <span className="text-[10px] uppercase tracking-wider text-champagne font-semibold block">Manfaat Utama</span>
          <ul className="space-y-1 text-xs text-ivory/80">
            {treatment.benefits.slice(0, 2).map((benefit, i) => (
              <li key={i} className="flex items-start space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-champagne shrink-0 mt-0.5" />
                <span className="line-clamp-1">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => onBook && onBook(treatment.slug)}
          className="w-full bg-champagne hover:bg-champagne-light text-forest-deep text-xs uppercase tracking-wider font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center"
        >
          <span>Reservasi Perawatan</span>
        </button>
      </div>
    </div>
  );
};
