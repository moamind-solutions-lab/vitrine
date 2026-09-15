/**
 * Le script qui envoie les messages du formulaire de contact, un par domaine : dist/envoi.php
 * (moamind-solutions.fr) et dist/en/envoi.php (moamind-solutions.com). Il tourne chez o2switch et
 * rédige le mail en français, quelle que soit la langue du visiteur.
 */
import { DOMAINES, chemin } from '../src/i18n/routes.ts';
import contact from '../src/i18n/contact.ts';

/** Adresse d'où partent les messages : un domaine du site, dont SPF et DKIM sont configurés chez o2switch. */
export const EXPEDITEUR = 'new-project@moamind-solutions.com';

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
const CONTACT = ${php(domaine + chemin('contact', langue))};
const MERCI = ${php(domaine + chemin('merci', langue))};
const CHAMPS = [
${CHAMPS.map(([nom, intitule, max]) => `  [${php(nom)}, ${php(intitule)}, ${max}],`).join('\n')}
];

/** JSON pour l'envoi en arrière-plan de la page Contact ; redirection pour un navigateur sans JavaScript. */
function repondre($ok) {
  if (strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false) {
    http_response_code($ok ? 200 : 400);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['ok' => $ok]);
  } else {
    header('Location: ' . ($ok ? MERCI : CONTACT . '#erreur-envoi'), true, 303);
  }
  exit;
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

if ($champs['nom'] === '' || $message === '' || !filter_var($champs['email'], FILTER_VALIDATE_EMAIL) || DESTINATAIRE === '') repondre(false);

$lignes = ['Nouveau projet reçu par le formulaire de contact du ${site}.', ''];
foreach (CHAMPS as [$nom, $intitule]) {
  if ($champs[$nom] !== '') $lignes[] = $intitule . ' : ' . $champs[$nom];
}
array_push($lignes, '', 'Message :', $message, '', 'Pour répondre, utilisez simplement « Répondre » : la réponse partira vers ' . $champs['email'] . '.');

$envoye = mail(
  DESTINATAIRE,
  mb_encode_mimeheader('Nouveau projet — ' . $champs['nom'], 'UTF-8', 'B', "\\r\\n"),
  quoted_printable_encode(implode("\\r\\n", $lignes)),
  [
    'From' => 'Site Moamind Solutions <' . EXPEDITEUR . '>',
    'Reply-To' => $champs['email'],
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => 'quoted-printable',
  ],
  '-f' . EXPEDITEUR
);
if (!$envoye) error_log('Formulaire de contact : mail() a échoué.');
repondre($envoye);
`;
}
