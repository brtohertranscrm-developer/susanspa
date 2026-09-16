'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Testimonial } from '@/types';

interface TestimonialCarouselProps {
  testimonials?: Testimonial[];
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="bg-forest/60 border border-champagne/30 rounded-3xl p-8 md:p-12 relative overflow-hidden backdrop-blur-md shadow-2xl">
      <Quote className="absolute top-6 right-8 w-24 h-24 text-champagne/10 pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-6 text-center text-ivory relative z-10">
        {/* Rating Stars */}
        <div className="flex justify-center space-x-1 text-champagne">
          {[...Array(current.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-ivory italic leading-relaxed">
          “{current.quote}”
        </blockquote>

        {/* Author Details */}
        <div className="flex flex-col items-center space-y-2 pt-4">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-champagne relative">
            <Image src={current.avatar} alt={current.guestName} fill className="object-cover" />
          </div>
          <div>
            <h4 className="font-serif text-lg text-champagne font-medium">{current.guestName}</h4>
            <p className="text-xs text-ivory/70">
              {current.stayCategory} • {current.origin} ({current.date})
            </p>
          </div>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex justify-center items-center space-x-4 pt-4">
          <button
            onClick={handlePrev}
            aria-label="Previous Guest Story"
            className="p-2 rounded-full border border-champagne/30 hover:border-champagne hover:bg-forest text-champagne transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex space-x-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentIndex === i ? 'bg-champagne w-6' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            aria-label="Next Guest Story"
            className="p-2 rounded-full border border-champagne/30 hover:border-champagne hover:bg-forest text-champagne transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
