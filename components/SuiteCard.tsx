
import React from 'react';
import { Suite } from '../types/index';
import { GoldButton } from './GoldButton';
import { CONTACT_INFO } from '../data/constants';

interface SuiteCardProps {
  suite: Suite;
}

export const SuiteCard: React.FC<SuiteCardProps> = ({ suite }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl gold-border-card bg-deep-blue flex flex-col h-full transform transition-all duration-500 hover:-translate-y-2">
      <div className="aspect-[4/5] overflow-hidden">
        <img 
          alt={suite.name} 
          className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
          src={suite.imageUrl} 
        />
      </div>
      <div className="p-8 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <h3 className="gold-heading text-xl md:text-2xl">{suite.name}</h3>
          <span className="text-[10px] tracking-[0.2em] text-gold-primary/70 uppercase">{suite.capacity}</span>
        </div>
        <p className="text-white/70 text-sm leading-relaxed mb-8 flex-1">
          {suite.description}
        </p>
        <GoldButton text="BOOK SUITE" revealText={CONTACT_INFO.phone} fullWidth />
      </div>
    </div>
  );
};
