import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { FeedbackButton } from '@/components/FeedbackButton';
import { AdSocialBar } from '@/components/ads/AdSocialBar';

const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL('https://savings-yield-hub.vercel.app'),
    title: { default: 'Best High-Yield Savings Rates Today | SavingsYieldHub', template: '%s | SavingsYieldHub' },
    description: 'Compare today\'s best high-yield savings account, CD, and money market rates from FDIC-insured banks. Find APYs up to 5%+ updated daily.',
    keywords: ['high yield savings', 'best savings rates', 'HYSA rates', 'CD rates', 'money market rates', 'APY comparison', 'FDIC insured savings', 'online savings account'],
    openGraph: {
      title: 'Best High-Yield Savings Rates | SavingsYieldHub',
      description: 'Compare HYSA, CD, and money market rates from top FDIC-insured banks. Find the best APY for your savings.',
      url: `https://savings-yield-hub.vercel.app/${locale}`,
      siteName: 'SavingsYieldHub',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: 'Best Savings Rates Today | SavingsYieldHub', description: 'Free daily HYSA, CD and money market rate comparisons from FDIC-insured banks.' },
    alternates: {
      canonical: `https://savings-yield-hub.vercel.app/${locale}`,
      languages: Object.fromEntries(['en','ko','ja','zh','es','fr','de','pt'].map((l) => [l, `https://savings-yield-hub.vercel.app/${l}`])),
    },
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
      <AdSocialBar />
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021" crossOrigin="anonymous" strategy="afterInteractive" />
      <FeedbackButton siteName="SavingsYieldHub" />
        <Footer labels={footerLabels} />
      </NextIntlClientProvider>
    </>
  );
}
