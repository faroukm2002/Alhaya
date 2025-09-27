import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales } from '@/i18n';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { UserProvider } from '@/contexts/UserContext';
import { BasketProvider } from '@/contexts/BasketContext';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <UserProvider>
        <BasketProvider>
          <div className={`min-h-screen flex flex-col ${locale === 'ar' ? 'rtl' : ''}`}>
            <Navbar locale={locale} />
            <main className="flex-1 pt-24">
              {children}
            </main>
            <Footer locale={locale} />
          </div>
        </BasketProvider>
      </UserProvider>
    </NextIntlClientProvider>
  );
}