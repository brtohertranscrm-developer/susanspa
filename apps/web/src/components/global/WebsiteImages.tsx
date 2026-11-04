'use client';

import Image, { type ImageProps } from 'next/image';
import { createContext, useContext, type ReactNode, type VideoHTMLAttributes } from 'react';
import type { WebsiteImageSlot } from '@susan/contracts';

export type WebsiteImages = Partial<Record<WebsiteImageSlot, { url: string; alt?: string }>>;
const WebsiteImagesContext = createContext<WebsiteImages>({});

export function WebsiteImagesProvider({ images, children }: { images: WebsiteImages; children: ReactNode }) {
  return <WebsiteImagesContext.Provider value={images}>{children}</WebsiteImagesContext.Provider>;
}

export default function WebsiteImage({ slot, ...props }: ImageProps & { slot?: WebsiteImageSlot }) {
  const images = useContext(WebsiteImagesContext);
  const image = slot ? images[slot] : undefined;
  return <Image {...props} src={image?.url || props.src} alt={image?.alt || props.alt} />;
}

export function WebsiteVideo({ slot, ...props }: VideoHTMLAttributes<HTMLVideoElement> & { slot: WebsiteImageSlot }) {
  const images = useContext(WebsiteImagesContext);
  return <video {...props} poster={images[slot]?.url || props.poster} />;
}
