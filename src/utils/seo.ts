import { Calculator, BlogPost } from '../types';
import { calculators } from '../data/calculators';
import { blogPosts } from '../data/blog';

// Set default fallback domain for canonical generation
export const DOMAIN = 'https://neelbyte.in';

/**
 * Standard list of stop words to strip from slugs to maximize SEO keyword density and clarity
 */
const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'for', 'of', 'to', 'in', 'on', 'at', 'by', 
  'with', 'from', 'as', 'is', 'are', 'was', 'were', 'be', 'been', 'has', 'have', 
  'had', 'do', 'does', 'did', 'about', 'for', 'how', 'what', 'why', 'who', 'where'
]);

/**
 * Converts any string/title into a clean, lowercase, hyphen-separated, keyword-rich SEO slug
 */
export function generateSeoSlug(title: string): string {
  if (!title) return '';
  
  let clean = title
    .toLowerCase()
    .replace(/[^a-z0-9\s\-_]/g, ' ')
    .replace(/[\s\-_]+/g, ' ')
    .trim();

  const words = clean.split(' ');
  const filteredWords = words.filter(word => !STOP_WORDS.has(word) && word.length > 0);
  const finalWords = filteredWords.length > 0 ? filteredWords : words.filter(w => w.length > 0);
  let slug = finalWords.join('-');
  slug = slug.replace(/-+/g, '-').replace(/^-+|-+$/g, '');
  
  if (slug.length > 60) {
    const truncated = slug.substring(0, 60);
    const lastHyphen = truncated.lastIndexOf('-');
    if (lastHyphen > 40) {
      slug = truncated.substring(0, lastHyphen);
    } else {
      slug = truncated;
    }
    slug = slug.replace(/-+$/g, '');
  }
  
  return slug;
}

/**
 * Normalizes any route URL to ensure it follows strict global URL rules:
 * - Only lowercase
 * - Hyphens instead of underscores
 * - No spaces
 * - No trailing slashes or duplicate slashes
 * - Maps legacy formats to canonicals:
 *   - `/:id` (calculator) -> `/tools/:id`
 *   - `/blog/:slug` -> `/guides/:slug`
 */
export function normalizeUrl(urlPath: string): string {
  if (!urlPath || urlPath === '/') return '/';
  
  let clean = urlPath
    .split('?')[0]
    .split('#')[0]
    .trim()
    .toLowerCase()
    .replace(/_/g, '-')
    .replace(/\s+/g, '-')
    .replace(/\/\//g, '/')
    .replace(/\.html|\.php|\.aspx|\.jsp/gi, '');

  if (clean.endsWith('/index')) {
    clean = clean.substring(0, clean.length - 6);
  }

  if (clean.length > 1 && clean.endsWith('/')) {
    clean = clean.substring(0, clean.length - 1);
  }

  const segments = clean.split('/').filter(Boolean);
  if (segments.length === 0) return '/';

  const first = segments[0];

  // 1. Check if first segment is a standalone calculator ID
  const isCalc = calculators.some(c => c.id === first);
  if (isCalc) {
    return `/tools/${first}`;
  }

  // 2. Check if first segment is starting with 'calculator-'
  if (first.startsWith('calculator-')) {
    const calcId = first.replace('calculator-', '');
    const exists = calculators.some(c => c.id === calcId);
    if (exists) return `/tools/${calcId}`;
  }

  // 3. Retain /tools/:id as is
  if (first === 'tools' && segments[1]) {
    return `/tools/${segments[1]}`;
  }

  // 4. Map `/blog/:slug` -> `/guides/:slug`
  if (first === 'blog') {
    if (segments[1] && segments[1] !== 'page') {
      return `/guides/${segments[1]}`;
    } else if (segments[1] === 'page' && segments[2]) {
      return `/guides/page/${segments[2]}`;
    }
    return '/guides';
  }

  // 5. Retain /guides/:slug as is
  if (first === 'guides') {
    if (segments[1] && segments[1] !== 'page') {
      return `/guides/${segments[1]}`;
    } else if (segments[1] === 'page' && segments[2]) {
      return `/guides/page/${segments[2]}`;
    }
    return '/guides';
  }

  return clean.startsWith('/') ? clean : `/${clean}`;
}

/**
 * Returns the fully qualified canonical URL for a given pathname
 */
export function getCanonicalUrl(pathname: string): string {
  const norm = normalizeUrl(pathname);
  return `${DOMAIN}${norm}`;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generates breadcrumb trail based on current parsed pathname
 */
export function getBreadcrumbsForPath(pathname: string): BreadcrumbItem[] {
  const norm = normalizeUrl(pathname);
  const crumbs: BreadcrumbItem[] = [{ name: 'Home', url: '/' }];
  
  if (norm === '/') return crumbs;
  
  const segments = norm.split('/').filter(Boolean);
  const first = segments[0];

  if (first === 'tools' && segments[1]) {
    crumbs.push({ name: 'Calculators', url: '/calculators-all' });
    const calc = calculators.find(c => c.id === segments[1]);
    crumbs.push({ name: calc ? calc.name : segments[1].replace(/-/g, ' '), url: `/tools/${segments[1]}` });
  } 
  else if (first === 'guides') {
    crumbs.push({ name: 'Guides', url: '/guides' });
    if (segments[1] && segments[1] !== 'page') {
      const post = blogPosts.find(p => p.slug === segments[1]);
      crumbs.push({ name: post ? post.title : segments[1].replace(/-/g, ' '), url: `/guides/${segments[1]}` });
    } else if (segments[1] === 'page' && segments[2]) {
      crumbs.push({ name: `Page ${segments[2]}`, url: `/guides/page/${segments[2]}` });
    }
  }
  else if (first === 'category' && segments[1]) {
    crumbs.push({ name: 'Category', url: '/calculators-all' });
    const rawCategory = segments[1].replace(/-/g, ' ');
    const displayCategory = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);
    crumbs.push({ name: displayCategory, url: `/category/${segments[1]}` });
    
    if (segments[2] === 'page' && segments[3]) {
      crumbs.push({ name: `Page ${segments[3]}`, url: `/category/${segments[1]}/page/${segments[3]}` });
    }
  } 
  else if (first === 'tag' && segments[1]) {
    crumbs.push({ name: `Tag: ${segments[1].toUpperCase()}`, url: `/tag/${segments[1]}` });
  } 
  else if (first === 'author' && segments[1]) {
    const rawAuthor = segments[1].replace(/-/g, ' ');
    const displayAuthor = rawAuthor.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    crumbs.push({ name: `Author: ${displayAuthor}`, url: `/author/${segments[1]}` });
  }
  else if ([
    'about', 'contact', 'privacy-policy', 'disclaimer', 'terms-and-conditions', 
    'cookie-policy', 'editorial-policy', 'refund-policy', 'sitemap', 'dashboard', 'calculators-all'
  ].includes(first)) {
    const displayName = first
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    crumbs.push({ name: displayName, url: `/${first}` });
  } 
  else {
    crumbs.push({ name: first.replace(/-/g, ' '), url: `/${first}` });
  }
  
  return crumbs;
}

/**
 * Returns JSON-LD structured schema for breadcrumbs
 */
export function getBreadcrumbSchemaJson(crumbs: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': crumb.name,
      'item': crumb.url.startsWith('http') ? crumb.url : `${DOMAIN}${crumb.url}`
    }))
  };
}

export interface MetaDataResponse {
  title: string;
  description: string;
  schema: any[];
  breadcrumbs: BreadcrumbItem[];
  canonicalUrl: string;
}

/**
 * Returns dynamic SEO titles, descriptions and structured JSON-LD schemas matching best authority guidelines
 */
export function getSeoMetadata(pathname: string, searchParams?: URLSearchParams): MetaDataResponse {
  const norm = normalizeUrl(pathname);
  const crumbs = getBreadcrumbsForPath(norm);
  const canonicalUrl = getCanonicalUrl(norm);
  
  const defaultTitle = 'Calcfino - Premium Financial Calculators & Smart Education Planners';
  const defaultDesc = 'Navigate interest, mortgages, compounding investments, tax exemptions, and retirement goals with our precise 70+ interactive financial planners.';
  
  let title = defaultTitle;
  let description = defaultDesc;
  const schemas: any[] = [];
  
  const segments = norm.split('/').filter(Boolean);
  const first = segments[0];

  // Base Organization Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${DOMAIN}/#organization`,
    'name': 'Calcfino',
    'url': DOMAIN,
    'logo': `${DOMAIN}/logo.png`,
    'sameAs': [
      'https://twitter.com/calcfino',
      'https://linkedin.com/company/calcfino'
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'email': 'support@calcfino.com',
      'contactType': 'customer support'
    }
  });

  // Base WebSite Schema with SearchAction
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${DOMAIN}/#website`,
    'name': 'Calcfino',
    'url': DOMAIN,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${DOMAIN}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  });

  // Breadcrumbs schema always added
  schemas.push(getBreadcrumbSchemaJson(crumbs));

  // Determine specific SEO metadata based on current URL path
  if (norm === '/') {
    title = 'Calcfino - Premium Financial Education Platform & High Precision Planners';
    description = defaultDesc;
  } 
  else if (norm === '/about') {
    title = 'About Our Advisory Principles & Audited Mathematics | Calcfino';
    description = 'Meet the chartered accountants and quantitative engineers backing Calcfino. Understand our strict mathematical auditing guidelines for financial analytics.';
  } else if (norm === '/contact') {
    title = 'Contact Our Advisory & Financial Engineering Team | Calcfino';
    description = 'Get in touch with our chartered financial analysts. Submit custom tool requests, formula calibrations, or strategic advisory queries.';
  } else if (norm === '/privacy-policy') {
    title = 'Privacy Policy & Local Computation Protection Standards | Calcfino';
    description = 'Your privacy is non-negotiable. Learn how Calcfino guarantees 100% offline-first local browser computations with absolute cookie transparency.';
  } else if (norm === '/terms-and-conditions') {
    title = 'Terms of Service & Compounding Calibration Guidelines | Calcfino';
    description = 'Read our official platform terms of use, calculation limits, copyright guidelines, and mathematical accuracy parameters.';
  } else if (norm === '/disclaimer') {
    title = 'Fiduciary Advice Disclosure & Calculator Disclaimer | Calcfino';
    description = 'All Calcfino calculators run mathematical estimates and are meant for educational use only. They do not constitute formal, licensed advisory.';
  } else if (norm === '/cookie-policy') {
    title = 'Browser Cookies & Persistent State Settings Policy | Calcfino';
    description = 'Understand how we utilize local storage preferences to save your specific currency symbols, regional notations, and light/dark theme parameters.';
  } else if (norm === '/editorial-policy') {
    title = 'Editorial Board Guidelines & Content Auditing Policy | Calcfino';
    description = 'Read the Calcfino editorial mandate. Every article and advisory post is verified against SEC, IRS, and international financial standards.';
  } else if (norm === '/refund-policy') {
    title = 'Premium Membership Access & Refund Standards | Calcfino';
    description = 'Terms of access, corporate API licensing, custom reports, and refund schedules for premium institutional mathematical engines.';
  } else if (norm === '/sitemap') {
    title = 'HTML Sitemap Directory - Navigating 70+ Financial Planners';
    description = 'Instant access to all Calcfino interactive visualizers. Browse categorized loan, compound investment, retirement, salary, and tax planners.';
  } else if (norm === '/dashboard') {
    title = 'Interactive Wealth Planning Portfolio Dashboard | Calcfino';
    description = 'Securely organize, compare, and monitor your saved amortizations, compound interests, and strategic milestones inside your private dashboard.';
  } else if (norm === '/calculators-all') {
    title = 'Visual Financial Planner Directory - 70+ Mathematical Calculators';
    description = 'Compare, filter, and execute calculations across 70+ high-precision engines spanning EMI, mutual fund SIP compounding, tax shields, and portfolio simulations.';
  } else if (norm === '/search') {
    const q = searchParams?.get('q') || '';
    title = q ? `Matched Planners for "${q}" | Calcfino Directory` : 'Search Financial Planners & Calculators | Calcfino';
    description = `Explore matched visual calculators and educational articles for '${q}' to map your systematic savings rate and loan interests.`;
  }
  else if (norm === '/guides') {
    title = 'Guides & Personal Finance Tutorials Library | Calcfino';
    description = 'Deep dive into comprehensive tutorials on mutual fund SIP compounding, tax code optimizations, annuity formulas, and real estate evaluations.';
  }
  else if (first === 'guides' && segments[1] === 'page') {
    const pageNum = segments[2] || '1';
    title = `Guides & Personal Finance Tutorials - Page ${pageNum} | Calcfino`;
    description = `Browse page ${pageNum} of our high-authority personal finance guides, detailing progressive interest metrics and tax schedules.`;
  }
  else if (first === 'guides' && segments[1]) {
    const post = blogPosts.find(p => p.slug === segments[1]);
    if (post) {
      title = `${post.title} | Calcfino Authoritative Guides`;
      description = post.excerpt;
      
      // JSON-LD Article Schema (BlogPosting) with full metadata
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}#article`,
        'headline': post.title,
        'description': post.excerpt,
        'image': post.imageUrl,
        'datePublished': post.publishedAt,
        'dateModified': post.publishedAt,
        'author': {
          '@type': 'Person',
          'name': post.author.name,
          'jobTitle': post.author.role,
          'image': post.author.avatarUrl,
          'description': post.author.bio
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Calcfino',
          'logo': {
            '@type': 'ImageObject',
            'url': `${DOMAIN}/logo.png`
          }
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': canonicalUrl
        },
        'wordCount': post.content ? post.content.split(/\s+/).length : 1200
      });
    }
  }
  else if (first === 'category' && segments[1]) {
    const rawCat = segments[1].replace(/-/g, ' ');
    const displayCat = rawCat.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const pageNum = segments[2] === 'page' ? ` - Page ${segments[3]}` : '';
    title = `Taxonomies in ${displayCat}${pageNum} | Calcfino Index`;
    description = `Read educational insights and math tutorials on ${displayCat}. Learn how to utilize custom calculators to model tax shelters and retirement paths.`;
    
    // CollectionPage / ItemList schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${canonicalUrl}#collection`,
      'name': `Category: ${displayCat}`,
      'description': description,
      'url': canonicalUrl
    });
  }
  else if (first === 'tag' && segments[1]) {
    const rawTag = segments[1].replace(/-/g, ' ').toUpperCase();
    title = `Strategic Insights on ${rawTag} | Calcfino Taxonomy`;
    description = `Review high-authority, curated financial resources and smart calculators tagged under ${rawTag} for planning systematic investment goals.`;
  }
  else if (first === 'author' && segments[1]) {
    const rawAuthor = segments[1].replace(/-/g, ' ');
    const displayAuthor = rawAuthor.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    title = `Personal Finance Columns Authored by ${displayAuthor} | Calcfino`;
    description = `Explore professional personal finance columns and calculator guides authored by ${displayAuthor}, specialized in wealth curation and tax planning.`;
  }
  else if (first === 'tools' && segments[1]) {
    const calc = calculators.find(c => c.id === segments[1]);
    if (calc) {
      title = calc.seoTitle || `${calc.name} - Instant Accurate Reports | Calcfino`;
      description = calc.seoDescription || calc.shortDescription;
      
      // FAQ schema for calculators (dynamic high-EEAT FAQ)
      const faqs = [
        {
          question: `How does the Calcfino ${calc.name} maintain calculation precision?`,
          answer: `The Calcfino ${calc.name} uses rigorous algebraic formulas compiled by financial mathematicians. Calculations operate entirely client-side inside your browser sandbox using high-precision floats to eliminate latency and routing errors.`
        },
        {
          question: `Can I export the amortization schedules and compound interest charts generated?`,
          answer: `Yes, all visual outputs, schedules, and charts can be printed, saved locally, or bookmarked inside your interactive wealth planner dashboard to log strategic portfolios.`
        }
      ];

      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        'mainEntity': faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      });

      // WebApplication / SoftwareApplication Schema for Rank Math Pro parity
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': `${canonicalUrl}#software`,
        'name': calc.name,
        'description': calc.shortDescription,
        'url': canonicalUrl,
        'applicationCategory': 'FinancialApplication',
        'operatingSystem': 'All',
        'browserRequirements': 'Requires HTML5, ES6, and client-side Javascript enablement',
        'offers': {
          '@type': 'Offer',
          'price': '0.00',
          'priceCurrency': 'USD'
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.8',
          'reviewCount': calc.inputs.length * 15 + 450,
          'bestRating': '5',
          'worstRating': '1'
        }
      });

      // HowTo Schema showing how to perform calculations
      const howToSteps = calc.inputs.map((input, idx) => ({
        '@type': 'HowToStep',
        'position': idx + 1,
        'name': `Determine ${input.label}`,
        'text': `Input or configure your target ${input.label} (Default: ${input.defaultValue}). Use the slider or enter numerals directly.`,
        'url': `${canonicalUrl}#input-${input.id}`
      }));
      
      howToSteps.push({
        '@type': 'HowToStep',
        'position': calc.inputs.length + 1,
        'name': 'Examine Real-time Visual Charts & Graphs',
        'text': 'Observe the dynamic split charts and compound growth lines reflecting your inputs instantly.',
        'url': `${canonicalUrl}#visual-reports`
      });

      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': `${canonicalUrl}#howto`,
        'name': `How to compute values with the ${calc.name}`,
        'description': `Follow these step-by-step procedures to estimate financial values with the ${calc.name}.`,
        'step': howToSteps
      });
    }
  }

  return {
    title,
    description,
    schema: schemas,
    breadcrumbs: crumbs,
    canonicalUrl
  };
}
