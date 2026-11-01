import type { ShopQuery } from '@/components/shop/ShopCatalog';

export type SearchParams = Record<string, string | string[] | undefined>;

const all = (v: string | string[] | undefined) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);
const one = (v: string | string[] | undefined) => all(v)[0];

/** ?kind=lock&use=hotel&type=rfid&q=…&focus=<id> */
export const shopQuery = (sp: SearchParams): ShopQuery => ({
  kind: one(sp.kind), use: all(sp.use), type: all(sp.type), q: one(sp.q), focus: one(sp.focus),
});
