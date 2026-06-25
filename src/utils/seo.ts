import { Calculator, BlogPost } from '../types';
import { calculators } from '../data/calculators';
import { blogPosts } from '../data/blog';

// Set default fallback domain for canonical generation
const DOMAIN = 'https://calcfino.com';

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
 * - Converts uppercase to lowercase
 * - Replaces underscores/spaces with hyphens
 * - Removes non-alphanumeric characters (keeps alphanumeric and hyphens)
 * - Removes stop words for dynamic density
 * - Merges duplicate hyphens and trims leading/trailing hyphens
 * - Limits max length to 60 characters
 */
export function generateSeoSlug(title: string): string {
  if (!title) return '';
  
  // Lowercase, replace non-alphanumeric (except space/underscore/hyphen) with space
  let clean = title
    .toLowerCase()
    .replace(/[^a-z0-9\s\-_]/g, ' ')
    .replace(/[\s\-_]+/g, ' ')
    .trim();

  // Split, filter stop words, join with hyphens
  const words = clean.split(' ');
  const filteredWords = words.filter(word => !STOP_WORDS.has(word) && word.length > 0);
  
  // If stripping stop words emptied it, fall back to original clean words
  const finalWords = filteredWords.length > 0 ? filteredWords : words.filter(w => w.length > 0);
  
  let slug = finalWords.join('-');
  
  // Clean up trailing/duplicate hyphens
  slug = slug.replace(/-+/g, '-').replace(/^-+|-+$/g, '');
  
  // Limit length to 60 characters
  if (slug.length > 60) {
    const truncated = slug.substring(0, 60);
    // Trim back to the last complete hyphen to keep it clean
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
 * - No file extensions
 */
export function normalizeUrl(urlPath: string): string {
  if (!urlPath || urlPath === '/') return '/';
  
  let clean = urlPath
    .toLowerCase()
    .replace(/_/g, '-')
    .replace(/\s+/g, '-')
    .replace(/\/\//g, '/')
    .replace(/\.html|\.php|\.aspx|\.jsp/gi, '');

  // Remove trailing index
  if (clean.endsWith('/index')) {
    clean = clean.substring(0, clean.length - 6);
  }

  // Trim trailing slash (unless it is exactly "/")
  if (clean.length > 1 && clean.endsWith('/')) {
    clean = clean.substring(0, clean.length - 1);
  }

  return clean || '/';
}

/**
 * Returns the fully qualified canonical URL for a given pathname
 */
export function getCanonicalUrl(pathname: string): string {
  const norm = normalizeUrl(pathname);
  return `${DOMAIN}${norm}`;
}

/**
 * Generates breadcrumb trail based on current parsed pathname
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function getBreadcrumbsForPath(pathname: string): BreadcrumbItem[] {
  const norm = normalizeUrl(pathname);
  const crumbs: BreadcrumbItem[] = [{ name: 'Home', url: '/' }];
  
  if (norm === '/') return crumbs;
  
  const segments = norm.split('/').filter(Boolean);
  
  // 1. Blog segments
  if (segments[0] === 'blog') {
    crumbs.push({ name: 'Finance Blog', url: '/blog' });
    if (segments[1] && segments[1] !== 'page') {
      const post = blogPosts.find(p => p.slug === segments[1]);
      crumbs.push({ name: post ? post.title : segments[1].replace(/-/g, ' '), url: `/blog/${segments[1]}` });
    } else if (segments[1] === 'page' && segments[2]) {
      crumbs.push({ name: `Page ${segments[2]}`, url: `/blog/page/${segments[2]}` });
    }
  } 
  // 2. Category segments
  else if (segments[0] === 'category' && segments[1]) {
    const rawCategory = segments[1].replace(/-/g, ' ');
    const displayCategory = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);
    crumbs.push({ name: displayCategory, url: `/category/${segments[1]}` });
    
    if (segments[2] === 'page' && segments[3]) {
      crumbs.push({ name: `Page ${segments[3]}`, url: `/category/${segments[1]}/page/${segments[3]}` });
    }
  } 
  // 3. Tag segments
  else if (segments[0] === 'tag' && segments[1]) {
    const rawTag = segments[1].replace(/-/g, ' ');
    crumbs.push({ name: `Tag: ${rawTag.toUpperCase()}`, url: `/tag/${segments[1]}` });
  } 
  // 4. Author segments
  else if (segments[0] === 'author' && segments[1]) {
    const rawAuthor = segments[1].replace(/-/g, ' ');
    const displayAuthor = rawAuthor.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    crumbs.push({ name: `Author: ${displayAuthor}`, url: `/author/${segments[1]}` });
  }
  // 5. Static page segments
  else if ([
    'about', 'contact', 'privacy-policy', 'disclaimer', 'terms-and-conditions', 
    'cookie-policy', 'editorial-policy', 'refund-policy', 'sitemap', 'dashboard'
  ].includes(segments[0])) {
    const displayName = segments[0]
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    crumbs.push({ name: displayName, url: `/${segments[0]}` });
  } 
  // 6. Calculator page segments
  else {
    const calc = calculators.find(c => c.id === segments[0]);
    if (calc) {
      crumbs.push({ name: calc.name, url: `/${calc.id}` });
    } else {
      crumbs.push({ name: segments[0].replace(/-/g, ' '), url: `/${segments[0]}` });
    }
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
      'item': `${DOMAIN}${crumb.url}`
    }))
  };
}

/**
 * Returns dynamic SEO titles and descriptions matching best authority guidelines
 */
export interface MetaDataResponse {
  title: string;
  description: string;
  schema: any[];
  breadcrumbs: BreadcrumbItem[];
  canonicalUrl: string;
}

export function getSeoMetadata(pathname: string, searchParams?: URLSearchParams): MetaDataResponse {
  const norm = normalizeUrl(pathname);
  const crumbs = getBreadcrumbsForPath(norm);
  const canonicalUrl = getCanonicalUrl(norm);
  
  const defaultTitle = 'Calcfino.com | Premium Calculators & Smart Financial Planners';
  const defaultDesc = 'Calculate EMIs, SIP compounding multipliers, tax exemptions, retirement corpuses, and savings yields with our precise 70+ interactive financial calculators.';
  
  let title = defaultTitle;
  let description = defaultDesc;
  const schemas: any[] = [];
  
  const segments = norm.split('/').filter(Boolean);

  // Main page schemas (Organization & Website search)
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Calcfino.com',
    'url': DOMAIN,
    'logo': `${DOMAIN}/logo.png`,
    'sameAs': [
      'https://twitter.com/calcfino',
      'https://linkedin.com/company/calcfino'
    ]
  });

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Calcfino.com',
    'url': DOMAIN,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${DOMAIN}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  });

  // Breadcrumbs schema always added
  schemas.push(getBreadcrumbSchemaJson(crumbs));

  // Determine specific SEO metadata based on current URL path
  if (norm === '/') {
    title = 'Calcfino.com - High Precision Financial Calculators & Planners';
    description = defaultDesc;
  } 
  // Static pages
  else if (norm === '/about') {
    title = 'About Us - Our Mission & Chartered Financial Experts | Calcfino.com';
    description = 'Learn about Calcfino.com’s core mission, editorial independence, and our expert team of financial planners creating reliable visual math calculators.';
  } else if (norm === '/contact') {
    title = 'Contact Financial Support & Feedback | Calcfino.com';
    description = 'Have suggestions, custom tool requests, or advertising inquiries? Reach out to our financial engineering and planning team directly.';
  } else if (norm === '/privacy-policy') {
    title = 'Privacy Policy & Data Protection Guidelines | Calcfino.com';
    description = 'Your financial data security is our top priority. Learn how Calcfino.com secures your inputs and maintains complete offline-first privacy.';
  } else if (norm === '/terms-and-conditions' || norm === '/terms-conditions') {
    title = 'Terms of Service & Mathematical Accuracy Disclaimer | Calcfino.com';
    description = 'Read the terms of service governing Calcfino.com calculators, accurate compounding formulations, and visual report tools.';
  } else if (norm === '/disclaimer') {
    title = 'Financial Advice Disclaimer & Calculator Disclosure | Calcfino.com';
    description = 'Calcfino.com provides educational tools. All calculators run mathematical estimates and do not constitute registered professional financial advice.';
  } else if (norm === '/cookie-policy') {
    title = 'Cookie Usage & Browser Preferences Policy | Calcfino.com';
    description = 'Learn how Calcfino.com uses light cookies to securely save your financial planner presets, regional formats, and dark/light settings.';
  } else if (norm === '/editorial-policy') {
    title = 'Editorial Standards & Financial Calculations Verification Policy';
    description = 'Discover our rigorous calculation review standards. Every visual model is double-verified by licensed chartered accountants and financial analysts.';
  } else if (norm === '/refund-policy') {
    title = 'Refund & Premium Planners Policy | Calcfino.com';
    description = 'Review our refund rules and terms of access for advanced premium asset models, customized reports, and ad-free budgeting dashboards.';
  } else if (norm === '/sitemap') {
    title = 'Visual HTML Directory Sitemap - All Calculators & Blogs | Calcfino.com';
    description = 'Quickly navigate to any of our 70+ financial calculators, loan emi planners, investment compounding sheets, tax guides, and blog categories.';
  } else if (norm === '/dashboard') {
    title = 'Your Personalized Wealth Planner Dashboard | Calcfino.com';
    description = 'Securely view your saved calculations, model reports, financial goals, monthly investment trajectories, and customized portfolios.';
  } else if (norm === '/search') {
    const q = searchParams?.get('q') || '';
    title = q ? `Search Results for "${q}" - Financial Planners | Calcfino.com` : 'Search Financial Planners & Calculators | Calcfino.com';
    description = `Explore matched visual calculators and educational articles for '${q}' to map your systematic savings rate and loan interests.`;
  }
  // Blog hub and pagination
  else if (norm === '/blog') {
    title = 'The Wealth Intelligence Blog - Personal Finance & Investing | Calcfino.com';
    description = 'Expert visual articles covering compounding SIP formulas, tax exemption codes, capital indexations, real estate mortgage rules, and stock indices.';
  } else if (segments[0] === 'blog' && segments[1] === 'page') {
    const pageNum = segments[2] || '1';
    title = `The Wealth Intelligence Blog - Page ${pageNum} | Calcfino.com`;
    description = `Page ${pageNum} of our expert personal finance series. Learn systematic SIP formulations, inflation hedge indexations, and loan calculations.`;
  }
  // Category pages
  else if (segments[0] === 'category' && segments[1]) {
    const rawCat = segments[1].replace(/-/g, ' ');
    const displayCat = rawCat.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const pageNum = segments[2] === 'page' ? ` - Page ${segments[3]}` : '';
    title = `Financial Guides in ${displayCat}${pageNum} | Calcfino.com`;
    description = `Read educational insights and math tutorials on ${displayCat}. Learn how to utilize custom calculators to model tax shelters and retirement paths.`;
  }
  // Tag pages
  else if (segments[0] === 'tag' && segments[1]) {
    const rawTag = segments[1].replace(/-/g, ' ').toUpperCase();
    title = `Latest Insights on ${rawTag} - Financial Tactics | Calcfino.com`;
    description = `Review high-authority, curated financial resources and smart calculators tagged under ${rawTag} for planning systematic investment goals.`;
  }
  // Author pages
  else if (segments[0] === 'author' && segments[1]) {
    const rawAuthor = segments[1].replace(/-/g, ' ');
    const displayAuthor = rawAuthor.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    title = `Financial Articles Written by ${displayAuthor} | Calcfino.com`;
    description = `Explore professional personal finance columns and calculator guides authored by ${displayAuthor}, specialized in wealth curation and tax planning.`;
  }
  // Blog Post pages
  else if (segments[0] === 'blog' && segments[1]) {
    const post = blogPosts.find(p => p.slug === segments[1]);
    if (post) {
      title = `${post.title} | Calcfino.com Blog`;
      description = post.excerpt;
      
      // JSON-LD Article Schema
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': post.title,
        'description': post.excerpt,
        'image': post.imageUrl,
        'datePublished': post.publishedAt,
        'author': {
          '@type': 'Person',
          'name': post.author.name
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Calcfino.com',
          'logo': {
            '@type': 'ImageObject',
            'url': `${DOMAIN}/logo.png`
          }
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': canonicalUrl
        }
      });
    }
  }
  // Calculator Pages or fallback
  else {
    const calcId = segments[0];
    const calc = calculators.find(c => c.id === calcId);
    if (calc) {
      title = calc.seoTitle || `${calc.name} - Instant Accurate Reports | Calcfino.com`;
      description = calc.seoDescription || calc.shortDescription;
      
      // FAQ schema for calculators (dynamic mock-faq based on calculator properties)
      const faqs = [
        {
          question: `How does the Calcfino ${calc.name} work?`,
          answer: `The Calcfino ${calc.name} operates using high-precision mathematical models. Input your custom variables (such as amounts, time duration, and rates) and click to receive comprehensive reports, amortization matrices, and charts.`
        },
        {
          question: `Are calculations in the ${calc.name} guaranteed to be 100% accurate?`,
          answer: `Yes, all visual outputs run on standard algebraic formulas double-verified by qualified chartered financial planners to align with international compounding metrics.`
        }
      ];

      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      });

      // WebApplication / Calculator Schema
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': calc.name,
        'description': calc.shortDescription,
        'url': canonicalUrl,
        'applicationCategory': 'BusinessApplication',
        'operatingSystem': 'All',
        'browserRequirements': 'Requires HTML5 and Javascript Support'
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

/**
 * Returns dynamic Robots.txt content adhering to requested structure
 */
export function generateRobotsTxt(): string {
  return `# Robots.txt - Calcfino.com SEO Directory
User-agent: *
Allow: /
Allow: /blog
Allow: /category
Allow: /tag
Allow: /author
Allow: /*-calculator

# Block private, temporary, search results and administrative routes
Disallow: /admin
Disallow: /login
Disallow: /temp
Disallow: /search
Disallow: /dashboard
Disallow: /api/

Sitemap: ${DOMAIN}/sitemap.xml
`;
}

/**
 * Generates valid SEO XML Sitemap containing all calculators, posts, and static pages
 */
export function generateSitemapXml(): string {
  const nowStr = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  // 1. Homepage
  xml += `
  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  // 2. Static Pages
  const staticPages = [
    'about', 'contact', 'privacy-policy', 'disclaimer', 'terms-and-conditions',
    'cookie-policy', 'editorial-policy', 'refund-policy', 'sitemap'
  ];
  staticPages.forEach(p => {
    xml += `
  <url>
    <loc>${DOMAIN}/${p}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  // 3. Calculators All Hub
  xml += `
  <url>
    <loc>${DOMAIN}/calculators-all</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

  // 4. Individual Calculators (Dynamically listed)
  calculators.forEach(calc => {
    xml += `
  <url>
    <loc>${DOMAIN}/${calc.id}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  });

  // 5. Blog Hub
  xml += `
  <url>
    <loc>${DOMAIN}/blog</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;

  // 6. Individual Blog Posts (Dynamically listed with image schemas)
  blogPosts.forEach(post => {
    xml += `
  <url>
    <loc>${DOMAIN}/blog/${post.slug}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${post.imageUrl}</image:loc>
      <image:title>${post.title.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}</image:title>
    </image:image>
  </url>`;
  });

  // 7. Categories
  const categories = Array.from(new Set(blogPosts.map(p => p.category)));
  categories.forEach(cat => {
    const catSlug = cat.toLowerCase().replace(/\s+/g, '-');
    xml += `
  <url>
    <loc>${DOMAIN}/category/${catSlug}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`;
  });

  // 8. Tags
  const tags = Array.from(new Set(blogPosts.flatMap(p => p.tags)));
  tags.forEach(t => {
    const tagSlug = t.toLowerCase().replace(/\s+/g, '-');
    xml += `
  <url>
    <loc>${DOMAIN}/tag/${tagSlug}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.4</priority>
  </url>`;
  });

  xml += `\n</urlset>`;
  return xml;
}
