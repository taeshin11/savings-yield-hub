import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../globals.css';
import type { Metadata } from 'next';

const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return {
    other: {
      'google-adsense-account': 'ca-pub-7098271335538021',
      'naver-site-verification': 'placeholder',
    },
  };
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();

  const nav = {
    home: (messages['nav.home'] as string) || 'Home',
    hysa: (messages['nav.hysa'] as string) || 'High-Yield Savings',
    cd: (messages['nav.cd'] as string) || 'CDs',
    moneyMarket: (messages['nav.moneyMarket'] as string) || 'Money Market',
    calculator: (messages['nav.calculator'] as string) || 'Calculator',
    compare: (messages['nav.compare'] as string) || 'Compare',
    banks: (messages['nav.banks'] as string) || 'All Banks',
  };

  const footerLabels = {
    visitorToday: (messages['footer.visitorToday'] as string) || 'Visitors today',
    visitorTotal: (messages['footer.visitorTotal'] as string) || 'Total visitors',
    disclaimer: (messages['footer.disclaimer'] as string) || '',
    fdic: (messages['footer.fdic'] as string) || '',
    copyright: (messages['footer.copyright'] as string) || '',
  };

  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <Navbar locale={locale} nav={nav} />
        <main>{children}</main>
        <Footer labels={footerLabels} />
      </NextIntlClientProvider>
    </>
  );
}
