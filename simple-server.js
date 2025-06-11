import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseAndSaveProducts } from './app/server/utils/productParser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
    try {
        const mongoURI = 'mongodb://admin:ecoVery2024!@localhost:27017/ecovery?authSource=admin';
        await mongoose.connect(mongoURI);
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

// Routes
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Simple ECO.VERY API Server is running',
        timestamp: new Date().toISOString()
    });
});

app.post('/api/sync', async (req, res) => {
    try {
        console.log('🔄 Начинаем синхронизацию товаров...');
        const results = await parseAndSaveProducts();
        res.json({
            message: 'Синхронизация завершена',
            results
        });
    } catch (error) {
        console.error('❌ Ошибка синхронизации:', error);
        res.status(500).json({ 
            error: 'Ошибка синхронизации',
            details: error.message
        });
    }
});

// Start server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`🚀 Simple server running on http://localhost:${PORT}`);
            console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
            console.log(`🔄 Sync products: POST http://localhost:${PORT}/api/sync`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer(); 