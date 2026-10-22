export * from './schema.js'
export * from './shared.js'
export * from './pages.js'
export * from './layout.js'
export * from './ui-text.js'
export * from './custom-pages.js'

import { siteLayout } from './layout.js'
import {
  aboutPage,
  ballroomPage,
  contactPage,
  diningPage,
  eventsPage,
  experiencesPage,
  facilitiesPage,
  galleryPage,
  homePage,
  journalPage,
  nearbyPage,
  offersPage,
  privacyPage,
  reservePage,
  roomsPage,
  spaPage,
  termsPage,
  weddingPage,
} from './pages.js'
import { formText, uiText } from './ui-text.js'

/** Semua halaman yang isinya diatur dari CMS, dalam urutan menu CMS. */
export const contentPages = [
  homePage,
  aboutPage,
  roomsPage,
  spaPage,
  diningPage,
  experiencesPage,
  facilitiesPage,
  galleryPage,
  nearbyPage,
  offersPage,
  weddingPage,
  ballroomPage,
  eventsPage,
  journalPage,
  contactPage,
  reservePage,
  privacyPage,
  termsPage,
] as const

export const contentGlobals = [siteLayout, uiText, formText, ...contentPages] as const
