import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log("Starting Migration to Supabase...");
  const dbPath = path.resolve(__dirname, '../src/database.json');
  
  if (!fs.existsSync(dbPath)) {
    console.error(`Database file not found at ${dbPath}`);
    process.exit(1);
  }

  const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  
  const { products, categories, content } = dbData;
  
  // 1. Migrate Products
  if (products && products.length > 0) {
    console.log(`Migrating ${products.length} products...`);
    for (const product of products) {
      if (product.isEnabled === undefined) product.isEnabled = true;
      if (product.isBestSeller === undefined) product.isBestSeller = false;
      if (product.isNewArrival === undefined) product.isNewArrival = false;
    }
    const { error } = await supabase.from('products').upsert(products);
    if (error) {
      console.error("Error migrating products:", error);
    } else {
      console.log("Products migrated successfully.");
    }
  } else {
    console.log("No products to migrate.");
  }
  
  // 2. Migrate Categories
  if (categories && categories.length > 0) {
    console.log(`Migrating ${categories.length} categories...`);
    const { error } = await supabase.from('categories').upsert(categories);
    if (error) {
      console.error("Error migrating categories:", error);
    } else {
      console.log("Categories migrated successfully.");
    }
  } else {
    console.log("No categories to migrate.");
  }
  
  // 3. Migrate Content
  if (content && Object.keys(content).length > 0) {
    const keys = Object.keys(content);
    console.log(`Migrating ${keys.length} content keys...`);
    const contentToInsert = keys.map(key => ({
      key,
      value: content[key]
    }));
    const { error } = await supabase.from('site_content').upsert(contentToInsert);
    if (error) {
      console.error("Error migrating content:", error);
    } else {
      console.log("Content migrated successfully.");
    }
  } else {
    console.log("No content to migrate.");
  }
  
  console.log("Migration Complete!");
}

migrate();
