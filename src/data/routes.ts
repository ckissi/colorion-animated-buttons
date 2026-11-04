import { collections, effectPages } from './catalog';
import { guides } from './guides';
// Canonical public routes only. Customization fragments and data files are not pages.
export const indexableRoutes = [
  '/', '/collections/', '/guides/', '/about/', '/tools/button-generator/',
  ...collections.map((collection) => `/collections/${collection.slug}/`),
  ...effectPages.map((page) => `/effects/${page.slug}/`),
  ...guides.map((guide) => `/guides/${guide.slug}/`),
];
