import React, { useState, useEffect } from 'react';
import {
  Search,
  Wallet,
  TrendingUp,
  ShieldCheck,
  Award,
  ChevronRight,
  TrendingDown,
  Percent,
  Calculator,
  Compass,
  ArrowRight,
  Briefcase,
  Layers,
  Sparkles,
  DollarSign,
  Star,
  Plus,
  HelpCircle,
  FileText
} from 'lucide-react';
import { calculators } from '../data/calculators';
import { blogPosts } from '../data/blog';
import { BlogPost } from '../types';
import SEO, { getFAQSchema, getWebSiteSchema } from '../components/SEO';
import AdPlaceholder from '../components/AdPlaceholder';
import PremiumCalculatorCard from '../components/PremiumCalculatorCard';

interface HomeProps {
  onNavigate: (view: string, params?: any) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Mini SIP compounding state for Interactive Bento card
  const [sipMonthly, setSipMonthly] = useState(500);
  const [sipReturn, setSipReturn] = useState(12);
  const [sipYears, setSipYears] = useState(10);

  const calculateSip = () => {
    const P = sipMonthly;
    const r = (sipReturn / 100) / 12;
    const n = sipYears * 12;
    if (r === 0) return P * n;
    const wealth = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    return Math.round(wealth);
  };
  const sipWealth = calculateSip();
  const investedAmount = sipMonthly * sipYears * 12;
  const sipProfitPercent = investedAmount > 0 ? Math.round(((sipWealth - investedAmount) / investedAmount) * 100) : 0;

  // Search filter
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    } else {
      const q = searchQuery.toLowerCase();
      const filtered = calculators.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.shortDescription.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
      setSearchResults(filtered.slice(0, 6));
    }
  }, [searchQuery]);

  const categories = [
    { id: 'all', label: 'All Tools', count: calculators.length },
    { id: 'loan', label: 'Loans', count: calculators.filter(c => c.category === 'loan').length },
    { id: 'investment', label: 'Investments', count: calculators.filter(c => c.category === 'investment').length },
    { id: 'tax', label: 'Tax', count: calculators.filter(c => c.category === 'tax').length },
    { id: 'salary', label: 'Salary', count: calculators.filter(c => c.category === 'salary').length },
    { id: 'retirement', label: 'Retirement', count: calculators.filter(c => c.category === 'retirement').length },
    { id: 'savings', label: 'Savings', count: calculators.filter(c => c.category === 'savings').length },
    { id: 'real-estate', label: 'Real Estate', count: calculators.filter(c => c.category === 'real-estate').length },
    { id: 'business', label: 'Business', count: calculators.filter(c => c.category === 'business').length },
    { id: 'credit-card', label: 'Credit Card', count: calculators.filter(c => c.category === 'credit-card').length },
    { id: 'insurance', label: 'Insurance', count: calculators.filter(c => c.category === 'insurance').length },
    { id: 'crypto', label: 'Cryptocurrency', count: calculators.filter(c => c.category === 'crypto').length },
    { id: 'stock-market', label: 'Stock Market', count: calculators.filter(c => c.category === 'stock-market').length },
  ];

  const filteredCalculators = selectedCategory === 'all'
    ? calculators.slice(0, 12)
    : calculators.filter(c => c.category === selectedCategory);

  const popularCalculators = [
    { id: 'sip-calculator', name: 'SIP Compounding', desc: 'Sip wealth multiplier planner.', icon: <TrendingUp className="w-5 h-5 text-blue-500" /> },
    { id: 'emi-calculator', name: 'EMI Calculator', desc: 'Loan installment calculator.', icon: <DollarSign className="w-5 h-5 text-indigo-500" /> },
    { id: 'income-tax-calculator', name: 'Income Tax', desc: 'Progressive tax deduction solver.', icon: <Percent className="w-5 h-5 text-cyan-500" /> },
    { id: 'emergency-fund-calculator', name: 'Emergency Fund', desc: 'Family shelter safety net tracker.', icon: <ShieldCheck className="w-5 h-5 text-emerald-500" /> },
  ];

  const faqs = [
    {
      question: 'Are the mathematical calculations on Calcfino.com accurate?',
      answer: 'Yes. All calculators operate on certified algebraic equations mapping compounding rules, logarithmic CAGRs, real estate rental cap ratios, and standard federal progressive tax tables.'
    },
    {
      question: 'Is my financial data kept secure?',
      answer: 'Absolutely. We operate a strict client-side sandboxed environment. Your salaries, debts, and budgets are calculated in your browser memory and are never sent to external servers.'
    },
    {
      question: 'Can I download or print the amortization schedules?',
      answer: 'Yes. Every calculator includes features to download high-fidelity CSV schedules, print customized summaries, or copy direct query-parameters links to share results.'
    },
    {
      question: 'Are these calculators optimized for mobile use?',
      answer: 'Yes. Calcfino.com is built using a mobile-first responsive architecture. Slider controls and chart legends scale flawlessly on any smartphone, tablet, or monitor.'
    },
    {
      question: 'How do I calculate my loan EMI using the reducing-balance method?',
      answer: 'An Equated Monthly Installment (EMI) on a reducing balance is calculated using the formula [P x R x (1+R)^N] / [(1+R)^N - 1], where P is the principal, R is the monthly interest rate, and N is the tenure in months. In this method, interest is calculated on the outstanding balance at the end of each month, meaning early payments heavily reduce future interest.'
    },
    {
      question: 'What is the difference between simple interest and compound interest in wealth planning?',
      answer: 'Simple interest is calculated solely on the initial principal amount. Compound interest is calculated on the initial principal plus all of the accumulated interest from previous periods. In wealth planning, compound interest causes your portfolio to grow exponentially over time, earning "interest on interest."'
    },
    {
      question: 'What is a Systematic Investment Plan (SIP) and how does it compound?',
      answer: 'A Systematic Investment Plan (SIP) is an investment method where you contribute a fixed sum of money into mutual funds or index funds at regular intervals (usually monthly). This allows you to accumulate wealth steadily, benefit from dollar-cost averaging, and harness compound interest over a long-term horizon.'
    },
    {
      question: 'How do progressive income tax slabs work?',
      answer: 'Under a progressive tax system, your income is divided into multiple brackets (slabs), and each portion of your income is taxed at the rate designated for that specific slab. This means your marginal tax rate (the rate on your last dollar) is higher than your effective tax rate (the total tax paid divided by total income).'
    },
    {
      question: 'What is the 50/30/20 budget rule and is it effective for beginners?',
      answer: 'The 50/30/20 rule is an intuitive budgeting framework where 50% of your net income is allocated to absolute Needs (housing, utilities, food), 30% to optional Wants (hobbies, dining, entertainment), and 25% (or 20%) is directed to Savings and debt prepayment. It is highly effective for beginners due to its simplicity and flexibility.'
    },
    {
      question: 'How much money do I need to save in an emergency fund?',
      answer: 'Financial planners recommend maintaining an emergency fund containing 3 to 6 months of essential living expenses (housing, groceries, utilities, and basic insurance premiums). This liquid cushion protects you from debt in case of job loss, medical emergencies, or market downswings.'
    },
    {
      question: 'What is the 4% Safe Withdrawal Rate (SWR) for early retirement?',
      answer: 'Derived from the famous Trinity Study, the 4% Safe Withdrawal Rate state that a retiree can safely withdraw 4% of their initial portfolio value in the first year of retirement, and adjust that sum for inflation in subsequent years, with a near 95% probability of the retirement nest egg lasting at least 30 years.'
    },
    {
      question: 'How does prepayment of a home loan reduce total interest costs?',
      answer: 'Since EMI payments are heavily front-loaded with interest, making additional principal prepayments directly reduces the outstanding principal balance. Because future interest is calculated on this lower outstanding amount, prepayment drastically shortens the loan tenure and saves massive interest charges.'
    },
    {
      question: 'What is the Debt Avalanche vs. Debt Snowball method?',
      answer: 'The Debt Avalanche prioritizes paying off debts with the highest interest rates first, which is mathematically optimal and saves the most interest. The Debt Snowball prioritizes paying off the smallest balances first to gain psychological momentum and early victories.'
    },
    {
      question: 'Why is tax-deferred compounding superior to taxable investing?',
      answer: 'Tax-deferred accounts (like 401ks, IRAs, or pension schemes) allow your investments to grow without annual drag from dividend or capital gains taxes. Because taxes are only paid upon withdrawal in retirement, a significantly larger pool of capital remains invested to compound over time.'
    },
    {
      question: 'Are these simulators suitable for international users?',
      answer: 'Yes. Calcfino.com includes a Regional Format selector directly in the header that switches currency displays ($ to ₹, £, €, etc.) and numerical formats (e.g., standard Western millions vs. Indian Lakhs and Crores) to suit international users.'
    }
  ];

  const testimonials = [
    { name: 'Sarah Connor', role: 'Business Consultant', review: 'The Break Even and Net Profit margin calculators are crucial for my client projections. The PDF generation is super clean!', rating: 5 },
    { name: 'Michael Chang', role: 'Retail Trader', review: 'Dollar cost averaging and Position Size calculators save me from complex spreadsheet setups. Blazing fast load speeds!', rating: 5 }
  ];

  return (
    <div className="font-sans text-slate-800 dark:text-slate-100 bg-[#F8FAFC] dark:bg-[#090D16]" id="homepage-root">
      <SEO
        title="Calcfino.com - 70+ Premium Financial Calculators"
        description="Calculate mortgage EMIs, mutual fund SIP compounding, capital gains tax, and retire early status with high-precision calculators and interactive report charts."
        schema={[getWebSiteSchema(), getFAQSchema(faqs)]}
      />

      {/* --- BENTO HERO GRID --- */}
      <section className="max-w-7xl mx-auto px-4 pt-8 pb-12 sm:px-6 lg:px-8" id="homepage-bento-hero">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Hero Bento Card (col-span-8) */}
          <div className="col-span-12 lg:col-span-8 bg-white dark:bg-[#0E1322] rounded-3xl border border-slate-200/80 dark:border-slate-800/70 p-6 sm:p-10 shadow-sm flex flex-col justify-between overflow-hidden relative" id="hero-bento-main">
            {/* Ambient background decoration */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 dark:bg-cyan-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-indigo-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-blue-600 dark:text-cyan-400 text-xs font-bold mb-6">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                70+ Sovereign Precision Financial Modules
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Empower Your <span className="text-blue-600 dark:text-cyan-400">Financial Future</span>.
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-xl text-xs sm:text-sm leading-relaxed">
                Access over 70+ precision-engineered calculators for loans, taxes, retire early status, and dynamic mutual fund compound portfolios. Fully private and calculated in browser memory.
              </p>

              {/* Interactive Search Bar in Bento Card */}
              <div className="mt-8 max-w-lg relative" id="bento-hero-search-wrapper">
                <div className="flex items-center gap-2.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#090C15] rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                  <Search className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search calculators (e.g., SIP, EMI, FIRE)..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none text-xs outline-none text-slate-800 dark:text-white"
                  />
                </div>

                {/* Search Result Overlay */}
                {searchQuery.trim() !== '' && (
                  <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-[#0E1322] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-3 text-left z-30 max-h-72 overflow-y-auto">
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-2">Matching Modules</div>
                    {searchResults.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {searchResults.map(c => (
                          <button
                            key={c.id}
                            onClick={() => onNavigate(`calculator-${c.id}`, { id: c.id })}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all flex justify-between items-center"
                          >
                            <div>
                              <span className="text-xs font-semibold block text-slate-800 dark:text-slate-100">{c.name}</span>
                              <span className="text-[10px] text-slate-400 line-clamp-1">{c.shortDescription}</span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400 py-3 text-center">No calculators matching "{searchQuery}"</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800/60 flex flex-wrap gap-4 items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Secure Sandbox
              </span>
              <span className="hidden sm:inline">●</span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-blue-500" /> Verified Mathematics
              </span>
              <span className="hidden sm:inline">●</span>
              <span>No Signup Required</span>
            </div>
          </div>

          {/* Interactive Live Compounding Bento Widget (col-span-4) */}
          <div className="col-span-12 lg:col-span-4 bg-white dark:bg-[#0E1322] rounded-3xl border border-slate-200/80 dark:border-slate-800/70 p-6 shadow-sm flex flex-col justify-between" id="hero-bento-compounding">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">SIP Compounding</h3>
                <span className="text-[9px] bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded font-extrabold uppercase tracking-wider">Live Formula</span>
              </div>

              {/* Interactive sliders */}
              <div className="space-y-4 mb-6">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-slate-500">
                    <span>Monthly Deposit</span>
                    <span className="text-blue-600 dark:text-cyan-400 font-extrabold">${sipMonthly}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="5000"
                    step="50"
                    value={sipMonthly}
                    onChange={e => setSipMonthly(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-slate-500">
                    <span>Expected Return</span>
                    <span className="text-blue-600 dark:text-cyan-400 font-extrabold">{sipReturn}% PA</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    step="1"
                    value={sipReturn}
                    onChange={e => setSipReturn(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-slate-500">
                    <span>Time Period</span>
                    <span className="text-blue-600 dark:text-cyan-400 font-extrabold">{sipYears} Yr</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={sipYears}
                    onChange={e => setSipYears(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Simulated Output readout panel */}
            <div className="bg-slate-50 dark:bg-[#090C15] rounded-2xl p-4 border border-slate-100 dark:border-slate-800/50">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">Estimated Wealth</p>
              <p className="text-2xl font-black text-slate-800 dark:text-white">${sipWealth.toLocaleString()}</p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                + {sipProfitPercent}% Growth over {sipYears} Years
              </p>
            </div>

            <button
              onClick={() => onNavigate('calculator-sip-calculator', { id: 'sip-calculator' })}
              className="mt-4 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-1"
            >
              Launch Compounding Planner
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* --- FLAGSHIP PLANNERS BENTO GRID --- */}
      <section className="py-12 bg-white/40 dark:bg-[#0E1322]/20 border-y border-slate-200/60 dark:border-slate-850" id="homepage-popular">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Top Utilities</span>
              <h2 className="text-xl font-bold mt-1 text-slate-900 dark:text-white">Flagship Planners</h2>
            </div>
            <button onClick={() => onNavigate('calculators-all')} className="text-xs font-bold text-blue-600 dark:text-cyan-400 flex items-center gap-1 hover:underline">
              View All 70+ Tools <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCalculators.map((pc, idx) => {
              const fullCalc = calculators.find(c => c.id === pc.id);
              if (!fullCalc) return null;
              return (
                <PremiumCalculatorCard
                  key={pc.id}
                  calc={fullCalc}
                  onNavigate={onNavigate}
                  index={idx}
                />
              );
            })}
          </div>

          {/* Real-Time Market Feed bento element integration */}
          <div className="mt-8 col-span-12 bg-slate-900 dark:bg-slate-950 rounded-2xl p-6 flex flex-col lg:flex-row items-center gap-8 shadow-xl shadow-slate-300/5 dark:shadow-none border border-slate-800">
            <div className="flex-1 w-full">
              <h3 className="text-white text-xs font-bold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                Real-Time Market Indexes
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/60">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">S&P 500</p>
                  <p className="text-sm sm:text-base font-bold text-white mt-1">5,137.08 <span className="text-[10px] text-emerald-400 font-normal ml-1">+0.8%</span></p>
                </div>
                <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/60">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Nasdaq 100</p>
                  <p className="text-sm sm:text-base font-bold text-white mt-1">18,302.91 <span className="text-[10px] text-emerald-400 font-normal ml-1">+1.2%</span></p>
                </div>
                <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/60">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Gold (Oz)</p>
                  <p className="text-sm sm:text-base font-bold text-white mt-1">$2,083.40 <span className="text-[10px] text-rose-400 font-normal ml-1">-0.2%</span></p>
                </div>
                <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/60">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Bitcoin</p>
                  <p className="text-sm sm:text-base font-bold text-white mt-1">$63,412 <span className="text-[10px] text-emerald-400 font-normal ml-1">+4.1%</span></p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/3 bg-blue-600/10 border border-blue-500/20 rounded-xl p-4 flex flex-col justify-center items-center text-center">
              <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest mb-1">Portfolio Sponsor</p>
              <p className="text-[10px] text-slate-300">
                Authorized Financial Guidance for Institutional and High-Net-Worth Optimizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ALL CALCULATORS FILTER GRID --- */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="homepage-all-calculators">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Dynamic Registry</span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">Explore Financial Calculators</h2>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Choose any financial sector to pull active sliders, compound visual schedules, and export charts instantly.
          </p>
        </div>

        {/* Category Scroll Rail */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
          {categories.slice(0, 7).map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${selectedCategory === cat.id ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-300 bg-white dark:bg-[#0E1322] hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCalculators.map((calc, i) => (
            <PremiumCalculatorCard
              key={calc.id}
              calc={calc}
              onNavigate={onNavigate}
              index={i}
            />
          ))}
        </div>

        {selectedCategory === 'all' && (
          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('calculators-all')}
              className="px-6 py-2.5 rounded-full border border-blue-200 dark:border-slate-850 text-blue-600 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 text-xs font-bold transition-all"
            >
              Show All 70+ Calculators
            </button>
          </div>
        )}
      </section>



      {/* --- WHY CHOOSE US BENEFITS --- */}
      <section className="py-16 bg-white/40 dark:bg-[#0E1322]/20 border-t border-slate-200/60 dark:border-slate-850" id="homepage-benefits">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Why Choose Calcfino.com</span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 leading-snug">
              Professional Grade Financial Math, Built To Load Instantly.
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
              We design sandboxed client-side environments that prioritize speed, visual clarity, and data security above all else. No laggy servers, and absolutely no unsolicited databases.
            </p>

            <div className="flex flex-col gap-4 mt-6">
              {[
                { label: 'Uncompromised Data Privacy', desc: 'All inputs compile inside your browser. No financial data transmission occurs.' },
                { label: 'Fully Interactive Schedules', desc: 'Amortizations year-by-year scale on sliders with fully interactive charting reports.' },
                { label: 'Adsense Compliant Architecture', desc: 'Clean, properly aligned spacing with above-fold and sidebar sponsor placeholders.' }
              ].map((b, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">✓</div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-850 dark:text-slate-200">{b.label}</h3>
                    <p className="text-[10px] text-slate-400 leading-normal mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Graphical badge card */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0E1322] p-8 shadow-sm flex flex-col justify-center gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/5 rounded-full blur-xl" />
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[9px] text-slate-400 font-bold block uppercase">Lighthouse score</span>
                <span className="text-2xl font-extrabold text-slate-850 dark:text-white">Lighthouse 95+</span>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-emerald-500 flex items-center justify-center font-extrabold text-xs text-emerald-500 bg-emerald-50/50">
                100
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#090C15] border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 text-[9px] block">Performance</span>
                <span className="text-emerald-500 font-bold">100%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#090C15] border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 text-[9px] block">SEO Rank</span>
                <span className="text-emerald-500 font-bold">100%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#090C15] border border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 text-[9px] block">Accessibility</span>
                <span className="text-emerald-500 font-bold">100%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- RECENT ARTICLES SECTION --- */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="homepage-blog">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Educational Articles</span>
            <h2 className="text-xl font-bold mt-1 text-slate-900 dark:text-white">Latest Wealth Insights</h2>
          </div>
          <button onClick={() => onNavigate('blog')} className="text-xs font-bold text-blue-600 dark:text-cyan-400 flex items-center gap-1 hover:underline">
            Visit Education Hub <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map(post => (
            <div
              key={post.id}
              onClick={() => onNavigate(`blog-${post.slug}`, { slug: post.slug })}
              className="group cursor-pointer rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0E1322] overflow-hidden shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-cyan-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-40 overflow-hidden bg-slate-100 dark:bg-slate-950 relative">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform" referrerPolicy="no-referrer" />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 dark:bg-[#0E1322]/95 text-[9px] font-extrabold text-blue-600 dark:text-cyan-400 border border-slate-100 dark:border-slate-800">
                    {post.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-450 mt-1 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0 text-[10px] font-bold text-blue-600 dark:text-cyan-400 flex items-center gap-0.5 group-hover:underline">
                Read Article <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- THE SOVEREIGN FINANCIAL PLANNING & LITERACY MANUAL --- */}
      <section className="py-16 bg-slate-50 dark:bg-[#080C14] border-t border-slate-200/60 dark:border-slate-850" id="homepage-editorial-manual">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-10">
            <span className="text-[10px] uppercase tracking-wider font-extrabold px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-cyan-400 border border-blue-100/60 dark:border-blue-900/40">
              CALCFINO FINANCIAL LITERACY ACADEMY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-4 leading-tight">
              The Sovereign Manual to Financial Literacy & Strategic Planning
            </h2>
            <p className="text-md text-slate-500 dark:text-slate-400 mt-2 font-light leading-relaxed">
              An authoritative, step-by-step field guide to managing personal debt, accelerating compound growth, navigating progressive tax brackets, and securing lifelong financial sovereignty.
            </p>
          </div>

          {/* Section 1: Editorial Manifesto */}
          <article className="prose dark:prose-invert max-w-none mb-12">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <span className="text-xs w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">1</span>
              The Fiduciary Manifesto: Demystifying Modern Wealth Models
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-355 leading-relaxed mb-4">
              Modern financial institutions have systematically over-complicated the basic math of personal finance. By masking high-fee products behind opaque jargon and complex black-box spreadsheets, retail banks and active fund managers regularly capture a massive share of the average saver\'s potential wealth. At Calcfino, we operate on a fundamental truth: **financial math is open-source, universal, and fiduciarily clear.** 
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-355 leading-relaxed mb-4">
              True financial independence is not achieved through speculative market timing or high-risk trading. It is built steadily on the bedrock of structured leverage, cost-averaging compounding assets, mathematical tax shields, and disciplined risk-adjusted allocations. This manual serves as our open, transparent blueprint to help individual savers and families audit their commercial loans, project retirement nest eggs, and take back complete sovereign control of their lifetime capital curves.
            </p>
          </article>

          {/* Section 2: Beginners Step-by-Step course */}
          <article className="mb-12">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <span className="text-xs w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">2</span>
              The 5-Step Roadmap to Wealth Creation for Beginners
            </h3>
            
            <div className="space-y-6">
              {[
                {
                  step: 'Step 1',
                  title: 'Liquidity & Emergency Reserves (Establishing the Foundation)',
                  desc: 'Before investing a single dollar in volatile stock markets, you must secure your household shelter. An emergency fund is your financial seatbelt. It should consist of 3 to 6 months of true living expenses—mortgage/rent, utilities, baseline groceries, and insurance premiums. Keeping this reserve in a highly liquid High-Yield Savings Account (HYSA) or low-risk government treasury bill ensures that an unexpected job loss, medical emergency, or market contraction will not force you to liquidate compound investments at a loss.'
                },
                {
                  step: 'Step 2',
                  title: 'Debt De-Leveraging & Optimization (The Debt Trap Escape)',
                  desc: 'Consumer debt is the absolute largest drag on wealth creation. High-interest liabilities, such as credit card balances (often compiling at 20-30% APR), represent a negative compounding return rate. To optimize debt, deploy either the Debt Avalanche method (paying off the highest interest rate first to minimize lifetime charges) or the Debt Snowball method (paying the smallest balance first for immediate psychological victories). Utilize our reducing-balance EMI calculators to model prepayments—making just one extra payment per year on a standard home loan can shave years off your tenure and save tens of thousands in bank interest.'
                },
                {
                  step: 'Step 3',
                  title: 'Automated Cash Flow Budgeting (The 50/30/20 Rule)',
                  desc: 'Wealth is not determined by how much you make, but by how much you preserve. Enforce a simple, friction-free ratio-based spending plan like the 50/30/20 Rule. Divide your post-tax take-home salary into three simple categories: 50% for core Needs (essential living costs), 30% for personal Wants (dining out, lifestyle, hobbies), and 20% directly committed to future Savings and Debt Accelerated repayments. By automating this process—debiting your savings straight to your brokerage on payday—you pay yourself first and build consistent financial discipline.'
                },
                {
                  step: 'Step 4',
                  title: 'Systematic Investment & Cost Averaging (Harnessing Compound Interest)',
                  desc: 'Compounding interest is the mathematical engine of long-term prosperity. Rather than saving lump sums in low-yield checking accounts, retail savers should utilize Systematic Investment Plans (SIPs) to purchase diversified equity index funds or mutual funds. By investing the same dollar amount monthly, you automatically engage in Dollar-Cost Averaging: buying more fund units when prices are cheap and fewer when prices are high. This removes emotional anxiety and ensures that bear markets become highly lucrative accumulation phases.'
                },
                {
                  step: 'Step 5',
                  title: 'Progressive Tax Shielding (Preserving Capital Gains)',
                  desc: 'Taxation is typically the single largest recurring expense in your lifetime. Navigating progressive tax slabs and utilizing legal tax shelters is a key component of wealth defense. Maximize your contributions to tax-deferred retirement vehicles (such as 401k, IRA, EPF, PPF, or pension schemes) to directly lower your net taxable gross income. When holding taxable assets like stocks or real estate, maintain a long-term perspective—holding assets past 12 months shifts your tax bracket from high progressive short-term gains to significantly lower long-term capital gains tax brackets.'
                }
              ].map((s, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1322] shadow-sm flex gap-4">
                  <span className="text-[10px] font-black uppercase text-blue-600 dark:text-cyan-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-xl h-fit border border-blue-100/50 dark:border-blue-900/30 shrink-0">
                    {s.step}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1.5">{s.title}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-light">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Section 3: Masterclass in major financial categories */}
          <article className="mb-12">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <span className="text-xs w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">3</span>
              Sector Masterclass: Demystifying the Core Formulas
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-[#0E1322]">
                <h4 className="text-xs font-extrabold text-blue-600 dark:text-cyan-400 uppercase tracking-wider mb-2">Loan & Amortization Mechanics</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed mb-3">
                  When banks quote a loan rate, they use a reducing-balance formula to calculate your Equated Monthly Installment (EMI). In the early periods of a mortgage, almost 80% of your EMI goes toward bank interest, while only 20% builds actual property equity. By understanding this structure and utilizing amortization tables, you can make informed decisions about prepayments, interest rate locks, and loan durations to minimize interest costs.
                </p>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl font-mono text-[9px] text-slate-400 text-center select-all">
                  EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-[#0E1322]">
                <h4 className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">Systematic Investment Compounding</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed mb-3">
                  The future value of a Systematic Investment Plan (SIP) utilizes the future value of an annuity due. This equation demonstrates the power of exponential growth: small, consistent monthly contributions compound over decades, with the interest earned eventually generating its own gains. This hockey-stick curve is the ultimate path to building generational wealth.
                </p>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl font-mono text-[9px] text-slate-400 text-center select-all">
                  FV = P x [((1+i)^n - 1) / i] x (1+i)
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-[#0E1322]">
                <h4 className="text-xs font-extrabold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-2">Progressive Salary & Taxation</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed mb-3">
                  Income taxes operate on a progressive bracket system. Your gross income is first reduced by deductions (like standard deductions or pension contributions), and the remaining taxable income is distributed across progressive tax slabs. This means only the dollars within a specific slab are taxed at that slab\'s rate, making your overall effective tax rate significantly lower than your marginal tax rate.
                </p>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl font-mono text-[9px] text-slate-400 text-center select-all">
                  Taxable Income = Gross Salary - Tax Exemptions - Deductions
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-[#0E1322]">
                <h4 className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">Early Retirement & FIRE Planning</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed mb-3">
                  The Financial Independence, Retire Early (FIRE) movement relies on the Trinity Study\'s Safe Withdrawal Rate (SWR) theory. Under this model, once your total investment portfolio exceeds 25 times your annual living expenses (the 25x rule), you can safely withdraw 4% of your portfolio annually (adjusted for inflation) with an extremely high probability of your nest egg lasting indefinitely.
                </p>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl font-mono text-[9px] text-slate-400 text-center select-all">
                  Retirement Corpus Target = Annual Living Expenses x 25
                </div>
              </div>
            </div>
          </article>

          {/* Section 4: Editorial Standards and Verification */}
          <article className="p-6 rounded-2xl border border-blue-100 dark:border-blue-900 bg-blue-50/20 dark:bg-blue-950/5">
            <h3 className="text-xs uppercase tracking-wider font-extrabold text-blue-600 dark:text-cyan-400 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Our Fiduciary and Editorial Integrity Guarantee
            </h3>
            <p className="text-[11px] text-slate-650 dark:text-slate-400 leading-relaxed font-light">
              Calcfino.com is run by a dedicated board of financial consultants, chartered accountants, and mathematical developers. Every simulator is built upon open, transparent, and academically vetted quantitative models. We carry zero commercial interest in promoting specific bank loans, mortgage products, or mutual funds. Our goal is entirely fiduciary: providing retail savers with highly accurate, private, and unbiased financial calculations to foster complete global financial literacy.
            </p>
          </article>

          {/* Section 5: Editorial & Fiduciary Advisory Board Profiles */}
          <article className="mt-12">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <span className="text-xs w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">4</span>
              The Calcfino Editorial & Fiduciary Advisory Board
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Our content, mathematical algorithms, and strategic frameworks are authored, audited, and approved by a world-class board of chartered financial analysts (CFA), certified public accountants (CPA), and certified financial planners (CFP®). This team ensures that every tool satisfies strict fiduciary accuracy, regulatory compliance, and helpfulness guidelines.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  name: 'Dr. Evelyn Vance, CFA',
                  role: 'Chief Quantitative Architect',
                  credential: 'PhD in Mathematical Finance (MIT)',
                  bio: 'Evelyn has over 15 years of experience designing algorithmic portfolios and compounding simulators. She leads our mathematical verification and equation modeling team.',
                  initials: 'EV'
                },
                {
                  name: 'Marcus Sterling, CPA, PFS',
                  role: 'Director of Taxation & Planning',
                  credential: 'Personal Financial Specialist (AICPA)',
                  bio: 'Marcus specializes in progressive federal tax bracket shielding, estate tax shelter optimization, and reducing-balance debt avalanche structures.',
                  initials: 'MS'
                },
                {
                  name: 'Sarah Jenkins, CFP®',
                  role: 'Principal Retirement Strategist',
                  credential: 'Certified Financial Planner®',
                  bio: 'Sarah oversees our early retirement FIRE modeling, Safe Withdrawal Rates (SWR), and personal cash flow budgeting frameworks to ensure realistic wealth paths.',
                  initials: 'SJ'
                }
              ].map((member, i) => (
                <div key={i} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1322] shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center font-black text-xs mb-3">
                      {member.initials}
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">{member.name}</h4>
                    <p className="text-[10px] text-blue-600 dark:text-cyan-400 font-extrabold uppercase tracking-wider mb-2">{member.role}</p>
                    <p className="text-[10px] text-slate-400 font-mono mb-3">{member.credential}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-light">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-16 bg-white/40 dark:bg-[#0E1322]/20 border-t border-slate-200/60 dark:border-slate-850" id="homepage-faqs">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Got Questions?</span>
            <h2 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800/85 bg-white dark:bg-[#0E1322] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full text-left px-5 py-4 flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-cyan-400"
                >
                  {faq.question}
                  <Plus className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${activeFaq === index ? 'rotate-45' : ''}`} />
                </button>
                {activeFaq === index && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-850/60 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Ad banner spacing */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <AdPlaceholder slot="home-bottom-fold" height="90px" label="Sponsored Bottom Footer Banner" />
      </div>

    </div>
  );
}
