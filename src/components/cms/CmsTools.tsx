import React, { useState, useMemo } from 'react';
import { useCms, CmsCalculator } from '../../context/CmsContext';
import { 
  Sliders, 
  Search, 
  Edit3, 
  FileText, 
  Award, 
  HelpCircle, 
  Link, 
  Check, 
  Undo2, 
  Settings, 
  AlertCircle,
  FileCode,
  Globe,
  Tag
} from 'lucide-react';

export default function CmsTools() {
  const { calculators, articles, updateCalculator } = useCms();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [formula, setFormula] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [readingTime, setReadingTime] = useState('3 min read');
  const [updatedDate, setUpdatedDate] = useState('');
  const [authorId, setAuthorId] = useState('a2');
  const [relatedTools, setRelatedTools] = useState<string[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<string[]>([]);

  // Filtered calculators list
  const filteredCalculators = useMemo(() => {
    return calculators.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [calculators, searchQuery]);

  // Load editor form
  const handleEdit = (calc: CmsCalculator) => {
    setEditingId(calc.id);
    setName(calc.name);
    setShortDescription(calc.shortDescription);
    setDescription(calc.description);
    setFormula(calc.formula);
    setSeoTitle(calc.seoTitle || '');
    setSeoDescription(calc.seoDescription || '');
    setDifficulty(calc.difficulty || 'intermediate');
    setReadingTime(calc.readingTime || '3 min read');
    setUpdatedDate(calc.updatedDate || 'July 10, 2026');
    setAuthorId(calc.authorId || 'a2');
    setRelatedTools(calc.relatedTools || []);
    setRelatedArticles(calc.relatedArticles || []);
  };

  // Save changes
  const handleSave = () => {
    if (!editingId) return;

    updateCalculator(editingId, {
      name,
      shortDescription,
      description,
      formula,
      seoTitle,
      seoDescription,
      difficulty,
      readingTime,
      updatedDate,
      authorId,
      relatedTools,
      relatedArticles
    });

    setEditingId(null);
  };

  // Internal linking toggler helper
  const handleToggleToolLink = (toolId: string) => {
    if (relatedTools.includes(toolId)) {
      setRelatedTools(relatedTools.filter(id => id !== toolId));
    } else {
      setRelatedTools([...relatedTools, toolId]);
    }
  };

  const handleToggleArticleLink = (artSlug: string) => {
    if (relatedArticles.includes(artSlug)) {
      setRelatedArticles(relatedArticles.filter(slug => slug !== artSlug));
    } else {
      setRelatedArticles([...relatedArticles, artSlug]);
    }
  };

  return (
    <div className="flex flex-col gap-6" id="cms-tools-panel">
      
      {!editingId ? (
        <>
          {/* Header & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Finance Tool Metadata Repository</h2>
            <div className="text-[10px] text-slate-400 font-mono">Indexable Tools: {calculators.length}</div>
          </div>

          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search indexable calculator templates (SIP, EMI, PPF, inflation, tax...)"
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Calculator Grid List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCalculators.map(calc => (
              <div 
                key={calc.id} 
                className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between hover:border-blue-500/50 hover:shadow-sm transition-all"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm leading-tight flex items-center gap-2">
                        {calc.name}
                      </h3>
                      <span className="text-[9px] font-mono font-bold text-slate-400 uppercase mt-0.5 block">{calc.id}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-cyan-400 font-medium text-[9px] capitalize font-mono">
                      {calc.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed line-clamp-2">
                    {calc.shortDescription}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">Difficulty: <strong className="text-slate-600 dark:text-slate-200 capitalize">{calc.difficulty || 'intermediate'}</strong></span>
                    <span className="flex items-center gap-1">Inputs: <strong className="text-slate-600 dark:text-slate-200">{calc.inputs.length} fields</strong></span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/40">
                  <div className="flex gap-1">
                    <span className="text-[9px] px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-950/20 text-slate-400 font-bold border border-slate-200/20">
                      {calc.seoTitle ? 'SEO CUSTOM' : 'SEO DEFAULT'}
                    </span>
                  </div>

                  <button
                    onClick={() => handleEdit(calc)}
                    className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/30 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600 dark:hover:text-cyan-400 text-slate-600 dark:text-slate-300 font-bold text-[10px] flex items-center gap-1.5 transition-colors"
                  >
                    <Edit3 className="w-3 h-3" />
                    Configure Tool Metadata
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        // ACTIVE CALCULATOR METADATA EDITOR SCREEN
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main settings form */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            <div className="flex items-center gap-2 p-3.5 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800 rounded-xl">
              <button
                onClick={() => setEditingId(null)}
                className="px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 flex items-center gap-1"
              >
                <Undo2 className="w-3.5 h-3.5" />
                Back
              </button>
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Customizing: {name} ({editingId})
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 flex flex-col gap-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Calculator Display Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full mt-1 px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Updated Date Label</label>
                  <input
                    type="text"
                    value={updatedDate}
                    onChange={e => setUpdatedDate(e.target.value)}
                    className="w-full mt-1 px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Short Card Excerpt (Unsplash / Sitemap Description)</label>
                <input
                  type="text"
                  value={shortDescription}
                  onChange={e => setShortDescription(e.target.value)}
                  className="w-full mt-1 px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Full Description & Educational Copy (Markdown supported)</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={4}
                  className="w-full mt-1 px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono leading-relaxed"
                />
              </div>

              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Mathematical Formula & Methodology Description</label>
                <textarea
                  value={formula}
                  onChange={e => setFormula(e.target.value)}
                  rows={3}
                  className="w-full mt-1 px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono leading-relaxed"
                  placeholder="e.g. Total Compound Gain = P * [(1 + i)^n - 1] * (1 + i) / i"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-50 dark:border-slate-800/40 pt-4">
                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-blue-500" />
                    SEO Meta Title
                  </label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={e => setSeoTitle(e.target.value)}
                    placeholder="SIP Calculator India - Calculate Compound Mutual Fund Growth"
                    className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-emerald-500" />
                    SEO Meta Description
                  </label>
                  <input
                    type="text"
                    value={seoDescription}
                    onChange={e => setSeoDescription(e.target.value)}
                    placeholder="Calculate your monthly mutual fund returns using our precise SIP planner."
                    className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

            </div>

          </div>

          {/* Right panel: Sidebar internal linking curations */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
              
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Interlinking Schema</h3>
                <span className="px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950/20 text-cyan-600 dark:text-cyan-400 font-mono text-[9px] font-bold uppercase">JSON</span>
              </div>

              {/* Difficulty */}
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Mathematical Difficulty</label>
                <select
                  value={difficulty}
                  onChange={e => setDifficulty(e.target.value as any)}
                  className="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option value="beginner">Beginner (Simple Ratios)</option>
                  <option value="intermediate">Intermediate (Amortizations)</option>
                  <option value="advanced">Advanced (Multi-variable simulations)</option>
                </select>
              </div>

              {/* Reading time */}
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Reading Time estimate</label>
                <input
                  type="text"
                  value={readingTime}
                  onChange={e => setReadingTime(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Related Tools Links */}
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400 flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5 text-blue-500" />
                  Related Calculators
                </label>
                <div className="mt-2 flex flex-col gap-1.5 max-h-32 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-xl">
                  {calculators.filter(c => c.id !== editingId).map(c => (
                    <label key={c.id} className="flex items-center gap-2 text-[11px] cursor-pointer text-slate-600 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={relatedTools.includes(c.id)}
                        onChange={() => handleToggleToolLink(c.id)}
                        className="rounded text-blue-500"
                      />
                      <span className="truncate">{c.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Related Articles Links */}
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-indigo-500" />
                  Related Editorial Guides
                </label>
                <div className="mt-2 flex flex-col gap-1.5 max-h-32 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-xl">
                  {articles.map(art => (
                    <label key={art.slug} className="flex items-center gap-2 text-[11px] cursor-pointer text-slate-600 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={relatedArticles.includes(art.slug)}
                        onChange={() => handleToggleArticleLink(art.slug)}
                        className="rounded text-indigo-500"
                      />
                      <span className="truncate">{art.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Safe action buttons */}
              <div className="flex flex-col gap-2 mt-2">
                <button
                  onClick={handleSave}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Check className="w-4 h-4" />
                  Save Configuration
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="w-full py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold transition-all"
                >
                  Discard
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
