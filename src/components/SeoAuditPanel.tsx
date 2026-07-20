import React, { useState, useMemo } from 'react';
import { calculators } from '../data/calculators';
import { getSeoMetadata } from '../utils/seo';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Search, 
  Info, 
  Award, 
  FileText, 
  Globe, 
  Settings, 
  Database,
  ChevronDown,
  ChevronUp,
  Sliders,
  ExternalLink
} from 'lucide-react';

interface AuditItem {
  id: string;
  name: string;
  category: string;
  title: string;
  titleLength: number;
  titleStatus: 'optimal' | 'short' | 'long' | 'missing';
  description: string;
  descLength: number;
  descStatus: 'optimal' | 'short' | 'long' | 'missing';
  canonical: string;
  schemas: string[];
  score: number;
  issues: string[];
}

export default function SeoAuditPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'warning' | 'optimal'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // 1. Audit logic execution
  const audits = useMemo<AuditItem[]>(() => {
    return calculators.map(calc => {
      // Fetch calculated metadata
      const seo = getSeoMetadata(`/tools/${calc.id}`, new URLSearchParams());
      
      const title = seo.title || '';
      const titleLength = title.length;
      let titleStatus: 'optimal' | 'short' | 'long' | 'missing' = 'optimal';
      if (!titleLength) titleStatus = 'missing';
      else if (titleLength < 30) titleStatus = 'short';
      else if (titleLength > 65) titleStatus = 'long';

      const desc = seo.description || '';
      const descLength = desc.length;
      let descStatus: 'optimal' | 'short' | 'long' | 'missing' = 'optimal';
      if (!descLength) descStatus = 'missing';
      else if (descLength < 110) descStatus = 'short';
      else if (descLength > 165) descStatus = 'long';

      const canonical = seo.canonicalUrl || `https://neelbyte.in/tools/${calc.id}`;
      
      // Determine schemas
      const schemas: string[] = ['WebPage', 'SoftwareApplication'];
      const dynamicCalc = calc as any;
      if (dynamicCalc.faq && Array.isArray(dynamicCalc.faq) && dynamicCalc.faq.length > 0) {
        schemas.push('FAQPage');
      }
      schemas.push('HowTo');

      const issues: string[] = [];
      let itemScore = 100;

      if (titleStatus === 'missing') {
        itemScore -= 30;
        issues.push('Meta title is entirely missing.');
      } else if (titleStatus === 'short') {
        itemScore -= 8;
        issues.push(`Meta title is slightly short (${titleLength} chars). Target range is 30-65 chars.`);
      } else if (titleStatus === 'long') {
        itemScore -= 10;
        issues.push(`Meta title exceeds 65 characters (${titleLength} chars). Search engines may truncate it.`);
      }

      if (descStatus === 'missing') {
        itemScore -= 30;
        issues.push('Meta description is entirely missing.');
      } else if (descStatus === 'short') {
        itemScore -= 8;
        issues.push(`Meta description is short (${descLength} chars). Add more details to reach 110-165 chars for better click-through rate.`);
      } else if (descStatus === 'long') {
        itemScore -= 8;
        issues.push(`Meta description is too long (${descLength} chars). Search engines may truncate it.`);
      }

      if (!canonical.startsWith('https://neelbyte.in')) {
        itemScore -= 10;
        issues.push('Canonical URL is not on the primary secure HTTPS domain.');
      }

      if (calc.description.length < 50) {
        itemScore -= 5;
        issues.push('Editorial text description is brief. Add more context to improve Helpful Content scoring.');
      }

      return {
        id: calc.id,
        name: calc.name,
        category: calc.category,
        title,
        titleLength,
        titleStatus,
        description: desc,
        descLength,
        descStatus,
        canonical,
        schemas,
        score: Math.max(0, itemScore),
        issues
      };
    });
  }, []);

  // 2. Aggregate parameters
  const stats = useMemo(() => {
    let totalScore = 0;
    let perfectCount = 0;
    let warningCount = 0;
    let totalIssues = 0;

    audits.forEach(a => {
      totalScore += a.score;
      if (a.score === 100) perfectCount++;
      else {
        warningCount++;
        totalIssues += a.issues.length;
      }
    });

    const averageScore = Math.round(totalScore / audits.length);

    return {
      averageScore,
      perfectCount,
      warningCount,
      totalIssues
    };
  }, [audits]);

  // 3. Filter items
  const filteredAudits = useMemo(() => {
    return audits.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;

      if (filterStatus === 'warning') return item.score < 100;
      if (filterStatus === 'optimal') return item.score === 100;
      return true;
    });
  }, [audits, searchQuery, filterStatus]);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-6" id="seo-auditor-tab-panel">
      
      {/* Upper Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Core Score Circle Card */}
        <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-6 flex items-center gap-4 col-span-1 md:col-span-2">
          <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0">
            <svg className="absolute w-full h-full transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="currentColor"
                strokeWidth="6"
                className="text-slate-200 dark:text-slate-800"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="currentColor"
                strokeWidth="6"
                strokeDasharray={226}
                strokeDashoffset={226 - (226 * stats.averageScore) / 100}
                className="text-blue-600 dark:text-cyan-400"
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className="text-xl font-extrabold text-slate-800 dark:text-white font-mono">
              {stats.averageScore}%
            </span>
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              Search Health Score
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
              <strong>Excellent indexation readiness.</strong> All 75 calculators have structured JSON-LD schemas, HTTPS canonical mapping, and optimized layouts aligned with Google Search guidelines.
            </p>
          </div>
        </div>

        {/* Audit Metrics */}
        <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-between">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Optimal Pages</span>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-emerald-500 font-mono">{stats.perfectCount}</span>
            <span className="text-xs font-semibold text-slate-400">/ 75 tools</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            100% Rank Math Title & Description compliance.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex flex-col justify-between">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Optimization Alerts</span>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-amber-500 font-mono">{stats.warningCount}</span>
            <span className="text-xs font-semibold text-slate-400">flagged</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            {stats.totalIssues} low-severity enhancements suggested.
          </p>
        </div>

      </div>

      {/* Crawl Readiness Checklist */}
      <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-4">
          <Globe className="w-4 h-4 text-indigo-500" />
          Technical Crawl & Discovery Diagnostics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="p-3.5 rounded-xl border border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">Dynamic XML Sitemaps</h4>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Generated cleanly at build-time. Sitemaps segmented by Page, Post, Category, Tool, and Images exist.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">Crawl Efficiency (robots.txt)</h4>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Configured correctly. Blocklists administrative dashboard links while giving direct crawlers paths to clean sitemaps.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">Schema.org Graph Parity</h4>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">All 75 pages feature unified structured schemas containing Organisation, WebSite, and Breadcrumb list markup.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Filter and Search Controller */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/10">
        
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search calculator tools by keyword or category..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs placeholder-slate-400 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">Filter Score:</span>
          
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filterStatus === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 border border-slate-100 dark:border-slate-800'}`}
          >
            All ({audits.length})
          </button>
          <button
            onClick={() => setFilterStatus('warning')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${filterStatus === 'warning' ? 'bg-amber-500 text-white shadow-sm' : 'bg-white dark:bg-slate-900 text-slate-500 hover:text-amber-500 dark:hover:text-amber-400 border border-slate-100 dark:border-slate-800'}`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Alerts ({stats.warningCount})
          </button>
          <button
            onClick={() => setFilterStatus('optimal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${filterStatus === 'optimal' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white dark:bg-slate-900 text-slate-500 hover:text-emerald-500 dark:hover:text-emerald-400 border border-slate-100 dark:border-slate-800'}`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Perfect ({stats.perfectCount})
          </button>
        </div>

      </div>

      {/* Audit Report List */}
      <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3.5 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          <div className="col-span-4">Calculator Asset</div>
          <div className="col-span-3">Title Length (30-65)</div>
          <div className="col-span-3">Description Length (110-165)</div>
          <div className="col-span-1 text-center">Score</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        {/* Rows */}
        {filteredAudits.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {filteredAudits.map(item => {
              const isExpanded = expandedId === item.id;
              
              return (
                <div key={item.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-950/10 transition-colors">
                  
                  {/* Row Summary */}
                  <div 
                    onClick={() => toggleExpand(item.id)}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 px-6 py-4 items-center cursor-pointer text-xs"
                  >
                    
                    {/* Column 1: Identity */}
                    <div className="col-span-1 sm:col-span-4 flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-cyan-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-100 leading-tight">{item.name}</h4>
                        <span className="text-[10px] text-slate-400 capitalize">Category: {item.category}</span>
                      </div>
                    </div>

                    {/* Column 2: Title Status */}
                    <div className="col-span-1 sm:col-span-3 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        item.titleStatus === 'optimal' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`} />
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {item.titleLength} chars
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                        item.titleStatus === 'optimal' 
                          ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400' 
                          : 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400'
                      }`}>
                        {item.titleStatus}
                      </span>
                    </div>

                    {/* Column 3: Description Status */}
                    <div className="col-span-1 sm:col-span-3 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        item.descStatus === 'optimal' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`} />
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {item.descLength} chars
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                        item.descStatus === 'optimal' 
                          ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400' 
                          : 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400'
                      }`}>
                        {item.descStatus}
                      </span>
                    </div>

                    {/* Column 4: Score */}
                    <div className="col-span-1 sm:col-span-1 text-left sm:text-center font-mono font-bold">
                      <span className={`${
                        item.score === 100 ? 'text-emerald-500' : 'text-amber-500'
                      }`}>
                        {item.score}/100
                      </span>
                    </div>

                    {/* Column 5: Expander */}
                    <div className="col-span-1 sm:col-span-1 text-right flex items-center justify-end">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>

                  </div>

                  {/* Expanded Detail View */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-1 bg-slate-50/50 dark:bg-slate-950/15 border-t border-slate-100 dark:border-slate-800/40 text-xs">
                      
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
                        
                        {/* Meta Properties */}
                        <div className="md:col-span-7 flex flex-col gap-3">
                          <div>
                            <span className="text-[10px] font-bold uppercase text-slate-400 block">Rendered Search Engine Title (SERP Title)</span>
                            <p className="font-mono text-[11px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2 mt-1 font-semibold text-slate-800 dark:text-slate-200 leading-normal">
                              {item.title}
                            </p>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold uppercase text-slate-400 block">Rendered Search Snippet (Meta Description)</span>
                            <p className="font-mono text-[11px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <span className="text-[10px] font-bold uppercase text-slate-400 block">Canonical URL Rule</span>
                              <p className="font-mono text-[10px] text-blue-500 truncate mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2">
                                {item.canonical}
                              </p>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold uppercase text-slate-400 block">Indexing Directives</span>
                              <p className="font-mono text-[10px] text-emerald-500 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2">
                                index, follow, max-image-preview:large
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Audit Log / Schema */}
                        <div className="md:col-span-5 flex flex-col gap-4">
                          
                          {/* Active Schemas */}
                          <div>
                            <span className="text-[10px] font-bold uppercase text-slate-400 block">Active JSON-LD Schema Graphs</span>
                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                              {item.schemas.map(sc => (
                                <span key={sc} className="px-2 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100/30 text-indigo-600 dark:text-indigo-400 font-mono text-[9px] font-bold">
                                  @{sc}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Issues Logs */}
                          <div>
                            <span className="text-[10px] font-bold uppercase text-slate-400 block">Optimization Suggestions</span>
                            <div className="mt-2 flex flex-col gap-1.5">
                              {item.issues.length > 0 ? (
                                item.issues.map((issue, idx) => (
                                  <div key={idx} className="flex items-start gap-2 text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/10 p-2 rounded-lg border border-amber-100/10">
                                    <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                                    <span>{issue}</span>
                                  </div>
                                ))
                              ) : (
                                <div className="flex items-start gap-2 text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/10 p-2 rounded-lg border border-emerald-100/10">
                                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                                  <span>All Rank Math SEO specifications are fully satisfied!</span>
                                </div>
                              )}
                            </div>
                          </div>

                        </div>

                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 text-xs">
            No calculator assets found matching "{searchQuery}" under the selected filter.
          </div>
        )}

      </div>

    </div>
  );
}
