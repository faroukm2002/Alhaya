'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  locale: string;
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  const t = useTranslations();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
      <Link href={`/${locale}/products/${product.category}/${product.id}-${product.name}`}>
        <div className="relative">
          {/* Product Image */}
          <div 
            className="h-64 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${product.image})` }}
          >
            {/* Discount Badge */}
            {product.discount && (
              <div className="absolute top-3 right-3 bg-accent text-white px-2 py-1 rounded text-sm font-raleway-bold">
                {product.discount}%
              </div>
            )}
            
            {/* New Badge */}
            <div className="absolute top-3 left-3 bg-accent text-white px-2 py-1 rounded text-sm font-raleway-regular">
              {t('New')}
            </div>
            
            {/* View Button - Shows on Hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-accent text-white px-4 py-2 rounded font-raleway-regular">
                {t('View')}
              </div>
            </div>
          </div>
          
          {/* Product Info */}
          <div className="p-4">
            <h3 className="font-raleway-regular text-gray-800 text-lg mb-2 truncate">
              {product.name}
            </h3>
            <p className="text-gray-500 font-raleway-regular text-sm mb-3">
              {product.brand}
            </p>
            <div className="flex items-center space-x-2">
              {product.priceBeforeDiscount && (
                <span className="text-accent font-raleway-regular line-through">
                  {product.priceBeforeDiscount} {t('currency')}
                </span>
              )}
              <span className="text-success font-raleway-regular text-lg">
                {product.price} {t('currency')}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}