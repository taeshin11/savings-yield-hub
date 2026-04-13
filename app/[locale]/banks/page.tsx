import { getMessages } from 'next-intl/server';
import { getAllBanks } from '@/lib/banks';
import BankCard from '@/components/BankCard';
import SchemaLD from '@/components/SchemaLD';
import type { Metadata } from 'next';

const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'All Banks — HYSA, CD & Money Market Rates | SavingsYieldHub',
    description: 'Compare savings rates from 20+ top FDIC-insured online banks. Find the best HYSA, CD, and money market rates.',
    alternates: {
      canonical: `https://savings-yield-hub.vercel.app/${locale}/banks`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://savings-yield-hub.vercel.app/${l}/banks`])),
    },
  };
}

export default async function BanksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [banks, messages] = await Promise.all([getAllBanks(), getMessages()]);
  const t = (key: string) => (messages[key] as string) || key;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Top Online Savings Banks',
    description: 'Best HYSA, CD, and money market rates from FDIC-insured banks',
    numberOfItems: banks.length,
    itemListElement: banks.map((bank, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: bank.name,
      url: `https://savings-yield-hub.vercel.app/${locale}/banks/${bank.slug}`,
    })),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SchemaLD schema={schema} />
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#064e3b' }}>{t('banks.title')}</h1>
      <p className="text-sm mb-6" style={{ color: '#6b7280' }}>{t('banks.subtitle')}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {banks.map((bank) => (
          <BankCard
            key={bank.slug}
            bank={bank}
            locale={locale}
            applyLabel={t('banks.applyNow')}
            viewLabel={t('banks.viewDetails')}
          />
        ))}
      </div>
    </div>
  );
}
