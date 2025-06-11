'use client';

import { useState, useEffect } from 'react';

export default function TestAPIPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
      setError('');
    } catch (err) {
      setError('Ошибка загрузки товаров');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error('Ошибка загрузки категорий:', err);
    }
  };

  const fetchFeatured = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products?featured=true');
      const data = await response.json();
      setProducts(data);
      setError('');
    } catch (err) {
      setError('Ошибка загрузки рекомендуемых товаров');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Тестирование API</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Управление */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Действия</h2>
          <div className="space-y-2">
            <button 
              onClick={fetchProducts}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Загрузка...' : 'Загрузить все товары'}
            </button>
            
            <button 
              onClick={fetchFeatured}
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              disabled={loading}
            >
              {loading ? 'Загрузка...' : 'Загрузить рекомендуемые'}
            </button>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Категории</h3>
            <div className="bg-gray-100 p-3 rounded">
              {categories.length > 0 ? (
                <ul className="space-y-1">
                  {categories.map((cat: any) => (
                    <li key={cat.value} className="text-sm">
                      {cat.label} ({cat.value})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Категории не загружены</p>
              )}
            </div>
          </div>
        </div>

        {/* Результаты */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Результаты</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="bg-gray-100 p-4 rounded max-h-96 overflow-y-auto">
            {products.length > 0 ? (
              <div className="space-y-2">
                <p className="font-semibold">Найдено товаров: {products.length}</p>
                {products.map((product: any) => (
                  <div key={product._id} className="bg-white p-3 rounded shadow-sm">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.price}₽</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Товары не загружены</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 