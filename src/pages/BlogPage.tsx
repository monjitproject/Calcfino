import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Clock, Calendar, ChevronRight, Sparkles, ChevronLeft } from 'lucide-react';
import { BlogPost } from '../types';
import SEO, { getFAQSchema } from '../components/SEO';
import AdPlaceholder from '../components/AdPlaceholder';
import { useCms } from '../context/CmsContext';

interface BlogPageProps {
  onNavigate: (view: string, params?: any) => void;
  viewParams?: {
    category?: string;
    tag?: string;
    author?: string;
    page?: number;
  };
}

export default function BlogPage({ onNavigate, viewParams }: BlogPageProps) {
  const { articles } = useCms();
  const [searchQuery, setSearchQuery] = useState('');

  // Get active live articles (excluding drafts, under-review, deleted, archived)
  const activeArticles = React.useMemo(() => {
    return articles.filter(a => !a.deleted && (a.contentStatus === 'published' || a.contentStatus === 'updated'));
  }, [articles]);

  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(activeArticles);

  const categories = ['All', 'Personal Finance', 'Investment', 'Tax Saving', 'Mutual Funds', 'Stock Market', 'Cryptocurrency', 'Insurance', 'Loans', 'Retirement Planning'];

  // Parse active filter variables from SEO URL state passed in viewParams
  const activeCategorySlug = viewParams?.category || '';
  const activeTagSlug = viewParams?.tag || '';
  const activeAuthorSlug = viewParams?.author || '';
  const currentPage = viewParams?.page || 1;

  // Resolve matching category display name based on active URL slug
  const activeCategory = categories.find(cat => cat.toLowerCase().replace(/\s+/g, '-') === activeCategorySlug) || 'All';

  useEffect(() => {
    let result = activeArticles;

    // 1. Filter by category slug
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    // 2. Filter by tag slug
    if (activeTagSlug) {
      result = result.filter(p => 
        p.tags.some(tag => tag.toLowerCase().replace(/\s+/g, '-') === activeTagSlug)
      );
    }

    // 3. Filter by author slug
    if (activeAuthorSlug) {
      result = result.filter(p => 
        p.author.name.toLowerCase().replace(/\s+/g, '-') === activeAuthorSlug
      );
    }

    // 4. Search query matching
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    setFilteredPosts(result);
  }, [searchQuery, activeCategory, activeTagSlug, activeAuthorSlug, activeArticles]);

  const handleSelectPost = (slug: string) => {
    onNavigate(`blog-${slug}`, { slug });
  };

  const handleSelectCategory = (cat: string) => {
    if (cat === 'All') {
      onNavigate('blog');
    } else {
      const catSlug = cat.toLowerCase().replace(/\s+/g, '-');
      onNavigate('blog', { category: catSlug });
    }
  };

  const handleSelectTag = (tag: string) => {
    const tagSlug = tag.toLowerCase().replace(/\s+/g, '-');
    onNavigate('blog', { tag: tagSlug });
  };

  const handleSelectAuthor = (authorName: string) => {
    const authorSlug = authorName.toLowerCase().replace(/\s+/g, '-');
    onNavigate('blog', { author: authorSlug });
  };

  // Implement strict 6 posts per page pagination
  const POSTS_PER_PAGE = 6;
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (pageNum: number) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    const navParams: any = { ...viewParams, page: pageNum };
    onNavigate('blog', navParams);
  };

  const blogFaq = [
    { question: 'What topics do you cover on the Calcfino.com Blog?', answer: 'We cover Personal Finance, systematic SIP mutual fund investments, tax shields, capital gains indexations, cryptocurrency margins, auto/housing amortization schedules, and retirement corpus planning.' },
    { question: 'How often are educational resources updated?', answer: 'Our chartered accountant advisors and financial analysts publish detailed educational guides every Tuesday and Thursday aligning with modern federal tax compliance updates.' }
  ];

  return (
    <div className="font-sans py-6 text-slate-800 dark:text-slate-100" id="blog-main-page">
      <SEO
        title="Finance Education Hub"
        description="Premium personal finance, mutual fund investing, tax saving hacks, and portfolio modeling resources written by experts."
        schema={getFAQSchema(blogFaq)}
      />

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 text-blue-600 dark:text-cyan-400 text-xs font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Finance Education & Insights
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-600 to-indigo-600 dark:from-white dark:via-cyan-400 dark:to-blue-500">
          The Wealth Intelligence Blog
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
          Unlock standard mathematical formulations, strategic tax shielding advice, indexation guides, and simplified explanations of high-yield savings goals.
        </p>
      </div>

      {/* Active Filter Indicators */}
      {(activeTagSlug || activeAuthorSlug || activeCategory !== 'All') && (
        <div className="flex flex-wrap items-center gap-2 max-w-7xl mx-auto mb-6 px-1">
          <span className="text-xs font-bold text-slate-400 mr-1 uppercase">Active Filters:</span>
          {activeCategory !== 'All' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-cyan-400 border border-blue-200 dark:border-blue-900/40">
              Category: {activeCategory}
              <button onClick={() => handleSelectCategory('All')} className="hover:text-red-500 font-bold ml-1">×</button>
            </span>
          )}
          {activeTagSlug && (
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-200 dark:border-purple-900/40">
              Tag: #{activeTagSlug.toUpperCase()}
              <button onClick={() => onNavigate('blog')} className="hover:text-red-500 font-bold ml-1">×</button>
            </span>
          )}
          {activeAuthorSlug && (
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40">
              Author: {activeAuthorSlug.replace(/-/g, ' ').toUpperCase()}
              <button onClick={() => onNavigate('blog')} className="hover:text-red-500 font-bold ml-1">×</button>
            </span>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side: Category Filter rail & Search */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          
          {/* Search Card */}
          <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Search Articles</span>
            <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 rounded-xl">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Type keywords..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-xs outline-none"
              />
            </div>
          </div>

          {/* Categories card */}
          <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block font-sans">Categories</span>
            <div className="flex flex-col gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleSelectCategory(cat)}
                  className={`text-left w-full px-3 py-2 rounded-xl text-xs font-medium transition-all ${activeCategory === cat ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Google Adsense Sidebar Block */}
          <AdPlaceholder slot="blog-sidebar" height="250px" label="Responsive Sidebar Ad Space" />

        </div>

        {/* Right Side: Blog Post Grids */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          
          {/* Adsense Above Content */}
          <AdPlaceholder slot="blog-above-grid" height="90px" label="Horizontal Above-Grid Banner Ad" />

          {paginatedPosts.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {paginatedPosts.map(post => (
                  <article
                    key={post.id}
                    className="group rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-blue-100 dark:hover:border-slate-700 transition-all duration-300 cursor-pointer"
                  >
                    <div onClick={() => handleSelectPost(post.slug)}>
                      {/* Visual Banner */}
                      <div className="relative h-44 overflow-hidden bg-slate-100">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectCategory(post.category);
                          }}
                          className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm text-[10px] font-extrabold text-blue-600 dark:text-cyan-400 shadow-sm uppercase tracking-wider hover:bg-blue-600 hover:text-white dark:hover:bg-cyan-400 dark:hover:text-slate-900 transition-colors"
                        >
                          {post.category}
                        </span>
                      </div>

                      {/* Article Details */}
                      <div className="p-5">
                        <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.publishedAt}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>

                        <h2 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Author profile and action bar */}
                    <div className="px-5 pb-5 pt-3 border-t border-slate-50 dark:border-slate-800/50 flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/10">
                      <div 
                        onClick={() => handleSelectAuthor(post.author.name)}
                        className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
                      >
                        <img
                          src={post.author.avatarUrl}
                          alt={post.author.name}
                          className="w-6 h-6 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{post.author.name}</span>
                      </div>
                      <span 
                        onClick={() => handleSelectPost(post.slug)}
                        className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 flex items-center gap-0.5 group-hover:underline"
                      >
                        Read Article
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>

                  </article>
                ))}
              </div>

              {/* Stately Pagination Selection Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 py-4 border-t border-slate-100 dark:border-slate-900">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-40 disabled:hover:bg-transparent transition-colors text-slate-600 dark:text-slate-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNum = index + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-9 h-9 text-xs font-bold rounded-xl transition-all ${currentPage === pageNum ? 'bg-blue-600 text-white shadow-md' : 'border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-40 disabled:hover:bg-transparent transition-colors text-slate-600 dark:text-slate-300"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-950/20 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-400 text-xs">
              No articles found matching search criteria under the selected criteria.
            </div>
          )}

          {/* Ad unit below blog posts */}
          <AdPlaceholder slot="blog-bottom-banner" height="90px" label="Responsive Footer Blog Banner Ad" />

        </div>

      </div>

    </div>
  );
}
