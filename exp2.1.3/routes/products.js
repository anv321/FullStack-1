import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const loadProducts = () => {
  const filePath = path.join(__dirname, '../data/products.json');
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

router.get('/', (req, res) => {
  try {
    const products = loadProducts();
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:category', (req, res) => {
  try {
    const products = loadProducts();
    const category = req.params.category;
    const filtered = products.filter(p => p.category === category);
    
    res.json({
      success: true,
      category,
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const products = loadProducts();
    const product = products.find(p => p.id == req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
