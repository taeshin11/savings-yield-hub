import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'About Us | SavingsYieldHub',
  description: 'SavingsYieldHub helps you find the best high-yield savings, CD, and money market rates from FDIC-insured banks. Updated daily.',
};
export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6" style={{color:'#064e3b'}}>About SavingsYieldHub</h1>
      <div className="space-y-6 text-gray-700">
        <p className="text-lg">SavingsYieldHub is a free financial comparison platform dedicated to helping Americans maximize their savings by finding the highest-yielding FDIC-insured savings accounts, certificates of deposit (CDs), and money market accounts.</p>
        <h2 className="text-2xl font-semibold mt-8" style={{color:'#064e3b'}}>Our Mission</h2>
        <p>With inflation eroding purchasing power, keeping money in low-yield accounts is costly. We simplify the process of finding competitive rates so your money works harder for you.</p>
        <h2 className="text-2xl font-semibold mt-8" style={{color:'#064e3b'}}>What We Track</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>High-Yield Savings Accounts (HYSA) — APY up to 5%+</li>
          <li>Certificates of Deposit (CDs) — 3-month to 5-year terms</li>
          <li>Money Market Accounts</li>
          <li>Jumbo CDs for large deposits</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8" style={{color:'#064e3b'}}>FDIC Insurance</h2>
        <p>All accounts listed on SavingsYieldHub are at FDIC-insured institutions. Your deposits are insured up to $250,000 per depositor, per institution, per ownership category.</p>
        <h2 className="text-2xl font-semibold mt-8" style={{color:'#064e3b'}}>Data Sources</h2>
        <p>Rate data is aggregated from publicly available bank rate disclosures, FDIC BankFind data, and direct bank websites. Rates are verified and updated daily.</p>
        <h2 className="text-2xl font-semibold mt-8" style={{color:'#064e3b'}}>Contact</h2>
        <p>Questions? Contact us at: <strong>support@savingsyieldhub.com</strong></p>
      </div>
    </div>
  );
}
