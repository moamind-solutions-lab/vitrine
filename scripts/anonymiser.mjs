/**
 * Les maquettes Teamago reprennent un vrai fichier de club. Depuis le 14 septembre 2026,
 * leurs personnes sont fictives à la source (mêmes initiales que les vraies) : on les laisse
 * telles quelles. Le club, lui, garde son vrai nom dans les maquettes : on le remplace, au rendu seulement.
 */
export const CLUB = ['Les Cabots', 'Les Hérons'];

export function anonymiser(html) {
  return html.replaceAll(CLUB[0], CLUB[1]);
}
