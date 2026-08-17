'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Instagram, Facebook, Compass, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-deep text-ivory/80 pt-20 pb-12 border-t border-champagne/20">
      <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upper Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/images/susan-spa-logo-gold.png"
                alt="Susan Spa & Resort"
                width={200}
                height={88}
                className="h-12 w-auto object-contain drop-shadow-md"
              />
            </Link>

            <p className="text-sm text-ivory/70 leading-relaxed max-w-md">
              Situated ~1,100 meters above sea level near Mount Ungaran, Central Java. Susan Spa & Resort offers restorative stays, signature wellness therapies, and romantic weddings at the iconic La Kana Chapel.
            </p>

            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-forest border border-champagne/30 text-champagne text-xs">
              <Compass className="w-4 h-4" />
              <span>Altitude ~1,100m ASL • Bandungan Highlands</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-ivory text-base tracking-wide uppercase text-champagne">
              The Resort
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory/80">
              <li><Link href="/stay" className="hover:text-champagne transition-colors">Accommodations</Link></li>
              <li><Link href="/spa" className="hover:text-champagne transition-colors">Spa & Wellness</Link></li>
              <li><Link href="/facilities" className="hover:text-champagne transition-colors">Resort Facilities</Link></li>
              <li><Link href="/dining" className="hover:text-champagne transition-colors">Sky Garden Dining</Link></li>
              <li><Link href="/experiences" className="hover:text-champagne transition-colors">Resort Experiences</Link></li>
              <li><Link href="/offers" className="hover:text-champagne transition-colors">Offers & Packages</Link></li>
            </ul>
          </div>

          {/* Col 3: Celebrations & Destinations */}
          <div className="space-y-4">
            <h4 className="font-serif text-ivory text-base tracking-wide uppercase text-champagne">
              Celebrations
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory/80">
              <li><Link href="/weddings" className="hover:text-champagne transition-colors">La Kana Chapel Weddings</Link></li>
              <li><Link href="/events" className="hover:text-champagne transition-colors">Meetings & Events</Link></li>
              <li><Link href="/gallery" className="hover:text-champagne transition-colors">Visual Gallery</Link></li>
              <li><Link href="/nearby" className="hover:text-champagne transition-colors">Gedong Songo & Nearby</Link></li>
              <li><Link href="/journal" className="hover:text-champagne transition-colors">Journal & Stories</Link></li>
              <li><Link href="/about" className="hover:text-champagne transition-colors">About Our Sanctuary</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-ivory text-base tracking-wide uppercase text-champagne">
              Newsletter
            </h4>
            <p className="text-xs text-ivory/70">
              Receive exclusive seasonal retreat offers and wellness stories from Bandungan.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-forest text-ivory text-xs px-3 py-2 rounded border border-white/10 focus:border-champagne focus:outline-none placeholder:text-ivory/40"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="bg-champagne hover:bg-champagne-light text-forest-deep p-2 rounded transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Middle Contact Row */}
        <div className="py-8 border-b border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-ivory/80">
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-champagne shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-ivory block">Resort Location</span>
              <span>Dusun Piyoto, Bandungan, Semarang Regency, Central Java 50614</span>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Phone className="w-5 h-5 text-champagne shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-ivory block">Reservations & Concierge</span>
              <span>+62 298 711111 • WhatsApp: +62 812 2811 1111</span>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-champagne shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-ivory block">Email Inquiries</span>
              <span>info@susansparesort.com • reservation@susansparesort.com</span>
            </div>
          </div>
        </div>

        {/* Lower Legal & Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/50 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span>© {new Date().getFullYear()} Susan Spa & Resort. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-champagne transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-champagne transition-colors">Terms of Service</Link>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-champagne text-ivory/80 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-champagne text-ivory/80 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
