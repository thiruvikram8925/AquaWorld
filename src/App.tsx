import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ShopView } from './components/ShopView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { LoginView } from './components/LoginView';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Product, CartItem } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { getCustomerUser } from './lib/adminState';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [customerUser, setCustomerUser] = useState(getCustomerUser());

  // Listen to customer auth changes dynamically
  useEffect(() => {
    const handleCustomerAuthChange = () => {
      setCustomerUser(getCustomerUser());
    };
    window.addEventListener('customer-auth-change', handleCustomerAuthChange);
    return () => window.removeEventListener('customer-auth-change', handleCustomerAuthChange);
  }, []);

  // Initialize Active Page based on URL Hash if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages = ['home', 'shop', 'about', 'contact', 'login'];
      if (hash && validPages.includes(hash)) {
        setActivePage(hash);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync state page changes back to URL hashes for professional bookmarking
  const handlePageChange = (pageId: string) => {
    setActivePage(pageId);
    window.location.hash = pageId;
  };

  // Cart Operations
  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
    
    // Trigger success toast
    setShowToast(`${product.name} added to cart!`);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCategoryFilterSelect = (categoryName: string) => {
    setCategoryFilter(categoryName);
  };

  const handleResetCategoryFilter = () => {
    setCategoryFilter(null);
  };

  // Cart quantity count helper
  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Dynamic View Router
  const renderActiveView = () => {
    switch (activePage) {
      case 'shop':
        return (
          <ShopView
            key="shop-view"
            onAddToCart={handleAddToCart}
            onQuickView={setSelectedProduct}
            initialCategoryFilter={categoryFilter}
            onResetCategoryFilter={handleResetCategoryFilter}
          />
        );
      case 'about':
        return <AboutView key="about-view" />;
      case 'contact':
        return <ContactView key="contact-view" />;
      case 'login':
        return (
          <LoginView 
            key="login-view" 
            setActivePage={handlePageChange} 
            onShowToast={(msg) => {
              setShowToast(msg);
              setTimeout(() => setShowToast(null), 3000);
            }} 
          />
        );
      case 'home':
      default:
        return (
          <HomeView
            key="home-view"
            onNavigate={handlePageChange}
            onAddToCart={handleAddToCart}
            onQuickView={setSelectedProduct}
            onFilterByCategory={handleCategoryFilterSelect}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-[#023E8A] bg-[#f0f9ff] antialiased selection:bg-[#00B4D8] selection:text-white relative overflow-hidden font-sans">
      {/* Background Atmospheric Elements of the Immersive UI */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-[#00B4D8]/20 to-transparent rounded-full blur-[80px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-tr from-[#48CAE4]/30 to-transparent rounded-full blur-[100px]"></div>
        {/* Wave Shape decoration at the absolute bottom */}
        <svg className="absolute bottom-0 w-full h-[150px] opacity-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#00B4D8" d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,112C672,107,768,149,864,181.3C960,213,1056,235,1152,224C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Toast notifications */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-24 right-6 z-50 bg-[#023E8A] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 font-sans border border-[#00B4D8]"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span className="text-sm font-semibold">{showToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky header navigation */}
      <Header
        activePage={activePage}
        setActivePage={handlePageChange}
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
        customerUser={customerUser}
      />

      {/* Main active sub-page workspace */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Sticky corporate footer */}
      <Footer setActivePage={handlePageChange} />

      {/* Specifications Details Modal */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onNavigate={(page) => {
          handlePageChange(page);
          setIsCartOpen(false);
        }}
      />

      {/* Floating WhatsApp Quick Action */}
      <WhatsAppButton />
    </div>
  );
}
