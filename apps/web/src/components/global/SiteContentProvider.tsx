'use client';

import React, { createContext, useContext } from 'react';
import type { LayoutContent, UiText } from '@/lib/content';
import type { Room, SpaTreatment } from '@/types';

export interface SiteCatalog {
  rooms: Pick<Room, 'id' | 'slug' | 'name' | 'category'>[];
  treatments: Pick<SpaTreatment, 'id' | 'title'>[];
}

interface SiteContent {
  layout: LayoutContent;
  ui: UiText;
  catalog: SiteCatalog;
}

const SiteContentContext = createContext<SiteContent | null>(null);

export const SiteContentProvider: React.FC<{ value: SiteContent; children: React.ReactNode }> = ({ value, children }) => (
  <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
);

function useSiteContent(): SiteContent {
  const content = useContext(SiteContentContext);
  if (!content) throw new Error('Konten situs harus dipakai di dalam SiteContentProvider.');
  return content;
}

// Logo, menu, dan footer dari global "Header, Menu & Footer" di CMS.
export const useLayoutContent = () => useSiteContent().layout;

// Teks tombol dan template detail dari global "Teks Tombol & Template" di CMS.
export const useUiText = () => useSiteContent().ui;

// Daftar kamar dan perawatan dari CMS untuk pilihan di jendela reservasi.
export const useCatalog = () => useSiteContent().catalog;
