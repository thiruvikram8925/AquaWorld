import React from 'react';
import { Product } from '../types';
import { X, Star, ShoppingCart, ShieldCheck, RefreshCw, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#023E8A]/30 backdrop-blur-md animate-fade-in">
      <div className="bg-white/90 backdrop-blur-xl rounded-[32px] max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative border border-white flex flex-col md:flex-row gap-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          aria-label="Close specifications overlay"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Media Column */}
        <div className="md:w-1/2 flex items-center justify-center bg-slate-50 rounded-2xl p-4 border border-slate-50 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto max-h-[300px] object-contain rounded-xl drop-shadow-md"
            referrerPolicy="no-referrer"
          />
          <span className="absolute top-3 left-3 px-3 py-1 bg-[#023E8A] text-white text-[9px] font-mono tracking-widest uppercase rounded-full">
            {product.brand}
          </span>
          <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-red-50 text-red-600 border border-red-100 text-[10px] font-bold rounded-full">
            {product.discountBadge}
          </span>
        </div>

        {/* Product Info Column */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Tech Badge & Rating */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-blue-50 text-[#00B4D8] text-[10px] font-mono font-bold tracking-wider uppercase rounded-full border border-blue-100">
                {product.technology}
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-500 text-amber-500'
                        : 'text-slate-200'
                    }`}
                  />
                ))}
                <span className="text-xs font-sans font-bold text-slate-700 ml-1">({product.rating})</span>
              </div>
            </div>

            {/* Title & Description */}
            <div>
              <h2 className="font-display font-extrabold text-2xl text-[#023E8A] leading-tight">{product.name}</h2>
              <p className="font-sans text-slate-500 text-xs mt-1.5 leading-relaxed">{product.fullDesc || product.shortDesc}</p>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-3.5 border-y border-slate-100 py-4 font-sans text-xs">
              <div>
                <span className="text-slate-400 font-medium">Capacity:</span>
                <p className="text-slate-800 font-bold mt-0.5">{product.capacity}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Placement:</span>
                <p className="text-slate-800 font-bold mt-0.5">{product.installationType}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Color Option:</span>
                <p className="text-slate-800 font-bold mt-0.5">{product.color}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Warranty Term:</span>
                <p className="text-slate-800 font-bold mt-0.5">1 Year On-site</p>
              </div>
            </div>

            {/* Bullet Highlights */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-sans font-bold text-[#023E8A] uppercase tracking-wider block">Key Features</span>
              <div className="grid grid-cols-1 gap-1">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-sans text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Cart Trigger */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4 mt-6">
            <div className="flex flex-col">
              <span className="text-[11px] font-sans text-slate-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              <span className="text-2xl font-display font-extrabold text-[#023E8A]">₹{product.price.toLocaleString('en-IN')}</span>
            </div>
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-[#023E8A] to-[#00B4D8] text-white font-sans font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:shadow-lg transition-all cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" /> Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
