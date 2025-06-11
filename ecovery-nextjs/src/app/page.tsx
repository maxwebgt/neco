import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Главная',
  description: 'ECO.VERY — Эко-магазин натуральных товаров для дома, личной гигиены и кухни. Экологичные товары высокого качества.',
  openGraph: {
    title: 'ECO.VERY — Эко-магазин натуральных товаров',
    description: 'Экологичные товары для дома, личной гигиены и кухни',
    url: 'https://ecovery.com',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Временный заголовок */}
      <header className="bg-eco-green text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">ECO.VERY</h1>
          <nav className="mt-2">
            <Link href="/catalog" className="mr-4 hover:underline">
              Каталог
            </Link>
            <Link href="/cart" className="mr-4 hover:underline">
              Корзина
            </Link>
            <Link href="/test-api" className="mr-4 hover:underline">
              Тест API
            </Link>
          </nav>
        </div>
      </header>

      {/* Главный контент */}
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold eco-text-gradient mb-4">
            Экологичные товары для заботы о планете
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Натуральная косметика, экологичные товары для дома и кухни. 
            Все что нужно для здорового и осознанного образа жизни.
          </p>
          <div className="mt-8">
            <Link 
              href="/catalog"
              className="bg-eco-green text-white px-8 py-3 rounded-lg hover:bg-eco-green/90 transition-colors"
            >
              Перейти в каталог
            </Link>
          </div>
        </section>

        {/* Преимущества */}
        <section className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="text-xl font-semibold mb-2">🌿 Натуральные ингредиенты</h3>
            <p className="text-muted-foreground">
              Только проверенные натуральные компоненты
            </p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="text-xl font-semibold mb-2">♻️ Экологичная упаковка</h3>
            <p className="text-muted-foreground">
              Минимум пластика, максимум переработки
            </p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="text-xl font-semibold mb-2">🚚 Быстрая доставка</h3>
            <p className="text-muted-foreground">
              Доставка по Москве и области за 1-2 дня
            </p>
          </div>
        </section>

        {/* Призыв к действию */}
        <section className="bg-eco-milky rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Начните заботиться о планете уже сегодня
          </h2>
          <p className="text-muted-foreground mb-6">
            Присоединяйтесь к тысячам людей, которые выбрали экологичный образ жизни
          </p>
          <Link 
            href="/catalog"
            className="bg-eco-green text-white px-8 py-3 rounded-lg hover:bg-eco-green/90 transition-colors"
          >
            Смотреть товары
          </Link>
        </section>
      </main>
    </div>
  );
} 