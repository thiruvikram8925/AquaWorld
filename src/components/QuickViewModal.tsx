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
                {(product.features || []).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-sans text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Cart Triggers */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
            <div className="flex flex-col">
              {product.originalPrice ? (
                <span className="text-[11px] font-sans text-slate-400 line-through">₹{(product.originalPrice || 0).toLocaleString('en-IN')}</span>
              ) : null}
              <span className="text-2xl font-display font-extrabold text-[#023E8A]">₹{(product.price || 0).toLocaleString('en-IN')}</span>
            </div>

            <div className="flex items-center gap-2 flex-1">
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-[#023E8A] to-[#00B4D8] text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:shadow-lg transition-all cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" /> Add To Cart
              </button>

              <button
                onClick={() => {
                  const rawNumber = '9788545519';
                  const cleanNumber = rawNumber.replace(/\D/g, '');
                  const intro = "Good evening Sir, I’m interested in purchasing the following Aqua World Water Purifier model. Kindly share the availability, final price, warranty, and delivery details.\n\n";

                  const name = product.name || 'Water Purifier';
                  const capacity = product.capacity || '12L';
                  const tech = product.technology || 'RO';
                  const featuresList = (product.features && product.features.length > 0) ? product.features.join(', ') : (product.shortDesc || 'Multi-stage purification');
                  const price = (product.price || 0).toLocaleString('en-IN');

                  const itemDetail = `[Model Name: ${name} | Capacity: ${capacity} | Purification Technology: ${tech} | Features: ${featuresList} | Price: ₹${price} | Quantity: 1]`;
                  const fullMsg = encodeURIComponent(intro + itemDetail);
                  const waUrl = `https://wa.me/${cleanNumber}?text=${fullMsg}`;

                  window.open(waUrl, '_blank', 'noopener,noreferrer');
                }}
                className="py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer shrink-0"
                title="Contact via WhatsApp"
              >
                <svg className="w-4 h-4 fill-current text-white shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
