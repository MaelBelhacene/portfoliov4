/**
 * Rideau d’ouverture : joué une seule fois par session de navigation.
 * Un rechargement (F5) ou un changement de langue rechargent la page, mais
 * `sessionStorage` survit aux deux — le rideau ne se rejoue donc pas. Il
 * revient à la prochaine visite, dans un nouvel onglet.
 */
export const INTRO_STORAGE_KEY = "mb-intro-seen";

/**
 * Script exécuté de façon synchrone avant que le rideau ne soit analysé par
 * le navigateur : il pose l’attribut que le CSS attend pour le masquer dès
 * le premier rendu. Sans lui, le rideau resterait visible le temps de
 * l’hydratation avant de disparaître — un clignotement à chaque page.
 *
 * `try/catch` : `sessionStorage` lève dans certains modes privés.
 */
export const INTRO_GUARD_SCRIPT = `try{if(sessionStorage.getItem(${JSON.stringify(
  INTRO_STORAGE_KEY
)}))document.documentElement.setAttribute("data-intro","seen")}catch(e){}`;
