import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Маппинг товаров на категории
const categoryMapping = {
    'мыло': 'hygiene',
    'зубная паста': 'hygiene', 
    'бальзам для губ': 'hygiene',
    'зубная щетка бамбук люкс': 'hygiene',
    
    'менструальная чаша': 'womens-care',
    'хлопковые диски': 'womens-care',
    
    'губка люфа плоская': 'cleaning',
    'губка джут': 'cleaning',
    'силиконовые губки': 'cleaning',
    'целлюлозные губки': 'cleaning',
    'ершики кокос': 'cleaning',
    'мочалка джут': 'cleaning',
    'пемза': 'cleaning',
    'мыльница': 'cleaning',
    
    'авоськи': 'bags',
    'бабины джут': 'bags',
    
    'бахилы': 'disposable',
    'ватные палочки': 'disposable',
    
    'кругляш': 'beauty-sport',
    'люфа цилиндр': 'beauty-sport'
};

// Функция для извлечения цены из текста
function extractPrice(text) {
    // Ищем цену в различных форматах
    const pricePatterns = [
        /цена[:\s]*(\d+)\s*р/i,
        /цена[:\s]*(\d+)\s*руб/i,
        /(\d+)\s*р[^\w]/i,
        /(\d+)\s*руб/i,
        /стоит[:\s]*(\d+)/i,
        /(\d+)\s*рублей/i
    ];
    
    for (const pattern of pricePatterns) {
        const match = text.match(pattern);
        if (match) {
            return parseInt(match[1]);
        }
    }
    
    return null;
}

// Функция для извлечения состава
function extractComposition(text) {
    const compositionPatterns = [
        /состав[:\s]*([^\.]+)/i,
        /в составе[:\s]*([^\.]+)/i,
        /содержит[:\s]*([^\.]+)/i
    ];
    
    for (const pattern of compositionPatterns) {
        const match = text.match(pattern);
        if (match) {
            return match[1].trim();
        }
    }
    
    return null;
}

// Функция для создания описания
function createDescription(text) {
    // Убираем информацию о цене и составе из описания
    let description = text
        .replace(/цена[:\s]*\d+\s*р[^\w]*/gi, '')
        .replace(/цена[:\s]*\d+\s*руб[^\w]*/gi, '')
        .replace(/состав[:\s]*[^\.]+\./gi, '')
        .replace(/в составе[:\s]*[^\.]+\./gi, '')
        .trim();
    
    // Берем первые 500 символов как описание
    if (description.length > 500) {
        description = description.substring(0, 500) + '...';
    }
    
    return description;
}

// Функция для копирования изображений
async function copyProductImages(productName, productPath) {
    const publicImagesPath = path.join(__dirname, '../../public/images/products');
    const productImagesPath = path.join(publicImagesPath, productName);
    
    // Создаем папку для изображений товара
    if (!fs.existsSync(publicImagesPath)) {
        fs.mkdirSync(publicImagesPath, { recursive: true });
    }
    
    if (!fs.existsSync(productImagesPath)) {
        fs.mkdirSync(productImagesPath, { recursive: true });
    }
    
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const files = fs.readdirSync(productPath);
    const imageFiles = files.filter(file => 
        imageExtensions.includes(path.extname(file).toLowerCase())
    );
    
    const copiedImages = [];
    
    for (const imageFile of imageFiles) {
        const sourcePath = path.join(productPath, imageFile);
        const destPath = path.join(productImagesPath, imageFile);
        
        try {
            fs.copyFileSync(sourcePath, destPath);
            copiedImages.push({
                filename: imageFile,
                path: `/images/products/${productName}/${imageFile}`,
                alt: `${productName} - изображение ${copiedImages.length + 1}`
            });
        } catch (error) {
            console.warn(`Не удалось скопировать изображение ${imageFile}:`, error.message);
        }
    }
    
    return copiedImages;
}

// Основная функция парсинга
export async function parseAndSaveProducts() {
    const ecoveryPath = path.join(process.cwd(), 'эковери');
    const txtDataPath = path.join(process.cwd(), 'товары_данные');
    
    if (!fs.existsSync(ecoveryPath)) {
        throw new Error(`Папка эковери не найдена: ${ecoveryPath}`);
    }
    
    if (!fs.existsSync(txtDataPath)) {
        throw new Error(`Папка товары_данные не найдена: ${txtDataPath}`);
    }
    
    const productFolders = fs.readdirSync(ecoveryPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    
    console.log(`Найдено ${productFolders.length} товаров для обработки`);
    
    const results = {
        success: 0,
        errors: 0,
        processed: []
    };
    
    // Очищаем существующие товары
    await Product.deleteMany({});
    console.log('Существующие товары удалены из базы данных');
    
    for (const productName of productFolders) {
        try {
            console.log(`Обрабатываем товар: ${productName}`);
            
            // Читаем данные из txt файла
            const txtFilePath = path.join(txtDataPath, `${productName}.txt`);
            if (!fs.existsSync(txtFilePath)) {
                console.warn(`Файл данных не найден: ${txtFilePath}`);
                continue;
            }
            
            const txtContent = fs.readFileSync(txtFilePath, 'utf8');
            
            // Извлекаем информацию
            const price = extractPrice(txtContent);
            const composition = extractComposition(txtContent);
            const description = createDescription(txtContent);
            const category = categoryMapping[productName.toLowerCase()] || 'cleaning';
            
            if (!price) {
                console.warn(`Не удалось определить цену для товара: ${productName}`);
                results.errors++;
                continue;
            }
            
            // Копируем изображения
            const productPath = path.join(ecoveryPath, productName);
            const images = await copyProductImages(productName, productPath);
            
            if (images.length === 0) {
                console.warn(`Не найдено изображений для товара: ${productName}`);
            }
            
            // Создаем товар в базе данных
            const product = new Product({
                name: productName,
                slug: productName.toLowerCase()
                    .replace(/\s+/g, '-')           // пробелы в дефисы
                    .replace(/[^a-zа-я0-9\-]/g, '') // только буквы, цифры и дефисы
                    .replace(/-+/g, '-')            // убираем повторяющиеся дефисы
                    .replace(/^-|-$/g, ''),         // убираем дефисы в начале и конце
                price: price,
                description: description || `Натуральный эко-товар: ${productName}`,
                category: category,
                composition: composition,
                images: images,
                mainImage: images.length > 0 ? images[0].path : '/images/placeholder.jpg',
                tags: [category === 'hygiene' ? 'Гигиена' : 
                       category === 'cleaning' ? 'Уборка' :
                       category === 'bags' ? 'Сумки' : 'Эко-товары'],
                isNew: Math.random() > 0.7, // 30% товаров помечаем как новые
                isBestseller: Math.random() > 0.8, // 20% как хиты продаж
                sourceFile: txtFilePath,
                metaTitle: `${productName} - натуральный эко-товар | ECO.VERY`,
                metaDescription: description ? description.substring(0, 160) : `Купить ${productName} в интернет-магазине ECO.VERY. Натуральные эко-товары с доставкой.`
            });
            
            await product.save();
            
            results.success++;
            results.processed.push({
                name: productName,
                price: price,
                category: category,
                images: images.length,
                status: 'success'
            });
            
            console.log(`✅ Товар ${productName} успешно добавлен (цена: ${price}р, изображений: ${images.length})`);
            
        } catch (error) {
            console.error(`❌ Ошибка при обработке товара ${productName}:`, error);
            results.errors++;
            results.processed.push({
                name: productName,
                error: error.message,
                status: 'error'
            });
        }
    }
    
    console.log(`\n=== Результаты импорта ===`);
    console.log(`✅ Успешно: ${results.success}`);
    console.log(`❌ Ошибок: ${results.errors}`);
    console.log(`📦 Всего товаров в базе: ${await Product.countDocuments()}`);
    
    return results;
}

// Функция для получения статистики
export async function getProductStats() {
    const total = await Product.countDocuments();
    const byCategory = await Product.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    const newProducts = await Product.countDocuments({ isNew: true });
    const bestsellers = await Product.countDocuments({ isBestseller: true });
    
    return {
        total,
        byCategory,
        newProducts,
        bestsellers
    };
} 