/**
 * Données structurées schema.org (JSON-LD), rendues par src/layouts/Base.astro.
 * Toujours sur les domaines de production, même en développement : ce sont des identifiants.
 */
import { chemin, DOMAINES, type Langue, type Page } from '../i18n/routes.ts';

/** Une seule organisation pour les deux domaines, identifiée sur le domaine français. */
const ORGANISATION = `${DOMAINES.fr}/#organisation`;

const absolue = (langue: Langue, page: Page, slug?: string) => DOMAINES[langue] + chemin(page, langue, slug);

interface Studio {
  nom: string;
  /** Ville du studio : déclarée aux moteurs, jamais mise en avant à l'écran (CONTEXT-MOAMIND, règle 6). */
  ville: string;
  description: string;
  slogan: string;
}

/** L'organisation et le site de la langue, pour la page d'accueil. */
export function accueil(langue: Langue, studio: Studio) {
  const site = absolue(langue, 'accueil');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORGANISATION,
        name: studio.nom,
        url: `${DOMAINES.fr}/`,
        image: `${DOMAINES[langue]}/og.png`,
        description: studio.description,
        slogan: studio.slogan,
        address: { '@type': 'PostalAddress', addressLocality: studio.ville, addressCountry: 'FR' },
        knowsLanguage: ['fr', 'en'],
      },
      {
        '@type': 'WebSite',
        '@id': `${site}#site`,
        url: site,
        name: studio.nom,
        inLanguage: langue,
        publisher: { '@id': ORGANISATION },
      },
    ],
  };
}

/** Le fil d'Ariane affiché en haut d'une page, du plus général au plus précis. */
export function filAriane(langue: Langue, elements: { nom: string; page: Page; slug?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: elements.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: e.nom,
      item: absolue(langue, e.page, e.slug),
    })),
  };
}
