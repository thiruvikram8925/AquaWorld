import React, { useState, useEffect } from 'react';
import { REVIEWS, BENEFITS } from '../data';
import { getAdminProducts, getAdminCategories, getAdminContent } from '../lib/adminState';
import { Product } from '../types';
import { 
  ArrowRight, Star, ShoppingCart, Eye, 
  Cpu, Droplet, Zap, Leaf, ShieldCheck, Wrench, Tag, Headphones,
  Shield, Flame, Filter, Heart, Sparkles, GlassWater, Award
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  onNavigate: (page: string) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onFilterByCategory?: (category: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onAddToCart,
  onQuickView,
  onFilterByCategory,
}) => {
  // Dynamic Products, Categories, and Content State (Live Sync from Backend API)
  const [productsList, setProductsList] = useState<Product[]>(getAdminProducts());
  const [categoriesList, setCategoriesList] = useState(getAdminCategories());
  const [content, setContent] = useState(getAdminContent());

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProductsList(data);
      })
      .catch(console.error);

    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCategoriesList(data);
      })
      .catch(console.error);

    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data === 'object') setContent(prev => ({ ...prev, ...data }));
      })
      .catch(console.error);
  }, []);

  const dynamicProducts = productsList.filter((p) => (p as any).isEnabled !== false);
  const featuredProducts = dynamicProducts.slice(0, 6);

  // Stats Counters state for animation
  const [stats, setStats] = useState({ clients: 0, purity: 0, saving: 0, locations: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        clients: 24500,
        purity: 99,
        saving: 45,
        locations: 180
      });
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const whyChooseUsData = [
    { icon: <Cpu className="w-6 h-6 text-[#00B4D8]" />, title: 'Advanced RO Technology', desc: 'Next-generation intelligent multi-membrane processing units with active mineralization boosters.' },
    { icon: <Droplet className="w-6 h-6 text-[#00B4D8]" />, title: '99.9% Pure Drinking Water', desc: 'Guaranteed removal of all physical, biological, and chemical pollutants with zero bypass.' },
    { icon: <Zap className="w-6 h-6 text-[#00B4D8]" />, title: 'Energy Efficient', desc: 'Low-power induction transformer pumps which decrease electrical consumption by 35%.' },
    { icon: <Leaf className="w-6 h-6 text-[#00B4D8]" />, title: 'Smart Water Saving', desc: 'Intelligent digital recycling loops which salvage up to 60% of source wastewater.' },
    { icon: <ShieldCheck className="w-6 h-6 text-[#00B4D8]" />, title: 'Long-lasting Filters', desc: 'Structural carbon-fiber composites with triple the lifespan of standard filter cartridges.' },
    { icon: <Wrench className="w-6 h-6 text-[#00B4D8]" />, title: 'Professional Installation', desc: 'Complimentary white-glove installation executed by certified company water-system engineers.' },
    { icon: <Tag className="w-6 h-6 text-[#00B4D8]" />, title: 'Affordable Pricing', desc: 'Premium luxury water safety engineered cleanly to deliver competitive, cost-effective prices.' },
    { icon: <Headphones className="w-6 h-6 text-[#00B4D8]" />, title: 'Excellent Customer Support', desc: 'Round-the-clock technician dispatch, automated filter alarms, and priority local support.' }
  ];

  // Map benefits to aesthetic icons
  const benefitIcons = [
    <Shield className="w-6 h-6 text-emerald-500" />,
    <Flame className="w-6 h-6 text-red-500" />,
    <Filter className="w-6 h-6 text-indigo-500" />,
    <Sparkles className="w-6 h-6 text-cyan-500" />,
    <Sparkles className="w-6 h-6 text-[#00B4D8]" />,
    <GlassWater className="w-6 h-6 text-blue-500" />,
    <Heart className="w-6 h-6 text-rose-500" />,
    <Award className="w-6 h-6 text-amber-500" />
  ];

  const handleCategoryClick = (categoryTitle: string) => {
    if (onFilterByCategory) {
      onFilterByCategory(categoryTitle);
    }
    onNavigate('shop');
  };

  const handleCapacityClick = (capacity: string) => {
    if (onFilterByCategory) {
      onFilterByCategory(`capacity-${capacity}`);
    }
    onNavigate('shop');
  };

  return (
    <div className="overflow-hidden">
      {/* 1. HERO SECTION */}
      <section 
        id="hero-section" 
        className="relative min-h-[90vh] flex items-center bg-cover bg-center bg-no-repeat pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ backgroundImage: 'url(/home1.png)' }}
      >
        {/* Floating background decorative blobs/water droplets */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-cyan-200/20 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse" />
        <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse delay-1000" />
        
        {/* Animated wave path element at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden pointer-events-none">
          <svg className="w-full h-full fill-white/50" viewBox="0 0 1440 74" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,32L60,37.3C120,43,240,53,360,48C480,43,600,21,720,16C840,11,960,21,1080,32C1200,43,1320,53,1380,58.7L1440,64L1440,74L1380,74C1320,74,1200,74,1080,74C960,74,840,74,720,74C600,74,480,74,360,74C240,74,120,74,60,74L0,74Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          {/* Hero Left Content */}
          <div className="max-w-lg space-y-6 text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00B4D8]/10 text-[#00B4D8] rounded-full text-xs font-bold tracking-widest uppercase mb-2 border border-[#00B4D8]/20"
            >
              <span className="flex h-2 w-2 rounded-full bg-[#00B4D8] animate-pulse"></span>
              Premium Hydration Technology
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-black mb-6 text-[#023E8A]"
            >
              {content.heroTitle}<br />
              <span className="text-[#00B4D8]">{content.heroHighlight}</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-base sm:text-lg text-[#023E8A]/80 max-w-md leading-relaxed font-medium"
            >
              {content.heroDesc}
            </motion.p>

            {/* Quick CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-4"
            >
              <button
                onClick={() => onNavigate('about')}
                className="w-full sm:w-auto px-8 py-4 bg-[#023E8A] text-white rounded-2xl font-bold text-lg shadow-2xl shadow-[#023E8A]/30 flex items-center justify-center gap-3 hover:scale-105 transition-transform cursor-pointer"
              >
                About Us
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-8 py-4 bg-white text-[#023E8A] border-2 border-[#023E8A]/10 rounded-2xl font-bold text-lg hover:bg-[#023E8A]/5 transition-colors cursor-pointer"
              >
                Contact Us
              </button>
            </motion.div>
          </div>


        </div>
      </section>

      {/* 2. WATER PURIFIER PRODUCTS SECTION */}
      <section className="py-24 bg-white px-4 sm:px-6 lg:px-8 border-b border-slate-100 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-[#00B4D8] font-mono text-xs font-bold tracking-[0.2em] uppercase">RO capacity range</h2>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#023E8A]">Water Purifier Products</h2>
            <p className="font-sans text-[#023E8A]/70 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
              Explore our premium range of RO water purifiers designed for homes, offices, schools, hospitals, industries, and commercial spaces. Choose the capacity that best suits your needs.
            </p>
          </div>

          {/* Category Navigation (Top) */}
          <div className="flex justify-start md:justify-center items-center gap-3 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory">
            {[
              { label: '7 Litres', value: '7L' },
              { label: '8 Litres', value: '8L' },
              { label: '12 Litres', value: '12L' },
              { label: '25 Litres', value: '25L' },
              { label: '50 Litres', value: '50L' },
              { label: '250 Litres', value: '250L' }
            ].map((cap) => (
              <button
                key={cap.value}
                onClick={() => handleCapacityClick(cap.value)}
                className="snap-center flex-shrink-0 px-6 py-3 rounded-full font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-sm border border-slate-200/80 bg-white hover:border-[#00B4D8] hover:text-[#00B4D8] hover:bg-[#00B4D8]/5 text-[#023E8A]"
              >
                <div className="flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-[#00B4D8]" />
                  <span>{cap.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Capacity Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                capacity: '7L',
                title: '7 Litre Purifiers',
                subtitle: 'Ideal for Small Families',
                desc: 'Perfect for households of 2-3 members. Compact space-saving designs that fit modular kitchens elegantly.',
                badge: 'Domestic',
                features: ['RO + UV + UF', 'Tempered Glass Facia', 'Eco Water Recovery']
              },
              {
                capacity: '8L',
                title: '8 Litre Purifiers',
                subtitle: 'Perfect for Medium Families',
                desc: 'Our most popular range for typical modern homes. Balanced storage capacity with active mineral infusion.',
                badge: 'Best Seller',
                features: ['Active Copper Minerals', 'Stainless Steel Tank', 'Ultra-high Purity']
              },
              {
                capacity: '12L',
                title: '12 Litre Purifiers',
                subtitle: 'Designed for Large Families',
                desc: 'Spacious storage ensuring healthy mineral-rich water is always available for larger households and kitchens.',
                badge: 'Popular',
                features: ['Alkaline Balancer', 'Smart LED Dashboard', 'Priority support']
              },
              {
                capacity: '25L',
                title: '25 Litre Systems',
                subtitle: 'Corporate Office Choice',
                desc: 'Engineered for executive offices, boardrooms, clinics, and large households needing steady high-flow supply.',
                badge: 'Corporate',
                features: ['Hot & Cold Dispensing', 'Carbon Fiber Casing', 'Heavy Duty Flow']
              },
              {
                capacity: '50L',
                title: '50 Litre Purifiers',
                subtitle: 'Commercial Spaces',
                desc: 'High-output purification plants designed for schools, small clinics, and medium corporate facilities.',
                badge: 'Commercial',
                features: ['50 Litres/Hour Flow', 'Stainless Steel Skid', 'Dual RO Membranes']
              },
              {
                capacity: '250L',
                title: '250 Litre Plants',
                subtitle: 'Industrial RO Plants',
                desc: 'Heavy-duty industrial Reverse Osmosis systems serving schools, hospitals, factories, and residential communities.',
                badge: 'Industrial',
                features: ['250 Litres/Hour flow', '70% Recovery Ratio', 'Sand & Carbon Pre-media']
              }
            ].map((card) => (
              <motion.div
                key={card.capacity}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl bg-white/60 backdrop-blur-md border border-white/55 overflow-hidden p-6 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 hover:bg-white/80 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Badge & Capacity */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-[#00B4D8]/10 text-[#00B4D8] text-[10px] font-sans font-extrabold rounded-full tracking-wider uppercase">
                      {card.badge}
                    </span>
                    <span className="text-xl font-display font-black text-[#023E8A] bg-blue-50/50 px-3.5 py-1 rounded-2xl border border-blue-100">
                      {card.capacity}
                    </span>
                  </div>

                  {/* Text Header */}
                  <div>
                    <h3 className="font-display font-extrabold text-lg text-[#023E8A]">{card.title}</h3>
                    <p className="text-[10px] text-[#00B4D8] font-bold uppercase tracking-wider mt-0.5">{card.subtitle}</p>
                  </div>

                  <p className="font-sans text-slate-500 text-xs leading-relaxed">{card.desc}</p>


                </div>

                <div className="pt-6">
                  <button
                    onClick={() => handleCapacityClick(card.capacity)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-[#023E8A] to-[#00B4D8] hover:shadow-lg hover:shadow-blue-300/30 text-white font-sans font-bold text-xs tracking-wider uppercase transition-all cursor-pointer border border-transparent"
                  >
                    <span>Explore {card.capacity} Range</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE AQUA WORLD SECTION */}
      <section className="py-24 bg-transparent px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-[#00B4D8] font-mono text-xs font-bold tracking-[0.2em] uppercase">The Aqua Advantage</h2>
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-[#023E8A]">Why Millions Choose Aqua World</p>
            <p className="font-sans text-[#023E8A]/70 text-sm max-w-xl mx-auto leading-relaxed font-medium">
              We stand apart through our technological superiority, uncompromised safety metrics, and professional support infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUsData.map((item, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-white/70 backdrop-blur-md border border-white/80 shadow-md hover:shadow-xl hover:bg-white/90 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#00B4D8]/10 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-display font-bold text-base text-[#023E8A] mb-2">{item.title}</h3>
                <p className="font-sans text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* 5. BENEFITS OF WATER PURIFICATION (INFOGRAPHIC TIMELINE) */}
      <section className="py-24 bg-transparent px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-[#00B4D8] font-mono text-xs font-bold tracking-[0.2em] uppercase">Clinical Purification</h2>
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-[#023E8A]">Clinical Benefits of Pure Water</p>
            <p className="font-sans text-[#023E8A]/70 text-sm max-w-xl mx-auto leading-relaxed font-medium">
              Consuming multi-stage purified alkaline water supports metabolic equilibrium, shields pediatric immunity, and clears chemical toxicities.
            </p>
          </div>

          {/* Elegant Bento Infographic Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b, idx) => (
              <div 
                key={b.id}
                className="p-6 rounded-3xl bg-white/70 backdrop-blur-md border border-white/80 shadow-md hover:shadow-xl hover:-translate-y-1 hover:bg-white/90 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-5 border border-slate-100">
                  {benefitIcons[idx] || <Shield className="w-6 h-6 text-blue-500" />}
                </div>
                <h3 className="font-display font-bold text-base text-[#023E8A] mb-2">{b.title}</h3>
                <p className="font-sans text-slate-500 text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>




    </div>
  );
};
