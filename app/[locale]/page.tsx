import { getMessages } from 'next-intl/server';
import { getAllBanks } from '@/lib/banks';
import RateTable from '@/components/RateTable';
import APYCalculator from '@/components/APYCalculator';
import SchemaLD from '@/components/SchemaLD';
import AdsterraNativeBanner from '@/components/ads/AdsterraNativeBanner';
import AdsterraDisplay from '@/components/ads/AdsterraDisplay';
import Link from 'next/link';
import type { Metadata } from 'next';

const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Best Savings & CD Rates Today | SavingsYieldHub',
    description: 'Compare the highest HYSA, CD, and money market rates from FDIC-insured banks. Find the best APY for your savings — updated daily.',
    alternates: {
      canonical: `https://savings-yield-hub.vercel.app/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://savings-yield-hub.vercel.app/${l}`])),
    },
    openGraph: {
      title: 'Best Savings & CD Rates Today | SavingsYieldHub',
      description: 'Top HYSA, CD & money market rates from FDIC-insured banks — updated daily.',
      type: 'website',
      url: `https://savings-yield-hub.vercel.app/${locale}`,
    },
  };
}

const TABS = ['hysa', 'cd', 'money-market'] as const;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [banks, messages] = await Promise.all([getAllBanks(), getMessages()]);

  const t = (key: string) => (messages[key] as string) || key;

  const tableLabels = {
    rank: t('table.rank'),
    bank: t('table.bank'),
    product: t('table.product'),
    apy: t('table.apy'),
    minDeposit: t('table.minDeposit'),
    noFees: t('table.noFees'),
    apply: t('table.apply'),
    fdic: t('table.fdic'),
    noFeeOnly: t('filter.noFeeOnly'),
    all: t('filter.all'),
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

  // FAQ items
  const faqs = [1, 2, 3, 4, 5].map((i) => ({
    q: t(`faq.q${i}`),
    a: t(`faq.a${i}`),
  }));

  const topBanks = [...banks].sort((a, b) => b.hysaApy - a.hysaApy).slice(0, 3);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SavingsYieldHub',
    url: 'https://savings-yield-hub.vercel.app',
    description: 'Best HYSA, CD & Money Market rates from FDIC-insured banks',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <div>
      <SchemaLD schema={websiteSchema} />
      <SchemaLD schema={faqSchema} />

      {/* Hero */}
      <section className="container mx-auto px-4 pt-10 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4" style={{ background: '#d1fae5', color: '#064e3b' }}>
          ✓ {t('hero.lastUpdated')}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: '#064e3b' }}>{t('hero.title')}</h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: '#6b7280' }}>{t('hero.subtitle')}</p>

        {/* Top rate highlights */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {topBanks.map((bank) => (
            <div key={bank.slug} className="bg-white rounded-xl border px-4 py-3 text-center min-w-32" style={{ borderColor: '#d1fae5' }}>
              <p className="text-xs font-medium mb-1" style={{ color: '#6b7280' }}>{bank.name}</p>
              <p className="text-2xl font-bold" style={{ color: '#10b981' }}>{bank.hysaApy.toFixed(2)}%</p>
              <p className="text-xs" style={{ color: '#6b7280' }}>APY</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Banner */}
      <div className="container mx-auto px-4">
        <AdsterraNativeBanner />
      </div>

      {/* Rate Tabs */}
      <section className="container mx-auto px-4 mb-8">
        <RateTabs banks={banks} tableLabels={tableLabels} locale={locale} t={t} />
      </section>

      {/* Ad Display */}
      <div className="container mx-auto px-4">
        <AdsterraDisplay />
      </div>

      {/* Calculator */}
      <section className="container mx-auto px-4 mb-10">
        <APYCalculator labels={calcLabels} />
      </section>

      {/* Best of Lists */}
      <section className="container mx-auto px-4 mb-10">
        <h2 className="text-xl font-bold mb-4" style={{ color: '#064e3b' }}>Best Of Lists</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BestOfCard title="Best No-Fee HYSAs" banks={banks.filter((b) => b.noFee).sort((a, b) => b.hysaApy - a.hysaApy).slice(0, 5)} field="hysaApy" locale={locale} applyLabel={t('table.apply')} />
          <BestOfCard title="Best No-Minimum Accounts" banks={banks.filter((b) => b.noMinimum).sort((a, b) => b.hysaApy - a.hysaApy).slice(0, 5)} field="hysaApy" locale={locale} applyLabel={t('table.apply')} />
          <BestOfCard title="Top 1-Year CDs" banks={[...banks].sort((a, b) => b.cd1yr - a.cd1yr).slice(0, 5)} field="cd1yr" locale={locale} applyLabel={t('table.apply')} />
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 mb-10 max-w-3xl">
        <h2 className="text-xl font-bold mb-5" style={{ color: '#064e3b' }}>{t('faq.title')}</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="bg-white rounded-xl border p-4 cursor-pointer" style={{ borderColor: '#d1fae5' }}>
              <summary className="font-semibold text-sm" style={{ color: '#064e3b' }}>{faq.q}</summary>
              <p className="mt-2 text-sm" style={{ color: '#6b7280' }}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Quick links to product pages */}
      <section className="container mx-auto px-4 mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: `/${locale}/products/hysa`, label: 'HYSA Rates', icon: '📈' },
            { href: `/${locale}/products/cd`, label: 'CD Rates', icon: '🏦' },
            { href: `/${locale}/products/money-market`, label: 'Money Market', icon: '💹' },
            { href: `/${locale}/banks`, label: 'All Banks', icon: '🏛️' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white rounded-xl border p-4 text-center hover:shadow-md transition-shadow"
              style={{ borderColor: '#d1fae5' }}
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-sm font-medium" style={{ color: '#064e3b' }}>{item.label}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

// Inner server components
function BestOfCard({
  title,
  banks,
  field,
  locale,
  applyLabel,
}: {
  title: string;
  banks: import('@/types/bank').Bank[];
  field: keyof import('@/types/bank').Bank;
  locale: string;
  applyLabel: string;
}) {
  return (
    <div className="bg-white rounded-xl border p-4" style={{ borderColor: '#d1fae5' }}>
      <h3 className="font-semibold text-sm mb-3" style={{ color: '#064e3b' }}>{title}</h3>
      <ul className="space-y-2">
        {banks.map((bank, i) => (
          <li key={bank.slug} className="flex items-center justify-between text-sm">
            <span style={{ color: '#6b7280' }}>
              <span className="font-bold mr-1">#{i + 1}</span>
              <Link href={`/${locale}/banks/${bank.slug}`} className="hover:underline" style={{ color: '#064e3b' }}>
                {bank.name}
              </Link>
            </span>
            <span className="font-bold" style={{ color: '#10b981' }}>{(bank[field] as number).toFixed(2)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Tab wrapper (needs to be a client component for tab state)
import RateTabs from './RateTabs';
