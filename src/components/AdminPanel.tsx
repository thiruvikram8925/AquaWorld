import React, { useState, useEffect } from 'react';
import { 
  Lock, Mail, Eye, EyeOff, LayoutDashboard, ShoppingBag, 
  Tags, History, Globe, Plus, Search, Filter, ArrowUpDown, 
  Edit2, Trash2, Upload, X, Check, LogOut, FileText, RefreshCw, 
  AlertCircle, ShieldCheck, CheckCircle, Activity, PlusCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Category } from '../types';
import { 
  getAdminProducts, saveAdminProducts, 
  getAdminCategories, saveAdminCategories, 
  getAdminContent, saveAdminContent, 
  getLoginLogs, addLoginLog, 
  isAdminAuthenticated, loginAdmin, logoutAdmin, updateAdminActivity,
  WebsiteContent, LoginLog
} from '../lib/adminState';

interface AdminPanelProps {
  onContentUpdated: () => void;
  onNavigateHome: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onContentUpdated, onNavigateHome }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(isAdminAuthenticated());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Panel Tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories' | 'content' | 'logs'>('dashboard');

  // Dynamic Data Lists
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loginLogs, setLoginLogs] = useState<LoginLog[]>([]);
  const [webContent, setWebContent] = useState<WebsiteContent | null>(null);

  // Search, Filter, Sort State for Products
  const [pSearch, setPSearch] = useState('');

  const [pSortField, setPSortField] = useState<'name' | 'price' | 'rating'>('name');
  const [pSortOrder, setPSortOrder] = useState<'asc' | 'desc'>('asc');

  // Search State for Categories
  const [cSearch, setCSearch] = useState('');

  // Forms Modals State
  const [productModal, setProductModal] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit';
    data: Partial<Product> & { isEnabled?: boolean };
  }>({
    isOpen: false,
    mode: 'add',
    data: {}
  });

  const [categoryModal, setCategoryModal] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit';
    data: Partial<Category>;
  }>({
    isOpen: false,
    mode: 'add',
    data: {}
  });

  // Simulator Fields
  const [simName, setSimName] = useState('');
  const [simEmail, setSimEmail] = useState('');

  // Notifications
  const [toast, setToast] = useState<string | null>(null);

  // Load Data
  useEffect(() => {
    if (isAuthenticated) {
      setProducts(getAdminProducts());
      setCategories(getAdminCategories());
      setLoginLogs(getLoginLogs());
      setWebContent(getAdminContent());
    }
  }, [isAuthenticated]);

  // Handle Action Inactivity
  useEffect(() => {
    if (!isAuthenticated) return;

    const handleUserAction = () => {
      updateAdminActivity();
    };

    // Listen to standard interaction triggers
    window.addEventListener('click', handleUserAction);
    window.addEventListener('keydown', handleUserAction);
    window.addEventListener('mousemove', handleUserAction);

    // Auto check auth every 10 seconds to enforce auto-logout
    const interval = setInterval(() => {
      const active = isAdminAuthenticated();
      if (!active) {
        setIsAuthenticated(false);
        showToast('Session expired due to inactivity.');
      }
    }, 10000);

    return () => {
      window.removeEventListener('click', handleUserAction);
      window.removeEventListener('keydown', handleUserAction);
      window.removeEventListener('mousemove', handleUserAction);
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'aquaworldsanthosh@gmail.com' && password === 'aquaworldsanthosh@123') {
      loginAdmin();
      setIsAuthenticated(true);
      setLoginError('');
      showToast('Welcome back, Admin!');
    } else {
      setLoginError('Invalid email or password.');
    }
  };

  // Logout handler
  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    showToast('Admin logged out successfully.');
    onNavigateHome();
  };

  // Create/Edit/Delete Category handlers
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const data = categoryModal.data;
    if (!data.title || !data.description) {
      alert('Please fill out required fields');
      return;
    }

    let updatedList: Category[] = [];
    if (categoryModal.mode === 'add') {
      const newCat: Category = {
        id: data.id || 'cat-' + Date.now(),
        title: data.title,
        description: data.description,
        image: data.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
        count: 0
      };
      updatedList = [...categories, newCat];
      showToast(`Category "${newCat.title}" created!`);
    } else {
      updatedList = categories.map(c => c.id === data.id ? { ...c, ...data } as Category : c);
      showToast(`Category "${data.title}" updated!`);
    }

    setCategories(updatedList);
    saveAdminCategories(updatedList);
    setCategoryModal({ isOpen: false, mode: 'add', data: {} });
  };

  const handleDeleteCategory = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the category "${name}"?`)) {
      const updatedList = categories.filter(c => c.id !== id);
      setCategories(updatedList);
      saveAdminCategories(updatedList);
      showToast(`Category "${name}" deleted.`);
    }
  };

  // Create/Edit/Delete Product handlers
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const data = productModal.data;


    let updatedList: Product[] = [];
    const completeProduct: Product = {
      id: data.id || 'p-' + Date.now(),
      name: data.name || '',
      brand: data.brand || '',
      shortDesc: data.shortDesc || '',
      fullDesc: data.fullDesc || '',
      features: data.features || [],
      technology: data.technology || '',
      capacity: data.capacity || '',
      installationType: data.installationType || '',
      color: data.color || '',
      rating: Number(data.rating) || 0,
      price: Number(data.price) || 0,
      originalPrice: Number(data.originalPrice) || 0,
      warranty: data.warranty || '',
      discountBadge: data.discountBadge || '',
      image: data.image || '',
      isBestSeller: !!data.isBestSeller,
      isNewArrival: !!data.isNewArrival,
    };

    // Persist custom isEnabled state as metadata
    (completeProduct as any).isEnabled = data.isEnabled !== false;

    if (productModal.mode === 'add') {
      updatedList = [...products, completeProduct];
      showToast(`Product "${completeProduct.name}" added successfully.`);
    } else {
      updatedList = products.map(p => p.id === data.id ? completeProduct : p);
      showToast(`Product "${completeProduct.name}" updated successfully.`);
    }

    setProducts(updatedList);
    saveAdminProducts(updatedList);
    setProductModal({ isOpen: false, mode: 'add', data: {} });
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      const updatedList = products.filter(p => p.id !== id);
      setProducts(updatedList);
      saveAdminProducts(updatedList);
      showToast(`Product "${name}" has been deleted.`);
    }
  };

  const handleToggleProductStatus = (id: string) => {
    const updatedList = products.map(p => {
      if (p.id === id) {
        const currentStatus = (p as any).isEnabled !== false;
        const nextStatus = !currentStatus;
        showToast(`Product "${p.name}" is now ${nextStatus ? 'enabled' : 'disabled'}.`);
        return { ...p, isEnabled: nextStatus };
      }
      return p;
    });
    setProducts(updatedList);
    saveAdminProducts(updatedList);
  };

  // Website Content Form handlers
  const handleUpdateWebContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (webContent) {
      saveAdminContent(webContent);
      onContentUpdated();
      showToast('Website content updated live!');
    }
  };

  const handleContentFieldChange = (key: keyof WebsiteContent, val: string) => {
    if (webContent) {
      setWebContent({
        ...webContent,
        [key]: val
      });
    }
  };

  // Simulate User Login Activities
  const handleSimulateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simName.trim() || !simEmail.trim()) return;

    const logs = addLoginLog(simName.trim(), simEmail.trim());
    setLoginLogs(logs);
    setSimName('');
    setSimEmail('');
    showToast(`Simulation: ${simName} logged in successfully!`);
  };

  // Handle Base64 file image loading
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isProductForm: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (isProductForm) {
          setProductModal(prev => ({
            ...prev,
            data: { ...prev.data, image: base64 }
          }));
        } else {
          setCategoryModal(prev => ({
            ...prev,
            data: { ...prev.data, image: base64 }
          }));
        }
        showToast('Image uploaded and optimized!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Products filtering & sorting logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = (p.name || '').toLowerCase().includes(pSearch.toLowerCase()) || 
                          (p.brand || '').toLowerCase().includes(pSearch.toLowerCase()) ||
                          (p.shortDesc || '').toLowerCase().includes(pSearch.toLowerCase());
    
    return matchesSearch;
  }).sort((a, b) => {
    let score = 0;
    if (pSortField === 'name') {
      score = (a.name || '').localeCompare(b.name || '');
    } else if (pSortField === 'price') {
      score = a.price - b.price;
    } else if (pSortField === 'rating') {
      score = a.rating - b.rating;
    }
    return pSortOrder === 'asc' ? score : -score;
  });

  // Category filtering
  const filteredCategories = categories.filter(c => 
    c.title.toLowerCase().includes(cSearch.toLowerCase()) ||
    c.description.toLowerCase().includes(cSearch.toLowerCase())
  );

  // Redirect to home page if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      onNavigateHome();
    }
  }, [isAuthenticated, onNavigateHome]);

  if (!isAuthenticated) {
    return null;
  }

  // Dashboard Layout UI
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-24 right-6 z-50 bg-[#023E8A] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 border border-[#00B4D8] text-xs font-bold uppercase tracking-wide"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Navigation */}
        <aside className="col-span-1 lg:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-xl p-5 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#023E8A]">
              <ShieldCheck className="w-5.5 h-5.5" />
            </div>
            <div>
              <h2 className="font-display font-black text-xs uppercase tracking-wide text-[#023E8A]">Aqua Control</h2>
              <p className="text-[10px] text-[#00B4D8] font-mono font-bold tracking-wider">admin@aquaworld.com</p>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all ${
                activeTab === 'dashboard' 
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-[#023E8A]'
              }`}
            >
              <LayoutDashboard className="w-4.5 h-4.5" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all ${
                activeTab === 'products' 
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-[#023E8A]'
              }`}
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              <span>Product Database ({products.length})</span>
            </button>



            <button
              onClick={() => setActiveTab('content')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all ${
                activeTab === 'content' 
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-[#023E8A]'
              }`}
            >
              <Globe className="w-4.5 h-4.5" />
              <span>Content Manager</span>
            </button>

            <button
              onClick={() => setActiveTab('logs')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all ${
                activeTab === 'logs' 
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-[#023E8A]'
              }`}
            >
              <History className="w-4.5 h-4.5" />
              <span>User Login Log</span>
            </button>
          </nav>

          {/* Simulate Action widget inside panel */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50/50 border border-blue-100/40 space-y-3">
            <h4 className="text-[10px] font-black uppercase text-[#023E8A] tracking-wider flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-[#00B4D8]" />
              <span>Simulate Customer Login</span>
            </h4>
            <form onSubmit={handleSimulateLogin} className="space-y-2">
              <input
                type="text"
                required
                placeholder="User Name (e.g. Ramesh K)"
                value={simName}
                onChange={(e) => setSimName(e.target.value)}
                className="w-full px-2.5 py-1.5 text-[11px] bg-white border border-slate-200 rounded-lg text-slate-800"
              />
              <input
                type="email"
                required
                placeholder="Email (ramesh@gmail.com)"
                value={simEmail}
                onChange={(e) => setSimEmail(e.target.value)}
                className="w-full px-2.5 py-1.5 text-[11px] bg-white border border-slate-200 rounded-lg text-slate-800"
              />
              <button
                type="submit"
                className="w-full py-1.5 rounded-lg bg-[#023E8A] hover:bg-[#00B4D8] text-white text-[10px] font-extrabold uppercase tracking-widest transition-colors cursor-pointer"
              >
                Trigger Login Event
              </button>
            </form>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold tracking-wider uppercase transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out Portal</span>
            </button>
          </div>
        </aside>

        {/* Right Tab Content Workspace */}
        <main className="col-span-1 lg:col-span-9 bg-white rounded-3xl border border-slate-100 shadow-xl p-6 min-h-[70vh]">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-slate-100">
                <h1 className="font-display font-black text-xl text-[#023E8A] uppercase tracking-wide">
                  Dashboard <span className="text-[#00B4D8]">Overview</span>
                </h1>
                <p className="text-xs text-slate-500 font-sans mt-0.5">Real-time statistics of Aqua World business state.</p>
              </div>

              {/* Statistics Counters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Products</span>
                    <h3 className="text-2xl font-black text-[#023E8A]">{products.length}</h3>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-[#023E8A]">
                    <ShoppingBag className="w-5.5 h-5.5" />
                  </div>
                </div>



                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total User Logins</span>
                    <h3 className="text-2xl font-black text-slate-700">{loginLogs.length}</h3>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                    <History className="w-5.5 h-5.5" />
                  </div>
                </div>
              </div>

              {/* Recent Login Activity Subpanel */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <h3 className="font-display font-bold text-sm text-[#023E8A] uppercase tracking-wide flex items-center gap-1.5">
                    <Activity className="w-4.5 h-4.5 text-[#00B4D8]" />
                    <span>Recent Customer Logins</span>
                  </h3>
                  <button 
                    onClick={() => setActiveTab('logs')}
                    className="text-xs text-[#00B4D8] hover:underline font-bold uppercase tracking-wider"
                  >
                    View All Logs →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-xs text-slate-600">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                        <th className="py-2.5 px-3">User Name</th>
                        <th className="py-2.5 px-3">Email ID</th>
                        <th className="py-2.5 px-3">Login Date & Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {loginLogs.slice(0, 4).map((log) => (
                        <tr key={log.id} className="hover:bg-white/50">
                          <td className="py-3 px-3 font-semibold text-slate-800">{log.userName}</td>
                          <td className="py-3 px-3 font-mono text-[11px]">{log.emailId}</td>
                          <td className="py-3 px-3 font-mono text-[11px] text-slate-500">{log.loginTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Useful quick summary */}
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-slate-600 leading-relaxed space-y-2">
                <h4 className="font-bold text-[#023E8A] uppercase tracking-wide">Admin Guidelines & Security Parameters</h4>
                <p>• <strong>Automatic Timeout Protection</strong>: Sessions expire after 15 minutes of inactivity. Any click or keystroke extends coverage.</p>
                <p>• <strong>Web Changes</strong>: Edits made in "Content Manager" take effect instantly on the consumer website without code compilation.</p>
                <p>• <strong>Product Status Toggle</strong>: Click the status badge of any product to disable it. Disabled products are hidden from the Shop catalog.</p>
              </div>

            </div>
          )}

          {/* TAB 2: PRODUCT MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-3 border-b border-slate-100">
                <div>
                  <h1 className="font-display font-black text-xl text-[#023E8A] uppercase tracking-wide flex items-center gap-1.5">
                    <span>Products</span>
                    <span className="text-[#00B4D8]">Database</span>
                  </h1>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">Manage details, prices, images, and catalog inclusion.</p>
                </div>
                <button
                  onClick={() => setProductModal({ isOpen: true, mode: 'add', data: {} })}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#023E8A] hover:bg-[#00B4D8] text-white text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-md"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Filters / Search Bar toolbar */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                
                {/* Search field */}
                <div className="col-span-1 sm:col-span-10 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name, brand..."
                    value={pSearch}
                    onChange={(e) => setPSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#00B4D8] text-slate-700"
                  />
                </div>

                {/* Sort dropdown */}
                <div className="col-span-1 sm:col-span-2 flex gap-1 items-center">
                  <select
                    value={pSortField}
                    onChange={(e) => setPSortField(e.target.value as any)}
                    className="w-full px-2 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#00B4D8] text-slate-700 cursor-pointer"
                  >
                    <option value="name">Sort Name</option>
                    <option value="price">Sort Price</option>
                    <option value="rating">Sort Rating</option>
                  </select>
                  <button
                    onClick={() => setPSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                    className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                    title="Toggle Sort Order"
                  >
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Products Table */}
              <div className="overflow-x-auto border border-slate-100 rounded-2xl shadow-sm">
                <table className="w-full text-left font-sans text-xs text-slate-600">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase text-[10px] font-bold">
                      <th className="py-3 px-4">Image</th>
                      <th className="py-3 px-4">Product Name</th>
                      <th className="py-3 px-4">Brand</th>
                      <th className="py-3 px-4">Category/Tech</th>
                      <th className="py-3 px-4 text-right">Price (Original)</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400 font-sans">
                          No products found matching filters.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map(p => {
                        const isEnabled = (p as any).isEnabled !== false;
                        return (
                          <tr key={p.id} className="hover:bg-slate-50/50">
                            <td className="py-3 px-4">
                              <img 
                                src={p.image} 
                                alt={p.name} 
                                className="w-10 h-10 rounded-lg object-cover border border-slate-100 shadow-sm"
                                referrerPolicy="no-referrer"
                              />
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-semibold text-slate-800 text-xs">{p.name}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{p.id}</div>
                            </td>
                            <td className="py-3 px-4 font-medium text-slate-700">{p.brand}</td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded-md bg-cyan-50 text-[#00B4D8] font-semibold text-[10px] uppercase">
                                {p.technology}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right font-mono font-semibold text-slate-800">
                              ₹{p.price.toLocaleString()}
                              <div className="text-[10px] text-slate-400 line-through">
                                ₹{p.originalPrice?.toLocaleString()}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <button
                                onClick={() => handleToggleProductStatus(p.id)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer ${
                                  isEnabled 
                                    ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
                                    : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                                }`}
                              >
                                {isEnabled ? 'Enabled' : 'Disabled'}
                              </button>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => setProductModal({ isOpen: true, mode: 'edit', data: p })}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                  title="Edit Product"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(p.id, p.name)}
                                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                  title="Delete Product"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}



          {/* TAB 4: CONTENT MANAGER */}
          {activeTab === 'content' && webContent && (
            <div className="space-y-6">
              
              <div className="pb-3 border-b border-slate-100">
                <h1 className="font-display font-black text-xl text-[#023E8A] uppercase tracking-wide">
                  Content <span className="text-[#00B4D8]">Manager</span>
                </h1>
                <p className="text-xs text-slate-500 font-sans mt-0.5">Modify web banners, headings, emails, and address dynamically.</p>
              </div>

              <form onSubmit={handleUpdateWebContent} className="space-y-6">
                
                {/* HERO BLOCK */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                  <h3 className="font-display font-bold text-xs text-[#023E8A] uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4 text-[#00B4D8]" />
                    <span>Home Page Hero Section</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Main Header Heading</label>
                      <input
                        type="text"
                        value={webContent.heroTitle}
                        onChange={(e) => handleContentFieldChange('heroTitle', e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-[#00B4D8] text-slate-700"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Heading Highlight / Subheading</label>
                      <input
                        type="text"
                        value={webContent.heroHighlight}
                        onChange={(e) => handleContentFieldChange('heroHighlight', e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-[#00B4D8] text-slate-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase">Hero Brief Paragraph</label>
                    <textarea
                      rows={3}
                      value={webContent.heroDesc}
                      onChange={(e) => handleContentFieldChange('heroDesc', e.target.value)}
                      className="w-full px-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-[#00B4D8] text-slate-700 leading-relaxed"
                    />
                  </div>
                </div>

                {/* ABOUT BLOCK */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                  <h3 className="font-display font-bold text-xs text-[#023E8A] uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#00B4D8]" />
                    <span>About Page Editorial Texts</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1 col-span-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Upper Small Badge</label>
                      <input
                        type="text"
                        value={webContent.aboutBadge}
                        onChange={(e) => handleContentFieldChange('aboutBadge', e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-[#00B4D8] text-slate-700"
                      />
                    </div>
                    <div className="space-y-1 col-span-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Display Header</label>
                      <input
                        type="text"
                        value={webContent.aboutTitle}
                        onChange={(e) => handleContentFieldChange('aboutTitle', e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-[#00B4D8] text-slate-700"
                      />
                    </div>
                    <div className="space-y-1 col-span-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Editorial Summary Title</label>
                      <input
                        type="text"
                        value={webContent.aboutSummaryTitle}
                        onChange={(e) => handleContentFieldChange('aboutSummaryTitle', e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-[#00B4D8] text-slate-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase">Display Subtitle / Slogan</label>
                    <input
                      type="text"
                      value={webContent.aboutDesc}
                      onChange={(e) => handleContentFieldChange('aboutDesc', e.target.value)}
                      className="w-full px-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-[#00B4D8] text-slate-700 font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Main Intro Paragraph 1</label>
                      <textarea
                        rows={4}
                        value={webContent.aboutSummaryText1}
                        onChange={(e) => handleContentFieldChange('aboutSummaryText1', e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-[#00B4D8] text-slate-700 leading-relaxed"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Main Intro Paragraph 2</label>
                      <textarea
                        rows={4}
                        value={webContent.aboutSummaryText2}
                        onChange={(e) => handleContentFieldChange('aboutSummaryText2', e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-[#00B4D8] text-slate-700 leading-relaxed"
                      />
                    </div>
                  </div>
                </div>

                {/* CONTACT & FOOTER */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                  <h3 className="font-display font-bold text-xs text-[#023E8A] uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#00B4D8]" />
                    <span>Contact Info & Corporate Footer</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Toll-Free Customer Helpline</label>
                      <input
                        type="text"
                        value={webContent.contactHelpline}
                        onChange={(e) => handleContentFieldChange('contactHelpline', e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-[#00B4D8] text-slate-700"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Official Support Email</label>
                      <input
                        type="text"
                        value={webContent.contactEmail}
                        onChange={(e) => handleContentFieldChange('contactEmail', e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-[#00B4D8] text-slate-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Corporate Headquarters Address</label>
                      <input
                        type="text"
                        value={webContent.contactAddress}
                        onChange={(e) => handleContentFieldChange('contactAddress', e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-[#00B4D8] text-slate-700"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Standard Business Hours</label>
                      <input
                        type="text"
                        value={webContent.contactHours}
                        onChange={(e) => handleContentFieldChange('contactHours', e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-[#00B4D8] text-slate-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Footer Corporate Profile Description</label>
                      <textarea
                        rows={3}
                        value={webContent.footerDesc}
                        onChange={(e) => handleContentFieldChange('footerDesc', e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-[#00B4D8] text-slate-700 leading-relaxed"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Footer Copyright Line</label>
                      <input
                        type="text"
                        value={webContent.footerCopyright}
                        onChange={(e) => handleContentFieldChange('footerCopyright', e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-[#00B4D8] text-slate-700"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors shadow-md shadow-emerald-500/10 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Content Edits Live</span>
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* TAB 5: USER LOGIN LOGS */}
          {activeTab === 'logs' && (
            <div className="space-y-6">
              
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h1 className="font-display font-black text-xl text-[#023E8A] uppercase tracking-wide">
                    User Login <span className="text-[#00B4D8]">History</span>
                  </h1>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">Auditable timeline records of customer login sessions.</p>
                </div>
                <button
                  onClick={() => {
                    localStorage.removeItem('aq_login_logs');
                    setLoginLogs(getLoginLogs());
                    showToast('Timeline logs reset to default.');
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Logs</span>
                </button>
              </div>

              {/* Login Timeline Table */}
              <div className="overflow-x-auto border border-slate-100 rounded-2xl shadow-sm">
                <table className="w-full text-left font-sans text-xs text-slate-600">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase text-[10px] font-bold">
                      <th className="py-3 px-4">Log Session ID</th>
                      <th className="py-3 px-4">Authorized User Name</th>
                      <th className="py-3 px-4">Linked Email ID</th>
                      <th className="py-3 px-4">Logged At Date & Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {loginLogs.map(log => (
                      <tr key={log.id} className="hover:bg-slate-50/40">
                        <td className="py-3 px-4 font-mono text-[10px] text-slate-400">#{log.id}</td>
                        <td className="py-3 px-4 font-semibold text-slate-800">{log.userName}</td>
                        <td className="py-3 px-4 font-mono text-[11px]">{log.emailId}</td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{log.loginTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* MODAL WINDOW 1: ADD / EDIT PRODUCT */}
      <AnimatePresence>
        {productModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-slate-100 flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="font-display font-extrabold text-lg text-[#023E8A] uppercase tracking-wide">
                  {productModal.mode === 'add' ? 'Add New Product' : 'Edit Product Specs'}
                </h3>
                <button 
                  onClick={() => setProductModal({ isOpen: false, mode: 'add', data: {} })}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="p-6 space-y-5 flex-grow">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">Product Name *</label>
                    <input
                      type="text"
                      value={productModal.data.name || ''}
                      onChange={(e) => setProductModal(prev => ({ ...prev, data: { ...prev.data, name: e.target.value } }))}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00B4D8]"
                      placeholder="e.g. Aqua HydroPure NXT"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">Brand Name *</label>
                    <select
                      value={productModal.data.brand || ''}
                      onChange={(e) => setProductModal(prev => ({ ...prev, data: { ...prev.data, brand: e.target.value as any } }))}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00B4D8]"
                    >
                      <option value="">Select Brand</option>
                      <option value="Aqua World">Aqua World</option>
                      <option value="Kent">Kent</option>
                      <option value="Livpure">Livpure</option>
                      <option value="Aquaguard">Aquaguard</option>
                      <option value="Pureit">Pureit</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">Retail Price (₹) *</label>
                    <input
                      type="number"
                      value={productModal.data.price || ''}
                      onChange={(e) => setProductModal(prev => ({ ...prev, data: { ...prev.data, price: Number(e.target.value) } }))}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00B4D8]"
                      placeholder="e.g. 24999"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">Warranty (Months/Years)</label>
                    <input
                      type="text"
                      value={productModal.data.warranty || ''}
                      onChange={(e) => setProductModal(prev => ({ ...prev, data: { ...prev.data, warranty: e.target.value } }))}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00B4D8]"
                      placeholder="e.g. 1 Year"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">M.R.P. Price (₹)</label>
                    <input
                      type="number"
                      value={productModal.data.originalPrice || ''}
                      onChange={(e) => setProductModal(prev => ({ ...prev, data: { ...prev.data, originalPrice: Number(e.target.value) } }))}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00B4D8]"
                      placeholder="e.g. 32999"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">Filter Tech *</label>
                    <select
                      value={productModal.data.technology || ''}
                      onChange={(e) => setProductModal(prev => ({ ...prev, data: { ...prev.data, technology: e.target.value as any } }))}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00B4D8]"
                    >
                      <option value="">Select Tech</option>
                      <option value="RO">RO</option>
                      <option value="UV">UV</option>
                      <option value="UF">UF</option>
                      <option value="UV + UF">UV + UF</option>
                      <option value="RO + UV">RO + UV</option>
                      <option value="RO + UV + UF">RO + UV + UF</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">Capacity Volume *</label>
                    <input
                      type="text"
                      value={productModal.data.capacity || ''}
                      onChange={(e) => setProductModal(prev => ({ ...prev, data: { ...prev.data, capacity: e.target.value } }))}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00B4D8]"
                      placeholder="e.g. 15L or 250 LPH"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">Installation Type *</label>
                    <select
                      value={productModal.data.installationType || ''}
                      onChange={(e) => setProductModal(prev => ({ ...prev, data: { ...prev.data, installationType: e.target.value as any } }))}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00B4D8]"
                    >
                      <option value="">Select Installation</option>
                      <option value="Wall Mounted">Wall Mounted</option>
                      <option value="Dispatch">Dispatch (Tabletop)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">Color Theme *</label>
                    <input
                      type="text"
                      value={productModal.data.color || ''}
                      onChange={(e) => setProductModal(prev => ({ ...prev, data: { ...prev.data, color: e.target.value } }))}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00B4D8]"
                      placeholder="e.g. Black, White, Silver"
                    />
                  </div>
                </div>



                {/* Product Image Uploader + Input */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide block">Product Image Setup</label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {productModal.data.image ? (
                      <div className="relative">
                        <img 
                          src={productModal.data.image} 
                          alt="preview" 
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-sm"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          type="button"
                          onClick={() => setProductModal(prev => ({ ...prev, data: { ...prev.data, image: '' } }))}
                          className="absolute -top-1.5 -right-1.5 p-0.5 bg-rose-500 text-white rounded-full hover:scale-110 transition-transform"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs">
                        No Image
                      </div>
                    )}
                    <div className="flex-grow space-y-2">
                      <div className="flex items-center gap-2">
                        <label className="px-3 py-2 bg-[#023E8A] hover:bg-[#00B4D8] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg cursor-pointer flex items-center gap-1">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload From Storage</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, true)}
                            className="hidden"
                          />
                        </label>
                        <span className="text-[10px] text-slate-400">or enter image URL directly:</span>
                      </div>
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/photo-..."
                        value={productModal.data.image || ''}
                        onChange={(e) => setProductModal(prev => ({ ...prev, data: { ...prev.data, image: e.target.value } }))}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none text-slate-700"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">Short Description *</label>
                  <input
                    type="text"
                    value={productModal.data.shortDesc || ''}
                    onChange={(e) => setProductModal(prev => ({ ...prev, data: { ...prev.data, shortDesc: e.target.value } }))}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                    placeholder="Short summary tagline for shop listing grid"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">Detailed Specifications Description</label>
                  <textarea
                    rows={3}
                    value={productModal.data.fullDesc || ''}
                    onChange={(e) => setProductModal(prev => ({ ...prev, data: { ...prev.data, fullDesc: e.target.value } }))}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                    placeholder="Comprehensive features overview paragraphs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="p-bestseller"
                      checked={!!productModal.data.isBestSeller}
                      onChange={(e) => setProductModal(prev => ({ ...prev, data: { ...prev.data, isBestSeller: e.target.checked } }))}
                      className="w-4.5 h-4.5 text-[#00B4D8] border-slate-300 rounded focus:ring-[#00B4D8] cursor-pointer"
                    />
                    <label htmlFor="p-bestseller" className="text-xs font-semibold text-slate-600 cursor-pointer">Mark as Bestseller Item</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="p-newarrival"
                      checked={!!productModal.data.isNewArrival}
                      onChange={(e) => setProductModal(prev => ({ ...prev, data: { ...prev.data, isNewArrival: e.target.checked } }))}
                      className="w-4.5 h-4.5 text-[#00B4D8] border-slate-300 rounded focus:ring-[#00B4D8] cursor-pointer"
                    />
                    <label htmlFor="p-newarrival" className="text-xs font-semibold text-slate-600 cursor-pointer">Mark as New Arrival Item</label>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setProductModal({ isOpen: false, mode: 'add', data: {} })}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#023E8A] hover:bg-[#00B4D8] text-white text-xs font-bold uppercase rounded-xl transition-colors cursor-pointer"
                  >
                    Save Product
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>



    </div>
  );
};
