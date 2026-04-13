import { getMessages } from 'next-intl/server';
import { getAllBanks } from '@/lib/banks';
import SchemaLD from '@/components/SchemaLD';
import Breadcrumb from '@/components/Breadcrumb';
import CompareClient from './CompareClient';
import type { Metadata } from 'next';

const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Compare Bank Rates Side by Side | SavingsYieldHub',
    description: 'Compare savings rates from two banks side by side. Compare HYSA, CD, and money market rates.',
    alternates: {
      canonical: `https://savings-yield-hub.vercel.app/${locale}/compare`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://savings-yield-hub.vercel.app/${l}/compare`])),
    },
  };
}

export default async function ComparePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [banks, messages] = await Promise.all([getAllBanks(), getMessages()]);
  const t = (key: string) => (messages[key] as string) || key;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Bank Rate Comparison Tool',
    description: 'Compare savings rates from two banks side by side',
    url: `https://savings-yield-hub.vercel.app/${locale}/compare`,
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <SchemaLD schema={schema} />
      <Breadcrumb items={[{ label: 'Home', href: `/${locale}` }, { label: t('compare.title') }]} />
      <h1 className="text-2xl font-bold mb-2" style={{ color: '#064e3b' }}>{t('compare.title')}</h1>
      <p className="text-sm mb-6" style={{ color: '#6b7280' }}>Select two banks to compare their rates side by side.</p>
      <CompareClient banks={banks} locale={locale} selectLabel={t('compare.selectBank')} vsLabel={t('compare.vs')} applyLabel={t('table.apply')} />
    </div>
  );
}
