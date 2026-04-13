'use client';

import { useState } from 'react';
import FDICBadge from './FDICBadge';
import type { Bank } from '@/types/bank';

interface RateTableProps {
  banks: Bank[];
  type: 'hysa' | 'cd' | 'money-market';
  term?: string;
  labels: {
    rank: string;
    bank: string;
    product: string;
    apy: string;
    minDeposit: string;
    noFees: string;
    apply: string;
    fdic: string;
    noFeeOnly: string;
    all: string;
  };
}

function getApy(bank: Bank, type: string, term?: string): number {
  if (type === 'hysa') return bank.hysaApy;
  if (type === 'money-market') return bank.moneyMarket;
  if (type === 'cd') {
    const map: Record<string, keyof Bank> = {
      '3-month': 'cd3m', '6-month': 'cd6m', '1-year': 'cd1yr', '2-year': 'cd2yr', '5-year': 'cd5yr'
    };
    const key = term ? map[term] : 'cd1yr';
    return (bank[key || 'cd1yr'] as number) || 0;
  }
  return 0;
}

export default function RateTable({ banks, type, term, labels }: RateTableProps) {
  const [noFeeOnly, setNoFeeOnly] = useState(false);
  const [minDeposit, setMinDeposit] = useState(0);
  const [sortDir, setSortDir] = useState<'desc' | 'asc'>('desc');

  const filtered = banks
    .filter((b) => {
      const apy = getApy(b, type, term);
      if (apy <= 0) return false;
      if (noFeeOnly && !b.noFee) return false;
      if (b.minDeposit > minDeposit && minDeposit > 0) return false;
      return true;
    })
    .sort((a, b) => {
      const diff = getApy(b, type, term) - getApy(a, type, term);
      return sortDir === 'desc' ? diff : -diff;
    });

  const productLabel = type === 'hysa' ? 'High-Yield Savings' : type === 'money-market' ? 'Money Market' : term ? `${term} CD` : 'CD';

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: '#064e3b' }}>
          <input
            type="checkbox"
            checked={noFeeOnly}
            onChange={(e) => setNoFeeOnly(e.target.checked)}
            className="rounded"
          />
          {labels.noFeeOnly}
        </label>
        <div className="flex items-center gap-2 text-sm" style={{ color: '#064e3b' }}>
          <span>Min Deposit:</span>
          <select
            value={minDeposit}
            onChange={(e) => setMinDeposit(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
            style={{ borderColor: '#d1fae5' }}
          >
            <option value={0}>{labels.all}</option>
            <option value={500}>$500+</option>
            <option value={1000}>$1,000+</option>
            <option value={5000}>$5,000+</option>
          </select>
        </div>
        <button
          onClick={() => setSortDir(sortDir === 'desc' ? 'asc' : 'desc')}
          className="text-xs px-3 py-1 rounded-full border font-medium"
          style={{ borderColor: '#10b981', color: '#10b981' }}
        >
          APY {sortDir === 'desc' ? '↓' : '↑'}
        </button>
      </div>

      {/* Table - desktop */}
      <div className="hidden md:block overflow-x-auto rounded-xl border" style={{ borderColor: '#d1fae5' }}>
        <table className="w-full text-sm">
          <thead style={{ background: '#ecfdf5' }}>
            <tr>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: '#064e3b' }}>{labels.rank}</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: '#064e3b' }}>{labels.bank}</th>
              <th className="text-left px-4 py-3 font-semibold" style={{ color: '#064e3b' }}>{labels.product}</th>
              <th className="text-right px-4 py-3 font-semibold" style={{ color: '#064e3b' }}>{labels.apy}</th>
              <th className="text-right px-4 py-3 font-semibold" style={{ color: '#064e3b' }}>{labels.minDeposit}</th>
              <th className="text-center px-4 py-3 font-semibold" style={{ color: '#064e3b' }}>{labels.noFees}</th>
              <th className="text-center px-4 py-3 font-semibold" style={{ color: '#064e3b' }}>{labels.fdic}</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((bank, i) => {
              const apy = getApy(bank, type, term);
              return (
                <tr key={bank.slug} className="border-t hover:bg-green-50 transition-colors" style={{ borderColor: '#d1fae5' }}>
                  <td className="px-4 py-3 font-semibold" style={{ color: '#6b7280' }}>#{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://logo.clearbit.com/${bank.domain}`}
                        alt={bank.name}
                        width={28}
                        height={28}
                        className="rounded object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                      <span className="font-medium" style={{ color: '#064e3b' }}>{bank.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3" style={{ color: '#6b7280' }}>{productLabel}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-lg font-bold" style={{ color: '#10b981' }}>{apy.toFixed(2)}%</span>
                  </td>
                  <td className="px-4 py-3 text-right" style={{ color: '#6b7280' }}>
                    {bank.minDeposit === 0 ? '$0' : `$${bank.minDeposit.toLocaleString()}`}
                  </td>
                  <td className="px-4 py-3 text-center">{bank.noFee ? '✓' : '—'}</td>
                  <td className="px-4 py-3 text-center">{bank.fdic ? <FDICBadge /> : '—'}</td>
                  <td className="px-4 py-3 text-center">
                    <a
                      href={bank.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-3 py-1.5 rounded-lg text-white text-xs font-medium transition-colors"
                      style={{ background: '#10b981' }}
                    >
                      {labels.apply}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((bank, i) => {
          const apy = getApy(bank, type, term);
          return (
            <div key={bank.slug} className="bg-white rounded-xl border p-4" style={{ borderColor: '#d1fae5' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold" style={{ color: '#6b7280' }}>#{i + 1}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://logo.clearbit.com/${bank.domain}`}
                    alt={bank.name}
                    width={24}
                    height={24}
                    className="rounded object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <span className="font-semibold text-sm" style={{ color: '#064e3b' }}>{bank.name}</span>
                </div>
                <span className="text-xl font-bold" style={{ color: '#10b981' }}>{apy.toFixed(2)}%</span>
              </div>
              <div className="flex items-center justify-between text-xs mt-2">
                <div className="flex gap-2">
                  {bank.fdic && <FDICBadge />}
                  {bank.noFee && <span className="px-2 py-0.5 rounded-full" style={{ background: '#d1fae5', color: '#064e3b' }}>No Fee</span>}
                </div>
                <a
                  href={bank.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg text-white font-medium"
                  style={{ background: '#10b981' }}
                >
                  {labels.apply}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
