'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const { state } = useCart();

  return (
    <div className="min-h-screen">
      <header className="bg-eco-green text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">ECO.VERY</Link>
            <nav>
              <Link href="/" className="mr-4 hover:underline">Главная</Link>
              <Link href="/catalog" className="hover:underline">Каталог</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Корзина</h1>
        
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground mb-4">
            Товаров в корзине: {state.totalItems}
          </p>
          <p className="text-lg text-muted-foreground mb-4">
            Общая сумма: {state.totalPrice.toLocaleString()} ₽
          </p>
          {state.items.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Корзина пуста. Перейдите в каталог, чтобы добавить товары.
            </p>
          )}
        </div>
      </main>
    </div>
  );
} 