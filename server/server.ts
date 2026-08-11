import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;
const DB_PATH = path.resolve(__dirname, '../src/database.json');

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Helper to read database.json
function readDatabase() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return { products: [], categories: [], content: {}, logs: [] };
    }
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database:', err);
    return { products: [], categories: [], content: {}, logs: [] };
  }
}

// Helper to write database.json
function writeDatabase(data: any) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing database:', err);
    return false;
  }
}

// Simple in-memory session token store
const activeSessions = new Set<string>();

// Admin Auth Middleware
function requireAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. Admin login required.' });
  }
  const token = authHeader.split(' ')[1];
  if (!activeSessions.has(token)) {
    return res.status(401).json({ error: 'Session expired or invalid.' });
  }
  next();
}

// ==================== PUBLIC API ENDPOINTS ====================

// GET /api/products - Get all products
app.get('/api/products', (req, res) => {
  const db = readDatabase();
  res.json(db.products || []);
});

// GET /api/categories - Get all categories
app.get('/api/categories', (req, res) => {
  const db = readDatabase();
  res.json(db.categories || []);
});

// GET /api/content - Get website content
app.get('/api/content', (req, res) => {
  const db = readDatabase();
  res.json(db.content || {});
});

// POST /api/save - Backward compatibility save endpoint
app.post('/api/save', (req, res) => {
  try {
    const currentDb = readDatabase();
    const newDb = { ...currentDb, ...req.body };
    writeDatabase(newDb);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== ADMIN AUTH ENDPOINTS ====================

// POST /api/admin/login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'aquaworldsanthosh@gmail.com' && password === 'Santhoshkumar@123') {
    const token = 'admin_token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    activeSessions.add(token);
    return res.json({ success: true, token, username: 'Admin Santhosh' });
  }
  return res.status(401).json({ error: 'Invalid admin credentials.' });
});

// POST /api/admin/logout
app.post('/api/admin/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    activeSessions.delete(token);
  }
  res.json({ success: true });
});

// GET /api/admin/check-auth
app.get('/api/admin/check-auth', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    if (activeSessions.has(token)) {
      return res.json({ authenticated: true });
    }
  }
  return res.json({ authenticated: false });
});

// ==================== ADMIN PROTECTED API ENDPOINTS ====================

// GET /api/admin/stats
app.get('/api/admin/stats', requireAdminAuth, (req, res) => {
  const db = readDatabase();
  const products = db.products || [];
  const categories = db.categories || [];
  const activeProducts = products.filter((p: any) => p.isEnabled !== false);
  res.json({
    totalProducts: products.length,
    activeProducts: activeProducts.length,
    totalCategories: categories.length,
    serverStatus: 'Online',
    dbSizeKb: (fs.statSync(DB_PATH).size / 1024).toFixed(2)
  });
});

// POST /api/admin/products - Add Product
app.post('/api/admin/products', requireAdminAuth, (req, res) => {
  const db = readDatabase();
  const newProduct = {
    id: 'p-' + Date.now(),
    isEnabled: true,
    ...req.body
  };
  db.products = db.products || [];
  db.products.unshift(newProduct);
  if (writeDatabase(db)) {
    res.json({ success: true, product: newProduct });
  } else {
    res.status(500).json({ error: 'Failed to save product to database.' });
  }
});

// PUT /api/admin/products/:id - Edit Product
app.put('/api/admin/products/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = readDatabase();
  db.products = db.products || [];
  const index = db.products.findIndex((p: any) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found.' });
  }
  db.products[index] = { ...db.products[index], ...req.body };
  if (writeDatabase(db)) {
    res.json({ success: true, product: db.products[index] });
  } else {
    res.status(500).json({ error: 'Failed to update product.' });
  }
});

// DELETE /api/admin/products/:id - Delete Product
app.delete('/api/admin/products/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = readDatabase();
  db.products = db.products || [];
  db.products = db.products.filter((p: any) => p.id !== id);
  if (writeDatabase(db)) {
    res.json({ success: true });
  } else {
    res.status(500).json({ error: 'Failed to delete product.' });
  }
});

// POST /api/admin/categories - Add Category
app.post('/api/admin/categories', requireAdminAuth, (req, res) => {
  const db = readDatabase();
  const newCategory = {
    id: 'c-' + Date.now(),
    ...req.body
  };
  db.categories = db.categories || [];
  db.categories.push(newCategory);
  if (writeDatabase(db)) {
    res.json({ success: true, category: newCategory });
  } else {
    res.status(500).json({ error: 'Failed to save category.' });
  }
});

// DELETE /api/admin/categories/:id - Delete Category
app.delete('/api/admin/categories/:id', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = readDatabase();
  db.categories = db.categories || [];
  db.categories = db.categories.filter((c: any) => c.id !== id);
  if (writeDatabase(db)) {
    res.json({ success: true });
  } else {
    res.status(500).json({ error: 'Failed to delete category.' });
  }
});

// PUT /api/admin/content - Update Website Content
app.put('/api/admin/content', requireAdminAuth, (req, res) => {
  const db = readDatabase();
  db.content = { ...db.content, ...req.body };
  if (writeDatabase(db)) {
    res.json({ success: true, content: db.content });
  } else {
    res.status(500).json({ error: 'Failed to update content.' });
  }
});

// ==================== STATIC FILE SERVING ====================

const distPath = path.resolve(__dirname, '../dist');
const adminPublicPath = path.join(__dirname, 'public');

// Serve the React storefront (dist/) at the root
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// Serve the Admin Panel at /admin
app.use('/admin', express.static(adminPublicPath));
app.use(express.static(adminPublicPath));

// SPA fallback - ALL unmatched routes serve the React index.html (supports browser refresh)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  // If requesting admin panel routes explicitly
  if (req.path.startsWith('/admin')) {
    const adminIndex = path.join(adminPublicPath, 'index.html');
    if (fs.existsSync(adminIndex)) return res.sendFile(adminIndex);
  }
  // Serve React SPA for all other routes (home, shop, about, contact, etc.)
  const reactIndex = path.join(distPath, 'index.html');
  if (fs.existsSync(reactIndex)) {
    return res.sendFile(reactIndex);
  }
  // Fallback to admin panel if no build exists (dev mode)
  res.sendFile(path.join(adminPublicPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 AQUA WORLD Server running on port ${PORT}`);
  console.log(`🌐 Storefront Website:    http://localhost:${PORT}`);
  console.log(`🔒 Backend Admin Panel:   http://localhost:${PORT}/admin`);
  console.log(`📡 REST API Base:         http://localhost:${PORT}/api`);
  console.log(`====================================================`);
});
