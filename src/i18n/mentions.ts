import type { Langue } from './routes';

const fr = {
  meta: { titre: 'Mentions légales', description: 'Mentions légales et politique de confidentialité du site de Moamind Solutions.' },
  etiquette: 'Informations légales',
  titre: 'Mentions légales',
  foi: 'Seule cette version française fait foi.',
  sommaireAria: 'Sommaire',
  blocs: [
    {
      id: 'editeur',
      court: 'Éditeur du site',
      titre: 'Éditeur du site',
      paragraphes: [
        `<span translate="no">Moamind Solutions</span><br />
          Forme juridique&nbsp;: société par actions&nbsp;simplifiée&nbsp;(SAS)<br />
          Capital social&nbsp;: 100&nbsp;€<br />
          Siège social&nbsp;: 12 rue Marguerite&nbsp;Yourcenar,<br />
          33160&nbsp;Saint-Médard-en-Jalles,&nbsp;France<br />
          RCS Bordeaux 924&nbsp;825&nbsp;201<br />
          SIRET&nbsp;: 924&nbsp;825&nbsp;201&nbsp;00016<br />
          Numéro de TVA intracommunautaire&nbsp;: FR38&nbsp;924&nbsp;825&nbsp;201<br />
          Directeur de la publication&nbsp;: Xavier&nbsp;Defer,&nbsp;président`,
      ],
    },
    {
      id: 'contact',
      court: 'Me contacter',
      titre: 'Me contacter',
      paragraphes: ["Toute demande passe par le formulaire de la page Contact. Aucune adresse électronique n'est publiée sur ce site."],
    },
    {
      id: 'hebergement',
      court: 'Hébergement',
      titre: 'Hébergement',
      paragraphes: ['Le site est hébergé par o2switch, SAS au capital de 100&nbsp;000&nbsp;€, RCS Clermont-Ferrand 510&nbsp;909&nbsp;807, Chemin des Pardiaux, 63000 Clermont-Ferrand, France. Téléphone&nbsp;: 04&nbsp;44&nbsp;44&nbsp;60&nbsp;40.'],
    },
    {
      id: 'propriete',
      court: 'Propriété intellectuelle',
      titre: 'Propriété intellectuelle',
      paragraphes: [
        "L'ensemble des contenus de ce site, textes, maquettes, captures d'écran des applications présentées, identité visuelle et code, est la propriété de <span translate=\"no\">Moamind Solutions</span>, sauf mention contraire. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable est interdite.",
      ],
    },
    {
      id: 'donnees',
      court: 'Données personnelles',
      titre: 'Données personnelles',
      paragraphes: [
        'Les informations transmises par le formulaire de contact (nom, organisation, adresse électronique, nature du projet, échéance, budget et message) servent exclusivement à répondre à votre demande. Elles ne sont ni revendues, ni cédées, ni utilisées à des fins de prospection par des tiers.',
        "Les messages partent par e-mail depuis le serveur de l'hébergeur du site, o2switch, sans passer par un service tiers. Les données sont conservées le temps nécessaire au traitement de la demande, et au maximum trois ans après le dernier échange.",
        "Conformément au règlement général sur la protection des données, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité de vos données. Ces droits s'exercent par le formulaire de contact. Vous pouvez également introduire une réclamation auprès de la CNIL.",
      ],
    },
    {
      id: 'cookies',
      court: 'Cookies',
      titre: "Cookies et mesure d'audience",
      paragraphes: [
        "Un cookie retient la langue choisie avec le sélecteur de langue, pendant un an. Indispensable à ce choix, il est exempté de consentement.",
        "Avec votre accord, le site utilise Google Analytics, service de Google Ireland Limited, pour mesurer sa fréquentation&nbsp;: pages consultées, durée des visites, type d'appareil et provenance approximative. Les cookies <code>_ga</code> et <code>_ga_*</code> sont alors conservés treize mois au plus, et les données de mesure un an au plus dans Google Analytics. Ces données peuvent être transférées aux États-Unis, dans le cadre du Data Privacy Framework. Sans votre accord, Google Analytics n'est pas chargé et aucun de ces cookies n'est déposé. Aucun traçage publicitaire n'est utilisé.",
        "Votre choix, accepté ou refusé, est conservé six mois dans votre navigateur. Vous pouvez le modifier à tout moment avec le lien «&nbsp;Gérer les cookies&nbsp;» en bas de chaque page&nbsp;; un refus efface les cookies de mesure déjà déposés.",
      ],
    },
  ],
};

const en: typeof fr = {
  meta: { titre: 'Legal notice', description: "Legal notice and privacy policy for the Moamind Solutions website." },
  etiquette: 'Legal information',
  titre: 'Legal notice',
  foi: 'This English version is provided for convenience. In case of any discrepancy, the French version prevails.',
  sommaireAria: 'Contents',
  blocs: [
    {
      id: 'publisher',
      court: 'Publisher',
      titre: 'Publisher',
      paragraphes: [
        `<span translate="no">Moamind Solutions</span><br />
          Legal form: simplified <span style="white-space:nowrap">joint-stock company (SAS)</span><br />
          Share capital: €100<br />
          Registered office: 12 rue Marguerite&nbsp;Yourcenar,<br />
          33160&nbsp;Saint-Médard-en-Jalles,&nbsp;France<br />
          Registered in Bordeaux (RCS) under number 924&nbsp;825&nbsp;201<br />
          SIRET: 924&nbsp;825&nbsp;201&nbsp;00016<br />
          EU VAT number: FR38&nbsp;924&nbsp;825&nbsp;201<br />
          Publication director: Xavier&nbsp;Defer,&nbsp;President`,
      ],
    },
    {
      id: 'contact',
      court: 'Contact me',
      titre: 'Contact me',
      paragraphes: ['Every request goes through the form on the Contact page. No email address is published on this site.'],
    },
    {
      id: 'hosting',
      court: 'Hosting',
      titre: 'Hosting',
      paragraphes: ['The site is hosted by o2switch, a French simplified joint-stock company (SAS) with a share capital of €100,000, registered in Clermont-Ferrand under number 510 909 807, Chemin des Pardiaux, 63000 Clermont-Ferrand, France. Phone: +33 4 44 44 60 40.'],
    },
    {
      id: 'intellectual-property',
      court: 'Intellectual property',
      titre: 'Intellectual property',
      paragraphes: [
        'All the content on this site, text, mockups, screenshots of the applications shown, visual identity and code, belongs to <span translate="no">Moamind Solutions</span>, unless stated otherwise. Any reproduction or use, in whole or in part, without prior written permission is prohibited.',
      ],
    },
    {
      id: 'personal-data',
      court: 'Personal data',
      titre: 'Personal data',
      paragraphes: [
        'The information sent through the contact form (name, organization, email address, nature of the project, target date, budget and message) is used solely to reply to your request. It is never sold, passed on, or used for marketing purposes by third parties.',
        "Messages are sent by email from the site's host, o2switch, without going through any third-party service. Data is kept for as long as needed to handle the request, and for a maximum of three years after the last exchange.",
        'Under the GDPR, you have the right to access, correct, erase, restrict, object to, and port your data. These rights can be exercised through the contact form. You can also file a complaint with the CNIL (the French data protection authority).',
      ],
    },
    {
      id: 'cookies',
      court: 'Cookies',
      titre: 'Cookies and audience measurement',
      paragraphes: [
        'One cookie remembers the language chosen with the language selector, for one year. As it is strictly necessary for that choice, it is exempt from consent.',
        "With your consent, the site uses Google Analytics, a service of Google Ireland Limited, to measure how it is used: pages viewed, visit duration, device type and approximate location. The <code>_ga</code> and <code>_ga_*</code> cookies are then kept for thirteen months at most, and measurement data for one year at most in Google Analytics. This data may be transferred to the United States under the Data Privacy Framework. Without your consent, Google Analytics is not loaded and none of these cookies are set. No advertising tracking is used.",
        'Your choice, whether you accept or decline, is kept in your browser for six months. You can change it at any time with the “Cookie settings” link at the bottom of every page; declining deletes any measurement cookies already set.',
      ],
    },
  ],
};

const textes: Record<Langue, typeof fr> = { fr, en };
export default textes;
