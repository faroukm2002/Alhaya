'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useUser } from '@/contexts/UserContext';
import { useBasket } from '@/contexts/BasketContext';
import { getSettings } from '@/lib/api-client';
import { Settings } from '@/types';

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations();
  const { user, logout } = useUser();
  const { getBasketCount } = useBasket();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const basketCount = getBasketCount();
  const switchLangUrl = locale === 'ar' ? '/en' : '/ar';

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-secondary/80 text-white py-2 px-4 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <a href="tel:00201206569999" className="flex items-center hover:text-primary transition-colors">
              <i className="fas fa-phone-alt mr-2"></i>
              01206569999
            </a>
          </div>
          <div className="hidden md:flex items-center">
            <a href="mailto:contactus@alhayatsmart.com" className="flex items-center hover:text-primary transition-colors">
              <i className="fas fa-envelope mr-2"></i>
              contactus@alhayatsmart.com
            </a>
          </div>
          <div className="hidden lg:flex items-center space-x-3">
            {settings && (
              <>
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Image src="/images/facebook.svg" alt="Facebook" width={21} height={21} />
                </a>
                <a href={settings.linkIn} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Image src="/images/linkedin.svg" alt="LinkedIn" width={21} height={21} />
                </a>
                <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Image src="/images/twitter.svg" alt="Twitter" width={21} height={21} />
                </a>
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Image src="/images/instagram.svg" alt="Instagram" width={21} height={21} />
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`bg-white shadow-md fixed top-10 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled ? 'top-0 h-14' : 'h-16'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex-shrink-0">
              <Image 
                src="/images/Logo.png" 
                alt="Alhayat Smart" 
                width={isScrolled ? 90 : 110} 
                height={isScrolled ? 36 : 44}
                className="transition-all duration-200"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href={`/${locale}`} className="nav-link">
                {t('home')}
              </Link>
              <Link href={`/${locale}/smart-home`} className="nav-link">
                {t('smartHome')}
              </Link>
              <Link href={`/${locale}/products`} className="nav-link">
                {t('products')}
              </Link>
            </div>

            {/* Right Side Navigation */}
            <div className="flex items-center space-x-4">
              {/* User Menu */}
              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 hover:text-primary transition-colors">
                    <div 
                      className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-gray-200"
                      style={{ backgroundImage: `url(${user.image || '/images/icons8-user-80.png'})` }}
                    />
                    <span className="hidden md:block">{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link href={`/${locale}/profile`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {t('account')}
                    </Link>
                    <Link href={`/${locale}/orders`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {t('myOrders')}
                    </Link>
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t('logOut')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Link href={`/${locale}/signup`} className="nav-link">
                    {t('signUp')}
                  </Link>
                  <Link href={`/${locale}/login`} className="nav-link">
                    {t('login')}
                  </Link>
                </div>
              )}

              {/* Shopping Cart */}
              <Link href={`/${locale}/cart`} className="relative">
                <Image src="/images/icon-shop.svg" alt="Shopping Cart" width={23} height={23} />
                {basketCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {basketCount}
                  </span>
                )}
              </Link>

              {/* Language Switcher */}
              <Link href={switchLangUrl} className="nav-link">
                {t('en')}
              </Link>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                  }`}></span>
                  <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
              <div className="py-4 px-4 space-y-4">
                <Link href={`/${locale}`} className="block py-2 hover:text-primary transition-colors">
                  {t('home')}
                </Link>
                <Link href={`/${locale}/smart-home`} className="block py-2 hover:text-primary transition-colors">
                  {t('smartHome')}
                </Link>
                <Link href={`/${locale}/products`} className="block py-2 hover:text-primary transition-colors">
                  {t('products')}
                </Link>
                {!user && (
                  <>
                    <Link href={`/${locale}/signup`} className="block py-2 hover:text-primary transition-colors">
                      {t('signUp')}
                    </Link>
                    <Link href={`/${locale}/login`} className="block py-2 hover:text-primary transition-colors">
                      {t('login')}
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <style jsx>{`
        .nav-link {
          @apply text-gray-700 hover:text-primary transition-colors duration-200 font-raleway-regular;
          position: relative;
        }
        
        .nav-link:hover::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 3px;
          background-color: #01B0FF;
          animation: slideIn 0.3s ease-in-out;
        }
        
        @keyframes slideIn {
          from {
            width: 0;
            left: 50%;
          }
          to {
            width: 100%;
            left: 0;
          }
        }
      `}</style>
    </>
  );
}