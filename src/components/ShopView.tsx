import React, { useState, useMemo, useEffect } from 'react';
import { getAdminProducts } from '../lib/adminState';
import { Product } from '../types';
import { 
  Search, Star, Heart, ShoppingCart, Eye, SlidersHorizontal, Check, 
  RotateCcw, Info, CheckCircle2, ChevronDown 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ShopViewProps {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  initialCategoryFilter?: string | null;
  onResetCategoryFilter?: () => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  onAddToCart,
  onQuickView,
  initialCategoryFilter = null,
  onResetCategoryFilter,
}) => {
  // --- Filter State ---
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedCapacities, setSelectedCapacities] = useState<string[]>([]);
  const [selectedInstalls, setSelectedInstalls] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('best-selling');
  
  // Wishlist local state tracking
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [showWishlistNotification, setShowWishlistNotification] = useState<string | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Synchronize initialCategoryFilter if it's a capacity filter
  useEffect(() => {
    if (initialCategoryFilter && initialCategoryFilter.startsWith('capacity-')) {
      const cap = initialCategoryFilter.replace('capacity-', '');
      setSelectedCapacities([cap]);
    }
  }, [initialCategoryFilter]);

  // Toggle helpers
  const handleColorToggle = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleTechToggle = (tech: string) => {
    setSelectedTechs(prev => 
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const handleCapacityToggle = (cap: string) => {
    setSelectedCapacities(prev => 
      prev.includes(cap) ? prev.filter(c => c !== cap) : [...prev, cap]
    );
  };

  const handleInstallToggle = (install: string) => {
    setSelectedInstalls(prev => 
      prev.includes(install) ? prev.filter(i => i !== install) : [...prev, install]
    );
  };

  const toggleWishlist = (productId: string, productName: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        return prev.filter(id => id !== productId);
      } else {
        setShowWishlistNotification(`${productName} added to Wishlist!`);
        setTimeout(() => setShowWishlistNotification(null), 3500);
        return [...prev, productId];
      }
    });
  };

  const handleResetFilters = () => {
    setSearchQuery('');

    setSelectedColors([]);
    setSelectedBrands([]);
    setSelectedTechs([]);
    setSelectedCapacities([]);
    setSelectedInstalls([]);
    setSortBy('best-selling');
    if (onResetCategoryFilter) {
      onResetCategoryFilter();
    }
  };

  // --- Filtering & Sorting Logic ---
  const filteredProducts = useMemo(() => {
    return getAdminProducts().filter((prod) => {
      // Hide disabled products
      if ((prod as any).isEnabled === false) {
        return false;
      }
      // 1. Text Search query (matches name, brand, features, technology)
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        const matchesName = (prod.name || '').toLowerCase().includes(query);
        const matchesBrand = (prod.brand || '').toLowerCase().includes(query);
        const matchesTech = (prod.technology || '').toLowerCase().includes(query);
        const matchesDesc = (prod.shortDesc || '').toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesTech && !matchesDesc) {
          return false;
        }
      }

      // 2. Initial Category Filter (from homepage navigation)
      if (initialCategoryFilter) {
        // Map category title to product tech/type
        const cat = initialCategoryFilter.toLowerCase();
        if (cat.includes('ro') && !prod.technology.includes('RO')) return false;
        if (cat.includes('uv') && !prod.technology.includes('UV')) return false;
        if (cat.includes('uf') && !prod.technology.includes('UF') && prod.technology !== 'UF') return false;
        if (cat.includes('commercial') && prod.name !== 'Aqua Commerce 50') return false;
        if (cat.includes('domestic') && prod.name === 'Aqua Commerce 50') return false;
      }

      // 4. Color filter
      if (selectedColors.length > 0) {
        const prodColors = (prod.color || '').split(',').map(c => c.trim().toLowerCase());
        const hasMatch = selectedColors.some(sc => prodColors.includes(sc.toLowerCase()));
        if (!hasMatch) return false;
      }

      // 5. Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(prod.brand)) {
        return false;
      }

      // 6. Tech filter
      if (selectedTechs.length > 0 && !selectedTechs.includes(prod.technology)) {
        return false;
      }

      // 7. Capacity filter
      if (selectedCapacities.length > 0 && !selectedCapacities.includes(prod.capacity)) {
        return false;
      }

      // 8. Installation Type filter
      if (selectedInstalls.length > 0 && !selectedInstalls.includes(prod.installationType)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // 9. Sorting
      switch (sortBy) {
        case 'highest-rated':
          return b.rating - a.rating;
        case 'new-arrivals':
          return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'best-selling':
        default:
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      }
    });
  }, [
    searchQuery,
    initialCategoryFilter,

    selectedColors,
    selectedBrands,
    selectedTechs,
    selectedCapacities,
    selectedInstalls,
    sortBy
  ]);

  const capacitiesList = Array.from(new Set(getAdminProducts().map(p => p.capacity).filter(Boolean)));
  const installationsList: Product['installationType'][] = ['Wall Mounted', 'Dispatch'];

  return (
    <div className="bg-transparent min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      {/* Toast Wishlist Notification */}
      <AnimatePresence>
        {showWishlistNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-[#023E8A] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 font-sans border border-[#00B4D8]"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span className="text-sm font-semibold">{showWishlistNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        {/* Page title and banner */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#023E8A]">Water Purifiers</h1>
          <p className="font-sans text-slate-500 text-sm mt-1.5">
            Discover India’s highest-rated water purifiers, engineered for zero compromise.
          </p>
          {initialCategoryFilter && (
            <div className="mt-4 inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#023E8A] px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <span>Segment: {initialCategoryFilter}</span>
              <button 
                onClick={onResetCategoryFilter} 
                className="hover:text-red-500 transition-colors font-sans font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Mobile Filters Toggle Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="w-full flex items-center justify-center gap-2.5 px-5 py-4 bg-white/80 backdrop-blur-md border border-white text-[#023E8A] rounded-2xl font-bold shadow-md hover:bg-white transition-all cursor-pointer"
          >
            <SlidersHorizontal className="w-5 h-5 text-[#00B4D8]" />
            <span>{isMobileFiltersOpen ? 'Hide Filter Panel' : 'Show Filter Panel'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMobileFiltersOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* --- LEFT SIDEBAR FILTERS --- */}
          <div className={`lg:col-span-1 bg-white/70 backdrop-blur-md border border-white/80 p-6 rounded-3xl shadow-md h-fit space-y-6 ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4.5 h-4.5 text-[#023E8A]" />
                <h2 className="font-display font-bold text-base text-[#023E8A]">Filters</h2>
              </div>
              <button 
                onClick={handleResetFilters}
                className="text-xs font-sans font-semibold text-[#00B4D8] hover:text-[#023E8A] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset All
              </button>
            </div>

            {/* 2. Storage Capacity Filter */}
            <div className="space-y-2">
              <span className="text-xs font-sans font-bold text-[#023E8A] uppercase tracking-wider block">Storage Capacity</span>
              <div className="space-y-1.5">
                {capacitiesList.map((cap) => (
                  <label key={cap} className="flex items-center gap-2.5 text-sm font-sans text-slate-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedCapacities.includes(cap)}
                      onChange={() => handleCapacityToggle(cap)}
                      className="rounded border-slate-300 text-[#00B4D8] focus:ring-[#00B4D8] cursor-pointer w-4 h-4"
                    />
                    <span className="font-medium text-[#023E8A]/85">{cap}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Installation Type */}
            <div className="space-y-2">
              <span className="text-xs font-sans font-bold text-[#023E8A] uppercase tracking-wider block">Installation Placement</span>
              <div className="space-y-1.5">
                {installationsList.map((inst) => (
                  <label key={inst} className="flex items-center gap-2.5 text-sm font-sans text-slate-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedInstalls.includes(inst)}
                      onChange={() => handleInstallToggle(inst)}
                      className="rounded border-slate-300 text-[#00B4D8] focus:ring-[#00B4D8] cursor-pointer w-4 h-4"
                    />
                    <span className="font-medium text-[#023E8A]/85">{inst}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT PRODUCT GRID --- */}
          <div className="lg:col-span-3 space-y-6">
            {/* Sort bar */}
            <div className="bg-white/70 backdrop-blur-md border border-white/80 p-4 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs font-sans text-slate-500 font-medium">
                Showing <strong className="text-slate-800">{filteredProducts.length}</strong> premium purifiers
              </span>

              <div className="flex items-center gap-2.5">
                <span className="text-xs font-sans text-slate-500 font-semibold flex-shrink-0">Sort By:</span>
                <div className="relative">
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans font-bold text-[#023E8A] focus:outline-none focus:border-[#00B4D8] cursor-pointer pr-12"
                  >
                    <option value="best-selling">Best Selling</option>
                    <option value="highest-rated">Highest Rated</option>
                    <option value="new-arrivals">New Arrivals</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#023E8A] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Zero Results */}
            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-3xl p-12 border border-slate-100 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto">
                  <Info className="w-8 h-8 text-[#00B4D8]" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#023E8A]">No Purifier Found</h3>
                <p className="font-sans text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
                  No products matched your exact filter metrics. Reset parameters to explore our complete standard luxury filtration units.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#023E8A] to-[#00B4D8] text-white text-xs font-sans font-bold tracking-wider uppercase shadow-md hover:scale-[1.02] transition-all cursor-pointer"
                >
                  View All Products
                </button>
              </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => {
                const isInWishlist = wishlist.includes(prod.id);
                return (
                  <div 
                    key={prod.id}
                    className="group relative rounded-[32px] bg-white/80 backdrop-blur-xl border border-white p-5 hover:bg-white hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Container with Badges */}
                      <div className="relative h-56 w-full rounded-2xl overflow-hidden mb-5 bg-slate-50 border border-slate-50 flex items-center justify-center">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Floating Left Discount Badge */}
                        <span className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-[10px] font-sans font-bold rounded-full tracking-wider shadow-sm z-10">
                          {prod.discountBadge}
                        </span>

                        {/* Floating Right Brand Logo Badge */}
                        <span className="absolute top-3 right-3 px-3 py-1 bg-[#023E8A]/90 backdrop-blur-sm text-white text-[9px] font-mono tracking-widest uppercase rounded-full border border-blue-800 z-10">
                          {prod.brand}
                        </span>

                        {/* Quick Hover Buttons Overlay */}
                        <div className="absolute inset-0 bg-slate-900/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10">
                          <button 
                            onClick={() => onQuickView(prod)}
                            className="p-3.5 rounded-full bg-white/95 backdrop-blur-sm text-[#023E8A] hover:bg-[#00B4D8] hover:text-white shadow-lg scale-90 group-hover:scale-100 transition-all duration-300 cursor-pointer"
                            title="Quick Specifications"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Info bar: Tech and Stars */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#00B4D8]">{prod.technology}</span>
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                          <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                          <span className="text-[10px] font-sans font-bold text-amber-800">{prod.rating}</span>
                        </div>
                      </div>

                      {/* Product Title */}
                      <h3 className="font-display font-extrabold text-base text-[#023E8A] mb-1 leading-tight group-hover:text-[#00B4D8] transition-colors">{prod.name}</h3>
                      <p className="font-sans text-slate-500 text-[11px] leading-relaxed mb-3">{prod.shortDesc}</p>

                      {/* Bullet Specifications */}
                      <ul className="space-y-1 mb-4">
                        {prod.features.slice(0, 3).map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-1.5 text-[10px] font-sans text-slate-500 font-medium">
                            <span className="w-1 h-1 rounded-full bg-[#00B4D8]" />
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing, Wishlist, and Cart trigger */}
                    <div className="border-t border-slate-100 pt-4 mt-2">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-sans text-slate-400 line-through">₹{prod.originalPrice.toLocaleString('en-IN')}</span>
                          <span className="text-base font-display font-bold text-[#023E8A]">₹{prod.price.toLocaleString('en-IN')}</span>
                        </div>
                        <button
                          onClick={() => toggleWishlist(prod.id, prod.name)}
                          className={`p-2 rounded-xl transition-all cursor-pointer ${
                            isInWishlist 
                              ? 'bg-rose-50 text-rose-500 border border-rose-100 scale-105' 
                              : 'bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50/30'
                          }`}
                          aria-label="Add to wishlist"
                        >
                          <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-rose-500' : ''}`} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onQuickView(prod)}
                          className="w-full py-2 rounded-xl border border-slate-100 hover:border-[#00B4D8] text-slate-600 hover:text-[#00B4D8] font-sans font-bold text-[11px] uppercase tracking-wider text-center cursor-pointer transition-colors"
                        >
                          Quick View
                        </button>
                        <button
                          onClick={() => onAddToCart(prod)}
                          className="w-full py-2 rounded-xl bg-gradient-to-r from-[#023E8A] to-[#00B4D8] text-white font-sans font-extrabold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1 hover:shadow-lg transition-all cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" /> Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
