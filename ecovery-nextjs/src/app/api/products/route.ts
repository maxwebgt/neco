import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    
    let query: any = { isActive: true };
    
    // Фильтрация по категории
    if (category) {
      query = { ...query, category };
    }
    
    let products;
    
    // Поиск по тексту
    if (search) {
      products = await Product.find({
        $text: { $search: search },
        ...query
      }).sort({ score: { $meta: 'textScore' } });
    }
    // Рекомендуемые товары
    else if (featured === 'true') {
      products = await Product.find({ 
        isActive: true,
        $or: [{ isNew: true }, { isBestseller: true }]
      }).sort({ createdAt: -1 }).limit(8);
    }
    // Все товары
    else {
      products = await Product.find(query).sort({ createdAt: -1 });
    }
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Ошибка получения товаров:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
} 