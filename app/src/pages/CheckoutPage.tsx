import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

const CheckoutPage = () => {
  const { state, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Состояние формы
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    comment: '',
    deliveryType: 'courier',
    paymentType: 'card'
  });

  // Форматирование цены
  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU');
  };

  // Расчет итоговой суммы
  const deliveryPrice = state.totalPrice >= 2000 || formData.deliveryType === 'pickup' ? 0 : 300;
  const totalPrice = state.totalPrice + deliveryPrice;

  // Обработка изменений формы
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Валидация формы
  const isFormValid = () => {
    return formData.name.trim() && 
           formData.email.trim() && 
           formData.phone.trim() && 
           (formData.deliveryType === 'pickup' || formData.address.trim());
  };

  // Отправка заказа
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    // Здесь будет отправка заказа на сервер
    console.log('Данные заказа:', {
      items: state.items,
      customer: formData,
      total: totalPrice
    });

    // Имитация отправки
    toast({
      title: "Заказ оформлен!",
      description: "Мы свяжемся с вами в ближайшее время для подтверждения заказа",
    });

    // Очищаем корзину и переходим на главную
    clearCart();
    navigate('/');
  };

  // Если корзина пуста, перенаправляем в каталог
  if (state.items.length === 0) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-4">Корзина пуста</h2>
          <p className="text-muted-foreground mb-6">
            Добавьте товары в корзину перед оформлением заказа
          </p>
          <Button asChild className="bg-eco-green hover:bg-eco-green/90">
            <Link to="/catalog">Перейти в каталог</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* Хлебные крошки */}
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" asChild>
          <Link to="/cart">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Назад в корзину
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Форма заказа */}
          <div className="lg:col-span-2 space-y-6">
            {/* Контактные данные */}
            <Card>
              <CardHeader>
                <CardTitle>Контактные данные</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Имя и фамилия *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Введите ваше имя"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="example@mail.ru"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Доставка */}
            <Card>
              <CardHeader>
                <CardTitle>Способ доставки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup 
                  value={formData.deliveryType} 
                  onValueChange={(value) => handleInputChange('deliveryType', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="courier" id="courier" />
                    <Label htmlFor="courier">
                      Курьерская доставка {state.totalPrice < 2000 && '(300 ₽)'}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup">Самовывоз (бесплатно)</Label>
                  </div>
                </RadioGroup>

                {formData.deliveryType === 'courier' && (
                  <div>
                    <Label htmlFor="address">Адрес доставки *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Укажите полный адрес с подъездом и квартирой"
                      required
                    />
                  </div>
                )}

                {formData.deliveryType === 'pickup' && (
                  <div className="text-sm text-muted-foreground">
                    <p>Адрес пункта выдачи:</p>
                    <p>г. Москва, ул. Эко-дружная, д. 1</p>
                    <p>Режим работы: ПН-ПТ 10:00-20:00, СБ-ВС 11:00-18:00</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Оплата */}
            <Card>
              <CardHeader>
                <CardTitle>Способ оплаты</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={formData.paymentType} 
                  onValueChange={(value) => handleInputChange('paymentType', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Оплата картой онлайн</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Оплата наличными при получении</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Комментарий */}
            <Card>
              <CardHeader>
                <CardTitle>Комментарий к заказу</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.comment}
                  onChange={(e) => handleInputChange('comment', e.target.value)}
                  placeholder="Укажите пожелания к заказу (необязательно)"
                />
              </CardContent>
            </Card>
          </div>

          {/* Итоги заказа */}
          <div className="space-y-6">
            {/* Товары в заказе */}
            <Card>
              <CardHeader>
                <CardTitle>Ваш заказ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.items.map((item) => (
                  <div key={item._id} className="flex gap-3">
                    <img
                      src={item.mainImage}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded bg-gray-100"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
                      }}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} шт. × {formatPrice(item.price)} ₽
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      {formatPrice(item.price * item.quantity)} ₽
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Итоговая сумма */}
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
                    {deliveryPrice === 0 ? (
                      <span className="text-eco-green">Бесплатно</span>
                    ) : (
                      `${formatPrice(deliveryPrice)} ₽`
                    )}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>К оплате</span>
                  <span className="text-eco-terracotta">
                    {formatPrice(totalPrice)} ₽
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Кнопка оформления */}
            <Button 
              type="submit"
              className="w-full bg-eco-green hover:bg-eco-green/90"
              size="lg"
              disabled={!isFormValid()}
            >
              Оформить заказ
            </Button>

            <div className="text-xs text-muted-foreground">
              Нажимая "Оформить заказ", вы соглашаетесь с{' '}
              <Link to="/terms" className="underline">условиями обработки персональных данных</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage; 