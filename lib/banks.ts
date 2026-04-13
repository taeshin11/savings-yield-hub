import type { Bank } from '@/types/bank';
import fallbackData from '@/data/banks-fallback.json';

export async function getAllBanks(): Promise<Bank[]> {
  const sheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_BANKS_CSV;
  if (sheetUrl) {
    try {
      const res = await fetch(sheetUrl, { next: { revalidate: 86400 } });
      if (res.ok) {
        const text = await res.text();
        const rows = text.trim().split('\n').slice(1);
        return rows.map((row) => {
          const cols = row.split(',');
          return {
            slug: cols[0]?.trim() || '',
            name: cols[1]?.trim() || '',
            hysaApy: parseFloat(cols[2]) || 0,
            cd3m: parseFloat(cols[3]) || 0,
            cd6m: parseFloat(cols[4]) || 0,
            cd1yr: parseFloat(cols[5]) || 0,
            cd2yr: parseFloat(cols[6]) || 0,
            cd5yr: parseFloat(cols[7]) || 0,
            moneyMarket: parseFloat(cols[8]) || 0,
            minDeposit: parseFloat(cols[9]) || 0,
            noFee: cols[10]?.trim() === 'true',
            noMinimum: cols[11]?.trim() === 'true',
            applyUrl: cols[12]?.trim() || '',
            fdic: cols[13]?.trim() === 'true',
            domain: cols[14]?.trim() || '',
          };
        }).filter((b) => b.slug);
      }
    } catch {
      // fall through to fallback
    }
  }
  return fallbackData as Bank[];
}

export async function getBankBySlug(slug: string): Promise<Bank | undefined> {
  const banks = await getAllBanks();
  return banks.find((b) => b.slug === slug);
}

export function getTopHYSA(banks: Bank[], limit = 10): Bank[] {
  return [...banks].sort((a, b) => b.hysaApy - a.hysaApy).slice(0, limit);
}

export function getTopCD1yr(banks: Bank[], limit = 10): Bank[] {
  return [...banks].sort((a, b) => b.cd1yr - a.cd1yr).slice(0, limit);
}

export function getTopMoneyMarket(banks: Bank[], limit = 10): Bank[] {
  return [...banks].filter((b) => b.moneyMarket > 0).sort((a, b) => b.moneyMarket - a.moneyMarket).slice(0, limit);
}

export function getTopCDByTerm(banks: Bank[], term: string, limit = 10): Bank[] {
  const key = termToKey(term);
  return [...banks]
    .filter((b) => (b[key] as number) > 0)
    .sort((a, b) => {
      const aVal = a[key] as number;
      const bVal = b[key] as number;
      return bVal - aVal;
    })
    .slice(0, limit);
}

export function termToKey(term: string): keyof Bank {
  const map: Record<string, keyof Bank> = {
    '3-month': 'cd3m',
    '6-month': 'cd6m',
    '1-year': 'cd1yr',
    '2-year': 'cd2yr',
    '5-year': 'cd5yr',
  };
  return map[term] || 'cd1yr';
}
