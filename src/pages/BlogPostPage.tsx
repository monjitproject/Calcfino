import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin, Check, BookOpen, Sparkles } from 'lucide-react';
import { blogPosts } from '../data/blog';
import { BlogPost } from '../types';
import SEO from '../components/SEO';
import AdPlaceholder from '../components/AdPlaceholder';

interface BlogPostPageProps {
  slug: string;
  onNavigate: (view: string, params?: any) => void;
}

export default function BlogPostPage({ slug, onNavigate }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [shared, setShared] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const found = blogPosts.find(p => p.slug === slug);
    if (found) {
      setPost(found);
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="text-center py-20 text-slate-400 text-xs">
        Article not found.
        <button onClick={() => onNavigate('blog')} className="text-blue-500 underline ml-2">Back to Blog</button>
      </div>
    );
  }

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/blog/${post.slug}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    });
  };

  // Extract headings from markdown block to simulate Table of Contents dynamically!
  const tableOfContents = [
    { label: 'Introduction', anchor: '#intro' },
    { label: '1. Core Needs Bucket', anchor: '#needs' },
    { label: '2. Flexible Wants Bucket', anchor: '#wants' },
    { label: '3. Savings & Debt Acceleration', anchor: '#savings' },
    { label: 'Step-by-Step Optimization Plan', anchor: '#plan' },
  ];

  // Filter related posts
  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <div className="font-sans py-6 text-slate-800 dark:text-slate-100 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="blog-post-detail">
      <SEO
        title={post.title}
        description={post.excerpt}
        canonicalUrl={`${window.location.origin}/blog/${post.slug}`}
      />

      {/* Back to Blog Trigger */}
      <button
        onClick={() => onNavigate('blog')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors mb-6"
        id="back-to-blog-btn"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Education Blog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Main Column: Article Content */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Above Fold Ad unit */}
          <AdPlaceholder slot="post-above-fold" height="90px" label="Sponsored Header Banner Ad" />

          {/* Article Header Card */}
          <div className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            
            {/* Main Visual Image Banner */}
            <div className="relative h-64 sm:h-96 w-full">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="px-3 py-1 rounded-full bg-blue-600/95 text-[10px] font-extrabold uppercase tracking-wider">
                  {post.category}
                </span>
                <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight mt-3 text-white">
                  {post.title}
                </h1>
              </div>
            </div>

            {/* Author Profile and Metadata */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap justify-between items-center gap-4 bg-slate-50/50 dark:bg-slate-950/10">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatarUrl}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-100">{post.author.name}</h3>
                  <p className="text-[10px] text-slate-400">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400 font-semibold">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.publishedAt}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
                
                {/* Share Link button */}
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-300"
                  id="share-article-btn"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                  {copiedLink ? 'Copied' : 'Share URL'}
                </button>
              </div>
            </div>

            {/* Article Content Wrapper */}
            <div className="p-6 sm:p-8">
              
              {/* In-content markdown simulated styled parser */}
              <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-6">
                
                {/* Dynamic splitting and custom paragraph spacing to look premium */}
                {post.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white pt-4 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
                        <span className="w-1.5 h-6 rounded-full bg-blue-600" />
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('* ')) {
                    return (
                      <ul key={index} className="list-disc pl-5 space-y-1">
                        {paragraph.split('\n').map((li, i) => (
                          <li key={i}>{li.replace('* ', '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (paragraph.trim().startsWith('*Key Tip*:')) {
                    return (
                      <div key={index} className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border-l-4 border-blue-500 text-xs font-semibold italic text-blue-700 dark:text-cyan-400">
                        {paragraph}
                      </div>
                    );
                  }
                  return <p key={index}>{paragraph}</p>;
                })}

              </div>

              {/* In-content Ad unit */}
              <AdPlaceholder slot="post-in-content" height="120px" label="In-Content Contextual Ad Space" className="my-8" />

            </div>

          </div>

          {/* Author Detailed bio */}
          <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">About The Analyst</span>
            <div className="flex items-start gap-4">
              <img
                src={post.author.avatarUrl}
                alt={post.author.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-slate-100"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100">{post.author.name}</h3>
                <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">{post.author.role}</span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {post.author.bio}
                </p>
              </div>
            </div>
          </div>

          {/* End of article Ad slot */}
          <AdPlaceholder slot="post-end-unit" height="90px" label="Responsive Bottom-Fold Ad" />

        </div>

        {/* Sidebar Column: Table of Contents & Related Posts */}
        <div className="flex flex-col gap-8 lg:col-span-1">
          
          {/* Table of Contents card */}
          <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm sticky top-24">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-500" />
              Table of Contents
            </span>
            <div className="flex flex-col gap-2">
              {tableOfContents.map((item, i) => (
                <div
                  key={i}
                  className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-all cursor-pointer py-1 border-l-2 border-slate-100 dark:border-slate-800 hover:border-blue-500 pl-3"
                >
                  {item.label}
                </div>
              ))}
            </div>

            {/* Quick action button inside sticky TOC card */}
            <button
              onClick={() => onNavigate('home')}
              className="w-full mt-6 py-2 bg-gradient-to-tr from-blue-600 to-cyan-500 text-white hover:opacity-90 rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 flex items-center justify-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Try Free Planners
            </button>
          </div>

          {/* Related Articles list */}
          <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 block">Related Articles</span>
            <div className="flex flex-col gap-4">
              {relatedPosts.map(p => (
                <div
                  key={p.id}
                  className="group cursor-pointer flex gap-3"
                  onClick={() => onNavigate(`blog-${p.slug}`, { slug: p.slug })}
                >
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-14 h-14 rounded-lg object-cover bg-slate-100 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {p.title}
                    </h4>
                    <span className="text-[9px] text-slate-400 block mt-1">{p.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
