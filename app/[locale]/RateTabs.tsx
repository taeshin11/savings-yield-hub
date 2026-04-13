'use client';

import { useState } from 'react';
import RateTable from '@/components/RateTable';
import type { Bank } from '@/types/bank';

interface RateTabsProps {
  banks: Bank[];
  tableLabels: {
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
  locale: string;
  t: (key: string) => string;
}

const TABS = ['hysa', 'cd', 'money-market'] as const;

export default function RateTabs({ banks, tableLabels, t }: RateTabsProps) {
  const [activeTab, setActiveTab] = useState<'hysa' | 'cd' | 'money-market'>('hysa');
  const [cdTerm, setCdTerm] = useState('1-year');

  const tabLabels = {
    hysa: t('tabs.hysa'),
    cd: t('tabs.cd'),
    'money-market': t('tabs.moneyMarket'),
  };

  const cdTerms = ['3-month', '6-month', '1-year', '2-year', '5-year'];

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex gap-2 mb-5">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2 rounded-xl font-semibold text-sm transition-colors"
            style={
              activeTab === tab
                ? { background: '#10b981', color: '#ffffff' }
                : { background: '#ffffff', color: '#064e3b', border: '1px solid #d1fae5' }
            }
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      {/* CD Term selector */}
      {activeTab === 'cd' && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {cdTerms.map((term) => (
            <button
              key={term}
              onClick={() => setCdTerm(term)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={
                cdTerm === term
                  ? { background: '#064e3b', color: '#ffffff' }
                  : { background: '#ecfdf5', color: '#064e3b' }
              }
            >
              {term}
            </button>
          ))}
        </div>
      )}

      <RateTable
        banks={banks}
        type={activeTab}
        term={activeTab === 'cd' ? cdTerm : undefined}
        labels={tableLabels}
      />
    </div>
  );
}
