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
    <div className="group bg-white border border-stone-200/90 hover:border-champagne/80 overflow-hidden transition-all duration-500 flex flex-col h-full hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-forest-deep">
        <Image
          src={room.images[0] || '/images/rooms/room-1.jpg'}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent opacity-60" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-forest-deep/90 text-champagne text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-champagne/30 backdrop-blur-md font-semibold">
            {roomCategoryLabel(room.category)}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-serif text-2xl text-forest-deep group-hover:text-botanical transition-colors font-normal">
            {room.name}
          </h3>
          <p className="text-xs text-[#4A5852] line-clamp-2 leading-relaxed font-normal">
            {room.description || room.tagline || 'Kenyamanan eksklusif di dataran tinggi Bandungan.'}
          </p>
        </div>

        {/* Quick Specs: Size, Capacity, Bed Type */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-200/70 text-[11px] text-[#333D39] text-center">
          <div className="space-y-1">
            <Maximize2 className="w-3.5 h-3.5 text-champagne-dark mx-auto" />
            <span className="text-[10px] text-[#57635E] uppercase block tracking-wider font-semibold">Luas Kamar</span>
            <span className="font-semibold text-forest-deep">
              {room.sizeSqm ? `${room.sizeSqm} m²` : '-'}
            </span>
          </div>

          <div className="space-y-1 border-x border-stone-200/60 px-1">
            <Users className="w-3.5 h-3.5 text-champagne-dark mx-auto" />
            <span className="text-[10px] text-[#57635E] uppercase block tracking-wider font-semibold">Kapasitas</span>
            <span className="font-semibold text-forest-deep">
              {roomCapacity(room)}
            </span>
          </div>

          <div className="space-y-1">
            <BedDouble className="w-3.5 h-3.5 text-champagne-dark mx-auto" />
            <span className="text-[10px] text-[#57635E] uppercase block tracking-wider font-semibold">Tipe Kasur</span>
            <span className="font-semibold text-forest-deep line-clamp-1">
              {room.bedType || '-'}
            </span>
          </div>
        </div>

        {/* Key Facilities Badges */}
        {room.amenities.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] uppercase tracking-wider text-botanical font-bold block">
              Fasilitas Kamar
            </span>
            <div className="flex flex-wrap gap-1.5">
              {room.amenities.slice(0, 3).map((facility, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center space-x-1.5 bg-[#FAF7F2] px-2.5 py-1 rounded-full text-[10px] text-[#2C3833] border border-stone-200/70"
                >
                  <CheckCircle2 className="w-2.5 h-2.5 text-champagne-dark" />
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
            className="flex-1 border border-stone-300 hover:border-forest text-forest hover:bg-forest hover:text-ivory text-xs uppercase tracking-wider font-semibold py-2.5 rounded-full text-center transition-all duration-300 flex items-center justify-center space-x-1"
          >
            <span>Detail Kamar</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => onInquire && onInquire(room.slug)}
            className="bg-forest-deep hover:bg-forest text-champagne hover:text-champagne-light text-xs uppercase tracking-wider font-bold py-2.5 px-5 rounded-full transition-colors"
          >
            Pesan Kamar
          </button>
        </div>
      </div>
    </div>
  );
};
