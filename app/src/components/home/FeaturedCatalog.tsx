
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
}

type Category = "all" | "hygiene" | "bags" | "kitchen" | "cleaning" | "womens-care" | "beauty-sport" | "disposable";

const FeaturedCatalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/featured');
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

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

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

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-eco-green mb-4 md:mb-0">
            Наш каталог
          </h2>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={activeCategory === "all" ? "default" : "outline"}
              onClick={() => setActiveCategory("all")}
              className={activeCategory === "all" ? "bg-eco-terracotta hover:bg-eco-terracotta/90" : ""}
            >
              Все товары
            </Button>
            <Button 
              variant={activeCategory === "hygiene" ? "default" : "outline"}
              onClick={() => setActiveCategory("hygiene")}
              className={activeCategory === "hygiene" ? "bg-eco-terracotta hover:bg-eco-terracotta/90" : ""}
            >
              Гигиена
            </Button>
            <Button 
              variant={activeCategory === "bags" ? "default" : "outline"}
              onClick={() => setActiveCategory("bags")}
              className={activeCategory === "bags" ? "bg-eco-terracotta hover:bg-eco-terracotta/90" : ""}
            >
              Сумки
            </Button>
            <Button 
              variant={activeCategory === "cleaning" ? "default" : "outline"}
              onClick={() => setActiveCategory("cleaning")}
              className={activeCategory === "cleaning" ? "bg-eco-terracotta hover:bg-eco-terracotta/90" : ""}
            >
              Уборка
            </Button>
            <Button 
              variant={activeCategory === "womens-care" ? "default" : "outline"}
              onClick={() => setActiveCategory("womens-care")}
              className={activeCategory === "womens-care" ? "bg-eco-terracotta hover:bg-eco-terracotta/90" : ""}
            >
              Женская гигиена
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-eco-brown">Загружаем товары...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                      onClick={() => handleAddToCart(product)}
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
                      <Link to={`/product/${product.slug}`}>
                        Подробнее
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Button 
            asChild
            className="bg-eco-terracotta hover:bg-eco-terracotta/90"
            size="lg"
          >
            <Link to="/catalog">
              Смотреть все товары
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCatalog;
