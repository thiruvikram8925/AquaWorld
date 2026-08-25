import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load env vars
dotenv.config({ path: '.env.local' });
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Supabase Init
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Helper: Upload Base64 Image to Supabase Storage
async function uploadImageToSupabase(imageInput: string, id: string): Promise<string> {
  if (!imageInput) return '';
  if (imageInput.startsWith('http://') || imageInput.startsWith('https://')) {
    return imageInput;
  }
  if (imageInput.startsWith('data:image/')) {
    const matches = imageInput.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 string');
    }
    const contentType = matches[1];
    const buffer = Buffer.from(matches[2], 'base64');
    const ext = contentType.split('/')[1] || 'png';
    const fileName = `${id}-${Date.now()}.${ext}`;
    
    const { data, error } = await supabase.storage.from('products').upload(fileName, buffer, {
      contentType,
      upsert: true
    });
    if (error) {
      console.error('Supabase storage upload error:', error);
      throw error;
    }
    const { data: publicUrlData } = supabase.storage.from('products').getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  }
  return imageInput;
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
app.get('/api/products', async (req, res) => {
  try {
    const { data, error } = await supabase.from('products').select('*').order('createdAt', { ascending: false });
    if (error) throw error;
    res.json(data || []);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/categories - Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) throw error;
    res.json(data || []);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/content - Get website content
app.get('/api/content', async (req, res) => {
  try {
    const { data, error } = await supabase.from('site_content').select('*');
    if (error) throw error;
    const contentMap: any = {};
    if (data) {
      data.forEach(item => {
        contentMap[item.key] = item.value;
      });
    }
    res.json(contentMap);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/save - Backward compatibility save endpoint
app.post('/api/save', (req, res) => {
  res.json({ success: true, message: 'Legacy local save disabled.' });
});

// ==================== ADMIN AUTH ENDPOINTS ====================

// POST /api/admin/login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  const adminUsername = process.env.ADMIN_USERNAME || 'aquaworldsanthosh@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Santhoshkumar@123';

  if (username === adminUsername && password === adminPassword) {
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
app.get('/api/admin/stats', requireAdminAuth, async (req, res) => {
  try {
    const [{ count: totalProducts }, { count: activeProducts }, { count: totalCategories }] = await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('products').select('*', { count: 'exact', head: true }).eq('isEnabled', true),
      supabase.from('categories').select('*', { count: 'exact', head: true })
    ]);
    res.json({
      totalProducts: totalProducts || 0,
      activeProducts: activeProducts || 0,
      totalCategories: totalCategories || 0,
      serverStatus: 'Online (Supabase DB)',
      dbSizeKb: 'Cloud'
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/products - Add Product
app.post('/api/admin/products', requireAdminAuth, async (req, res) => {
  try {
    const productId = 'p-' + Date.now();
    let imageUrl = '';
    if (req.body.image) {
      imageUrl = await uploadImageToSupabase(req.body.image, productId);
    }
    const newProduct = {
      id: productId,
      ...req.body,
      image: imageUrl,
      isEnabled: req.body.isEnabled !== false
    };
    const { data, error } = await supabase.from('products').insert([newProduct]).select();
    if (error) throw error;
    res.json({ success: true, product: data[0] });
  } catch (err: any) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/admin/products/:id - Edit Product
app.put('/api/admin/products/:id', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };
    if (updateData.image) {
      updateData.image = await uploadImageToSupabase(updateData.image, id);
    }
    updateData.updatedAt = new Date().toISOString();
    
    const { data, error } = await supabase.from('products').update(updateData).eq('id', id).select();
    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true, product: data[0] });
  } catch (err: any) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/admin/products/:id - Delete Product
app.delete('/api/admin/products/:id', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/categories - Add Category
app.post('/api/admin/categories', requireAdminAuth, async (req, res) => {
  try {
    const categoryId = 'c-' + Date.now();
    const newCategory = { id: categoryId, ...req.body };
    const { data, error } = await supabase.from('categories').insert([newCategory]).select();
    if (error) throw error;
    res.json({ success: true, category: data[0] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/admin/categories/:id - Delete Category
app.delete('/api/admin/categories/:id', requireAdminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/admin/content - Update Website Content
app.put('/api/admin/content', requireAdminAuth, async (req, res) => {
  try {
    const updates = Object.keys(req.body).map(key => ({
      key,
      value: req.body[key]
    }));
    const { error } = await supabase.from('site_content').upsert(updates);
    if (error) throw error;
    res.json({ success: true, content: req.body });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== STATIC FILE SERVING ====================

const distPath = path.resolve(__dirname, '../dist');
const adminPublicPath = path.join(__dirname, 'public');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}
app.use('/admin', express.static(adminPublicPath));
app.use(express.static(adminPublicPath));

app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  if (req.path.startsWith('/admin')) {
    const adminIndex = path.join(adminPublicPath, 'index.html');
    if (fs.existsSync(adminIndex)) return res.sendFile(adminIndex);
  }
  const reactIndex = path.join(distPath, 'index.html');
  if (fs.existsSync(reactIndex)) {
    return res.sendFile(reactIndex);
  }
  res.sendFile(path.join(adminPublicPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`🚀 AQUA WORLD Server running on port ${PORT}`);
  console.log(`🌐 Storefront Website:    http://localhost:${PORT}`);
  console.log(`🔒 Backend Admin Panel:   http://localhost:${PORT}/admin`);
  console.log(`📡 REST API Base:         http://localhost:${PORT}/api`);
  console.log(`====================================================`);
});
