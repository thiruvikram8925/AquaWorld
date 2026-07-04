import React, { useState } from 'react';
import { Logo } from './Logo';
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Send, CheckCircle2 } from 'lucide-react';
import { getAdminContent } from '../lib/adminState';

interface FooterProps {
  setActivePage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  const content = getAdminContent();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 5000);
    }
  };

  const handleLinkClick = (pageId: string) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const policies = {
    privacy: {
      title: 'Privacy Policy',
      content: 'At AQUA WORLD, we commit strictly to protecting your security. Your contact data, water inspection reports, and transactional histories are encrypted and never distributed to third-party providers. We use state-of-the-art secure socket layers (SSL) to guard your personal credentials.'
    },
    terms: {
      title: 'Terms & Conditions',
      content: 'Purchases made through this platform are governed by our official standards. All Aqua World purifiers come with a comprehensive 12-month domestic warranty covering all functional electrical parts. Any unauthorized adjustments or custom third-party filter attachments will void active coverage.'
    },
    shipping: {
      title: 'Shipping Policy',
      content: 'We provide complimentary premium express shipping and physical installation within 24 hours of confirmation. Currently servicing all major corporate cities and residential sectors. Our certified installer will transport the machine and complete installation synchronously.'
    },
    refund: {
      title: 'Refund & Returns Policy',
      content: 'Our confidence in purity is absolute. We offer an unconditional 10-day replacement window if the purified water does not meet the specified reduction of TDS or if the unit exhibits any engineering flaw. Refund processing initiates instantly upon physical collection of the device.'
    }
  };

  return (
    <footer id="app-footer" className="bg-[#03045E] text-white pt-16 pb-8 border-t border-blue-900/40 relative overflow-hidden">
      {/* Background visual water waves */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-950 via-[#03045E] to-blue-950 opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <Logo light={true} />
            <p className="text-slate-300 font-sans text-sm leading-relaxed pt-2">
              {content.footerDesc}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-full bg-blue-900/40 hover:bg-[#00B4D8] hover:scale-110 transition-all text-slate-200 hover:text-white" aria-label="Facebook">
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-blue-900/40 hover:bg-[#00B4D8] hover:scale-110 transition-all text-slate-200 hover:text-white" aria-label="Instagram">
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-blue-900/40 hover:bg-[#00B4D8] hover:scale-110 transition-all text-slate-200 hover:text-white" aria-label="LinkedIn">
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-blue-900/40 hover:bg-[#00B4D8] hover:scale-110 transition-all text-slate-200 hover:text-white" aria-label="Twitter">
                <Twitter className="w-4.5 h-4.5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-blue-900/40 hover:bg-[#00B4D8] hover:scale-110 transition-all text-slate-200 hover:text-white" aria-label="YouTube">
                <Youtube className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-base tracking-wider uppercase border-b border-blue-900 pb-2 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 font-sans text-sm text-slate-300">
              <li>
                <button onClick={() => handleLinkClick('home')} className="hover:text-[#00B4D8] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span>•</span> Home
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('shop')} className="hover:text-[#00B4D8] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span>•</span> Shop Purifiers
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('about')} className="hover:text-[#00B4D8] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span>•</span> About Aqua World
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('contact')} className="hover:text-[#00B4D8] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span>•</span> Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div>
            <h3 className="font-display font-semibold text-base tracking-wider uppercase border-b border-blue-900 pb-2 mb-4">
              Policies & Support
            </h3>
            <ul className="space-y-2.5 font-sans text-sm text-slate-300">
              <li>
                <button onClick={() => setActiveModal('privacy')} className="hover:text-[#00B4D8] transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                  <span>•</span> Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('terms')} className="hover:text-[#00B4D8] transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                  <span>•</span> Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('shipping')} className="hover:text-[#00B4D8] transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                  <span>•</span> Shipping Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('refund')} className="hover:text-[#00B4D8] transition-colors flex items-center gap-1.5 cursor-pointer text-left">
                  <span>•</span> Refund Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-display font-semibold text-base tracking-wider uppercase border-b border-blue-900 pb-2 mb-4">
              Join Newsletter
            </h3>
            <p className="text-slate-300 font-sans text-xs leading-relaxed mb-4">
              Subscribe to get active water quality safety tips, health recommendations, and exclusive seasonal product discounts.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Your Corporate Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-blue-950/60 border border-blue-900 text-sm placeholder-slate-400 focus:outline-none focus:border-[#00B4D8] transition-colors pr-10 text-white"
                />
                <button
                  type="submit"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00B4D8] transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <Send className="w-4.5 h-4.5" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/50 p-2.5 rounded-lg border border-emerald-900 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Success! Subscribed for health updates.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-900/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-2">
            <span>{content.footerCopyright}</span>
            <span className="text-slate-600">•</span>
            <button 
              onClick={() => {
                setActivePage('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#00B4D8] text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Admin Portal
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#00B4D8] transition-colors">TUV ISO 9001 Certified</span>
            <span>•</span>
            <span className="hover:text-[#00B4D8] transition-colors">WQA Gold Seal Standard</span>
          </div>
        </div>
      </div>

      {/* Corporate Policy Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full p-8 shadow-2xl relative border border-blue-50">
            <h3 className="font-display font-bold text-xl text-[#023E8A] mb-3">
              {policies[activeModal as keyof typeof policies].title}
            </h3>
            <p className="font-sans text-slate-600 text-sm leading-relaxed mb-6">
              {policies[activeModal as keyof typeof policies].content}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#023E8A] to-[#00B4D8] text-white font-sans text-sm font-semibold hover:shadow-lg transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
