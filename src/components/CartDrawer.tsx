import React from 'react';
import { CartItem, Product } from '../types';
import { getAdminContent } from '../lib/adminState';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onNavigate: (page: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#023E8A]/20 backdrop-blur-md animate-fade-in">
      {/* Background click listener */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Cart Content Drawer */}
      <div className="bg-white/90 backdrop-blur-xl w-full max-w-md h-full relative z-10 shadow-2xl border-l border-white/40 flex flex-col justify-between overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="font-display font-extrabold text-xl text-[#023E8A]">Your Pure Cart</h2>
            <p className="font-sans text-slate-400 text-xs">Review your water safety investments.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Items Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence mode="wait">
            {cartItems.length === 0 ? (
              <motion.div
                key="empty-cart"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-blue-50 text-[#00B4D8] flex items-center justify-center mx-auto border border-blue-100">
                  <Plus className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-base text-[#023E8A]">Your Cart is Empty</h3>
                  <p className="font-sans text-slate-400 text-xs max-w-xs mx-auto leading-relaxed">
                    Explore our premier flagship RO and UV machines to safeguard your workspace or domestic kitchen.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#00B4D8]/10 text-[#023E8A] border border-[#00B4D8]/30 font-sans text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Continue Shopping
                </button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-100/60 flex gap-4"
                  >
                    <div className="w-16 h-16 rounded-xl bg-white p-1 border border-slate-100 flex items-center justify-center flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-display font-bold text-sm text-[#023E8A] leading-tight">{item.product.name}</h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors p-0.5 cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-sans text-[10px] text-[#00B4D8] font-bold mt-0.5">{item.product.technology} | {item.product.brand}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 mt-1">
                        <span className="font-display font-bold text-sm text-[#023E8A]">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        
                        <div className="flex items-center gap-2 border border-slate-200 bg-white rounded-lg px-2.5 py-1">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                            title="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold text-slate-800 w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                            title="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact Us Action via WhatsApp */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between font-sans">
              <span className="text-xs text-slate-500 font-bold uppercase">Total Investment</span>
              <span className="text-lg font-display font-extrabold text-[#023E8A]">
                ₹{cartItems.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0).toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={() => {
                const content = getAdminContent();
                const rawNumber = content.contactHelpline || '9788545519';
                const cleanNumber = rawNumber.replace(/\D/g, '');

                const intro = "Good evening Sir, I’m interested in purchasing the following Aqua World Water Purifier model. Kindly share the availability, final price, warranty, and delivery details.\n\n";

                const itemsText = cartItems.map(item => {
                  const p = item.product;
                  const name = p.name || 'Water Purifier';
                  const capacity = p.capacity || '12L';
                  const tech = p.technology || 'RO';
                  const featuresList = (p.features && p.features.length > 0) ? p.features.join(', ') : (p.shortDesc || 'Multi-stage purification');
                  const price = (p.price || 0).toLocaleString('en-IN');
                  const qty = item.quantity;

                  return `[Model Name: ${name} | Capacity: ${capacity} | Purification Technology: ${tech} | Features: ${featuresList} | Price: ₹${price} | Quantity: ${qty}]`;
                }).join('\n\n');

                const fullMsg = encodeURIComponent(intro + itemsText);
                const waUrl = `https://wa.me/${cleanNumber}?text=${fullMsg}`;

                window.open(waUrl, '_blank', 'noopener,noreferrer');
              }}
              className="w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-sans font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 hover:scale-[1.01] transition-all cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              Contact Us via WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
