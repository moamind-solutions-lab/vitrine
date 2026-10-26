# 0001 — Filtrer les adresses jetables côté serveur

Date : 2026-10-26

## Contexte

Un message frauduleux est arrivé par le formulaire de contact depuis une adresse
jetable (`@northmail.web.id`). Il faut refuser ces adresses et être prévenu
quand quelqu'un insiste.

## Décision

- Le filtre vit dans `envoi.php`, seul point qu'un fraudeur ne peut pas
  contourner. La page n'embarque pas la liste (3 Mo) : elle affiche le message
  quand le serveur répond `reason: "email"`.
- La liste fusionne neuf sources publiques, versionnée pour des builds
  reproductibles et rafraîchie à la main (`npm run update-disposable-domains`).
- Un domaine est refusé s'il est listé ou si l'un de ses parents l'est. Pour que
  ce soit sûr, les suffixes publics sont retirés, sauf `web.id`, `my.id` et
  `biz.id`, massivement utilisés par les services jetables.
- Un domaine sans enregistrement MX, A ou AAAA est refusé aussi : il ne peut
  recevoir aucune réponse.
- Les relais (Apple « Masquer mon adresse », DuckDuckGo, Firefox Relay, Proton
  SimpleLogin, addy.io) restent acceptés : ils mènent à une vraie boîte et
  permettent de répondre.
- L'alerte part au 5ᵉ refus en 24 heures d'une même IP (d'un même préfixe /64
  en IPv6, qu'un fraudeur peut faire tourner), une seule fois, et dix alertes au
  plus par jour au total. Les compteurs sont stockés dans `~/moamind-contact/`,
  hors des dossiers publiés, dossier refusé s'il est un lien ou appartient à un
  autre compte, sous une empreinte salée de l'IP, et expirent après 24 heures
  (RGPD : minimisation).
- Le nom et le message sont vérifiés avant l'adresse : seul un message complet
  coûte une requête DNS.

## Conséquences

- Une panne DNS chez l'hébergeur ferait refuser des adresses valides.
- Les nouveaux services jetables passent tant que la liste n'est pas rafraîchie
  ou complétée dans `EXTRA`.
