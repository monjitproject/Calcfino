// Mock localStorage in global scope for headless execution before importing other modules
if (typeof global !== 'undefined' && !('localStorage' in global)) {
  (global as any).localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {}
  };
}

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  generateSitemapIndexXml,
  generatePageSitemapXml,
  generateSitemapCalculatorsXml,
  generateSitemapBlogXml,
  generatePostSitemapXml,
  generateCategorySitemapXml,
  generateImageSitemapXml,
  generateSitemapXml,
  generateRobotsTxt,
  generateTagSitemapXml,
  generateAuthorSitemapXml
} from '../utils/seo';

// Resolve paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, '../../public');

console.log('--- Executing Automated Sitemap Generation ---');
console.log('Target Public Directory:', PUBLIC_DIR);

try {
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  // 1. Generate XML Contents dynamically
  const sitemapIndex = generateSitemapIndexXml();
  const pageSitemap = generatePageSitemapXml();
  const sitemapCalculators = generateSitemapCalculatorsXml();
  const sitemapBlog = generateSitemapBlogXml();
  const postSitemap = generatePostSitemapXml();
  const categorySitemap = generateCategorySitemapXml();
  const tagSitemap = generateTagSitemapXml();
  const authorSitemap = generateAuthorSitemapXml();
  const imageSitemap = generateImageSitemapXml();
  const sitemapAll = generateSitemapXml();
  const robotsTxt = generateRobotsTxt();

  // 2. Write files synchronously with UTF-8 encoding
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap_index.xml'), sitemapIndex, 'utf-8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'page-sitemap.xml'), pageSitemap, 'utf-8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap_calculators.xml'), sitemapCalculators, 'utf-8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap_blog.xml'), sitemapBlog, 'utf-8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'post-sitemap.xml'), postSitemap, 'utf-8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'category-sitemap.xml'), categorySitemap, 'utf-8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'tag-sitemap.xml'), tagSitemap, 'utf-8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'author-sitemap.xml'), authorSitemap, 'utf-8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'image-sitemap.xml'), imageSitemap, 'utf-8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapAll, 'utf-8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robotsTxt, 'utf-8');

  console.log('✔ sitemap_index.xml generated');
  console.log('✔ page-sitemap.xml generated');
  console.log('✔ sitemap_calculators.xml generated');
  console.log('✔ sitemap_blog.xml generated');
  console.log('✔ post-sitemap.xml generated');
  console.log('✔ category-sitemap.xml generated');
  console.log('✔ tag-sitemap.xml generated');
  console.log('✔ author-sitemap.xml generated');
  console.log('✔ image-sitemap.xml generated');
  console.log('✔ sitemap.xml generated');
  console.log('✔ robots.txt generated');
  console.log('🎉 All sitemaps updated successfully!');
} catch (error) {
  console.error('❌ Sitemap generation failed:', error);
  process.exit(1);
}
