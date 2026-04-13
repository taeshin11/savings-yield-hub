'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';

const locales = [
  { code: 'en', label: 'English' },
  { code: 'ko', label: '한국어' },
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '中文' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'pt', label: 'Português' },
];

interface NavbarProps {
  locale: string;
  nav: {
    home: string;
    hysa: string;
    cd: string;
    moneyMarket: string;
    calculator: string;
    compare: string;
    banks: string;
  };
}

export default function Navbar({ locale, nav }: NavbarProps) {
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    window.location.href = segments.join('/');
    setLangOpen(false);
  };

  const navLinks = [
    { href: `/${locale}`, label: nav.home },
    { href: `/${locale}/products/hysa`, label: nav.hysa },
    { href: `/${locale}/products/cd`, label: nav.cd },
    { href: `/${locale}/products/money-market`, label: nav.moneyMarket },
    { href: `/${locale}/banks`, label: nav.banks },
    { href: `/${locale}/calculator`, label: nav.calculator },
    { href: `/${locale}/compare`, label: nav.compare },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b shadow-sm" style={{ background: '#ffffff', borderColor: '#d1fae5' }}>
      <div className="container mx-auto px-4 flex items-center justify-between h-14">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-lg" style={{ color: '#064e3b' }}>
          <span className="text-2xl">💰</span>
          <span className="hidden sm:inline">SavingsYieldHub</span>
          <span className="sm:hidden">SYH</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-green-50"
              style={{ color: '#064e3b' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm border transition-colors hover:bg-green-50"
              style={{ borderColor: '#d1fae5', color: '#064e3b' }}
            >
              <Globe size={14} />
              <span className="uppercase font-semibold">{locale}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-1 bg-white border rounded-xl shadow-lg z-50 min-w-32" style={{ borderColor: '#d1fae5' }}>
                {locales.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => switchLocale(l.code)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-green-50 first:rounded-t-xl last:rounded-b-xl ${l.code === locale ? 'font-bold' : ''}`}
                    style={{ color: '#064e3b' }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-1.5 rounded-lg"
            style={{ color: '#064e3b' }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t px-4 py-3 space-y-1" style={{ borderColor: '#d1fae5', background: '#ffffff' }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-50"
              style={{ color: '#064e3b' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
