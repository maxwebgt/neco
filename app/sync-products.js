import mongoose from 'mongoose';
import { parseAndSaveProducts } from './server/utils/productParser.js';

async function syncProducts() {
    try {
        console.log('🔄 Синхронизация товаров ECO.VERY...\n');
        
        // Подключаемся к MongoDB
        console.log('📡 Подключаемся к MongoDB...');
        const mongoURI = 'mongodb://admin:ecoVery2024!@localhost:27017/ecovery?authSource=admin';
        await mongoose.connect(mongoURI);
        console.log('✅ MongoDB подключен успешно\n');
        
        // Запускаем парсинг и сохранение товаров
        console.log('🚀 Начинаем парсинг товаров из папки "эковери"...');
        const results = await parseAndSaveProducts();
        
        console.log('\n🎉 Синхронизация завершена!');
        console.log(`✅ Успешно обработано: ${results.success}`);
        console.log(`❌ Ошибок: ${results.errors}`);
        
        if (results.processed.length > 0) {
            console.log('\n📦 Обработанные товары:');
            results.processed.forEach((item, index) => {
                if (item.status === 'success') {
                    console.log(`   ${index + 1}. ✅ ${item.name} - ${item.price}₽ (${item.category}, ${item.images} фото)`);
                } else {
                    console.log(`   ${index + 1}. ❌ ${item.name} - ОШИБКА: ${item.error}`);
                }
            });
        }
        
        // Закрываем подключение
        await mongoose.connection.close();
        console.log('\n📡 Подключение к MongoDB закрыто');
        console.log('✨ Готово! Товары загружены в базу данных.');
        
    } catch (error) {
        console.error('❌ Ошибка синхронизации:', error);
        process.exit(1);
    }
}

// Запускаем синхронизацию
syncProducts(); 