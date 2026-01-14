
import React, { useState, useRef, useEffect } from 'react';
import { getConciergeResponse } from '../services/gemini';
import { ConciergeMessage } from '../types/index';

export const ConciergeChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ConciergeMessage[]>([
    { role: 'model', text: 'Good evening. I am the Grand Concierge. How may I help orchestrate your perfect evening at Grand Melody?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ConciergeMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await getConciergeResponse(input);
    const modelMsg: ConciergeMessage = { role: 'model', text: responseText };
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] font-sans">
      {isOpen ? (
        <div className="bg-deep-blue border border-gold-primary w-[320px] md:w-[400px] h-[500px] rounded-2xl flex flex-col shadow-2xl overflow-hidden border-opacity-50 backdrop-blur-sm">
          <div className="bg-royal-blue p-4 border-b border-gold-primary/30 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-gold-primary">auto_awesome</span>
              <h3 className="gold-heading text-lg tracking-wider uppercase">Grand Concierge</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gold-primary hover:text-white transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#000c24]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-gold-primary text-royal-blue font-semibold' 
                    : 'bg-royal-blue border border-gold-primary/20 text-white/90 shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-royal-blue border border-gold-primary/20 p-3 rounded-xl flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gold-primary rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gold-primary rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-gold-primary rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gold-primary/30 bg-royal-blue flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for a pairing or song..."
              className="flex-1 bg-deep-blue border border-gold-primary/30 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gold-primary text-white placeholder-white/30"
            />
            <button 
              onClick={handleSend}
              className="bg-gold-primary text-royal-blue p-2 rounded-full hover:bg-gold-light transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-xl">send</span>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="gold-shimmer w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95"
          aria-label="Open Concierge Chat"
        >
          <span className="material-symbols-outlined text-3xl">auto_awesome</span>
        </button>
      )}
    </div>
  );
};
