import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildList, parseList, BLOCKED_SUFFIXES, PROTECTED } from '../scripts/disposable-domains.mjs';

test('parseList reads plain text, .conf and JSON lists alike', () => {
  assert.deepEqual(parseList('# comment\nFoo.com\r\n\nbar.org\n'), ['foo.com', 'bar.org']);
  assert.deepEqual(parseList('[\n  "a.com",\n  "b.net"\n]'), ['a.com', 'b.net']);
  assert.deepEqual(parseList('not a domain\n.x\nok.io'), ['ok.io']);
});

test('buildList merges, dedupes and sorts every source', () => {
  const list = buildList({ sources: [['b.com', 'a.com'], ['a.com', 'c.com']] });
  assert.deepEqual(list, ['a.com', 'b.com', 'c.com']);
});

test('buildList drops public suffixes, which would block whole registries, but keeps the blocked ones', () => {
  const list = buildList({ sources: [['edu.pl', 'web.id', 'spam.com']], publicSuffixes: ['edu.pl', 'web.id'] });
  assert.deepEqual(list, ['spam.com', 'web.id']);
});

test('buildList drops allowed and protected providers, and adds the extra domains', () => {
  const list = buildList({ sources: [['gmail.com', 'mail.ru', 'fine.org', 'spam.com']], allowed: ['fine.org'], extra: ['northmail.web.id'] });
  assert.deepEqual(list, ['northmail.web.id', 'spam.com']);
});

test('the protected providers include the main French and relay addresses', () => {
  for (const domain of ['gmail.com', 'orange.fr', 'free.fr', 'laposte.net', 'privaterelay.appleid.com']) assert.ok(PROTECTED.includes(domain), domain);
  for (const suffix of ['web.id', 'my.id', 'biz.id']) assert.ok(BLOCKED_SUFFIXES.includes(suffix), suffix);
});

test('the committed list blocks the address that reached us, and no major provider', () => {
  const list = new Set(readFileSync(new URL('../src/data/disposable-domains.txt', import.meta.url), 'utf8').split('\n'));
  assert.ok(list.size > 100000, `only ${list.size} domains`);
  for (const domain of ['web.id', 'yopmail.com', 'mailinator.com', 'guerrillamail.com']) assert.ok(list.has(domain), domain);
  for (const domain of [...PROTECTED, 'edu.pl', 'co.uk', 'com.br']) assert.ok(!list.has(domain), domain);
});
