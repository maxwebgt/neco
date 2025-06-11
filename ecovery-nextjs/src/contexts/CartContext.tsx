'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Типы для корзины
export interface CartItem {
  _id: string;
  name: string;
  slug: string;
  price: number;
  mainImage: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { _id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (id: string) => number;
}

// Функция для подсчета итогов корзины
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return { totalItems, totalPrice };
};

// Reducer для управления состоянием корзины
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      
      let newItems: CartItem[];
      if (existingItem) {
        // Увеличиваем количество существующего товара
        newItems = state.items.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Добавляем новый товар
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      const { totalItems, totalPrice } = calculateTotals(newItems);
      return { items: newItems, totalItems, totalPrice };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item._id !== action.payload);
      const { totalItems, totalPrice } = calculateTotals(newItems);
      return { items: newItems, totalItems, totalPrice };
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        // Удаляем товар если количество 0 или меньше
        const newItems = state.items.filter(item => item._id !== action.payload._id);
        const { totalItems, totalPrice } = calculateTotals(newItems);
        return { items: newItems, totalItems, totalPrice };
      }

      const newItems = state.items.map(item =>
        item._id === action.payload._id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const { totalItems, totalPrice } = calculateTotals(newItems);
      return { items: newItems, totalItems, totalPrice };
    }

    case 'CLEAR_CART':
      return { items: [], totalItems: 0, totalPrice: 0 };

    case 'LOAD_CART': {
      const { totalItems, totalPrice } = calculateTotals(action.payload);
      return { items: action.payload, totalItems, totalPrice };
    }

    default:
      return state;
  }
};

// Создаем контекст
const CartContext = createContext<CartContextType | undefined>(undefined);

// Начальное состояние корзины
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Провайдер корзины
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Загружаем корзину из localStorage при инициализации
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('ecovery-cart');
      if (savedCart) {
        try {
          const cartItems = JSON.parse(savedCart);
          dispatch({ type: 'LOAD_CART', payload: cartItems });
        } catch (error) {
          console.error('Ошибка загрузки корзины из localStorage:', error);
        }
      }
    }
  }, []);

  // Сохраняем корзину в localStorage при изменении
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ecovery-cart', JSON.stringify(state.items));
    }
  }, [state.items]);

  // Функции для работы с корзиной
  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { _id: id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemQuantity = (id: string): number => {
    const item = state.items.find(item => item._id === id);
    return item ? item.quantity : 0;
  };

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Хук для использования корзины
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart должен использоваться внутри CartProvider');
  }
  return context;
}; 