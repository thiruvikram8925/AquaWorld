import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Target, Eye, ShieldCheck, Award, HeartPulse, 
  Leaf, CheckCircle2 
} from 'lucide-react';
import { motion } from 'motion/react';
import { getAdminContent } from '../lib/adminState';

export const AboutView: React.FC = () => {
  const [content, setContent] = useState(getAdminContent());

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data === 'object') setContent(prev => ({ ...prev, ...data }));
      })
      .catch(console.error);
  }, []);

  return (
    <div className="bg-transparent py-4 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* 1. ABOUT HERO BANNER - Completely transparent background, clean typography */}
      <section className="text-center pt-6 pb-2 space-y-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#00B4D8]/20 text-[#00B4D8] text-xs font-semibold tracking-wider uppercase"
        >
          <Sparkles className="w-3 h-3" />
          <span>{content.aboutBadge}</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-display font-extrabold text-3xl sm:text-4xl text-[#023E8A] tracking-tight uppercase"
        >
          {content.aboutTitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-sans text-[#023E8A]/75 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed font-semibold uppercase tracking-wider"
        >
          {content.aboutDesc}
        </motion.p>
      </section>

      {/* 2. COMPANY INTRODUCTION - Compact Text-Only Centered Layout (Removed image and stats grid) */}
      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="bg-white/80 backdrop-blur-md border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-md space-y-4 max-w-3xl mx-auto text-center"
      >
        <div className="space-y-1 pb-3 border-b border-slate-100">
          <span className="text-[#00B4D8] font-mono text-[10px] font-bold tracking-[0.2em] uppercase">Enterprise Summary</span>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#023E8A]">{content.aboutSummaryTitle}</h2>
        </div>
        <div className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
          <p>
            {content.aboutSummaryText1}
          </p>
          <p>
            {content.aboutSummaryText2}
          </p>
        </div>
      </motion.section>

      {/* 3. MISSION & VISION GRIDS - Compact and Clean */}
      <section className="py-2 bg-transparent max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Mission Card */}
          <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
                <Target className="w-4 h-4 text-[#023E8A]" />
              </div>
              <h3 className="font-display font-bold text-sm text-[#023E8A] uppercase tracking-wide">Our Mission</h3>
              <p className="font-sans text-slate-500 text-xs leading-relaxed">
                To engineer premium, high-integrity water purifiers that blend advanced technology with sustainable filtration methods, ensuring safe and premium water access for all.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center border border-cyan-100">
                <Eye className="w-4 h-4 text-[#00B4D8]" />
              </div>
              <h3 className="font-display font-bold text-sm text-[#023E8A] uppercase tracking-wide">Our Vision</h3>
              <p className="font-sans text-slate-500 text-xs leading-relaxed">
                To be the global gold standard in water purification, driving health-focused innovations that enrich families, sustain ecosystems, and guarantee safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CUSTOMERS TRUST US */}
      <section className="py-2 max-w-4xl mx-auto space-y-4">
        <div className="text-center space-y-1">
          <span className="text-[#00B4D8] font-mono text-[10px] font-bold tracking-[0.2em] uppercase">Trust Metrics</span>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#023E8A]">Why Customers Trust Us</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/60 p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#023E8A]">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
            <h4 className="font-display font-bold text-xs text-[#023E8A]">Certified Safe</h4>
            <p className="font-sans text-[11px] text-slate-500 leading-relaxed">
              Every unit goes through rigorous double pressure checks and safety validation before shipping.
            </p>
          </div>

          <div className="bg-white/60 p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center text-[#00B4D8]">
              <Award className="w-4.5 h-4.5" />
            </div>
            <h4 className="font-display font-bold text-xs text-[#023E8A]">Award Winning Tech</h4>
            <p className="font-sans text-[11px] text-slate-500 leading-relaxed">
              Our RO + UV filter cores are nationally recognized for superior mineral retention capabilities.
            </p>
          </div>

          <div className="bg-white/60 p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#023E8A]">
              <HeartPulse className="w-4.5 h-4.5" />
            </div>
            <h4 className="font-display font-bold text-xs text-[#023E8A]">Active Mineralization</h4>
            <p className="font-sans text-[11px] text-slate-500 leading-relaxed">
              Maintains optimal pH levels while infusing beneficial copper, magnesium, and calcium.
            </p>
          </div>

          <div className="bg-white/60 p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center text-[#00B4D8]">
              <Leaf className="w-4.5 h-4.5" />
            </div>
            <h4 className="font-display font-bold text-xs text-[#023E8A]">Eco-Conscious</h4>
            <p className="font-sans text-[11px] text-slate-500 leading-relaxed">
              Configured to reduce drain-water reject ratios by up to 45% compared to standard purifiers.
            </p>
          </div>
        </div>
      </section>

      {/* 5. BENEFITS OF WATER PURIFIERS */}
      <section className="py-2 max-w-4xl mx-auto space-y-4">
        <div className="text-center space-y-1">
          <span className="text-[#00B4D8] font-mono text-[10px] font-bold tracking-[0.2em] uppercase">Health Guidelines</span>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#023E8A]">Core Purification Advantages</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/75 rounded-xl border border-slate-100 shadow-sm space-y-1">
            <CheckCircle2 className="w-4 h-4 text-[#00B4D8]" />
            <h4 className="font-display font-bold text-xs text-[#023E8A] pt-0.5">Toxic Heavy Metals Rejection</h4>
            <p className="font-sans text-[11px] text-slate-500 leading-relaxed">
              Rejects lead, arsenic, mercury, and chromium from your water source securely.
            </p>
          </div>

          <div className="p-4 bg-white/75 rounded-xl border border-slate-100 shadow-sm space-y-1">
            <CheckCircle2 className="w-4 h-4 text-[#00B4D8]" />
            <h4 className="font-display font-bold text-xs text-[#023E8A] pt-0.5">Microbe Eliminator</h4>
            <p className="font-sans text-[11px] text-slate-500 leading-relaxed">
              UV disinfects and removes 99.99% of active viruses, bacteria, and cysts.
            </p>
          </div>

          <div className="p-4 bg-white/75 rounded-xl border border-slate-100 shadow-sm space-y-1">
            <CheckCircle2 className="w-4 h-4 text-[#00B4D8]" />
            <h4 className="font-display font-bold text-xs text-[#023E8A] pt-0.5">Optimized Taste Quotient</h4>
            <p className="font-sans text-[11px] text-slate-500 leading-relaxed">
              Post-carbon taste enhancers produce sweet, light, and perfectly digestible drinking water.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
