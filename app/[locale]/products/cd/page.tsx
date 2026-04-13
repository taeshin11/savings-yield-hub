import { getMessages } from 'next-intl/server';
import { getAllBanks } from '@/lib/banks';
import RateTable from '@/components/RateTable';
import SchemaLD from '@/components/SchemaLD';
import Breadcrumb from '@/components/Breadcrumb';
import Link from 'next/link';
import type { Metadata } from 'next';

const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Best CD Rates Today — Certificates of Deposit | SavingsYieldHub',
    description: 'Compare the best CD rates for 3-month, 6-month, 1-year, 2-year, and 5-year terms from FDIC-insured banks.',
    alternates: {
      canonical: `https://savings-yield-hub.vercel.app/${locale}/products/cd`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://savings-yield-hub.vercel.app/${l}/products/cd`])),
    },
  };
}

export default async function CDPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [banks, messages] = await Promise.all([getAllBanks(), getMessages()]);
  const t = (key: string) => (messages[key] as string) || key;

  const tableLabels = {
    rank: t('table.rank'), bank: t('table.bank'), product: t('table.product'), apy: t('table.apy'),
    minDeposit: t('table.minDeposit'), noFees: t('table.noFees'), apply: t('table.apply'),
    fdic: t('table.fdic'), noFeeOnly: t('filter.noFeeOnly'), all: t('filter.all'),
  };

  const cdTerms = [
    { term: '3-month', label: '3-Month CD' },
    { term: '6-month', label: '6-Month CD' },
    { term: '1-year', label: '1-Year CD' },
    { term: '2-year', label: '2-Year CD' },
    { term: '5-year', label: '5-Year CD' },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Certificate of Deposit (CD)',
    description: 'Comparison of the best CD rates from FDIC-insured banks across different terms',
    url: `https://savings-yield-hub.vercel.app/${locale}/products/cd`,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SchemaLD schema={schema} />
      <Breadcrumb items={[{ label: 'Home', href: `/${locale}` }, { label: 'Products', href: `/${locale}/products` }, { label: 'CDs' }]} />
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#064e3b' }}>Best CD Rates Today</h1>
      <p className="text-sm mb-6" style={{ color: '#6b7280' }}>Compare certificate of deposit rates by term length. CD rates are typically higher than HYSAs but your money is locked for the term period.</p>

      {/* Term navigator */}
      <div className="flex flex-wrap gap-2 mb-6">
        {cdTerms.map(({ term, label }) => (
          <Link
            key={term}
            href={`/${locale}/products/cd/${term}`}
            className="px-4 py-2 rounded-xl border font-medium text-sm transition-colors hover:bg-green-50"
            style={{ borderColor: '#10b981', color: '#10b981' }}
          >
            {label}
          </Link>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-3" style={{ color: '#064e3b' }}>Best 1-Year CD Rates</h2>
      <RateTable banks={banks} type="cd" term="1-year" labels={tableLabels} />
    </div>
  );
}
