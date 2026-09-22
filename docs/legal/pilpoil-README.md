# Pages légales et support — dépôt sur o2switch

> **Dans ce dépôt**, les pages vivent dans `public/legal/pilpoil/` et partent avec le site
> à chaque `push` sur `main` : les sections « Où les déposer » et « URLs » ci-dessous sont
> remplacées par ces adresses, sur le domaine français (aucune page du site n'y renvoie, et
> le `.htaccess` les marque `noindex`) :
>
> - Sommaire : `https://moamind-solutions.fr/legal/pilpoil/`
> - Politique de confidentialité (App Store Connect) : `https://moamind-solutions.fr/legal/pilpoil/politique-de-confidentialite.html`
> - Support (App Store Connect) : `https://moamind-solutions.fr/legal/pilpoil/support.html`
> - CGU : `https://moamind-solutions.fr/legal/pilpoil/conditions-generales.html`
> - Mentions légales : `https://moamind-solutions.fr/legal/pilpoil/mentions-legales.html`
>
> Pour les mettre à jour, régénérer les pages dans le projet Pil'Poil puis les recopier ici.

Ce dossier contient cinq pages HTML autonomes (aucune dépendance externe,
CSS en ligne), prêtes à être déposées telles quelles sur l'hébergement
mutualisé o2switch qui porte déjà le domaine `moamind-solutions.com` (boîtes
mail `contact@`, `support@`, `noreply@`, `technical-incident@`, DNS de
`api.moamind-solutions.com`) :

- `index.html` — sommaire, renvoie vers les quatre autres pages
- `politique-de-confidentialite.html`
- `conditions-generales.html`
- `mentions-legales.html`
- `support.html`

**Les trois pages légales sont générées**, jamais écrites à la main :

    python3 scripts/build-legal-pages.py
    python3 scripts/build-legal-pages.py --date 2026-10-02

La seconde forme **redate les trois textes puis les publie**. C'est le geste du
jour de la mise en ligne : le client a demandé le 2026-09-20 que la date de ces
documents soit celle du déploiement de l'archive, pas celle de leur rédaction
(`PUB-64`). À lancer avant de déposer les pages **et** avant de construire
l'archive, puisque les `.md` partent dans le paquet de l'application.

Il rend `docs/legal/*.md` — la source de vérité, embarquée telle quelle dans
l'application iOS via `ios/project.yml` — en HTML, avec un gabarit unique.
C'est ce qui garantit les deux choses que le client a demandées le
2026-09-20 : **les trois documents ont la même mise en page**, et le texte
publié en ligne est mot pour mot celui que l'application affiche. Modifier une
page HTML à la main la ferait diverger dès la génération suivante — c'est le
`.md` qu'on modifie, puis on relance le script.

`index.html` et `support.html` ne sont **pas** générées : elles ne dérivent
d'aucun texte légal. `support.html` décrit le fonctionnement réel du code (voir
plus bas).

## Où les déposer

`docs/superpowers/specs/2026-09-19-mise-en-ligne-testflight-design.md` prévoit
déjà que `moamind-solutions.com` héberge, chez o2switch, le site vitrine et la
politique de confidentialité — ce dossier est pensé pour ce même hébergement.

1. Se connecter au **cPanel o2switch** du compte qui porte `moamind-solutions.com`.
2. Ouvrir le **Gestionnaire de fichiers** (ou se connecter en FTP/SFTP avec les
   identifiants du compte).
3. Aller dans `public_html/` — la racine du site `moamind-solutions.com`.
4. Créer un dossier `legal/` à cet endroit (s'il n'existe pas déjà).
5. Déposer les cinq fichiers `.html` de ce dossier directement dans
   `public_html/legal/` (pas de sous-dossier supplémentaire, pas d'autre
   fichier à transférer : chaque page est autonome).

Aucune configuration serveur particulière n'est nécessaire : ce sont des
fichiers HTML statiques, sans base de données ni script côté serveur.

## URLs qui en résultent

Une fois déposées à cet emplacement :

| Page | URL |
|---|---|
| Sommaire | `https://moamind-solutions.com/legal/` |
| Politique de confidentialité | `https://moamind-solutions.com/legal/politique-de-confidentialite.html` |
| Conditions générales d'utilisation | `https://moamind-solutions.com/legal/conditions-generales.html` |
| Mentions légales | `https://moamind-solutions.com/legal/mentions-legales.html` |
| Support | `https://moamind-solutions.com/legal/support.html` |

Ce sont ces deux URLs qu'il faut renseigner dans **App Store Connect** :

- **Politique de confidentialité (`PUB-70`)** :
  `https://moamind-solutions.com/legal/politique-de-confidentialite.html`
- **Page de support (`PUB-62`)** :
  `https://moamind-solutions.com/legal/support.html`

(Un certificat TLS valide sur `moamind-solutions.com` est nécessaire pour que
ces URLs fonctionnent en `https://` — o2switch en fournit un gratuitement via
Let's Encrypt/AutoSSL depuis le cPanel, à activer si ce n'est pas déjà fait.)

## État : publiable

**Les trois textes sont passés en version 1.0 le 2026-09-20**, sur demande du
client : plus aucun encart « brouillon », plus aucun point en attente, une date
de mise à jour réelle.

Le dernier point ouvert — l'adresse du siège de l'hébergeur o2switch — a été
tranché ce jour-là par le client : **Chemin des Pardiaux, 63000
Clermont-Ferrand**. Les informations de société des trois personnes morales
citées (MOAMIND SOLUTIONS, OVH, O2SWITCH) ont été vérifiées sur societe.com le
2026-09-20 et complétées : forme juridique, capital, SIREN, SIRET du siège,
greffe du RCS.

Les durées de conservation sont annoncées au présent parce que le code les
applique : `DataRetentionJob` tourne toutes les nuits à 4 h 00 (heure de
Paris), `ThreadRetentionJob` à 3 h 30. Ce que la page annonce, le code le fait.

**Le signalement ne renvoie plus à une adresse e-mail** (demande du client du
2026-09-20) : les CGU et les mentions légales renvoient au geste intégré à
chaque annonce et conversation, puis à l'écran **Profil → Signaler un
problème**. `contact@` reste l'adresse de contact général, dans les mentions
légales et la politique de confidentialité.

## `support.html` — ce qu'elle décrit réellement

Le contenu de cette page n'est pas un texte légal repris de `docs/legal/` :
je l'ai écrit à partir du fonctionnement réel du code, vérifié à la source :

- **Contact général** : `contact@moamind-solutions.com`, le même que celui
  affiché dans l'app (`SupportContact`, écran Profil → « Confidentialité et conditions », où l'adresse s'ouvre dans Mail et se copie).
- **Signalement d'un contenu** : le menu « … » de chaque
  annonce/conversation, traité par un modérateur sous 24 h comme l'annoncent
  les CGU (`ModerationService`, alerte vers `support@moamind-solutions.com`
  côté interne — l'adresse publique de secours reste `contact@`, conforme à
  `docs/legal/mentions-legales.md`).
- **Suppression de compte** : la vraie procédure en libre-service,
  `Profil → Profil → menu « … » → Supprimer mon compte`, qui appelle
  `DELETE /api/users/me` côté serveur (`UserErasureService`) — effacement
  immédiat et définitif du compte, des animaux et photos, des messages, des
  jetons d'appareil ; clôture des annonces et retrait des coordonnées de
  contact qu'elles portaient ; fermeture des conversations avec mention
  « Compte supprimé » côté interlocuteur. Le recours par e-mail
  (`contact@moamind-solutions.com`) n'est proposé que comme filet de
  sécurité pour qui ne peut plus accéder à l'application — ce n'est pas le
  chemin normal, qui est en libre-service dans l'app.
