import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import LoginClient from '@/components/pages/LoginClient';

interface LoginPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: LoginPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale });
  
  return {
    title: locale === 'ar' ? 'الحياة سمارت | تسجيل الدخول' : 'Alhayat Smart | Login',
    description: locale === 'ar' 
      ? 'سجل دخولك إلى حسابك في الحياة سمارت للوصول إلى المنتجات والخدمات الحصرية.'
      : 'Login to your Alhayat Smart account to access exclusive products and services.',
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function LoginPage({ params: { locale } }: LoginPageProps) {
  return <LoginClient locale={locale} />;
}