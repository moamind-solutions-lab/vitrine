// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SANS_INDEX, chemin } from './src/i18n/routes.ts';

/** Adresses françaises des pages non indexées, retirées du plan du site comme la 404. */
const horsPlan = SANS_INDEX.map((page) => chemin(page, 'fr'));

// Deux domaines chez o2switch : le français sur moamind-solutions.fr (public_html), l'anglais
// sur moamind-solutions.com (public_html/en). Voir README, « Hébergement », et src/i18n/routes.ts.
export default defineConfig({
  site: 'https://moamind-solutions.fr',
  trailingSlash: 'ignore',
  // Plan du site du domaine français ; celui de l'anglais est écrit par scripts/preparer-domaines.mjs.
  integrations: [sitemap({ filter: (page) => {
    const { pathname } = new URL(page);
    return !/\/404\/?$/.test(pathname) && !pathname.startsWith('/en/') && !horsPlan.includes(pathname);
  } })],
  build: { format: 'directory' },
  image: { responsiveStyles: true },
  devToolbar: { enabled: false },
});
