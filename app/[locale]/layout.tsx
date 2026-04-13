import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../globals.css';

const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
    <html lang={locale}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-7098271335538021" />
        <meta name="naver-site-verification" content="placeholder" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body style={{ background: '#f0fdf4', color: '#064e3b', fontFamily: 'Arial, Helvetica, sans-serif', margin: 0 }}>
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} nav={nav} />
          <main>{children}</main>
          <Footer labels={footerLabels} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
