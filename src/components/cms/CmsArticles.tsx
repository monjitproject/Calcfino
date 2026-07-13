import React, { useState, useMemo, useEffect } from 'react';
import { useCms, CmsArticle, ContentStatus } from '../../context/CmsContext';
import { 
  FileText, 
  Plus, 
  Edit3, 
  Copy, 
  Trash2, 
  Eye, 
  Check, 
  EyeOff, 
  Calendar, 
  BookOpen, 
  Tag, 
  User, 
  Folder, 
  Search, 
  AlertCircle,
  Clock,
  History,
  Undo2,
  Table,
  Link2,
  List,
  AlertOctagon,
  Sparkles,
  RefreshCw,
  Code,
  FileCode
} from 'lucide-react';

export default function CmsArticles() {
  const { 
    articles, 
    authors, 
    categories, 
    revisions,
    addArticle, 
    updateArticle, 
    deleteArticle, 
    duplicateArticle,
    restoreRevision,
    role
  } = useCms();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ContentStatus>('all');
  
  // Active editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'history'>('editor');
  
  // Editor form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [categoryName, setCategoryName] = useState('Personal Finance');
  const [tagsStr, setTagsStr] = useState('');
  const [authorId, setAuthorId] = useState('a1');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600');
  const [contentStatus, setContentStatus] = useState<ContentStatus>('draft');
  const [scheduledDate, setScheduledDate] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [autosaveMsg, setAutosaveMsg] = useState('');

  // 1. Filter articles
  const filteredArticles = useMemo(() => {
    return articles.filter(a => {
      const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            a.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || a.contentStatus === statusFilter;
      return matchesSearch && matchesStatus && !a.deleted;
    });
  }, [articles, searchQuery, statusFilter]);

  // 2. Select article for editing
  const handleEdit = (art: CmsArticle) => {
    setEditingId(art.id);
    setIsCreating(false);
    setIsPreviewMode(false);
    setActiveTab('editor');
    
    // Fill form
    setTitle(art.title);
    setSlug(art.slug);
    setExcerpt(art.excerpt);
    setContent(art.content);
    setCategoryName(art.category);
    setTagsStr(art.tags.join(', '));
    // Find author by name or default
    const foundAuthor = authors.find(aut => aut.name === art.author.name);
    setAuthorId(foundAuthor ? foundAuthor.id : 'a1');
    setImageUrl(art.imageUrl);
    setContentStatus(art.contentStatus);
    setScheduledDate(art.scheduledDate || '');
    setFocusKeyword(art.focusKeyword || '');
  };

  const handleCreateNew = () => {
    setEditingId(null);
    setIsCreating(true);
    setIsPreviewMode(false);
    setActiveTab('editor');
    
    // Clear form
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('# New Article Title\n\nWrite your informative, high-quality Markdown content here. Supports headings, bullets, code blocks, and custom templates.');
    setCategoryName(categories[0]?.name || 'Personal Finance');
    setTagsStr('Budgeting, Savings');
    setAuthorId(authors[0]?.id || 'a1');
    setImageUrl('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600');
    setContentStatus('draft');
    setScheduledDate('');
    setFocusKeyword('');
  };

  // Auto-slug generation from title
  useEffect(() => {
    if (isCreating && title) {
      const generated = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
      setSlug(generated);
    }
  }, [title, isCreating]);

  // Simulated Autosave loop
  useEffect(() => {
    if (!editingId) return;
    const interval = setInterval(() => {
      setAutosaveMsg('Draft autosaved to browser container...');
      setTimeout(() => setAutosaveMsg(''), 2000);
    }, 15000);
    return () => clearInterval(interval);
  }, [editingId]);

  // Save changes
  const handleSave = () => {
    const selectedAuthor = authors.find(au => au.id === authorId) || {
      name: 'Anonymous',
      role: 'Staff Writer',
      photoUrl: '',
      bio: ''
    };

    const tags = tagsStr.split(',').map(t => t.trim()).filter(Boolean);

    const payload = {
      title,
      slug,
      excerpt,
      content,
      category: categoryName,
      tags,
      author: {
        name: selectedAuthor.name,
        role: selectedAuthor.role,
        avatarUrl: selectedAuthor.photoUrl,
        bio: selectedAuthor.bio
      },
      imageUrl,
      contentStatus,
      scheduledDate: contentStatus === 'scheduled' ? scheduledDate : undefined,
      focusKeyword
    };

    if (isCreating) {
      addArticle(payload);
      setIsCreating(false);
    } else if (editingId) {
      updateArticle(editingId, payload);
      setEditingId(null);
    }
  };

  // Revisions related to current article
  const currentArticleRevisions = useMemo(() => {
    if (!editingId) return [];
    return revisions.filter(r => r.entityId === editingId);
  }, [revisions, editingId]);

  const handleRestore = (revId: string) => {
    if (window.confirm('Are you sure you want to rollback to this content snapshot? Your current unsaved text in the editor will be replaced.')) {
      restoreRevision(revId);
      // Reload form
      const restored = revisions.find(r => r.id === revId);
      if (restored) {
        setContent(restored.content);
        setTitle(restored.title);
      }
    }
  };

  // Editor insertion toolbar helper
  const insertMarkdown = (syntax: 'bold' | 'italic' | 'h2' | 'table' | 'code' | 'callout' | 'faq' | 'link') => {
    const textarea = document.getElementById('cms-markdown-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const currentText = textarea.value;
    const selectedText = currentText.substring(startPos, endPos);
    
    let insertion = '';
    if (syntax === 'bold') insertion = `**${selectedText || 'bold text'}**`;
    else if (syntax === 'italic') insertion = `*${selectedText || 'italic text'}*`;
    else if (syntax === 'h2') insertion = `\n## ${selectedText || 'Section Heading'}\n`;
    else if (syntax === 'code') insertion = `\n\`\`\`javascript\n${selectedText || '// Code Block'}\n\`\`\`\n`;
    else if (syntax === 'callout') insertion = `\n:::info\n💡 ${selectedText || 'Key Note: Add important financial summary point.'}\n:::\n`;
    else if (syntax === 'table') {
      insertion = `\n| Metric | Rate | Period |\n| :--- | :---: | :---: |\n| Standard savings | 3.5% | Annual |\n| SIP Equity CAGR | 12.0% | 10 yr projected |\n`;
    }
    else if (syntax === 'link') {
      insertion = `[${selectedText || 'SIP Calculator'}](/tools/sip-calculator)`;
    }
    else if (syntax === 'faq') {
      insertion = `\n### FAQ: Frequently Asked Question\n- **Question**: What is the difference between simple and compound interest?\n- **Answer**: Simple interest is calculated on principal only, while compound interest accrues on both principal and historical interests over time.\n`;
    }

    const nextContent = currentText.substring(0, startPos) + insertion + currentText.substring(endPos);
    setContent(nextContent);
    
    // Focus back
    setTimeout(() => {
      textarea.focus();
      const nextCursor = startPos + insertion.length;
      textarea.setSelectionRange(nextCursor, nextCursor);
    }, 50);
  };

  // Simplified Preview parser (extracts headings, lists, bold text, etc.)
  const renderPreviewHtml = (rawMarkdown: string) => {
    const lines = rawMarkdown.split('\n');
    let inList = false;
    
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      
      // Headers
      if (trimmed.startsWith('## ')) {
        inList = false;
        return <h2 key={idx} className="text-base font-bold text-slate-800 dark:text-white mt-5 mb-2 border-b border-slate-100 dark:border-slate-800/40 pb-1">{trimmed.substring(3)}</h2>;
      }
      if (trimmed.startsWith('### ')) {
        inList = false;
        return <h3 key={idx} className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-4 mb-1.5">{trimmed.substring(4)}</h3>;
      }
      if (trimmed.startsWith('# ')) {
        inList = false;
        return <h1 key={idx} className="text-lg font-black text-slate-900 dark:text-white mt-6 mb-3">{trimmed.substring(2)}</h1>;
      }

      // Bold & italic parsing in paragraphs
      let formattedLine: any = trimmed;
      if (trimmed.includes('**')) {
        const parts = trimmed.split('**');
        formattedLine = parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-extrabold text-blue-600 dark:text-cyan-400">{part}</strong> : part);
      }

      // Callouts
      if (trimmed.startsWith(':::info') || trimmed.startsWith(':::warning')) {
        inList = false;
        return null; // hide syntax tags
      }
      if (trimmed.startsWith(':::')) {
        inList = false;
        return null;
      }

      // Lists
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        return (
          <li key={idx} className="list-disc ml-5 text-slate-600 dark:text-slate-300 py-0.5 leading-relaxed">
            {trimmed.substring(2)}
          </li>
        );
      }

      // Divider
      if (trimmed === '---') {
        inList = false;
        return <hr key={idx} className="my-4 border-slate-100 dark:border-slate-800" />;
      }

      // Empty space
      if (!trimmed) {
        inList = false;
        return <div key={idx} className="h-2" />;
      }

      // Default paragraph
      return <p key={idx} className="text-slate-600 dark:text-slate-300 my-2 leading-relaxed text-xs">{formattedLine}</p>;
    });
  };

  const wordCount = useMemo(() => {
    return content.trim().split(/\s+/).filter(Boolean).length;
  }, [content]);

  const readingTime = useMemo(() => {
    return `${Math.max(1, Math.ceil(wordCount / 225))} min read`;
  }, [wordCount]);

  return (
    <div className="flex flex-col gap-6" id="cms-articles-panel">
      
      {/* 1. ARTICLES MANAGER OVERVIEW & EDITOR SCREEN */}
      {!editingId && !isCreating ? (
        <>
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Filter Status:</span>
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200/20 max-w-full overflow-x-auto">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase transition-all ${statusFilter === 'all' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter('draft')}
                  className={`px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase transition-all ${statusFilter === 'draft' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                >
                  Draft
                </button>
                <button
                  onClick={() => setStatusFilter('review')}
                  className={`px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase transition-all ${statusFilter === 'review' ? 'bg-purple-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                >
                  Review
                </button>
                <button
                  onClick={() => setStatusFilter('fact-check')}
                  className={`px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase transition-all ${statusFilter === 'fact-check' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                >
                  FactCheck
                </button>
                <button
                  onClick={() => setStatusFilter('approved')}
                  className={`px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase transition-all ${statusFilter === 'approved' ? 'bg-cyan-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                >
                  Approved
                </button>
                <button
                  onClick={() => setStatusFilter('published')}
                  className={`px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase transition-all ${statusFilter === 'published' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                >
                  Live
                </button>
                <button
                  onClick={() => setStatusFilter('scheduled')}
                  className={`px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase transition-all ${statusFilter === 'scheduled' ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                >
                  Scheduled
                </button>
                <button
                  onClick={() => setStatusFilter('updated')}
                  className={`px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase transition-all ${statusFilter === 'updated' ? 'bg-blue-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                >
                  Updated
                </button>
                <button
                  onClick={() => setStatusFilter('archived')}
                  className={`px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase transition-all ${statusFilter === 'archived' ? 'bg-slate-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                >
                  Archived
                </button>
              </div>
            </div>

            <button
              onClick={handleCreateNew}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-2 self-start sm:self-center transition-all"
            >
              <Plus className="w-4 h-4" />
              Write New Article
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search guides database by keyword, tags, category..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Table list */}
          <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3.5 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <div className="col-span-5">Article & Author</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Stats</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredArticles.length > 0 ? (
                filteredArticles.map(art => (
                  <div key={art.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 px-6 py-4 items-center hover:bg-slate-50/50 dark:hover:bg-slate-950/10 transition-all text-xs">
                    
                    {/* Identity */}
                    <div className="col-span-1 sm:col-span-5 flex items-center gap-3">
                      <img 
                        src={art.imageUrl} 
                        alt="" 
                        className="w-10 h-10 rounded-lg object-cover bg-slate-100 dark:bg-slate-800" 
                      />
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-800 dark:text-slate-100 truncate leading-snug">{art.title}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 truncate flex items-center gap-1.5">
                          <User className="w-3 h-3 flex-shrink-0" />
                          <span>By {art.author.name}</span>
                          <span>•</span>
                          <span>{art.publishedAt}</span>
                        </p>
                      </div>
                    </div>

                    {/* Category */}
                    <div className="col-span-1 sm:col-span-2">
                      <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-cyan-400 font-medium text-[10px]">
                        {art.category}
                      </span>
                    </div>

                    {/* Reading specs */}
                    <div className="col-span-1 sm:col-span-2 flex flex-col gap-0.5">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono text-[11px] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {art.readTime}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {art.wordCount} words
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="col-span-1 sm:col-span-1">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase ${
                        art.contentStatus === 'published'
                          ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400'
                          : art.contentStatus === 'updated'
                          ? 'bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400'
                          : art.contentStatus === 'draft'
                          ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400'
                          : art.contentStatus === 'review'
                          ? 'bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400'
                          : art.contentStatus === 'fact-check'
                          ? 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400'
                          : art.contentStatus === 'approved'
                          ? 'bg-cyan-50 dark:bg-cyan-950/20 text-cyan-600 dark:text-cyan-450'
                          : art.contentStatus === 'scheduled'
                          ? 'bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400'
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {art.contentStatus}
                      </span>
                    </div>

                    {/* Edit actions */}
                    <div className="col-span-1 sm:col-span-2 flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleEdit(art)}
                        className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/25 hover:text-blue-600 dark:hover:text-cyan-400 text-slate-500 transition-colors"
                        title="Edit Article"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => duplicateArticle(art.id)}
                        className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/25 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-500 transition-colors"
                        title="Duplicate Article"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteArticle(art.id)}
                        className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/25 hover:text-rose-600 text-slate-500 transition-colors"
                        title="Archive Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-slate-400">
                  No blog guides found matching the filter "{searchQuery}".
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        
        // 2. ACTIVE ARTICLE EDITOR & SIDEBAR CONTROLLER SCREEN
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left panel: Editor space */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* Editor Top Bar */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800 rounded-xl">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingId(null);
                    setIsCreating(false);
                  }}
                  className="px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 flex items-center gap-1"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                  Exit
                </button>
                <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  {isCreating ? 'Creating Article' : 'Editing Article'}
                </span>
              </div>

              {/* View options */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-0.5 rounded-lg border border-slate-200/20">
                <button
                  onClick={() => setIsPreviewMode(false)}
                  className={`px-3 py-1 rounded-md text-[10px] font-extrabold uppercase flex items-center gap-1 transition-all ${!isPreviewMode ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm' : 'text-slate-500'}`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  Code Editor
                </button>
                <button
                  onClick={() => setIsPreviewMode(true)}
                  className={`px-3 py-1 rounded-md text-[10px] font-extrabold uppercase flex items-center gap-1 transition-all ${isPreviewMode ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm' : 'text-slate-500'}`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Live Preview
                </button>
              </div>
            </div>

            {/* Autosave notification */}
            {autosaveMsg && (
              <div className="px-3 py-1 text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100/10 rounded-lg flex items-center gap-1 self-start animate-pulse">
                <Sparkles className="w-3 h-3" />
                {autosaveMsg}
              </div>
            )}

            {/* Markdown Syntax Toolbar */}
            {!isPreviewMode && (
              <div className="flex flex-wrap gap-1 p-2 bg-slate-50 dark:bg-slate-950/25 border border-slate-200/30 dark:border-slate-800/40 rounded-xl items-center">
                <span className="text-[9px] text-slate-400 font-bold uppercase px-1 mr-1">Insert:</span>
                <button onClick={() => insertMarkdown('h2')} className="p-1 px-2 text-[10px] font-bold rounded hover:bg-slate-200/50 dark:hover:bg-slate-800 border border-slate-200/30 text-slate-600 dark:text-slate-300">H2</button>
                <button onClick={() => insertMarkdown('bold')} className="p-1 px-2 text-[10px] font-black rounded hover:bg-slate-200/50 dark:hover:bg-slate-800 border border-slate-200/30 text-slate-600 dark:text-slate-300">B</button>
                <button onClick={() => insertMarkdown('italic')} className="p-1 px-2 text-[10px] italic font-semibold rounded hover:bg-slate-200/50 dark:hover:bg-slate-800 border border-slate-200/30 text-slate-600 dark:text-slate-300">I</button>
                <button onClick={() => insertMarkdown('link')} className="p-1 px-1.5 text-[10px] rounded hover:bg-slate-200/50 dark:hover:bg-slate-800 border border-slate-200/30 text-slate-600 dark:text-slate-300" title="Link"><Link2 className="w-3 h-3" /></button>
                <button onClick={() => insertMarkdown('table')} className="p-1 px-1.5 text-[10px] rounded hover:bg-slate-200/50 dark:hover:bg-slate-800 border border-slate-200/30 text-slate-600 dark:text-slate-300" title="Table"><Table className="w-3 h-3" /></button>
                <button onClick={() => insertMarkdown('code')} className="p-1 px-1.5 text-[10px] rounded hover:bg-slate-200/50 dark:hover:bg-slate-800 border border-slate-200/30 text-slate-600 dark:text-slate-300" title="Code Block"><Code className="w-3 h-3" /></button>
                <button onClick={() => insertMarkdown('callout')} className="p-1 px-1.5 text-[10px] rounded hover:bg-slate-200/50 dark:hover:bg-slate-800 border border-slate-200/30 text-slate-600 dark:text-slate-300" title="Info Block">Callout</button>
                <button onClick={() => insertMarkdown('faq')} className="p-1 px-1.5 text-[10px] rounded hover:bg-slate-200/50 dark:hover:bg-slate-800 border border-slate-200/30 text-slate-600 dark:text-slate-300" title="FAQ block">FAQ Accordion</button>
              </div>
            )}

            {/* Core Body Fields */}
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Article Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Mastering the 50/30/20 Budgeting Rule..."
                  className="w-full mt-1 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Split view content or preview */}
              {!isPreviewMode ? (
                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400 flex items-center justify-between">
                    <span>Markdown Content</span>
                    <span className="font-mono">{wordCount} words • {readingTime}</span>
                  </label>
                  <textarea
                    id="cms-markdown-textarea"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    rows={16}
                    placeholder="# Introduction to standard wealth preservation..."
                    className="w-full mt-1 px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y leading-relaxed"
                  />
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 min-h-[400px]">
                  <h1 className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight mb-2">
                    {title || 'Untitled Article'}
                  </h1>
                  <div className="flex items-center gap-2.5 mb-6 text-[10px] text-slate-400">
                    <span className="font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-cyan-400 capitalize">{categoryName}</span>
                    <span>•</span>
                    <span>{readingTime}</span>
                    <span>•</span>
                    <span>{wordCount} words</span>
                  </div>
                  <div className="prose prose-slate dark:prose-invert max-w-none text-xs">
                    {renderPreviewHtml(content)}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right panel: Meta Settings Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
              
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Publish Settings</h3>
                <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 font-mono text-[9px] font-bold uppercase">Meta</span>
              </div>

              {/* Status */}
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Content Status</label>
                <select
                  value={contentStatus}
                  onChange={e => setContentStatus(e.target.value as ContentStatus)}
                  className="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option value="draft">Draft</option>
                  <option value="review">Under Review (Editorial)</option>
                  <option value="fact-check">Fact-Check Needed</option>
                  <option value="approved" disabled={role !== 'administrator'}>Approved (Admin Only)</option>
                  <option value="published" disabled={role !== 'administrator'}>Published (Admin Only)</option>
                  <option value="scheduled" disabled={role !== 'administrator'}>Scheduled (Admin Only)</option>
                  <option value="updated" disabled={role !== 'administrator'}>Updated (Admin Only)</option>
                  <option value="archived">Archived</option>
                </select>
                {role !== 'administrator' && (
                  <p className="text-[10px] text-amber-500 dark:text-amber-400 mt-1.5 font-medium leading-normal">
                    ⚠️ Your role is "{role}". Only Administrators can transition articles to Approved, Scheduled, Published, or Updated.
                  </p>
                )}
              </div>

              {/* Scheduled Date */}
              {contentStatus === 'scheduled' && (
                <div className="animate-fadeIn">
                  <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    Target Release Date
                  </label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={e => setScheduledDate(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {/* Author */}
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Assigned Author</label>
                <select
                  value={authorId}
                  onChange={e => setAuthorId(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {authors.map(au => (
                    <option key={au.id} value={au.id}>{au.name} ({au.role})</option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Editorial Category</label>
                <select
                  value={categoryName}
                  onChange={e => setCategoryName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Slug */}
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Custom URL Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                  placeholder="mastering-the-budget-ratio"
                  className="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Excerpt / Meta Description</label>
                <textarea
                  value={excerpt}
                  onChange={e => setExcerpt(e.target.value)}
                  rows={3}
                  placeholder="Provide a click-worthy, optimized 110-165 character summary for search engines."
                  className="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 leading-normal"
                />
              </div>

              {/* Focus Keyword */}
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400 flex items-center gap-1">
                  <span>Focus Keyword</span>
                  <span className="text-[9px] text-slate-400">(SEO Optimization)</span>
                </label>
                <input
                  type="text"
                  value={focusKeyword}
                  onChange={e => setFocusKeyword(e.target.value)}
                  placeholder="e.g. Budgeting"
                  className="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Tags (Comma Separated)</label>
                <input
                  type="text"
                  value={tagsStr}
                  onChange={e => setTagsStr(e.target.value)}
                  placeholder="Budget, Savings, Personal Finance"
                  className="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Save & Exit Buttons */}
              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={handleSave}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <Check className="w-4 h-4" />
                  Save Content Changes
                </button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setIsCreating(false);
                  }}
                  className="w-full py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold transition-all"
                >
                  Discard & Exit
                </button>
              </div>

            </div>

            {/* Version Revision History log sidebar widget */}
            {editingId && (
              <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800 rounded-2xl p-5 flex flex-col gap-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                  <History className="w-4 h-4 text-indigo-500" />
                  Article Git-Backup Log
                </h3>

                {currentArticleRevisions.length > 0 ? (
                  <div className="flex flex-col gap-2 divide-y divide-slate-100 dark:divide-slate-800/40 max-h-48 overflow-y-auto pr-1">
                    {currentArticleRevisions.map(rev => (
                      <div key={rev.id} className="pt-2 flex flex-col gap-1 text-[10px] text-slate-500 leading-normal">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-700 dark:text-slate-300">Version #{rev.version}</span>
                          <button
                            onClick={() => handleRestore(rev.id)}
                            className="text-blue-500 hover:text-blue-600 font-bold uppercase text-[9px] flex items-center gap-0.5"
                          >
                            <Undo2 className="w-3 h-3" /> Rollback
                          </button>
                        </div>
                        <p>Saved on {rev.date}</p>
                        <p>By <strong>{rev.author}</strong></p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-400 leading-normal">
                    No historical snapshots stored yet. Saving new modifications creates robust, retrievable revision nodes automatically.
                  </p>
                )}
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
