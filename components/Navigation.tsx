
import React from 'react';
import { LOGO_URLS } from '../data/constants';

export const Navigation: React.FC = () => {
  return (
    <nav className="fixed w-full z-50 top-0 bg-royal-blue/95 border-b border-gold-primary/30 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center py-4">
        <div className="mb-4">
          <img 
            alt="Grand Melody Logo" 
            className="h-12 md:h-16 w-auto" 
            src={LOGO_URLS.nav} 
          />
        </div>
        <div className="flex items-center space-x-8 md:space-x-12">
          <a className="gold-heading text-[10px] md:text-sm tracking-[0.2em] hover:text-white transition-colors" href="#suites">SUITES</a>
          <a className="gold-heading text-[10px] md:text-sm tracking-[0.2em] hover:text-white transition-colors" href="#menu">FOOD MENU</a>
          <a className="gold-heading text-[10px] md:text-sm tracking-[0.2em] hover:text-white transition-colors" href="#drinks">DRINK LIST</a>
        </div>
      </div>
    </nav>
  );
};
