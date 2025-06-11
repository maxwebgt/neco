import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Product from './server/models/Product.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Подключение к MongoDB
const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/ecovery';
mongoose.connect(mongoUrl);

// API маршруты
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/products/featured', async (req, res) => {
    try {
        const featured = await Product.find({ 
            $or: [{ isBestseller: true }, { isNew: true }] 
        }).limit(8);
        res.json(featured);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 API сервер запущен на http://localhost:${PORT}`);
    console.log(`📡 Подключен к MongoDB`);
    console.log(`📦 Маршруты:`);
    console.log(`   GET /api/products - все товары`);
    console.log(`   GET /api/products/featured - рекомендуемые товары`);
    console.log(`   GET /api/categories - категории`);
}); 