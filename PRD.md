# SavingsYieldHub — PRD
# Best Savings & CD Rates Today

---

## Overview

**Service Name:** SavingsYieldHub  
**Tagline:** Find the Best HYSA, CD & Money Market Rates — Updated Daily  
**Domain suggestion:** savingsyieldhub.com (or Vercel subdomain for dev)  
**Folder:** `C:\MakingApps\260413\savings-yield-hub\`  
**GitHub Repo:** `taeshin11/savings-yield-hub` (create via `gh repo create`)  
**Deploy:** Vercel (`npx vercel --prod`)  
**Backend (if needed):** Railway free tier  

SavingsYieldHub is a programmatic SEO site that tracks and displays the best high-yield savings account (HYSA), CD (Certificate of Deposit), and money market rates from FDIC-insured US banks. It targets users searching for where to park cash for maximum yield. The site generates pages per bank, per product type, and per term length, creating a massive SEO footprint with zero API cost (data is manually curated and FDIC-sourced).

---

## Target Users & Pain Points

| User Segment | Pain Point |
|---|---|
| Savers with idle cash | Don't know which bank offers the best APY today |
| CD ladder investors | Need to compare 3mo/6mo/1yr/2yr/5yr CD rates across banks |
| Inflation-conscious consumers | Want to beat inflation with HYSA vs. traditional savings |
| Retirees | Need safe, FDIC-insured high-yield options |
| Young professionals | First time setting up a high-yield savings account |

**Core user intent:** "What is the best savings account rate today?" / "Which bank has the highest CD rate for 12 months?"

---

## Core Features

| ID | Feature | Priority | Status |
|---|---|---|---|
| F01 | Homepage rate leaderboard — top 10 HYSA, CD, money market rates | P0 | TODO |
| F02 | Bank detail pages `/banks/[slug]` — all products + history | P0 | TODO |
| F03 | Product type pages `/products/[type]` — HYSA / CD / money-market | P0 | TODO |
| F04 | CD term pages `/products/cd/[term]` — 3mo/6mo/1yr/2yr/5yr | P0 | TODO |
| F05 | APY calculator `/calculator` — compute earnings over time | P0 | TODO |
| F06 | Rate history chart per bank (Chart.js, stored in Google Sheet) | P1 | TODO |
| F07 | Rate change alerts — email subscription via Formspree | P2 | TODO |
| F08 | Bank compare tool (2 banks side by side) | P1 | TODO |
| F09 | FDIC bank info badge (FDIC-insured, deposit limit display) | P0 | TODO |
| F10 | Visitor counter (today + total) in footer | P0 | TODO |
| F11 | i18n (8 languages) via next-intl | P0 | TODO |
| F12 | Google Sheets webhook on every user interaction | P0 | TODO |
| F13 | Adsterra ad placements (Social Bar, Native Banner, Display) | P0 | TODO |
| F14 | Schema.org JSON-LD (FinancialProduct, Organization, FAQPage) | P0 | TODO |
| F15 | Sitemap.xml + robots.txt auto-generated | P0 | TODO |
| F16 | hreflang tags for all 8 language variants | P0 | TODO |
| F17 | Google Sheets as bank rate CMS | P0 | TODO |
| F18 | FDIC BankFind API for bank verification and metadata | P1 | TODO |
| F19 | research_history/ folder with milestone logs | P0 | TODO |
| F20 | "Best of" curated lists (best no-fee, best no-minimum, etc.) | P1 | TODO |

---

## Tech Stack

```
Framework:        Next.js 14 (App Router, SSG + ISR every 24h)
Styling:          Tailwind CSS v3
Charts:           Chart.js + react-chartjs-2
i18n:             next-intl
Data - Banks:     Google Sheets (public CSV export) + FDIC BankFind API
Data - Rates:     Google Sheets CMS (daily manual/scripted updates)
Icons:            Lucide React
Deployment:       Vercel (npx vercel --prod)
Repo:             GitHub (gh repo create taeshin11/savings-yield-hub --public)
Analytics:        Vercel Analytics (free tier)
Forms:            Formspree free tier (rate alerts)
Visitor Counter:  Vercel KV free tier or Railway JSON endpoint
```

### Environment Variables (`.env.local`)
```
NEXT_PUBLIC_GOOGLE_SHEET_BANKS_CSV=    # Public Google Sheet CSV — bank rate data
NEXT_PUBLIC_GOOGLE_SHEET_HISTORY_CSV=  # Public Google Sheet CSV — rate history
NEXT_PUBLIC_GS_WEBHOOK_URL=            # Google Apps Script webhook URL
FDIC_API_BASE=https://banks.data.fdic.gov/api
NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR=       # TODO: add after key received
NEXT_PUBLIC_ADSTERRA_NATIVE=           # TODO: add after key received
NEXT_PUBLIC_ADSTERRA_DISPLAY=          # TODO: add after key received
```

---

## Data Sources (Free Only)

### 1. Google Sheets as Rate CMS (Primary)
**Sheet structure — "Bank Rates" tab:**
```
bank_slug | bank_name | product_type | term | apy | min_deposit | 
max_deposit | monthly_fee | fdic_cert | apply_url | logo_url | 
notes | last_updated | is_featured | no_fee | no_minimum
```

**Sheet structure — "Rate History" tab:**
```
bank_slug | product_type | term | date | apy
```

- Publish both tabs as separate CSV URLs
- Update daily (manually or via a Google Apps Script timer)
- Fetch at build time with `revalidate: 86400` (ISR)

**Initial bank data (minimum 20 banks):**
Marcus by Goldman Sachs, Ally Bank, American Express National Bank, Discover Bank, Capital One 360, SoFi Bank, Synchrony Bank, Bread Savings, Barclays Online, LendingClub, CIT Bank, Sallie Mae Bank, Bask Bank, UFB Direct, Popular Direct, TAB Bank, Vio Bank, Quontic Bank, Ponce Bank, Western Alliance

### 2. FDIC BankFind API (Free, No Auth)
```
Base URL: https://banks.data.fdic.gov/api
Endpoints:
  /institutions?filters=NAME:${bankName}&limit=1&fields=NAME,CERT,CITY,STALP,ASSET,INSDATE
  /history?filters=CERT:${cert}&fields=INSTNAME,CLASS,PCITY,PSTALP
```
Use to: Verify FDIC insurance status, display cert number, show founding date, asset size.

### 3. Federal Reserve H.15 (Static Reference)
- National average savings rate (0.46% as of early 2024) for comparison context
- Fetch weekly from: `https://www.federalreserve.gov/releases/h15/`
- Store in `data/national-average.json`, update manually

### 4. Static Fallback
- `data/banks-fallback.json` — snapshot of bank rates if Sheet unavailable

---

## Page Structure & SEO

### Routes

| Route | Purpose | Primary Keywords |
|---|---|---|
| `/` | Homepage — top rates leaderboard + type nav | "best savings account rates today", "highest APY" |
| `/banks` | All banks index | "savings account comparison", "bank comparison" |
| `/banks/[slug]` | Per-bank detail — all products + rate history | "[bank name] savings rate", "[bank] CD rates" |
| `/products` | Product types overview | "types of savings accounts" |
| `/products/hysa` | HYSA deep dive | "high yield savings account", "best HYSA 2024" |
| `/products/cd` | CD overview + term nav | "certificate of deposit rates", "best CD rates" |
| `/products/cd/3-month` | 3-month CD rates | "3 month CD rates today" |
| `/products/cd/6-month` | 6-month CD rates | "6 month CD rates" |
| `/products/cd/1-year` | 1-year CD rates | "1 year CD rates today" |
| `/products/cd/2-year` | 2-year CD rates | "2 year CD rates" |
| `/products/cd/5-year` | 5-year CD rates | "5 year CD rates" |
| `/products/money-market` | Money market rates | "money market account rates" |
| `/calculator` | APY earnings calculator | "savings calculator", "CD calculator", "APY calculator" |
| `/compare` | Bank compare tool | "bank rate comparison" |
| `/sitemap.xml` | Auto-generated | — |
| `/robots.txt` | Allow all | — |

### SEO Implementation
```tsx
// generateMetadata for /banks/[slug]:
export async function generateMetadata({ params }) {
  const bank = getBankBySlug(params.slug);
  return {
    title: `${bank.name} Savings Rates Today — APY ${bank.topApy}% | SavingsYieldHub`,
    description: `${bank.name} current savings rates: HYSA ${bank.hysaApy}% APY, 1-year CD ${bank.cd1yr}% APY. FDIC insured. Compare all ${bank.name} products.`,
    openGraph: {
      title: `${bank.name} Rates | SavingsYieldHub`,
      description: `Best rates from ${bank.name} — updated daily.`,
      type: 'website',
    },
    alternates: {
      canonical: `https://savingsyieldhub.com/banks/${params.slug}`,
      languages: {
        'en': `/en/banks/${params.slug}`,
        'ko': `/ko/banks/${params.slug}`,
        'ja': `/ja/banks/${params.slug}`,
        'zh': `/zh/banks/${params.slug}`,
        'es': `/es/banks/${params.slug}`,
        'fr': `/fr/banks/${params.slug}`,
        'de': `/de/banks/${params.slug}`,
        'pt': `/pt/banks/${params.slug}`,
      }
    }
  }
}
```

### Schema.org JSON-LD
```json
// For bank pages — FinancialProduct schema:
{
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  "name": "Ally Bank Online Savings Account",
  "description": "High-yield savings account with 4.50% APY, no monthly fees, FDIC insured",
  "provider": {
    "@type": "BankOrCreditUnion",
    "name": "Ally Bank",
    "url": "https://ally.com"
  },
  "annualPercentageRate": "4.50",
  "feesAndCommissionsSpecification": "No monthly fees",
  "amount": {
    "@type": "MonetaryAmount",
    "minValue": "0",
    "currency": "USD"
  }
}
```

- **Homepage:** `WebSite` + `ItemList` (top rates) + `FAQPage`
- **Product pages:** `FinancialProduct` + `BreadcrumbList`
- **Calculator:** `WebApplication`

### Sitemap Auto-generation (`app/sitemap.ts`)
```ts
// Static routes: /, /banks, /products, /products/hysa, /products/cd, 
//   /products/money-market, /calculator, /compare
// + CD term pages (5): /products/cd/[3-month|6-month|1-year|2-year|5-year]
// + Dynamic: /banks/[slug] for each bank (fetched from Sheet)
// + All × 8 locales
```

---

## UI/UX Guidelines

### Color Palette (Soft Pastel — Finance-positive)
```css
--bg-primary:      #f0fdf4;   /* soft mint green — wealth, growth */
--bg-card:         #ffffff;
--bg-accent:       #ecfdf5;   /* pale emerald */
--bg-highlight:    #d1fae5;   /* light green for top-rate cards */
--text-primary:    #064e3b;   /* deep green for primary text */
--text-secondary:  #6b7280;
--accent-gold:     #f59e0b;   /* featured/top-rate badge */
--accent-green:    #10b981;   /* APY positive */
--border:          #d1fae5;
--badge-fdic:      #dbeafe;   /* FDIC insured blue badge */
```

### Layout
- **Homepage Hero:** Large "Today's Top Rates" with 3 tabs (HYSA | CD | Money Market)
- **Rate Leaderboard Table:** Rank | Bank Logo | Product | APY | Min Deposit | No Fees | Apply button
- Each row has: APY highlighted in large green text, FDIC badge, trend arrow (up/down/flat)
- **Sticky nav:** Logo | HYSA | CDs | Money Market | Calculator | Compare | Lang switcher
- **Filter bar:** Filter by min deposit ($0, $500, $1k, $5k+), no-fee toggle, term (for CDs)
- **Rate history chart** (below leaderboard): interactive Chart.js line chart, 12-month view
- **Bank card grid** (below chart): logo, top rate, product count, FDIC badge
- **Footer:** Visitor counter, disclaimer ("rates for informational purposes; verify directly with bank"), legal

### Components
```
components/
  RateLeaderboard.tsx      — main sortable/filterable rate table
  BankCard.tsx             — bank summary card with logo + top APY
  RateHistoryChart.tsx     — Chart.js historical rate line
  APYCalculator.tsx        — compound interest calculator
  FDICBadge.tsx            — FDIC insured trust badge
  ProductTypeTabs.tsx      — HYSA | CD | Money Market tab switcher
  CDTermSelector.tsx       — term filter buttons for CD pages
  CompareWidget.tsx        — 2-column bank comparison
  VisitorCounter.tsx       — footer visitor display
  AdPlaceholder.tsx        — Adsterra slot wrapper
  LanguageSwitcher.tsx     — 8-locale dropdown
  SchemaLD.tsx             — JSON-LD injector
  Breadcrumb.tsx           — SEO breadcrumb
  RateChangeBadge.tsx      — shows +/− weekly change in APY
```

---

## i18n Requirements

**Languages:** en, ko, ja, zh, es, fr, de, pt

### Translation Keys
```json
{
  "nav.home": "Home",
  "nav.hysa": "High-Yield Savings",
  "nav.cd": "CDs",
  "nav.moneyMarket": "Money Market",
  "nav.calculator": "Calculator",
  "nav.compare": "Compare",
  "hero.title": "Best Savings & CD Rates Today",
  "hero.subtitle": "Compare top APYs from FDIC-insured banks",
  "hero.lastUpdated": "Updated daily",
  "table.rank": "Rank",
  "table.bank": "Bank",
  "table.product": "Product",
  "table.apy": "APY",
  "table.minDeposit": "Min. Deposit",
  "table.noFees": "No Fees",
  "table.apply": "Open Account",
  "table.fdic": "FDIC Insured",
  "filter.minDeposit": "Min. Deposit",
  "filter.noFeeOnly": "No-fee accounts only",
  "calculator.title": "Savings Calculator",
  "calculator.initialDeposit": "Initial Deposit",
  "calculator.monthlyContribution": "Monthly Contribution",
  "calculator.apy": "APY (%)",
  "calculator.years": "Years",
  "calculator.calculate": "Calculate",
  "calculator.totalBalance": "Total Balance",
  "calculator.totalInterest": "Interest Earned",
  "footer.visitorToday": "Visitors today",
  "footer.visitorTotal": "Total visitors",
  "footer.disclaimer": "Rates are for informational purposes only. Verify rates directly with each bank.",
  "badge.fdic": "FDIC Insured",
  "badge.noFee": "No Monthly Fee",
  "badge.noMinimum": "No Minimum"
}
```

Provide all 8 locale files with accurate translations (not just English placeholders).

---

## Ad Integration (Adsterra)

### Placement
```jsx
// app/[locale]/layout.tsx — Social Bar in <head>
// TODO: Add Adsterra Social Bar script to <head>
// <script async src="https://[adsterra-social-bar-url]" />

// Homepage — Native Banner below hero tabs
<section className="container mx-auto px-4 my-6">
  <div id="adsterra-native-banner">
    {/* TODO: Replace with Adsterra Native Banner code when key received */}
    <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center text-gray-300 text-sm">
      [Adsterra Native Banner — 300×250 or responsive]
    </div>
  </div>
</section>

// Between leaderboard table and calculator — Display Banner
<div id="adsterra-display-mid" className="my-8 flex justify-center">
  {/* TODO: Add Adsterra Display Banner code when key received */}
  <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center text-gray-300 w-full max-w-3xl">
    [Adsterra Display — 728×90 desktop / 320×50 mobile]
  </div>
</div>
```

---

## Google Sheets Webhook

### Apps Script (deploy once)
```javascript
// Google Apps Script — doPost(e)
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('Events') || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Events');
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.timestamp, data.event_type, data.page, 
    data.locale, data.detail, data.referrer
  ]);
  return ContentService.createTextOutput('OK');
}
```

### Tracked Events
- `page_view` — on every route load
- `apply_click` — when user clicks "Open Account" for any bank
- `calculator_use` — when calculator is submitted
- `compare_start` — when compare tool is opened
- `filter_change` — when filter is changed
- `language_switch` — when locale changed
- `rate_alert_signup` — when email submitted

---

## Visitor Counter

### Implementation
```ts
// lib/visitorCounter.ts
// Client-side: localStorage tracks "today" count with date key
// Server-side: Vercel KV (free tier) stores total count
// API route: POST /api/visitor increments KV, returns total

export async function getAndIncrementVisitor() {
  const today = new Date().toISOString().slice(0, 10);
  const stored = JSON.parse(localStorage.getItem('syh_visitor') || '{}');
  const todayCount = stored.date === today ? stored.today + 1 : 1;
  localStorage.setItem('syh_visitor', JSON.stringify({ date: today, today: todayCount }));
  
  const res = await fetch('/api/visitor', { method: 'POST' });
  const { total } = await res.json();
  return { today: todayCount, total };
}
```

### Footer Display
```jsx
<p className="text-xs text-gray-400 text-center py-2">
  {t('footer.visitorToday')}: <span className="font-semibold">{visitor.today.toLocaleString()}</span>
  {' · '}
  {t('footer.visitorTotal')}: <span className="font-semibold">{visitor.total.toLocaleString()}</span>
</p>
```

---

## Milestones

### M1 — Project Scaffold (Day 1)
**Tasks:**
- [ ] `gh repo create taeshin11/savings-yield-hub --public --clone`
- [ ] `npx create-next-app@latest . --typescript --tailwind --app`
- [ ] `npm install chart.js react-chartjs-2 next-intl lucide-react papaparse`
- [ ] Create `feature_list.json`, `claude-progress.txt`, `init.sh`
- [ ] Create `research_history/` folder + `M1-scaffold.md`
- [ ] Configure Tailwind with mint/green pastel palette
- [ ] Create base `app/layout.tsx` with nav + footer shells
- [ ] Create `.env.local.example`
- [ ] Create folder structure

**Commit:** `M1: scaffold — Next.js 14, Tailwind green pastel, next-intl`
```bash
git add -A && git commit -m "M1: scaffold — Next.js 14, Tailwind green pastel, next-intl" && git push origin main
```

---

### M2 — Data Layer (Day 2)
**Tasks:**
- [ ] Create Google Sheet with bank rate data (20+ banks)
- [ ] Publish sheet as CSV, add URL to `.env.local`
- [ ] Create `lib/banks.ts` — fetch + parse CSV, transform to `BankRate[]` type
- [ ] Create `lib/fdic.ts` — FDIC BankFind API queries
- [ ] Create `data/banks-fallback.json` — offline fallback data
- [ ] Create `data/national-average.json` — Fed H.15 rate benchmark
- [ ] Create `app/api/visitor/route.ts`
- [ ] Create `app/api/rates/route.ts`
- [ ] Write TypeScript types: `types/bank.ts`, `types/rate.ts`
- [ ] Log to `research_history/M2-data-layer.md`

**Commit:** `M2: data layer — Google Sheets CMS, FDIC API, TypeScript types`
```bash
git add -A && git commit -m "M2: data layer — Google Sheets CMS, FDIC API, TypeScript types" && git push origin main
```

---

### M3 — Homepage & Core Components (Day 3)
**Tasks:**
- [ ] Build `app/[locale]/page.tsx` — homepage with leaderboard
- [ ] Build `components/RateLeaderboard.tsx` (sortable, filterable)
- [ ] Build `components/ProductTypeTabs.tsx` (HYSA | CD | Money Market)
- [ ] Build `components/BankCard.tsx`
- [ ] Build `components/RateHistoryChart.tsx`
- [ ] Build `components/FDICBadge.tsx`
- [ ] Add all 8 locale JSON files
- [ ] Implement `LanguageSwitcher.tsx`
- [ ] Implement `VisitorCounter.tsx`
- [ ] Add Adsterra placeholder divs
- [ ] Wire Google Sheets webhook
- [ ] Log to `research_history/M3-homepage.md`

**Commit:** `M3: homepage — leaderboard, charts, FDIC badges, i18n, visitor counter`
```bash
git add -A && git commit -m "M3: homepage — leaderboard, charts, FDIC badges, i18n, visitor counter" && git push origin main
```

---

### M4 — Programmatic SEO Pages (Day 4)
**Tasks:**
- [ ] Build `/banks` index page
- [ ] Build `/banks/[slug]` with `generateStaticParams`
- [ ] Build `/products/hysa`, `/products/cd`, `/products/money-market`
- [ ] Build `/products/cd/[term]` for 5 terms
- [ ] Add `generateMetadata()` to all pages with hreflang
- [ ] Add Schema.org JSON-LD (FinancialProduct, BreadcrumbList, FAQPage)
- [ ] Generate `app/sitemap.ts`
- [ ] Create `app/robots.ts`
- [ ] Log to `research_history/M4-seo-pages.md`

**Commit:** `M4: programmatic SEO — banks, products, CD terms, sitemap, schema`
```bash
git add -A && git commit -m "M4: programmatic SEO — banks, products, CD terms, sitemap, schema" && git push origin main
```

---

### M5 — Calculator & Compare (Day 5)
**Tasks:**
- [ ] Build `/calculator` — compound interest / APY earnings calculator
- [ ] Build `/compare` — side-by-side bank comparison (URL params)
- [ ] Add FAQ sections with FAQPage schema
- [ ] Add rate alert email form (Formspree)
- [ ] Add "Best of" curated lists (no-fee, no-minimum, top 3 by type)
- [ ] Log to `research_history/M5-calculator.md`

**Commit:** `M5: calculator, compare tool, FAQ, curated lists`
```bash
git add -A && git commit -m "M5: calculator, compare tool, FAQ, curated lists" && git push origin main
```

---

### M6 — Deploy & QA (Day 6)
**Tasks:**
- [ ] `npx vercel --prod` — capture URL
- [ ] Verify sitemap.xml, robots.txt
- [ ] Test hreflang in page source
- [ ] Validate Schema.org with Rich Results Test
- [ ] Verify visitor counter works
- [ ] Verify Google Sheets logs events
- [ ] Verify Adsterra placeholders in DOM
- [ ] Test all 8 locales
- [ ] Performance audit (Lighthouse score > 85)
- [ ] Log to `research_history/M6-deploy.md`

**Commit:** `M6: production deploy — Vercel, QA, Lighthouse verified`
```bash
git add -A && git commit -m "M6: production deploy — Vercel, QA, Lighthouse verified" && git push origin main
```

---

## File Structure

```
savings-yield-hub/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx                    # Homepage — rate leaderboard
│   │   ├── banks/
│   │   │   ├── page.tsx                # All banks index
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # Bank detail
│   │   ├── products/
│   │   │   ├── page.tsx                # Product types overview
│   │   │   ├── hysa/
│   │   │   │   └── page.tsx
│   │   │   ├── cd/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [term]/
│   │   │   │       └── page.tsx        # 3-month, 6-month, 1-year, 2-year, 5-year
│   │   │   └── money-market/
│   │   │       └── page.tsx
│   │   ├── calculator/
│   │   │   └── page.tsx
│   │   └── compare/
│   │       └── page.tsx
│   ├── api/
│   │   ├── rates/
│   │   │   └── route.ts
│   │   └── visitor/
│   │       └── route.ts
│   ├── layout.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── RateLeaderboard.tsx
│   ├── BankCard.tsx
│   ├── RateHistoryChart.tsx
│   ├── APYCalculator.tsx
│   ├── FDICBadge.tsx
│   ├── ProductTypeTabs.tsx
│   ├── CDTermSelector.tsx
│   ├── CompareWidget.tsx
│   ├── RateChangeBadge.tsx
│   ├── VisitorCounter.tsx
│   ├── LanguageSwitcher.tsx
│   ├── Breadcrumb.tsx
│   ├── SchemaLD.tsx
│   └── ads/
│       ├── AdsterraSocialBar.tsx
│       ├── AdsterraNativeBanner.tsx
│       └── AdsterraDisplay.tsx
├── lib/
│   ├── banks.ts
│   ├── fdic.ts
│   ├── analytics.ts
│   └── visitorCounter.ts
├── types/
│   ├── bank.ts
│   └── rate.ts
├── data/
│   ├── banks-fallback.json
│   └── national-average.json
├── messages/
│   ├── en.json
│   ├── ko.json
│   ├── ja.json
│   ├── zh.json
│   ├── es.json
│   ├── fr.json
│   ├── de.json
│   └── pt.json
├── public/
│   └── logos/                          # Bank logos (SVG/PNG)
├── research_history/
│   ├── M1-scaffold.md
│   ├── M2-data-layer.md
│   ├── M3-homepage.md
│   ├── M4-seo-pages.md
│   ├── M5-calculator.md
│   └── M6-deploy.md
├── feature_list.json
├── claude-progress.txt
├── init.sh
├── .env.local.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Harness Files Spec

### `feature_list.json`
```json
{
  "project": "savings-yield-hub",
  "version": "1.0.0",
  "features": [
    { "id": "F01", "name": "Homepage rate leaderboard", "priority": "P0", "status": "TODO", "milestone": "M3" },
    { "id": "F02", "name": "Bank detail pages", "priority": "P0", "status": "TODO", "milestone": "M4" },
    { "id": "F03", "name": "Product type pages", "priority": "P0", "status": "TODO", "milestone": "M4" },
    { "id": "F04", "name": "CD term pages", "priority": "P0", "status": "TODO", "milestone": "M4" },
    { "id": "F05", "name": "APY calculator", "priority": "P0", "status": "TODO", "milestone": "M5" },
    { "id": "F06", "name": "Rate history chart", "priority": "P1", "status": "TODO", "milestone": "M3" },
    { "id": "F07", "name": "Rate alert subscription", "priority": "P2", "status": "TODO", "milestone": "M5" },
    { "id": "F08", "name": "Bank compare tool", "priority": "P1", "status": "TODO", "milestone": "M5" },
    { "id": "F09", "name": "FDIC badge", "priority": "P0", "status": "TODO", "milestone": "M3" },
    { "id": "F10", "name": "Visitor counter", "priority": "P0", "status": "TODO", "milestone": "M3" },
    { "id": "F11", "name": "i18n 8 languages", "priority": "P0", "status": "TODO", "milestone": "M3" },
    { "id": "F12", "name": "Google Sheets webhook", "priority": "P0", "status": "TODO", "milestone": "M3" },
    { "id": "F13", "name": "Adsterra ads", "priority": "P0", "status": "TODO", "milestone": "M3" },
    { "id": "F14", "name": "Schema.org JSON-LD", "priority": "P0", "status": "TODO", "milestone": "M4" },
    { "id": "F15", "name": "Sitemap + robots.txt", "priority": "P0", "status": "TODO", "milestone": "M4" },
    { "id": "F16", "name": "hreflang tags", "priority": "P0", "status": "TODO", "milestone": "M4" },
    { "id": "F17", "name": "Google Sheets CMS", "priority": "P0", "status": "TODO", "milestone": "M2" },
    { "id": "F18", "name": "FDIC BankFind API", "priority": "P1", "status": "TODO", "milestone": "M2" },
    { "id": "F19", "name": "research_history logs", "priority": "P0", "status": "TODO", "milestone": "M1" },
    { "id": "F20", "name": "Curated best-of lists", "priority": "P1", "status": "TODO", "milestone": "M5" }
  ]
}
```

### `claude-progress.txt`
```
# SavingsYieldHub — Claude Progress Log
# Format: [TIMESTAMP] [MILESTONE] [STATUS] [NOTES]
# Statuses: STARTED | IN_PROGRESS | COMPLETE | BLOCKED

[START] Project initialized
```

### `init.sh`
```bash
#!/usr/bin/env bash
set -e

echo "=== SavingsYieldHub Init Script ==="

# 1. Create GitHub repo
gh repo create taeshin11/savings-yield-hub --public --clone || echo "Repo may already exist"

# 2. Install dependencies
npm install

# 3. Copy env example
cp .env.local.example .env.local || true

# 4. Create research_history folder
mkdir -p research_history

# 5. Initial commit
git add -A
git commit -m "M1: scaffold — Next.js 14, Tailwind green pastel, next-intl" || true
git push origin main || true

echo "=== Init complete ==="
echo "Steps:"
echo "  1. Create Google Sheet with bank rate data, publish as CSV"
echo "  2. Add CSV URLs to .env.local"
echo "  3. Deploy Google Apps Script webhook, add URL to .env.local"
echo "  4. Run: npx vercel --prod"
```

---

## Additional Notes for Claude Code

1. **APY Calculator formula:**
   ```ts
   // Compound interest: A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]
   // Where: P=principal, r=annual rate, n=12 (monthly compounding), t=years, PMT=monthly contribution
   function calculateAPY(principal: number, monthlyContrib: number, apy: number, years: number) {
     const r = apy / 100;
     const n = 12;
     const t = years;
     const compoundP = principal * Math.pow(1 + r/n, n*t);
     const compoundPMT = monthlyContrib * ((Math.pow(1 + r/n, n*t) - 1) / (r/n));
     const total = compoundP + compoundPMT;
     const interest = total - principal - (monthlyContrib * 12 * t);
     return { total, interest };
   }
   ```

2. **FDIC API call example:**
   ```ts
   const res = await fetch(`https://banks.data.fdic.gov/api/institutions?filters=NAME:"${encodeURIComponent(name)}"&limit=1&fields=NAME,CERT,CITY,STALP,ASSET,INSDATE&output=json`);
   ```

3. **Rate comparison rule:** Always show APY (not APR) prominently. APY accounts for compounding. Mark clearly which is which.

4. **Bank logos:** Source from Clearbit Logo API (free): `https://logo.clearbit.com/${domain}` e.g., `https://logo.clearbit.com/ally.com`. Store locally after first fetch to avoid hotlinking.

5. **"No-fee" and "No-minimum" badges:** Critical UX feature — many users filter by these. Implement filter toggles prominently above the leaderboard table.

6. **Rate freshness:** Always display "Last updated: [date]" prominently. Stale data erodes trust. Show data from Google Sheet's `last_updated` column.
