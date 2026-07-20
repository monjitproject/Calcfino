import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import CmsDashboard from './CmsDashboard';
import CmsArticles from './CmsArticles';
import CmsTools from './CmsTools';
import CmsMedia from './CmsMedia';
import CmsSettings from './CmsSettings';

import { 
  LayoutDashboard, 
  FileText, 
  Sliders, 
  Folder, 
  Tags, 
  UserCheck, 
  Image, 
  Home, 
  Menu, 
  Globe, 
  BarChart3, 
  Settings as SettingsIcon, 
  Server, 
  Database,
  ArrowUpRight,
  ShieldCheck,
  Award
} from 'lucide-react';

export default function AdminPanelShell() {
  const { role, setRole } = useCms();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [settingsFocusTab, setSettingsFocusTab] = useState<'menus' | 'homepage' | 'taxonomy' | 'authors' | 'backup'>('menus');

  // Sidebar link jump helpers
  const handleSidebarClick = (tabId: string) => {
    if (['categories', 'tags'].includes(tabId)) {
      setSettingsFocusTab('taxonomy');
      setActiveTab('settings');
    } else if (tabId === 'authors') {
      setSettingsFocusTab('authors');
      setActiveTab('settings');
    } else if (tabId === 'homepage') {
      setSettingsFocusTab('homepage');
      setActiveTab('settings');
    } else if (tabId === 'menus') {
      setSettingsFocusTab('menus');
      setActiveTab('settings');
    } else if (['backups', 'settings'].includes(tabId)) {
      setSettingsFocusTab('backup');
      setActiveTab('settings');
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row" id="admin-shell-viewport">
      
      {/* 1. SIDEBAR NAVIGATION CONTROLS */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between p-4 md:sticky md:top-0 md:h-screen flex-shrink-0">
        <div>
          {/* Admin title */}
          <div className="flex items-center gap-3 px-2 py-4 border-b border-slate-800/60 mb-6">
            <div className="p-2 rounded bg-cyan-500/10 text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white tracking-wide">Calcfino CMS</h2>
              <span className="text-[9px] text-slate-400 font-mono tracking-wider font-extrabold uppercase">Git-Based Sandbox</span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="flex flex-col gap-1 text-xs">
            <button
              onClick={() => handleSidebarClick('dashboard')}
              className={`w-full px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => handleSidebarClick('articles')}
              className={`w-full px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'articles' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              <FileText className="w-4 h-4 flex-shrink-0" />
              <span>Articles</span>
            </button>

            <button
              onClick={() => handleSidebarClick('tools')}
              className={`w-full px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'tools' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              <Sliders className="w-4 h-4 flex-shrink-0" />
              <span>Finance Tools</span>
            </button>

            <button
              onClick={() => handleSidebarClick('categories')}
              className={`w-full px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'settings' && settingsFocusTab === 'taxonomy' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              <Folder className="w-4 h-4 flex-shrink-0" />
              <span>Categories</span>
            </button>

            <button
              onClick={() => handleSidebarClick('tags')}
              className={`w-full px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'settings' && settingsFocusTab === 'taxonomy' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              <Tags className="w-4 h-4 flex-shrink-0" />
              <span>Tags</span>
            </button>

            <button
              onClick={() => handleSidebarClick('authors')}
              className={`w-full px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'settings' && settingsFocusTab === 'authors' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              <UserCheck className="w-4 h-4 flex-shrink-0" />
              <span>Authors</span>
            </button>

            <button
              onClick={() => handleSidebarClick('media')}
              className={`w-full px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'media' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              <Image className="w-4 h-4 flex-shrink-0" />
              <span>Media Manager</span>
            </button>

            <button
              onClick={() => handleSidebarClick('homepage')}
              className={`w-full px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'settings' && settingsFocusTab === 'homepage' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              <Home className="w-4 h-4 flex-shrink-0" />
              <span>Homepage Builder</span>
            </button>

            <button
              onClick={() => handleSidebarClick('menus')}
              className={`w-full px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'settings' && settingsFocusTab === 'menus' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              <Menu className="w-4 h-4 flex-shrink-0" />
              <span>Menus / Navigation</span>
            </button>

            <button
              onClick={() => handleSidebarClick('seo')}
              className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between transition-all ${activeTab === 'seo' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              <span className="flex items-center gap-3">
                <Globe className="w-4 h-4 flex-shrink-0" />
                <span>SEO Monitor</span>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[8px] font-bold">LIVE</span>
            </button>

            <button
              onClick={() => handleSidebarClick('analytics')}
              className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between transition-all ${activeTab === 'analytics' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              <span className="flex items-center gap-3">
                <BarChart3 className="w-4 h-4 flex-shrink-0" />
                <span>Analytics</span>
              </span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[8px] font-bold">MOCK</span>
            </button>

            <button
              onClick={() => handleSidebarClick('backups')}
              className={`w-full px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'settings' && settingsFocusTab === 'backup' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              <Database className="w-4 h-4 flex-shrink-0" />
              <span>Git Backups</span>
            </button>
          </nav>
        </div>

        {/* User permissions toggler */}
        <div className="pt-4 border-t border-slate-800/80">
          <div className="px-2 pb-2">
            <span className="text-[9px] font-extrabold uppercase tracking-wide text-slate-500 block mb-1">Access Credentials</span>
            <select
              value={role}
              onChange={e => setRole(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[10px] text-slate-300 font-bold focus:outline-none"
            >
              <option value="administrator">Administrator</option>
              <option value="editor">Editor</option>
              <option value="author">Author</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
          <div className="text-[10px] text-slate-500 px-2 leading-tight">
            <span>Server: <strong>Nginx Proxy</strong>. Ready on 3000.</span>
          </div>
        </div>
      </aside>

      {/* 2. MAIN WORKING INTERFACE CONTENT VIEWPORTS */}
      <main className="flex-1 p-6 md:p-8 bg-slate-900 overflow-y-auto max-w-full">
        
        {/* Top Header of Main panel */}
        <header className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800/60 text-slate-300">
          <div>
            <h1 className="text-xl font-extrabold text-white capitalize leading-tight">
              {activeTab === 'settings' ? `${settingsFocusTab} configurations` : `${activeTab} console`}
            </h1>
            <p className="text-xs text-slate-400 mt-1">Calcfino professional static headless management workbench.</p>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="/" 
              className="px-3.5 py-1.5 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              Return Home
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        {/* Dynamic renders */}
        {activeTab === 'dashboard' && <CmsDashboard onNavigateToTab={handleSidebarClick} />}
        {activeTab === 'articles' && <CmsArticles />}
        {activeTab === 'tools' && <CmsTools />}
        {activeTab === 'media' && <CmsMedia />}
        
        {activeTab === 'settings' && (
          <CmsSettings key={settingsFocusTab} />
        )}

        {/* Simulated SEO panel */}
        {activeTab === 'seo' && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-center gap-6">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-center font-black font-mono text-3xl">
                98%
              </div>
              <div className="text-slate-800 dark:text-slate-200">
                <h3 className="font-extrabold text-sm">Technical SEO Parity Check</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-lg leading-relaxed">
                  Excellent! XML sitemap indexes, structured search-schema formats, custom Robots meta instructions, and Google Image Alt-tags align completely with professional Rank Math Pro specifications.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 font-extrabold text-xs text-slate-400 uppercase tracking-wider">
                Index Status Logs
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/40 text-xs">
                <div className="p-4 px-6 flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">/sitemap_index.xml</span>
                  <span className="text-emerald-500 font-bold">Crawled & Indexed</span>
                </div>
                <div className="p-4 px-6 flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">/tool-sitemap.xml</span>
                  <span className="text-emerald-500 font-bold">Indexed (75 entries)</span>
                </div>
                <div className="p-4 px-6 flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">/post-sitemap.xml</span>
                  <span className="text-emerald-500 font-bold">Indexed (3 entries)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Simulated Analytics */}
        {activeTab === 'analytics' && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Monthly Page Views</span>
                <span className="text-2xl font-black text-slate-800 dark:text-white font-mono mt-2 block">142,520</span>
                <span className="text-[10px] text-emerald-500 font-bold mt-1 block">▲ +12.4% vs last month</span>
              </div>
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Average Core Web Vital Speed</span>
                <span className="text-2xl font-black text-emerald-500 font-mono mt-2 block">0.8s LCP</span>
                <span className="text-[10px] text-emerald-500 font-bold mt-1 block">● Classified as Excellent</span>
              </div>
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Calculator Interaction Count</span>
                <span className="text-2xl font-black text-slate-800 dark:text-white font-mono mt-2 block">48,290</span>
                <span className="text-[10px] text-slate-400 mt-1 block">94% Retention score</span>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
