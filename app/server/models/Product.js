import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    // Основная информация
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    
    // Категоризация
    category: {
        type: String,
        required: true,
        enum: [
            'hygiene',      // Гигиена и уход
            'womens-care',  // Женская гигиена  
            'cleaning',     // Уборка и мытье
            'bags',         // Сумки и переноска
            'disposable',   // Одноразовые эко-товары
            'beauty-sport'  // Спорт и красота
        ]
    },
    tags: [{
        type: String,
        trim: true
    }],
    
    // Изображения
    images: [{
        filename: String,
        path: String,
        alt: String
    }],
    mainImage: {
        type: String, // путь к главному изображению
        required: true
    },
    
    // Характеристики
    composition: {
        type: String, // состав товара
        maxlength: 1000
    },
    features: [{
        name: String,
        value: String
    }],
    
    // Статусы и метки
    isNew: {
        type: Boolean,
        default: false
    },
    isBestseller: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    
    // SEO
    metaTitle: String,
    metaDescription: String,
    
    // Служебные поля
    sourceFile: String, // исходный файл из папки эковери
    
}, {
    timestamps: true, // автоматически добавляет createdAt и updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Виртуальные поля
productSchema.virtual('categoryName').get(function() {
    const categoryNames = {
        'hygiene': 'Гигиена и уход',
        'womens-care': 'Женская гигиена',
        'cleaning': 'Уборка и мытье', 
        'bags': 'Сумки и переноска',
        'disposable': 'Одноразовые эко-товары',
        'beauty-sport': 'Спорт и красота'
    };
    return categoryNames[this.category] || this.category;
});

// Индексы для поиска
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ slug: 1 });
productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });

// Middleware для создания slug
productSchema.pre('save', function(next) {
    if (this.isModified('name') && !this.slug) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // удаляем спец. символы
            .replace(/[\s_-]+/g, '-') // заменяем пробелы и подчеркивания на дефисы
            .replace(/^-+|-+$/g, ''); // убираем дефисы в начале и конце
    }
    next();
});

// Статические методы
productSchema.statics.findByCategory = function(category) {
    return this.find({ category, isActive: true }).sort({ createdAt: -1 });
};

productSchema.statics.findFeatured = function() {
    return this.find({ 
        isActive: true,
        $or: [{ isNew: true }, { isBestseller: true }]
    }).sort({ createdAt: -1 }).limit(8);
};

productSchema.statics.search = function(query) {
    return this.find({
        $text: { $search: query },
        isActive: true
    }).sort({ score: { $meta: 'textScore' } });
};

const Product = mongoose.model('Product', productSchema);

export default Product; 