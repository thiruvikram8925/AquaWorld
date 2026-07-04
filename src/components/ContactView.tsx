import React from 'react';
import { 
  Phone, Mail, MapPin, Clock, 
  Facebook, Instagram, Linkedin, Twitter, Youtube, Sparkles 
} from 'lucide-react';
import { motion } from 'motion/react';
import { getAdminContent } from '../lib/adminState';

export const ContactView: React.FC = () => {
  const content = getAdminContent();

  const contactInfos = [
    { 
      icon: <Phone className="w-5 h-5 text-[#00B4D8]" />, 
      title: 'Customer Helpline', 
      details: content.contactHelpline, 
      sub: 'Toll-Free (24/7 Priority Emergency support)' 
    },
    { 
      icon: <Mail className="w-5 h-5 text-[#00B4D8]" />, 
      title: 'Official Email Inbox', 
      details: content.contactEmail, 
      sub: 'Replies within 2 hours guaranteed' 
    },
    { 
      icon: <MapPin className="w-5 h-5 text-[#00B4D8]" />, 
      title: 'Corporate HQ Address', 
      details: content.contactAddress, 
      sub: 'Nearest landmark: Electronic City metro station' 
    },
    { 
      icon: <Clock className="w-5 h-5 text-[#00B4D8]" />, 
      title: 'Corporate Working Hours', 
      details: content.contactHours, 
      sub: 'Sunday support available via Helpline only' 
    }
  ];

  return (
    <div className="bg-transparent min-h-screen">
      {/* 1. CONTACT HERO BANNER */}
      <section className="relative py-24 bg-gradient-to-b from-blue-950 to-[#03045E] text-white overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-[#03045E] to-blue-950 opacity-65 pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00B4D8]/10 border border-[#00B4D8]/30 text-[#48CAE4] text-xs font-semibold tracking-wider uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Water Purity Inspection</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight uppercase"
          >
            <span className="text-[#00B4D8]">SANTHOSHKUMAR.M</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-sans text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
          >
            Have questions about TDS reduction, filter lifespan, or need a customized quote? Let us know kindly contact us for more details<br />
            <span className="text-lg sm:text-xl font-bold text-white block mt-2">"Gmail:aquaworldsanthosh@gmail.com"</span>
          </motion.p>
        </div>
      </section>

      {/* 2. CONTACT INFORMATION CONTAINER */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Cards */}
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-[#00B4D8] font-mono text-xs font-bold tracking-[0.2em] uppercase text-left block">Direct Contact</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#023E8A]">Kindly contact us for more details and deliveries process</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactInfos.map((info, idx) => (
              <div 
                key={idx}
                className="bg-white/70 backdrop-blur-md border border-white/80 p-5 rounded-2xl shadow-md space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                  {info.icon}
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-display font-bold text-sm text-[#023E8A] leading-tight">{info.title}</h4>
                  <p className="font-sans text-slate-700 text-xs font-medium pt-1">{info.details}</p>
                  <p className="font-sans text-slate-400 text-[10px] leading-relaxed">{info.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
