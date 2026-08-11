import React, { useState, useEffect } from 'react';
import { 
  Lock, Mail, User, Phone, MapPin, LogOut, Check, ArrowRight, 
  UserCheck, ShieldCheck, Calendar, Sparkles, Heart,
  AlertCircle, Eye, EyeOff, UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  getCustomerUser, loginCustomer, logoutCustomer, updateCustomerProfile, 
  isAdminAuthenticated, loginAdmin, CustomerUser,
  registerCustomerAccount, validateCustomerCredentials
} from '../lib/adminState';

interface LoginViewProps {
  setActivePage: (page: string) => void;
  onShowToast: (message: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ setActivePage, onShowToast }) => {
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(getCustomerUser());
  const [isTab, setIsTab] = useState<'customer' | 'admin'>('customer');
  
  // Form State
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    phoneNumber: '',
    address: ''
  });

  // Track customer authentication changes
  useEffect(() => {
    const handleCustomerAuthChange = () => {
      setCurrentUser(getCustomerUser());
    };
    window.addEventListener('customer-auth-change', handleCustomerAuthChange);
    return () => window.removeEventListener('customer-auth-change', handleCustomerAuthChange);
  }, []);

  // Redirect to admin panel if already logged in as admin
  useEffect(() => {
    if (isAdminAuthenticated()) {
      setActivePage('admin');
    }
  }, [setActivePage]);

  // Sync profile editing fields with current user state
  useEffect(() => {
    if (currentUser) {
      setEditForm({
        name: currentUser.name,
        phoneNumber: currentUser.phoneNumber || '',
        address: currentUser.address || ''
      });
    }
  }, [currentUser, isEditingProfile]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !email.trim().toLowerCase().endsWith('@gmail.com')) {
      setError('Please enter a valid Gmail address ending with @gmail.com.');
      return;
    }

    // Customer Login
    const emailId = email.trim().toLowerCase();
    const namePart = emailId.split('@')[0];
    loginCustomer(namePart, emailId);
    onShowToast(`Welcome, ${namePart}!`);
    
    // Reset form
    setEmail('');
    setError('');
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.name.trim()) {
      setError('Name cannot be empty.');
      return;
    }
    updateCustomerProfile({
      name: editForm.name.trim(),
      phoneNumber: editForm.phoneNumber.trim(),
      address: editForm.address.trim()
    });
    setIsEditingProfile(false);
    onShowToast('Your profile has been updated successfully.');
  };

  const handleLogoutClick = () => {
    logoutCustomer();
    onShowToast('Logged out of customer account.');
  };



  return (
    <div className="bg-transparent py-4 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Page header */}
      <section className="text-center space-y-3 pt-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#00B4D8]/20 text-[#00B4D8] text-xs font-semibold uppercase tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{currentUser ? 'Your Profile' : 'Secure Access'}</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-extrabold text-3xl sm:text-4xl text-[#023E8A] tracking-tight uppercase"
        >
          {currentUser ? 'CUSTOMER ' : 'PORTAL '}<span className="text-[#00B4D8]">{currentUser ? 'DASHBOARD' : 'LOGIN'}</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-sans text-slate-600 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed"
        >
          {currentUser 
            ? 'Manage your personalized pure water profile, trace installations, and view warranty details.' 
            : 'Sign in to customize your water filtration preferences, trace orders, and gain access to premium benefits.'
          }
        </motion.p>
      </section>

      {/* Main Container */}
      <div className="grid grid-cols-1 gap-8">
        <AnimatePresence mode="wait">
          {currentUser ? (
            /* Logged In Dashboard View */
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Profile Card left */}
              <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-xl shadow-blue-950/5 lg:col-span-1 space-y-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#023E8A] to-[#00B4D8] text-white flex items-center justify-center font-display font-extrabold text-2xl shadow-md">
                      {currentUser.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-lg text-[#023E8A] leading-tight">{currentUser.name}</h2>
                      <p className="font-sans text-xs text-slate-500 font-medium">{currentUser.email}</p>
                    </div>
                  </div>

                  {/* Profile Form / Display */}
                  {isEditingProfile ? (
                    <form onSubmit={handleProfileSave} className="space-y-4 pt-4">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold uppercase text-[#023E8A] tracking-wider">Full Name</label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-[#023E8A] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold uppercase text-[#023E8A] tracking-wider">Phone Number</label>
                        <input
                          type="text"
                          placeholder="e.g. +1 555-019-2834"
                          value={editForm.phoneNumber}
                          onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-[#023E8A] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold uppercase text-[#023E8A] tracking-wider">Delivery Address</label>
                        <textarea
                          rows={2}
                          placeholder="e.g. 128 Main Street, Suite A"
                          value={editForm.address}
                          onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-[#023E8A] focus:outline-none focus:ring-1 focus:ring-[#00B4D8] resize-none"
                        />
                      </div>
                      {error && <div className="text-red-500 text-xs font-semibold">{error}</div>}
                      <div className="flex gap-2 pt-2">
                        <button
                          type="submit"
                          className="flex-1 py-2 rounded-xl bg-[#023E8A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#00B4D8] transition-colors cursor-pointer"
                        >
                          Save Profile
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditingProfile(false);
                            setError('');
                          }}
                          className="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold uppercase hover:bg-slate-200 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4 pt-4 font-sans text-xs">
                      <div className="flex items-start gap-2.5 text-slate-600">
                        <Calendar className="w-4 h-4 text-[#00B4D8] mt-0.5" />
                        <div>
                          <p className="font-semibold text-[#023E8A]">Registered On</p>
                          <p>{currentUser.memberSince}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 text-slate-600">
                        <Phone className="w-4 h-4 text-[#00B4D8] mt-0.5" />
                        <div>
                          <p className="font-semibold text-[#023E8A]">Phone Number</p>
                          <p>{currentUser.phoneNumber || <span className="text-slate-400 italic">Not provided yet</span>}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 text-slate-600">
                        <MapPin className="w-4 h-4 text-[#00B4D8] mt-0.5" />
                        <div>
                          <p className="font-semibold text-[#023E8A]">Delivery Address</p>
                          <p className="whitespace-pre-line">{currentUser.address || <span className="text-slate-400 italic">Not provided yet</span>}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="w-full mt-4 py-2 rounded-xl border border-blue-100 text-[#023E8A] hover:bg-blue-50 font-bold uppercase tracking-wider text-[11px] transition-colors cursor-pointer"
                      >
                        Edit Profile Details
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6">
                  <button
                    onClick={handleLogoutClick}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out Account</span>
                  </button>
                </div>
              </div>

              {/* Order and Benefits panels */}
              <div className="lg:col-span-2 space-y-6">
                {/* Active Benefits panel */}
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-xl shadow-blue-950/5">
                  <h3 className="font-display font-bold text-base text-[#023E8A] mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#00B4D8]" />
                    <span>Premium Customer Benefits</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-white text-[#00B4D8] shadow-sm">
                        <Check className="w-4 h-4 font-bold" />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-xs text-[#023E8A] uppercase tracking-wide">Active AMC Warranty</h4>
                        <p className="text-[11px] text-slate-500 leading-normal mt-1">12 Months complimentary maintenance, covering filters & membrane replacements.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-white text-[#00B4D8] shadow-sm">
                        <Check className="w-4 h-4 font-bold" />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-xs text-[#023E8A] uppercase tracking-wide">Priority Support (24/7)</h4>
                        <p className="text-[11px] text-slate-500 leading-normal mt-1">Access immediate technician dispatch using toll-free priority line.</p>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </motion.div>
          ) : (
            /* Logged Out Login Card View */
            <motion.div
              key="login"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-md mx-auto w-full bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 shadow-xl shadow-blue-950/5 overflow-hidden"
            >
              {/* Form Content */}
              <div className="p-8">
                <div className="text-center space-y-1 mb-6">
                  <h3 className="font-display font-extrabold text-lg text-[#023E8A] uppercase">
                    Customer Login
                  </h3>
                  <p className="font-sans text-xs text-slate-500">
                    Enter your Gmail address to log in instantly
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase text-[#023E8A] tracking-wider">
                      Gmail Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. customer@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-[#023E8A] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2.5 text-red-600 text-xs font-semibold">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#023E8A] to-[#00B4D8] text-white text-xs font-bold uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Login via Gmail</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Helpful Hints */}
                <div className="mt-6 p-4 rounded-xl bg-blue-50/30 border border-blue-50 text-[10px] text-slate-500 leading-normal font-sans">
                  <div className="text-center space-y-1">
                    <p>✨ <strong>Customer Access:</strong> Simply enter your Gmail address to securely access your profile instantly.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
