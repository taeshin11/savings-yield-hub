import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'How to Use & FAQ | SavingsYieldHub',
  description: 'Learn how to compare high-yield savings rates, understand APY vs APR, and choose the best savings account for your needs.',
};
export default function HowToUsePage() {
  const faqs = [
    { q: 'What is APY?', a: 'APY (Annual Percentage Yield) is the effective annual return on your savings, including compound interest. It\'s the most accurate way to compare savings account rates. Higher APY = more money in your pocket.' },
    { q: 'What is a High-Yield Savings Account (HYSA)?', a: 'A HYSA is a federally-insured savings account that pays significantly higher interest than traditional savings accounts. Online banks typically offer the highest rates due to lower overhead costs.' },
    { q: 'Is my money safe in an online bank?', a: 'Yes, as long as the bank is FDIC-insured. The FDIC insures up to $250,000 per depositor, per institution. All banks listed on SavingsYieldHub are FDIC-insured.' },
    { q: 'What\'s the difference between a HYSA and a CD?', a: 'A HYSA offers flexible access to your money with variable rates. A CD (Certificate of Deposit) locks your money for a fixed term (3 months to 5 years) at a guaranteed rate. CDs typically offer higher rates but penalize early withdrawal.' },
    { q: 'How often do savings rates change?', a: 'Savings rates are variable and can change at any time, typically in response to Federal Reserve policy decisions. CD rates are fixed for the entire term once you open the account.' },
    { q: 'What is a money market account?', a: 'A money market account is a hybrid between a checking and savings account. It often pays higher rates than regular savings accounts and may come with check-writing privileges or a debit card.' },
    { q: 'How much does it cost to use SavingsYieldHub?', a: 'SavingsYieldHub is completely free. We never charge fees, and we don\'t require registration or personal information to view rates.' },
    { q: 'Should I open accounts at multiple banks?', a: 'Spreading savings across multiple banks can maximize FDIC coverage and allow you to take advantage of the best rates at each institution. Our compare tool helps you evaluate multiple options simultaneously.' },
  ];
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4" style={{color:'#064e3b'}}>How to Use SavingsYieldHub</h1>
      <p className="text-lg text-gray-600 mb-12">Find the best savings rate in 3 easy steps.</p>
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          { step: '1', title: 'Browse Rates', desc: 'View current APYs for HYSAs, CDs, and money market accounts from dozens of banks side by side.' },
          { step: '2', title: 'Filter & Compare', desc: 'Filter by account type, term, or minimum deposit. Use our compare tool to evaluate up to 4 accounts simultaneously.' },
          { step: '3', title: 'Open Account', desc: 'Click through to the bank\'s official site to open your account. The process typically takes 5-10 minutes online.' },
        ].map((item) => (
          <div key={item.step} className="card p-6 text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center font-bold text-white text-lg" style={{background:'#064e3b'}}>{item.step}</div>
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold mb-8" style={{color:'#064e3b'}}>Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="card p-6">
            <h3 className="font-semibold mb-2">{faq.q}</h3>
            <p className="text-gray-600 text-sm">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
