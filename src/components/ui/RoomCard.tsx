import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Maximize2, BedDouble, Eye, ArrowUpRight, Sparkles } from 'lucide-react';
import { Room } from '@/types';
import { formatCurrencyIdr } from '@/lib/utils';

interface RoomCardProps {
  room: Room;
  onInquire?: (roomSlug: string) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onInquire }) => {
  return (
    <div className="group bg-forest-deep/80 border border-champagne/20 rounded-2xl overflow-hidden hover:border-champagne/60 transition-all duration-500 flex flex-col h-full shadow-lg hover:shadow-2xl">
      {/* Image Container with Zoom & Badge */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent opacity-80" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-forest-deep/90 text-champagne text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-champagne/30 backdrop-blur-md">
            {room.category}
          </span>
        </div>

        {/* Starting Price Tag */}
        <div className="absolute bottom-4 right-4 text-right">
          <span className="text-[10px] uppercase tracking-wider text-ivory/70 block">From</span>
          <span className="font-serif text-lg text-champagne font-bold">
            {formatCurrencyIdr(room.startingPriceIdr)}
          </span>
          <span className="text-[10px] text-ivory/60 block">/ night</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-serif text-xl sm:text-2xl text-ivory group-hover:text-champagne transition-colors">
            {room.name}
          </h3>
          <p className="text-xs text-ivory/70 line-clamp-2 leading-relaxed">
            {room.tagline}
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-[11px] text-ivory/80">
          <div className="flex items-center space-x-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-champagne shrink-0" />
            <span>{room.sizeSqm} sqm</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <Users className="w-3.5 h-3.5 text-champagne shrink-0" />
            <span>{room.capacityAdults} Guests</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <BedDouble className="w-3.5 h-3.5 text-champagne shrink-0" />
            <span className="truncate">{room.bedType}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3 pt-2">
          <Link
            href={`/stay/${room.slug}`}
            className="flex-1 border border-champagne/40 hover:bg-forest text-ivory text-xs uppercase tracking-wider font-medium py-2.5 rounded-xl text-center transition-colors flex items-center justify-center space-x-1"
          >
            <span>Explore Room</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-champagne" />
          </Link>

          <button
            onClick={() => onInquire && onInquire(room.slug)}
            className="bg-champagne hover:bg-champagne-light text-forest-deep text-xs uppercase tracking-wider font-semibold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center"
          >
            <span>Inquire</span>
          </button>
        </div>
      </div>
    </div>
  );
};
