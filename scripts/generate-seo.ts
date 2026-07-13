import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { calculators } from '../src/data/calculators';
import { blogPosts } from '../src/data/blog';

// Derive __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://neelbyte.in';
const PUBLIC_DIR = path.resolve(__dirname, '../public');

console.log('🚀 Starting Technical SEO Asset Generation...');
console.log(`📂 Output directory: ${PUBLIC_DIR}`);

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

const nowStr = new Date().toISOString().split('T')[0];

/**
 * 1. Generate Robots.txt
 */
function generateRobotsTxt(): string {
  return `# Robots.txt - Calcfino.com Professional Rank Math Pro Parity Setup
User-agent: *
Allow: /
Allow: /tools/
Allow: /guides/
Allow: /category/
Allow: /tag/
Allow: /author/
Allow: /calculators-all

# Disallow low-value, duplicate, search results, and private user workspaces
Disallow: /admin
Disallow: /login
Disallow: /temp
Disallow: /search
Disallow: /dashboard
Disallow: /api/
Disallow: /*?q=
Disallow: /*?search=
Disallow: /*?*

# Core Web Vitals Crawler budget optimization
Crawl-delay: 1

Sitemap: ${DOMAIN}/sitemap_index.xml
`;
}

/**
 * 2. Generate Sitemap Index
 */
function generateSitemapIndexXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="https://neelbyte.in/sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${DOMAIN}/page-sitemap.xml</loc>
    <lastmod>${nowStr}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${DOMAIN}/tool-sitemap.xml</loc>
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
  <sitemap>
    <loc>${DOMAIN}/image-sitemap.xml</loc>
    <lastmod>${nowStr}</lastmod>
  </sitemap>
</sitemapindex>`;
}

/**
 * 3. Generate Page Sitemap (Static content)
 */
function generatePageSitemapXml(): string {
  const pages = [
    { path: '', freq: 'daily', priority: '1.0' },
    { path: 'about', freq: 'monthly', priority: '0.8' },
    { path: 'contact', freq: 'monthly', priority: '0.8' },
    { path: 'privacy-policy', freq: 'monthly', priority: '0.5' },
    { path: 'terms-and-conditions', freq: 'monthly', priority: '0.5' },
    { path: 'disclaimer', freq: 'monthly', priority: '0.5' },
    { path: 'cookie-policy', freq: 'monthly', priority: '0.5' },
    { path: 'editorial-policy', freq: 'monthly', priority: '0.6' },
    { path: 'refund-policy', freq: 'monthly', priority: '0.5' },
    { path: 'sitemap', freq: 'weekly', priority: '0.7' },
    { path: 'calculators-all', freq: 'daily', priority: '0.9' }
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  pages.forEach(p => {
    xml += `
  <url>
    <loc>${DOMAIN}/${p.path}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`;
  });

  xml += `\n</urlset>`;
  return xml;
}

/**
 * 4. Generate Tool Sitemap (Calculators as WebApplications)
 */
function generateToolSitemapXml(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  calculators.forEach(calc => {
    xml += `
  <url>
    <loc>${DOMAIN}/tools/${calc.id}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  });

  xml += `\n</urlset>`;
  return xml;
}

/**
 * 5. Generate Post Sitemap (Guides using /guides/:slug format)
 */
function generatePostSitemapXml(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  const indexablePosts = blogPosts.filter(p => !p.draft && p.status !== 'deleted');

  indexablePosts.forEach(post => {
    xml += `
  <url>
    <loc>${DOMAIN}/guides/${post.slug}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${post.imageUrl}</image:loc>
      <image:title>${post.title.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')}</image:title>
    </image:image>
  </url>`;
  });

  xml += `\n</urlset>`;
  return xml;
}

/**
 * 6. Generate Category Sitemap
 */
function generateCategorySitemapXml(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const categories = [
    'investment', 'loans', 'emi', 'mutual-funds', 'retirement', 
    'savings', 'budgeting', 'taxes', 'insurance', 'banking', 'credit-cards'
  ];

  categories.forEach(cat => {
    xml += `
  <url>
    <loc>${DOMAIN}/category/${cat}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  xml += `\n</urlset>`;
  return xml;
}

/**
 * 7. Generate Image Sitemap
 */
function generateImageSitemapXml(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  // 1. Static branding images / logo
  xml += `
  <url>
    <loc>${DOMAIN}/</loc>
    <image:image>
      <image:loc>${DOMAIN}/logo.png</image:loc>
      <image:title>Calcfino Personal Finance Logo</image:title>
    </image:image>
  </url>`;

  // 2. Blog posts images and author avatars
  blogPosts.forEach(post => {
    xml += `
  <url>
    <loc>${DOMAIN}/guides/${post.slug}</loc>
    <image:image>
      <image:loc>${post.imageUrl}</image:loc>
      <image:title>${post.title.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')}</image:title>
    </image:image>
    <image:image>
      <image:loc>${post.author.avatarUrl}</image:loc>
      <image:title>Author ${post.author.name.replace(/&/g, '&amp;')}</image:title>
    </image:image>
  </url>`;
  });

  xml += `\n</urlset>`;
  return xml;
}

/**
 * 8. Generate unified master Sitemap.xml
 */
function generateMasterSitemapXml(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  // Add homepage and pages
  const staticPaths = ['', 'about', 'contact', 'privacy-policy', 'terms-and-conditions', 'disclaimer', 'cookie-policy', 'editorial-policy', 'refund-policy', 'sitemap', 'calculators-all'];
  staticPaths.forEach(p => {
    xml += `
  <url>
    <loc>${DOMAIN}/${p}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>${p === '' || p === 'calculators-all' ? 'daily' : 'weekly'}</changefreq>
    <priority>${p === '' ? '1.0' : '0.8'}</priority>
  </url>`;
  });

  // Add calculators (/tools/*)
  calculators.forEach(calc => {
    xml += `
  <url>
    <loc>${DOMAIN}/tools/${calc.id}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  });

  // Add posts (/guides/*)
  blogPosts.forEach(post => {
    xml += `
  <url>
    <loc>${DOMAIN}/guides/${post.slug}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${post.imageUrl}</image:loc>
      <image:title>${post.title.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}</image:title>
    </image:image>
  </url>`;
  });

  // Add categories
  const categories = ['investment', 'loans', 'emi', 'mutual-funds', 'retirement', 'savings', 'budgeting', 'taxes', 'insurance', 'banking', 'credit-cards'];
  categories.forEach(cat => {
    xml += `
  <url>
    <loc>${DOMAIN}/category/${cat}</loc>
    <lastmod>${nowStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  xml += `\n</urlset>`;
  return xml;
}

// Write everything synchronously to /public
try {
  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), generateRobotsTxt());
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap_index.xml'), generateSitemapIndexXml());
  fs.writeFileSync(path.join(PUBLIC_DIR, 'page-sitemap.xml'), generatePageSitemapXml());
  fs.writeFileSync(path.join(PUBLIC_DIR, 'tool-sitemap.xml'), generateToolSitemapXml());
  fs.writeFileSync(path.join(PUBLIC_DIR, 'post-sitemap.xml'), generatePostSitemapXml());
  fs.writeFileSync(path.join(PUBLIC_DIR, 'category-sitemap.xml'), generateCategorySitemapXml());
  fs.writeFileSync(path.join(PUBLIC_DIR, 'image-sitemap.xml'), generateImageSitemapXml());
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), generateMasterSitemapXml());

  // Clean old files if present to prevent clutter
  const oldFiles = ['sitemap_blog.xml', 'sitemap_calculators.xml'];
  oldFiles.forEach(f => {
    const filePath = path.join(PUBLIC_DIR, f);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🗑️  Removed deprecated legacy file: ${f}`);
    }
  });

  console.log('✅ Technical SEO assets written successfully!');
} catch (err) {
  console.error('❌ Failed to write SEO assets:', err);
  process.exit(1);
}
