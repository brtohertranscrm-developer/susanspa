'use client';

import React from 'react';
import { Header } from '@/components/global/Header';
import { Footer } from '@/components/global/Footer';

interface LegalContent {
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}

export function LegalPage({ content }: { content: LegalContent }) {
  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans">
      <Header />
      <main className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="font-serif text-3xl sm:text-4xl text-forest-deep">{content.title}</h1>
        {content.updated && <p className="text-xs text-charcoal/60">{content.updated}</p>}
        <div className="space-y-4 text-xs text-charcoal/80 leading-relaxed">
          {content.sections.map((section, index) => (
            <React.Fragment key={index}>
              {section.heading && (
                <h2 className="font-serif text-xl text-forest-deep font-semibold pt-2">{section.heading}</h2>
              )}
              {section.body && <p className="whitespace-pre-line">{section.body}</p>}
            </React.Fragment>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
