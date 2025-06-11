import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Каталог товаров',
  description: 'Экологичные товары: натуральная косметика, товары для дома и кухни, zero waste продукты.',
};

export default function CatalogPage() {
  return (
    <div className="min-h-screen">
      <header className="bg-eco-green text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">ECO.VERY</Link>
            <nav>
              <Link href="/" className="mr-4 hover:underline">Главная</Link>
              <Link href="/cart" className="hover:underline">Корзина</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Каталог товаров</h1>
        
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground mb-4">
            Каталог товаров в разработке
          </p>
          <p className="text-sm text-muted-foreground">
            Мы мигрируем каталог из React на Next.js для лучшего SEO
          </p>
        </div>
      </main>
    </div>
  );
} 