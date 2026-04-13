import { getMessages } from 'next-intl/server';
import APYCalculator from '@/components/APYCalculator';
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
    title: 'APY Savings Calculator — Compound Interest Calculator | SavingsYieldHub',
    description: 'Calculate how much your savings will grow with compound interest. Enter your initial deposit, APY, and time period to see your total balance.',
    alternates: {
      canonical: `https://savings-yield-hub.vercel.app/${locale}/calculator`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://savings-yield-hub.vercel.app/${l}/calculator`])),
    },
  };
}

export default async function CalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = await getMessages();
  const t = (key: string) => (messages[key] as string) || key;

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

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'APY Savings Calculator',
    description: 'Compound interest calculator for savings accounts, CDs, and money market accounts',
    url: `https://savings-yield-hub.vercel.app/${locale}/calculator`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <SchemaLD schema={schema} />
      <Breadcrumb items={[{ label: 'Home', href: `/${locale}` }, { label: 'Calculator' }]} />
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#064e3b' }}>APY Savings Calculator</h1>
      <p className="text-sm mb-6" style={{ color: '#6b7280' }}>
        Calculate compound interest earnings on your savings. Uses monthly compounding (most common for savings accounts).
      </p>
      <APYCalculator labels={calcLabels} />

      {/* How it works */}
      <div className="mt-8 bg-white rounded-2xl border p-5" style={{ borderColor: '#d1fae5' }}>
        <h2 className="font-semibold mb-3" style={{ color: '#064e3b' }}>How Compound Interest Works</h2>
        <p className="text-sm mb-3" style={{ color: '#6b7280' }}>
          Compound interest means you earn interest on your interest. With monthly compounding at 5% APY, your $10,000 grows to <strong style={{ color: '#10b981' }}>$16,470</strong> in 10 years without adding anything extra.
        </p>
        <p className="text-xs" style={{ color: '#6b7280' }}>
          Formula: A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]
          <br />Where P = principal, r = annual rate, n = 12 (monthly), t = years, PMT = monthly contribution
        </p>
      </div>
    </div>
  );
}
