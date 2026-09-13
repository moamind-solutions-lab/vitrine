import type { Langue } from './routes';
import type { Titre } from './types';

const fr = {
  meta: { titre: 'Expérience : développement et pilotage produit', description: "Quinze ans à concevoir et construire des produits, du développement au pilotage, en petite structure comme en grand groupe. Et ce que ça change pour vous." },
  etiquette: 'À qui vous parlez',
  titre: { gras: 'Du code au produit', leger: 'le secret de la réussite.' } as Titre,
  sous: "<span translate=\"no\">Moamind Solutions</span> conçoit et développe des applications web et mobiles. Ce qui distingue la maison tient en une phrase : le temps le mieux dépensé d'un projet, c'est celui qui évite de construire la mauvaise chose.",
  triade: [
    { mot: 'MOA', html: "<strong>La maîtrise d'ouvrage, c'est vous.</strong> Celui qui commande, qui connaît son métier et qui sait pourquoi il veut ce produit. Le premier travail est de se mettre à votre place." },
    { mot: 'Mind', html: "<strong>L'esprit.</strong> On réfléchit avant d'agir. Chaque décision s'écrit avec sa raison, pour qu'on puisse y revenir sans la reprendre de zéro." },
    { mot: 'Solutions', html: "<strong>La réalisation.</strong> Une réflexion qui ne se livre pas ne vaut rien. Chaque tranche est construite, mise en ligne et mesurée avant la suivante." },
  ],
  apports: {
    titre: "Quinze ans de terrain. Ce que ça change pour votre projet",
    lead: "Ingénieur informatique de formation. Développeur d'abord, puis chef de projets, puis Product Owner et Business Analyst. En clientèle directe, chez des éditeurs, et dans des groupes où un déploiement se compte en milliers de postes.",
    items: [
      { titre: 'Le métier et la technique, dans la même conversation', texte: "Des années de code avant le pilotage produit : votre métier n'a pas besoin d'être traduit en jargon technique. Et un « c'est compliqué » ne se prend jamais sur parole, il s'explique." },
      { titre: 'Les risques repérés avant qu’ils coûtent', texte: "Une dépendance oubliée, une règle réglementaire qui change tout, une donnée que personne ne sait où trouver : voilà ce qui fait déraper un projet. Quinze ans de terrain, c'est surtout une bibliothèque de ces pièges, repérés au cadrage plutôt qu'en production." },
      { titre: 'Des budgets tenus, pas seulement des tickets', texte: "Face à un client qui paie de sa poche comme devant un comité pressé, un arbitrage se défend chiffres en main. Les deux écoles apprennent la même chose : dire non, et expliquer pourquoi." },
      { titre: 'Une rigueur qui a passé l’audit', texte: "Des normes de sécurité validées par des auditeurs externes changent le rapport à la rigueur : ce qui n'est pas écrit n'existe pas, ce qui n'est pas prouvé n'est pas acquis. Chaque note de cadrage que vous recevez est tenue à ce niveau." },
    ],
  },
  terrains: {
    titre: "Les terrains. Où ça s'est joué",
    lead: "Du grand groupe au client qui paie de sa poche, voici ce qui était en jeu à chaque fois. Tout part de Bordeaux ; les projets, eux, n'ont pas de frontière.",
    items: [
      {
        milieu: 'Opérateur cloud européen',
        enjeu: "Des milliers de postes, et des auditeurs à convaincre.",
        recit: "Déploiements sur plusieurs sites, normes de sécurité validées par des auditeurs externes, gestion du backlog d’une équipe de développeurs, run et support de niveau 2.",
        cles: ['Passage à l’échelle', 'Sécurité auditée', 'Backlog produit', 'Pilotage d’équipe', 'Processus métier'],
      },
      {
        milieu: 'Groupe bancaire européen',
        enjeu: "Des milliers d’utilisateurs, et pas une habitude cassée.",
        recit: "Automatisation de leurs tâches répétitives, adoption sans rupture, stratégies de tests de bout en bout et de non-régression.",
        cles: ['Automatisation', 'Expérience utilisateur', 'Tests de bout en bout', 'Non-régression'],
      },
      {
        milieu: 'Commerce international',
        enjeu: "Un logiciel, plusieurs pays, une loi dans chacun.",
        recit: "Des règles de stock adaptées à chaque réglementation locale, formalisées avec les experts du métier, livrées en déploiement continu sous tests de non-régression.",
        cles: ['Règles métier', 'Réglementation', 'Déploiement continu', 'Non-régression'],
      },
      {
        milieu: 'Entité numérique d’un opérateur télécom',
        enjeu: "Changer d’architecture sans couper le service.",
        recit: "Recueil des besoins clients, exigences techniques et fonctionnelles, migration vers une architecture distribuée, puis support de production.",
        cles: ['Exigences', 'Architecture distribuée', 'Migration', 'Support production'],
      },
      {
        milieu: 'Éditeur de gestion documentaire',
        enjeu: "Décider ce qui entre dans chaque version.",
        recit: "Besoins métier traduits en périmètre livrable, feuille de route, critères d’acceptation et stratégie de tests.",
        cles: ['Besoins métier', 'Feuille de route', 'Critères d’acceptation', 'Stratégie de tests'],
      },
      {
        milieu: 'Service de mobilité électrique',
        enjeu: "Des services qui se parlent, par contrat.",
        recit: "Conception des API d’une architecture distribuée, contrats d’interface entre services, tests automatisés et formation des équipes.",
        cles: ['Contrats d’API', 'Architecture distribuée', 'Tests automatisés', 'Formation'],
      },
      {
        milieu: 'Clients directs',
        enjeu: "Un seul interlocuteur, du budget à la mise en ligne.",
        recit: "Des projets menés de bout en bout avec des clients souvent non techniques : arbitrages, parcours, maquettes, développement, formation et support.",
        cles: ['Budget et arbitrage', 'Parcours utilisateur', 'Maquettes', 'Formation', 'Support'],
      },
    ],
  },
  convictions: {
    titre: "Six convictions, chacune payée d'un exemple",
    items: [
      { titre: 'Une décision écrite vaut mieux qu’une réunion', texte: "Un arbitrage qu'on ne peut pas relire n'existe pas : il sera repris, retourné, et re-décidé autrement dans six mois. Ce qu'on tranche s'écrit, avec sa raison." },
      { titre: 'La contrainte se pose au début, ou elle coûte une refonte', texte: "Décider qu'un chiffre serait toujours présenté comme estimé ne coûte rien au cadrage. Découvert après le développement, le même point impose de reprendre chaque écran." },
      { titre: 'Une bonne abstraction supprime plus de code qu’elle n’en ajoute', texte: "Faire d'un club une caisse comme une autre, qui avance, encaisse et rembourse, a fait disparaître le conducteur comme cas particulier." },
      { titre: 'La friction se met là où elle se justifie', texte: "Signaler un animal trouvé ne demande aucun compte. Déclarer une perte en demande un, et l'écran explique pourquoi. Une règle qu'on justifie cesse d'être subie." },
      { titre: 'Une tranche finie vaut mieux que cinq à moitié', texte: 'Un produit à soixante pour cent ne se montre pas, ne se teste pas et ne se corrige pas. Les parcours se livrent complets, un par un.' },
      { titre: 'Le soin visible renseigne sur le reste', texte: "Un utilisateur ne peut pas juger une architecture. Il juge le chargement, l'alignement, le texte d'erreur, et il en déduit la qualité de ce qu'il ne voit pas." },
    ],
  },
  outils: {
    titre: 'Avec quoi c’est construit',
    lead: "Une technologie se choisit pour un problème, pas pour un curriculum. Voici les plus utilisées, et pourquoi.",
    items: [
      { titre: 'Mobile', texte: 'iOS natif (Swift, SwiftUI), Android, multiplateforme quand le besoin le justifie.' },
      { titre: 'Web', texte: "Astro, TypeScript, rendu statique quand c'est possible. Ce site en est un exemple." },
      { titre: 'Back-end et données', texte: 'API typées, contrats d’interface explicites, migrations versionnées, tests sur la logique métier.' },
      { titre: 'Conduite de projet', texte: 'Découpage en tranches livrables, priorisation argumentée, recette avec vous. Certifié Professional Scrum Product Owner (PSPO I).' },
    ],
  },
  appel: { titre: 'On en parle ?', texte: "Décrivez votre projet en quelques phrases. Le premier entretien ne vous engage à rien." },
};

const en: typeof fr = {
  meta: { titre: 'Experience: development and product leadership', description: 'Fifteen years designing and building products, from development to leadership, in small teams and large ones. And what that means, concretely, for your project.' },
  etiquette: "Who you're talking to",
  titre: { gras: 'From code to product', leger: 'the secret to success.' },
  sous: '<span translate="no">Moamind Solutions</span> designs and builds web and mobile apps. What sets it apart fits in one sentence: the best-spent time on any project is the time that keeps it from building the wrong thing.',
  triade: [
    { mot: 'MOA', html: "<strong>Maîtrise d'ouvrage — the client side of a project. That's you.</strong> The one who commissions the work, who knows the trade, and who knows why this product should exist. The first job is to step into your shoes." },
    { mot: 'Mind', html: '<strong>The thinking.</strong> Think before you act. Every decision gets written down with its reasoning, so it can be revisited without starting from scratch.' },
    { mot: 'Solutions', html: '<strong>The delivery.</strong> Thinking that never ships is worth nothing. Each slice is built, launched and measured before the next one begins.' },
  ],
  apports: {
    titre: 'Fifteen years in the field. What that means for your project',
    lead: 'A computer engineer by training. Developer first, then project lead, then Product Owner and Business Analyst. For direct clients, for software vendors, and inside groups where a rollout is measured in thousands of machines.',
    items: [
      { titre: 'Business and tech, in the same conversation', texte: "Years of writing code before running products: your business never needs translating into technical jargon. And “it's complicated” is never taken on faith — it gets explained." },
      { titre: 'Risks spotted before they cost you', texte: "A forgotten dependency, a regulation that changes everything, a piece of data nobody can locate — these are what derail a project. Fifteen years in the field mostly means a library of these traps, caught during scoping rather than in production." },
      { titre: 'Budgets held, not just tickets', texte: "Facing a client paying out of their own pocket or a committee short on time, a trade-off gets defended with the numbers in hand. Both schools teach the same thing: say no, and explain why." },
      { titre: 'Rigor that has passed an audit', texte: "Security standards signed off by outside auditors change how you treat rigor: what isn't written down doesn't exist, what isn't proven isn't settled. Every scoping note you receive is held to that standard." },
    ],
  },
  terrains: {
    titre: 'The terrain. Where it played out',
    lead: 'From large groups to clients paying out of their own pocket, here is what was at stake each time. It all starts from Bordeaux; the projects know no borders.',
    items: [
      {
        milieu: 'European cloud operator',
        enjeu: "Thousands of machines, and auditors to satisfy.",
        recit: "Rollouts across several sites, security standards signed off by outside auditors, backlog management for a development team, level-2 run and support.",
        cles: ['Scaling', 'Audited security', 'Product backlog', 'Team leadership', 'Business process'],
      },
      {
        milieu: 'European banking group',
        enjeu: "Thousands of users, and not one habit broken.",
        recit: "Automating their repetitive work, adoption without disruption, end-to-end and regression test strategies.",
        cles: ['Automation', 'User experience', 'End-to-end testing', 'Regression testing'],
      },
      {
        milieu: 'International retail',
        enjeu: "One product, several countries, a different law in each.",
        recit: "Inventory rules adapted to each local regulation, formalized with domain experts, shipped through continuous deployment under regression tests.",
        cles: ['Business rules', 'Regulation', 'Continuous deployment', 'Regression testing'],
      },
      {
        milieu: 'Digital arm of a telecom operator',
        enjeu: "Changing the architecture without taking the service down.",
        recit: "Gathering client needs, writing technical and functional requirements, migrating to a distributed architecture, then production support.",
        cles: ['Requirements', 'Distributed architecture', 'Migration', 'Production support'],
      },
      {
        milieu: 'Document management vendor',
        enjeu: "Deciding what makes it into each release.",
        recit: "Business needs turned into a deliverable scope, a roadmap, acceptance criteria and a test strategy.",
        cles: ['Business needs', 'Roadmap', 'Acceptance criteria', 'Test strategy'],
      },
      {
        milieu: 'Electric mobility service',
        enjeu: "Services that talk to each other, by contract.",
        recit: "API design for a distributed architecture, interface contracts between services, automated testing and team training.",
        cles: ['API contracts', 'Distributed architecture', 'Automated testing', 'Training'],
      },
      {
        milieu: 'Direct clients',
        enjeu: "One point of contact, from budget to launch.",
        recit: "Projects run end to end with often non-technical clients: trade-offs, user flows, mockups, development, training and support.",
        cles: ['Budget and trade-offs', 'User flows', 'Mockups', 'Training', 'Support'],
      },
    ],
  },
  convictions: {
    titre: 'Six convictions, each backed by an example',
    items: [
      { titre: 'A written decision beats a meeting', texte: "A decision you can't look back on doesn't exist — it gets reopened, flipped, and decided differently again in six months. What gets decided gets written down, with the reason why." },
      { titre: 'Set the constraint early, or pay for a rebuild', texte: 'Deciding a number will always be shown as an estimate costs nothing during scoping. Found after development, that same detail means reworking every screen.' },
      { titre: 'A good abstraction removes more code than it adds', texte: 'Treating a carpool group as just another account — one that advances money, collects it, and pays it back — made the driver disappear as a special case.' },
      { titre: "Friction belongs only where it's earned", texte: "Reporting a found animal doesn't require an account. Reporting a loss does, and the screen explains why. A rule that explains itself stops feeling like a burden." },
      { titre: 'One finished slice beats five half-done', texte: "A product at sixty percent can't be shown, tested, or fixed. User flows ship complete, one at a time." },
      { titre: 'Visible care tells you about the rest', texte: "Users can't judge an architecture. They judge the load time, the alignment, the error message — and from that, they infer the quality of what they can't see." },
    ],
  },
  outils: {
    titre: 'What it’s built with',
    lead: "A technology gets chosen for the problem, not for a résumé. Here are the ones used most, and why.",
    items: [
      { titre: 'Mobile', texte: 'Native iOS (Swift, SwiftUI), Android, cross-platform when the need justifies it.' },
      { titre: 'Web', texte: 'Astro, TypeScript, static rendering whenever possible. This site is one example.' },
      { titre: 'Back end and data', texte: 'Typed APIs, explicit interface contracts, versioned migrations, tests on business logic.' },
      { titre: 'Project management', texte: 'Breaking work into deliverable slices, prioritization you can follow, acceptance testing together. Certified Professional Scrum Product Owner (PSPO I).' },
    ],
  },
  appel: { titre: 'Shall we talk?', texte: "Describe your project in a few sentences. The first call doesn't commit you to anything." },
};

const textes: Record<Langue, typeof fr> = { fr, en };
export default textes;
