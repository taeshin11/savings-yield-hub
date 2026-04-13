import { getMessages } from 'next-intl/server';
import { getAllBanks, getTopHYSA } from '@/lib/banks';
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
    title: 'Best High-Yield Savings Account (HYSA) Rates Today | SavingsYieldHub',
    description: 'Compare the top high-yield savings account rates from FDIC-insured banks. Find accounts with APYs up to 5.10% — no minimums, no fees.',
    alternates: {
      canonical: `https://savings-yield-hub.vercel.app/${locale}/products/hysa`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://savings-yield-hub.vercel.app/${l}/products/hysa`])),
    },
  };
}

export default async function HYSAPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [banks, messages] = await Promise.all([getAllBanks(), getMessages()]);
  const t = (key: string) => (messages[key] as string) || key;
  const topBanks = getTopHYSA(banks);

  const tableLabels = {
    rank: t('table.rank'), bank: t('table.bank'), product: t('table.product'), apy: t('table.apy'),
    minDeposit: t('table.minDeposit'), noFees: t('table.noFees'), apply: t('table.apply'),
    fdic: t('table.fdic'), noFeeOnly: t('filter.noFeeOnly'), all: t('filter.all'),
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'High-Yield Savings Account',
    description: 'Comparison of the best high-yield savings account rates from FDIC-insured banks',
    url: `https://savings-yield-hub.vercel.app/${locale}/products/hysa`,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SchemaLD schema={schema} />
      <Breadcrumb items={[{ label: 'Home', href: `/${locale}` }, { label: 'Products', href: `/${locale}/products` }, { label: 'HYSA' }]} />
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#064e3b' }}>Best High-Yield Savings Account Rates Today</h1>
      <p className="text-sm mb-6" style={{ color: '#6b7280' }}>
        Compare HYSA rates from top FDIC-insured banks. Earn up to <strong style={{ color: '#10b981' }}>{topBanks[0]?.hysaApy.toFixed(2)}% APY</strong> — no minimum balance required at many banks.
      </p>
      <div className="bg-white rounded-2xl border p-5 mb-6" style={{ borderColor: '#d1fae5' }}>
        <h2 className="font-semibold text-sm mb-3" style={{ color: '#064e3b' }}>What is a High-Yield Savings Account?</h2>
        <p className="text-sm" style={{ color: '#6b7280' }}>
          A High-Yield Savings Account (HYSA) earns significantly more interest than traditional savings accounts. Online banks offer HYSAs with APYs 10x the national average (0.46%), helping your money grow faster with zero risk. All accounts listed are FDIC-insured up to $250,000.
        </p>
      </div>
      <RateTable banks={banks} type="hysa" labels={tableLabels} />
    </div>
  );
}
