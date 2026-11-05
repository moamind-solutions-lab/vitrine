# Journal d'exécution

## 2026-10-26 — Filtre des adresses jetables

Formulaire de contact : refus des adresses jetables (liste de 213 869 domaines
issue de neuf sources), des sous-domaines de `web.id`, `my.id` et `biz.id`, et
des domaines sans serveur de mail. Message « Essayez avec une autre adresse
mail ». Alerte vers technical-incident@moamind-solutions.com au 5ᵉ refus en
24 heures. Tests PHP via `@php-wasm/node`. Décision : `docs/adr/0001-disposable-email-filter.md`.

## 2026-10-26 — Filtre des adresses jetables : validé en ligne

Publié sur moamind-solutions.fr et moamind-solutions.com (PR #1). Vérifié par
l'utilisateur : le message « Essayez avec une autre adresse mail » s'affiche sur
le site français, « Try another email address » sur le site anglais, et l'alerte
arrive sur technical-incident@moamind-solutions.com au 5ᵉ essai.

## 2026-11-05 — Lien Google Play de Pil'Poil

L'application Pil'Poil est publiée sur Google Play. Sur son étude de cas, le
badge Google Play devient un lien vers
https://play.google.com/store/apps/details?id=fr.moamind.pilpoil, à pleine
opacité et sans le bandeau « Bientôt ». Le badge App Store reste inactif. Les
URL des magasins se renseignent par produit (`magasins` dans
`src/data/produits.ts`) ; un test vérifie leur forme.
