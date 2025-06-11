import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export async function GET() {
  try {
    await connectDB();
    
    const categories = await Product.distinct('category', { isActive: true });
    
    // Преобразуем в объекты с названиями
    const categoryNames: { [key: string]: string } = {
      'hygiene': 'Гигиена и уход',
      'womens-care': 'Женская гигиена',
      'cleaning': 'Уборка и мытье', 
      'bags': 'Сумки и переноска',
      'disposable': 'Одноразовые эко-товары',
      'beauty-sport': 'Спорт и красота'
    };
    
    const categoriesWithNames = categories.map((category: string) => ({
      value: category,
      label: categoryNames[category] || category
    }));
    
    return NextResponse.json(categoriesWithNames);
  } catch (error) {
    console.error('Ошибка получения категорий:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
} 