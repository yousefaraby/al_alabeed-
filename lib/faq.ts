import type { Lang } from './i18n';

export interface FaqGroup { key: string; icon: string; title: string; items: [string, string][] }

/** Questions on the FAQ page, grouped by category */
export const FAQ: Record<Lang, FaqGroup[]> = {
  ar: [
    {
      key: 'products', icon: 'stack', title: 'عن المنتجات',
      items: [
        ['ماذا تبيع العابد؟', 'ثلاث فئات: أقفال ذكية للأبواب، وخزن غرف فندقية، ومفتاح توفير الطاقة (باور سيفر) للغرف.'],
        ['هل المنتجات للفنادق فقط؟', 'لا. لدينا أقفال للمنازل والفلل والمكاتب والشقق، والخزنة مناسبة للبيت والمكتب أيضًا. الباور سيفر مخصص لغرف الفنادق.'],
      ],
    },
    {
      key: 'locks', icon: 'lock', title: 'الأقفال الذكية',
      items: [
        ['ما طرق الفتح المتاحة؟', 'حسب الموديل: بطاقة، بصمة، رمز سري، تعرّف على الوجه، ومفتاح ميكانيكي احتياطي. كل صفحة منتج توضح طرق الفتح الخاصة به.'],
        ['هل يناسب القفل بابي؟', 'أرسل صورة لحافة الباب وخامته على واتساب ونؤكد لك التوافق.'],
        ['ما التشطيبات المتاحة؟', 'فضي وأسود وذهبي، وبعض الموديلات أبيض أو نحاسي. تقدر تبدّل بين الألوان في صفحة كل منتج.'],
      ],
    },
    {
      key: 'safes', icon: 'safe', title: 'الخزن',
      items: [
        ['كيف تُفتح الخزنة؟', 'برمز سري من 4 إلى 6 أرقام يختاره المستخدم، حسب التعليمات على لوحة الخزنة.'],
        ['ماذا لو نسي النزيل الرمز؟', 'الإدارة تفتح الخزنة بمفتاح الطوارئ.'],
      ],
    },
    {
      key: 'power', icon: 'bolt', title: 'باور سيفر',
      items: [
        ['ما هو الباور سيفر؟', 'مفتاح يركّب عند باب الغرفة: يُدخل النزيل بطاقته فتعمل الكهرباء، ويسحبها عند الخروج فتنقطع تلقائيًا.'],
        ['ما الأحمال التي يتحكم فيها؟', 'دائرة كهرباء الغرفة التي يوصّله عليها الكهربائي.'],
      ],
    },
    {
      key: 'order', icon: 'list', title: 'الطلب والأسعار',
      items: [
        ['لماذا لا توجد أسعار أو سلة شراء؟', 'الأسعار تختلف حسب الكمية والمشروع. أضف المنتجات لقائمة طلب السعر وأرسلها على واتساب أو البريد، ونرد بعرض سعر مكتوب.'],
        ['هل أحتاج حسابًا أو تسجيل دخول؟', 'لا. الموقع بدون حسابات، والطلب يتم عبر واتساب أو البريد أو الهاتف.'],
        ['هل يمكن طلب كميات للفنادق والمشاريع؟', 'نعم، أخبرنا بعدد الغرف أو الأبواب ونرسل لك عرض سعر للمشروع كاملًا.'],
        ['هل تركّبون المنتجات؟', 'نعم، نورّد ونركّب.'],
      ],
    },
  ],
  en: [
    {
      key: 'products', icon: 'stack', title: 'About our products',
      items: [
        ['What does Alabed sell?', 'Three categories: smart door locks, in-room hotel safes, and an energy-saving switch (power saver) for rooms.'],
        ['Are the products only for hotels?', 'No. We have locks for homes, villas, offices and apartments, and the safe suits homes and offices too. The power saver is made for hotel rooms.'],
      ],
    },
    {
      key: 'locks', icon: 'lock', title: 'Smart locks',
      items: [
        ['Which unlock methods are available?', 'It depends on the model: card, fingerprint, PIN code, face recognition and a backup mechanical key. Each product page lists its methods.'],
        ['Will the lock fit my door?', 'Send us a photo of the door edge and its material on WhatsApp and we will confirm compatibility.'],
        ['Which finishes are available?', 'Silver, black and gold, and some models also come in white or copper. You can switch between them on each product page.'],
      ],
    },
    {
      key: 'safes', icon: 'safe', title: 'Safes',
      items: [
        ['How is the safe opened?', 'With a 4 to 6 digit PIN chosen by the user, as shown in the instructions on the safe panel.'],
        ['What if a guest forgets the code?', 'Management opens the safe with the emergency key.'],
      ],
    },
    {
      key: 'power', icon: 'bolt', title: 'Power saver',
      items: [
        ['What is a power saver?', 'A switch installed by the room door: the guest inserts their card and the power comes on, then removes it on leaving and the power cuts off automatically.'],
        ['Which loads does it control?', 'The room circuit your electrician connects it to.'],
      ],
    },
    {
      key: 'order', icon: 'list', title: 'Ordering & prices',
      items: [
        ['Why are there no prices or a cart?', 'Prices depend on quantity and project. Add products to your quote list and send it on WhatsApp or email, and we reply with a written quote.'],
        ['Do I need an account?', 'No. The site has no accounts; ordering is done through WhatsApp, email or phone.'],
        ['Can I order in bulk for hotels and projects?', "Yes. Tell us the number of rooms or doors and we'll send a quote for the whole project."],
        ['Do you install the products?', 'Yes, we supply and install.'],
      ],
    },
  ],
};
