export interface RateHistory {
  bankSlug: string;
  productType: string;
  term?: string;
  date: string;
  apy: number;
}

export interface NationalAverage {
  savingsRate: number;
  source: string;
  lastUpdated: string;
}
