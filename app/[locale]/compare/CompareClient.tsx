'use client';

import { useState } from 'react';
import FDICBadge from '@/components/FDICBadge';
import type { Bank } from '@/types/bank';

interface CompareClientProps {
  banks: Bank[];
  locale: string;
  selectLabel: string;
  vsLabel: string;
  applyLabel: string;
}

function BankColumn({ bank, applyLabel }: { bank: Bank; applyLabel: string }) {
  const rows = [
    { label: 'HYSA APY', value: bank.hysaApy > 0 ? `${bank.hysaApy.toFixed(2)}%` : '—' },
    { label: '3-Month CD', value: bank.cd3m > 0 ? `${bank.cd3m.toFixed(2)}%` : '—' },
    { label: '6-Month CD', value: bank.cd6m > 0 ? `${bank.cd6m.toFixed(2)}%` : '—' },
    { label: '1-Year CD', value: bank.cd1yr > 0 ? `${bank.cd1yr.toFixed(2)}%` : '—' },
    { label: '2-Year CD', value: bank.cd2yr > 0 ? `${bank.cd2yr.toFixed(2)}%` : '—' },
    { label: '5-Year CD', value: bank.cd5yr > 0 ? `${bank.cd5yr.toFixed(2)}%` : '—' },
    { label: 'Money Market', value: bank.moneyMarket > 0 ? `${bank.moneyMarket.toFixed(2)}%` : '—' },
    { label: 'Min. Deposit', value: bank.minDeposit === 0 ? '$0' : `$${bank.minDeposit.toLocaleString()}` },
    { label: 'No Monthly Fee', value: bank.noFee ? '✓' : '✗' },
    { label: 'No Minimum', value: bank.noMinimum ? '✓' : '✗' },
    { label: 'FDIC Insured', value: bank.fdic ? '✓' : '✗' },
  ];

  return (
    <div className="flex-1 bg-white rounded-2xl border overflow-hidden" style={{ borderColor: '#d1fae5' }}>
      <div className="p-4 text-center" style={{ background: '#ecfdf5' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://logo.clearbit.com/${bank.domain}`}
          alt={bank.name}
          width={50}
          height={50}
          className="rounded-xl mx-auto mb-2 object-contain"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <h3 className="font-bold text-sm" style={{ color: '#064e3b' }}>{bank.name}</h3>
        {bank.fdic && <FDICBadge />}
      </div>
      <div className="divide-y" style={{ borderColor: '#d1fae5' }}>
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between px-4 py-2.5 text-sm">
            <span style={{ color: '#6b7280' }}>{row.label}</span>
            <span className="font-semibold" style={{ color: row.value.includes('%') ? '#10b981' : '#064e3b' }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
      <div className="p-4">
        <a
          href={bank.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center py-2.5 rounded-xl text-white font-semibold text-sm"
          style={{ background: '#10b981' }}
        >
          {applyLabel}
        </a>
      </div>
    </div>
  );
}

export default function CompareClient({ banks, selectLabel, vsLabel, applyLabel }: CompareClientProps) {
  const [bank1Slug, setBank1Slug] = useState(banks[0]?.slug || '');
  const [bank2Slug, setBank2Slug] = useState(banks[1]?.slug || '');

  const bank1 = banks.find((b) => b.slug === bank1Slug);
  const bank2 = banks.find((b) => b.slug === bank2Slug);

  return (
    <div>
      {/* Selectors */}
      <div className="flex items-center gap-4 mb-6">
        <select
          value={bank1Slug}
          onChange={(e) => setBank1Slug(e.target.value)}
          className="flex-1 border rounded-xl px-3 py-2 text-sm"
          style={{ borderColor: '#d1fae5', color: '#064e3b' }}
        >
          <option value="">{selectLabel}</option>
          {banks.map((b) => <option key={b.slug} value={b.slug}>{b.name}</option>)}
        </select>
        <span className="font-bold text-lg px-2" style={{ color: '#6b7280' }}>{vsLabel}</span>
        <select
          value={bank2Slug}
          onChange={(e) => setBank2Slug(e.target.value)}
          className="flex-1 border rounded-xl px-3 py-2 text-sm"
          style={{ borderColor: '#d1fae5', color: '#064e3b' }}
        >
          <option value="">{selectLabel}</option>
          {banks.map((b) => <option key={b.slug} value={b.slug}>{b.name}</option>)}
        </select>
      </div>

      {/* Comparison columns */}
      {bank1 && bank2 && (
        <div className="flex gap-4">
          <BankColumn bank={bank1} applyLabel={applyLabel} />
          <div className="flex items-center px-2">
            <span className="text-lg font-bold" style={{ color: '#6b7280' }}>{vsLabel}</span>
          </div>
          <BankColumn bank={bank2} applyLabel={applyLabel} />
        </div>
      )}
    </div>
  );
}
