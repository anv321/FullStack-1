import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);

app.get('/', (req, res) => {
  res.json({ 
    message: 'E-commerce Catalog API v1.0',
    endpoints: {
      all: '/api/products',
      category: '/api/products/smartphones', 
      product: '/api/products/1'
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
