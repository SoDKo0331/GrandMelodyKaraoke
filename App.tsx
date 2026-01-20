import React, { useState, useEffect } from 'react';

// Menu data
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
    { name: 'Eden', sizes: [{ size: '50ML', price: 8000 }, { size: '0.7L', price: 109000 }, { size: '1L', price: 139000 }] },
    { name: 'Evok', sizes: [{ size: '50ML', price: 8000 }, { size: '0.7L', price: 139000 }] },
    { name: 'Velvet', sizes: [{ size: '50ML', price: 9000 }, { size: '0.7L', price: 119000 }, { size: '1L', price: 149000 }] },
    { name: 'Koskenkorva', sizes: [{ size: '50ML', price: 13000 }, { size: '0.7L', price: 169000 }] },
    { name: 'Zubrowka Biola', sizes: [{ size: '0.7L', price: 149000 }, { size: '1L', price: 189000 }] },
    { name: 'Zubrowka Bison Grass', sizes: [{ size: '0.7L', price: 179000 }, { size: '1L', price: 219000 }] },
    { name: 'Finlandia', sizes: [{ size: '50ML', price: 13000 }, { size: '0.7L', price: 179000 }, { size: '1L', price: 239000 }] },
    { name: 'Absolut', sizes: [{ size: '50ML', price: 14000 }, { size: '0.7L', price: 189000 }, { size: '1L', price: 249000 }] },
    { name: 'Beluga', sizes: [{ size: '0.7L', price: 309000 }, { size: '1L', price: 379000 }] },
  ],
  whisky: [
    { name: 'Johnnie Walker', sizes: [{ size: '50ML', price: 14000 }, { size: '0.7L', price: 199000 }, { size: '1L', price: 259000 }] },
    { name: 'Ballantines', sizes: [{ size: '50ML', price: 15000 }, { size: '0.7L', price: 219000 }, { size: '1L', price: 289000 }] },
    { name: 'Jack Daniels', sizes: [{ size: '0.7L', price: 239000 }, { size: '1L', price: 299000 }] },
    { name: 'Wild Turkey', sizes: [{ size: '50ML', price: 15000 }, { size: '0.7L', price: 259000 }] },
    { name: 'Chivas', sizes: [{ size: '0.7L', price: 299000 }, { size: '1L', price: 379000 }] },
    { name: 'Jameson', sizes: [{ size: '50ML', price: 19000 }, { size: '0.7L', price: 279000 }, { size: '1L', price: 359000 }] },
    { name: 'Tenjaku (Japan)', sizes: [{ size: '0.7L', price: 309000 }] },
    { name: 'Glenmorangie', sizes: [{ size: '0.7L', price: 489000 }] },
  ],
  wine: [
    { name: 'Baron d\'Arignac Sweet (White)', price: 69000 },
    { name: 'Calvet Medium Dry (White)', price: 89000 },
    { name: 'La Baume Dry (White)', price: 119000 },
    { name: 'Baron d\'Arignac Sweet (Red)', price: 69000 },
    { name: 'Calvet Medium Dry (Red)', price: 89000 },
    { name: 'La Baume Dry (Red)', price: 119000 },
    { name: 'Paul Bernard (Sparkling)', price: 68000 },
    { name: 'Freixenet (Sparkling)', price: 98000 },
  ],
  ginTequila: [
    { name: 'Gordon\'s', sizes: [{ size: '50ML', price: 13500 }, { size: 'Bottle', price: 189000 }, { size: '1L', price: 249000 }] },
    { name: 'Olmeca Gold', sizes: [{ size: '50ML', price: 13500 }, { size: 'Bottle', price: 189000 }] },
    { name: 'Sierra', sizes: [{ size: '50ML', price: 14500 }, { size: 'Silver Bottle 0.7L', price: 100000 }, { size: 'Barister Bottle', price: 179000 }] },
  ],
  liqueur: [
    { name: 'Baileys', size: '0.7L', price: 199000 },
    { name: 'Jagermister', size: '0.7L', price: 209000 },
    { name: 'Mollys', size: '0.7L', price: 129000 },
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
      birthday: true
    },
    {
      name: 'Eden Set',
      price: 280000,
      items: ['Eden 0.7L 1', 'Сэнгүр 6', 'Bonaqua 3', 'Cola 3'],
      bonus: 'Bonus 2 hours free + French Fries',
      birthday: true
    },
    {
      name: 'Soju Set',
      price: 290000,
      items: ['Soju 4', 'Krush Beer 6', 'Bonaqua 3', 'Cola 3', 'Crispy Chicken', 'French Fries'],
      bonus: 'Bonus 2 hours free',
      birthday: true
    },
    {
      name: 'Gin Set',
      price: 350000,
      items: ['Gin 1', 'Soda or Tonic 6', 'Alkaline Water 3', 'Chips 1', 'Nuts 1'],
      bonus: 'Bonus 2 hours free',
      birthday: true
    },
    {
      name: 'Vodka Set',
      price: 440000,
      items: ['Finlandia 0.7L 1', 'Sengur/Tiger 6', 'Bonaqua 3', 'Cola 3', 'French Fries 1'],
      bonus: 'Bonus 2 hours free + 1 Pizza',
      birthday: true
    },
    {
      name: 'Whisky Set',
      price: 490000,
      items: ['Ballantines/Jonnie Walker 1', 'Tsingtao/Haineken 8', 'Alkaline Water 3', 'Cola 3', 'French Fries 1'],
      bonus: 'Bonus 2 hours free + 1 Pizza',
      birthday: true
    },
    {
      name: 'Grand Melody Set A',
      price: 890000,
      items: ['Finlandia 0.7L 2', 'Tsingtao/Heineken 10', 'Cola/Sprite 8', 'Alkaline Water 8', 'Mixed Meat Platter 2'],
      bonus: 'Bonus 3 hours free + 1 Pizza',
      birthday: true
    },
    {
      name: 'Grand Melody Set B',
      price: 1190000,
      items: ['Jameson 0.7L 2', 'Tsingtao/Kirin 12', 'Alkaline Water 10', 'Cola 10', 'French Fries 2', 'Mixed Meat Platter 2'],
      bonus: 'Bonus 4 hours free + 1 Pizza',
      birthday: true
    },
  ]
};

type Category = 'beer' | 'softDrinks' | 'hotDrinks' | 'vodka' | 'whisky' | 'wine' | 'ginTequila' | 'liqueur' | 'food' | 'pizza' | 'snacks' | 'packages';

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

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('packages');
  const [language, setLanguage] = useState<'mn' | 'en'>('mn');
  const [showBooking, setShowBooking] = useState(false);

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()}₮`;
  };

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300" style={{fontFamily: 'Lato, sans-serif'}}>
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
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.05) 100%);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#D4AF37]/30 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="./assets/loground.png" alt="Grand Melody" className="h-12 w-auto" />
            <span style={{fontFamily: 'Cinzel, serif'}} className="text-xl tracking-[0.2em] hidden md:block gold-text font-bold">GRAND MELODY</span>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => setLanguage(language === 'mn' ? 'en' : 'mn')}
              style={{fontFamily: 'Cinzel, serif'}}
              className="px-4 py-2 rounded-lg border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all text-sm tracking-widest"
            >
              {language === 'mn' ? 'EN' : 'МН'}
            </button>

            <button
              onClick={() => setShowBooking(true)}
              style={{fontFamily: 'Cinzel, serif'}}
              className="bg-[#D4AF37] hover:bg-[#BF953F] text-[#151B4D] px-8 py-2 font-bold uppercase tracking-[0.15em] transition-all text-sm shadow-lg"
            >
              {language === 'mn' ? 'Захиалга' : 'Book Now'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-gray-50"></div>
        <div className="absolute inset-0 opacity-5 flex items-center justify-center">
          <img src="/logo.png" alt="" className="w-96 h-auto" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-6">
          <h1 style={{fontFamily: 'Cinzel, serif'}} className="text-5xl lg:text-7xl mb-6 tracking-tighter gold-text font-bold">
            Grand Melody VIP Karaoke
          </h1>
          <p style={{fontFamily: 'Playfair Display, serif'}} className="italic text-xl lg:text-2xl text-gray-600 mb-8">
            {language === 'mn' 
              ? 'Luxury танд зориулагдсан. Монголын шилдэг караоке туршлага.'
              : 'Where luxury meets harmony. Mongolia\'s finest karaoke experience.'}
          </p>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
        </div>
      </header>

      {/* Category Nav */}
      <div className="sticky top-[73px] z-40 bg-white/95 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto scrollbar-hide py-6 gap-3">
            {(Object.keys(categoryNames) as Category[]).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                style={{fontFamily: 'Cinzel, serif'}}
                className={`flex-shrink-0 px-8 py-4 text-xs tracking-[0.2em] uppercase transition-all whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-[#151B4D] to-[#1A237E] text-white shadow-xl scale-105 gold-border'
                    : 'bg-white border-2 border-[#D4AF37]/40 text-gray-700 hover:border-[#D4AF37] hover:shadow-lg hover:scale-105'
                }`}
              >
                {categoryNames[category][language]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Packages */}
        {activeCategory === 'packages' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {menuData.packages.map((pkg, index) => (
              <div key={index} className="bg-white card-shimmer overflow-hidden shadow-2xl transition-all hover:shadow-[#D4AF37]/30 gold-border">
                <div className="bg-gradient-to-r from-[#151B4D] to-[#1A237E] p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <img src="/logo.png" alt="" className="w-full h-full object-contain" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 style={{fontFamily: 'Cinzel, serif'}} className="text-3xl text-white mb-2 tracking-wide">{pkg.name}</h3>
                        <p className="text-4xl font-bold gold-text">{formatPrice(pkg.price)}</p>
                      </div>
                      {pkg.birthday && (
                        <div style={{fontFamily: 'Cinzel, serif'}} className="bg-[#D4AF37] text-[#151B4D] px-3 py-1 text-xs tracking-widest uppercase font-bold">
                          Birthday
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-8 space-y-6 bg-white">
                  <div>
                    <h4 style={{fontFamily: 'Cinzel, serif'}} className="font-bold text-gray-800 mb-4 text-sm tracking-widest uppercase">
                      {language === 'mn' ? 'Багцад багтсан' : 'Includes'}
                    </h4>
                    <ul className="space-y-3">
                      {pkg.items.map((item, i) => (
                        <li key={i} className="flex items-start text-gray-700">
                          <span className="text-[#D4AF37] mr-3 text-lg">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="gold-border p-4 bg-[#FBF5B7]/10">
                    <div className="flex items-start space-x-3 text-[#B38728]">
                      <svg className="w-8 h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
                      </svg>
                      <div>
                        <p style={{fontFamily: 'Cinzel, serif'}} className="font-bold uppercase text-sm tracking-wider">{language === 'mn' ? 'Урамшуулал' : 'Bonus'}</p>
                        <p className="text-sm mt-1">{pkg.bonus}</p>
                        {pkg.birthday && (
                          <p className="text-xs mt-2 opacity-80">{language === 'mn' ? '+ Төрсөн өдрийн чимэглэл үнэгүй' : '+ Free birthday decoration'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Food, Pizza, Snacks */}
        {(activeCategory === 'food' || activeCategory === 'pizza' || activeCategory === 'snacks') && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuData[activeCategory].map((item: any, index: number) => (
              <div key={index} className="bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all gold-border group">
                {item.image ? (
                  <div className="h-56 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                ) : (
                  <div className="h-56 bg-gradient-to-br from-[#1A237E]/5 to-[#151B4D]/10 flex items-center justify-center">
                    <svg className="w-20 h-20 text-[#D4AF37]/20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-8-15.03-8-15.03 0h15.03zM1.02 17h15v2h-15z"/>
                    </svg>
                  </div>
                )}
                <div className="p-6 bg-white">
                  <h3 style={{fontFamily: 'Cinzel, serif'}} className="text-xl font-bold text-gray-900 mb-2">
                    {language === 'mn' ? item.name : (item.nameEn || item.name)}
                  </h3>
                  {item.description && (
                    <p style={{fontFamily: 'Playfair Display, serif'}} className="text-sm text-gray-600 mb-4 italic leading-relaxed">{item.description}</p>
                  )}
                  <div className="pt-4 border-t-2 border-[#D4AF37]/20">
                    <span className="text-3xl font-bold gold-text">{formatPrice(item.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Beer, Soft Drinks, Hot Drinks */}
        {(activeCategory === 'beer' || activeCategory === 'softDrinks' || activeCategory === 'hotDrinks') && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuData[activeCategory].map((item: any, index: number) => (
              <div key={index} className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] group">
                <div className="p-8">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 style={{fontFamily: 'Cinzel, serif'}} className="text-xl font-bold text-gray-900 mb-2 tracking-wide">{item.name}</h3>
                      {item.size && <p style={{fontFamily: 'Lato'}} className="text-sm text-gray-500 uppercase tracking-wider">{item.size}</p>}
                    </div>
                    <span className="text-2xl font-bold gold-text">{formatPrice(item.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Spirits (Vodka, Whisky, Gin) */}
        {(activeCategory === 'vodka' || activeCategory === 'whisky' || activeCategory === 'ginTequila') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {menuData[activeCategory].map((item: any, index: number) => (
              <div key={index} className="bg-white card-shimmer overflow-hidden shadow-2xl gold-border hover:shadow-[#D4AF37]/30 transition-all">
                <div className="bg-gradient-to-r from-[#151B4D] to-[#1A237E] p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <img src="/logo.png" alt="" className="w-full h-full object-contain" />
                  </div>
                  <h3 style={{fontFamily: 'Cinzel, serif'}} className="text-3xl font-bold text-white tracking-wide relative z-10">{item.name}</h3>
                </div>
                <div className="p-8 bg-white">
                  <div className="space-y-5">
                    {item.sizes.map((size: any, sizeIndex: number) => (
                      <div key={sizeIndex} className="flex justify-between items-center py-4 border-b-2 border-[#D4AF37]/20 last:border-0">
                        <span style={{fontFamily: 'Lato'}} className="text-gray-700 font-medium text-lg uppercase tracking-wide">{size.size}</span>
                        <span className="text-2xl font-bold gold-text">{formatPrice(size.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Wine */}
        {activeCategory === 'wine' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuData.wine.map((item, index) => (
              <div key={index} className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all border-2 border-[#D4AF37]/30 hover:border-[#D4AF37]">
                <div className="p-8">
                  <div className="text-center space-y-4">
                    <svg className="w-16 h-16 mx-auto text-[#D4AF37]/40" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 3v6c0 2.97 2.16 5.43 5 5.91V19H8v2h8v-2h-3v-4.09c2.84-.48 5-2.94 5-5.91V3H6zm10 5H8V5h8v3z"/>
                    </svg>
                    <h3 style={{fontFamily: 'Cinzel, serif'}} className="text-lg font-bold text-gray-900 leading-tight">{item.name}</h3>
                    <div className="pt-4 border-t-2 border-[#D4AF37]/20">
                      <span className="text-2xl font-bold gold-text">{formatPrice(item.price)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Liqueur */}
        {activeCategory === 'liqueur' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuData.liqueur.map((item, index) => (
              <div key={index} className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all border-2 border-[#D4AF37]/30 hover:border-[#D4AF37]">
                <div className="p-8">
                  <div className="text-center space-y-4">
                    <svg className="w-16 h-16 mx-auto text-[#D4AF37]/40" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 14c0 1.3.84 2.4 2 2.82V20H3v2h6v-2H7v-3.18C8.16 16.4 9 15.3 9 14V6H3v8zm2-6h2v3H5V8zm14-2.5c0-.83-.67-1.5-1.5-1.5h-3c-.83 0-1.5.67-1.5 1.5V9c0 .83.67 1.5 1.5 1.5H14v1.5c0 .83.67 1.5 1.5 1.5h3c.83 0 1.5-.67 1.5-1.5V5.5zm-1.5 5h-3V9h3v1.5z"/>
                    </svg>
                    <h3 style={{fontFamily: 'Cinzel, serif'}} className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <p style={{fontFamily: 'Lato'}} className="text-sm text-gray-500 uppercase tracking-wide">{item.size}</p>
                    <div className="pt-4 border-t-2 border-[#D4AF37]/20">
                      <span className="text-2xl font-bold gold-text">{formatPrice(item.price)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* CTA */}
      <section className="py-24 text-center px-6 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-3xl mx-auto gold-border p-12 relative overflow-hidden card-shimmer bg-white">
          <div className="absolute -top-10 -right-10 opacity-5">
            <img src="/logo.png" alt="" className="w-64" />
          </div>
          <h2 style={{fontFamily: 'Cinzel, serif'}} className="text-4xl lg:text-5xl mb-6 gold-text font-bold tracking-tight">
            {language === 'mn' ? 'Бэлэн үү?' : 'Ready for your encore?'}
          </h2>
          <p style={{fontFamily: 'Playfair Display, serif'}} className="mb-10 text-gray-600 italic text-lg">
            {language === 'mn' 
              ? 'Захиалгаа өнөөдөр хийж, дурсамжтай үдшийг эхлүүлээрэй.'
              : 'Reservations are highly recommended for weekend sessions.'}
          </p>
          <button
            onClick={() => setShowBooking(true)}
            style={{fontFamily: 'Cinzel, serif'}}
            className="bg-[#D4AF37] hover:bg-[#BF953F] text-[#151B4D] px-12 py-4 font-bold uppercase tracking-[0.2em] transition-all shadow-xl"
          >
            {language === 'mn' ? 'Захиалга өгөх' : 'Reserve Now'}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#151B4D] text-white py-16 px-6 gold-border" style={{borderTop: '2px solid', borderImageSource: 'linear-gradient(45deg, #BF953F, #FCF6BA, #B38728)', borderImageSlice: 1}}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="Grand Melody" className="h-16 w-auto" />
            </div>
            <p className="opacity-70 leading-relaxed mb-6">
              {language === 'mn' 
                ? 'Монголын шилдэг VIP караоке. Luxury туршлага, дэлхийн чанарын үйлчилгээ.'
                : 'Mongolia\'s finest VIP karaoke. Luxury experience, world-class service.'}
            </p>
          </div>
          <div>
            <h4 style={{fontFamily: 'Cinzel, serif'}} className="font-bold uppercase tracking-widest mb-6 text-[#D4AF37] text-sm">
              {language === 'mn' ? 'Ажиллах цаг' : 'Hours'}
            </h4>
            <ul className="space-y-2 opacity-70">
              <li>{language === 'mn' ? 'Да-Пү: 18:00 - 01:00' : 'Mon-Thu: 6PM - 1AM'}</li>
              <li>{language === 'mn' ? 'Ба-Ня: 14:00 - 03:00' : 'Fri-Sat: 2PM - 3AM'}</li>
              <li>{language === 'mn' ? 'Ням: 14:00 - 24:00' : 'Sun: 2PM - Midnight'}</li>
            </ul>
          </div>
          <div>
            <h4 style={{fontFamily: 'Cinzel, serif'}} className="font-bold uppercase tracking-widest mb-6 text-[#D4AF37] text-sm">
              {language === 'mn' ? 'Холбоо барих' : 'Contact'}
            </h4>
            <address className="not-italic opacity-70 space-y-2">
              Улаанбаатар<br />
              +976 XXXX XXXX<br />
              info@grandmelody.mn
            </address>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center opacity-40 text-sm">
          © 2026 Grand Melody VIP Karaoke. All Rights Reserved.
        </div>
      </footer>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white shadow-2xl max-w-md w-full p-8 relative gold-border">
            <button
              onClick={() => setShowBooking(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ✕
            </button>
            
            <h2 style={{fontFamily: 'Cinzel, serif'}} className="text-3xl gold-text font-bold mb-6 tracking-wide">
              {language === 'mn' ? 'Захиалга өгөх' : 'Make a Reservation'}
            </h2>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert(language === 'mn' ? 'Таны захиалга амжилттай илгээгдлээ!' : 'Booking sent!'); setShowBooking(false); }}>
              <div>
                <label style={{fontFamily: 'Cinzel, serif'}} className="block text-sm tracking-wider uppercase text-gray-700 mb-2">
                  {language === 'mn' ? 'Нэр' : 'Name'}
                </label>
                <input type="text" required className="w-full px-4 py-3 border-2 border-[#D4AF37]/30 bg-white text-gray-900 focus:border-[#D4AF37] focus:outline-none transition-colors" />
              </div>
              
              <div>
                <label style={{fontFamily: 'Cinzel, serif'}} className="block text-sm tracking-wider uppercase text-gray-700 mb-2">
                  {language === 'mn' ? 'Утас' : 'Phone'}
                </label>
                <input type="tel" required className="w-full px-4 py-3 border-2 border-[#D4AF37]/30 bg-white text-gray-900 focus:border-[#D4AF37] focus:outline-none transition-colors" />
              </div>
              
              <div>
                <label style={{fontFamily: 'Cinzel, serif'}} className="block text-sm tracking-wider uppercase text-gray-700 mb-2">
                  {language === 'mn' ? 'Огноо' : 'Date'}
                </label>
                <input type="date" required className="w-full px-4 py-3 border-2 border-[#D4AF37]/30 bg-white text-gray-900 focus:border-[#D4AF37] focus:outline-none transition-colors" />
              </div>
              
              <div>
                <label style={{fontFamily: 'Cinzel, serif'}} className="block text-sm tracking-wider uppercase text-gray-700 mb-2">
                  {language === 'mn' ? 'Хүний тоо' : 'Guests'}
                </label>
                <input type="number" min="1" required className="w-full px-4 py-3 border-2 border-[#D4AF37]/30 bg-white text-gray-900 focus:border-[#D4AF37] focus:outline-none transition-colors" />
              </div>
              
              <button
                type="submit"
                style={{fontFamily: 'Cinzel, serif'}}
                className="w-full py-4 bg-[#D4AF37] hover:bg-[#BF953F] text-[#151B4D] font-bold uppercase tracking-[0.15em] transition-all shadow-lg mt-6"
              >
                {language === 'mn' ? 'Илгээх' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}