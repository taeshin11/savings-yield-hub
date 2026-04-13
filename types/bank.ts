export interface Bank {
  slug: string;
  name: string;
  hysaApy: number;
  cd3m: number;
  cd6m: number;
  cd1yr: number;
  cd2yr: number;
  cd5yr: number;
  moneyMarket: number;
  minDeposit: number;
  noFee: boolean;
  noMinimum: boolean;
  applyUrl: string;
  fdic: boolean;
  domain: string;
}

export type ProductType = 'hysa' | 'cd' | 'money-market';
export type CDTerm = '3-month' | '6-month' | '1-year' | '2-year' | '5-year';

export interface RateEntry {
  bank: Bank;
  apy: number;
  product: string;
  term?: string;
}
