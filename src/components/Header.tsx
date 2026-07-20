import React, { useState, useEffect, useRef } from 'react';
import { Search, Sun, Moon, Menu, X, Landmark, TrendingUp, ShieldAlert, Award, ChevronDown, User, Wallet, Globe } from 'lucide-react';
import { calculators } from '../data/calculators';
import { Calculator } from '../types';
import { useRegionalSettings, REGIONAL_PRESETS } from '../context/RegionalSettingsContext';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, params?: any) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export default function Header({ currentView, onNavigate, darkMode, setDarkMode }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Calculator[]>([]);
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [regionalOpen, setRegionalOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const regionalRef = useRef<HTMLDivElement>(null);
  
  const { currentPreset, setPreset } = useRegionalSettings();

  const CATEGORY_META: Record<string, { label: string; color: string; bg: string; border: string }> = {
    'loan': { label: 'Loans', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/40', border: 'border-blue-100/30 dark:border-blue-900/40' },
    'investment': { label: 'Investments', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/40', border: 'border-emerald-100/30 dark:border-emerald-900/40' },
    'tax': { label: 'Taxes', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/40', border: 'border-amber-100/30 dark:border-amber-900/40' },
    'salary': { label: 'Salary', color: 'text-pink-600 dark:text-pink-400', bg: 'bg-pink-50 dark:bg-pink-950/40', border: 'border-pink-100/30 dark:border-pink-900/40' },
    'retirement': { label: 'Retirement', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/40', border: 'border-indigo-100/30 dark:border-indigo-900/40' },
    'savings': { label: 'Savings', color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-950/40', border: 'border-teal-100/30 dark:border-teal-900/40' },
    'real-estate': { label: 'Real Estate', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950/40', border: 'border-purple-100/30 dark:border-purple-900/40' },
    'business': { label: 'Business', color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-950/40', border: 'border-cyan-100/30 dark:border-cyan-900/40' },
    'crypto': { label: 'Crypto', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/40', border: 'border-orange-100/30 dark:border-orange-900/40' },
    'stock-market': { label: 'Stocks', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-950/40', border: 'border-rose-100/30 dark:border-rose-900/40' },
    'credit-card': { label: 'Cards', color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-950/40', border: 'border-violet-100/30 dark:border-violet-900/40' },
    'insurance': { label: 'Insurance', color: 'text-lime-600 dark:text-lime-400', bg: 'bg-lime-50 dark:bg-lime-950/40', border: 'border-lime-100/30 dark:border-lime-900/40' },
    'currency-inflation': { label: 'Inflation', color: 'text-fuchsia-600 dark:text-fuchsia-400', bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/40', border: 'border-fuchsia-100/30 dark:border-fuchsia-900/40' },
    'personal-finance': { label: 'Personal', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-950/40', border: 'border-sky-100/30 dark:border-sky-900/40' },
  };

  // Handle Search filtering with advanced fuzzy matching and category tags
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    const queryWords = query.split(/\s+/).filter(Boolean);

    if (queryWords.length === 0 && !selectedCategory) {
      setSearchResults([]);
      return;
    }

    // Filter and score based on fuzzy search
    const scored = calculators.map(c => {
      const nameLower = c.name.toLowerCase();
      const descLower = c.shortDescription.toLowerCase();
      const catLower = c.category.toLowerCase();
      
      let score = 0;

      // Base query-less category browsing
      if (queryWords.length === 0) {
        if (selectedCategory && c.category === selectedCategory) {
          score = 100;
        }
        return { calculator: c, score };
      }
      
      // Exact name matches get massive boost
      if (nameLower === query) {
        score += 1000;
      } else if (nameLower.startsWith(query)) {
        score += 500;
      } else if (nameLower.includes(query)) {
        score += 250;
      }
      
      // Category match
      if (catLower === query) {
        score += 300;
      } else if (catLower.includes(query)) {
        score += 60;
      }
      
      // Description match
      if (descLower.includes(query)) {
        score += 40;
      }
      
      // Match individual words of query
      queryWords.forEach(word => {
        if (nameLower.includes(word)) {
          score += 120;
        }
        if (descLower.includes(word)) {
          score += 30;
        }
        if (catLower.includes(word)) {
          score += 20;
        }
      });
      
      // Fuzzy character order match (e.g., "sip" matches "SIP Calculator")
      let charIdx = 0;
      let matchesInOrder = 0;
      for (let i = 0; i < nameLower.length && charIdx < query.length; i++) {
        if (nameLower[i] === query[charIdx]) {
          charIdx++;
          matchesInOrder++;
        }
      }
      if (matchesInOrder === query.length) {
        score += 40;
        score += Math.round((query.length / nameLower.length) * 30);
      }
      
      return { calculator: c, score };
    });

    // Keep positive scores, filter by selectedCategory if active
    let filteredScored = scored.filter(item => item.score > 0);
    if (selectedCategory) {
      filteredScored = filteredScored.filter(item => item.calculator.category === selectedCategory);
    }

    // Sort by score desc, then name asc
    filteredScored.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.calculator.name.localeCompare(b.calculator.name);
    });

    setSearchResults(filteredScored.map(item => item.calculator).slice(0, 10));
  }, [searchQuery, selectedCategory]);

  // Click outside menus listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
        setSearchQuery('');
        setSelectedCategory(null);
      }
      if (regionalRef.current && !regionalRef.current.contains(event.target as Node)) {
        setRegionalOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectCalculator = (id: string) => {
    onNavigate(`calculator-${id}`, { id });
    setSearchOpen(false);
    setSearchQuery('');
    setSelectedCategory(null);
    setMobileMenuOpen(false);
  };

  const navCategories = [
    {
      id: 'loan',
      label: 'Loan Tools',
      icon: <Landmark className="w-4 h-4" />,
      items: calculators.filter(c => c.category === 'loan').slice(0, 5),
    },
    {
      id: 'investment',
      label: 'Investments',
      icon: <TrendingUp className="w-4 h-4" />,
      items: calculators.filter(c => c.category === 'investment' || c.category === 'savings').slice(0, 5),
    },
    {
      id: 'tax',
      label: 'Tax & Salary',
      icon: <ShieldAlert className="w-4 h-4" />,
      items: calculators.filter(c => c.category === 'tax' || c.category === 'salary').slice(0, 5),
    },
    {
      id: 'more',
      label: 'Premium Tools',
      icon: <Award className="w-4 h-4" />,
      items: calculators.filter(c => ['retirement', 'real-estate', 'business', 'crypto', 'stock-market'].includes(c.category)).slice(0, 5),
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/65 bg-white/95 dark:bg-[#0E1322]/95 backdrop-blur-md shadow-sm transition-colors duration-200" id="financehub-main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} id="header-logo-container">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20">
              <Wallet className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold font-sans bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-blue-600 dark:from-white dark:to-cyan-400">
              Calcfino<span className="text-blue-500 font-extrabold text-sm align-super">.com</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" id="desktop-navbar">
            <button
              id="nav-home"
              onClick={() => onNavigate('home')}
              className={`text-sm font-semibold hover:text-blue-600 dark:hover:text-cyan-400 transition-colors ${currentView === 'home' ? 'text-blue-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-300'}`}
            >
              Home
            </button>

            {/* 1. Finance Tools Megamenu Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setMegaMenuOpen('finance-tools')}
              onMouseLeave={() => setMegaMenuOpen(null)}
            >
              <button className="flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors py-2">
                Finance Tools
                <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className={`absolute left-0 mt-0 w-80 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl p-4 transition-all duration-250 origin-top-left ${megaMenuOpen === 'finance-tools' ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'}`}>
                <div className="mb-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Interactive Hubs</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {[
                    { id: 'investment', label: 'Investment' },
                    { id: 'loans', label: 'Loans' },
                    { id: 'emi', label: 'EMI' },
                    { id: 'mutual-funds', label: 'Mutual Funds' },
                    { id: 'retirement', label: 'Retirement' },
                    { id: 'savings', label: 'Savings' },
                    { id: 'budgeting', label: 'Budgeting' },
                    { id: 'taxes', label: 'Taxes' },
                    { id: 'insurance', label: 'Insurance' },
                    { id: 'banking', label: 'Banking' },
                    { id: 'credit-cards', label: 'Credit Cards' },
                  ].map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => onNavigate(`category-${sub.id}`, { category: sub.id })}
                      className="text-left px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-cyan-400 transition-all"
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => onNavigate('calculators-all')}
                  className="text-center w-full px-3 py-2 mt-3 rounded-xl text-xs font-bold text-blue-600 dark:text-cyan-400 bg-blue-50/50 dark:bg-blue-950/20 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-all"
                >
                  View All 70+ Simulators
                </button>
              </div>
            </div>

            {/* 2. Educational Hub Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setMegaMenuOpen('edu-hub')}
              onMouseLeave={() => setMegaMenuOpen(null)}
            >
              <button className="flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors py-2">
                Learning Center
                <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className={`absolute left-0 mt-0 w-64 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl p-4 transition-all duration-200 origin-top-left ${megaMenuOpen === 'edu-hub' ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'}`}>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => onNavigate('category-guides', { category: 'guides' })}
                    className="text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-cyan-400 transition-all"
                  >
                    Guides & Tutorials
                  </button>
                  <button
                    onClick={() => onNavigate('blog')}
                    className="text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-cyan-400 transition-all"
                  >
                    Wealth Blog
                  </button>
                  <button
                    onClick={() => onNavigate('sitemap')}
                    className="text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-cyan-400 transition-all"
                  >
                    Portal Categories
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Company & Editorial Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setMegaMenuOpen('company')}
              onMouseLeave={() => setMegaMenuOpen(null)}
            >
              <button className="flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors py-2">
                Company
                <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className={`absolute left-0 mt-0 w-64 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl p-4 transition-all duration-200 origin-top-left ${megaMenuOpen === 'company' ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'}`}>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => onNavigate('about-us')}
                    className="text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-cyan-400 transition-all"
                  >
                    About Us
                  </button>
                  <button
                    onClick={() => onNavigate('editorial-policy')}
                    className="text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-cyan-400 transition-all"
                  >
                    Editorial Policy
                  </button>
                  <button
                    onClick={() => onNavigate('contact-us')}
                    className="text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-cyan-400 transition-all"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>

            <button
              id="nav-dashboard"
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${currentView === 'dashboard' ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'} transition-all`}
            >
              <User className="w-3.5 h-3.5" />
              Dashboard
            </button>
          </nav>

          {/* Action Tools (Search, Theme, Mobile Toggle) */}
          <div className="flex items-center gap-3">
            {/* Search Tool */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                id="search-trigger-btn"
                aria-label="Search Calculators"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Search Dropdown Panel */}
              {searchOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-[420px] rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-4 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 bg-slate-50 dark:bg-slate-950">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search 70+ calculators..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent border-none text-sm outline-none text-slate-800 dark:text-white"
                      autoFocus
                    />
                  </div>

                  {/* Horizontally Scrollable Category Pills / Tags Filter */}
                  <div className="mt-2.5 mb-2 flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all flex-shrink-0 whitespace-nowrap ${!selectedCategory ? 'bg-blue-600 border-blue-600 text-white shadow-sm' : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'}`}
                    >
                      All Categories
                    </button>
                    {Array.from(new Set(calculators.map(c => c.category))).map(cat => {
                      const meta = CATEGORY_META[cat] || { label: cat, color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200' };
                      const isActive = selectedCategory === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(isActive ? null : cat)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all flex-shrink-0 whitespace-nowrap flex items-center gap-1 ${isActive ? 'bg-blue-600 border-blue-600 text-white shadow-sm' : `${meta.bg} ${meta.color} ${meta.border} hover:opacity-85`}`}
                        >
                          {meta.label}
                        </button>
                      );
                    })}
                  </div>

                  {(searchQuery.trim() !== '' || selectedCategory) && (
                    <div className="mt-3">
                      <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                        <span>{selectedCategory ? `${CATEGORY_META[selectedCategory]?.label || selectedCategory} Tools` : 'Search Results'}</span>
                        <span className="text-slate-300 dark:text-slate-700 font-mono text-[9px]">{searchResults.length} matched</span>
                      </div>
                      {searchResults.length > 0 ? (
                        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
                          {searchResults.map(c => {
                            const meta = CATEGORY_META[c.category] || { label: c.category, color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200' };
                            return (
                              <button
                                key={c.id}
                                onClick={() => handleSelectCalculator(c.id)}
                                className="text-left w-full px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent hover:border-slate-100 dark:hover:border-slate-800/40 transition-all flex items-center justify-between gap-3 group"
                              >
                                <div className="flex flex-col min-w-0 flex-1">
                                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors truncate">
                                    {c.name}
                                  </span>
                                  <span className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-1 mt-0.5">
                                    {c.shortDescription}
                                  </span>
                                </div>
                                <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border flex-shrink-0 ${meta.bg} ${meta.color} ${meta.border}`}>
                                  {meta.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-xs text-slate-400 dark:text-slate-500 py-6 text-center font-medium">
                          No calculators matching the criteria
                        </div>
                      )}
                    </div>
                  )}

                  {searchQuery.trim() === '' && !selectedCategory && (
                    <div className="mt-3">
                      <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Popular Searches</div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {['emi-calculator', 'sip-calculator', 'income-tax-calculator', 'emergency-fund-calculator'].map(id => {
                          const calc = calculators.find(c => c.id === id);
                          if (!calc) return null;
                          return (
                            <button
                              key={id}
                              onClick={() => handleSelectCalculator(id)}
                              className="text-left px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-all truncate"
                            >
                              {calc.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Regional / Currency Selector Dropdown */}
            <div ref={regionalRef} className="relative">
              <button
                onClick={() => setRegionalOpen(!regionalOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-xs font-bold text-slate-700 dark:text-slate-200"
                id="regional-settings-btn"
                title="Regional and Currency Settings"
              >
                <span className="text-base select-none leading-none">{currentPreset.flag}</span>
                <span className="uppercase tracking-wider font-mono text-[10px]">{currentPreset.currency}</span>
                <span className="font-semibold text-slate-400 dark:text-slate-500 text-[10px]">({currentPreset.symbol})</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {regionalOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-3.5 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                  <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2.5 px-1.5 flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-blue-500" />
                    <span>Regional Settings</span>
                  </div>
                  
                  <div className="flex flex-col gap-0.5 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
                    {REGIONAL_PRESETS.map(preset => {
                      const isActive = preset.id === currentPreset.id;
                      return (
                        <button
                          key={preset.id}
                          onClick={() => {
                            setPreset(preset.id);
                            setRegionalOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-2 rounded-xl transition-all flex items-center justify-between group ${isActive ? 'bg-blue-50 dark:bg-blue-950/40 border border-blue-100/30 dark:border-blue-900/40 text-blue-600 dark:text-cyan-400 font-bold' : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent text-slate-700 dark:text-slate-300'}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base select-none leading-none">{preset.flag}</span>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold leading-none group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                                {preset.name}
                              </span>
                              <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 uppercase font-mono font-medium">
                                {preset.currency} ({preset.symbol}) • {preset.locale}
                              </span>
                            </div>
                          </div>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-400 shadow-sm" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              id="theme-toggle-btn"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-500" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              id="mobile-menu-toggle-btn"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-200">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <div className="flex flex-col gap-1">
              <button
                onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
                className={`text-left w-full px-4 py-2.5 rounded-xl text-sm font-bold ${currentView === 'home' ? 'bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-cyan-400' : 'text-slate-700 dark:text-slate-200'}`}
              >
                Home
              </button>
              <button
                onClick={() => { onNavigate('calculators-all'); setMobileMenuOpen(false); }}
                className={`text-left w-full px-4 py-2.5 rounded-xl text-sm font-bold ${currentView === 'calculators-all' ? 'bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-cyan-400' : 'text-slate-700 dark:text-slate-200'}`}
              >
                Finance Tools (70+ Simulators)
              </button>
              <button
                onClick={() => { onNavigate('category-guides', { category: 'guides' }); setMobileMenuOpen(false); }}
                className={`text-left w-full px-4 py-2.5 rounded-xl text-sm font-bold ${currentView === 'category-guides' ? 'bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-cyan-400' : 'text-slate-700 dark:text-slate-200'}`}
              >
                Guides & Tutorials
              </button>
              <button
                onClick={() => { onNavigate('blog'); setMobileMenuOpen(false); }}
                className={`text-left w-full px-4 py-2.5 rounded-xl text-sm font-bold ${currentView === 'blog' ? 'bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-cyan-400' : 'text-slate-700 dark:text-slate-200'}`}
              >
                Wealth Blog
              </button>
              <button
                onClick={() => { onNavigate('sitemap'); setMobileMenuOpen(false); }}
                className={`text-left w-full px-4 py-2.5 rounded-xl text-sm font-bold ${currentView === 'sitemap' ? 'bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-cyan-400' : 'text-slate-700 dark:text-slate-200'}`}
              >
                Portal Categories
              </button>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 px-4">
              <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2.5">Finance Category Hubs</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'investment', label: 'Investment' },
                  { id: 'loans', label: 'Loans' },
                  { id: 'emi', label: 'EMI' },
                  { id: 'mutual-funds', label: 'Mutual Funds' },
                  { id: 'retirement', label: 'Retirement' },
                  { id: 'savings', label: 'Savings' },
                  { id: 'budgeting', label: 'Budgeting' },
                  { id: 'taxes', label: 'Taxes' },
                  { id: 'insurance', label: 'Insurance' },
                  { id: 'banking', label: 'Banking' },
                  { id: 'credit-cards', label: 'Credit Cards' },
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => { onNavigate(`category-${sub.id}`, { category: sub.id }); setMobileMenuOpen(false); }}
                    className="px-3 py-2 rounded-xl text-left border border-slate-100 dark:border-slate-850 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 px-4">
              <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2.5">Company Principles</div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { view: 'about-us', label: 'About' },
                  { view: 'editorial-policy', label: 'Editorial' },
                  { view: 'contact-us', label: 'Contact' },
                ].map(lnk => (
                  <button
                    key={lnk.view}
                    onClick={() => { onNavigate(lnk.view); setMobileMenuOpen(false); }}
                    className="px-2 py-1.5 rounded-lg text-center border border-slate-100 dark:border-slate-850 text-[10px] font-bold text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    {lnk.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 px-4">
              <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2.5 font-sans">Regional Presets</div>
              <div className="grid grid-cols-2 gap-2">
                {REGIONAL_PRESETS.map(preset => {
                  const isActive = preset.id === currentPreset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => setPreset(preset.id)}
                      className={`px-3 py-2 rounded-xl text-left border text-[11px] font-bold transition-all flex items-center gap-1.5 ${isActive ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/20 dark:border-blue-900/50 dark:text-cyan-400' : 'border-slate-100 dark:border-slate-850 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                      <span className="text-sm">{preset.flag}</span>
                      <span className="truncate">{preset.currency}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
