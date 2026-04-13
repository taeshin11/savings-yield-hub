import { getMessages } from 'next-intl/server';
import { getAllBanks, getTopMoneyMarket } from '@/lib/banks';
import RateTable from '@/components/RateTable';
import SchemaLD from '@/components/SchemaLD';
import Breadcrumb from '@/components/Breadcrumb';
import type { Metadata } from 'next';

const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Best Money Market Account Rates Today | SavingsYieldHub',
    description: 'Compare the best money market account rates from FDIC-insured banks. High APYs with check-writing and debit card access.',
    alternates: {
      canonical: `https://savings-yield-hub.vercel.app/${locale}/products/money-market`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://savings-yield-hub.vercel.app/${l}/products/money-market`])),
    },
  };
}

export default async function MoneyMarketPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [banks, messages] = await Promise.all([getAllBanks(), getMessages()]);
  const t = (key: string) => (messages[key] as string) || key;
  const topBanks = getTopMoneyMarket(banks);

  const tableLabels = {
    rank: t('table.rank'), bank: t('table.bank'), product: t('table.product'), apy: t('table.apy'),
    minDeposit: t('table.minDeposit'), noFees: t('table.noFees'), apply: t('table.apply'),
    fdic: t('table.fdic'), noFeeOnly: t('filter.noFeeOnly'), all: t('filter.all'),
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Money Market Account',
    description: 'Comparison of the best money market account rates from FDIC-insured banks',
    url: `https://savings-yield-hub.vercel.app/${locale}/products/money-market`,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SchemaLD schema={schema} />
      <Breadcrumb items={[{ label: 'Home', href: `/${locale}` }, { label: 'Products', href: `/${locale}/products` }, { label: 'Money Market' }]} />
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#064e3b' }}>Best Money Market Account Rates Today</h1>
      <p className="text-sm mb-5" style={{ color: '#6b7280' }}>
        Money market accounts combine high interest rates (up to <strong style={{ color: '#10b981' }}>{topBanks[0]?.moneyMarket.toFixed(2)}% APY</strong>) with check-writing and debit card access. All FDIC insured.
      </p>
      <div className="bg-white rounded-2xl border p-5 mb-6" style={{ borderColor: '#d1fae5' }}>
        <h2 className="font-semibold text-sm mb-2" style={{ color: '#064e3b' }}>Money Market vs HYSA</h2>
        <p className="text-sm" style={{ color: '#6b7280' }}>
          Money market accounts often offer higher rates than traditional savings, with added flexibility of check writing. HYSAs may offer slightly higher APYs with fewer withdrawal restrictions. Both are FDIC insured.
        </p>
      </div>
      <RateTable banks={banks} type="money-market" labels={tableLabels} />
    </div>
  );
}
