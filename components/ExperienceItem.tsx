
import React from 'react';
import { Experience } from '../types/index';

interface ExperienceItemProps {
  experience: Experience;
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience }) => {
  return (
    <div className="flex gap-6 group">
      <span className="material-symbols-outlined text-gold-primary text-4xl md:text-5xl group-hover:scale-110 transition-transform">
        {experience.icon}
      </span>
      <div>
        <h4 className="gold-heading text-lg md:text-xl mb-2" id={experience.title.includes('DRINK') ? 'drinks' : undefined}>
          {experience.title}
        </h4>
        <p className="white-body text-sm md:text-base text-white/70 leading-relaxed">
          {experience.description}
        </p>
      </div>
    </div>
  );
};
