import Link from 'next/link';
import FDICBadge from './FDICBadge';
import type { Bank } from '@/types/bank';

interface BankCardProps {
  bank: Bank;
  locale: string;
  applyLabel?: string;
  viewLabel?: string;
}

export default function BankCard({ bank, locale, applyLabel = 'Apply Now', viewLabel = 'Details' }: BankCardProps) {
  const topApy = Math.max(bank.hysaApy, bank.cd1yr, bank.moneyMarket || 0);
  return (
    <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: '#d1fae5' }}>
      <div className="flex items-center gap-3 mb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://logo.clearbit.com/${bank.domain}`}
          alt={bank.name}
          width={40}
          height={40}
          className="rounded-lg object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm truncate" style={{ color: '#064e3b' }}>{bank.name}</h3>
          {bank.fdic && <FDICBadge />}
        </div>
      </div>
      <div className="mb-3">
        <span className="text-2xl font-bold" style={{ color: '#10b981' }}>{topApy.toFixed(2)}%</span>
        <span className="text-xs ml-1" style={{ color: '#6b7280' }}>APY</span>
      </div>
      <div className="flex gap-2 flex-wrap mb-3">
        {bank.noFee && (
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#d1fae5', color: '#064e3b' }}>No Fee</span>
        )}
        {bank.noMinimum && (
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#d1fae5', color: '#064e3b' }}>No Min.</span>
        )}
      </div>
      <div className="flex gap-2">
        <Link
          href={`/${locale}/banks/${bank.slug}`}
          className="flex-1 text-center text-xs py-1.5 rounded-lg border font-medium transition-colors"
          style={{ borderColor: '#10b981', color: '#10b981' }}
        >
          {viewLabel}
        </Link>
        <a
          href={bank.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center text-xs py-1.5 rounded-lg font-medium text-white transition-colors"
          style={{ background: '#10b981' }}
        >
          {applyLabel}
        </a>
      </div>
    </div>
  );
}
