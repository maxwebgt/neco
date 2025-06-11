import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

// ES modules setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (images)
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// MongoDB connection
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://admin:ecoVery2024!@localhost:27017/ecovery?authSource=admin';
        
        await mongoose.connect(mongoURI);
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

// Import routes
import productsRouter from './routes/products.js';

// Routes
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'ECO.VERY API Server is running',
        timestamp: new Date().toISOString()
    });
});

// Products routes
app.use('/api/products', productsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
const startServer = async () => {
    try {
        await connectDB();
        
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
            console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer(); 