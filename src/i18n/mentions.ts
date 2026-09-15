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
        "L'acheminement des messages est assuré par Web3Forms. Les données sont conservées le temps nécessaire au traitement de la demande, et au maximum trois ans après le dernier échange.",
        "Conformément au règlement général sur la protection des données, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité de vos données. Ces droits s'exercent par le formulaire de contact. Vous pouvez également introduire une réclamation auprès de la CNIL.",
      ],
    },
    {
      id: 'cookies',
      court: 'Cookies',
      titre: "Cookies et mesure d'audience",
      paragraphes: ["Le seul cookie de ce site retient la langue choisie avec le sélecteur de langue, pendant un an. Indispensable à ce choix, il est exempté de consentement. Aucun outil de mesure d'audience ni de traçage publicitaire n'est utilisé : aucune bannière n'est donc nécessaire."],
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
        'Messages are delivered by Web3Forms. Data is kept for as long as needed to handle the request, and for a maximum of three years after the last exchange.',
        'Under the GDPR, you have the right to access, correct, erase, restrict, object to, and port your data. These rights can be exercised through the contact form. You can also file a complaint with the CNIL (the French data protection authority).',
      ],
    },
    {
      id: 'cookies',
      court: 'Cookies',
      titre: 'Cookies and audience measurement',
      paragraphes: ['The only cookie on this site remembers the language chosen with the language selector, for one year. As it is strictly necessary for that choice, it is exempt from consent. No audience measurement or advertising tracking tool is used, so no consent banner is needed.'],
    },
  ],
};

const textes: Record<Langue, typeof fr> = { fr, en };
export default textes;
