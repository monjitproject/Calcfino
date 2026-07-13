import React, { useState } from 'react';
import { useCms, CmsCategory, CmsTag, CmsAuthor, CmsNavigation, CmsHomepage } from '../../context/CmsContext';
import { 
  Settings, 
  Menu, 
  Home, 
  Folder, 
  Tag, 
  UserCheck, 
  Database, 
  Check, 
  Plus, 
  Trash2, 
  ArrowUpRight, 
  Shuffle, 
  Download, 
  Upload, 
  AlertCircle,
  Copy,
  Undo2
} from 'lucide-react';

export default function CmsSettings() {
  const { 
    categories, 
    tags, 
    authors, 
    navigation, 
    homepage, 
    addCategory, 
    updateCategory, 
    deleteCategory,
    addTag,
    updateTag,
    deleteTag,
    mergeTags,
    addAuthor,
    updateAuthor,
    deleteAuthor,
    updateNavigation,
    updateHomepage,
    resetAllToDefault
  } = useCms();

  const [activeSubTab, setActiveSubTab] = useState<'menus' | 'homepage' | 'taxonomy' | 'authors' | 'backup'>('menus');

  // Forms state
  // Menus
  const [headerLinks, setHeaderLinks] = useState<any[]>([...navigation.header]);
  const [footerLinks, setFooterLinks] = useState<any[]>([...navigation.footer]);
  const [quickLinks, setQuickLinks] = useState<any[]>([...navigation.quickLinks]);

  // Homepage Builder
  const [heroTitle, setHeroTitle] = useState(homepage.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(homepage.heroSubtitle);
  const [newsletterTitle, setNewsletterTitle] = useState(homepage.newsletterTitle);
  const [newsletterSubtitle, setNewsletterSubtitle] = useState(homepage.newsletterSubtitle);

  // Taxonomy (Categories/Tags)
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  
  const [newTagName, setNewTagName] = useState('');
  const [newTagSlug, setNewTagSlug] = useState('');
  const [sourceTagId, setSourceTagId] = useState('');
  const [targetTagId, setTargetTagId] = useState('');
  
  // Author
  const [newAuthorName, setNewAuthorName] = useState('');
  const [newAuthorRole, setNewAuthorRole] = useState('');
  const [newAuthorBio, setNewAuthorBio] = useState('');
  const [newAuthorExpertise, setNewAuthorExpertise] = useState('');

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [exportJsonUrl, setExportJsonUrl] = useState('');

  // Save Menus
  const handleSaveMenus = () => {
    updateNavigation({
      header: headerLinks,
      footer: footerLinks,
      quickLinks: quickLinks
    });
    triggerSuccess();
  };

  // Save Homepage
  const handleSaveHomepage = () => {
    updateHomepage({
      ...homepage,
      heroTitle,
      heroSubtitle,
      newsletterTitle,
      newsletterSubtitle
    });
    triggerSuccess();
  };

  // Add Category
  const handleAddCategory = () => {
    if (!newCatName || !newCatSlug) return;
    addCategory({
      name: newCatName,
      slug: newCatSlug,
      description: newCatDesc
    });
    setNewCatName('');
    setNewCatSlug('');
    setNewCatDesc('');
    triggerSuccess();
  };

  // Add Tag
  const handleAddTag = () => {
    if (!newTagName || !newTagSlug) return;
    addTag({
      name: newTagName,
      slug: newTagSlug
    });
    setNewTagName('');
    setNewTagSlug('');
    triggerSuccess();
  };

  // Merge Tags Trigger
  const handleMergeTags = () => {
    if (!sourceTagId || !targetTagId) return;
    if (sourceTagId === targetTagId) {
      alert('Source and target tags must be distinct nodes.');
      return;
    }
    const sourceTag = tags.find(t => t.id === sourceTagId);
    const targetTag = tags.find(t => t.id === targetTagId);
    if (window.confirm(`Merge Action: Rename all article references using tag "${sourceTag?.name}" to target tag "${targetTag?.name}"? Redundant tag node "${sourceTag?.name}" will be cleaned.`)) {
      mergeTags(sourceTagId, targetTagId);
      setSourceTagId('');
      setTargetTagId('');
      triggerSuccess();
    }
  };

  // Add Author
  const handleAddAuthor = () => {
    if (!newAuthorName || !newAuthorRole) return;
    addAuthor({
      name: newAuthorName,
      role: newAuthorRole,
      bio: newAuthorBio,
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      socialLinks: { twitter: 'https://twitter.com/staff_writer' },
      expertise: newAuthorExpertise.split(',').map(e => e.trim()).filter(Boolean),
      credentials: ['Certified Personal Writer']
    });
    setNewAuthorName('');
    setNewAuthorRole('');
    setNewAuthorBio('');
    setNewAuthorExpertise('');
    triggerSuccess();
  };

  // DB Backup Exporter
  const handleExportDatabase = () => {
    const raw = localStorage.getItem('calcfino_cms_database_v2');
    if (!raw) return;
    
    const blob = new Blob([raw], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `calcfino_cms_sitemap_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  // Copy Markdown frontmatter block template
  const handleCopyMarkdownTemplate = () => {
    const frontmatter = `---
title: "Mastering the 50/30/20 Budgeting Rule"
slug: "mastering-the-50-30-20-budgeting-rule"
excerpt: "Discover how this ratio-based budget structure secure your cash flow."
publishedAt: "${new Date().toLocaleDateString('en-US')}"
category: "Personal Finance"
tags: ["Budgeting", "Saving"]
readTime: "6 min read"
imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c"
author:
  name: "Sarah Jenkins"
  role: "Senior Financial Planner"
---

# Title
Write your markdown content here.`;
    navigator.clipboard.writeText(frontmatter);
    alert('Jekyll / Hugo compatible Markdown Frontmatter Block template copied to your clipboard!');
  };

  const triggerSuccess = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6" id="cms-settings-panel">
      
      {/* Settings Selector Navigation */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-950/60 rounded-2xl border border-slate-200/20 max-w-max">
        <button
          onClick={() => setActiveSubTab('menus')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeSubTab === 'menus' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
        >
          <Menu className="w-4 h-4" />
          Navigation Menus
        </button>
        <button
          onClick={() => setActiveSubTab('homepage')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeSubTab === 'homepage' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
        >
          <Home className="w-4 h-4" />
          Homepage Sections
        </button>
        <button
          onClick={() => setActiveSubTab('taxonomy')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeSubTab === 'taxonomy' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
        >
          <Folder className="w-4 h-4" />
          Categories & Tags
        </button>
        <button
          onClick={() => setActiveSubTab('authors')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeSubTab === 'authors' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
        >
          <UserCheck className="w-4 h-4" />
          Authors
        </button>
        <button
          onClick={() => setActiveSubTab('backup')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeSubTab === 'backup' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
        >
          <Database className="w-4 h-4" />
          Git-Backups & Recovery
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs rounded-xl flex items-center gap-1.5 self-start animate-bounce">
          <Check className="w-4 h-4" />
          Configurations Saved to Browser LocalStorage
        </div>
      )}

      {/* Sub-panels display */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        
        {/* 1. MENUS PANEL */}
        {activeSubTab === 'menus' && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800 dark:text-white">Configure Menus & Sitemap Links</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Customize links parsed dynamically into headers and footer modules.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Header links */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/30 border border-slate-200/20 flex flex-col gap-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Header Menus</span>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                  {headerLinks.map((link, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={link.label}
                        onChange={e => {
                          const updated = [...headerLinks];
                          updated[idx].label = e.target.value;
                          setHeaderLinks(updated);
                        }}
                        className="w-1/2 px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-[11px] font-bold text-slate-700 dark:text-slate-200"
                        placeholder="Label"
                      />
                      <input
                        type="text"
                        value={link.url}
                        onChange={e => {
                          const updated = [...headerLinks];
                          updated[idx].url = e.target.value;
                          setHeaderLinks(updated);
                        }}
                        className="w-1/2 px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-[11px] font-mono text-slate-500"
                        placeholder="URL Route"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer links */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/30 border border-slate-200/20 flex flex-col gap-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Footer Navigation Links</span>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                  {footerLinks.map((link, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={link.label}
                        onChange={e => {
                          const updated = [...footerLinks];
                          updated[idx].label = e.target.value;
                          setFooterLinks(updated);
                        }}
                        className="w-1/2 px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-[11px] font-bold text-slate-700 dark:text-slate-200"
                      />
                      <input
                        type="text"
                        value={link.url}
                        onChange={e => {
                          const updated = [...footerLinks];
                          updated[idx].url = e.target.value;
                          setFooterLinks(updated);
                        }}
                        className="w-1/2 px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-[11px] font-mono text-slate-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <button
              onClick={handleSaveMenus}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm self-start transition-all"
            >
              Commit Menu Configurations
            </button>
          </div>
        )}

        {/* 2. HOMEPAGE BUILDER */}
        {activeSubTab === 'homepage' && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800 dark:text-white">Visual Homepage Sections Editor</h3>
              <p className="text-[11px] text-slate-400 mt-0.5 font-sans">No code modifications required. Manage the text copy directly.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Hero Section Heading</label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={e => setHeroTitle(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-800 dark:text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Hero Subtitle</label>
                <input
                  type="text"
                  value={heroSubtitle}
                  onChange={e => setHeroSubtitle(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Newsletter Section Title</label>
                <input
                  type="text"
                  value={newsletterTitle}
                  onChange={e => setNewsletterTitle(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-800 dark:text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Newsletter Form Subtitle</label>
                <input
                  type="text"
                  value={newsletterSubtitle}
                  onChange={e => setNewsletterSubtitle(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleSaveHomepage}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm self-start mt-4 transition-all"
            >
              Save Homepage Copy
            </button>
          </div>
        )}

        {/* 3. TAXONOMY MANAGEMENT & MERGING */}
        {activeSubTab === 'taxonomy' && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            
            {/* Split row: Categories and Tags list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Category creation */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/30 border border-slate-200/20 flex flex-col gap-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400 flex items-center gap-1.5">
                  <Folder className="w-4 h-4 text-blue-500" />
                  Add Editorial Category Node
                </span>

                <div className="flex flex-col gap-2.5">
                  <input
                    type="text"
                    value={newCatName}
                    onChange={e => setNewCatName(e.target.value)}
                    placeholder="Category name (e.g. Mutual Funds)"
                    className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-xs"
                  />
                  <input
                    type="text"
                    value={newCatSlug}
                    onChange={e => setNewCatSlug(e.target.value)}
                    placeholder="URL Slug (e.g. mutual-funds)"
                    className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-xs font-mono"
                  />
                  <input
                    type="text"
                    value={newCatDesc}
                    onChange={e => setNewCatDesc(e.target.value)}
                    placeholder="Descriptor sentence..."
                    className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-xs"
                  />
                  <button
                    onClick={handleAddCategory}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-950 text-white rounded text-[10px] font-bold self-start mt-1 transition-all"
                  >
                    Add Category
                  </button>
                </div>

                {/* Categories current */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {categories.map(c => (
                    <span key={c.id} className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-cyan-400 font-bold text-[9px] flex items-center gap-1">
                      {c.name}
                      <button onClick={() => deleteCategory(c.id)} className="hover:text-rose-600 text-[11px] font-light">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Tag creation & Taxonomy Merge */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/30 border border-slate-200/20 flex flex-col gap-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-indigo-500" />
                  Tag Manager & Taxonomy Merge
                </span>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTagName}
                    onChange={e => setNewTagName(e.target.value)}
                    placeholder="Tag name"
                    className="w-1/2 px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-xs"
                  />
                  <input
                    type="text"
                    value={newTagSlug}
                    onChange={e => setNewTagSlug(e.target.value)}
                    placeholder="Slug"
                    className="w-1/2 px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-xs font-mono"
                  />
                </div>
                <button
                  onClick={handleAddTag}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-950 text-white rounded text-[10px] font-bold self-start transition-all"
                >
                  Create Tag
                </button>

                {/* Merge controller */}
                <div className="mt-3 pt-3 border-t border-slate-200/40">
                  <span className="text-[9px] font-extrabold uppercase tracking-wide text-slate-400 flex items-center gap-1">
                    <Shuffle className="w-3.5 h-3.5 text-amber-500" /> Combine Redundant Tags
                  </span>
                  
                  <div className="flex gap-2 items-center mt-2">
                    <select
                      value={sourceTagId}
                      onChange={e => setSourceTagId(e.target.value)}
                      className="w-1/2 px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-[10px]"
                    >
                      <option value="">Source Tag (Delete)</option>
                      {tags.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>

                    <span className="text-slate-400">→</span>

                    <select
                      value={targetTagId}
                      onChange={e => setTargetTagId(e.target.value)}
                      className="w-1/2 px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-[10px]"
                    >
                      <option value="">Target Tag (Keep)</option>
                      {tags.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                  </div>
                  <button
                    onClick={handleMergeTags}
                    className="mt-2.5 px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-[9px] uppercase rounded shadow-sm transition-all"
                  >
                    Merge Tags Across Database
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 4. AUTHORS PANEL */}
        {activeSubTab === 'authors' && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800 dark:text-white">Certified Content Authors Registry</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Author metadata mapped to guides to pass Google E-E-A-T search indexer rules.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Add Author Form */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/30 border border-slate-200/20 flex flex-col gap-2.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Add New Author</span>
                <input
                  type="text"
                  value={newAuthorName}
                  onChange={e => setNewAuthorName(e.target.value)}
                  placeholder="Author Full Name"
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-xs"
                />
                <input
                  type="text"
                  value={newAuthorRole}
                  onChange={e => setNewAuthorRole(e.target.value)}
                  placeholder="Role (e.g. CFP Planner)"
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-xs"
                />
                <textarea
                  value={newAuthorBio}
                  onChange={e => setNewAuthorBio(e.target.value)}
                  placeholder="Professional Biography details..."
                  rows={2}
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-xs"
                />
                <input
                  type="text"
                  value={newAuthorExpertise}
                  onChange={e => setNewAuthorExpertise(e.target.value)}
                  placeholder="Expertise tags (comma separated)"
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-xs"
                />
                <button
                  onClick={handleAddAuthor}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-950 text-white rounded text-[10px] font-bold self-start mt-1 transition-all"
                >
                  Save Author
                </button>
              </div>

              {/* Current Authors List */}
              <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
                {authors.map(au => (
                  <div key={au.id} className="p-3.5 bg-slate-50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800 rounded-xl flex items-start gap-3">
                    <img src={au.photoUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-xs">{au.name}</h4>
                      <p className="text-[10px] text-blue-500 font-medium">{au.role}</p>
                      <p className="text-[10px] text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">{au.bio}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* 5. DATABASE BACKUP EXPORTER */}
        {activeSubTab === 'backup' && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800 dark:text-white">CMS Backup Exporter & Markdown Copy Engine</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Maintain absolute, local control over your static content database repository files.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-2">
              
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/30 border border-slate-200/20 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-blue-500" />
                    Export Full JSON Database Backup
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed mt-2">
                    Download a comprehensive backup of the entire custom state: including all newly added articles, custom tool linking maps, authors registry, and page edits in a single structured JSON block.
                  </p>
                </div>
                <button
                  onClick={handleExportDatabase}
                  className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all self-start"
                >
                  <Download className="w-4 h-4" />
                  Download Backup Package
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/30 border border-slate-200/20 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                    <Copy className="w-4 h-4 text-indigo-500" />
                    Copy Markdown YAML Frontmatter Template
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed mt-2">
                    Copy a standard Hugo/Jekyll sitemap-compliant Frontmatter template block to your clipboard to easily write articles matching physical static engine folder structures.
                  </p>
                </div>
                <button
                  onClick={handleCopyMarkdownTemplate}
                  className="mt-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all self-start"
                >
                  <Copy className="w-4 h-4" />
                  Copy Markdown Template
                </button>
              </div>

            </div>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/10 flex gap-2.5 mt-2">
              <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="text-[10px] text-slate-400 leading-normal">
                <strong>Disaster Recovery Warning:</strong> Resetting the database will delete your local session adjustments inside the browser cache and revert all elements back to defaults.
                <button 
                  onClick={() => {
                    if (window.confirm('Erase all local edits and restore original default data templates? This action is non-reversible.')) {
                      resetAllToDefault();
                      window.location.reload();
                    }
                  }}
                  className="ml-2 text-rose-500 font-extrabold hover:underline"
                >
                  Trigger Factory Reset
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
