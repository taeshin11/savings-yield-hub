import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SavingsYieldHub — Best HYSA, CD & Money Market Rates',
  description: 'Compare the best savings account rates from FDIC-insured banks.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
