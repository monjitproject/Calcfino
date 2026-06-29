import { Calculator, BlogPost } from '../types';
import { calculators } from '../data/calculators';
import { blogPosts } from '../data/blog';

// Set default fallback domain for canonical generation
const DOMAIN = 'https://neelbyte.in';

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
  return `User-agent: *

Allow: /

Disallow: /admin/
Disallow: /login/
Disallow: /search
Disallow: /api/
Disallow: /preview/
Disallow: /tmp/
Disallow: /*?replytocom
Disallow: /*?utm_
Disallow: /*?sort=
Disallow: /*?filter=

Sitemap: ${DOMAIN}/sitemap_index.xml
`;
}

function escapeXml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generates valid SEO XML Sitemap Index containing links to all individual sitemaps
 */
export function generateSitemapIndexXml(): string {
  const nowStr = new Date().toISOString().split('T')[0];
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${DOMAIN}/page-sitemap.xml</loc>
    <lastmod>${nowStr}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${DOMAIN}/post-sitemap.xml</loc>
    <lastmod>${nowStr}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${DOMAIN}/category-sitemap.xml</loc>
    <lastmod>${nowStr}</lastmod>
  </sitemap>
</sitemapindex>`;
}

/**
 * Generates valid SEO XML Image Sitemap containing Logo, Calculator Images/Icons, Blog post images, Featured images, and Illustrations
 */
export function generateImageSitemapXml(): string {
  const nowStr = new Date().toISOString().split('T')[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  // Filter only published posts (exclude draft, private, deleted)
  const publishedPosts = blogPosts.filter(post => {
    if (post.status && post.status !== 'published') return false;
    if (post.draft === true) return false;
    if (post.private === true) return false;
    if (post.deleted === true) return false;
    return true;
  });

  // 1. Homepage URL (with Logo and Hero Illustration / Financial Graphics)
  xml += `
  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${DOMAIN}/logo.png</image:loc>
      <image:title>Calcfino Financial Calculator Logo</image:title>
      <image:caption>Calcfino brand logo featuring a modern finance wallet concept.</image:caption>
    </image:image>
    <image:image>
      <image:loc>${DOMAIN}/images/hero-illustration.png</image:loc>
      <image:title>Calcfino Wealth Planner Hero Illustration</image:title>
      <image:caption>Sleek, responsive hero illustration guiding users on interactive wealth calculation.</image:caption>
    </image:image>
    <image:image>
      <image:loc>${DOMAIN}/images/financial-growth.png</image:loc>
      <image:title>Interactive Compounding Growth Illustration</image:title>
      <image:caption>Bento grid compound calculator illustration for dynamic SIP growth charts.</image:caption>
    </image:image>
  </url>`;

  // 2. Calculators Hub (with Category Images and Icons / Illustrations)
  xml += `
  <url>
    <loc>${DOMAIN}/calculators-all</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${DOMAIN}/images/categories/loan.png</image:loc>
      <image:title>Loan Calculator Hub Icon</image:title>
      <image:caption>Vector illustration for auto, personal, and mortgage loan repayment solver tools.</image:caption>
    </image:image>
    <image:image>
      <image:loc>${DOMAIN}/images/categories/investment.png</image:loc>
      <image:title>Investment Calculator Hub Icon</image:title>
      <image:caption>Vector illustration representing compound interest, SWP, and mutual fund calculators.</image:caption>
    </image:image>
    <image:image>
      <image:loc>${DOMAIN}/images/categories/tax.png</image:loc>
      <image:title>Tax Savings Calculator Hub Icon</image:title>
      <image:caption>Vector illustration representing progressive income tax and capital gains calculators.</image:caption>
    </image:image>
  </url>`;

  // 3. For each individual Calculator page
  calculators.forEach(calc => {
    xml += `
  <url>
    <loc>${DOMAIN}/${calc.id}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${DOMAIN}/images/calculators/${calc.id}.png</image:loc>
      <image:title>${escapeXml(calc.name)} Illustration</image:title>
      <image:caption>Interactive design visualization for the ${escapeXml(calc.name)} utility.</image:caption>
    </image:image>
  </url>`;
  });

  // 4. Blog Hub
  xml += `
  <url>
    <loc>${DOMAIN}/blog</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&amp;fit=crop&amp;q=80&amp;w=1200</image:loc>
      <image:title>Calcfino Insights Featured Banner</image:title>
      <image:caption>Featured banner illustrating smart spending, ratio budgets, and modern financial wisdom.</image:caption>
    </image:image>
  </url>`;

  // 5. Blog Posts (with post images and author avatars)
  publishedPosts.forEach(post => {
    xml += `
  <url>
    <loc>${DOMAIN}/blog/${post.slug}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${escapeXml(post.imageUrl)}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
      <image:caption>${escapeXml(post.excerpt)}</image:caption>
    </image:image>`;
    
    if (post.author && post.author.avatarUrl) {
      xml += `
    <image:image>
      <image:loc>${escapeXml(post.author.avatarUrl)}</image:loc>
      <image:title>Author: ${escapeXml(post.author.name)}</image:title>
      <image:caption>Profile avatar for ${escapeXml(post.author.name)}, ${escapeXml(post.author.role)}.</image:caption>
    </image:image>`;
    }
    
    xml += `
  </url>`;
  });

  xml += `\n</urlset>`;
  return xml;
}

/**
 * Generates valid SEO XML Sitemap containing categories (category-sitemap.xml) and pagination pages
 */
export function generateCategorySitemapXml(): string {
  const nowStr = new Date().toISOString().split('T')[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Filter published posts
  const publishedPosts = blogPosts.filter(post => {
    if (post.status && post.status !== 'published') return false;
    if (post.draft === true) return false;
    if (post.private === true) return false;
    if (post.deleted === true) return false;
    return true;
  });

  const predefinedCategories = [
    'Loan', 'Investment', 'Tax', 'Business', 'Retirement', 'Insurance', 
    'Personal Finance', 'Cryptocurrency', 'Savings', 'Salary', 'Real Estate'
  ];
  
  const dynamicCategories = publishedPosts.map(p => p.category);
  const allCategoriesSet = new Set([...predefinedCategories, ...dynamicCategories]);
  const sortedCategories = Array.from(allCategoriesSet).sort();

  sortedCategories.forEach(cat => {
    const catSlug = cat.toLowerCase().replace(/\s+/g, '-');
    const catPosts = publishedPosts.filter(p => p.category.toLowerCase().replace(/\s+/g, '-') === catSlug);
    
    // Page 1 Index
    xml += `
  <url>
    <loc>${DOMAIN}/category/${catSlug}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;

    // Paginated Pages (6 posts per page)
    const totalCatPages = Math.ceil(catPosts.length / 6);
    for (let page = 2; page <= totalCatPages; page++) {
      xml += `
  <url>
    <loc>${DOMAIN}/category/${catSlug}/page/${page}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`;
    }
  });

  xml += `\n</urlset>`;
  return xml;
}

/**
 * Generates valid SEO XML Sitemap containing only the published blog posts (post-sitemap.xml)
 */
export function generatePostSitemapXml(): string {
  const nowStr = new Date().toISOString().split('T')[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  // Filter only published posts (exclude draft, private, deleted)
  const publishedPosts = blogPosts.filter(post => {
    if (post.status && post.status !== 'published') return false;
    if (post.draft === true) return false;
    if (post.private === true) return false;
    if (post.deleted === true) return false;
    return true;
  });

  publishedPosts.forEach(post => {
    xml += `
  <url>
    <loc>${DOMAIN}/blog/${post.slug}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${escapeXml(post.imageUrl)}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
    </image:image>
  </url>`;
  });

  xml += `\n</urlset>`;
  return xml;
}

/**
 * Generates valid SEO XML Sitemap containing tags (tag-sitemap.xml) and tag pagination
 */
export function generateTagSitemapXml(): string {
  const nowStr = new Date().toISOString().split('T')[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Filter published posts
  const publishedPosts = blogPosts.filter(post => {
    if (post.status && post.status !== 'published') return false;
    if (post.draft === true) return false;
    if (post.private === true) return false;
    if (post.deleted === true) return false;
    return true;
  });

  const allTags = Array.from(new Set(publishedPosts.flatMap(p => p.tags))).sort();

  allTags.forEach(tag => {
    const tagSlug = tag.toLowerCase().replace(/\s+/g, '-');
    const tagPosts = publishedPosts.filter(p => p.tags.some(t => t.toLowerCase().replace(/\s+/g, '-') === tagSlug));
    
    // Page 1 Index
    xml += `
  <url>
    <loc>${DOMAIN}/tag/${tagSlug}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`;

    // Paginated Pages
    const totalTagPages = Math.ceil(tagPosts.length / 6);
    for (let page = 2; page <= totalTagPages; page++) {
      xml += `
  <url>
    <loc>${DOMAIN}/tag/${tagSlug}/page/${page}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.4</priority>
  </url>`;
    }
  });

  xml += `\n</urlset>`;
  return xml;
}

/**
 * Generates valid SEO XML Sitemap containing authors (author-sitemap.xml) and author pagination
 */
export function generateAuthorSitemapXml(): string {
  const nowStr = new Date().toISOString().split('T')[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Filter published posts
  const publishedPosts = blogPosts.filter(post => {
    if (post.status && post.status !== 'published') return false;
    if (post.draft === true) return false;
    if (post.private === true) return false;
    if (post.deleted === true) return false;
    return true;
  });

  const authorNamesSet = new Set(publishedPosts.map(p => p.author.name));
  const sortedAuthors = Array.from(authorNamesSet).sort();

  sortedAuthors.forEach(authorName => {
    const authorSlug = authorName.toLowerCase().replace(/\s+/g, '-');
    const authorPosts = publishedPosts.filter(p => p.author.name.toLowerCase().replace(/\s+/g, '-') === authorSlug);
    
    // Page 1 Index
    xml += `
  <url>
    <loc>${DOMAIN}/author/${authorSlug}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`;

    // Paginated Pages
    const totalAuthorPages = Math.ceil(authorPosts.length / 6);
    for (let page = 2; page <= totalAuthorPages; page++) {
      xml += `
  <url>
    <loc>${DOMAIN}/author/${authorSlug}/page/${page}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.4</priority>
  </url>`;
    }
  });

  xml += `\n</urlset>`;
  return xml;
}

/**
 * Generates valid SEO XML Sitemap containing only static/informational pages (page-sitemap.xml) and main blog paginated pages
 */
export function generatePageSitemapXml(): string {
  const nowStr = new Date().toISOString().split('T')[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // 1. Homepage
  xml += `
  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  // 2. Individual Calculators
  calculators.forEach(calc => {
    xml += `
  <url>
    <loc>${DOMAIN}/${calc.id}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  });

  // 3. Allowed static pages: About, Contact, Privacy Policy, Disclaimer, Terms & Conditions, Cookie Policy, Editorial Policy, Refund Policy, Sitemap page, Calculators All (all important static pages)
  const staticPages = [
    'about', 
    'contact', 
    'privacy-policy', 
    'disclaimer', 
    'terms-and-conditions',
    'cookie-policy', 
    'editorial-policy', 
    'refund-policy', 
    'sitemap',
    'calculators-all',
    'blog'
  ];
  
  staticPages.forEach(p => {
    xml += `
  <url>
    <loc>${DOMAIN}/${p}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  // Filter published posts
  const publishedPosts = blogPosts.filter(post => {
    if (post.status && post.status !== 'published') return false;
    if (post.draft === true) return false;
    if (post.private === true) return false;
    if (post.deleted === true) return false;
    return true;
  });

  // Dynamic pagination for /blog/page/:num (starting from page 2)
  const totalBlogPages = Math.ceil(publishedPosts.length / 6);
  for (let page = 2; page <= totalBlogPages; page++) {
    xml += `
  <url>
    <loc>${DOMAIN}/blog/page/${page}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }

  xml += `\n</urlset>`;
  return xml;
}

/**
 * Generates valid SEO XML Sitemap containing only static/informational pages
 * Kept for backwards compatibility if needed
 */
export function generateSitemapPagesXml(): string {
  return generatePageSitemapXml();
}

/**
 * Generates valid SEO XML Sitemap containing only the dynamic financial calculators
 */
export function generateSitemapCalculatorsXml(): string {
  const nowStr = new Date().toISOString().split('T')[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  calculators.forEach(calc => {
    xml += `
  <url>
    <loc>${DOMAIN}/${calc.id}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  });

  xml += `\n</urlset>`;
  return xml;
}

/**
 * Generates valid SEO XML Sitemap containing blog indices, tags, categories, and articles with images
 * Kept for backwards compatibility but we promote modular sitemaps
 */
export function generateSitemapBlogXml(): string {
  const nowStr = new Date().toISOString().split('T')[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  // Filter published posts
  const publishedPosts = blogPosts.filter(post => {
    if (post.status && post.status !== 'published') return false;
    if (post.draft === true) return false;
    if (post.private === true) return false;
    if (post.deleted === true) return false;
    return true;
  });

  // 1. Blog Hub
  xml += `
  <url>
    <loc>${DOMAIN}/blog</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;

  // 2. Blog Posts with Image schema
  publishedPosts.forEach(post => {
    xml += `
  <url>
    <loc>${DOMAIN}/blog/${post.slug}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${escapeXml(post.imageUrl)}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
    </image:image>
  </url>`;
  });

  // 3. Categories
  const categories = Array.from(new Set(publishedPosts.map(p => p.category)));
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

  // 4. Tags
  const tags = Array.from(new Set(publishedPosts.flatMap(p => p.tags)));
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

  // 5. Blog Hub and pagination
  xml += `
  <url>
    <loc>${DOMAIN}/blog</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;

  // Filter published posts
  const publishedPosts = blogPosts.filter(post => {
    if (post.status && post.status !== 'published') return false;
    if (post.draft === true) return false;
    if (post.private === true) return false;
    if (post.deleted === true) return false;
    return true;
  });

  const totalBlogPages = Math.ceil(publishedPosts.length / 6);
  for (let page = 2; page <= totalBlogPages; page++) {
    xml += `
  <url>
    <loc>${DOMAIN}/blog/page/${page}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }

  // 6. Individual Blog Posts (Dynamically listed with image schemas)
  publishedPosts.forEach(post => {
    xml += `
  <url>
    <loc>${DOMAIN}/blog/${post.slug}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${escapeXml(post.imageUrl)}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
    </image:image>
  </url>`;
  });

  // 7. Categories and category pagination
  const predefinedCategories = [
    'Loan', 'Investment', 'Tax', 'Business', 'Retirement', 'Insurance', 
    'Personal Finance', 'Cryptocurrency', 'Savings', 'Salary', 'Real Estate'
  ];
  const dynamicCategories = publishedPosts.map(p => p.category);
  const allCategoriesSet = new Set([...predefinedCategories, ...dynamicCategories]);
  const sortedCategories = Array.from(allCategoriesSet).sort();

  sortedCategories.forEach(cat => {
    const catSlug = cat.toLowerCase().replace(/\s+/g, '-');
    const catPosts = publishedPosts.filter(p => p.category.toLowerCase().replace(/\s+/g, '-') === catSlug);
    
    xml += `
  <url>
    <loc>${DOMAIN}/category/${catSlug}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`;

    const totalCatPages = Math.ceil(catPosts.length / 6);
    for (let page = 2; page <= totalCatPages; page++) {
      xml += `
  <url>
    <loc>${DOMAIN}/category/${catSlug}/page/${page}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.4</priority>
  </url>`;
    }
  });

  // 8. Tags and tag pagination
  const tags = Array.from(new Set(publishedPosts.flatMap(p => p.tags))).sort();
  tags.forEach(t => {
    const tagSlug = t.toLowerCase().replace(/\s+/g, '-');
    const tagPosts = publishedPosts.filter(p => p.tags.some(ts => ts.toLowerCase().replace(/\s+/g, '-') === tagSlug));
    
    xml += `
  <url>
    <loc>${DOMAIN}/tag/${tagSlug}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.4</priority>
  </url>`;

    const totalTagPages = Math.ceil(tagPosts.length / 6);
    for (let page = 2; page <= totalTagPages; page++) {
      xml += `
  <url>
    <loc>${DOMAIN}/tag/${tagSlug}/page/${page}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.3</priority>
  </url>`;
    }
  });

  // 9. Authors and author pagination
  const authorNamesSet = new Set(publishedPosts.map(p => p.author.name));
  const sortedAuthors = Array.from(authorNamesSet).sort();
  sortedAuthors.forEach(authorName => {
    const authorSlug = authorName.toLowerCase().replace(/\s+/g, '-');
    const authorPosts = publishedPosts.filter(p => p.author.name.toLowerCase().replace(/\s+/g, '-') === authorSlug);
    
    xml += `
  <url>
    <loc>${DOMAIN}/author/${authorSlug}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.4</priority>
  </url>`;

    const totalAuthorPages = Math.ceil(authorPosts.length / 6);
    for (let page = 2; page <= totalAuthorPages; page++) {
      xml += `
  <url>
    <loc>${DOMAIN}/author/${authorSlug}/page/${page}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.3</priority>
  </url>`;
    }
  });

  xml += `\n</urlset>`;
  return xml;
}

