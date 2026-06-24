import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Clock, Calendar, ChevronRight, Sparkles } from 'lucide-react';
import { blogPosts } from '../data/blog';
import { BlogPost } from '../types';
import SEO, { getFAQSchema } from '../components/SEO';
import AdPlaceholder from '../components/AdPlaceholder';

interface BlogPageProps {
  onNavigate: (view: string, params?: any) => void;
}

export default function BlogPage({ onNavigate }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);

  const categories = ['All', 'Personal Finance', 'Investment', 'Tax Saving', 'Mutual Funds', 'Stock Market', 'Cryptocurrency', 'Insurance', 'Loans', 'Retirement Planning'];

  useEffect(() => {
    let result = blogPosts;

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

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
  }, [searchQuery, selectedCategory]);

  const handleSelectPost = (slug: string) => {
    onNavigate(`blog-${slug}`, { slug });
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
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left w-full px-3 py-2 rounded-xl text-xs font-medium transition-all ${selectedCategory === cat ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
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

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredPosts.map(post => (
                <article
                  key={post.id}
                  className="group rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-blue-100 dark:hover:border-slate-700 transition-all duration-300 cursor-pointer"
                  onClick={() => handleSelectPost(post.slug)}
                >
                  <div>
                    {/* Visual Banner */}
                    <div className="relative h-44 overflow-hidden bg-slate-100">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm text-[10px] font-extrabold text-blue-600 dark:text-cyan-400 shadow-sm uppercase tracking-wider">
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
                    <div className="flex items-center gap-2.5">
                      <img
                        src={post.author.avatarUrl}
                        alt={post.author.name}
                        className="w-6 h-6 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{post.author.name}</span>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 flex items-center gap-0.5 group-hover:underline">
                      Read Article
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>

                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-950/20 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-400 text-xs">
              No articles found matching "{searchQuery}" under the selected category.
            </div>
          )}

          {/* Ad unit below blog posts */}
          <AdPlaceholder slot="blog-bottom-banner" height="90px" label="Responsive Footer Blog Banner Ad" />

        </div>

      </div>

    </div>
  );
}
