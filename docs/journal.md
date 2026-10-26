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
