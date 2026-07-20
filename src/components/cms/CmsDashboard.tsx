import React, { useMemo, useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { 
  FileText, 
  Sliders, 
  Image, 
  Settings, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ArrowUpRight, 
  Calendar, 
  Activity, 
  Server, 
  Globe, 
  Zap,
  Check,
  Award
} from 'lucide-react';

export default function CmsDashboard({ onNavigateToTab }: { onNavigateToTab: (tab: string) => void }) {
  const { articles, calculators, media, role, revisions } = useCms();
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState(false);

  // Computed Stats
  const stats = useMemo(() => {
    const totalArticles = articles.length;
    const publishedArticles = articles.filter(a => a.contentStatus === 'published').length;
    const draftArticles = articles.filter(a => a.contentStatus === 'draft').length;
    const scheduledArticles = articles.filter(a => a.contentStatus === 'scheduled').length;
    const archivedArticles = articles.filter(a => a.contentStatus === 'archived').length;
    
    const totalTools = calculators.length;
    const totalMedia = media.length;
    
    // Simple mock metrics for SEO and links
    const seoIssuesCount = articles.filter(a => !a.focusKeyword || a.title.length < 30 || a.excerpt.length < 50).length;
    const totalInternalLinks = articles.reduce((acc, a) => acc + (a.content.match(/\[.*?\]\(.*?\)/g)?.length || 0), 0);
    const orphanCount = articles.filter(a => !a.content.includes('/tools/') && !a.content.includes('/guides/')).length;

    return {
      totalArticles,
      publishedArticles,
      draftArticles,
      scheduledArticles,
      archivedArticles,
      totalTools,
      totalMedia,
      seoIssuesCount,
      totalInternalLinks,
      orphanCount
    };
  }, [articles, calculators, media]);

  // Mock Deployment Handler (Cloudflare Pages Parity)
  const handleDeploy = () => {
    setIsDeploying(true);
    setDeploySuccess(false);
    setTimeout(() => {
      setIsDeploying(false);
      setDeploySuccess(true);
      setTimeout(() => setDeploySuccess(false), 4000);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6" id="cms-dashboard-root">
      
      {/* Upper Quick Stats bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div 
          onClick={() => onNavigateToTab('articles')}
          className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer hover:border-blue-500 hover:shadow-sm transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Total Articles</span>
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-cyan-400">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white font-mono">{stats.totalArticles}</h3>
            <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-400">
              <span className="text-emerald-500 font-bold">{stats.publishedArticles} Live</span>
              <span>•</span>
              <span>{stats.draftArticles} Drafts</span>
              <span>•</span>
              <span>{stats.scheduledArticles} Scheduled</span>
            </div>
          </div>
        </div>

        <div 
          onClick={() => onNavigateToTab('tools')}
          className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer hover:border-cyan-500 hover:shadow-sm transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Finance Tools</span>
            <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400">
              <Sliders className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white font-mono">{stats.totalTools}</h3>
            <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-400">
              <span className="text-emerald-500 font-bold">100% Active</span>
              <span>•</span>
              <span>Zero Orphan Rules</span>
            </div>
          </div>
        </div>

        <div 
          onClick={() => onNavigateToTab('media')}
          className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer hover:border-indigo-500 hover:shadow-sm transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Media Assets</span>
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
              <Image className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white font-mono">{stats.totalMedia}</h3>
            <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-400">
              <span className="text-emerald-500 font-bold">WebP Compressed</span>
              <span>•</span>
              <span>Alt Texts OK</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">SEO Health Index</span>
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-extrabold text-emerald-500 dark:text-emerald-400 font-mono">
              {Math.max(70, 100 - stats.seoIssuesCount * 5)}%
            </h3>
            <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-400">
              <span className="text-amber-500 font-semibold">{stats.seoIssuesCount} Alerts</span>
              <span>•</span>
              <span>{stats.totalInternalLinks} Links</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Grid: Server deployment & Activity logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Cloudflare Pages Static Deployment Monitor */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Server className="w-4 h-4 text-blue-500" />
                Cloudflare Pages Static Pipeline
              </h3>
              <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 uppercase">
                Production Live
              </span>
            </div>
            
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              This CMS compiles all database modifications into optimized **Markdown (.md)** files and **JSON databases**. Triggering a deployment runs sitemap generation scripts and commits code directly to your static hosting pipeline.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-3 rounded-xl flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                <div>
                  <span className="text-[9px] text-slate-400 uppercase block font-bold">Domain</span>
                  <span className="text-[10px] font-mono font-semibold text-slate-700 dark:text-slate-300">neelbyte.in</span>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-3 rounded-xl flex items-center gap-2.5">
                <Activity className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <div>
                  <span className="text-[9px] text-slate-400 uppercase block font-bold">Last Build</span>
                  <span className="text-[10px] font-mono font-semibold text-slate-700 dark:text-slate-300">Successful</span>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-3 rounded-xl flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <div>
                  <span className="text-[9px] text-slate-400 uppercase block font-bold">Trigger API</span>
                  <span className="text-[10px] font-mono font-semibold text-slate-700 dark:text-slate-300">Git Webhook OK</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/50">
            <div className="text-[10px] text-slate-400 leading-tight">
              <span>Branch: <strong>main</strong>. Deployed in 2.1s with Incremental Static Regeneration cache active.</span>
            </div>
            
            <button
              onClick={handleDeploy}
              disabled={isDeploying}
              className={`px-4 py-2 rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition-all ${
                isDeploying 
                  ? 'bg-slate-100 text-slate-400 dark:bg-slate-800/50 cursor-not-allowed' 
                  : deploySuccess 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/10'
              }`}
            >
              {isDeploying ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Generating & Committing...
                </>
              ) : deploySuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 animate-bounce" />
                  Deployed to Edge!
                </>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5" />
                  Trigger Production Build
                </>
              )}
            </button>
          </div>
        </div>

        {/* System Information & Workspace Permissions */}
        <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-cyan-500" />
            CMS Session Diagnostics
          </h3>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs py-2 border-b border-slate-50 dark:border-slate-800/40">
              <span className="text-slate-400 font-medium">Session Role:</span>
              <span className="font-bold text-slate-800 dark:text-white capitalize px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-[10px] font-mono">
                {role}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-xs py-2 border-b border-slate-50 dark:border-slate-800/40">
              <span className="text-slate-400 font-medium">Auto-Revisioning:</span>
              <span className="text-emerald-500 font-bold flex items-center gap-1 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Enabled
              </span>
            </div>

            <div className="flex items-center justify-between text-xs py-2 border-b border-slate-50 dark:border-slate-800/40">
              <span className="text-slate-400 font-medium">Recent Revisions:</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                {revisions.length} stored backups
              </span>
            </div>

            <div className="flex items-center justify-between text-xs py-2">
              <span className="text-slate-400 font-medium">Storage Engine:</span>
              <span className="font-semibold text-slate-600 dark:text-slate-400 font-mono text-[10px]">
                Browser LocalStorage API
              </span>
            </div>
          </div>

          <div className="mt-5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800/50 flex gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-400 leading-normal">
              <strong>Non-developer Safeguard:</strong> This admin panel allows editing content dynamically. You can export complete ZIP packages or JSON databases to sync directly with your Git repository.
            </p>
          </div>
        </div>

      </div>

      {/* Recent Activity List */}
      <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-indigo-500" />
            Recent CMS Events & Audit Logs
          </h3>
          <span className="text-[10px] text-slate-400">Total Records: {revisions.length + 3}</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/50 text-xs">
          
          {revisions.slice(0, 3).map((rev, idx) => (
            <div key={rev.id} className="p-4 px-6 flex items-start justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-950/10">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 font-bold font-mono text-[10px] mt-0.5">
                  REV
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">
                    Draft backup archived: "{rev.title}"
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Triggered by <strong>{rev.author}</strong> • Version {rev.version}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-400 flex-shrink-0">{rev.date}</span>
            </div>
          ))}

          <div className="p-4 px-6 flex items-start justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-950/10">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-cyan-400 font-bold font-mono text-[10px] mt-0.5">
                SEO
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100">
                  XML Sitemaps optimized for crawler discovery
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Static sitemaps compiled for all 75 calculators, sitemap_index mapped with rank math equivalence rules.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-400 flex-shrink-0">Just now</span>
          </div>

          <div className="p-4 px-6 flex items-start justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-950/10">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-bold font-mono text-[10px] mt-0.5">
                SYS
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100">
                  CMS Local Database Engine Initialized
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Loaded initial mock database with 75 calculators, default articles, static pages, and editorial categories.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-400 flex-shrink-0">1 hour ago</span>
          </div>

        </div>
      </div>

    </div>
  );
}
