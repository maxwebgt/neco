import mongoose from 'mongoose';
import { parseAndSaveProducts } from './server/utils/productParser.js';

const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/ecovery';

async function initializeData() {
    try {
        console.log('🔄 Инициализация данных ECO.VERY...');
        
        // Подключаемся к MongoDB
        await mongoose.connect(mongoUrl);
        console.log('📡 Подключено к MongoDB');
        
        // Ждем немного, чтобы убедиться что MongoDB готов
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Парсим и сохраняем товары
        console.log('🚀 Начинаем загрузку товаров...');
        const results = await parseAndSaveProducts();
        
        console.log('\n🎉 Инициализация завершена!');
        console.log(`✅ Успешно: ${results.success}`);
        console.log(`❌ Ошибок: ${results.errors}`);
        
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Ошибка инициализации:', error);
        process.exit(1);
    }
}

// Запускаем инициализацию только если товаров нет в базе
import Product from './server/models/Product.js';
mongoose.connect(mongoUrl).then(async () => {
    const count = await Product.countDocuments();
    if (count === 0) {
        console.log('📦 База данных пуста, запускаем инициализацию...');
        initializeData();
    } else {
        console.log(`📦 В базе уже есть ${count} товаров, пропускаем инициализацию`);
        process.exit(0);
    }
}).catch(error => {
    console.error('❌ Ошибка подключения к MongoDB:', error);
    process.exit(1);
}); 