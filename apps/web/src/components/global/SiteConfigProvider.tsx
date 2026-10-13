'use client';

import React, { createContext, useContext } from 'react';
import type { SiteConfig } from '@/data/site';

const SiteConfigContext = createContext<SiteConfig | null>(null);

export const SiteConfigProvider: React.FC<{ value: SiteConfig; children: React.ReactNode }> = ({
  value,
  children,
}) => <SiteConfigContext.Provider value={value}>{children}</SiteConfigContext.Provider>;

// Nilai kontak dan media sosial diambil dari Pengaturan Situs di CMS. Layout server mengisinya.
export function useSiteConfig(): SiteConfig {
  const site = useContext(SiteConfigContext);
  if (!site) throw new Error('useSiteConfig harus dipakai di dalam SiteConfigProvider.');
  return site;
}
