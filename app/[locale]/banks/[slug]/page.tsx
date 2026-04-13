import { getMessages } from 'next-intl/server';
import { getAllBanks, getBankBySlug } from '@/lib/banks';
import FDICBadge from '@/components/FDICBadge';
import SchemaLD from '@/components/SchemaLD';
import Breadcrumb from '@/components/Breadcrumb';
import APYCalculator from '@/components/APYCalculator';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';

const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];

export async function generateStaticParams() {
  const banks = await getAllBanks();
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const bank of banks) {
      params.push({ locale, slug: bank.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const bank = await getBankBySlug(slug);
  if (!bank) return {};
  const topApy = Math.max(bank.hysaApy, bank.cd1yr, bank.moneyMarket || 0);
  return {
    title: `${bank.name} Savings Rates Today — APY ${topApy.toFixed(2)}% | SavingsYieldHub`,
    description: `${bank.name} current savings rates: HYSA ${bank.hysaApy}% APY, 1-year CD ${bank.cd1yr}% APY. FDIC insured. Compare all ${bank.name} products.`,
    alternates: {
      canonical: `https://savings-yield-hub.vercel.app/${locale}/banks/${slug}`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://savings-yield-hub.vercel.app/${l}/banks/${slug}`])),
    },
    openGraph: {
      title: `${bank.name} Rates | SavingsYieldHub`,
      description: `Best rates from ${bank.name} — updated daily.`,
      type: 'website',
    },
  };
}

export default async function BankDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const [bank, messages] = await Promise.all([getBankBySlug(slug), getMessages()]);
  if (!bank) notFound();

  const t = (key: string) => (messages[key] as string) || key;

  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: `${bank.name} Online Savings Account`,
    description: `High-yield savings account with ${bank.hysaApy}% APY, ${bank.noFee ? 'no monthly fees,' : ''} FDIC insured`,
    provider: {
      '@type': 'BankOrCreditUnion',
      name: bank.name,
      url: bank.applyUrl,
    },
    annualPercentageRate: bank.hysaApy.toString(),
    feesAndCommissionsSpecification: bank.noFee ? 'No monthly fees' : 'Fees may apply',
    amount: { '@type': 'MonetaryAmount', minValue: bank.minDeposit.toString(), currency: 'USD' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://savings-yield-hub.vercel.app/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Banks', item: `https://savings-yield-hub.vercel.app/${locale}/banks` },
      { '@type': 'ListItem', position: 3, name: bank.name, item: `https://savings-yield-hub.vercel.app/${locale}/banks/${slug}` },
    ],
  };

  const calcLabels = {
    title: t('calculator.title'),
    subtitle: t('calculator.subtitle'),
    initialDeposit: t('calculator.initialDeposit'),
    monthlyContribution: t('calculator.monthlyContribution'),
    apy: t('calculator.apy'),
    years: t('calculator.years'),
    calculate: t('calculator.calculate'),
    totalBalance: t('calculator.totalBalance'),
    totalInterest: t('calculator.totalInterest'),
    principal: t('calculator.principal'),
  };

  const products = [
    { label: 'High-Yield Savings', apy: bank.hysaApy, term: null },
    { label: '3-Month CD', apy: bank.cd3m, term: '3-month' },
    { label: '6-Month CD', apy: bank.cd6m, term: '6-month' },
    { label: '1-Year CD', apy: bank.cd1yr, term: '1-year' },
    { label: '2-Year CD', apy: bank.cd2yr, term: '2-year' },
    { label: '5-Year CD', apy: bank.cd5yr, term: '5-year' },
    { label: 'Money Market', apy: bank.moneyMarket, term: null },
  ].filter((p) => p.apy > 0);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <SchemaLD schema={financialProductSchema} />
      <SchemaLD schema={breadcrumbSchema} />
      <Breadcrumb
        items={[
          { label: 'Home', href: `/${locale}` },
          { label: 'Banks', href: `/${locale}/banks` },
          { label: bank.name },
        ]}
      />
      <div className="flex items-center gap-4 mb-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://logo.clearbit.com/${bank.domain}`}
          alt={bank.name}
          width={60}
          height={60}
          className="rounded-xl"
        />
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#064e3b' }}>{bank.name}</h1>
          <div className="flex gap-2 flex-wrap mt-1">
            {bank.fdic && <FDICBadge label={t('badge.fdic')} />}
            {bank.noFee && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: '#d1fae5', color: '#064e3b' }}>{t('badge.noFee')}</span>
            )}
            {bank.noMinimum && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: '#d1fae5', color: '#064e3b' }}>{t('badge.noMinimum')}</span>
            )}
          </div>
        </div>
        <div className="ml-auto">
          <a
            href={bank.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl font-semibold text-white transition-colors"
            style={{ background: '#10b981' }}
          >
            {t('table.apply')} →
          </a>
        </div>
      </div>

      {/* Rate table */}
      <div className="bg-white rounded-2xl border mb-6" style={{ borderColor: '#d1fae5' }}>
        <div className="p-4 border-b" style={{ borderColor: '#d1fae5', background: '#ecfdf5', borderRadius: '1rem 1rem 0 0' }}>
          <h2 className="font-semibold" style={{ color: '#064e3b' }}>Current Rates</h2>
          <p className="text-xs" style={{ color: '#6b7280' }}>{t('lastUpdated')}: April 2025</p>
        </div>
        <div className="divide-y" style={{ '--tw-divide-opacity': 1 } as React.CSSProperties}>
          {products.map((product) => (
            <div key={product.label} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-medium text-sm" style={{ color: '#064e3b' }}>{product.label}</p>
                {product.term && (
                  <Link
                    href={`/${locale}/products/cd/${product.term}`}
                    className="text-xs hover:underline"
                    style={{ color: '#10b981' }}
                  >
                    Compare {product.term} CDs →
                  </Link>
                )}
              </div>
              <div className="text-right">
                <span className="text-xl font-bold" style={{ color: '#10b981' }}>{product.apy.toFixed(2)}%</span>
                <span className="text-xs ml-1" style={{ color: '#6b7280' }}>APY</span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t" style={{ borderColor: '#d1fae5' }}>
          <div className="flex gap-4 text-sm">
            <div>
              <span style={{ color: '#6b7280' }}>Min. Deposit: </span>
              <span className="font-semibold" style={{ color: '#064e3b' }}>
                {bank.minDeposit === 0 ? '$0' : `$${bank.minDeposit.toLocaleString()}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator pre-filled with bank's best rate */}
      <APYCalculator labels={calcLabels} />
    </div>
  );
}
