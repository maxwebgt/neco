import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Helmet } from "react-helmet";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  mainImage: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
  description: string;
  tags: string[];
}

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  // Загружаем товары
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Загружаем категории
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
      }
    };

    fetchCategories();
  }, []);

  // Получаем все уникальные теги
  const allTags = Array.from(new Set(products.flatMap(product => product.tags || [])));

  // Применяем фильтры
  const filteredProducts = products.filter(product => {
    // Фильтр по категории
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false;
    }
    
    // Фильтр по цене
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    // Фильтр по тегам
    if (selectedTags.length > 0 && !selectedTags.some(tag => product.tags?.includes(tag))) {
      return false;
    }

    // Поиск по названию
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      _id: product._id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      mainImage: product.mainImage,
    });

    toast({
      title: "Товар добавлен в корзину",
      description: `${product.name} добавлен в корзину`,
    });
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setPriceRange([0, 2000]);
    setSelectedTags([]);
    setSearchQuery("");
  };

  return (
    <>
      <Helmet>
        <title>Каталог | ECO.VERY — Эко-магазин натуральных товаров</title>
        <meta 
          name="description" 
          content="Купите экологичные товары для дома, личной гигиены и кухни. Бамбуковые зубные щётки, многоразовые мешочки, твердое мыло и многое другое." 
        />
      </Helmet>

      <div className="bg-eco-milky py-12">
        <div className="container">
          <h1 className="text-4xl font-serif text-eco-green mb-6">Каталог товаров</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Мобильная кнопка фильтров */}
            <Button 
              variant="outline" 
              className="lg:hidden mb-4 flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Скрыть фильтры" : "Показать фильтры"}
            </Button>

            {/* Боковая панель фильтров */}
            <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
                <h2 className="text-xl font-serif mb-6 text-eco-brown">Фильтры</h2>
                
                {/* Категории */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Категории</h3>
                  <div className="space-y-2">
                    <div 
                      className={`cursor-pointer py-1 px-2 rounded transition-colors ${
                        selectedCategory === "all" 
                          ? "bg-eco-green/10 text-eco-green font-medium" 
                          : "hover:bg-eco-green/5"
                      }`}
                      onClick={() => setSelectedCategory("all")}
                    >
                      Все товары
                    </div>
                    {categories.map(category => (
                      <div 
                        key={category}
                        className={`cursor-pointer py-1 px-2 rounded transition-colors ${
                          selectedCategory === category 
                            ? "bg-eco-green/10 text-eco-green font-medium" 
                            : "hover:bg-eco-green/5"
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Диапазон цен */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Цена</h3>
                  <Slider
                    defaultValue={[0, 2000]}
                    max={2000}
                    step={50}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <div>{priceRange[0]} ₽</div>
                    <div>{priceRange[1]} ₽</div>
                  </div>
                </div>
                
                {/* Теги */}
                {allTags.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Теги</h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map(tag => (
                        <Badge 
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className={`cursor-pointer ${
                            selectedTags.includes(tag) 
                              ? "bg-eco-terracotta hover:bg-eco-terracotta/90" 
                              : "hover:bg-eco-terracotta/10"
                          }`}
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Сетка товаров */}
            <div className="lg:w-3/4">
              {/* Поиск и количество результатов */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
                <div className="relative w-full sm:w-auto">
                  <input 
                    type="text" 
                    placeholder="Поиск товаров..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="py-2 px-4 pr-10 border border-gray-300 rounded-lg w-full sm:w-80"
                  />
                  <svg 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <p className="text-gray-600">
                  Найдено товаров: <span className="font-medium">{filteredProducts.length}</span>
                </p>
              </div>

              {/* Индикатор загрузки */}
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-eco-brown">Загружаем товары...</p>
                </div>
              ) : (
                <>
                  {/* Товары */}
                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.map((product) => (
                        <div 
                          key={product._id}
                          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
                        >
                          <div className="relative h-64 overflow-hidden">
                            <img 
                              src={product.mainImage || '/images/placeholder.jpg'} 
                              alt={`эко-товар ${product.name}`} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/images/placeholder.jpg';
                              }}
                            />
                            {product.isNew && (
                              <Badge className="absolute top-2 left-2 bg-eco-terracotta">Новинка</Badge>
                            )}
                            {product.isBestseller && (
                              <Badge className="absolute top-2 left-2 bg-eco-green">Хит продаж</Badge>
                            )}
                          </div>
                          <div className="p-5">
                            <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                            <p className="text-xl font-serif text-eco-terracotta mb-4">{product.price} ₽</p>
                            <div className="flex justify-between gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleAddToCart(product)}
                                className="border-eco-green text-eco-green hover:bg-eco-green hover:text-white flex-1"
                              >
                                <ShoppingCart className="h-4 w-4 mr-1" />
                                В корзину
                              </Button>
                              <Button 
                                asChild
                                variant="ghost" 
                                size="sm"
                                className="text-eco-brown hover:text-eco-terracotta"
                              >
                                <Link to={`/product/${product.slug}`}>
                                  <ArrowRight className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white p-8 rounded-lg text-center">
                      <h3 className="text-xl mb-2 font-serif text-eco-brown">Товары не найдены</h3>
                      <p className="text-gray-600 mb-4">Попробуйте изменить параметры фильтрации</p>
                      <Button 
                        onClick={resetFilters}
                        className="bg-eco-terracotta hover:bg-eco-terracotta/90"
                      >
                        Сбросить фильтры
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
