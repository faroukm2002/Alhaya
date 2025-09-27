import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ProductsClient from '@/components/pages/ProductsClient';

interface ProductsPageProps {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params: { locale } }: ProductsPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale });
  
  return {
    title: locale === 'ar' ? 'الحياة سمارت | المنتجات' : 'Alhayat Smart | Products',
    description: locale === 'ar' 
      ? 'تصفح مجموعة واسعة من المنتجات الذكية للمنزل. أجهزة ذكية، أنظمة أمان، إضاءة ذكية والمزيد.'
      : 'Browse our wide range of smart home products. Smart devices, security systems, smart lighting and more.',
    openGraph: {
      title: locale === 'ar' ? 'الحياة سمارت | المنتجات' : 'Alhayat Smart | Products',
      description: locale === 'ar' 
        ? 'تصفح مجموعة واسعة من المنتجات الذكية للمنزل. أجهزة ذكية، أنظمة أمان، إضاءة ذكية والمزيد.'
        : 'Browse our wide range of smart home products. Smart devices, security systems, smart lighting and more.',
      url: `/${locale}/products`,
    },
  };
}

export default function ProductsPage({ params: { locale }, searchParams }: ProductsPageProps) {
  return <ProductsClient locale={locale} searchParams={searchParams} />;
}