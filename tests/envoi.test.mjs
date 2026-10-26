// Runs the generated envoi.php in a real PHP (WebAssembly) with mail() and DNS replaced by stubs.
import { test, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { loadNodeRuntime } from '@php-wasm/node';
import { PHP } from '@php-wasm/universal';
import { envoi, INCIDENT_RECIPIENT } from '../scripts/envoi.mjs';
import { disposableDomainsPhp } from '../scripts/disposable-domains.mjs';

const RECIPIENT = 'inbox@example.org';
const MAILS = '/tmp/mails.jsonl';
let php;

before(async () => {
  php = new PHP(await loadNodeRuntime('8.3', { emscriptenOptions: { processId: 1 } }));
  php.mkdir('/www');
  php.writeFile('/www/envoi.php', envoi('fr', RECIPIENT));
  php.writeFile('/www/disposable-domains.php', disposableDomainsPhp(['yopmail.com', 'web.id']));
  php.writeFile('/www/test.php', `<?php
function deliver($to, $subject, $body, $replyTo = null) {
  file_put_contents('${MAILS}', json_encode(compact('to', 'subject', 'body', 'replyTo')) . "\\n", FILE_APPEND);
  return true;
}
function domain_accepts_mail($domain) { return $domain !== 'nowhere.example'; }
define('STATE_DIR', '/tmp/state');
require __DIR__ . '/envoi.php';
`);
});
after(() => php.exit());
beforeEach(() => {
  for (const path of [MAILS, ...listTmp()]) if (php.fileExists(path) && !php.isDir(path)) php.unlink(path);
});

function listTmp(dir = '/tmp') {
  return php.listFiles(dir).flatMap((name) => {
    const path = `${dir}/${name}`;
    return php.isDir(path) ? listTmp(path) : [path];
  });
}

/** Posts the form from `ip`, as the page's script does unless `json` is false. */
async function post(email, { ip = '203.0.113.7', json = true } = {}) {
  const fields = { profil: 'Un particulier', nom: 'Camille Martin', email, message: 'Bonjour' };
  const response = await php.run({
    scriptPath: '/www/test.php',
    method: 'POST',
    body: new TextEncoder().encode(new URLSearchParams(fields).toString()),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...(json ? { Accept: 'application/json' } : {}) },
    $_SERVER: { REMOTE_ADDR: ip },
  });
  return { status: response.httpStatusCode, body: json ? JSON.parse(response.text) : null, location: response.headers.location?.[0] };
}

const mails = () => (php.fileExists(MAILS) ? php.readFileAsText(MAILS).trim().split('\n').map((l) => JSON.parse(l)) : []);

test('a regular address goes through', async () => {
  const response = await post('camille@gmail.com');
  assert.deepEqual(response, { status: 200, body: { ok: true }, location: undefined });
  assert.equal(mails().length, 1);
  assert.equal(mails()[0].to, RECIPIENT);
  assert.equal(mails()[0].replyTo, 'camille@gmail.com');
});

test('a listed disposable domain is refused with the email reason', async () => {
  assert.deepEqual((await post('fraud@yopmail.com')).body, { ok: false, reason: 'email' });
  assert.equal(mails().length, 0);
});

test('a subdomain of a blocked domain is refused, whatever its case', async () => {
  assert.equal((await post('fraud@NorthMail.Web.ID')).body.reason, 'email');
  assert.equal((await post('x@deep.sub.yopmail.com')).body.reason, 'email');
});

test('a domain that cannot receive mail is refused', async () => {
  assert.equal((await post('camille@nowhere.example')).body.reason, 'email');
});

test('a malformed address is refused with the email reason', async () => {
  assert.equal((await post('not-an-address')).body.reason, 'email');
});

test('without JavaScript, a refused address leads back to the email error', async () => {
  const response = await post('fraud@yopmail.com', { json: false });
  assert.equal(response.status, 303);
  assert.equal(response.location, 'https://moamind-solutions.fr/contact/#email-error');
});

test('the fifth refused address from one visitor alerts the incident address, once', async () => {
  for (let i = 1; i <= 4; i++) await post(`fraud${i}@yopmail.com`);
  assert.equal(mails().length, 0);
  await post('fraud5@northmail.web.id');
  assert.equal(mails().length, 1);
  const [alert] = mails();
  assert.equal(alert.to, INCIDENT_RECIPIENT);
  assert.equal(alert.replyTo, null);
  assert.match(alert.subject, /fausse adresse/);
  assert.match(alert.body, /203\.0\.113\.7/);
  assert.match(alert.body, /fraud1@yopmail\.com/);
  assert.match(alert.body, /fraud5@northmail\.web\.id/);
  for (let i = 6; i <= 8; i++) await post(`fraud${i}@yopmail.com`);
  assert.equal(mails().length, 1);
});

test('refusals are counted per visitor', async () => {
  for (let i = 1; i <= 4; i++) await post(`fraud${i}@yopmail.com`, { ip: '198.51.100.1' });
  for (let i = 1; i <= 4; i++) await post(`fraud${i}@yopmail.com`, { ip: '198.51.100.2' });
  assert.equal(mails().length, 0);
});

test('the counters keep no raw IP address on disk', async () => {
  await post('fraud@yopmail.com');
  const files = listTmp();
  assert.ok(files.length > 0);
  for (const path of files) {
    assert.doesNotMatch(path, /203\.0\.113\.7/);
    assert.doesNotMatch(php.readFileAsText(path), /203\.0\.113\.7/);
  }
});

test('IPv6 visitors rotating within their /64 are counted as one', async () => {
  for (let i = 1; i <= 5; i++) await post(`fraud${i}@yopmail.com`, { ip: `2001:db8:1:2::${i}` });
  assert.equal(mails().length, 1);
});

test('no more than ten incident mails leave per day, whatever the number of visitors', async () => {
  for (let visitor = 1; visitor <= 12; visitor++) {
    for (let i = 1; i <= 5; i++) await post(`fraud${i}@yopmail.com`, { ip: `192.0.2.${visitor}` });
  }
  assert.equal(mails().length, 10);
});

test('an incomplete message is refused before the address is checked', async () => {
  const response = await php.run({
    scriptPath: '/www/test.php',
    method: 'POST',
    body: new TextEncoder().encode(new URLSearchParams({ nom: 'Camille', email: 'fraud@yopmail.com', message: '' }).toString()),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
  });
  assert.deepEqual(JSON.parse(response.text), { ok: false });
});

test('counters are kept in the account home, outside both web roots', () => {
  assert.match(envoi('fr', RECIPIENT), /define\('STATE_DIR', dirname\(__DIR__, 1\) \. '\/moamind-contact'\)/);
  assert.match(envoi('en', RECIPIENT), /define\('STATE_DIR', dirname\(__DIR__, 2\) \. '\/moamind-contact'\)/);
});

test('incident recipient is the technical address', () => {
  assert.equal(INCIDENT_RECIPIENT, 'technical-incident@moamind-solutions.com');
});
