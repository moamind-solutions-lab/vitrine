/**
 * Le script qui envoie les messages du formulaire de contact, un par domaine : dist/envoi.php
 * (moamind-solutions.fr) et dist/en/envoi.php (moamind-solutions.com). Il tourne chez o2switch et
 * rédige le mail en français, quelle que soit la langue du visiteur.
 */
import { DOMAINES, chemin } from '../src/i18n/routes.ts';
import contact from '../src/i18n/contact.ts';

/** Adresse d'où partent les messages : un domaine du site, dont SPF et DKIM sont configurés chez o2switch. */
export const EXPEDITEUR = 'new-project@moamind-solutions.com';

/** Alerted when one visitor keeps trying fake addresses. */
export const INCIDENT_RECIPIENT = 'technical-incident@moamind-solutions.com';

/** Les champs d'une ligne, dans l'ordre du mail : nom dans le formulaire, intitulé, longueur maximale. */
const CHAMPS = [
  ['profil', 'Profil', 100],
  ['nom', 'Nom', 200],
  ['organisation', 'Organisation', 200],
  ['email', 'Adresse e-mail', 254],
  ['nature', 'Nature du projet', 100],
  ['echeance', 'Échéance souhaitée', 100],
  ['budget', 'Budget envisagé', 100],
];

/** Chaîne PHP entre apostrophes. */
const php = (texte) => `'${texte.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

export function envoi(langue, destinataire) {
  const domaine = DOMAINES[langue];
  const site = `${langue === 'fr' ? 'site français' : 'site anglais'} (${new URL(domaine).host})`;

  return `<?php
// Généré par scripts/preparer-domaines.mjs à chaque build : ne pas modifier à la main.
// Reçoit le formulaire de contact de ${domaine} et l'envoie par mail, rédigé en français.

const DESTINATAIRE = ${php(destinataire)};
const EXPEDITEUR = ${php(EXPEDITEUR)};
const INCIDENT_RECIPIENT = ${php(INCIDENT_RECIPIENT)};
const SITE = ${php(site)};
// Refused addresses from one visitor, within the window, that trigger the incident alert.
const ALERT_THRESHOLD = 5;
const ALERT_WINDOW = 86400;
const CONTACT = ${php(domaine + chemin('contact', langue))};
const MERCI = ${php(domaine + chemin('merci', langue))};
const CHAMPS = [
${CHAMPS.map(([nom, intitule, max]) => `  [${php(nom)}, ${php(intitule)}, ${max}],`).join('\n')}
];

/**
 * JSON pour l'envoi en arrière-plan de la page Contact ; redirection pour un navigateur sans JavaScript.
 * $reason 'email' tells the page to ask for another address.
 */
function repondre($ok, $reason = null) {
  if (strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false) {
    http_response_code($ok ? 200 : 400);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($reason === null ? ['ok' => $ok] : ['ok' => $ok, 'reason' => $reason]);
  } else {
    header('Location: ' . ($ok ? MERCI : CONTACT . ($reason === 'email' ? '#email-error' : '#erreur-envoi')), true, 303);
  }
  exit;
}

// The tests define deliver() and domain_accepts_mail() before loading this file.
if (!function_exists('deliver')) {
  /** Plain-text mail in UTF-8 from EXPEDITEUR; "Reply" writes to $replyTo when given. */
  function deliver($to, $subject, $body, $replyTo = null) {
    $headers = ['From' => 'Site Moamind Solutions <' . EXPEDITEUR . '>'];
    if ($replyTo !== null) $headers['Reply-To'] = $replyTo;
    $headers += ['MIME-Version' => '1.0', 'Content-Type' => 'text/plain; charset=UTF-8', 'Content-Transfer-Encoding' => 'quoted-printable'];
    return mail($to, mb_encode_mimeheader($subject, 'UTF-8', 'B', "\\r\\n"), quoted_printable_encode($body), $headers, '-f' . EXPEDITEUR);
  }
}
if (!function_exists('domain_accepts_mail')) {
  /** True when the domain has a mail server, or the address record mail falls back to (RFC 5321). */
  function domain_accepts_mail($domain) {
    return checkdnsrr($domain . '.', 'MX') || checkdnsrr($domain . '.', 'A') || checkdnsrr($domain . '.', 'AAAA');
  }
}

/** True when the domain, or one of its parent domains, is in the disposable list. */
function is_disposable($domain) {
  $list = require __DIR__ . '/disposable-domains.php';
  $labels = explode('.', $domain);
  for ($i = 0; $i < count($labels) - 1; $i++) {
    if (isset($list[implode('.', array_slice($labels, $i))])) return true;
  }
  return false;
}

/** True for a malformed address, a disposable domain, or a domain that cannot receive mail. */
function email_refused($email) {
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) return true;
  $domain = strtolower(substr(strrchr($email, '@'), 1));
  return is_disposable($domain) || !domain_accepts_mail($domain);
}

/**
 * Records a refused address for this visitor and returns ['count' => …, 'emails' => […]] for the window.
 * The visitor is known by a salted hash of their IP address only; expired counters are erased.
 */
function record_rejection($email) {
  $dir = sys_get_temp_dir() . '/moamind-contact';
  if (!is_dir($dir)) @mkdir($dir, 0700, true);
  $saltFile = $dir . '/salt';
  if (!is_file($saltFile)) file_put_contents($saltFile, bin2hex(random_bytes(32)));
  foreach (glob($dir . '/*.json') ?: [] as $old) {
    if (filemtime($old) < time() - ALERT_WINDOW) @unlink($old);
  }
  $visitor = hash_hmac('sha256', $_SERVER['REMOTE_ADDR'] ?? '', (string) file_get_contents($saltFile));
  $handle = fopen($dir . '/' . $visitor . '.json', 'c+');
  if (!$handle) return ['count' => 0, 'emails' => []];
  flock($handle, LOCK_EX);
  $entry = json_decode((string) stream_get_contents($handle), true);
  if (!is_array($entry) || $entry['first'] < time() - ALERT_WINDOW) $entry = ['first' => time(), 'count' => 0, 'emails' => []];
  $entry['count']++;
  $entry['emails'] = array_slice([...$entry['emails'], mb_substr($email, 0, 254)], -20);
  ftruncate($handle, 0);
  rewind($handle);
  fwrite($handle, json_encode($entry));
  fclose($handle);
  return $entry;
}

/** Tells INCIDENT_RECIPIENT that someone keeps trying to write with fake addresses. */
function alert_incident($rejections, $name) {
  $now = new DateTime('now', new DateTimeZone('Europe/Paris'));
  $lines = [
    "Quelqu'un tente d'écrire par le formulaire de contact du " . SITE . ' avec une fausse adresse mail.',
    '',
    $rejections['count'] . ' adresses refusées en 24 heures :',
    ...array_map(fn($email) => '- ' . $email, $rejections['emails']),
    '',
    'Nom saisi : ' . ($name === '' ? '(vide)' : $name),
    'Adresse IP : ' . ($_SERVER['REMOTE_ADDR'] ?? 'inconnue'),
    'Date : ' . $now->format('d/m/Y à H:i'),
  ];
  if (!deliver(INCIDENT_RECIPIENT, 'Formulaire de contact : tentatives avec une fausse adresse mail', implode("\\r\\n", $lines))) {
    error_log('Formulaire de contact : alerte non envoyée.');
  }
}

/** Un champ d'une ligne : retours à la ligne et espaces répétés réduits à une espace, coupé à $max caractères. */
function ligne($nom, $max) {
  $valeur = $_POST[$nom] ?? '';
  if (!is_string($valeur)) return '';
  return mb_substr(trim((string) preg_replace('/\\s+/u', ' ', $valeur)), 0, $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  header('Location: ' . CONTACT, true, 303);
  exit;
}
// Piège à robots : un humain ne voit pas cette case. On fait comme si l'envoi avait réussi.
if (!empty($_POST['botcheck'])) repondre(true);

$champs = [];
foreach (CHAMPS as [$nom, , $max]) $champs[$nom] = ligne($nom, $max);
if ($champs['echeance'] === '') $champs['echeance'] = ${php(contact.fr.formulaire.echeance.defaut)};
$message = is_string($_POST['message'] ?? null) ? trim(mb_substr(str_replace(["\\r\\n", "\\r"], "\\n", $_POST['message']), 0, 10000)) : '';

if (email_refused($champs['email'])) {
  $rejections = record_rejection($champs['email']);
  if ($rejections['count'] === ALERT_THRESHOLD) alert_incident($rejections, $champs['nom']);
  repondre(false, 'email');
}
if ($champs['nom'] === '' || $message === '' || DESTINATAIRE === '') repondre(false);

$lignes = ['Nouveau projet reçu par le formulaire de contact du ${site}.', ''];
foreach (CHAMPS as [$nom, $intitule]) {
  if ($champs[$nom] !== '') $lignes[] = $intitule . ' : ' . $champs[$nom];
}
array_push($lignes, '', 'Message :', $message, '', 'Pour répondre, utilisez simplement « Répondre » : la réponse partira vers ' . $champs['email'] . '.');

$envoye = deliver(DESTINATAIRE, 'Nouveau projet — ' . $champs['nom'], implode("\\r\\n", $lignes), $champs['email']);
if (!$envoye) error_log('Formulaire de contact : mail() a échoué.');
repondre($envoye);
`;
}
