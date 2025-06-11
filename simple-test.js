// Простой тест синхронизации товаров

async function testSync() {
    try {
        console.log('🧪 Тестируем синхронизацию товаров...\n');
        
        // 1. Проверяем health
        console.log('1. Проверяем health endpoint...');
        const healthResponse = await fetch('http://localhost:3001/api/health');
        if (!healthResponse.ok) {
            throw new Error('Server not responding');
        }
        const healthData = await healthResponse.json();
        console.log('✅ Health OK:', healthData.message);
        
        // 2. Запускаем синхронизацию
        console.log('\n2. Запускаем синхронизацию товаров...');
        const syncResponse = await fetch('http://localhost:3001/api/sync', {
            method: 'POST'
        });
        
        if (!syncResponse.ok) {
            const errorData = await syncResponse.json();
            throw new Error(errorData.details || errorData.error);
        }
        
        const syncData = await syncResponse.json();
        console.log('✅ Синхронизация завершена:');
        console.log(`   - Успешно обработано: ${syncData.results.success}`);
        console.log(`   - Ошибок: ${syncData.results.errors}`);
        
        if (syncData.results.processed.length > 0) {
            console.log('\n📦 Примеры обработанных товаров:');
            syncData.results.processed.slice(0, 5).forEach((item, index) => {
                if (item.status === 'success') {
                    console.log(`   ${index + 1}. ${item.name} - ${item.price}₽ (${item.category}, ${item.images} фото)`);
                } else {
                    console.log(`   ${index + 1}. ${item.name} - ОШИБКА: ${item.error}`);
                }
            });
        }
        
        console.log('\n🎉 Тест синхронизации прошел успешно!');
        
    } catch (error) {
        console.error('❌ Ошибка тестирования:', error.message);
        
        if (error.message.includes('fetch')) {
            console.log('\n💡 Убедитесь что сервер запущен: node simple-server.js');
        }
    }
}

// Запускаем тест
testSync(); 