import React, { useEffect } from 'react';
import { normalizeUrl } from '../utils/seo';

interface SEOProps {
  title: string;
  description: string;
  schema?: any;
  canonicalUrl?: string;
  breadcrumbs?: { name: string; url: string }[];
}

export default function SEO({ title, description, schema, canonicalUrl, breadcrumbs }: SEOProps) {
  useEffect(() => {
    // 1. Direct Page Title Integration (no duplicate branding suffixes)
    document.title = title;

    // 2. Dynamic Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Advanced Indexing Controls (Robots tag)
    const normPath = normalizeUrl(window.location.pathname);
    const isNoIndex = normPath.startsWith('/dashboard') || 
                      normPath.startsWith('/search') || 
                      normPath.startsWith('/admin') || 
                      normPath.startsWith('/temp');
    
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    
    if (isNoIndex) {
      robotsMeta.setAttribute('content', 'noindex, nofollow');
    } else {
      robotsMeta.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // 4. Dynamic Open Graph & Twitter Card Tags
    const ogTags: Record<string, string> = {
      'og:title': title,
      'og:description': description,
      'og:type': normPath.startsWith('/guides/') ? 'article' : 'website',
      'og:site_name': 'Calcfino',
      'og:locale': 'en_US',
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
    };

    if (canonicalUrl) {
      ogTags['og:url'] = canonicalUrl;
    }

    // Dynamic Social Card Asset Matching
    const defaultOgImage = 'https://neelbyte.in/logo.png';
    ogTags['og:image'] = defaultOgImage;
    ogTags['twitter:image'] = defaultOgImage;

    Object.entries(ogTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(property.includes('og:') ? 'property' : 'name', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // 5. Multi-Object JSON-LD Schema Injection
    const existingSchemaScripts = document.querySelectorAll('.seo-structured-data');
    existingSchemaScripts.forEach(s => s.remove());

    if (schema) {
      const schemasArray = Array.isArray(schema) ? schema : [schema];
      schemasArray.forEach((schemaObj, index) => {
        const script = document.createElement('script');
        script.className = 'seo-structured-data';
        script.id = `seo-structured-data-${index}`;
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schemaObj);
        document.head.appendChild(script);
      });
    }

    // 6. Dynamic Canonical Link tag
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    if (canonicalUrl) {
      const link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', canonicalUrl);
      document.head.appendChild(link);
    }
  }, [title, description, schema, canonicalUrl]);

  return null;
}

// Keep helper exports for absolute backwards-compatibility (they map seamlessly to our centralized seo.ts system)
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'Calcfino',
  'url': 'https://neelbyte.in',
  'logo': 'https://neelbyte.in/logo.png',
  'sameAs': [
    'https://twitter.com/calcfino',
    'https://linkedin.com/company/calcfino',
  ],
});

export const getWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'name': 'Calcfino',
  'url': 'https://neelbyte.in',
  'potentialAction': {
    '@type': 'SearchAction',
    'target': 'https://neelbyte.in/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
});

export const getCalculatorSchema = (name: string, description: string, url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  'name': name,
  'description': description,
  'url': url,
  'applicationCategory': 'FinancialApplication',
  'operatingSystem': 'All',
  'browserRequirements': 'Requires HTML5, ES6, and client-side Javascript enablement',
});

export const getBreadcrumbsSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': items.map((item, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'name': item.name,
    'item': item.url.startsWith('http') ? item.url : `https://neelbyte.in${item.url}`,
  })),
});

export const getFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': faqs.map(faq => ({
    '@type': 'Question',
    'name': faq.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': faq.answer,
    },
  })),
});
