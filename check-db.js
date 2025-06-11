import mongoose from 'mongoose';
import Product from './app/server/models/Product.js';

async function checkProducts() {
    try {
        await mongoose.connect('mongodb://localhost:27017/ecovery');
        console.log('📡 Подключено к MongoDB');
        
        const products = await Product.find({}).limit(5);
        console.log(`📦 Товаров в базе: ${await Product.countDocuments()}`);
        console.log('\n🛍️ Первые 5 товаров:');
        products.forEach(p => {
            console.log(`- ${p.name} (${p.price}₽) - slug: ${p.slug}`);
        });
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Ошибка:', error);
        process.exit(1);
    }
}

checkProducts(); 