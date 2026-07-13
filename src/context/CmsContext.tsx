import React, { createContext, useContext, useState, useEffect } from 'react';
import { BlogPost, Calculator, CalculatorCategory } from '../types';
import { blogPosts as initialBlogPosts } from '../data/blog';
import { calculators as initialCalculators } from '../data/calculators';

// Define CMS Types
export type ContentStatus = 'draft' | 'review' | 'fact-check' | 'approved' | 'published' | 'scheduled' | 'updated' | 'archived';
export type UserRole = 'administrator' | 'editor' | 'author' | 'viewer';

export interface CmsArticle extends BlogPost {
  contentStatus: ContentStatus;
  scheduledDate?: string;
  wordCount: number;
  focusKeyword?: string;
  version: number;
}

export interface CmsCalculator extends Calculator {
  contentStatus: ContentStatus;
  authorId: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  readingTime: string;
  heroImage?: string;
  updatedDate: string;
  relatedTools: string[];
  relatedArticles: string[];
}

export interface CmsCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  parentCategoryId?: string;
  relatedCategories?: string[];
}

export interface CmsTag {
  id: string;
  name: string;
  slug: string;
}

export interface CmsAuthor {
  id: string;
  name: string;
  photoUrl: string;
  role: string;
  bio: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  expertise: string[];
  credentials: string[];
}

export interface CmsPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  updatedAt: string;
}

export interface CmsMedia {
  id: string;
  name: string;
  url: string;
  folder: string;
  size: string; // e.g. "1.2 MB"
  dimensions?: string; // e.g. "1200x800"
  type: string; // e.g. "image/webp"
  altText: string;
}

export interface CmsNavigation {
  header: { label: string; url: string }[];
  footer: { label: string; url: string }[];
  quickLinks: { label: string; url: string }[];
}

export interface CmsHomepage {
  heroTitle: string;
  heroSubtitle: string;
  featuredTools: string[]; // calculator ids
  newsletterTitle: string;
  newsletterSubtitle: string;
  newsletterPlaceholder: string;
  footerCtaTitle: string;
  footerCtaSubtitle: string;
}

export interface RevisionRecord {
  id: string;
  entityId: string;
  entityType: 'article' | 'calculator';
  title: string;
  content: string;
  author: string;
  date: string;
  version: number;
}

interface CmsContextType {
  articles: CmsArticle[];
  calculators: CmsCalculator[];
  categories: CmsCategory[];
  tags: CmsTag[];
  authors: CmsAuthor[];
  pages: CmsPage[];
  media: CmsMedia[];
  navigation: CmsNavigation;
  homepage: CmsHomepage;
  revisions: RevisionRecord[];
  role: UserRole;
  
  // Actions
  setRole: (role: UserRole) => void;
  addArticle: (article: Omit<CmsArticle, 'id' | 'wordCount' | 'readTime' | 'version'>) => void;
  updateArticle: (id: string, article: Partial<CmsArticle>) => void;
  deleteArticle: (id: string) => void;
  duplicateArticle: (id: string) => void;
  
  addCalculator: (calc: Omit<CmsCalculator, 'id' | 'calculate'>) => void;
  updateCalculator: (id: string, calc: Partial<CmsCalculator>) => void;
  deleteCalculator: (id: string) => void;
  
  addCategory: (cat: Omit<CmsCategory, 'id'>) => void;
  updateCategory: (id: string, cat: Partial<CmsCategory>) => void;
  deleteCategory: (id: string) => void;
  
  addTag: (tag: Omit<CmsTag, 'id'>) => void;
  updateTag: (id: string, tag: Partial<CmsTag>) => void;
  deleteTag: (id: string) => void;
  mergeTags: (sourceTagId: string, targetTagId: string) => void;
  
  addAuthor: (author: Omit<CmsAuthor, 'id'>) => void;
  updateAuthor: (id: string, author: Partial<CmsAuthor>) => void;
  deleteAuthor: (id: string) => void;
  
  updatePage: (id: string, page: Partial<CmsPage>) => void;
  
  uploadMedia: (file: { name: string; folder: string; type: string; size: string; altText: string; url: string }) => void;
  deleteMedia: (id: string) => void;
  updateMediaAltText: (id: string, altText: string) => void;
  
  updateNavigation: (nav: CmsNavigation) => void;
  updateHomepage: (home: CmsHomepage) => void;
  
  restoreRevision: (revisionId: string) => void;
  resetAllToDefault: () => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'calcfino_cms_database_v2';

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<any>(null);

  // Helper to calculate reading time
  const calculateReadingTime = (text: string): string => {
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 225));
    return `${minutes} min read`;
  };

  // Helper to calculate word count
  const calculateWordCount = (text: string): number => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        setDb(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing saved CMS DB, using defaults', e);
        initializeDefaultDb();
      }
    } else {
      initializeDefaultDb();
    }
  }, []);

  const saveDb = (newDb: any) => {
    setDb(newDb);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newDb));
  };

  const initializeDefaultDb = () => {
    // 1. Map existing articles
    const mappedArticles: CmsArticle[] = initialBlogPosts.map((p, idx) => ({
      ...p,
      contentStatus: p.draft ? 'draft' : 'published',
      wordCount: calculateWordCount(p.content),
      focusKeyword: p.tags[0] || '',
      version: 1
    }));

    // 2. Map existing calculators
    const mappedCalculators: CmsCalculator[] = initialCalculators.map(c => ({
      ...c,
      contentStatus: 'published',
      authorId: 'a2', // Neel Patel by default
      difficulty: 'intermediate',
      readingTime: '3 min read',
      heroImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600',
      updatedDate: 'July 10, 2026',
      relatedTools: initialCalculators.slice(0, 3).map(tc => tc.id).filter(id => id !== c.id),
      relatedArticles: ['mastering-the-50-30-20-budgeting-rule']
    }));

    // 3. Default Authors
    const defaultAuthors: CmsAuthor[] = [
      {
        id: 'a1',
        name: 'Sarah Jenkins',
        photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
        role: 'Senior Financial Planner',
        bio: 'Sarah has over 12 years of coaching corporate clients in practical budgeting and cash preservation methods.',
        socialLinks: { twitter: 'https://twitter.com/sarahj', linkedin: 'https://linkedin.com/in/sarahj' },
        expertise: ['Budgeting', 'Savings', 'Financial Habits'],
        credentials: ['CFP (Certified Financial Planner)', 'M.S. Personal Finance']
      },
      {
        id: 'a2',
        name: 'Neel Patel',
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
        role: 'Technical Finance Architect',
        bio: 'Neel is an engineer specializing in tax simulation systems, investment modeling, and compound-interest algorithms.',
        socialLinks: { twitter: 'https://twitter.com/neelp', github: 'https://github.com/neelp' },
        expertise: ['Tax Architecture', 'Investment Math', 'EMI Calculations'],
        credentials: ['B.S. Software Engineering & Quant Methods']
      }
    ];

    // 4. Default Categories
    const defaultCategories: CmsCategory[] = [
      { id: 'cat1', name: 'Personal Finance', slug: 'personal-finance', description: 'Core cash management, budgeting philosophies, and daily habits.', featuredImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600' },
      { id: 'cat2', name: 'Loans & EMIs', slug: 'loans-emi', description: 'Strategies for home loans, car financing, interest reduction, and credit optimization.', featuredImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600' },
      { id: 'cat3', name: 'Investing', slug: 'investing', description: 'Mutual funds, equities, index tracking, compound growth, and retirement compounding.', featuredImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600' },
      { id: 'cat4', name: 'Taxes', slug: 'taxes', description: 'Understanding brackets, exemptions, standard deductions, and tax-efficient savings accounts.', featuredImage: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&w=600' }
    ];

    // 5. Default Tags
    const defaultTags: CmsTag[] = [
      { id: 't1', name: 'Budgeting', slug: 'budgeting' },
      { id: 't2', name: 'Saving', slug: 'saving' },
      { id: 't3', name: 'SIP', slug: 'sip' },
      { id: 't4', name: 'Interest', slug: 'interest' },
      { id: 't5', name: 'Mutual Funds', slug: 'mutual-funds' },
      { id: 't6', name: 'Taxes', slug: 'taxes' }
    ];

    // 6. Default Pages (CMS Editable static pages)
    const defaultPages: CmsPage[] = [
      { id: 'p_home', slug: '', title: 'Home', content: '# Welcome to Calcfino\n\nYour premium destination for financial calculations, professional-grade planning dashboards, and comprehensive educational guides.', seoTitle: 'Calcfino - Professional Financial Calculators & Personal Finance Guides', seoDescription: 'Free, highly precise SIP, EMI, PPF, GST, and Income Tax calculators paired with curated, expert guides to accelerate your wealth creation journey.', updatedAt: 'July 12, 2026' },
      { id: 'p_about', slug: 'about', title: 'About Us', content: '# About Calcfino\n\nWe provide independent, premium financial modeling tools completely free of charge. Our mission is to democratize high-fidelity compound interest simulations and taxation analytics for everyone.\n\n## Our Editorial Integrity\nAll calculations are validated by licensed financial planners and software engineers to ensure 100% compliance with standard actuarial tables.', seoTitle: 'About Calcfino - Democratizing Wealth Modeling tools', seoDescription: 'Learn about our editorial process, actuarial standards, and our mission to provide clean, premium, un-cluttered financial utilities.', updatedAt: 'July 11, 2026' },
      { id: 'p_contact', slug: 'contact', title: 'Contact Support', content: '# Contact Us\n\nNeed assistance? Want to request a custom financial tool? Reach out directly via our verified help desk.\n\n- **Email**: support@neelbyte.in\n- **Headquarters**: Mumbai, India', seoTitle: 'Contact Support - Reach the Calcfino Editorial Team', seoDescription: 'Get in touch with our financial engineering and editorial teams for feedback, feature requests, or editorial inquiries.', updatedAt: 'July 10, 2026' },
      { id: 'p_privacy', slug: 'privacy-policy', title: 'Privacy Policy', content: '# Privacy Policy\n\nLast updated: July 12, 2026\n\nAt Calcfino, we value your privacy above all else. **We run 100% of our calculation logic client-side in your browser.** We do not transmit, log, or store your inputs (income, mortgage, debts) on our servers.', seoTitle: 'Privacy Policy - 100% Client-Side Privacy Protection', seoDescription: 'Read the Calcfino Privacy Policy. Find out how we safeguard your personal finance inputs by processing all math entirely in your local browser.', updatedAt: 'July 12, 2026' },
      { id: 'p_terms', slug: 'terms-and-conditions', title: 'Terms of Service', content: '# Terms and Conditions\n\nBy accessing Calcfino, you agree to these terms. All software tools are provided "as-is" for educational and illustrative purposes. They do not constitute certified tax or licensed financial advice.', seoTitle: 'Terms and Conditions - Educational Sandbox Policy', seoDescription: 'Review the terms of service governing Calcfino calculators, sitemaps, data export packages, and editorial guidelines.', updatedAt: 'July 10, 2026' },
      { id: 'p_disclaimer', slug: 'disclaimer', title: 'Disclaimer', content: '# Financial Disclaimer\n\nCalcfino does not sell insurance, distribute mutual funds, or provide regulatory financial advice. Please consult with a qualified Chartered Accountant (CA) or Certified Financial Planner (CFP) before making large investment moves.', seoTitle: 'Financial Disclaimer - Actuarial Estimates & Planning Purposes', seoDescription: 'Important disclosure regarding calculation estimations, mutual fund compounding assumptions, and professional advisor consult recommendation.', updatedAt: 'July 10, 2026' },
      { id: 'p_editorial', slug: 'editorial-policy', title: 'Editorial Policy', content: '# Editorial Guidelines\n\nOur content is objective, factual, and verified. We do not accept payment to promote specific credit cards, mutual fund groups, or loan providers, maintaining absolute integrity.', seoTitle: 'Editorial Policy - Absolute Transparency & Objectivity', seoDescription: 'Our rigorous guidelines for researching, writing, and actuarially auditing our guides and calculators.', updatedAt: 'July 10, 2026' },
      { id: 'p_cookie', slug: 'cookie-policy', title: 'Cookie Policy', content: '# Cookie Policy\n\nWe use only essential and basic local preferences cookies to store items like your saved calculator configurations or dark-mode selectors.', seoTitle: 'Cookie Policy - Local Storage & Preference Preservation', seoDescription: 'Understand how we utilize tiny browser storage features to remember your theme settings and saved financial projections.', updatedAt: 'July 10, 2026' }
    ];

    // 7. Default Navigation Menus
    const defaultNavigation: CmsNavigation = {
      header: [
        { label: 'Calculators', url: '/calculators-all' },
        { label: 'Guides', url: '/guides' },
        { label: 'My Goal Dashboard', url: '/dashboard' },
        { label: 'About', url: '/about' }
      ],
      footer: [
        { label: 'About Us', url: '/about' },
        { label: 'Contact Support', url: '/contact' },
        { label: 'Editorial Policy', url: '/editorial-policy' },
        { label: 'Privacy Policy', url: '/privacy-policy' }
      ],
      quickLinks: [
        { label: 'SIP Calculator', url: '/tools/sip-calculator' },
        { label: 'EMI Calculator', url: '/tools/emi-calculator' },
        { label: 'FD Calculator', url: '/tools/fd-calculator' },
        { label: 'Income Tax Calculator', url: '/tools/income-tax-calculator' }
      ]
    };

    // 8. Default Homepage Builder Configuration
    const defaultHomepage: CmsHomepage = {
      heroTitle: 'Precision Wealth Modeling Made Clean',
      heroSubtitle: 'Free, highly professional personal finance calculators, custom budget trackers, and expert guides crafted completely unaligned from commercial advertising.',
      featuredTools: ['sip-calculator', 'emi-calculator', 'income-tax-calculator', 'ppf-calculator'],
      newsletterTitle: 'Deep Financial Insights, Weekly',
      newsletterSubtitle: 'Join 14,000+ personal finance practitioners receiving our zero-fluff, mathematical breakdowns of inflation and tax-efficient investments.',
      newsletterPlaceholder: 'Enter your secure email address',
      footerCtaTitle: 'Take Absolute Command of Your Savings',
      footerCtaSubtitle: 'Open your secure Local Dashboard now to establish personal goals, model monthly compound gains, and benchmark your progress.'
    };

    // 9. Default Media Files
    const defaultMedia: CmsMedia[] = [
      { id: 'm1', name: 'finance-banner.webp', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200', folder: 'banners', size: '215 KB', dimensions: '1200x800', type: 'image/webp', altText: 'Modern desk with laptop displaying a financial chart and coffee mug' },
      { id: 'm2', name: 'sarah-avatar.webp', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', folder: 'avatars', size: '22 KB', dimensions: '150x150', type: 'image/webp', altText: 'Sarah Jenkins corporate professional headshot' },
      { id: 'm3', name: 'neel-avatar.webp', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', folder: 'avatars', size: '24 KB', dimensions: '150x150', type: 'image/webp', altText: 'Neel Patel professional headshot' }
    ];

    const initialDb = {
      articles: mappedArticles,
      calculators: mappedCalculators,
      categories: defaultCategories,
      tags: defaultTags,
      authors: defaultAuthors,
      pages: defaultPages,
      media: defaultMedia,
      navigation: defaultNavigation,
      homepage: defaultHomepage,
      revisions: [],
      role: 'administrator' as UserRole
    };

    saveDb(initialDb);
  };

  // Safe checks before render completes loading
  if (!db) {
    return null;
  }

  // --- ACTIONS ---

  const setRole = (role: UserRole) => {
    saveDb({ ...db, role });
  };

  // Article Actions
  const addArticle = (art: Omit<CmsArticle, 'id' | 'wordCount' | 'readTime' | 'version'>) => {
    const id = 'art_' + Date.now();
    const newArticle: CmsArticle = {
      ...art,
      id,
      wordCount: calculateWordCount(art.content),
      readTime: calculateReadingTime(art.content),
      version: 1,
      publishedAt: art.contentStatus === 'published' ? new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Draft'
    };
    saveDb({
      ...db,
      articles: [newArticle, ...db.articles]
    });
  };

  const updateArticle = (id: string, updatedFields: Partial<CmsArticle>) => {
    const original = db.articles.find((a: CmsArticle) => a.id === id);
    if (!original) return;

    // Build revision before update
    const revision: RevisionRecord = {
      id: 'rev_' + Date.now(),
      entityId: id,
      entityType: 'article',
      title: original.title,
      content: original.content,
      author: original.author.name,
      date: new Date().toLocaleString(),
      version: original.version
    };

    const nextVersion = original.version + 1;

    const updatedArticles = db.articles.map((a: CmsArticle) => {
      if (a.id === id) {
        const merged = { ...a, ...updatedFields, version: nextVersion };
        if (updatedFields.content) {
          merged.wordCount = calculateWordCount(updatedFields.content);
          merged.readTime = calculateReadingTime(updatedFields.content);
        }
        if (updatedFields.contentStatus === 'published' && a.publishedAt === 'Draft') {
          merged.publishedAt = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        }
        return merged;
      }
      return a;
    });

    saveDb({
      ...db,
      articles: updatedArticles,
      revisions: [revision, ...db.revisions]
    });
  };

  const deleteArticle = (id: string) => {
    saveDb({
      ...db,
      articles: db.articles.map((a: CmsArticle) => a.id === id ? { ...a, contentStatus: 'archived', deleted: true } : a)
    });
  };

  const duplicateArticle = (id: string) => {
    const original = db.articles.find((a: CmsArticle) => a.id === id);
    if (!original) return;

    const duplicate: CmsArticle = {
      ...original,
      id: 'art_' + Date.now(),
      title: `${original.title} (Duplicate)`,
      slug: `${original.slug}-duplicate`,
      contentStatus: 'draft',
      version: 1,
      publishedAt: 'Draft'
    };

    saveDb({
      ...db,
      articles: [duplicate, ...db.articles]
    });
  };

  // Calculator Actions
  const addCalculator = (calc: Omit<CmsCalculator, 'id' | 'calculate'>) => {
    const id = calc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCalc: CmsCalculator = {
      ...calc,
      id,
      calculate: (inputs: Record<string, any>) => ({ summary: [] }) // mock handler
    } as any;

    saveDb({
      ...db,
      calculators: [...db.calculators, newCalc]
    });
  };

  const updateCalculator = (id: string, updatedFields: Partial<CmsCalculator>) => {
    const updatedCalculators = db.calculators.map((c: CmsCalculator) => {
      if (c.id === id) {
        return { ...c, ...updatedFields };
      }
      return c;
    });
    saveDb({
      ...db,
      calculators: updatedCalculators
    });
  };

  const deleteCalculator = (id: string) => {
    saveDb({
      ...db,
      calculators: db.calculators.filter((c: CmsCalculator) => c.id !== id)
    });
  };

  // Category Actions
  const addCategory = (cat: Omit<CmsCategory, 'id'>) => {
    const id = 'cat_' + Date.now();
    saveDb({
      ...db,
      categories: [...db.categories, { ...cat, id }]
    });
  };

  const updateCategory = (id: string, cat: Partial<CmsCategory>) => {
    saveDb({
      ...db,
      categories: db.categories.map((c: CmsCategory) => c.id === id ? { ...c, ...cat } : c)
    });
  };

  const deleteCategory = (id: string) => {
    saveDb({
      ...db,
      categories: db.categories.filter((c: CmsCategory) => c.id !== id)
    });
  };

  // Tag Actions
  const addTag = (tag: Omit<CmsTag, 'id'>) => {
    const id = 'tag_' + Date.now();
    saveDb({
      ...db,
      tags: [...db.tags, { ...tag, id }]
    });
  };

  const updateTag = (id: string, tag: Partial<CmsTag>) => {
    saveDb({
      ...db,
      tags: db.tags.map((t: CmsTag) => t.id === id ? { ...t, ...tag } : t)
    });
  };

  const deleteTag = (id: string) => {
    saveDb({
      ...db,
      tags: db.tags.filter((t: CmsTag) => t.id !== id)
    });
  };

  const mergeTags = (sourceId: string, targetId: string) => {
    const source = db.tags.find((t: CmsTag) => t.id === sourceId);
    const target = db.tags.find((t: CmsTag) => t.id === targetId);
    if (!source || !target) return;

    // 1. Rename references inside articles
    const updatedArticles = db.articles.map((art: CmsArticle) => {
      const filtered = art.tags.map(tName => tName === source.name ? target.name : tName);
      // Remove duplicates
      const unique = Array.from(new Set(filtered));
      return { ...art, tags: unique };
    });

    // 2. Remove source tag
    const remainingTags = db.tags.filter((t: CmsTag) => t.id !== sourceId);

    saveDb({
      ...db,
      articles: updatedArticles,
      tags: remainingTags
    });
  };

  // Author Actions
  const addAuthor = (author: Omit<CmsAuthor, 'id'>) => {
    const id = 'a_' + Date.now();
    saveDb({
      ...db,
      authors: [...db.authors, { ...author, id }]
    });
  };

  const updateAuthor = (id: string, author: Partial<CmsAuthor>) => {
    saveDb({
      ...db,
      authors: db.authors.map((a: CmsAuthor) => a.id === id ? { ...a, ...author } : a)
    });
  };

  const deleteAuthor = (id: string) => {
    saveDb({
      ...db,
      authors: db.authors.filter((a: CmsAuthor) => a.id !== id)
    });
  };

  // Page Actions
  const updatePage = (id: string, page: Partial<CmsPage>) => {
    saveDb({
      ...db,
      pages: db.pages.map((p: CmsPage) => p.id === id ? { ...p, ...page, updatedAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) } : p)
    });
  };

  // Media Actions
  const uploadMedia = (file: { name: string; folder: string; type: string; size: string; altText: string; url: string }) => {
    const id = 'm_' + Date.now();
    const newMedia: CmsMedia = {
      id,
      dimensions: '800x600',
      ...file
    };
    saveDb({
      ...db,
      media: [newMedia, ...db.media]
    });
  };

  const deleteMedia = (id: string) => {
    saveDb({
      ...db,
      media: db.media.filter((m: CmsMedia) => m.id !== id)
    });
  };

  const updateMediaAltText = (id: string, altText: string) => {
    saveDb({
      ...db,
      media: db.media.map((m: CmsMedia) => m.id === id ? { ...m, altText } : m)
    });
  };

  // Global Configs
  const updateNavigation = (navigation: CmsNavigation) => {
    saveDb({ ...db, navigation });
  };

  const updateHomepage = (homepage: CmsHomepage) => {
    saveDb({ ...db, homepage });
  };

  // Revision Actions
  const restoreRevision = (revisionId: string) => {
    const rev = db.revisions.find((r: RevisionRecord) => r.id === revisionId);
    if (!rev) return;

    if (rev.entityType === 'article') {
      const updatedArticles = db.articles.map((a: CmsArticle) => {
        if (a.id === rev.entityId) {
          return {
            ...a,
            title: rev.title,
            content: rev.content,
            wordCount: calculateWordCount(rev.content),
            readTime: calculateReadingTime(rev.content),
            version: rev.version
          };
        }
        return a;
      });

      // Remove this revision and older ones or keep them? We just keep it but filter out current restore
      saveDb({
        ...db,
        articles: updatedArticles,
        revisions: db.revisions.filter((r: RevisionRecord) => r.id !== revisionId)
      });
    }
  };

  const resetAllToDefault = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    initializeDefaultDb();
  };

  return (
    <CmsContext.Provider
      value={{
        articles: db.articles,
        calculators: db.calculators,
        categories: db.categories,
        tags: db.tags,
        authors: db.authors,
        pages: db.pages,
        media: db.media,
        navigation: db.navigation,
        homepage: db.homepage,
        revisions: db.revisions,
        role: db.role,
        
        setRole,
        addArticle,
        updateArticle,
        deleteArticle,
        duplicateArticle,
        
        addCalculator,
        updateCalculator,
        deleteCalculator,
        
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
        
        updatePage,
        
        uploadMedia,
        deleteMedia,
        updateMediaAltText,
        
        updateNavigation,
        updateHomepage,
        
        restoreRevision,
        resetAllToDefault
      }}
    >
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const context = useContext(CmsContext);
  if (context === undefined) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
}
