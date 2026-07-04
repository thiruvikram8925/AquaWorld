import React from 'react';
import { CartItem, Product } from '../types';
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

        {/* Contact Us Action */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#023E8A] to-[#00B4D8] text-white font-sans font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-blue-100 hover:scale-[1.01] transition-all cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
