'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { getHome, getBrands, getCategories } from '@/lib/api-client';
import { Product, Brand, Category, MainContent, SwiperSlide as SwiperSlideType } from '@/types';
import ProductCard from '@/components/ui/ProductCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface HomeClientProps {
  locale: string;
}

export default function HomeClient({ locale }: HomeClientProps) {
  const t = useTranslations();
  const [homeData, setHomeData] = useState<any>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeResponse, brandsResponse, categoriesResponse] = await Promise.all([
          getHome(locale),
          getBrands(locale),
          getCategories(locale)
        ]);

        setHomeData(homeResponse);
        setBrands(brandsResponse);
        
        // Process categories to chunk subcategories
        const processedCategories = categoriesResponse.parent?.map((category: Category) => ({
          ...category,
          categories: category.categories ? chunkArray(category.categories, 4) : []
        })) || [];
        
        setCategories(processedCategories);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  const chunkArray = (array: any[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={`${locale === 'ar' ? 'rtl' : ''}`}>
      {/* Hero Section */}
      <section className="relative h-screen">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="h-full"
        >
          {/* Main Hero Slide */}
          <SwiperSlide>
            <div 
              className="h-full bg-cover bg-center relative"
              style={{ backgroundImage: 'url(/images/sec1-home.jpg)' }}
            >
              <div className="absolute inset-0 bg-black/30" />
              <div className="container mx-auto px-4 h-full flex items-center relative z-10">
                <div className="text-white max-w-2xl">
                  <h1 className="text-4xl md:text-6xl font-raleway-semibold mb-6">
                    {t('Create The')}
                    <br />
                    {t('Best Smart Home')}
                  </h1>
                  <p className="text-xl md:text-3xl font-raleway-light mb-8 max-w-md">
                    {t('The Future of Smart,')}
                    <br />
                    {t('Simple,')}
                    <br />
                    {t('Automated Life')}
                  </p>
                  <Link 
                    href={`/${locale}/products`}
                    className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-raleway-regular text-lg transition-colors"
                  >
                    {t('shopNow')}
                    <Image src="/images/arrow.svg" alt="" width={30} height={30} className="ml-2" />
                  </Link>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="absolute bottom-8 left-8 flex space-x-4 text-white">
                <a href="#" className="hover:text-primary transition-colors">{t('Facebook')}</a>
                <a href="#" className="hover:text-primary transition-colors">{t('Twitter')}</a>
                <a href="#" className="hover:text-primary transition-colors">{t('Instagram')}</a>
              </div>
              
              {/* Scroll Indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
                <Image src="/images/scroll.svg" alt="Scroll" width={40} height={40} className="cursor-pointer" />
              </div>
            </div>
          </SwiperSlide>

          {/* Additional Slides from API */}
          {homeData?.swiper?.map((slide: SwiperSlideType, index: number) => (
            <SwiperSlide key={index}>
              <div 
                className="h-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${slide.banner})` }}
              >
                <a 
                  href={slide.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {categories.map((category) => (
            <div key={category.id} className="mb-16">
              <h2 
                className="text-3xl font-raleway-semibold text-gray-800 mb-8 cursor-pointer hover:text-primary transition-colors"
                onClick={() => window.location.href = `/${locale}/products/${category.id}-${category.name}`}
              >
                {category.name}
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Main Category Image */}
                <div 
                  className="h-96 bg-cover bg-center rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                  style={{ backgroundImage: `url(${category.image})` }}
                  onClick={() => window.location.href = `/${locale}/products/${category.id}-${category.name}`}
                />
                
                {/* Subcategories Swiper */}
                <div className="h-96">
                  <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 2000, disableOnInteraction: true, reverseDirection: true }}
                    className="h-full"
                  >
                    {category.categories?.map((subCategoryGroup: Category[], groupIndex: number) => (
                      <SwiperSlide key={groupIndex}>
                        <div className="grid grid-cols-2 gap-4 h-full">
                          {subCategoryGroup.map((subCategory) => (
                            <div
                              key={subCategory.id}
                              className="bg-cover bg-center rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow relative"
                              style={{ backgroundImage: `url(${subCategory.image})` }}
                              onClick={() => window.location.href = `/${locale}/products/${subCategory.id}-${subCategory.name}`}
                            >
                              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3 rounded-b-lg">
                                <span className="text-sm font-raleway-medium">{subCategory.name}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {homeData?.main_content?.map((content: MainContent, index: number) => (
            <div key={index} className={`flex flex-col lg:flex-row items-center mb-16 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <div 
                  className="h-96 bg-cover bg-center rounded-lg shadow-lg"
                  style={{ backgroundImage: `url(${content.image})` }}
                />
              </div>
              <div className="lg:w-1/2 lg:px-12">
                <div className="flex items-center mb-6">
                  <Image src={content.icon} alt="" width={50} height={50} className="mr-4" />
                  <h2 className="text-2xl font-raleway-semibold text-gray-800">{content.title}</h2>
                </div>
                <p className="text-gray-600 font-raleway-light leading-relaxed mb-6">
                  {content.paragraph}
                </p>
                <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-raleway-regular transition-colors inline-flex items-center">
                  {t('Read more')}
                  <Image src="/images/arrow.svg" alt="" width={30} height={30} className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Selling Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-raleway-semibold text-center text-gray-800 mb-12">
            {t('BestSelling')}
          </h2>
          
          <div className="relative">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                nextEl: '.best-selling-next',
                prevEl: '.best-selling-prev',
              }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              spaceBetween={20}
              className="pb-12"
            >
              {homeData?.products?.map((product: Product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} locale={locale} />
                </SwiperSlide>
              ))}
            </Swiper>
            
            <div className="swiper-button-prev best-selling-prev !left-0 !top-1/2 !w-10 !h-10 !bg-white !rounded-full !shadow-lg after:!text-primary after:!text-sm after:!font-bold"></div>
            <div className="swiper-button-next best-selling-next !right-0 !top-1/2 !w-10 !h-10 !bg-white !rounded-full !shadow-lg after:!text-primary after:!text-sm after:!font-bold"></div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary/70 to-secondary/70 rounded-3xl p-8 lg:p-16 relative overflow-hidden">
            <div className="absolute left-0 top-0 w-64 h-full bg-contain bg-no-repeat bg-left" 
                 style={{ backgroundImage: 'url(/images/book-last-sec.png)' }} />
            <div className="relative z-10 lg:ml-64">
              <h2 className="text-2xl lg:text-4xl font-raleway-bold text-white mb-6">
                {t('MakeSmartHomeProject')}
              </h2>
              <p className="text-white font-raleway-regular text-lg mb-8 leading-relaxed">
                {t('smart_home_message')}
              </p>
              <Link 
                href={`/${locale}/smart-home`}
                className="inline-block bg-secondary/50 hover:bg-secondary/70 text-white px-8 py-4 rounded-full font-raleway-regular text-lg transition-colors"
              >
                {t('GetStartedNow')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-raleway-semibold text-center text-gray-800 mb-12">
            {t('OurPartners')}
          </h2>
          
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2000, disableOnInteraction: true, reverseDirection: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 6 },
            }}
            spaceBetween={30}
            loop={true}
          >
            {brands.map((brand) => (
              <SwiperSlide key={brand.id}>
                <Link href={`/${locale}/products/${brand.id}-${brand.name}`}>
                  <div 
                    className="h-32 bg-contain bg-no-repeat bg-center hover:scale-105 transition-transform cursor-pointer"
                    style={{ backgroundImage: `url(${brand.logo})` }}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}