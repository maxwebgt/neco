import express from 'express';
import Product from '../models/Product.js';
import { parseAndSaveProducts, getProductStats } from '../utils/productParser.js';

const router = express.Router();

// GET /api/products - получить все товары
router.get('/', async (req, res) => {
    try {
        const { 
            category, 
            limit = 12, 
            page = 1, 
            sort = 'createdAt',
            order = 'desc',
            search 
        } = req.query;
        
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const sortOrder = order === 'desc' ? -1 : 1;
        
        // Базовый фильтр
        let filter = { isActive: true };
        
        // Фильтр по категории
        if (category && category !== 'all') {
            filter.category = category;
        }
        
        // Поиск
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { tags: { $regex: search, $options: 'i' } }
            ];
        }
        
        // Получаем товары
        const products = await Product.find(filter)
            .sort({ [sort]: sortOrder })
            .limit(parseInt(limit))
            .skip(skip)
            .select('-__v');
        
        // Общее количество для пагинации
        const total = await Product.countDocuments(filter);
        const totalPages = Math.ceil(total / parseInt(limit));
        
        res.json({
            products,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalProducts: total,
                hasNextPage: parseInt(page) < totalPages,
                hasPrevPage: parseInt(page) > 1
            }
        });
        
    } catch (error) {
        console.error('Ошибка при получении товаров:', error);
        res.status(500).json({ error: 'Ошибка сервера при получении товаров' });
    }
});

// POST /api/products/sync - синхронизация товаров из папки эковери (ДОЛЖЕН БЫТЬ ПЕРЕД ДРУГИМИ МАРШРУТАМИ)
router.post('/sync', async (req, res) => {
    try {
        console.log('Начинаем синхронизацию товаров...');
        
        const results = await parseAndSaveProducts();
        
        res.json({
            message: 'Синхронизация завершена',
            results
        });
        
    } catch (error) {
        console.error('Ошибка при синхронизации товаров:', error);
        res.status(500).json({ 
            error: 'Ошибка при синхронизации товаров',
            details: error.message
        });
    }
});

// GET /api/products/admin/stats - статистика по товарам
router.get('/admin/stats', async (req, res) => {
    try {
        const stats = await getProductStats();
        res.json({ stats });
        
    } catch (error) {
        console.error('Ошибка при получении статистики:', error);
        res.status(500).json({ error: 'Ошибка сервера при получении статистики' });
    }
});

// GET /api/products/featured - получить рекомендуемые товары (новинки и хиты)
router.get('/featured', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 8;
        
        const products = await Product.findFeatured().limit(limit);
        
        res.json({ products });
        
    } catch (error) {
        console.error('Ошибка при получении рекомендуемых товаров:', error);
        res.status(500).json({ error: 'Ошибка сервера при получении рекомендуемых товаров' });
    }
});

// GET /api/products/categories - получить товары по категориям
router.get('/categories', async (req, res) => {
    try {
        const categories = await Product.aggregate([
            { $match: { isActive: true } },
            { 
                $group: { 
                    _id: '$category',
                    count: { $sum: 1 },
                    // Получаем первый товар как пример для категории
                    example: { $first: '$$ROOT' }
                }
            },
            { $sort: { count: -1 } }
        ]);
        
        const categoryNames = {
            'hygiene': 'Гигиена и уход',
            'womens-care': 'Женская гигиена',
            'cleaning': 'Уборка и мытье', 
            'bags': 'Сумки и переноска',
            'disposable': 'Одноразовые эко-товары',
            'beauty-sport': 'Спорт и красота'
        };
        
        const result = categories.map(cat => ({
            id: cat._id,
            name: categoryNames[cat._id] || cat._id,
            count: cat.count,
            example: {
                name: cat.example.name,
                price: cat.example.price,
                mainImage: cat.example.mainImage
            }
        }));
        
        res.json({ categories: result });
        
    } catch (error) {
        console.error('Ошибка при получении категорий:', error);
        res.status(500).json({ error: 'Ошибка сервера при получении категорий' });
    }
});

// GET /api/products/:slug - получить товар по slug
router.get('/:slug', async (req, res) => {
    try {
        const product = await Product.findOne({ 
            slug: req.params.slug, 
            isActive: true 
        }).select('-__v');
        
        if (!product) {
            return res.status(404).json({ error: 'Товар не найден' });
        }
        
        // Получаем похожие товары из той же категории
        const similarProducts = await Product.find({
            category: product.category,
            _id: { $ne: product._id },
            isActive: true
        }).limit(4).select('name price mainImage slug');
        
        res.json({ 
            product,
            similarProducts
        });
        
    } catch (error) {
        console.error('Ошибка при получении товара:', error);
        res.status(500).json({ error: 'Ошибка сервера при получении товара' });
    }
});



// POST /api/products/:id/toggle-status - переключить статус товара (активен/неактивен)
router.post('/:id/toggle-status', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ error: 'Товар не найден' });
        }
        
        product.isActive = !product.isActive;
        await product.save();
        
        res.json({ 
            message: `Товар ${product.isActive ? 'активирован' : 'деактивирован'}`,
            product
        });
        
    } catch (error) {
        console.error('Ошибка при изменении статуса товара:', error);
        res.status(500).json({ error: 'Ошибка сервера при изменении статуса товара' });
    }
});

export default router; 