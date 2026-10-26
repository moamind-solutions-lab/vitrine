#!/usr/bin/env node
/**
 * The disposable email domains refused by the contact form.
 *
 * `npm run update-disposable-domains` downloads the public lists below, merges them and writes
 * src/data/disposable-domains.txt (committed, so builds stay reproducible offline). At build time,
 * disposableDomainsPhp() turns that file into dist/disposable-domains.php, read by envoi.php.
 *
 * envoi.php also refuses every subdomain of a listed domain: that is why public suffixes (edu.pl,
 * co.id…) are removed from the list, except the free ones disposable services rely on.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export const LIST_PATH = new URL('../src/data/disposable-domains.txt', import.meta.url);

const GITHUB = 'https://raw.githubusercontent.com';
export const SOURCES = [
  `${GITHUB}/disposable-email-domains/disposable-email-domains/main/disposable_email_blocklist.conf`,
  `${GITHUB}/disposable/disposable-email-domains/master/domains.txt`,
  `${GITHUB}/FGRibreau/mailchecker/master/list.txt`,
  `${GITHUB}/wesbos/burner-email-providers/master/emails.txt`,
  `${GITHUB}/7c/fakefilter/main/txt/data.txt`,
  `${GITHUB}/ivolo/disposable-email-domains/master/index.json`,
  `${GITHUB}/groundcat/disposable-email-domain-list/master/domains.txt`,
  `${GITHUB}/unkn0w/disposable-email-domain-list/main/domains.txt`,
  `${GITHUB}/amieiro/disposable-email-domains/master/denyDomains.txt`,
];

/** Domains the sources themselves flag as false positives. */
export const ALLOW_SOURCES = [`${GITHUB}/amieiro/disposable-email-domains/master/allowDomains.txt`];

export const PUBLIC_SUFFIX_LIST = 'https://publicsuffix.org/list/public_suffix_list.dat';

/** Free subdomain registries massively used by disposable services: all their subdomains are refused. */
export const BLOCKED_SUFFIXES = ['web.id', 'my.id', 'biz.id'];

/** Domains reported by hand, missing from the public lists. */
export const EXTRA = ['northmail.web.id'];

/**
 * Real providers some sources list by mistake, and relays (Apple, DuckDuckGo, Firefox, Proton…)
 * that forward to a person's real mailbox and let us reply.
 */
export const PROTECTED = [
  'gmail.com', 'googlemail.com', 'outlook.com', 'outlook.fr', 'hotmail.com', 'hotmail.fr', 'live.com', 'live.fr', 'msn.com',
  'yahoo.com', 'yahoo.fr', 'ymail.com', 'icloud.com', 'me.com', 'mac.com', 'aol.com',
  'orange.fr', 'wanadoo.fr', 'free.fr', 'sfr.fr', 'neuf.fr', 'laposte.net', 'bbox.fr', 'numericable.fr', 'aliceadsl.fr',
  'proton.me', 'protonmail.com', 'pm.me', 'gmx.com', 'gmx.fr', 'gmx.de', 'web.de', 'mail.com', 'mail.ru', 'yandex.com', 'yandex.ru',
  'qq.com', '163.com', 'naver.com', 'zoho.com', 'tutanota.com', 'tuta.io', 'fastmail.com', 'posteo.de', 'mailfence.com', 'mailo.com',
  'privaterelay.appleid.com', 'duck.com', 'mozmail.com', 'simplelogin.com', 'simplelogin.co', 'slmail.me', 'passmail.net', 'passinbox.com',
  'addy.io', 'anonaddy.com', 'anonaddy.me', 'aleeas.com',
];

const DOMAIN = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/;

/** One domain per entry, from a plain text, .conf or JSON list. */
export function parseList(text) {
  return text
    .split(/[\n,]/)
    .map((line) => line.replace(/[\s"[\]]/g, '').toLowerCase())
    .filter((line) => DOMAIN.test(line));
}

/** Merged, sorted list without public suffixes (except the blocked ones), allowed or protected domains. */
export function buildList({ sources, publicSuffixes = [], allowed = [], extra = [] }) {
  const removed = new Set([...publicSuffixes.filter((s) => !BLOCKED_SUFFIXES.includes(s)), ...allowed, ...PROTECTED]);
  const domains = new Set([...sources.flat(), ...extra].filter((d) => !removed.has(d)));
  return [...domains].sort();
}

/** The Public Suffix List, wildcards and exceptions reduced to their suffix. */
export function parsePublicSuffixes(text) {
  return text
    .split('\n')
    .map((line) => line.trim().replace(/^[*!]\./, '').replace(/^!/, ''))
    .filter((line) => line && !line.startsWith('//'));
}

/** PHP file returning the domains as array keys: opcache keeps it in memory, isset() is instant. */
export function disposableDomainsPhp(domains) {
  return `<?php\n// Generated at build time from src/data/disposable-domains.txt: do not edit by hand.\nreturn [\n${domains.map((d) => `'${d}'=>1,`).join('\n')}\n];\n`;
}

export function readList() {
  return readFileSync(LIST_PATH, 'utf8').split('\n').filter(Boolean);
}

async function download(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response.text();
}

async function update() {
  const sources = await Promise.all(SOURCES.map(async (url) => {
    const list = parseList(await download(url));
    console.log(`${list.length.toString().padStart(7)}  ${url}`);
    return list;
  }));
  const allowed = (await Promise.all(ALLOW_SOURCES.map(download))).flatMap(parseList);
  const publicSuffixes = parsePublicSuffixes(await download(PUBLIC_SUFFIX_LIST));
  const list = buildList({ sources, publicSuffixes, allowed, extra: [...BLOCKED_SUFFIXES, ...EXTRA] });
  writeFileSync(LIST_PATH, `${list.join('\n')}\n`);
  console.log(`${list.length} disposable domains written to src/data/disposable-domains.txt.`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await update();
