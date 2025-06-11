import { Link } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

const CartPage = () => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const { toast } = useToast();

  // Обработчики
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
    toast({
      title: "Товар удален",
      description: "Товар удален из корзины",
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Корзина очищена",
      description: "Все товары удалены из корзины",
    });
  };

  // Форматирование цены
  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU');
  };

  if (state.items.length === 0) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Корзина</h1>
        
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-4">Ваша корзина пуста</h2>
          <p className="text-muted-foreground mb-6">
            Добавьте товары из каталога, чтобы они появились здесь
          </p>
          <Button asChild className="bg-eco-green hover:bg-eco-green/90">
            <Link to="/catalog">
              Перейти в каталог
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Корзина</h1>
        <Button 
          variant="outline" 
          onClick={handleClearCart}
          className="text-red-600 hover:text-red-700"
        >
          Очистить корзину
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Список товаров */}
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item) => (
            <Card key={item._id}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Изображение товара */}
                  <div className="w-20 h-20 flex-shrink-0">
                    <img
                      src={item.mainImage}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg bg-gray-100"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    {/* Название и ссылка */}
                    <div className="flex items-start justify-between">
                      <Link 
                        to={`/product/${item.slug}`}
                        className="font-semibold hover:text-eco-green transition-colors"
                      >
                        {item.name}
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Цена за единицу */}
                    <p className="text-muted-foreground">
                      {formatPrice(item.price)} ₽ за штуку
                    </p>

                    <div className="flex items-center justify-between">
                      {/* Управление количеством */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                          disabled={item.quantity >= 10}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Общая стоимость товара */}
                      <div className="text-right">
                        <div className="font-semibold text-eco-terracotta">
                          {formatPrice(item.price * item.quantity)} ₽
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Итоги заказа */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Итого</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Товары ({state.totalItems} шт.)</span>
                <span>{formatPrice(state.totalPrice)} ₽</span>
              </div>
              
              <div className="flex justify-between">
                <span>Доставка</span>
                <span>
                  {state.totalPrice >= 2000 ? (
                    <span className="text-eco-green">Бесплатно</span>
                  ) : (
                    <span>300 ₽</span>
                  )}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-semibold">
                <span>К оплате</span>
                <span className="text-eco-terracotta">
                  {formatPrice(state.totalPrice + (state.totalPrice >= 2000 ? 0 : 300))} ₽
                </span>
              </div>

              {state.totalPrice < 2000 && (
                <div className="text-sm text-muted-foreground">
                  Добавьте товаров на {formatPrice(2000 - state.totalPrice)} ₽ 
                  для бесплатной доставки
                </div>
              )}
            </CardContent>
          </Card>

          {/* Кнопка оформления заказа */}
          <Button 
            asChild 
            className="w-full bg-eco-green hover:bg-eco-green/90"
            size="lg"
          >
            <Link to="/checkout">
              Оформить заказ
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>

          {/* Продолжить покупки */}
          <Button asChild variant="outline" className="w-full">
            <Link to="/catalog">
              Продолжить покупки
            </Link>
          </Button>

          {/* Информация о доставке */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Условия доставки</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Бесплатная доставка от 2000 ₽</p>
                <p>• Доставка по Москве 1-2 дня</p>
                <p>• Доставка курьером 300 ₽</p>
                <p>• Самовывоз из пункта выдачи</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 