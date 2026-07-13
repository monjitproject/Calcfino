import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CalculatorsAll from './pages/CalculatorsAll';
import CalculatorPage from './pages/CalculatorPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import CategoryPage from './pages/CategoryPage';
import Dashboard from './components/Dashboard';
import LegalPages from './pages/LegalPages';
import OnboardingTour from './components/OnboardingTour';
import SEO from './components/SEO';
import { calculators } from './data/calculators';
import { 
  getSeoMetadata, 
  normalizeUrl
} from './utils/seo';

// CMS Imports
import { CmsProvider } from './context/CmsContext';
import AdminPanelShell from './components/cms/AdminPanelShell';

/**
 * Parses pathname and search parameters into a clean state-based route object
 */
function parseLocation(pathname: string, search: string) {
  const normPath = pathname.toLowerCase().replace(/\/+/g, '/').replace(/\/$/, '');
  const params = new URLSearchParams(search);
  
  if (normPath === '/admin') {
    return { view: 'admin', params: null };
  }
  
  if (normPath === '' || normPath === '/') {
    return { view: 'home', params: null };
  }
  
  const segments = normPath.split('/').filter(Boolean);
  
  // Blog/Guides paths: /blog, /guides, /blog/page/2, /guides/page/2, /blog/post-slug, /guides/post-slug
  if (segments[0] === 'blog' || segments[0] === 'guides') {
    if (!segments[1]) {
      return { view: 'blog', params: { page: 1 } };
    }
    if (segments[1] === 'page' && segments[2]) {
      const pageNum = parseInt(segments[2], 10) || 1;
      return { view: 'blog', params: { page: pageNum } };
    }
    return { view: `blog-${segments[1]}`, params: { slug: segments[1] } };
  }
  
  // Tools paths: /tools/sip-calculator
  if (segments[0] === 'tools' && segments[1]) {
    return { view: `calculator-${segments[1]}`, params: { id: segments[1] } };
  }
  
  // Category paths: /category/investment, /category/loan/page/3
  if (segments[0] === 'category' && segments[1]) {
    const cat = segments[1].toLowerCase();
    const registryKeys = ['investment', 'loans', 'emi', 'mutual-funds', 'retirement', 'savings', 'budgeting', 'taxes', 'insurance', 'banking', 'credit-cards', 'guides'];
    if (registryKeys.includes(cat)) {
      return { view: `category-${cat}`, params: { category: cat } };
    }
    let pageNum = 1;
    if (segments[2] === 'page' && segments[3]) {
      pageNum = parseInt(segments[3], 10) || 1;
    }
    return { view: 'blog', params: { category: segments[1], page: pageNum } };
  }

  // Direct category friendly paths
  const directCategories: Record<string, string> = {
    '/investment': 'investment',
    '/loans': 'loans',
    '/emi': 'emi',
    '/mutual-funds': 'mutual-funds',
    '/retirement': 'retirement',
    '/savings': 'savings',
    '/budgeting': 'budgeting',
    '/taxes': 'taxes',
    '/insurance': 'insurance',
    '/banking': 'banking',
    '/credit-cards': 'credit-cards',
    '/guides': 'guides',
    '/categories': 'categories'
  };

  if (directCategories[normPath]) {
    const cat = directCategories[normPath];
    if (cat === 'categories') {
      return { view: 'sitemap', params: null };
    }
    return { view: `category-${cat}`, params: { category: cat } };
  }
  
  // Tag paths: /tag/sip
  if (segments[0] === 'tag' && segments[1]) {
    return { view: 'blog', params: { tag: segments[1] } };
  }
  
  // Author paths: /author/sarah-jenkins
  if (segments[0] === 'author' && segments[1]) {
    return { view: 'blog', params: { author: segments[1] } };
  }
  
  // Static Pages
  if (normPath === '/about') {
    return { view: 'about-us', params: null };
  }
  if (normPath === '/contact') {
    return { view: 'contact-us', params: null };
  }
  if (normPath === '/privacy-policy') {
    return { view: 'privacy-policy', params: null };
  }
  if (normPath === '/terms-and-conditions' || normPath === '/terms-conditions') {
    return { view: 'terms-conditions', params: null };
  }
  if (normPath === '/disclaimer') {
    return { view: 'disclaimer', params: null };
  }
  if (normPath === '/cookie-policy') {
    return { view: 'cookie-policy', params: null };
  }
  if (normPath === '/editorial-policy') {
    return { view: 'editorial-policy', params: null };
  }
  if (normPath === '/refund-policy') {
    return { view: 'refund-policy', params: null };
  }
  if (normPath === '/dmca') {
    return { view: 'dmca', params: null };
  }
  if (normPath === '/accessibility') {
    return { view: 'accessibility', params: null };
  }
  if (normPath === '/corrections') {
    return { view: 'corrections', params: null };
  }
  if (normPath === '/sitemap') {
    return { view: 'sitemap', params: null };
  }
  if (normPath === '/dashboard') {
    return { view: 'dashboard', params: null };
  }
  if (normPath === '/search') {
    return { view: 'search', params: { query: params.get('q') || '' } };
  }
  if (normPath === '/calculators-all' || normPath === '/all-calculators') {
    return { view: 'calculators-all', params: null };
  }
  
  // Virtual SEO file paths (bypass router)
  if (['/robots.txt', '/sitemap.xml', '/sitemap_index.xml', '/page-sitemap.xml', '/post-sitemap.xml', '/category-sitemap.xml', '/tool-sitemap.xml', '/image-sitemap.xml'].includes(normPath)) {
    return { view: 'home', params: null }; // let the CDN physical file override
  }

  // Calculator custom pages: /emi-calculator, /sip-calculator, etc.
  const calcId = segments[0];
  const isCalc = calculators.some(c => c.id === calcId);
  if (isCalc) {
    return { view: `calculator-${calcId}`, params: { id: calcId } };
  }
  
  // Default fallback
  return { view: 'home', params: null };
}

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [viewParams, setViewParams] = useState<any>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Handle URL pathname routing initially, including redirection of legacy hash links
  useEffect(() => {
    // 1. Process 301 client-side redirects for old hash-based links to keep link-equity (SEO value)
    const hash = window.location.hash;
    let redirectPath: string | null = null;

    if (hash) {
      if (hash === '#home') {
        redirectPath = '/';
      } else if (hash === '#calculators-all') {
        redirectPath = '/calculators-all';
      } else if (hash === '#blog') {
        redirectPath = '/blog';
      } else if (hash === '#dashboard') {
        redirectPath = '/dashboard';
      } else if (hash === '#about-us') {
        redirectPath = '/about';
      } else if (hash === '#contact-us') {
        redirectPath = '/contact';
      } else if (hash === '#privacy-policy') {
        redirectPath = '/privacy-policy';
      } else if (hash === '#terms-conditions') {
        redirectPath = '/terms-and-conditions';
      } else if (hash === '#disclaimer') {
        redirectPath = '/disclaimer';
      } else if (hash === '#cookie-policy') {
        redirectPath = '/cookie-policy';
      } else if (hash === '#refund-policy') {
        redirectPath = '/refund-policy';
      } else if (hash === '#editorial-policy') {
        redirectPath = '/editorial-policy';
      } else if (hash.startsWith('#calculator-')) {
        const id = hash.replace('#calculator-', '');
        redirectPath = `/${id}`;
      } else if (hash.startsWith('#blog-')) {
        const slug = hash.replace('#blog-', '');
        redirectPath = `/blog/${slug}`;
      }
    }

    // 2. Process normalize canonical paths (e.g. uppercase /SIP-Calculator -> /sip-calculator, duplicate slashes)
    const currentPath = window.location.pathname;
    const normalized = normalizeUrl(currentPath);
    
    if (redirectPath) {
      // Clear hash and execute modern push replacement (301 redirect parity)
      window.history.replaceState(null, '', redirectPath);
    } else if (currentPath !== normalized && !['/sitemap.xml', '/robots.txt', '/sitemap_index.xml', '/page-sitemap.xml', '/post-sitemap.xml', '/category-sitemap.xml', '/tool-sitemap.xml', '/image-sitemap.xml'].includes(currentPath)) {
      window.history.replaceState(null, '', normalized);
    }

    // Parse final correct pathname
    const finalRoute = parseLocation(window.location.pathname, window.location.search);
    setCurrentView(finalRoute.view);
    setViewParams(finalRoute.params);

    // Sync with state history pops
    const handlePopState = () => {
      const popped = parseLocation(window.location.pathname, window.location.search);
      setCurrentView(popped.view);
      setViewParams(popped.params);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync dark mode class on HTML document tag
  useEffect(() => {
    const savedTheme = localStorage.getItem('fh_theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Central routing navigator (updating browser pathname dynamically)
  const handleNavigate = (view: string, params?: any) => {
    setCurrentView(view);
    setViewParams(params);

    let newPath = '/';
    let searchString = '';

    if (view === 'home') {
      newPath = '/';
    } else if (view === 'admin') {
      newPath = '/admin';
    } else if (view === 'calculators-all') {
      newPath = '/calculators-all';
    } else if (view === 'blog') {
      if (params?.category) {
        newPath = `/category/${params.category}`;
        if (params?.page > 1) newPath += `/page/${params.page}`;
      } else if (params?.tag) {
        newPath = `/tag/${params.tag}`;
      } else if (params?.author) {
        newPath = `/author/${params.author}`;
      } else if (params?.page > 1) {
        newPath = `/guides/page/${params.page}`;
      } else {
        newPath = '/guides';
      }
    } else if (view === 'dashboard') {
      newPath = '/dashboard';
    } else if (view === 'about-us') {
      newPath = '/about';
    } else if (view === 'contact-us') {
      newPath = '/contact';
    } else if (view === 'privacy-policy') {
      newPath = '/privacy-policy';
    } else if (view === 'terms-conditions') {
      newPath = '/terms-and-conditions';
    } else if (view === 'disclaimer') {
      newPath = '/disclaimer';
    } else if (view === 'cookie-policy') {
      newPath = '/cookie-policy';
    } else if (view === 'refund-policy') {
      newPath = '/refund-policy';
    } else if (view === 'editorial-policy') {
      newPath = '/editorial-policy';
    } else if (view === 'dmca') {
      newPath = '/dmca';
    } else if (view === 'accessibility') {
      newPath = '/accessibility';
    } else if (view === 'corrections') {
      newPath = '/corrections';
    } else if (view === 'sitemap') {
      newPath = '/sitemap';
    } else if (view === 'search') {
      newPath = '/search';
      if (params?.query) searchString = `?q=${encodeURIComponent(params.query)}`;
    } else if (view.startsWith('category-')) {
      const cat = params?.category || view.replace('category-', '');
      newPath = `/category/${cat}`;
    } else if (view.startsWith('calculator-')) {
      const id = params?.id || view.replace('calculator-', '');
      newPath = `/tools/${id}`;
    } else if (view.startsWith('blog-')) {
      const slug = params?.slug || view.replace('blog-', '');
      newPath = `/guides/${slug}`;
    }

    // Push new state to HTML5 History API
    window.history.pushState(null, '', `${newPath}${searchString}`);

    // Scroll back to top smoothly on route change to make navigation premium
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render proper page layout
  const renderView = () => {
    if (currentView === 'home') {
      return <Home onNavigate={handleNavigate} />;
    }
    if (currentView === 'calculators-all') {
      return <CalculatorsAll onNavigate={handleNavigate} />;
    }
    if (currentView === 'blog') {
      return <BlogPage onNavigate={handleNavigate} viewParams={viewParams} />;
    }
    if (currentView === 'dashboard') {
      return <Dashboard onNavigate={handleNavigate} />;
    }
    if (currentView === 'about-us') {
      return <LegalPages type="about" onNavigate={handleNavigate} />;
    }
    if (currentView === 'contact-us') {
      return <LegalPages type="contact" onNavigate={handleNavigate} />;
    }
    if (currentView === 'privacy-policy') {
      return <LegalPages type="privacy" onNavigate={handleNavigate} />;
    }
    if (currentView === 'terms-conditions') {
      return <LegalPages type="terms" onNavigate={handleNavigate} />;
    }
    if (currentView === 'disclaimer') {
      return <LegalPages type="disclaimer" onNavigate={handleNavigate} />;
    }
    if (currentView === 'cookie-policy') {
      return <LegalPages type="cookie" onNavigate={handleNavigate} />;
    }
    if (currentView === 'refund-policy') {
      return <LegalPages type="refund" onNavigate={handleNavigate} />;
    }
    if (currentView === 'editorial-policy') {
      return <LegalPages type="editorial" onNavigate={handleNavigate} />;
    }
    if (currentView === 'dmca') {
      return <LegalPages type="dmca" onNavigate={handleNavigate} />;
    }
    if (currentView === 'accessibility') {
      return <LegalPages type="accessibility" onNavigate={handleNavigate} />;
    }
    if (currentView === 'corrections') {
      return <LegalPages type="corrections" onNavigate={handleNavigate} />;
    }
    if (currentView === 'sitemap') {
      return <LegalPages type="sitemap" onNavigate={handleNavigate} />;
    }
    if (currentView === 'search') {
      return <CalculatorsAll onNavigate={handleNavigate} initialSearch={viewParams?.query} />;
    }
    if (currentView.startsWith('category-')) {
      const cat = viewParams?.category || currentView.replace('category-', '');
      return <CategoryPage categoryKey={cat} onNavigate={handleNavigate} />;
    }
    if (currentView.startsWith('calculator-')) {
      const id = viewParams?.id || currentView.replace('calculator-', '');
      return <CalculatorPage id={id} initialInputs={viewParams?.inputs} onNavigate={handleNavigate} />;
    }
    if (currentView.startsWith('blog-')) {
      const slug = viewParams?.slug || currentView.replace('blog-', '');
      return <BlogPostPage slug={slug} onNavigate={handleNavigate} />;
    }

    return <Home onNavigate={handleNavigate} />;
  };

  // Calculate dynamic SEO properties based on current path
  const seoData = getSeoMetadata(window.location.pathname, new URLSearchParams(window.location.search));

  if (currentView === 'admin') {
    return (
      <CmsProvider>
        <AdminPanelShell />
      </CmsProvider>
    );
  }

  return (
    <CmsProvider>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#090D16] text-slate-800 dark:text-slate-100 transition-colors duration-200">
        
        {/* Centralized dynamic high-authority SEO configuration */}
        <SEO
          title={seoData.title}
          description={seoData.description}
          canonicalUrl={seoData.canonicalUrl}
          breadcrumbs={seoData.breadcrumbs}
          schema={seoData.schema}
        />

        {/* Sticky navigation and search panel header */}
        <Header
          currentView={currentView}
          onNavigate={handleNavigate}
          darkMode={theme === 'dark'}
          setDarkMode={(val) => {
            const nextTheme = val ? 'dark' : 'light';
            setTheme(nextTheme);
            localStorage.setItem('fh_theme', nextTheme);
            if (nextTheme === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }}
        />

        {/* Main app viewport container stage */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {renderView()}
        </main>

        {/* Comprehensive footer with compliance rules, links and newsletters */}
        <Footer onNavigate={handleNavigate} />

        {/* Interactive Onboarding Tour */}
        <OnboardingTour currentView={currentView} onNavigate={handleNavigate} />

      </div>
    </CmsProvider>
  );
}
