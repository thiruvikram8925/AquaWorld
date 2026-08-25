import { Product, Category } from '../types';
import { PRODUCTS, CATEGORIES } from '../data';

// Define Website Content Interface
export interface WebsiteContent {
  heroTitle: string;
  heroHighlight: string;
  heroDesc: string;
  aboutBadge: string;
  aboutTitle: string;
  aboutDesc: string;
  aboutSummaryTitle: string;
  aboutSummaryText1: string;
  aboutSummaryText2: string;
  contactHelpline: string;
  contactEmail: string;
  contactAddress: string;
  contactHours: string;
  footerDesc: string;
  footerCopyright: string;
}

// Define User Login Interface
export interface LoginLog {
  id: string;
  userName: string;
  emailId: string;
  loginTime: string;
}

// Default Website Content
const DEFAULT_CONTENT: WebsiteContent = {
  heroTitle: 'PURE WATER.',
  heroHighlight: 'HEALTHY LIFE.',
  heroDesc: 'Experience the pinnacle of water purification. Our advanced RO + UV technology ensures 99.9% purity for your home and business.',
  aboutBadge: 'Discover Our Legacy',
  aboutTitle: 'ABOUT AQUA WORLD',
  aboutDesc: 'Pioneering drinking water security with elite scientific purification technologies since 2014.',
  aboutSummaryTitle: 'Pure Water. Healthier Communities.',
  aboutSummaryText1: 'At AQUA WORLD, we believe safe drinking water is a fundamental human necessity. As a leading manufacturer and supplier of luxury water purifiers, Reverse Osmosis (RO) plants, and advanced filtration configurations, we provide bespoke, scientific treatment units catering to varying local water TDS parameters.',
  aboutSummaryText2: 'Our patented, multi-membrane process effectively rejects heavy toxic metals, organic chemical solvents, and microbiological pathogens, while carefully infusing life-enriching calcium, active copper, and magnesium minerals. We serve thousands of happy residential kitchens, modern executive offices, and critical industrial sectors.',
  contactHelpline: '9788545519',
  contactEmail: 'support@aquaworld.com',
  contactAddress: 'Aqua World Tower, Sector-62, Noida, UP, India',
  contactHours: 'Monday - Saturday: 09:00 AM - 07:00 PM',
  footerDesc: 'AQUA WORLD is India’s premier brand specializing in elite multi-stage reverse osmosis (RO), ultraviolet (UV), and ultrafiltration (UF) systems, delivering healthy, mineral-rich alkaline water to millions.',
  footerCopyright: '© 2026 AQUA WORLD. All Rights Reserved.'
};

// Initial Default Logins for demonstration
const DEFAULT_LOGINS: LoginLog[] = [
  { id: '1', userName: 'Amit Sharma', emailId: 'amit.sharma@gmail.com', loginTime: '2026-07-01, 10:15:32 AM' },
  { id: '2', userName: 'Priya Reddy', emailId: 'priya.reddy@yahoo.com', loginTime: '2026-07-01, 02:30:11 PM' },
  { id: '3', userName: 'John Doe', emailId: 'john.doe@microsoft.com', loginTime: '2026-07-02, 08:45:04 AM' },
  { id: '4', userName: 'Vikram Rathore', emailId: 'vikram.r@gmail.com', loginTime: '2026-07-02, 11:20:45 AM' }
];

// Helper to check if item exists in localStorage, otherwise set and return default
const getOrSetLocal = <T>(key: string, defaultValue: T): T => {
  const item = localStorage.getItem(key);
  if (!item) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(item) as T;
  } catch (e) {
    return defaultValue;
  }
};

// 1. Get and Save Products
export const getAdminProducts = (): Product[] => {
  return PRODUCTS;
};

export const saveAdminProducts = (products: Product[]) => {
  // Legacy save disabled
};

// 2. Get and Save Categories
export const getAdminCategories = (): Category[] => {
  return CATEGORIES;
};

export const saveAdminCategories = (categories: Category[]) => {
  // Legacy save disabled
};

// 3. Get and Save Web Content
export const getAdminContent = (): WebsiteContent => {
  return DEFAULT_CONTENT;
};

export const saveAdminContent = (content: WebsiteContent) => {
  // Legacy save disabled
};

// 4. Get and Save Login Logs
export const getLoginLogs = (): LoginLog[] => {
  return getOrSetLocal<LoginLog[]>('aq_login_logs', DEFAULT_LOGINS);
};

export const addLoginLog = (userName: string, emailId: string) => {
  const logs = getLoginLogs();
  const newLog: LoginLog = {
    id: 'L-' + Date.now(),
    userName,
    emailId,
    loginTime: new Date().toLocaleString()
  };
  const updatedLogs = [newLog, ...logs];
  localStorage.setItem('aq_login_logs', JSON.stringify(updatedLogs));
  return updatedLogs;
};

// 5. Admin Authentication State Management (Moved to Backend Server)
export const isAdminAuthenticated = (): boolean => false;
export const loginAdmin = (): boolean => false;
export const logoutAdmin = () => {};
export const updateAdminActivity = () => {};

// 6. Customer Authentication & Profile Management
export interface CustomerUser {
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  memberSince: string;
}

export const getCustomerUser = (): CustomerUser | null => {
  const user = localStorage.getItem('aq_customer_user');
  if (!user) return null;
  try {
    return JSON.parse(user) as CustomerUser;
  } catch (e) {
    return null;
  }
};

export const loginCustomer = (name: string, email: string): CustomerUser => {
  const newUser: CustomerUser = {
    name,
    email,
    phoneNumber: '',
    address: '',
    memberSince: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  };
  localStorage.setItem('aq_customer_user', JSON.stringify(newUser));
  addLoginLog(name, email); // Directly feed into the Admin Central Logs
  window.dispatchEvent(new Event('customer-auth-change'));
  return newUser;
};

export const logoutCustomer = () => {
  localStorage.removeItem('aq_customer_user');
  window.dispatchEvent(new Event('customer-auth-change'));
};

export const updateCustomerProfile = (updatedProfile: Partial<CustomerUser>) => {
  const current = getCustomerUser();
  if (current) {
    const merged = { ...current, ...updatedProfile };
    localStorage.setItem('aq_customer_user', JSON.stringify(merged));
    window.dispatchEvent(new Event('customer-auth-change'));
    return merged;
  }
  return null;
};

// 7. Customer Accounts and Credentials Validation
export interface CustomerAccount {
  name: string;
  email: string;
  passwordHash: string;
}

const DEFAULT_CUSTOMERS: CustomerAccount[] = [
  { name: 'Amit Sharma', email: 'amit.sharma@gmail.com', passwordHash: 'amit123' },
  { name: 'Priya Reddy', email: 'priya.reddy@yahoo.com', passwordHash: 'priya123' },
  { name: 'John Doe', email: 'john.doe@microsoft.com', passwordHash: 'john123' },
  { name: 'Vikram Rathore', email: 'vikram.r@gmail.com', passwordHash: 'vikram123' },
  { name: 'Customer User', email: 'customer@gmail.com', passwordHash: 'customer123' }
];

export const getCustomerAccounts = (): CustomerAccount[] => {
  return getOrSetLocal<CustomerAccount[]>('aq_customer_accounts', DEFAULT_CUSTOMERS);
};

export const registerCustomerAccount = (name: string, email: string, passwordHash: string): boolean => {
  const accounts = getCustomerAccounts();
  const lowerEmail = email.toLowerCase().trim();
  if (accounts.some(a => a.email.toLowerCase().trim() === lowerEmail)) {
    return false; // Email already exists
  }
  const newAccount: CustomerAccount = {
    name: name.trim(),
    email: lowerEmail,
    passwordHash: passwordHash
  };
  localStorage.setItem('aq_customer_accounts', JSON.stringify([...accounts, newAccount]));
  return true;
};

export const validateCustomerCredentials = (email: string, passwordHash: string): CustomerAccount | null => {
  const accounts = getCustomerAccounts();
  const lowerEmail = email.toLowerCase().trim();
  const found = accounts.find(a => a.email.toLowerCase().trim() === lowerEmail);
  if (found && found.passwordHash === passwordHash) {
    return found;
  }
  return null;
};

