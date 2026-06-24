import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  schema?: any;
  canonicalUrl?: string;
  breadcrumbs?: { name: string; url: string }[];
}

export default function SEO({ title, description, schema, canonicalUrl, breadcrumbs }: SEOProps) {
  useEffect(() => {
    // Dynamic Window title
    document.title = `${title} | Calcfino.com`;

    // Dynamic Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Dynamic Open Graph Tags
    const ogTags = {
      'og:title': title,
      'og:description': description,
      'og:type': 'website',
      'og:site_name': 'Calcfino.com',
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(property.includes('og:') ? 'property' : 'name', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // Dynamic Schema script tags
    const existingSchemaScript = document.getElementById('seo-structured-data');
    if (existingSchemaScript) {
      existingSchemaScript.remove();
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = 'seo-structured-data';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    // Dynamic Canonical Link tag
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

// Generate high-fidelity schemas for different pages
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'Calcfino.com',
  'url': window.location.origin,
  'logo': `${window.location.origin}/logo.png`,
  'sameAs': [
    'https://twitter.com/calcfino',
    'https://linkedin.com/company/calcfino',
  ],
});

export const getWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'name': 'Calcfino.com',
  'url': window.location.origin,
  'potentialAction': {
    '@type': 'SearchAction',
    'target': `${window.location.origin}/?search={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
});

export const getCalculatorSchema = (name: string, description: string, url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  'name': name,
  'description': description,
  'url': url,
  'applicationCategory': 'BusinessApplication',
  'operatingSystem': 'All',
  'browserRequirements': 'Requires HTML5 and JavaScript Support',
});

export const getBreadcrumbsSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': items.map((item, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'name': item.name,
    'item': item.url,
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
