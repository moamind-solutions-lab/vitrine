# Pages légales et support de Zébré

Les pages de `public/legal/zebre/` partent avec le site à chaque `push` sur `main`, sur le domaine français, comme
celles de Pil'Poil (le `.htaccess` marque tout `/legal/` en `noindex`, et aucune page du site n'y renvoie) :

- Sommaire : `https://moamind-solutions.fr/legal/zebre/`
- Politique de confidentialité (App Store Connect, et lien dans l'app) : `https://moamind-solutions.fr/legal/zebre/politique-de-confidentialite.html`
- Support (App Store Connect) : `https://moamind-solutions.fr/legal/zebre/support.html`
- CGU : `https://moamind-solutions.fr/legal/zebre/conditions-generales.html`
- Mentions légales : `https://moamind-solutions.fr/legal/zebre/mentions-legales.html`

**Ne pas les modifier ici.** La source est `docs/legal/zebre/*.md` dans le dépôt Agon ; les pages se régénèrent avec
`python3 scripts/construire-pages-legales.py` (ou `--date AAAA-MM-JJ` pour redater les trois textes), puis se
recopient ici depuis `Agon/docs/legal/zebre/pages/`.
