import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Privacy Policy | SavingsYieldHub',
  description: 'Privacy Policy for SavingsYieldHub. Learn how we protect your data.',
};
export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2" style={{color:'#064e3b'}}>Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: April 13, 2026</p>
      <div className="space-y-8 text-gray-700">
        <section><h2 className="text-xl font-semibold mb-3" style={{color:'#064e3b'}}>1. Information We Collect</h2><p>SavingsYieldHub does not require registration. We automatically collect anonymized usage data including: pages viewed, browser type, general geographic location (country level), and referring sites. We never collect Social Security numbers, bank account information, or financial credentials.</p></section>
        <section><h2 className="text-xl font-semibold mb-3" style={{color:'#064e3b'}}>2. How We Use Information</h2><p>Usage data is used solely to improve site performance, analyze popular content, and enhance the user experience. We do not sell or share personal data with third parties.</p></section>
        <section><h2 className="text-xl font-semibold mb-3" style={{color:'#064e3b'}}>3. Cookies</h2><p>We use essential session cookies and Google Analytics cookies to understand site usage. You can control cookies through your browser settings. Disabling cookies does not affect your ability to view rates.</p></section>
        <section><h2 className="text-xl font-semibold mb-3" style={{color:'#064e3b'}}>4. Advertising</h2><p>We display ads through Google AdSense. Google may use cookies to show relevant ads based on your browsing history. You can opt out at <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline">google.com/settings/ads</a>.</p></section>
        <section><h2 className="text-xl font-semibold mb-3" style={{color:'#064e3b'}}>5. Third-Party Links</h2><p>Our site links to bank websites. We are not responsible for their privacy practices. Review each bank&apos;s privacy policy before opening an account.</p></section>
        <section><h2 className="text-xl font-semibold mb-3" style={{color:'#064e3b'}}>6. Security</h2><p>All connections to SavingsYieldHub use HTTPS encryption. We implement industry-standard security measures to protect our systems.</p></section>
        <section><h2 className="text-xl font-semibold mb-3" style={{color:'#064e3b'}}>7. Contact</h2><p>Privacy questions: <strong>privacy@savingsyieldhub.com</strong></p></section>
      </div>
    </div>
  );
}
