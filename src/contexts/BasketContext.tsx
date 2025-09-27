'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Basket, Product } from '@/types';
import Cookies from 'js-cookie';

interface BasketContextType {
  basket: Basket;
  addToBasket: (product: Product) => void;
  removeFromBasket: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearBasket: () => void;
  getBasketCount: () => number;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export function BasketProvider({ children }: { children: ReactNode }) {
  const [basket, setBasket] = useState<Basket>({
    products: [],
    subTotal: 0,
    tax: 0,
    total: 0
  });

  useEffect(() => {
    const savedBasket = Cookies.get('basket');
    if (savedBasket) {
      try {
        setBasket(JSON.parse(savedBasket));
      } catch (error) {
        console.error('Error parsing basket data:', error);
        Cookies.remove('basket');
      }
    }
  }, []);

  useEffect(() => {
    // Calculate totals
    const subTotal = basket.products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    const tax = subTotal * 0.14; // 14% tax
    const total = subTotal + tax;

    const updatedBasket = {
      ...basket,
      subTotal,
      tax,
      total
    };

    if (JSON.stringify(updatedBasket) !== JSON.stringify(basket)) {
      setBasket(updatedBasket);
      Cookies.set('basket', JSON.stringify(updatedBasket), { expires: 7 });
    }
  }, [basket.products]);

  const addToBasket = (product: Product) => {
    setBasket(prevBasket => {
      const existingProductIndex = prevBasket.products.findIndex(p => p.id === product.id);
      
      if (existingProductIndex > -1) {
        const updatedProducts = [...prevBasket.products];
        updatedProducts[existingProductIndex].quantity += product.quantity;
        return { ...prevBasket, products: updatedProducts };
      } else {
        return { ...prevBasket, products: [...prevBasket.products, { ...product, uniqueId: Date.now() }] };
      }
    });
  };

  const removeFromBasket = (productId: number) => {
    setBasket(prevBasket => ({
      ...prevBasket,
      products: prevBasket.products.filter(p => p.id !== productId)
    }));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromBasket(productId);
      return;
    }

    setBasket(prevBasket => ({
      ...prevBasket,
      products: prevBasket.products.map(p => 
        p.id === productId ? { ...p, quantity } : p
      )
    }));
  };

  const clearBasket = () => {
    setBasket({
      products: [],
      subTotal: 0,
      tax: 0,
      total: 0
    });
    Cookies.remove('basket');
  };

  const getBasketCount = () => {
    return basket.products.reduce((count, product) => count + product.quantity, 0);
  };

  return (
    <BasketContext.Provider value={{
      basket,
      addToBasket,
      removeFromBasket,
      updateQuantity,
      clearBasket,
      getBasketCount
    }}>
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  const context = useContext(BasketContext);
  if (context === undefined) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
}