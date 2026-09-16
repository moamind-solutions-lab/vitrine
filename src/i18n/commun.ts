import type { Langue } from './routes';

const fr = {
  accroche: 'Le produit avant le code',
  /** Titre de l'onglet et du résultat Google de l'accueil : ce que les gens cherchent, pas l'accroche. */
  titreAccueil: "Conception d'applications web et mobiles",
  description: "Conception et développement d'applications web et mobiles. On cadre le problème, vous validez les écrans, rien ne se construit avant.",
  sautContenu: 'Aller au contenu',
  /** Complète le nom du studio dans le nom accessible du logo : « Moamind Solutions, accueil ». */
  accueil: 'accueil',
  nav: { aria: 'Navigation principale', methode: 'Méthode', realisations: 'Réalisations', experience: 'Expérience', ouvrirMenu: 'Ouvrir le menu' },
  cta: 'Décrire mon projet',
  voirRealisations: 'Voir les réalisations',
  retourAccueil: "Retour à l'accueil",
  rdv: 'Réserver 30 minutes',
  langue: { choisir: 'Choisir la langue', pied: 'Langue' },
  pied: {
    aria: 'Navigation de pied de page',
    phrase: 'Votre produit est étudié, cadré et validé avant la première ligne de code.',
    travail: 'Le travail',
    studio: 'Le studio',
    contact: 'Contact',
    base: 'Basé à Bordeaux, au travail partout',
    mentions: 'Mentions légales',
    cookies: 'Gérer les cookies',
  },
  consentement: {
    aria: "Cookies de mesure d'audience",
    texte: "Avec votre accord, Google Analytics dépose des cookies pour mesurer la fréquentation du site. Vous pouvez changer d'avis à tout moment depuis le bas de page.",
    plus: 'En savoir plus',
    refuser: 'Refuser',
    accepter: 'Accepter',
    personnaliser: 'Personnaliser',
    preferences: 'Vos préférences de cookies',
    necessaires: { titre: 'Nécessaires', texte: 'Retiennent votre langue et vos choix.', toujours: 'Toujours actifs' },
    audience: { titre: "Mesure d'audience", texte: 'Google Analytics compte les visites, pour nous aider à améliorer le site.' },
    obligatoires: 'Obligatoires uniquement',
    selection: 'Accepter la sélection',
  },
};

const en: typeof fr = {
  accroche: 'Product before code',
  titreAccueil: 'Web and mobile app design and development',
  description: 'Design and development of web and mobile apps. The problem gets scoped, you approve the screens, and nothing gets built before that.',
  sautContenu: 'Skip to content',
  accueil: 'home',
  nav: { aria: 'Main navigation', methode: 'Method', realisations: 'Work', experience: 'Experience', ouvrirMenu: 'Open menu' },
  cta: 'Describe my project',
  voirRealisations: 'See the work',
  retourAccueil: 'Back to home',
  rdv: 'Book 30 minutes',
  langue: { choisir: 'Choose language', pied: 'Language' },
  pied: {
    aria: 'Footer navigation',
    phrase: 'Your product is studied, scoped and approved before the first line of code.',
    travail: 'The work',
    studio: 'The studio',
    contact: 'Contact',
    base: 'Based in Bordeaux, working everywhere',
    mentions: 'Legal notice',
    cookies: 'Cookie settings',
  },
  consentement: {
    aria: 'Audience measurement cookies',
    texte: 'With your consent, Google Analytics sets cookies to measure how the site is used. You can change your mind at any time from the footer.',
    plus: 'Learn more',
    refuser: 'Decline',
    accepter: 'Accept',
    personnaliser: 'Customize',
    preferences: 'Your cookie preferences',
    necessaires: { titre: 'Necessary', texte: 'Remember your language and your choices.', toujours: 'Always on' },
    audience: { titre: 'Audience measurement', texte: 'Google Analytics counts visits, to help us improve the site.' },
    obligatoires: 'Necessary only',
    selection: 'Accept selection',
  },
};

const textes: Record<Langue, typeof fr> = { fr, en };
export default textes;
