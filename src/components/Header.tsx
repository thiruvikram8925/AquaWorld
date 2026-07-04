import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, ShoppingCart, ArrowRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomerUser } from '../lib/adminState';

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
  cartItemsCount: number;
  onCartClick: () => void;
  isAdminLoggedIn?: boolean;
  customerUser?: CustomerUser | null;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  setActivePage,
  cartItemsCount,
  onCartClick,
  isAdminLoggedIn = false,
  customerUser = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  if (isAdminLoggedIn) {
    navItems.push({ id: 'admin', label: 'Admin Panel' });
  }

  const handleNavClick = (id: string) => {
    setActivePage(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        id="app-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/70 backdrop-blur-lg shadow-lg shadow-blue-900/5 py-3 border-b border-white/30'
            : 'bg-white/40 backdrop-blur-md py-5 border-b border-white/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="cursor-pointer"
              onClick={() => handleNavClick('home')}
            >
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="relative text-sm font-semibold tracking-wide transition-colors py-2 cursor-pointer text-slate-700 hover:text-[#00B4D8]"
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00B4D8] rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Header Operations */}
            <div className="flex items-center gap-4">
              {/* Customer Account Portal Button */}
              <button
                onClick={() => handleNavClick(isAdminLoggedIn ? 'admin' : 'login')}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full border transition-all cursor-pointer text-xs font-bold uppercase tracking-wider ${
                  activePage === 'login' || activePage === 'admin'
                    ? 'border-[#00B4D8] bg-[#00B4D8]/10 text-[#00B4D8]'
                    : 'border-slate-200 hover:border-[#00B4D8] hover:bg-blue-50 text-slate-700 hover:text-[#00B4D8]'
                }`}
              >
                {isAdminLoggedIn ? (
                  <>
                    <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-[10px]">
                      A
                    </div>
                    <span className="hidden sm:inline max-w-[80px] truncate text-slate-700">Admin</span>
                  </>
                ) : customerUser ? (
                  <>
                    <div className="w-5 h-5 rounded-full bg-[#00B4D8] text-white flex items-center justify-center font-bold text-[10px]">
                      {customerUser.name.charAt(0)}
                    </div>
                    <span className="hidden sm:inline max-w-[80px] truncate text-slate-700">{customerUser.name}</span>
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4 text-slate-500" />
                    <span>Log In</span>
                  </>
                )}
              </button>

              {/* Cart Button */}
              <button
                id="cart-trigger"
                onClick={onCartClick}
                className="relative p-2.5 rounded-full text-slate-700 hover:text-[#00B4D8] hover:bg-blue-50 transition-all cursor-pointer"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="w-5.5 h-5.5" />
                <AnimatePresence>
                  {cartItemsCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white font-sans text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-sm"
                    >
                      {cartItemsCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>



              {/* Mobile Hamburger Trigger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg text-slate-700 hover:text-[#00B4D8] hover:bg-slate-50 transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-white border-b border-slate-100 shadow-xl overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navItems.map((item) => {
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium tracking-wide transition-all ${
                        isActive
                          ? 'bg-blue-50 text-[#00B4D8] font-bold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-[#00B4D8]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
                
                {/* Mobile Log In / Account link */}
                <button
                  onClick={() => handleNavClick(isAdminLoggedIn ? 'admin' : 'login')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium tracking-wide transition-all ${
                    activePage === 'login' || activePage === 'admin'
                      ? 'bg-blue-50 text-[#00B4D8] font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-[#00B4D8]'
                  }`}
                >
                  {isAdminLoggedIn ? (
                    <>
                      <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
                        A
                      </div>
                      <span>Admin Panel</span>
                    </>
                  ) : customerUser ? (
                    <>
                      <div className="w-6 h-6 rounded-full bg-[#00B4D8] text-white flex items-center justify-center font-bold text-xs">
                        {customerUser.name.charAt(0)}
                      </div>
                      <span>Account ({customerUser.name})</span>
                    </>
                  ) : (
                    <>
                      <User className="w-5 h-5 text-slate-500" />
                      <span>Log In Portal</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#023E8A] to-[#00B4D8] text-white text-sm font-bold tracking-wider uppercase transition-all shadow-md"
                >
                  Consult an Expert <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer to prevent content overlap because header is fixed */}
      <div className="h-16" />
    </>
  );
};
