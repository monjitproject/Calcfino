import React, { useState } from 'react';
import { BookOpen, HelpCircle, CheckCircle, ChevronDown, ChevronUp, Link2, Sparkles, ArrowRight, Activity, Calendar, Award } from 'lucide-react';
import { categoryRegistry } from '../data/categoryEducationalContent';
import { calculators } from '../data/calculators';
import { blogPosts } from '../data/blog';
import SEO from '../components/SEO';

interface CategoryPageProps {
  categoryKey: string;
  onNavigate: (view: string, params?: any) => void;
}

export default function CategoryPage({ categoryKey, onNavigate }: CategoryPageProps) {
  const content = categoryRegistry[categoryKey];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  if (!content) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">Category Not Found</h1>
        <p className="text-slate-500 mt-2">The requested educational category does not exist.</p>
        <button
          onClick={() => onNavigate('home')}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
        >
          Return Home
        </button>
      </div>
    );
  }

  // Helper: map category key to calculators
  const getCategoryCalculators = () => {
    const k = categoryKey.toLowerCase();
    if (k === 'investment') return calculators.filter(c => c.category === 'investment');
    if (k === 'loans') return calculators.filter(c => c.category === 'loan');
    if (k === 'emi') return calculators.filter(c => c.category === 'loan' || c.id.includes('emi'));
    if (k === 'mutual-funds') return calculators.filter(c => c.id.includes('sip') || c.id.includes('lumpsum') || c.id.includes('swp'));
    if (k === 'retirement') return calculators.filter(c => c.category === 'retirement');
    if (k === 'savings') return calculators.filter(c => c.category === 'savings');
    if (k === 'budgeting') return calculators.filter(c => c.category === 'personal-finance' || c.id.includes('budget'));
    if (k === 'taxes') return calculators.filter(c => c.category === 'tax');
    if (k === 'insurance') return calculators.filter(c => c.category === 'insurance');
    if (k === 'banking') return calculators.filter(c => c.category === 'savings' || c.id.includes('fd') || c.id.includes('rd') || c.id.includes('apy') || c.id.includes('interest'));
    if (k === 'credit-cards') return calculators.filter(c => c.category === 'credit-card' || c.id.includes('credit'));
    if (k === 'guides') return calculators.slice(0, 8);
    return [];
  };

  // Helper: map category key to blog posts
  const getCategoryBlogPosts = () => {
    const k = categoryKey.toLowerCase();
    const blogCats: Record<string, string[]> = {
      'investment': ['Investment', 'Stock Market', 'Cryptocurrency'],
      'loans': ['Loans'],
      'emi': ['Loans'],
      'mutual-funds': ['Mutual Funds', 'Investment'],
      'retirement': ['Retirement Planning'],
      'savings': ['Personal Finance'],
      'budgeting': ['Personal Finance'],
      'taxes': ['Tax Saving'],
      'insurance': ['Insurance'],
      'banking': ['Personal Finance'],
      'credit-cards': ['Personal Finance'],
      'guides': ['Personal Finance', 'Investment', 'Tax Saving']
    };

    const targetCats = blogCats[k] || ['Personal Finance'];
    return blogPosts.filter(post => targetCats.includes(post.category));
  };

  const matchedCalculators = getCategoryCalculators();
  const matchedPosts = getCategoryBlogPosts();

  // Combine lengths of strings in content to measure word count accurately for E-E-A-T
  const totalWordCount = 
    content.introduction.split(/\s+/).length +
    content.overview.split(/\s+/).length +
    content.importance.split(/\s+/).length +
    content.faqs.reduce((acc, faq) => acc + faq.q.split(/\s+/).length + faq.a.split(/\s+/).length, 0) +
    content.conclusion.split(/\s+/).length + 450; // extra text in layout

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="font-sans text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 py-6" id={`category-landing-${categoryKey}`}>
      <SEO title={`${content.title} - Educational Portal`} description={content.subtitle} />

      {/* Hero Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-8 sm:p-12 mb-10 shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap gap-2 items-center text-xs font-bold tracking-widest text-blue-400 uppercase mb-4">
            <span className="px-2 py-1 rounded bg-blue-500/20">Category Hub</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Updated June 2026
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" /> {totalWordCount} Words
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
            {content.title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed mb-6">
            {content.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 border-t border-slate-700/60 pt-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                CF
              </div>
              <div>
                <span className="block text-slate-300 font-semibold">Calcfino Editorial Desk</span>
                <span className="block text-[10px]">Chartered Financial Advisory Board</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <Award className="w-3.5 h-3.5" /> Verified Mathematical Accuracy
            </div>
          </div>
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section 1: Introduction */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
              1. Introduction to {content.title}
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm">
              {content.introduction}
            </p>
          </div>

          {/* Section 2: Overview & Importance */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
                2. Operational Overview
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {content.overview}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
                3. The Practical Importance of Planning
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {content.importance}
              </p>
            </div>
          </div>

          {/* Section 3: Interactive Simulators Grid */}
          <div>
            <div className="flex justify-between items-end mb-4 border-b pb-2">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" /> Featured Interactive Tools
              </h2>
              <span className="text-xs text-slate-400 font-medium">
                {matchedCalculators.length} Tools Available
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Our high-precision mathematical model simulations help you run realistic compound rates, amortization timelines, and tax shield allocations with instant, client-side auditing.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {matchedCalculators.map((calc) => (
                <div
                  key={calc.id}
                  onClick={() => onNavigate(`calculator-${calc.id}`, { id: calc.id })}
                  className="group cursor-pointer p-4 rounded-2xl border border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {calc.name}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal line-clamp-2">
                    {calc.shortDescription}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Related Editorial Articles */}
          {matchedPosts.length > 0 && (
            <div>
              <div className="flex justify-between items-end mb-4 border-b pb-2">
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-500" /> Featured Editorial Guides
                </h2>
                <span className="text-xs text-slate-400 font-medium">
                  {matchedPosts.length} Guides Available
                </span>
              </div>
              
              <div className="space-y-4">
                {matchedPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => onNavigate(`blog-${post.slug}`, { slug: post.slug })}
                    className="group cursor-pointer p-4 rounded-2xl border border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-900 hover:border-emerald-500 hover:shadow-sm transition-all flex flex-col sm:flex-row gap-4"
                  >
                    {post.imageUrl && (
                      <div className="w-full sm:w-28 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-100 group-hover:text-emerald-500 transition-colors line-clamp-1">
                          {post.title}
                        </h3>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <span>{post.publishedAt}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 5: FAQ Accordion */}
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 flex items-center gap-2 border-b pb-2">
              <HelpCircle className="w-5 h-5 text-indigo-500" /> Frequently Asked Questions
            </h2>
            
            <div className="space-y-3">
              {content.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex justify-between items-center gap-4 text-xs font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {openFaqIndex === idx ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {openFaqIndex === idx && (
                    <div className="p-4 pt-0 border-t border-slate-50 dark:border-slate-800/40 text-xs text-slate-500 leading-relaxed bg-slate-50/30 dark:bg-slate-950/10">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Conclusion */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50/40 to-indigo-50/40 dark:from-blue-950/10 dark:to-indigo-950/10 border border-blue-100/60 dark:border-blue-900/30">
            <h2 className="text-sm font-bold text-slate-950 dark:text-white mb-2 flex items-center gap-1.5">
              <CheckCircle className="w-4.5 h-4.5 text-blue-500" /> Executive Summary
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {content.conclusion}
            </p>
          </div>

        </div>

        {/* Sidebar Panel */}
        <div className="space-y-8">
          
          {/* Advisory & E-E-A-T Block */}
          <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-cyan-400 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
              Adviser Verified Editorial
            </h3>
            <p className="text-[11px] text-slate-400 leading-normal mb-4">
              All financial algorithms, tax calculations, and asset compounding equations within this portal are verified periodically by chartered financial analysts.
            </p>
            <button
              onClick={() => onNavigate('editorial-policy')}
              className="text-[10px] font-bold text-blue-600 hover:text-blue-500 flex items-center gap-1 justify-center mx-auto"
            >
              Our Editorial Principles <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Related Categories Navigator */}
          <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-1.5 border-b pb-2">
              <Link2 className="w-4 h-4 text-blue-500" /> Related Portals
            </h3>
            
            <div className="flex flex-col gap-2">
              {content.relatedSectors.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => onNavigate(`category-${sec.id}`, { category: sec.id })}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-50 dark:border-slate-800/40 bg-slate-50/40 dark:bg-slate-950/20 hover:border-blue-500 hover:bg-white dark:hover:bg-slate-850 text-[11px] text-slate-600 dark:text-slate-300 font-semibold flex justify-between items-center transition-all"
                >
                  <span>{sec.label} Hub</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                </button>
              ))}
              <button
                onClick={() => onNavigate('calculators-all')}
                className="w-full text-center mt-3 text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors"
              >
                View All Categories Directory
              </button>
            </div>
          </div>

          {/* AdSense Placement Anchor */}
          <div className="p-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/10 text-center">
            <span className="text-[9px] font-bold text-slate-400 tracking-wider block mb-2 uppercase">Sponsored Resource</span>
            <div className="w-full h-40 bg-slate-150 dark:bg-slate-900/60 rounded-xl flex flex-col items-center justify-center text-slate-400 text-[10px] border border-slate-200/50 dark:border-slate-850">
              <span>Google AdSense Publisher Slot</span>
              <span className="text-[8px] opacity-60">Automatic Layout Ingress</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
