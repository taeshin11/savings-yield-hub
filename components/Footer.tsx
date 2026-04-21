'use client';

import { useEffect, useState } from 'react';
import { getAndIncrementVisitor } from '@/lib/visitorCounter';

interface FooterProps {
  labels: {
    visitorToday: string;
    visitorTotal: string;
    disclaimer: string;
    fdic: string;
    copyright: string;
  };
}

export default function Footer({ labels }: FooterProps) {
  const [visitor, setVisitor] = useState<{ today: number; total: number } | null>(null);

  useEffect(() => {
    getAndIncrementVisitor().then(setVisitor).catch(() => {});
  }, []);

  return (
    <footer className="border-t mt-16" style={{ borderColor: '#d1fae5', background: '#ffffff' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-4">
          <p className="text-sm font-bold mb-1" style={{ color: '#064e3b' }}>💰 SavingsYieldHub</p>
          <p className="text-xs" style={{ color: '#6b7280' }}>Best HYSA, CD & Money Market Rates — Updated Daily</p>
        </div>
        {visitor && (
          <p className="text-xs text-center py-2" style={{ color: '#6b7280' }}>
            {labels.visitorToday}: <span className="font-semibold">{visitor.today.toLocaleString()}</span>
            {' · '}
            {labels.visitorTotal}: <span className="font-semibold">{visitor.total.toLocaleString()}</span>
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-4 mt-4 mb-4">
          {[
            { href: `/en/about`, label: 'About Us' },
            { href: `/en/how-to-use`, label: 'How to Use' },
            { href: `/en/privacy`, label: 'Privacy Policy' },
            { href: `/en/terms`, label: 'Terms of Service' },
          ].map((link) => (
            <a key={link.href} href={link.href} className="text-xs hover:underline" style={{color:'#064e3b'}}>{link.label}</a>
          ))}
        </div>
        <div className="text-xs text-center mt-4 space-y-2 max-w-2xl mx-auto" style={{ color: '#6b7280' }}>
          <p>{labels.disclaimer}</p>
          <p>{labels.fdic}</p>
          <p className="pt-2">{labels.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
