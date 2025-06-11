// Тестовый скрипт для проверки API

const API_BASE = 'http://localhost:3001/api';

async function testAPI() {
    try {
        console.log('🧪 Тестируем API сервер...\n');
        
        // 1. Проверяем health endpoint
        console.log('1. Проверяем health endpoint...');
        const healthResponse = await fetch(`${API_BASE}/health`);
        const healthData = await healthResponse.json();
        console.log('✅ Health:', healthData.message);
        
        // 2. Запускаем синхронизацию товаров
        console.log('\n2. Запускаем синхронизацию товаров...');
        const syncResponse = await fetch(`${API_BASE}/products/sync`, {
            method: 'POST'
        });
        const syncData = await syncResponse.json();
        console.log('✅ Синхронизация завершена:');
        console.log(`   - Успешно: ${syncData.results.success}`);
        console.log(`   - Ошибок: ${syncData.results.errors}`);
        
        // 3. Получаем список товаров
        console.log('\n3. Получаем список товаров...');
        const productsResponse = await fetch(`${API_BASE}/products?limit=5`);
        const productsData = await productsResponse.json();
        console.log(`✅ Получено товаров: ${productsData.products.length}`);
        console.log('   Примеры товаров:');
        productsData.products.slice(0, 3).forEach((product, index) => {
            console.log(`   ${index + 1}. ${product.name} - ${product.price}₽ (${product.categoryName})`);
        });
        
        // 4. Получаем рекомендуемые товары
        console.log('\n4. Получаем рекомендуемые товары...');
        const featuredResponse = await fetch(`${API_BASE}/products/featured?limit=3`);
        const featuredData = await featuredResponse.json();
        console.log(`✅ Рекомендуемых товаров: ${featuredData.products.length}`);
        
        // 5. Получаем категории
        console.log('\n5. Получаем категории...');
        const categoriesResponse = await fetch(`${API_BASE}/products/categories`);
        const categoriesData = await categoriesResponse.json();
        console.log('✅ Категории:');
        categoriesData.categories.forEach(cat => {
            console.log(`   - ${cat.name}: ${cat.count} товаров`);
        });
        
        // 6. Получаем статистику
        console.log('\n6. Получаем статистику...');
        const statsResponse = await fetch(`${API_BASE}/products/admin/stats`);
        const statsData = await statsResponse.json();
        console.log('✅ Статистика:');
        console.log(`   - Всего товаров: ${statsData.stats.total}`);
        console.log(`   - Новинок: ${statsData.stats.newProducts}`);
        console.log(`   - Хитов продаж: ${statsData.stats.bestsellers}`);
        
        console.log('\n🎉 Все тесты прошли успешно!');
        
    } catch (error) {
        console.error('❌ Ошибка тестирования:', error.message);
        
        if (error.message.includes('fetch')) {
            console.log('\n💡 Убедитесь что сервер запущен: npm run server');
        }
    }
}

// Запускаем тесты
testAPI(); 