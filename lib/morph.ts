'use client';

/**
 * Set when a product card link is clicked, so the product page knows its photo is arriving
 * through the card → page morph and skips its own entrance animation for the photo.
 */
let fromCard = false;
export const markCardNavigation = () => { fromCard = true; };
export const takeCardNavigation = () => { const v = fromCard; fromCard = false; return v; };
