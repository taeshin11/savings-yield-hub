'use client';

import { useState } from 'react';

interface APYCalculatorProps {
  labels: {
    title: string;
    subtitle: string;
    initialDeposit: string;
    monthlyContribution: string;
    apy: string;
    years: string;
    calculate: string;
    totalBalance: string;
    totalInterest: string;
    principal: string;
  };
}

function calculateAPY(principal: number, monthlyContrib: number, apy: number, years: number) {
  const r = apy / 100;
  const n = 12;
  const t = years;
  const compoundP = principal * Math.pow(1 + r / n, n * t);
  const compoundPMT = monthlyContrib > 0 ? monthlyContrib * ((Math.pow(1 + r / n, n * t) - 1) / (r / n)) : 0;
  const total = compoundP + compoundPMT;
  const interest = total - principal - monthlyContrib * 12 * t;
  return { total, interest };
}

export default function APYCalculator({ labels }: APYCalculatorProps) {
  const [principal, setPrincipal] = useState(10000);
  const [monthly, setMonthly] = useState(200);
  const [apy, setApy] = useState(4.75);
  const [years, setYears] = useState(5);
  const [result, setResult] = useState<{ total: number; interest: number } | null>(null);

  const handleCalculate = () => {
    const r = calculateAPY(principal, monthly, apy, years);
    setResult(r);
  };

  return (
    <div className="bg-white rounded-2xl border p-6 shadow-sm" style={{ borderColor: '#d1fae5' }}>
      <h2 className="text-xl font-bold mb-1" style={{ color: '#064e3b' }}>{labels.title}</h2>
      <p className="text-sm mb-5" style={{ color: '#6b7280' }}>{labels.subtitle}</p>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#064e3b' }}>{labels.initialDeposit}</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none"
            style={{ borderColor: '#d1fae5' }}
            min={0}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#064e3b' }}>{labels.monthlyContribution}</label>
          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none"
            style={{ borderColor: '#d1fae5' }}
            min={0}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#064e3b' }}>{labels.apy}</label>
          <input
            type="number"
            value={apy}
            onChange={(e) => setApy(Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none"
            style={{ borderColor: '#d1fae5' }}
            step={0.01}
            min={0}
            max={20}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#064e3b' }}>{labels.years}</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none"
            style={{ borderColor: '#d1fae5' }}
            min={1}
            max={50}
          />
        </div>
      </div>
      <button
        onClick={handleCalculate}
        className="w-full py-3 rounded-xl font-semibold text-white transition-colors mb-4"
        style={{ background: '#10b981' }}
      >
        {labels.calculate}
      </button>
      {result && (
        <div className="grid grid-cols-3 gap-3 mt-2">
          <div className="rounded-xl p-4 text-center" style={{ background: '#ecfdf5' }}>
            <p className="text-xs font-medium mb-1" style={{ color: '#6b7280' }}>{labels.principal}</p>
            <p className="text-lg font-bold" style={{ color: '#064e3b' }}>${(principal + monthly * 12 * years).toLocaleString()}</p>
          </div>
          <div className="rounded-xl p-4 text-center" style={{ background: '#ecfdf5' }}>
            <p className="text-xs font-medium mb-1" style={{ color: '#6b7280' }}>{labels.totalInterest}</p>
            <p className="text-lg font-bold" style={{ color: '#10b981' }}>${Math.round(result.interest).toLocaleString()}</p>
          </div>
          <div className="rounded-xl p-4 text-center" style={{ background: '#d1fae5' }}>
            <p className="text-xs font-medium mb-1" style={{ color: '#6b7280' }}>{labels.totalBalance}</p>
            <p className="text-lg font-bold" style={{ color: '#064e3b' }}>${Math.round(result.total).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}
