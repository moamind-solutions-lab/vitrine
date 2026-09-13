import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ROUTES, LANGUES, DOMAINES, SANS_INDEX, chemin } from '../src/i18n/routes.ts';
import { produits, localiser } from '../src/data/produits.ts';
import { accueil as donneesAccueil, filAriane } from '../src/lib/donnees-structurees.ts';

const SUFFIXE = ' · Moamind Solutions';
/** Au-delà, Google coupe le titre ; le suffixe de marque peut disparaître, pas le sujet. */
const TITRE_MAX = 70;
const DESCRIPTION_MAX = 160;

test('chaque adresse finit par une barre : Apache redirigerait l’adresse sans barre', () => {
  for (const page of Object.keys(ROUTES)) {
    for (const l of LANGUES) assert.match(chemin(page, l, 'x'), /\/$/, `${page}.${l}`);
  }
});

test('les pages de confirmation ne sont pas indexées', () => {
  assert.ok(SANS_INDEX.includes('merci'));
  assert.ok(!SANS_INDEX.includes('accueil'));
});

const pagesAvecMeta = ['methode', 'realisations', 'experience', 'contact', 'mentions'];
for (const module of pagesAvecMeta) {
  test(`${module} : titre et description tiennent dans un résultat Google`, async () => {
    const { default: textes } = await import(`../src/i18n/${module}.ts`);
    for (const l of LANGUES) {
      const { titre, description } = textes[l].meta;
      assert.ok((titre + SUFFIXE).length <= TITRE_MAX, `${module}.${l} : « ${titre} » trop long`);
      assert.ok(description.length <= DESCRIPTION_MAX, `${module}.${l} : description de ${description.length} caractères`);
    }
  });
}

test('accueil : le titre dit ce que fait le studio, et tient dans un résultat Google', async () => {
  const { default: commun } = await import('../src/i18n/commun.ts');
  for (const l of LANGUES) {
    const titre = commun[l].titreAccueil + SUFFIXE;
    assert.ok(titre.length <= TITRE_MAX, `${l} : ${titre.length} caractères`);
    assert.match(commun[l].titreAccueil, l === 'fr' ? /applications web et mobiles/i : /web and mobile app/i);
    assert.ok(commun[l].description.length <= DESCRIPTION_MAX, l);
  }
});

test('études de cas : titre sans suffixe et description dans les limites', () => {
  for (const p of produits) {
    for (const l of LANGUES) {
      const q = localiser(p, l);
      assert.ok(`${q.nom} — ${q.baseline}`.length <= 60, `${p.slug}.${l}`);
      assert.ok(q.resume.length <= DESCRIPTION_MAX, `${p.slug}.${l}`);
    }
  }
});

test('données structurées de l’accueil : une seule organisation pour les deux domaines', () => {
  const studio = { nom: 'Moamind Solutions', ville: 'Bordeaux', description: 'Description.', slogan: 'Le produit avant le code' };
  const fr = donneesAccueil('fr', studio);
  const en = donneesAccueil('en', { ...studio, slogan: 'Product before code' });
  assert.equal(fr['@context'], 'https://schema.org');
  const orgFr = fr['@graph'].find((n) => n['@type'] === 'Organization');
  const orgEn = en['@graph'].find((n) => n['@type'] === 'Organization');
  assert.equal(orgFr['@id'], orgEn['@id']);
  assert.equal(orgFr.url, `${DOMAINES.fr}/`);
  assert.equal(orgFr.address.addressLocality, 'Bordeaux');
  const siteEn = en['@graph'].find((n) => n['@type'] === 'WebSite');
  assert.equal(siteEn.url, `${DOMAINES.en}/`);
  assert.equal(siteEn.inLanguage, 'en');
  assert.equal(siteEn.publisher['@id'], orgEn['@id']);
});

test('fil d’Ariane : adresses absolues sur le domaine de la langue, positions dans l’ordre', () => {
  const fil = filAriane('en', [{ nom: 'Work', page: 'realisations' }, { nom: 'Teamago', page: 'etude', slug: 'teamago' }]);
  assert.equal(fil['@type'], 'BreadcrumbList');
  assert.deepEqual(fil.itemListElement.map((e) => [e.position, e.name, e.item]), [
    [1, 'Work', 'https://moamind-solutions.com/work/'],
    [2, 'Teamago', 'https://moamind-solutions.com/work/teamago/'],
  ]);
});
