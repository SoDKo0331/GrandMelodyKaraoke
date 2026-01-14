
import React from 'react';
import { GoldButton } from './components/GoldButton';
import { ConciergeChat } from './components/ConciergeChat';
import { Navigation } from './components/Navigation';
import { SuiteCard } from './components/SuiteCard';
import { ExperienceItem } from './components/ExperienceItem';
import { Footer } from './components/Footer';
import { SUITES, EXPERIENCES, CONTACT_INFO, LOGO_URLS } from './data/constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-gold-primary selection:text-royal-blue">
      <Navigation />

      {/* Hero Header */}
      <header className="relative h-screen flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Luxury Karaoke Room" 
            className="w-full h-full object-cover opacity-20 transform scale-110 motion-safe:animate-[pulse_8s_ease-in-out_infinite]" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkqPyAoMqIGRS5NHgWMBzXKOjKeu9A5EQCrY7Vy09aGBB_aKP8NvYecj0uHKtw1T92ssaZUIaYMBF2dGmg78zTyYUPgIu9IREyo9mNUMsfLx379Mef2_RVcTaUyM3aJoihk2-1dXY7MRo-CuR4nmAXzXW7MJzyWy9zrRAI5AIBc1XOaVqoi_YxgfX1nkELgHKjJfLv5_sH5IaLsiI9Fcn55jCgQdLSK9DdrnC_YEUFYupQoN6Avu_tphQeu9rc6bCSxc7PLvNI_J0" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-royal-blue/90 via-royal-blue/20 to-royal-blue"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <img 
            alt="Grand Melody Logo Large" 
            className="h-32 md:h-64 mx-auto mb-8 drop-shadow-[0_0_35px_rgba(212,175,55,0.4)]" 
            src={LOGO_URLS.hero} 
          />
          <h1 className="gold-heading text-4xl md:text-8xl mb-6 tracking-tighter uppercase leading-none">Grand Melody</h1>
          <p className="gold-heading italic text-lg md:text-2xl mb-12 tracking-[0.4em] opacity-90">VIP Karaoke Experience</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <GoldButton text="RESERVE NOW" revealText={CONTACT_INFO.phone} />
            <a 
              className="border-2 border-gold-primary text-gold-primary px-12 py-4 rounded-full font-serif text-sm md:text-lg tracking-widest hover:bg-gold-primary hover:text-royal-blue transition-all duration-300 flex items-center justify-center" 
              href="#suites"
            >
              VIEW SUITES
            </a>
          </div>
        </div>
      </header>

      {/* Suites Section */}
      <section className="py-24 md:py-32 bg-royal-blue relative" id="suites">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="gold-heading text-3xl md:text-6xl mb-4 uppercase tracking-widest">Luxury Suites</h2>
            <div className="w-48 h-1 bg-gradient-to-r from-transparent via-gold-primary to-transparent mx-auto opacity-50"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {SUITES.map((suite) => (
              <SuiteCard key={suite.id} suite={suite} />
            ))}
          </div>
        </div>
      </section>

      {/* VIP Experience Section */}
      <section className="py-24 md:py-32 bg-deep-blue border-y border-gold-primary/20 relative" id="menu">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden gold-border-card aspect-square shadow-2xl">
                <img 
                  alt="VIP Service Experience" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[3s]" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2E9tK9wzr92a0d5raacaCuL8kpcT1J6MhcGqzdQ_3uUdV4WgtwP8fswe46jCUAqV-JqUMfo54LDcNN1sPAeGfJcQeiKetX-87EKU5uHppFSiKKgHHYSj3l2fDP1b_5Eiy0JaaLWjBxr-Dod3gjcpLPWW_fRU9jU5WzlzoEZddYA2fYPL2kbLj37FlePRXq-aYyQBCvQIoE6uihah58E0BW0sAzeaG7Ik9XMBm0YLnMzZTseT4oTS3MkXnvdK6iuP76Y8w0n1lMj8" 
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-royal-blue border border-gold-primary p-6 md:p-10 rounded-lg shadow-2xl hidden lg:block backdrop-blur-md bg-opacity-90">
                <p className="gold-heading text-4xl md:text-6xl font-bold">500K+</p>
                <p className="white-body text-[10px] md:text-[12px] tracking-[0.3em] uppercase text-gold-primary/70">Premium Song Library</p>
              </div>
            </div>

            <div className="space-y-12 md:space-y-16">
              <h2 className="gold-heading text-3xl md:text-5xl leading-tight uppercase tracking-wide">Exclusive VIP Experiences</h2>
              <div className="space-y-12">
                {EXPERIENCES.map((exp, idx) => (
                  <ExperienceItem key={idx} experience={exp} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 md:py-48 bg-royal-blue text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="gold-heading text-3xl md:text-7xl mb-10 uppercase tracking-tighter">Take the Stage</h2>
          <p className="white-body text-base md:text-2xl mb-16 leading-relaxed opacity-80 max-w-2xl mx-auto font-light">
            Join the ranks of the city's elite. Book your private suite today and experience karaoke as it was meant to be: grand, luxurious, and unforgettable.
          </p>
          <GoldButton 
            text="RESERVE NOW" 
            revealText={CONTACT_INFO.phone} 
            className="px-20 py-6 text-xl shadow-[0_20px_50px_rgba(212,175,55,0.3)]"
          />
        </div>
      </section>

      <Footer />
      <ConciergeChat />
    </div>
  );
};

export default App;
