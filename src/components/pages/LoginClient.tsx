'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/contexts/UserContext';
import { loginUser } from '@/lib/api-client';
import { LoginForm } from '@/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface LoginClientProps {
  locale: string;
}

export default function LoginClient({ locale }: LoginClientProps) {
  const t = useTranslations();
  const router = useRouter();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError('');

    try {
      const response = await loginUser(data);
      setUser(response);
      router.push(`/${locale}`);
    } catch (err: any) {
      setError(err.response?.data?.message || t('loginError'));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={`min-h-screen bg-cover bg-bottom relative ${locale === 'ar' ? 'rtl' : ''}`}
         style={{ backgroundImage: 'url(/images/login.png)' }}>
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-xl">
            {/* Logo */}
            <div className="text-center mb-8">
              <Image 
                src="/images/Logo.png" 
                alt="Alhayat Smart" 
                width={200} 
                height={80}
                className="mx-auto"
              />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  {...register('email', { 
                    required: t('validEmail'),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t('validEmail')
                    }
                  })}
                  className="w-full px-4 py-3 border-b-2 border-gray-300 bg-transparent focus:border-primary focus:outline-none transition-colors"
                  placeholder=" "
                />
                <label className="absolute left-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-primary">
                  {t('email')}
                </label>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="relative">
                <input
                  type="password"
                  {...register('password', { 
                    required: t('validPassword'),
                    minLength: {
                      value: 6,
                      message: t('validPassword')
                    }
                  })}
                  className="w-full px-4 py-3 border-b-2 border-gray-300 bg-transparent focus:border-primary focus:outline-none transition-colors"
                  placeholder=" "
                />
                <label className="absolute left-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-primary">
                  {t('password')}
                </label>
                <div className="text-right mt-2">
                  <a href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">
                    {t('forgotPassword')}
                  </a>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-raleway-regular text-lg transition-colors disabled:opacity-50"
              >
                {loading ? t('loading') : t('login')}
              </button>

              {/* Sign Up Link */}
              <div className="text-center">
                <Link 
                  href={`/${locale}/signup`}
                  className="text-gray-600 hover:text-primary transition-colors font-raleway-regular"
                >
                  {t('signUpNow')}
                </Link>
              </div>

              {/* Social Login */}
              <div className="text-center">
                <p className="text-gray-600 font-raleway-regular mb-4">
                  {t('orLoginWith')}
                </p>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Image src="/images/login-face.svg" alt="Facebook" width={20} height={20} className="mr-2" />
                  Facebook
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}