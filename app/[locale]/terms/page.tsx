import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Terms of Service | SavingsYieldHub',
  description: 'Terms of Service for SavingsYieldHub savings rate comparison platform.',
};
export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2" style={{color:'#064e3b'}}>Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: April 13, 2026</p>
      <div className="space-y-8 text-gray-700">
        <section><h2 className="text-xl font-semibold mb-3" style={{color:'#064e3b'}}>1. Acceptance</h2><p>By using SavingsYieldHub, you agree to these terms. If you disagree, please discontinue use.</p></section>
        <section><h2 className="text-xl font-semibold mb-3" style={{color:'#064e3b'}}>2. Service Description</h2><p>SavingsYieldHub is a free rate comparison service. We are not a bank, financial institution, or financial advisor. Rate information is for educational purposes only.</p></section>
        <section><h2 className="text-xl font-semibold mb-3" style={{color:'#064e3b'}}>3. Disclaimer</h2><p>Rates displayed are gathered from public sources and may not reflect actual rates available to you. Individual rates depend on creditworthiness, deposit amounts, and other factors. Always verify rates directly with the bank before opening an account.</p></section>
        <section><h2 className="text-xl font-semibold mb-3" style={{color:'#064e3b'}}>4. No Financial Advice</h2><p>Nothing on this site constitutes financial advice. Consult a licensed financial advisor before making savings or investment decisions.</p></section>
        <section><h2 className="text-xl font-semibold mb-3" style={{color:'#064e3b'}}>5. Prohibited Uses</h2><p>You may not scrape data, use automated bots, reproduce content commercially, or interfere with site operation.</p></section>
        <section><h2 className="text-xl font-semibold mb-3" style={{color:'#064e3b'}}>6. Limitation of Liability</h2><p>SavingsYieldHub is not liable for losses resulting from reliance on rate information or decisions made based on our data.</p></section>
        <section><h2 className="text-xl font-semibold mb-3" style={{color:'#064e3b'}}>7. Changes</h2><p>We may update these terms at any time. Continued use constitutes acceptance of updated terms.</p></section>
        <section><h2 className="text-xl font-semibold mb-3" style={{color:'#064e3b'}}>8. Contact</h2><p>Legal questions: <strong>legal@savingsyieldhub.com</strong></p></section>
      </div>
    </div>
  );
}
