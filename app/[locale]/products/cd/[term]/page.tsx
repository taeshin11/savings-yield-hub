import { getMessages } from 'next-intl/server';
import { getAllBanks } from '@/lib/banks';
import RateTable from '@/components/RateTable';
import SchemaLD from '@/components/SchemaLD';
import Breadcrumb from '@/components/Breadcrumb';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
const cdTerms = ['3-month', '6-month', '1-year', '2-year', '5-year'];

export async function generateStaticParams() {
  const params: { locale: string; term: string }[] = [];
  for (const locale of locales) {
    for (const term of cdTerms) {
      params.push({ locale, term });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; term: string }> }): Promise<Metadata> {
  const { locale, term } = await params;
  return {
    title: `Best ${term} CD Rates Today | SavingsYieldHub`,
    description: `Compare the best ${term} certificate of deposit rates from FDIC-insured banks. Find the highest APY for your ${term} CD.`,
    alternates: {
      canonical: `https://savings-yield-hub.vercel.app/${locale}/products/cd/${term}`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://savings-yield-hub.vercel.app/${l}/products/cd/${term}`])),
    },
  };
}

export default async function CDTermPage({ params }: { params: Promise<{ locale: string; term: string }> }) {
  const { locale, term } = await params;
  if (!cdTerms.includes(term)) notFound();

  const [banks, messages] = await Promise.all([getAllBanks(), getMessages()]);
  const t = (key: string) => (messages[key] as string) || key;

  const tableLabels = {
    rank: t('table.rank'), bank: t('table.bank'), product: t('table.product'), apy: t('table.apy'),
    minDeposit: t('table.minDeposit'), noFees: t('table.noFees'), apply: t('table.apply'),
    fdic: t('table.fdic'), noFeeOnly: t('filter.noFeeOnly'), all: t('filter.all'),
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: `${term} Certificate of Deposit`,
    description: `Best ${term} CD rates from FDIC-insured banks`,
    url: `https://savings-yield-hub.vercel.app/${locale}/products/cd/${term}`,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SchemaLD schema={schema} />
      <Breadcrumb items={[
        { label: 'Home', href: `/${locale}` },
        { label: 'Products', href: `/${locale}/products` },
        { label: 'CDs', href: `/${locale}/products/cd` },
        { label: `${term}` },
      ]} />
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#064e3b' }}>Best {term} CD Rates Today</h1>
      <p className="text-sm mb-5" style={{ color: '#6b7280' }}>
        Compare the best {term} certificate of deposit rates. All banks are FDIC-insured.
      </p>

      {/* Other terms nav */}
      <div className="flex flex-wrap gap-2 mb-6">
        {cdTerms.filter((t) => t !== term).map((t) => (
          <Link
            key={t}
            href={`/${locale}/products/cd/${t}`}
            className="px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors hover:bg-green-50"
            style={{ borderColor: '#d1fae5', color: '#10b981' }}
          >
            {t} CDs
          </Link>
        ))}
      </div>

      <RateTable banks={banks} type="cd" term={term} labels={tableLabels} />
    </div>
  );
}
