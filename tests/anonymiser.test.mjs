import { test } from 'node:test';
import assert from 'node:assert/strict';
import { anonymiser } from '../scripts/anonymiser.mjs';

test('remplace le club', () => {
  assert.equal(anonymiser('<p>Association Les Cabots</p>'), '<p>Association Les Hérons</p>');
});

test('laisse les personnes fictives des maquettes, pastille comprise', () => {
  const html = '<span>PA</span><b>Perrin Antoine</b><p>Antoine, Wilfried, Simon, Océane</p>';
  assert.equal(anonymiser(html), html);
});
