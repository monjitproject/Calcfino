import React, { useState } from 'react';
import { Search, Compass, BookOpen, Layers, Sparkles, ChevronRight, Landmark, TrendingUp, ShieldAlert, Award, Briefcase } from 'lucide-react';
import { calculators } from '../data/calculators';
import SEO from '../components/SEO';
import AdPlaceholder from '../components/AdPlaceholder';

interface CalculatorsAllProps {
  onNavigate: (view: string, params?: any) => void;
  initialSearch?: string;
}

export default function CalculatorsAll({ onNavigate, initialSearch = '' }: CalculatorsAllProps) {
  const [query, setQuery] = useState(initialSearch);

  const sectors = [
    { id: 'loan', label: 'Loan Calculators', icon: <Landmark className="w-4 h-4 text-blue-500" /> },
    { id: 'investment', label: 'Investment & CAGR', icon: <TrendingUp className="w-4 h-4 text-cyan-500" /> },
    { id: 'tax', label: 'Tax & Capital Gains', icon: <ShieldAlert className="w-4 h-4 text-amber-500" /> },
    { id: 'salary', label: 'Salary Tools & CTC', icon: <Award className="w-4 h-4 text-emerald-500" /> },
    { id: 'retirement', label: 'Retirement & FIRE', icon: <Compass className="w-4 h-4 text-indigo-500" /> },
    { id: 'savings', label: 'Savings & FD/RD', icon: <Layers className="w-4 h-4 text-rose-500" /> },
    { id: 'real-estate', label: 'Real Estate & Yield', icon: <Layers className="w-4 h-4 text-blue-400" /> },
    { id: 'business', label: 'Business & Profit', icon: <BriefcaseIcon className="w-4 h-4 text-indigo-400" /> },
    { id: 'credit-card', label: 'Credit Card & Debt', icon: <Layers className="w-4 h-4 text-cyan-400" /> },
    { id: 'insurance', label: 'Insurance & Premium', icon: <Layers className="w-4 h-4 text-amber-400" /> },
    { id: 'crypto', label: 'Crypto & Bitcoin', icon: <Sparkles className="w-4 h-4 text-indigo-500" /> },
    { id: 'stock-market', label: 'Stock Market', icon: <TrendingUp className="w-4 h-4 text-emerald-400" /> },
  ];

  function BriefcaseIcon(props: any) {
    return <Briefcase className={props.className} />;
  }

  const filtered = calculators.filter(
    c =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="font-sans py-6 text-slate-800 dark:text-slate-100" id="all-calculators-view">
      <SEO
        title="70+ Free Financial Calculators"
        description="Search our full list of mortgage EMI, SIP mutual funds, CAGR, FIRE, rental yields, progressive tax shields, and business margin calculators."
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Complete Directory</span>
        <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-600 to-indigo-600 dark:from-white dark:via-cyan-400 dark:to-blue-500 mt-2">
          Sovereign Calculator Directory
        </h1>
        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
          Access every mathematical finance module. Instantly run numbers with dynamic slider readouts and visual area charts.
        </p>

        {/* Search */}
        <div className="mt-6 max-w-md mx-auto">
          <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0E1322] rounded-xl px-3.5 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by name, category, or keyword..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full bg-transparent border-none text-xs outline-none text-slate-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Grid of categories */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left column: Categories directory index */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0E1322] p-5 shadow-sm">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Directories</span>
            <div className="flex flex-col gap-1.5">
              {sectors.map(s => {
                const count = calculators.filter(c => c.category === s.id).length;
                if (count === 0) return null;
                return (
                  <a
                    href={`#sector-${s.id}`}
                    key={s.id}
                    className="flex justify-between items-center px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    <span className="flex items-center gap-2">
                      {s.icon}
                      {s.label}
                    </span>
                    <span className="text-[10px] bg-slate-100 dark:bg-[#090C15] border border-slate-200/40 dark:border-slate-800 px-2 py-0.5 rounded-full font-bold text-slate-450">{count}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <AdPlaceholder slot="directory-sidebar" height="240px" label="Sovereign Display Ad Unit" />
        </div>

        {/* Right column: Categorized list of calculators */}
        <div className="lg:col-span-3 flex flex-col gap-10">
          
          <AdPlaceholder slot="directory-above-results" height="90px" label="Responsive Horizontal Ad Banner" />

          {query.trim() !== '' ? (
            <div>
              <div className="text-[9px] font-bold text-slate-400 uppercase mb-4 tracking-wider">Search Results ({filtered.length})</div>
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filtered.map(calc => (
                    <div
                      key={calc.id}
                      onClick={() => onNavigate(`calculator-${calc.id}`, { id: calc.id })}
                      className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/85 bg-white dark:bg-[#0E1322] hover:border-blue-400 dark:hover:border-cyan-500/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[8px] font-bold uppercase tracking-wider bg-slate-50 dark:bg-[#090C15] border border-slate-100 dark:border-slate-800 px-2.5 py-0.5 rounded-full text-slate-400">
                          {calc.category}
                        </span>
                        <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-3">{calc.name}</h3>
                        <p className="text-[10px] text-slate-450 mt-1 line-clamp-2 leading-relaxed">{calc.shortDescription}</p>
                      </div>
                      <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 mt-3 flex items-center gap-0.5">
                        Launch Planner <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-xs text-slate-400">No calculators found matching your query.</div>
              )}
            </div>
          ) : (
            sectors.map(sector => {
              const items = calculators.filter(c => c.category === sector.id);
              if (items.length === 0) return null;
              return (
                <div key={sector.id} id={`sector-${sector.id}`} className="scroll-mt-24">
                  <div className="flex items-center gap-2 mb-4 border-b border-slate-200/60 dark:border-slate-800 pb-2">
                    {sector.icon}
                    <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">{sector.label}</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {items.map(calc => (
                      <div
                        key={calc.id}
                        onClick={() => onNavigate(`calculator-${calc.id}`, { id: calc.id })}
                        className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/85 bg-white dark:bg-[#0E1322] hover:border-blue-400 dark:hover:border-cyan-500/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100">{calc.name}</h3>
                          <p className="text-[10px] text-slate-455 mt-1 leading-normal line-clamp-2">{calc.shortDescription}</p>
                        </div>
                        <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 mt-3 flex items-center gap-0.5">
                          Launch Planner <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}

          <AdPlaceholder slot="directory-bottom-fold" height="90px" label="Responsive Bottom Directory banner" />

        </div>

      </div>

    </div>
  );
}
