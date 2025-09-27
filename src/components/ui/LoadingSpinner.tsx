'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function LoadingSpinner() {
  const t = useTranslations();

  return (
    <div className="spinner-overlay">
      <div className="text-center">
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div></div>
        </div>
        <p className="text-white font-raleway-regular mt-4">{t('loading')}</p>
      </div>
    </div>
  );
}