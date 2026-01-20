import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * ✅ Responsive + Product images improvement
 * - Horizontal category bar auto-scrolls to active
 * - Better responsive layout (mobile-first)
 * - Product cards now have an image section (real image if exists, otherwise premium placeholder)
 * - Simple image resolver: uses item.image if provided, else tries `./assets/menu/<category>/<slug>.jpg`
 *
 * NOTE:
 * - Put your images inside:  /public/assets/menu/<category>/
 *   Example: /public/assets/menu/beer/sengur.jpg
 * - Or set `image` on items directly.
 */

// -------------------- Menu data --------------------
const menuData = {
  beer: [
    { name: 'Sengur', size: '0.5L', price: 9500, image: null },
    { name: 'Kaltenberg', size: '0.5L', price: 12000, image: null },
    { name: 'Tiger', size: '0.5L', price: 10000, image: null },
    { name: 'Asahi', size: '0.33L', price: 12500, image: null },
    { name: 'Altangobi', size: '0.33L', price: 10000, image: null },
    { name: 'Soju Good Day', size: '', price: 19000, image: null },
    { name: 'Tsingtao', size: '0.33L', price: 10500, image: null },
    { name: 'Heineken', size: '0.33L', price: 10500, image: null },
    { name: 'Kirin Ichiban', size: '0.33L', price: 11000, image: null },
    { name: 'Cass Fresh', size: '0.5L', price: 11500, image: null },
    { name: 'Krush', size: '0.5L', price: 11500, image: null },
  ],
  softDrinks: [
    { name: 'Bonaqua/Bubble/Alkaline Water', price: 5000, image: null },
    { name: 'Millenia/Bubble/Cola/Sprite', price: 6000, image: null },
    { name: 'Orgiluun/Fruit', price: 6000, image: null },
    { name: 'Ginger Ale/Soda/Tonic', price: 7000, image: null },
    { name: 'Red Bull', price: 12000, image: null },
    { name: 'Juice 1L', price: 18000, image: null },
    { name: 'Conditions', price: 22000, image: null },
  ],
  hotDrinks: [
    { name: 'English Black Tea', price: 6000, image: null },
    { name: 'Americano', price: 8000, image: null },
    { name: 'Latte', price: 8500, image: null },
  ],
  vodka: [
    { name: 'Eden', sizes: [{ size: '50ML', price: 8000 }, { size: '0.7L', price: 109000 }, { size: '1L', price: 139000 }], image: null },
    { name: 'Evok', sizes: [{ size: '50ML', price: 8000 }, { size: '0.7L', price: 139000 }], image: null },
    { name: 'Velvet', sizes: [{ size: '50ML', price: 9000 }, { size: '0.7L', price: 119000 }, { size: '1L', price: 149000 }], image: null },
    { name: 'Koskenkorva', sizes: [{ size: '50ML', price: 13000 }, { size: '0.7L', price: 169000 }], image: null },
    { name: 'Zubrowka Biola', sizes: [{ size: '0.7L', price: 149000 }, { size: '1L', price: 189000 }], image: null },
    { name: 'Zubrowka Bison Grass', sizes: [{ size: '0.7L', price: 179000 }, { size: '1L', price: 219000 }], image: null },
    { name: 'Finlandia', sizes: [{ size: '50ML', price: 13000 }, { size: '0.7L', price: 179000 }, { size: '1L', price: 239000 }], image: null },
    { name: 'Absolut', sizes: [{ size: '50ML', price: 14000 }, { size: '0.7L', price: 189000 }, { size: '1L', price: 249000 }], image: null },
    { name: 'Beluga', sizes: [{ size: '0.7L', price: 309000 }, { size: '1L', price: 379000 }], image: null },
  ],
  whisky: [
    { name: 'Johnnie Walker', sizes: [{ size: '50ML', price: 14000 }, { size: '0.7L', price: 199000 }, { size: '1L', price: 259000 }], image: null },
    { name: 'Ballantines', sizes: [{ size: '50ML', price: 15000 }, { size: '0.7L', price: 219000 }, { size: '1L', price: 289000 }], image: null },
    { name: 'Jack Daniels', sizes: [{ size: '0.7L', price: 239000 }, { size: '1L', price: 299000 }], image: null },
    { name: 'Wild Turkey', sizes: [{ size: '50ML', price: 15000 }, { size: '0.7L', price: 259000 }], image: null },
    { name: 'Chivas', sizes: [{ size: '0.7L', price: 299000 }, { size: '1L', price: 379000 }], image: null },
    { name: 'Jameson', sizes: [{ size: '50ML', price: 19000 }, { size: '0.7L', price: 279000 }, { size: '1L', price: 359000 }], image: null },
    { name: 'Tenjaku (Japan)', sizes: [{ size: '0.7L', price: 309000 }], image: null },
    { name: 'Glenmorangie', sizes: [{ size: '0.7L', price: 489000 }], image: null },
  ],
  wine: [
    { name: "Baron d'Arignac Sweet (White)", price: 69000, image: null },
    { name: 'Calvet Medium Dry (White)', price: 89000, image: null },
    { name: 'La Baume Dry (White)', price: 119000, image: null },
    { name: "Baron d'Arignac Sweet (Red)", price: 69000, image: null },
    { name: 'Calvet Medium Dry (Red)', price: 89000, image: null },
    { name: 'La Baume Dry (Red)', price: 119000, image: null },
    { name: 'Paul Bernard (Sparkling)', price: 68000, image: null },
    { name: 'Freixenet (Sparkling)', price: 98000, image: null },
  ],
  ginTequila: [
    { name: "Gordon's", sizes: [{ size: '50ML', price: 13500 }, { size: 'Bottle', price: 189000 }, { size: '1L', price: 249000 }], image: null },
    { name: 'Olmeca Gold', sizes: [{ size: '50ML', price: 13500 }, { size: 'Bottle', price: 189000 }], image: null },
    { name: 'Sierra', sizes: [{ size: '50ML', price: 14500 }, { size: 'Silver Bottle 0.7L', price: 100000 }, { size: 'Barister Bottle', price: 179000 }], image: null },
  ],
  liqueur: [
    { name: 'Baileys', size: '0.7L', price: 199000, image: null },
    { name: 'Jagermister', size: '0.7L', price: 209000, image: null },
    { name: 'Mollys', size: '0.7L', price: 129000, image: null },
  ],
  food: [
    { name: 'Монгол хоолны цуглуулга', nameEn: 'Mongolian Food Set', description: 'Үхрийн хавирга, Бууз, Хуушуур, Цуйван', price: 95000, image: null },
    { name: 'Тахиан махан цуг луулга', nameEn: 'Chicken Set', description: 'Тахианы гуя, Тахианы мөч, Шаржигнуур, Салат, Хуурсан нарийн ногоо', price: 95000, image: null },
    { name: 'Махан цуг луулга', nameEn: 'Meat Set', description: 'Салат, хуурсан нарийн ногоо, Гахайн нуруу, Үхрийн хавирга, Тахианы гуя, Тахианы мөч', price: 100000, image: null },
    { name: 'Шорлогны цуг луулга', nameEn: 'Grilled Set', description: 'Гахайн нуруу, Тахиа, Хонь, Салат, Хуурсан нарийн ногоо', price: 110000, image: null },
    { name: 'Хуушуур', nameEn: 'Khuushuur', description: '5 pcs', price: 20000, image: null },
    { name: 'Бууз', nameEn: 'Buuz', description: '8 pcs', price: 20000, image: null },
    { name: 'Цуйван', nameEn: 'Tsuivan', price: 20000, image: null },
    { name: 'Crispy Chicken', description: 'Шаржигнуур тахиа', price: 23000, image: null },
    { name: 'Chicken with Sweet Sauce', nameEn: 'Чихэрлэг соустай тахиа', price: 23000, image: null },
    { name: 'Pork T-Bone Steak', nameEn: 'Гахайн нуруу', description: 'Гахайн нуруу, Шарсан төмс, Ногооны салат', price: 25000, image: null },
    { name: 'Үхрийн Шарсан Хавирга', nameEn: 'Beef Ribs', description: 'Хавирга, Шарсан төмс, Шинэ ногооны салат', price: 25000, image: null },
  ],
  pizza: [
    { name: 'Хавай пицца', nameEn: 'Hawaii Pizza', price: 39000, image: null },
    { name: 'Салями пицца', nameEn: 'Salami Pizza', price: 39000, image: null },
    { name: 'Шарсан төмс', nameEn: 'French Fries', price: 9000, image: null },
    { name: 'Булгуги пицца', nameEn: 'Bulgogi Pizza', price: 39000, image: null },
    { name: 'Маханд дүрлагсад', nameEn: 'Meat Lovers Pizza', price: 42000, image: null },
  ],
  snacks: [
    { name: 'Gum / Бөхь', price: 4500, image: null },
    { name: 'Peanuts / Самар', price: 9000, image: null },
    { name: 'Chips / Чипс', price: 15000, image: null },
    { name: 'Merci & Toffee / Амттан', price: 26000, image: null },
  ],
  packages: [
    {
      name: 'Beer Set',
      price: 200000,
      items: ['Tsingtao 10', 'Bonaqua 3', 'Cola 3', 'Chips 1'],
      bonus: 'Bonus 1 hour free',
      birthday: true,
      image: null,
    },
    {
      name: 'Eden Set',
      price: 280000,
      items: ['Eden 0.7L 1', 'Сэнгүр 6', 'Bonaqua 3', 'Cola 3'],
      bonus: 'Bonus 2 hours free + French Fries',
      birthday: true,
      image: null,
    },
    {
      name: 'Soju Set',
      price: 290000,
      items: ['Soju 4', 'Krush Beer 6', 'Bonaqua 3', 'Cola 3', 'Crispy Chicken', 'French Fries'],
      bonus: 'Bonus 2 hours free',
      birthday: true,
      image: null,
    },
    {
      name: 'Gin Set',
      price: 350000,
      items: ['Gin 1', 'Soda or Tonic 6', 'Alkaline Water 3', 'Chips 1', 'Nuts 1'],
      bonus: 'Bonus 2 hours free',
      birthday: true,
      image: null,
    },
    {
      name: 'Vodka Set',
      price: 440000,
      items: ['Finlandia 0.7L 1', 'Sengur/Tiger 6', 'Bonaqua 3', 'Cola 3', 'French Fries 1'],
      bonus: 'Bonus 2 hours free + 1 Pizza',
      birthday: true,
      image: null,
    },
    {
      name: 'Whisky Set',
      price: 490000,
      items: ['Ballantines/Jonnie Walker 1', 'Tsingtao/Haineken 8', 'Alkaline Water 3', 'Cola 3', 'French Fries 1'],
      bonus: 'Bonus 2 hours free + 1 Pizza',
      birthday: true,
      image: null,
    },
    {
      name: 'Grand Melody Set A',
      price: 890000,
      items: ['Finlandia 0.7L 2', 'Tsingtao/Heineken 10', 'Cola/Sprite 8', 'Alkaline Water 8', 'Mixed Meat Platter 2'],
      bonus: 'Bonus 3 hours free + 1 Pizza',
      birthday: true,
      image: null,
    },
    {
      name: 'Grand Melody Set B',
      price: 1190000,
      items: ['Jameson 0.7L 2', 'Tsingtao/Kirin 12', 'Alkaline Water 10', 'Cola 10', 'French Fries 2', 'Mixed Meat Platter 2'],
      bonus: 'Bonus 4 hours free + 1 Pizza',
      birthday: true,
      image: null,
    },
  ],
};

type Category =
  | 'beer'
  | 'softDrinks'
  | 'hotDrinks'
  | 'vodka'
  | 'whisky'
  | 'wine'
  | 'ginTequila'
  | 'liqueur'
  | 'food'
  | 'pizza'
  | 'snacks'
  | 'packages';

const categoryNames: Record<Category, { mn: string; en: string }> = {
  beer: { mn: 'Шар айраг', en: 'Beer' },
  softDrinks: { mn: 'Ундаа', en: 'Soft Drinks' },
  hotDrinks: { mn: 'Халуун ундаа', en: 'Hot Drinks' },
  vodka: { mn: 'Водка', en: 'Vodka' },
  whisky: { mn: 'Виски', en: 'Whisky' },
  wine: { mn: 'Дарс', en: 'Wine' },
  ginTequila: { mn: 'Жин ба Текила', en: 'Gin & Tequila' },
  liqueur: { mn: 'Ликер', en: 'Liqueur' },
  food: { mn: 'Хоол', en: 'Food' },
  pizza: { mn: 'Пицца', en: 'Pizza' },
  snacks: { mn: 'Зууш', en: 'Snacks' },
  packages: { mn: 'Багц', en: 'Packages' },
};

// -------------------- Helpers --------------------
const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const buildAssetPath = (category: Category, name: string) =>
  `/assets/menu/${category}/${slugify(name)}.jpg`; // put images in /public/assets/menu/<category>/

const prettyCategoryKey = (category: Category) => categoryNames[category];

const hasImage = (src?: string | null) => !!src && typeof src === 'string' && src.length > 0;

function ImageBlock({
  src,
  alt,
  badge,
}: {
  src?: string | null;
  alt: string;
  badge?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/25 bg-gradient-to-br from-[#151B4D]/5 to-[#1A237E]/10">
      {/* 16:10 ratio */}
      <div className="aspect-[16/10] w-full">
        {hasImage(src) ? (
          <img
            src={src as string}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-10">
              <img src="/logo.png" alt="" className="w-full h-full object-contain" />
            </div>
            <div className="relative z-10 text-center px-6">
              <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-[#D4AF37]/15 flex items-center justify-center">
                <svg className="h-6 w-6 text-[#D4AF37]/70" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.5h-2V11h2v5.5zm0-7h-2V7h2v2.5z" />
                </svg>
              </div>
              <p className="text-sm text-gray-700/80">
                Add product photo in <span className="font-semibold">/public/assets/menu/...</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {badge && (
        <div
          style={{ fontFamily: 'Cinzel, serif' }}
          className="absolute left-3 top-3 rounded-lg bg-[#D4AF37] px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-[#151B4D]"
        >
          {badge}
        </div>
      )}
    </div>
  );
}

// -------------------- App --------------------
export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('packages');
  const [language, setLanguage] = useState<'mn' | 'en'>('mn');
  const [showBooking, setShowBooking] = useState(false);
  const [query, setQuery] = useState('');

  // ✅ FIX: horizontal category auto-scroll
  const navRef = useRef<HTMLDivElement | null>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const el = btnRefs.current[activeCategory];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeCategory]);

  const scrollNavBy = (dx: number) => navRef.current?.scrollBy({ left: dx, behavior: 'smooth' });

  const formatPrice = (price: number) => `${price.toLocaleString()}₮`;

  const categoryTitle = prettyCategoryKey(activeCategory)[language];

  const visibleItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    const data: any = (menuData as any)[activeCategory] ?? [];
    if (!q) return data;

    // Search name + nameEn + description
    return data.filter((it: any) => {
      const t = [
        it?.name,
        it?.nameEn,
        it?.description,
        ...(Array.isArray(it?.items) ? it.items : []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return t.includes(q);
    });
  }, [activeCategory, query]);

  // Resolve image:
  const getItemImage = (category: Category, item: any) => {
    if (item?.image) return item.image as string;
    // Attempt auto mapping via filename
    // Place images in /public/assets/menu/<category>/<slug>.jpg
    return buildAssetPath(category, item?.name || item?.nameEn || 'item');
  };

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300" style={{ fontFamily: 'Lato, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');

        .gold-border {
          border: 2px solid;
          border-image-source: linear-gradient(45deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
          border-image-slice: 1;
        }
        .gold-text {
          background: linear-gradient(45deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .card-shimmer {
          background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.06) 100%);
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .cat-snap { scroll-snap-type: x proximity; }
        .cat-snap > button { scroll-snap-align: center; }
      `}</style>

      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#D4AF37]/30 py-3 md:py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img src="./assets/loground.png" alt="Grand Melody" className="h-10 md:h-12 w-auto" />
            <span
              style={{ fontFamily: 'Cinzel, serif' }}
              className="text-base sm:text-lg md:text-xl tracking-[0.18em] gold-text font-bold truncate"
            >
              GRAND MELODY
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <button
              onClick={() => setLanguage(language === 'mn' ? 'en' : 'mn')}
              style={{ fontFamily: 'Cinzel, serif' }}
              className="px-3 sm:px-4 py-2 rounded-lg border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all text-xs sm:text-sm tracking-widest"
            >
              {language === 'mn' ? 'EN' : 'МН'}
            </button>

            <button
              onClick={() => setShowBooking(true)}
              style={{ fontFamily: 'Cinzel, serif' }}
              className="bg-[#D4AF37] hover:bg-[#BF953F] text-[#151B4D] px-4 sm:px-6 md:px-8 py-2 font-bold uppercase tracking-[0.12em] transition-all text-xs sm:text-sm shadow-lg whitespace-nowrap"
            >
              {language === 'mn' ? 'Захиалга' : 'Book'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero (more responsive) */}
      <header className="relative py-12 sm:py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/40 to-gray-50"></div>
        <div className="absolute inset-0 opacity-[0.06] flex items-center justify-center">
          <img src="/logo.png" alt="" className="w-64 sm:w-80 lg:w-96 h-auto" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6">
          <h1
            style={{ fontFamily: 'Cinzel, serif' }}
            className="text-3xl sm:text-5xl lg:text-7xl mb-4 sm:mb-6 tracking-tight gold-text font-bold"
          >
            Grand Melody VIP Karaoke
          </h1>
          <p
            style={{ fontFamily: 'Playfair Display, serif' }}
            className="italic text-base sm:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto"
          >
            {language === 'mn'
              ? 'Luxury танд зориулагдсан. Монголын шилдэг караоке туршлага.'
              : "Where luxury meets harmony. Mongolia's finest karaoke experience."}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto">
            <div className="flex-1">
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={language === 'mn' ? 'Хайх (ж: пицца, бууз, eden...)' : 'Search (e.g., pizza, buuz, eden...)'}
                  className="w-full rounded-2xl border border-[#D4AF37]/30 bg-white px-4 py-3 pr-10 text-gray-900 shadow-sm focus:outline-none focus:border-[#D4AF37]"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4AF37]/70">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 18a8 8 0 115.293-14.293A8 8 0 0110 18zm11 3l-6.2-6.2 1.4-1.4L22.4 19.6 21 21z" />
                  </svg>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowBooking(true)}
              style={{ fontFamily: 'Cinzel, serif' }}
              className="rounded-2xl bg-[#151B4D] hover:bg-[#1A237E] text-white px-6 py-3 font-bold uppercase tracking-[0.14em] shadow-lg"
            >
              {language === 'mn' ? 'VIP Захиалга' : 'VIP Booking'}
            </button>
          </div>

          <div className="w-20 sm:w-24 h-1 bg-[#D4AF37] mx-auto mt-8"></div>
        </div>
      </header>

      {/* Category Nav */}
      <div className="sticky top-[60px] sm:top-[68px] md:top-[73px] z-40 bg-white/95 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="py-4 sm:py-5 flex items-center gap-3">
            {/* arrows - desktop */}
            <button
              onClick={() => scrollNavBy(-340)}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-[#D4AF37]/40 hover:border-[#D4AF37] hover:shadow"
              aria-label="Scroll left"
              title="Scroll left"
            >
              ‹
            </button>

            <div ref={navRef} className="flex-1 flex overflow-x-auto scrollbar-hide gap-2 sm:gap-3 scroll-smooth cat-snap">
              {(Object.keys(categoryNames) as Category[]).map((category) => (
                <button
                  key={category}
                  ref={(el) => {
                    btnRefs.current[category] = el;
                  }}
                  onClick={() => {
                    setQuery('');
                    setActiveCategory(category);
                  }}
                  style={{ fontFamily: 'Cinzel, serif' }}
                  className={`flex-shrink-0 px-5 sm:px-7 py-3 sm:py-4 text-[10px] sm:text-xs tracking-[0.2em] uppercase transition-all whitespace-nowrap rounded-2xl ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-[#151B4D] to-[#1A237E] text-white shadow-xl scale-[1.02] gold-border'
                      : 'bg-white border-2 border-[#D4AF37]/40 text-gray-700 hover:border-[#D4AF37] hover:shadow-lg'
                  }`}
                >
                  {categoryNames[category][language]}
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollNavBy(340)}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-[#D4AF37]/40 hover:border-[#D4AF37] hover:shadow"
              aria-label="Scroll right"
              title="Scroll right"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Section header with image strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 style={{ fontFamily: 'Cinzel, serif' }} className="text-2xl sm:text-3xl lg:text-4xl gold-text font-bold">
              {categoryTitle}
            </h2>
            <p style={{ fontFamily: 'Playfair Display, serif' }} className="text-gray-600 italic mt-2">
              {language === 'mn'
                ? 'Зургатай, цэгцтэй харагдац — мобайл дээр бүр илүү гоё.'
                : 'Clean, photo-forward layout that looks great on mobile.'}
            </p>
          </div>

          {query.trim() && (
            <div className="text-sm text-gray-600">
              {language === 'mn' ? 'Олдсон:' : 'Found:'}{' '}
              <span className="font-semibold text-gray-900">{visibleItems.length}</span>
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 space-y-12 sm:space-y-16">
        {/* Packages (now with image section) */}
        {activeCategory === 'packages' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {visibleItems.map((pkg: any, index: number) => (
              <div key={index} className="bg-white overflow-hidden shadow-2xl transition-all hover:shadow-[#D4AF37]/25 gold-border rounded-3xl">
                <div className="p-5 sm:p-8 bg-gradient-to-r from-[#151B4D] to-[#1A237E] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-36 h-36 opacity-5">
                    <img src="/logo.png" alt="" className="w-full h-full object-contain" />
                  </div>

                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <h3 style={{ fontFamily: 'Cinzel, serif' }} className="text-2xl sm:text-3xl text-white mb-1 tracking-wide">
                        {pkg.name}
                      </h3>
                      <p className="text-3xl sm:text-4xl font-bold gold-text">{formatPrice(pkg.price)}</p>
                    </div>

                    {pkg.birthday && (
                      <div
                        style={{ fontFamily: 'Cinzel, serif' }}
                        className="self-start bg-[#D4AF37] text-[#151B4D] px-3 py-1 rounded-lg text-[10px] tracking-widest uppercase font-bold"
                      >
                        Birthday
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 sm:p-8 bg-white space-y-6">
                  {/* Image section */}
                  <div className="group">
                    <ImageBlock
                      src={pkg.image || buildAssetPath('packages', pkg.name)}
                      alt={pkg.name}
                      badge={language === 'mn' ? 'Багц' : 'Package'}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 style={{ fontFamily: 'Cinzel, serif' }} className="font-bold text-gray-800 mb-3 text-xs tracking-widest uppercase">
                        {language === 'mn' ? 'Багцад багтсан' : 'Includes'}
                      </h4>
                      <ul className="space-y-2">
                        {pkg.items.map((item: string, i: number) => (
                          <li key={i} className="flex items-start text-gray-700">
                            <span className="text-[#D4AF37] mr-3 text-lg leading-none">✓</span>
                            <span className="text-sm sm:text-base">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="gold-border p-4 bg-[#FBF5B7]/10 rounded-2xl">
                      <div className="flex items-start gap-3 text-[#B38728]">
                        <svg className="w-7 h-7 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
                        </svg>
                        <div>
                          <p style={{ fontFamily: 'Cinzel, serif' }} className="font-bold uppercase text-xs tracking-wider">
                            {language === 'mn' ? 'Урамшуулал' : 'Bonus'}
                          </p>
                          <p className="text-sm mt-1">{pkg.bonus}</p>
                          {pkg.birthday && (
                            <p className="text-xs mt-2 opacity-80">
                              {language === 'mn' ? '+ Төрсөн өдрийн чимэглэл үнэгүй' : '+ Free birthday decoration'}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowBooking(true)}
                    style={{ fontFamily: 'Cinzel, serif' }}
                    className="w-full rounded-2xl bg-[#D4AF37] hover:bg-[#BF953F] text-[#151B4D] py-3 font-bold uppercase tracking-[0.16em] transition-all shadow-lg"
                  >
                    {language === 'mn' ? 'Энэ багцыг захиалах' : 'Book this package'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Food / Pizza / Snacks (now always with image section + responsive cards) */}
        {(activeCategory === 'food' || activeCategory === 'pizza' || activeCategory === 'snacks') && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-7">
            {visibleItems.map((item: any, index: number) => (
              <div
                key={index}
                className="group bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all gold-border rounded-3xl"
              >
                <div className="p-4 sm:p-5">
                  <ImageBlock
                    src={item.image || getItemImage(activeCategory, item)}
                    alt={item.name}
                    badge={language === 'mn' ? 'Шинэ' : 'Featured'}
                  />
                </div>

                <div className="px-5 pb-6 sm:px-6 sm:pb-7">
                  <h3 style={{ fontFamily: 'Cinzel, serif' }} className="text-lg sm:text-xl font-bold text-gray-900">
                    {language === 'mn' ? item.name : item.nameEn || item.name}
                  </h3>

                  {item.description && (
                    <p style={{ fontFamily: 'Playfair Display, serif' }} className="text-sm text-gray-600 mt-2 italic leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  <div className="mt-5 flex items-end justify-between gap-3 border-t border-[#D4AF37]/20 pt-4">
                    <span className="text-2xl sm:text-3xl font-bold gold-text">{formatPrice(item.price)}</span>
                    <button
                      onClick={() => setShowBooking(true)}
                      className="rounded-xl border border-[#D4AF37]/40 px-3 py-2 text-xs font-semibold text-[#151B4D] hover:bg-[#D4AF37]/10"
                      style={{ fontFamily: 'Cinzel, serif' }}
                    >
                      {language === 'mn' ? 'Захиалах' : 'Reserve'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Beer / Soft / Hot (now with images + better responsive layout) */}
        {(activeCategory === 'beer' || activeCategory === 'softDrinks' || activeCategory === 'hotDrinks') && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-7">
            {visibleItems.map((item: any, index: number) => (
              <div
                key={index}
                className="group bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 rounded-3xl"
              >
                <div className="p-4 sm:p-5">
                  <ImageBlock src={item.image || getItemImage(activeCategory, item)} alt={item.name} />
                </div>

                <div className="px-5 pb-6 sm:px-6 sm:pb-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 style={{ fontFamily: 'Cinzel, serif' }} className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                        {item.name}
                      </h3>
                      {item.size && (
                        <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{item.size}</p>
                      )}
                    </div>

                    <span className="text-xl sm:text-2xl font-bold gold-text whitespace-nowrap">
                      {formatPrice(item.price)}
                    </span>
                  </div>

                  <div className="mt-5 border-t border-[#D4AF37]/20 pt-4 flex justify-end">
                    <button
                      onClick={() => setShowBooking(true)}
                      className="rounded-xl border border-[#D4AF37]/40 px-3 py-2 text-xs font-semibold text-[#151B4D] hover:bg-[#D4AF37]/10"
                      style={{ fontFamily: 'Cinzel, serif' }}
                    >
                      {language === 'mn' ? 'Захиалах' : 'Reserve'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Spirits (Vodka/Whisky/Gin) - add image + responsive */}
        {(activeCategory === 'vodka' || activeCategory === 'whisky' || activeCategory === 'ginTequila') && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {visibleItems.map((item: any, index: number) => (
              <div
                key={index}
                className="group bg-white overflow-hidden shadow-2xl gold-border hover:shadow-[#D4AF37]/25 transition-all rounded-3xl"
              >
                <div className="p-5 sm:p-8 bg-gradient-to-r from-[#151B4D] to-[#1A237E] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-36 h-36 opacity-5">
                    <img src="/logo.png" alt="" className="w-full h-full object-contain" />
                  </div>
                  <h3 style={{ fontFamily: 'Cinzel, serif' }} className="text-2xl sm:text-3xl font-bold text-white tracking-wide relative z-10">
                    {item.name}
                  </h3>
                </div>

                <div className="p-5 sm:p-8 bg-white space-y-6">
                  <ImageBlock src={item.image || getItemImage(activeCategory, item)} alt={item.name} badge={language === 'mn' ? 'Сонголт' : 'Selection'} />

                  <div className="space-y-4">
                    {item.sizes.map((size: any, sizeIndex: number) => (
                      <div
                        key={sizeIndex}
                        className="flex justify-between items-center py-3 border-b border-[#D4AF37]/20 last:border-0"
                      >
                        <span className="text-gray-700 font-semibold text-sm sm:text-base uppercase tracking-wide">
                          {size.size}
                        </span>
                        <span className="text-xl sm:text-2xl font-bold gold-text">{formatPrice(size.price)}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowBooking(true)}
                    style={{ fontFamily: 'Cinzel, serif' }}
                    className="w-full rounded-2xl bg-[#D4AF37] hover:bg-[#BF953F] text-[#151B4D] py-3 font-bold uppercase tracking-[0.16em] transition-all shadow-lg"
                  >
                    {language === 'mn' ? 'Захиалга хийх' : 'Make Reservation'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Wine */}
        {activeCategory === 'wine' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-7">
            {visibleItems.map((item: any, index: number) => (
              <div
                key={index}
                className="group bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 rounded-3xl"
              >
                <div className="p-4 sm:p-5">
                  <ImageBlock src={item.image || getItemImage('wine', item)} alt={item.name} />
                </div>

                <div className="px-5 pb-6 sm:px-6 sm:pb-7 text-center">
                  <h3 style={{ fontFamily: 'Cinzel, serif' }} className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                    {item.name}
                  </h3>
                  <div className="mt-5 border-t border-[#D4AF37]/20 pt-4">
                    <span className="text-xl sm:text-2xl font-bold gold-text">{formatPrice(item.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Liqueur */}
        {activeCategory === 'liqueur' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-7">
            {visibleItems.map((item: any, index: number) => (
              <div
                key={index}
                className="group bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 rounded-3xl"
              >
                <div className="p-4 sm:p-5">
                  <ImageBlock src={item.image || getItemImage('liqueur', item)} alt={item.name} />
                </div>

                <div className="px-5 pb-6 sm:px-6 sm:pb-7 text-center">
                  <h3 style={{ fontFamily: 'Cinzel, serif' }} className="text-lg sm:text-xl font-bold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">{item.size}</p>
                  <div className="mt-5 border-t border-[#D4AF37]/20 pt-4">
                    <span className="text-xl sm:text-2xl font-bold gold-text">{formatPrice(item.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* CTA */}
      <section className="py-16 sm:py-20 text-center px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-3xl mx-auto gold-border p-7 sm:p-10 md:p-12 relative overflow-hidden card-shimmer bg-white rounded-3xl">
          <div className="absolute -top-10 -right-10 opacity-5">
            <img src="/logo.png" alt="" className="w-56 sm:w-64" />
          </div>
          <h2 style={{ fontFamily: 'Cinzel, serif' }} className="text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 gold-text font-bold tracking-tight">
            {language === 'mn' ? 'Бэлэн үү?' : 'Ready for your encore?'}
          </h2>
          <p style={{ fontFamily: 'Playfair Display, serif' }} className="mb-8 sm:mb-10 text-gray-600 italic text-base sm:text-lg">
            {language === 'mn'
              ? 'Захиалгаа өнөөдөр хийж, дурсамжтай үдшийг эхлүүлээрэй.'
              : 'Reservations are highly recommended for weekend sessions.'}
          </p>
          <button
            onClick={() => setShowBooking(true)}
            style={{ fontFamily: 'Cinzel, serif' }}
            className="rounded-2xl bg-[#D4AF37] hover:bg-[#BF953F] text-[#151B4D] px-8 sm:px-12 py-4 font-bold uppercase tracking-[0.2em] transition-all shadow-xl"
          >
            {language === 'mn' ? 'Захиалга өгөх' : 'Reserve Now'}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="bg-[#151B4D] text-white py-12 sm:py-16 px-4 sm:px-6 gold-border"
        style={{ borderTop: '2px solid', borderImageSource: 'linear-gradient(45deg, #BF953F, #FCF6BA, #B38728)', borderImageSlice: 1 }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 sm:gap-12">
          <div>
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <img src="/logo.png" alt="Grand Melody" className="h-14 sm:h-16 w-auto" />
            </div>
            <p className="opacity-70 leading-relaxed mb-6">
              {language === 'mn'
                ? 'Монголын шилдэг VIP караоке. Luxury туршлага, дэлхийн чанарын үйлчилгээ.'
                : "Mongolia's finest VIP karaoke. Luxury experience, world-class service."}
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: 'Cinzel, serif' }} className="font-bold uppercase tracking-widest mb-5 sm:mb-6 text-[#D4AF37] text-xs sm:text-sm">
              {language === 'mn' ? 'Ажиллах цаг' : 'Hours'}
            </h4>
            <ul className="space-y-2 opacity-70 text-sm">
              <li>{language === 'mn' ? 'Да-Пү: 18:00 - 01:00' : 'Mon-Thu: 6PM - 1AM'}</li>
              <li>{language === 'mn' ? 'Ба-Ня: 14:00 - 03:00' : 'Fri-Sat: 2PM - 3AM'}</li>
              <li>{language === 'mn' ? 'Ням: 14:00 - 24:00' : 'Sun: 2PM - Midnight'}</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: 'Cinzel, serif' }} className="font-bold uppercase tracking-widest mb-5 sm:mb-6 text-[#D4AF37] text-xs sm:text-sm">
              {language === 'mn' ? 'Холбоо барих' : 'Contact'}
            </h4>
            <address className="not-italic opacity-70 space-y-2 text-sm">
              Улаанбаатар
              <br />
              +976 XXXX XXXX
              <br />
              info@grandmelody.mn
            </address>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 sm:mt-16 pt-7 border-t border-white/10 text-center opacity-40 text-xs sm:text-sm">
          © 2026 Grand Melody VIP Karaoke. All Rights Reserved.
        </div>
      </footer>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white shadow-2xl max-w-md w-full p-6 sm:p-8 relative gold-border rounded-3xl">
            <button
              onClick={() => setShowBooking(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ✕
            </button>

            <h2 style={{ fontFamily: 'Cinzel, serif' }} className="text-2xl sm:text-3xl gold-text font-bold mb-6 tracking-wide">
              {language === 'mn' ? 'Захиалга өгөх' : 'Make a Reservation'}
            </h2>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert(language === 'mn' ? 'Таны захиалга амжилттай илгээгдлээ!' : 'Booking sent!');
                setShowBooking(false);
              }}
            >
              <div>
                <label style={{ fontFamily: 'Cinzel, serif' }} className="block text-xs tracking-wider uppercase text-gray-700 mb-2">
                  {language === 'mn' ? 'Нэр' : 'Name'}
                </label>
                <input type="text" required className="w-full rounded-2xl px-4 py-3 border border-[#D4AF37]/30 bg-white text-gray-900 focus:border-[#D4AF37] focus:outline-none transition-colors" />
              </div>

              <div>
                <label style={{ fontFamily: 'Cinzel, serif' }} className="block text-xs tracking-wider uppercase text-gray-700 mb-2">
                  {language === 'mn' ? 'Утас' : 'Phone'}
                </label>
                <input type="tel" required className="w-full rounded-2xl px-4 py-3 border border-[#D4AF37]/30 bg-white text-gray-900 focus:border-[#D4AF37] focus:outline-none transition-colors" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label style={{ fontFamily: 'Cinzel, serif' }} className="block text-xs tracking-wider uppercase text-gray-700 mb-2">
                    {language === 'mn' ? 'Огноо' : 'Date'}
                  </label>
                  <input type="date" required className="w-full rounded-2xl px-4 py-3 border border-[#D4AF37]/30 bg-white text-gray-900 focus:border-[#D4AF37] focus:outline-none transition-colors" />
                </div>

                <div>
                  <label style={{ fontFamily: 'Cinzel, serif' }} className="block text-xs tracking-wider uppercase text-gray-700 mb-2">
                    {language === 'mn' ? 'Хүний тоо' : 'Guests'}
                  </label>
                  <input type="number" min="1" required className="w-full rounded-2xl px-4 py-3 border border-[#D4AF37]/30 bg-white text-gray-900 focus:border-[#D4AF37] focus:outline-none transition-colors" />
                </div>
              </div>

              <button
                type="submit"
                style={{ fontFamily: 'Cinzel, serif' }}
                className="w-full rounded-2xl py-4 bg-[#D4AF37] hover:bg-[#BF953F] text-[#151B4D] font-bold uppercase tracking-[0.15em] transition-all shadow-lg mt-6"
              >
                {language === 'mn' ? 'Илгээх' : 'Submit'}
              </button>
            </form>

            <p className="mt-5 text-xs text-gray-500">
              {language === 'mn'
                ? 'Зургуудаа /public/assets/menu/... дотор байрлуулбал автоматаар гарна.'
                : 'Place images under /public/assets/menu/... and they will show automatically.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
