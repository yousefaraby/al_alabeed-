import type { Lang } from './i18n';

export type Kind = 'lock' | 'safe' | 'power' | 'bell' | 'acc';
export type Method = 'card' | 'key' | 'pin' | 'finger' | 'face';
export type Finish = 'silver' | 'black' | 'gold' | 'white' | 'copper' | 'cream' | 'charcoal';
export type Use = 'hotel' | 'home' | 'apartment';
export type TypeKey = 'rfid' | 'rfpin' | 'fppin' | 'pin' | 'twofa' | 'auto' | 'acc' | 'safe' | 'power' | 'bell';

type Text = Record<Lang, string>;

interface RawProduct {
  id: string;
  img: string;
  kind: Kind;
  type: TypeKey;
  model?: string;
  name?: Text;
  desc?: Text;
  badge?: Text;
  /** extra rows for the product page's details table */
  specs?: Record<Lang, [string, string][]>;
  /** a device that comes with the product, shown in its details (and in the full-screen photos) */
  includes?: { img: string; name: Text; text: Text };
  m: Method[];
  sw: Finish[];
  uses: Use[];
}

export interface Product {
  id: string;
  img: string;
  kind: Kind;
  type: TypeKey;
  model?: string;
  title: string;
  cat: string;
  badge: string;
  desc?: string;
  specs?: [string, string][];
  includes?: { img: string; name: string; text: string };
  m: Method[];
  sw: Finish[];
  uses: Use[];
}

export const WA_NUMBER = '201004610860';
export const MAIL = 'al.abedlook@gmail.com';
export const waLink = (t: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t)}`;

export const SW: Record<Finish, [string, Text]> = {
  silver: ['#C9CED6', { ar: 'فضي', en: 'Silver' }],
  black: ['#1B1B1F', { ar: 'أسود', en: 'Black' }],
  gold: ['#D4AF37', { ar: 'ذهبي (PVD)', en: 'Gold (PVD)' }],
  white: ['#F1F1F1', { ar: 'أبيض', en: 'White' }],
  copper: ['#B8734A', { ar: 'نحاسي', en: 'Copper' }],
  cream: ['#ECE3C6', { ar: 'كريمي', en: 'Cream' }],
  charcoal: ['#4A4D55', { ar: 'أسود', en: 'Black' }],
};
export const M: Record<Method, Text> = {
  card: { ar: 'بطاقة', en: 'Card' },
  key: { ar: 'مفتاح ميكانيكي', en: 'Mechanical key' },
  pin: { ar: 'رمز سري', en: 'PIN code' },
  finger: { ar: 'بصمة', en: 'Fingerprint' },
  face: { ar: 'وجه', en: 'Face' },
};
/* Type labels follow the catalog's own grouping. */
export const TYPES: Record<TypeKey, Text> = {
  rfid: { ar: 'أقفال فندقية RFID', en: 'RFID hotel locks' },
  rfpin: { ar: 'أقفال بطاقة RF ورمز سري', en: 'RF card & PIN locks' },
  fppin: { ar: 'أقفال بصمة ورمز سري', en: 'Fingerprint & PIN locks' },
  pin: { ar: 'أقفال برمز سري', en: 'PIN locks' },
  twofa: { ar: 'أقفال بتحقق ثنائي', en: 'Two-factor locks' },
  auto: { ar: 'أقفال ذكية أوتوماتيكية', en: 'Automatic smart locks' },
  acc: { ar: 'ملحقات نظام الفنادق', en: 'Hotel system accessories' },
  safe: { ar: 'خزن الفنادق', en: 'Hotel safes' },
  power: { ar: 'مفاتيح توفير الطاقة', en: 'Energy-saving switches' },
  bell: { ar: 'أجراس الغرف الفندقية', en: 'Hotel room doorbells' },
};
const KIND: Record<Kind, Text> = {
  lock: { ar: 'قفل ذكي', en: 'Smart lock' },
  safe: { ar: 'خزنة', en: 'Safe' },
  power: { ar: 'موفر طاقة', en: 'Energy saver' },
  bell: { ar: 'جرس', en: 'Doorbell' },
  acc: { ar: 'ملحقات الأقفال', en: 'Lock accessories' },
};
const TITLE: Partial<Record<TypeKey, Text>> = {
  rfid: { ar: 'قفل فندقي', en: 'Hotel lock' },
  fppin: { ar: 'قفل بصمة', en: 'Fingerprint lock' },
  auto: { ar: 'قفل أوتوماتيكي', en: 'Automatic lock' },
};
export const USES: Record<Use, Text> = {
  hotel: { ar: 'للفنادق', en: 'For hotels' },
  home: { ar: 'للفلل', en: 'For villas' },
  apartment: { ar: 'للشقق والكومباوندات', en: 'For apartments & compounds' },
};
export const USE_LABEL: Record<Use, Text> = {
  hotel: { ar: 'الفنادق', en: 'Hotels' },
  home: { ar: 'الفلل والمنازل', en: 'Villas & homes' },
  apartment: { ar: 'الشقق والكومباوندات', en: 'Apartments & compounds' },
};
export const USE_ICONS: Record<Use, string> = { hotel: 'hotel', home: 'home', apartment: 'apt' };
export const KIND_ICON: Record<Kind, string> = { lock: 'lock', safe: 'safe', power: 'bolt', bell: 'bell', acc: 'acc' };
export const KIND_LABEL: Record<Kind, Text> = {
  lock: { ar: 'الأقفال الذكية', en: 'Smart locks' },
  safe: { ar: 'الخزن', en: 'Safes' },
  power: { ar: 'باور سيفر', en: 'Power saver' },
  bell: { ar: 'الأجراس', en: 'Doorbells' },
  acc: { ar: 'ملحقات الأقفال', en: 'Lock accessories' },
};

const RFID = { kind: 'lock', type: 'rfid', m: ['card', 'key'], uses: ['hotel', 'apartment'] } as const;
const CARD_PROGRAMMER: Text = { ar: 'جهاز برمجة كروت', en: 'Card programmer' };

const RAW: RawProduct[] = [
  { ...RFID, m: [...RFID.m], uses: [...RFID.uses], id: 'v81', img: 'v81', model: 'V81', sw: ['black', 'silver', 'gold'] },
  { ...RFID, m: [...RFID.m], uses: [...RFID.uses], id: 'v31', img: 'colors/v31-silver', model: 'V31', sw: ['silver', 'gold'] },
  { ...RFID, m: [...RFID.m], uses: [...RFID.uses], id: 'a21', img: 'a21', model: 'A21', sw: ['black', 'silver', 'gold'] },
  { ...RFID, m: [...RFID.m], uses: [...RFID.uses], id: 'k71', img: 'k71', model: 'K71', sw: ['black', 'silver'] },
  { ...RFID, m: [...RFID.m], uses: [...RFID.uses], id: 'k51', img: 'k51', model: 'K51', sw: ['black'] },
  { ...RFID, m: [...RFID.m], uses: [...RFID.uses], id: 'k81', img: 'k81', model: 'K81', sw: ['black', 'silver', 'gold'] },
  { ...RFID, m: [...RFID.m], uses: [...RFID.uses], id: 'e61', img: 'e61', model: 'E61', sw: ['black', 'silver', 'gold'] },
  { ...RFID, m: [...RFID.m], uses: [...RFID.uses], id: 'e51', img: 'e51', model: 'E51', sw: ['black', 'silver', 'gold'] },
  { id: 'dc', img: 'data-collector', kind: 'acc', type: 'acc', badge: CARD_PROGRAMMER, name: { ar: 'جهاز جمع البيانات (Data Collector)', en: 'Data Collector' }, desc: { ar: 'واجهة سهلة مبنية على نظام تشغيل للموبايل', en: 'Easy interface built on a mobile operating system' }, m: [], sw: [], uses: ['hotel'] },
  { id: 'enc', img: 'rfid-encoder', kind: 'acc', type: 'acc', badge: CARD_PROGRAMMER, name: { ar: 'جهاز برمجة الكروت RFID', en: 'RFID Card Encoder' }, desc: { ar: 'يبرمج كروت الأقفال للنزلاء والموظفين بتوصيله بالكمبيوتر', en: 'Programs lock cards for guests and staff via a PC connection' }, m: [], sw: [], uses: ['hotel'] },
  { id: 'gm6s', img: 'gm6s-pro', kind: 'lock', type: 'auto', model: 'GM6S Pro', m: ['face', 'finger', 'pin', 'card', 'key'], sw: ['black', 'copper'], uses: ['home', 'apartment'] },
  { id: 'e68', img: 'e68', kind: 'lock', type: 'fppin', model: 'E68', m: ['finger', 'pin', 'card', 'key'], sw: ['black', 'silver', 'gold'], uses: ['home', 'apartment'] },
  { id: 'h58', img: 'h58', kind: 'lock', type: 'fppin', model: 'H58', m: ['finger', 'pin', 'card', 'key'], sw: ['black', 'silver', 'gold'], uses: ['home', 'apartment'] },
  { id: 'me2043', img: 'me-2043uzh', kind: 'safe', type: 'safe', name: { ar: 'خزنة فندقية ME-2043UZH', en: 'Hotel safe ME-2043UZH' }, desc: { ar: 'سلسلة ME الاقتصادية (مع وظيفة CEU)، تفتح برقم سري أو مفتاح', en: 'Economy ME series (with CEU function), opens with a PIN or key' }, m: ['pin', 'key'], sw: ['black'], uses: ['hotel', 'home'] },
  {
    id: 'qnn', img: 'colors/qnn-charcoal', kind: 'safe', type: 'safe', model: 'QNN Safe', m: ['card', 'pin', 'key'], sw: ['charcoal', 'cream'], uses: ['hotel', 'home'],
    name: { ar: 'خزنة فندقية QNN Safe بكارت NFC', en: 'QNN Safe hotel safe with NFC card' },
    desc: { ar: 'تفتح بكارت NFC أو رقم سري أو مفتاح، والكروت تُبرمج بجهاز QNN Safe Controller', en: 'Opens with an NFC card, a PIN or a key; the cards are programmed with the QNN Safe Controller' },
    specs: {
      ar: [['نوع الكارت', 'NFC'], ['برمجة الكروت', 'بجهاز QNN Safe Controller']],
      en: [['Card type', 'NFC'], ['Card programming', 'With the QNN Safe Controller']],
    },
    includes: {
      img: '/assets/products/qnn-controller.webp',
      name: { ar: 'جهاز برمجة الكروت QNN Safe Controller', en: 'QNN Safe Controller' },
      text: { ar: 'يتعرف على كروت NFC ويبرمجها لتفتح الخزنة', en: 'Reads the NFC cards and programs them to open the safe' },
    },
  },
  { ...RFID, m: [...RFID.m], uses: [...RFID.uses], id: 'p21', img: 'colors/p21-silver', model: 'P21', sw: ['silver'] },

  { id: 'ps', img: 'power-saver', kind: 'power', type: 'power', name: { ar: 'مفتاح توفير الطاقة (باور سيفر)', en: 'Energy-saving switch (power saver)' }, desc: { ar: 'أدخل البطاقة لتشغيل الكهرباء', en: 'Insert the card to turn on the power' }, m: ['card'], sw: ['white'], uses: ['hotel'] },

  {
    id: 'dnd-bell', img: 'doorbell-dnd', kind: 'bell', type: 'bell', m: [], sw: ['black'], uses: ['hotel', 'home'],
    name: { ar: 'جرس كهربائي بلوحة عدم الإزعاج وتنظيف الغرفة ورقم الغرفة الرقمي', en: 'Electric Doorbell with DND, MUR, Digital Room Number' },
    desc: { ar: 'يُصنَّع حسب الطلب: برقم كل غرفة وبعدد غرف فندقك', en: 'Made to order: customized with your room numbers and quantity' },
    specs: {
      ar: [
        ['التصنيع', 'حسب الطلب (أرقام الغرف وعددها)'],
        ['المقاس', '136 × 258 مم (اللوحة الخارجية) / 86 × 88 مم (اللوحة الداخلية)'],
        ['الإضاءة', 'الشعار ورقم الغرفة: أزرق، عدم الإزعاج: أحمر، تسجيل الدخول: أزرق، تنظيف الغرفة: أخضر، الجرس: أصفر'],
      ],
      en: [
        ['Production', 'Made to order (your room numbers and quantity)'],
        ['Size', '136 × 258 mm (outside panel) / 86 × 88 mm (inside panel)'],
        ['Lighting', 'Logo and room number: blue, Do not disturb: red, Check in: blue, Make up room: green, Bell: yellow'],
      ],
    },
  },
  {
    id: 'hv-bell', img: 'doorbell-hv', kind: 'bell', type: 'bell', m: [], sw: ['black'], uses: ['hotel', 'home'],
    name: { ar: 'نظام جرس الباب (جهد عالي)', en: 'High Voltage Doorbell System' },
    desc: { ar: 'لوحة خارجية بجرس، ولوحة داخلية، ووحدة الجرس', en: 'Outside panel with bell, inside panel and bell unit' },
    specs: {
      ar: [
        ['المكوّنات', 'لوحة خارجية + لوحة داخلية + وحدة الجرس'],
        ['اللوحة الخارجية', 'عدم الإزعاج، تنظيف الغرفة، برجاء الانتظار، زر الجرس'],
        ['اللوحة الداخلية', 'عدم الإزعاج، تنظيف الغرفة، برجاء الانتظار'],
        ['التشغيل', 'جهد عالي (High Voltage)'],
      ],
      en: [
        ['Parts', 'Outside panel + inside panel + bell unit'],
        ['Outside panel', 'Do not disturb, Clean up room, Please wait, Bell button'],
        ['Inside panel', 'Do not disturb, Clean up room, Please wait'],
        ['Power', 'High voltage'],
      ],
    },
  },
];

const build = (lang: Lang): Product[] =>
  RAW.map((p) => ({
    id: p.id, img: p.img, kind: p.kind, type: p.type, model: p.model, m: p.m, sw: p.sw, uses: p.uses,
    title: p.name ? p.name[lang] : `${TITLE[p.type]![lang]} - ${p.model}`,
    cat: TYPES[p.type][lang],
    badge: (p.badge || KIND[p.kind])[lang],
    desc: p.desc?.[lang],
    specs: p.specs?.[lang],
    includes: p.includes && { img: p.includes.img, name: p.includes.name[lang], text: p.includes.text[lang] },
  }));

const CATALOGS: Record<Lang, Product[]> = { ar: build('ar'), en: build('en') };
export const catalog = (lang: Lang) => CATALOGS[lang];
export const byId = (lang: Lang, id: string) => CATALOGS[lang].find((p) => p.id === id);

/* Home page "featured models" */
export const featured = (lang: Lang) =>
  ['k81', 'a21', 'v81', 'e68', 'gm6s', 'me2043', 'ps', 'dnd-bell']
    .map((id) => byId(lang, id)!)
    .map((p) => (p.id === 'ps' ? { ...p, badge: lang === 'ar' ? 'باور سيفر' : 'Power saver' } : p));

/* Products with per-finish photos (assets/products/colors/<id>-<finish>.webp) */
export const COLOR_IMGS: Record<string, Finish[]> = {
  k71: ['black', 'silver'], k81: ['black', 'silver', 'gold'], v31: ['silver', 'gold'], v81: ['black', 'silver', 'gold'],
  a21: ['black', 'silver', 'gold'], e51: ['black', 'silver', 'gold'], e61: ['black', 'silver', 'gold'], e68: ['black', 'silver', 'gold'],
  gm6s: ['black', 'copper'], p21: ['silver'], h58: ['black', 'silver', 'gold'], qnn: ['charcoal', 'cream'],
};
/** Products whose color-image filenames have an extra suffix (e.g. a21-black-1.webp) */
const IMG_SUFFIX: Record<string, string> = { a21: '-1' };
/** Map specific product finish combinations to custom filenames (without directory or extension) */
const COLOR_IMG_OVERRIDE: Record<string, string> = {
  'gm6s-black': 'gm6s-black1',
};
export const colorImg = (id: string, finish: Finish) => {
  const custom = COLOR_IMG_OVERRIDE[`${id}-${finish}`];
  return `/assets/products/colors/${custom ?? `${id}-${finish}${IMG_SUFFIX[id] ?? ''}`}.webp`;
};
/** The finish a product opens on: locks show silver, or another finish than black when there is no silver */
export function defaultFinish(p: Pick<Product, 'id' | 'kind' | 'sw'>): Finish | null {
  const own = (COLOR_IMGS[p.id] || []).filter((f) => p.sw.includes(f));
  if (!own.length) return null;
  if (p.kind === 'lock') return own.includes('silver') ? 'silver' : own.find((f) => f !== 'black') ?? own[0];
  return own.includes('black') ? 'black' : own[0];
}
export const imgSrc = (p: Pick<Product, 'id' | 'kind' | 'img' | 'sw'>) => {
  const finish = defaultFinish(p);
  return finish ? colorImg(p.id, finish) : `/assets/products/${p.img}.webp`;
};

/**
 * Alt text for a product photo, written for people and for Google Images:
 * product, finish, category and brand ("قفل فندقي - K81 أسود - أقفال فندقية RFID | العابد ديجيتال لوك").
 */
export function photoAlt(p: Pick<Product, 'title' | 'cat'>, lang: Lang, finish?: Finish | null) {
  const f = finish ? (lang === 'ar' ? ` ${SW[finish][1].ar}` : ` in ${SW[finish][1].en}`) : '';
  return lang === 'ar' ? `${p.title}${f} - ${p.cat} | العابد ديجيتال لوك` : `${p.title}${f} – ${p.cat} | Alabed Digital Lock`;
}

/* Arabic-aware normalisation used by every search box */
export const norm = (s: string) =>
  s.toLowerCase().replace(/[ً-ْـ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي');

export const PARTNERS: Record<'hotels' | 'cruises', [string, string][]> = {
  hotels: [
    ['فندق حور محب - الهرم', 'Hor Moheb Hotel, Pyramids'], ['فندق مارشال - القاهرة', 'Marshal Hotel, Cairo'], ['فندق ترانزيت مطار القاهرة', 'Cairo Airport Transit Hotel'],
    ['أجنحة فندق جولدن فايف - الغردقة', 'Golden Five Hotel Suites, Hurghada'], ['فندق ريجينا - الغردقة', 'Regina Hotel, Hurghada'], ['فندق بارسيلو - شرم الشيخ', 'Barceló Hotel, Sharm El Sheikh'],
    ['فندق جولدن بيتش', 'Golden Beach Hotel'], ['فندق الشرطة - بورسعيد', 'Port Said Police Hotel'], ['فندق سفير - دهب', 'Safir Dahab Resort'],
    ['فندق ريو بلازا - الغردقة', 'Riu Plaza Hotel, Hurghada'], ['قرية مرسى شقرة - مرسى علم', 'Marsa Shagra Village, Marsa Alam'], ['فندق الأيوبي - القاهرة', 'Al Ayoubi Hotel, Cairo'],
  ],
  cruises: [
    ['بلو شادو 2', 'Blue Shadow 2'], ['بلو شادو 3', 'Blue Shadow 3'], ['بلو شادو 4', 'Blue Shadow 4'], ['كليوباترا', 'Cleopatra'], ['ليبرتي', 'Liberty'], ['رويال بوريفاج', 'Royal Beau Rivage'],
    ['نايل فيو', 'Nile View'], ['رويال إيليت', 'Royal Elite'], ['تاج النيل 1', 'Taj El Nil 1'], ['نيفتيس', 'Nephthys'], ['ستيفاني', 'Stephany'], ['أمادا', 'Amada'],
    ['تي', 'T'], ['نايل ستايل', 'Nile Style'], ['لو بريمير', 'Le Premier'], ['النبيلتان', 'Al Nabilatain'], ['الملكة شيبا', 'Queen Sheba'], ['ملك طيبة', 'King of Thebes'],
    ['مركب رع', 'Ra'], ['سارة 2', 'Sarah 2'], ['أمباسادور', 'Ambassador'], ['البصيلي', 'El Bouseily'], ['نايل جويل', 'Nile Jewel'],
  ],
};
