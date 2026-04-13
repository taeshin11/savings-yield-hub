import { getMessages } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Savings Products — HYSA, CD & Money Market | SavingsYieldHub',
    description: 'Compare different types of savings accounts: high-yield savings, CDs, and money market accounts.',
    alternates: {
      canonical: `https://savings-yield-hub.vercel.app/${locale}/products`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://savings-yield-hub.vercel.app/${l}/products`])),
    },
  };
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = await getMessages();
  const t = (key: string) => (messages[key] as string) || key;

  const products = [
    {
      href: `/${locale}/products/hysa`,
      icon: '📈',
      title: 'High-Yield Savings (HYSA)',
      description: 'Earn up to 5.10% APY with no minimum deposit. Best for emergency funds and short-term savings.',
      highlight: 'Up to 5.10% APY',
    },
    {
      href: `/${locale}/products/cd`,
      icon: '🏦',
      title: 'Certificates of Deposit (CD)',
      description: 'Lock in a guaranteed rate for 3 months to 5 years. Higher rates for longer terms.',
      highlight: 'Up to 5.20% APY',
    },
    {
      href: `/${locale}/products/money-market`,
      icon: '💹',
      title: 'Money Market Accounts',
      description: 'High rates with check-writing and debit card access. Best of both savings and checking.',
      highlight: 'Up to 4.85% APY',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#064e3b' }}>{t('products.title')}</h1>
      <p className="text-sm mb-8" style={{ color: '#6b7280' }}>{t('products.subtitle')}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.href}
            href={product.href}
            className="bg-white rounded-2xl border p-6 hover:shadow-md transition-shadow block"
            style={{ borderColor: '#d1fae5' }}
          >
            <div className="text-4xl mb-3">{product.icon}</div>
            <div className="inline-block px-2 py-0.5 rounded-full text-xs font-bold mb-3" style={{ background: '#d1fae5', color: '#10b981' }}>
              {product.highlight}
            </div>
            <h2 className="text-lg font-bold mb-2" style={{ color: '#064e3b' }}>{product.title}</h2>
            <p className="text-sm" style={{ color: '#6b7280' }}>{product.description}</p>
            <div className="mt-4 text-sm font-medium" style={{ color: '#10b981' }}>Compare rates →</div>
          </Link>
        ))}
      </div>

      {/* CD Terms quick nav */}
      <div className="mt-8 bg-white rounded-2xl border p-6" style={{ borderColor: '#d1fae5' }}>
        <h2 className="font-bold mb-4" style={{ color: '#064e3b' }}>CD Rates by Term</h2>
        <div className="flex flex-wrap gap-3">
          {['3-month', '6-month', '1-year', '2-year', '5-year'].map((term) => (
            <Link
              key={term}
              href={`/${locale}/products/cd/${term}`}
              className="px-4 py-2 rounded-xl border font-medium text-sm transition-colors hover:bg-green-50"
              style={{ borderColor: '#10b981', color: '#10b981' }}
            >
              {term} CD rates
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
