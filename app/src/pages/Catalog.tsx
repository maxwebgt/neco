
import { useState } from "react";
import { Helmet } from "react-helmet";
import { ShoppingCart, ArrowRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
  tags: string[];
}

const allProducts: Product[] = [
  {
    id: 1,
    name: "Бамбуковая зубная щетка",
    price: 249,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=500",
    category: "hygiene",
    isNew: true,
    tags: ["Гигиена", "Бамбук"]
  },
  {
    id: 2,
    name: "Эко-мешочки для овощей",
    price: 299,
    image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&q=80&w=500",
    category: "bags",
    isBestseller: true,
    tags: ["Мешочки", "Хлопок"]
  },
  {
    id: 3,
    name: "Твердый шампунь",
    price: 399,
    image: "https://images.unsplash.com/photo-1444749200544-27ca0231edb9?auto=format&fit=crop&q=80&w=500",
    category: "hygiene",
    tags: ["Гигиена", "Без пластика"]
  },
  {
    id: 4,
    name: "Деревянная расческа",
    price: 349,
    image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&q=80&w=500",
    category: "hygiene",
    tags: ["Гигиена", "Дерево"]
  },
  {
    id: 5,
    name: "Многоразовая бутылка",
    price: 799,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=500",
    category: "kitchen",
    isBestseller: true,
    tags: ["Кухня", "Сталь"]
  },
  {
    id: 6,
    name: "Набор для уборки",
    price: 1299,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=500",
    category: "cleaning",
    isNew: true,
    tags: ["Уборка", "Набор"]
  },
  {
    id: 7,
    name: "Эко-губка для посуды",
    price: 199,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=500",
    category: "cleaning",
    tags: ["Уборка", "Кухня"]
  },
  {
    id: 8,
    name: "Восковые салфетки",
    price: 499,
    image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&q=80&w=500",
    category: "kitchen",
    tags: ["Кухня", "Воск"]
  },
  {
    id: 9,
    name: "Деревянные столовые приборы",
    price: 599,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=500",
    category: "kitchen",
    tags: ["Кухня", "Дерево"]
  },
  {
    id: 10,
    name: "Твердое мыло",
    price: 229,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=500",
    category: "hygiene",
    tags: ["Гигиена", "Без упаковки"]
  },
  {
    id: 11,
    name: "Эко-сумка",
    price: 399,
    image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&q=80&w=500",
    category: "bags",
    tags: ["Сумки", "Хлопок"]
  },
  {
    id: 12,
    name: "Многоразовые ватные диски",
    price: 349,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=500",
    category: "hygiene",
    tags: ["Гигиена", "Многоразовые"]
  }
];

const categories = [
  { id: "all", name: "Все товары" },
  { id: "hygiene", name: "Гигиена" },
  { id: "bags", name: "Эко-мешочки и сумки" },
  { id: "kitchen", name: "Кухня" },
  { id: "cleaning", name: "Уборка" }
];

const tags = [
  "Гигиена", "Бамбук", "Мешочки", "Хлопок", "Без пластика", 
  "Дерево", "Кухня", "Сталь", "Уборка", "Набор", "Воск",
  "Без упаковки", "Сумки", "Многоразовые"
];

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Apply filters
  const filteredProducts = allProducts.filter(product => {
    // Category filter
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false;
    }
    
    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    // Tags filter
    if (selectedTags.length > 0 && !selectedTags.some(tag => product.tags.includes(tag))) {
      return false;
    }

    // Search query
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
            {/* Filters - Mobile toggle */}
            <Button 
              variant="outline" 
              className="lg:hidden mb-4 flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Скрыть фильтры" : "Показать фильтры"}
            </Button>

            {/* Filters sidebar */}
            <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
                <h2 className="text-xl font-serif mb-6 text-eco-brown">Фильтры</h2>
                
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Категории</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div 
                        key={category.id}
                        className={`cursor-pointer py-1 px-2 rounded transition-colors ${
                          selectedCategory === category.id 
                            ? "bg-eco-green/10 text-eco-green font-medium" 
                            : "hover:bg-eco-green/5"
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.name}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Цена</h3>
                  <Slider
                    defaultValue={[0, 2000]}
                    max={2000}
                    step={100}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <div>{priceRange[0]} ₽</div>
                    <div>{priceRange[1]} ₽</div>
                  </div>
                </div>
                
                {/* Tags */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Теги</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
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
              </div>
            </div>
            
            {/* Product grid */}
            <div className="lg:w-3/4">
              {/* Search and results count */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
                <div className="relative w-full sm:w-auto">
                  <input 
                    type="text" 
                    placeholder="Поиск товаров..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="py-2 px-4 pr-10 border border-gray-300 rounded-lg w-full"
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

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id}
                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={`эко-товар ${product.name}`} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                        <p className="text-xl font-serif text-eco-terracotta mb-4">{product.price} ₽</p>
                        <div className="flex justify-between">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-eco-green text-eco-green hover:bg-eco-green hover:text-white"
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
                            <Link to={`/product/${product.id}`}>
                              Подробнее
                              <ArrowRight className="h-4 w-4 ml-1" />
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
                    onClick={() => {
                      setSelectedCategory("all");
                      setPriceRange([0, 2000]);
                      setSelectedTags([]);
                      setSearchQuery("");
                    }}
                    className="bg-eco-terracotta hover:bg-eco-terracotta/90"
                  >
                    Сбросить фильтры
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
