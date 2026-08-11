import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Clock, 
  Facebook, Instagram, Linkedin, Twitter, Youtube, Sparkles 
} from 'lucide-react';
import { motion } from 'motion/react';
import { getAdminContent } from '../lib/adminState';

export const ContactView: React.FC = () => {
  const [content, setContent] = useState(getAdminContent());

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data === 'object') setContent(prev => ({ ...prev, ...data }));
      })
      .catch(console.error);
  }, []);
  const rawNumber = content.contactHelpline || '9788545519';
  const cleanNumber = rawNumber.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent('Hello AQUA WORLD, I have an inquiry regarding your RO purifiers and filters.')}`;

  const contactInfos = [
    { 
      icon: <Phone className="w-5 h-5 text-[#00B4D8]" />, 
      title: 'Customer Helpline', 
      details: content.contactHelpline, 
      sub: 'Toll-Free (24/7 Priority Emergency support)',
      link: `tel:${cleanNumber}`
    },
    { 
      icon: (
        <svg className="w-5 h-5 fill-current text-[#25D366]" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      ),
      title: 'WhatsApp Official Chat', 
      details: content.contactHelpline, 
      sub: 'Click to start instant WhatsApp conversation',
      link: whatsappUrl,
      isExternal: true
    },
    { 
      icon: <Mail className="w-5 h-5 text-[#00B4D8]" />, 
      title: 'Official Email Inbox', 
      details: content.contactEmail, 
      sub: 'Replies within 2 hours guaranteed',
      link: `mailto:${content.contactEmail}`
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
          <div className="pt-4 flex justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Connect on Official WhatsApp</span>
            </a>
          </div>
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
            {contactInfos.map((info, idx) => {
              const CardTag = info.link ? 'a' : 'div';
              return (
                <CardTag 
                  key={idx}
                  href={info.link}
                  target={info.isExternal ? "_blank" : undefined}
                  rel={info.isExternal ? "noopener noreferrer" : undefined}
                  className={`bg-white/70 backdrop-blur-md border border-white/80 p-5 rounded-2xl shadow-md space-y-3 transition-all ${info.link ? 'hover:shadow-lg hover:border-blue-200 cursor-pointer block' : ''}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                    {info.icon}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-display font-bold text-sm text-[#023E8A] leading-tight flex items-center justify-between">
                      <span>{info.title}</span>
                      {info.link && <span className="text-[10px] text-[#00B4D8] uppercase font-bold">Open &rarr;</span>}
                    </h4>
                    <p className="font-sans text-slate-700 text-xs font-medium pt-1">{info.details}</p>
                    <p className="font-sans text-slate-400 text-[10px] leading-relaxed">{info.sub}</p>
                  </div>
                </CardTag>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
