import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import HomeClient from '@/components/pages/HomeClient';

interface HomePageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: HomePageProps): Promise<Metadata> {
  const t = await getTranslations({ locale });
  
  return {
    title: locale === 'ar' ? 'الحياة سمارت | بيتك ذكي معنا' : 'Alhayat Smart | Your home is smart with us',
    description: locale === 'ar' 
      ? 'اكتشف أحدث حلول المنزل الذكي مع الحياة سمارت. أجهزة ذكية، أنظمة أتمتة، وحلول إنترنت الأشياء للحياة العصرية.'
      : 'Discover the latest smart home solutions with Alhayat Smart. Smart devices, automation systems, and IoT solutions for modern living.',
    openGraph: {
      title: locale === 'ar' ? 'الحياة سمارت | بيتك ذكي معنا' : 'Alhayat Smart | Your home is smart with us',
      description: locale === 'ar' 
        ? 'اكتشف أحدث حلول المنزل الذكي مع الحياة سمارت. أجهزة ذكية، أنظمة أتمتة، وحلول إنترنت الأشياء للحياة العصرية.'
        : 'Discover the latest smart home solutions with Alhayat Smart. Smart devices, automation systems, and IoT solutions for modern living.',
      url: `/${locale}`,
      images: [
        {
          url: '/images/home-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Alhayat Smart Home',
        },
      ],
    },
  };
}

export default function HomePage({ params: { locale } }: HomePageProps) {
  return <HomeClient locale={locale} />;
}