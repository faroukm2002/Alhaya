'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getSettings } from '@/lib/api-client';
import { Settings } from '@/types';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations();
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsData = await getSettings();
        setSettings(settingsData);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <footer className="bg-secondary/80 text-white py-8 min-h-[265px] relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center items-center space-x-8 mb-6">
            <Link href={`/${locale}/smart-home`} className="text-white hover:text-primary transition-colors font-raleway-regular">
              {t('smartHome')}
            </Link>
            <Link href={`/${locale}/products`} className="text-white hover:text-primary transition-colors font-raleway-regular">
              {t('products')}
            </Link>
            <Link href={`/${locale}/about`} className="text-white hover:text-primary transition-colors font-raleway-regular">
              {t('aboutUs')}
            </Link>
            <Link href={`/${locale}/contact`} className="text-white hover:text-primary transition-colors font-raleway-regular">
              {t('contactUs')}
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center items-center space-x-4 mb-6">
            {settings && (
              <>
                <a 
                  href={settings.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image src="/images/facebook.svg" alt="Facebook" width={21} height={21} />
                </a>
                <a 
                  href={settings.linkIn} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image src="/images/linkedin.svg" alt="LinkedIn" width={21} height={21} />
                </a>
                <a 
                  href={settings.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image src="/images/twitter.svg" alt="Twitter" width={21} height={21} />
                </a>
                <a 
                  href={settings.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image src="/images/instagram.svg" alt="Instagram" width={21} height={21} />
                </a>
              </>
            )}
          </div>

          {/* Logo */}
          <div className="mb-6">
            <Image 
              src="/images/logoWhite.png" 
              alt="Alhayat Smart Logo" 
              width={150} 
              height={60}
              className="mx-auto"
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-4 px-5">
          <p className="text-sm font-raleway-regular mb-1">
            {t('copyRights')}
          </p>
          <p 
            className="text-sm mb-1"
            dangerouslySetInnerHTML={{ __html: t('poweredBy') }}
          />
        </div>

        {/* Floating Phone Button */}
        <div className="fixed bottom-5 left-5 z-50">
          <div className="bg-primary hover:bg-primary/90 transition-colors rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
            <a href="tel:00201206569999" className="text-white text-2xl">
              <i className="fas fa-phone-alt"></i>
            </a>
          </div>
          <p className="absolute bottom-12 left-20 bg-primary text-white px-2 py-1 rounded text-sm font-raleway-bold whitespace-nowrap hidden md:block">
            {t('hotLine')}
          </p>
        </div>
      </div>
    </footer>
  );
}