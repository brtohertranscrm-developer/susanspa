import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Maximize2, BedDouble, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { Room } from '@/types';
import { roomCapacity, roomCategoryLabel } from '@/lib/room-display';

interface RoomCardProps {
  room: Room;
  onInquire?: (roomSlug: string) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onInquire }) => {
  return (
    <div className="group bg-forest-deep/90 border border-champagne/20 rounded-3xl overflow-hidden hover:border-champagne/60 transition-all duration-500 flex flex-col h-full shadow-lg hover:shadow-2xl">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={room.images[0] || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop'}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent opacity-75" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-forest-deep/90 text-champagne text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-champagne/30 backdrop-blur-md font-semibold">
            {roomCategoryLabel(room.category)}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-serif text-xl sm:text-2xl text-ivory group-hover:text-champagne transition-colors">
            {room.name}
          </h3>
          <p className="text-xs text-ivory/75 line-clamp-2 leading-relaxed">
            {room.description || room.tagline || 'Kenyamanan eksklusif di dataran tinggi Bandungan.'}
          </p>
        </div>

        {/* Quick Specs: Size, Capacity, Bed Type */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-[11px] text-ivory/80 text-center">
          <div className="space-y-1">
            <Maximize2 className="w-3.5 h-3.5 text-champagne mx-auto" />
            <span className="text-[10px] text-ivory/60 uppercase block">Size</span>
            <span className="font-medium text-ivory">
              {room.sizeSqm ? `${room.sizeSqm} sqm` : '—'}
            </span>
          </div>

          <div className="space-y-1">
            <Users className="w-3.5 h-3.5 text-champagne mx-auto" />
            <span className="text-[10px] text-ivory/60 uppercase block">Capacity</span>
            <span className="font-medium text-ivory">
              {roomCapacity(room)}
            </span>
          </div>

          <div className="space-y-1">
            <BedDouble className="w-3.5 h-3.5 text-champagne mx-auto" />
            <span className="text-[10px] text-ivory/60 uppercase block">Bed Type</span>
            <span className="font-medium text-ivory line-clamp-1">
              {room.bedType || '—'}
            </span>
          </div>
        </div>

        {/* Key Facilities Badges */}
        {room.amenities.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] uppercase tracking-wider text-champagne/80 font-semibold block">
              Key Facilities
            </span>
            <div className="flex flex-wrap gap-1.5">
              {room.amenities.slice(0, 3).map((facility, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center space-x-1 bg-forest px-2.5 py-1 rounded-md text-[10px] text-ivory/85 border border-white/5"
                >
                  <CheckCircle2 className="w-2.5 h-2.5 text-champagne" />
                  <span>{facility}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action CTAs */}
        <div className="flex items-center space-x-2 pt-2">
          <Link
            href={`/rooms/${room.slug}`}
            className="flex-1 border border-champagne/40 hover:bg-forest text-ivory text-xs uppercase tracking-wider font-semibold py-2.5 rounded-xl text-center transition-colors flex items-center justify-center space-x-1"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-champagne" />
          </Link>

          <button
            onClick={() => onInquire && onInquire(room.slug)}
            className="bg-champagne hover:bg-champagne-light text-forest-deep text-xs uppercase tracking-wider font-bold py-2.5 px-4 rounded-xl transition-colors shadow-sm"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};
