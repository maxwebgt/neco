import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, Heart, Share2, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  category: string;
  composition?: string;
  images: Array<{
    filename: string;
    path: string;
    alt: string;
  }>;
  mainImage: string;
  tags: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem, getItemQuantity } = useCart();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Загружаем товар
  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Товар не найден');
          } else {
            setError('Ошибка загрузки товара');
          }
          return;
        }
        
        const data = await response.json();
        setProduct(data);
        
        // Обновляем мета-теги
        if (data.metaTitle) {
          document.title = data.metaTitle;
        }
      } catch (err) {
        console.error('Ошибка загрузки товара:', err);
        setError('Ошибка загрузки товара');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // Функция добавления в корзину
  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addItem({
        _id: product._id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        mainImage: product.mainImage,
      });
    }

    toast({
      title: "Товар добавлен в корзину",
      description: `${product.name} (${quantity} шт.) добавлен в корзину`,
    });

    setQuantity(1); // Сбрасываем количество
  };

  // Функции изменения количества
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  // Состояния загрузки и ошибки
  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Назад
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-8">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Назад
          </Button>
        </div>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">{error || 'Товар не найден'}</h1>
          <p className="text-muted-foreground mb-6">
            Запрашиваемый товар не существует или был удален.
          </p>
          <Button asChild>
            <Link to="/catalog">Перейти в каталог</Link>
          </Button>
        </div>
      </div>
    );
  }

  const currentItemQuantity = getItemQuantity(product._id);
  const availableImages = product.images?.length > 0 ? product.images : [{ 
    filename: 'placeholder.jpg', 
    path: product.mainImage || '/images/placeholder.jpg', 
    alt: product.name 
  }];

  return (
    <div className="container py-8">
      {/* Хлебные крошки */}
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Назад
        </Button>
        <span className="text-muted-foreground">·</span>
        <Link to="/catalog" className="text-muted-foreground hover:text-foreground">
          Каталог
        </Link>
        <span className="text-muted-foreground">·</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Галерея изображений */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={availableImages[selectedImageIndex]?.path}
              alt={availableImages[selectedImageIndex]?.alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/placeholder.jpg';
              }}
            />
          </div>
          
          {/* Миниатюры */}
          {availableImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {availableImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square overflow-hidden rounded-lg bg-gray-100 border-2 ${
                    selectedImageIndex === index ? 'border-eco-green' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image.path}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder.jpg';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Информация о товаре */}
        <div className="space-y-6">
          {/* Заголовок и бейджи */}
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              {product.isNew && (
                <Badge className="bg-eco-terracotta">Новинка</Badge>
              )}
              {product.isBestseller && (
                <Badge className="bg-eco-green">Хит продаж</Badge>
              )}
              {product.tags?.map((tag, index) => (
                <Badge key={index} variant="outline">{tag}</Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
          </div>

          {/* Цена */}
          <div className="text-3xl font-serif text-eco-terracotta">
            {product.price} ₽
          </div>

          {/* Описание */}
          {product.description && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Описание</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Состав */}
          {product.composition && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Состав</h3>
                <p className="text-muted-foreground">
                  {product.composition}
                </p>
              </CardContent>
            </Card>
          )}

          <Separator />

          {/* Блок добавления в корзину */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">
                В корзине: {currentItemQuantity} шт.
              </span>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-eco-green hover:bg-eco-green/90"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Добавить в корзину
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Информация о доставке */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Доставка и оплата</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Бесплатная доставка от 2000 ₽</p>
                <p>• Доставка по Москве 1-2 дня</p>
                <p>• Оплата при получении или онлайн</p>
                <p>• Возврат в течение 14 дней</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductPage; 