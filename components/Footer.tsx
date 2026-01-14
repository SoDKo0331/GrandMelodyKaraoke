
import React from 'react';
import { CONTACT_INFO, LOGO_URLS } from '../data/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#000c24] border-t border-gold-primary/30 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center">
          <img 
            alt="Grand Melody Logo" 
            className="h-20 md:h-24 mb-12 opacity-80" 
            src={LOGO_URLS.footer} 
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16 w-full text-sm">
            <div>
              <h4 className="gold-heading mb-4 tracking-[0.3em] uppercase">Address</h4>
              <p className="white-body opacity-70 leading-loose">
                {CONTACT_INFO.address.split(', ').map((part, i) => (
                  <React.Fragment key={i}>{part}<br/></React.Fragment>
                ))}
              </p>
            </div>
            <div>
              <h4 className="gold-heading mb-4 tracking-[0.3em] uppercase">Contact</h4>
              <p className="white-body opacity-70 leading-loose">
                Reservations: {CONTACT_INFO.phone}<br/>
                Events: {CONTACT_INFO.email}
              </p>
            </div>
            <div>
              <h4 className="gold-heading mb-4 tracking-[0.3em] uppercase">Hours</h4>
              <p className="white-body opacity-70 leading-loose">
                {CONTACT_INFO.hours.weekday}<br/>
                {CONTACT_INFO.hours.weekend}
              </p>
            </div>
          </div>
          <p className="white-body text-[9px] md:text-[10px] tracking-[0.4em] text-white/30 uppercase font-light">
            © 2024 Grand Melody VIP Karaoke. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
