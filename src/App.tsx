import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CalculatorsAll from './pages/CalculatorsAll';
import CalculatorPage from './pages/CalculatorPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import Dashboard from './components/Dashboard';
import LegalPages from './pages/LegalPages';
import OnboardingTour from './components/OnboardingTour';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [viewParams, setViewParams] = useState<any>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Handle URL hash-based routing initially and on popstate
  useEffect(() => {
    const handleHashRouting = () => {
      const hash = window.location.hash;
      if (!hash) {
        setCurrentView('home');
        setViewParams(null);
        return;
      }

      // Check simple views
      if (hash === '#home') {
        setCurrentView('home');
      } else if (hash === '#calculators-all') {
        setCurrentView('calculators-all');
      } else if (hash === '#blog') {
        setCurrentView('blog');
      } else if (hash === '#dashboard') {
        setCurrentView('dashboard');
      } else if (hash === '#about-us') {
        setCurrentView('about-us');
      } else if (hash === '#contact-us') {
        setCurrentView('contact-us');
      } else if (hash === '#privacy-policy') {
        setCurrentView('privacy-policy');
      } else if (hash === '#terms-conditions') {
        setCurrentView('terms-conditions');
      } else if (hash === '#disclaimer') {
        setCurrentView('disclaimer');
      } else if (hash === '#cookie-policy') {
        setCurrentView('cookie-policy');
      } else if (hash === '#refund-policy') {
        setCurrentView('refund-policy');
      } else if (hash === '#editorial-policy') {
        setCurrentView('editorial-policy');
      } else if (hash.startsWith('#calculator-')) {
        const id = hash.replace('#calculator-', '');
        setCurrentView(`calculator-${id}`);
        setViewParams({ id });
      } else if (hash.startsWith('#blog-')) {
        const slug = hash.replace('#blog-', '');
        setCurrentView(`blog-${slug}`);
        setViewParams({ slug });
      }
    };

    handleHashRouting();
    window.addEventListener('hashchange', handleHashRouting);
    return () => window.removeEventListener('hashchange', handleHashRouting);
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
      // Default to light
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('fh_theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Central routing navigator
  const handleNavigate = (view: string, params?: any) => {
    // Set view
    setCurrentView(view);
    setViewParams(params);

    // Update window hash for bookmarkable routing support
    if (view === 'home') {
      window.location.hash = 'home';
    } else if (view === 'calculators-all') {
      window.location.hash = 'calculators-all';
    } else if (view === 'blog') {
      window.location.hash = 'blog';
    } else if (view === 'dashboard') {
      window.location.hash = 'dashboard';
    } else if (view === 'about-us') {
      window.location.hash = 'about-us';
    } else if (view === 'contact-us') {
      window.location.hash = 'contact-us';
    } else if (view === 'privacy-policy') {
      window.location.hash = 'privacy-policy';
    } else if (view === 'terms-conditions') {
      window.location.hash = 'terms-conditions';
    } else if (view === 'disclaimer') {
      window.location.hash = 'disclaimer';
    } else if (view === 'cookie-policy') {
      window.location.hash = 'cookie-policy';
    } else if (view === 'refund-policy') {
      window.location.hash = 'refund-policy';
    } else if (view === 'editorial-policy') {
      window.location.hash = 'editorial-policy';
    } else if (view.startsWith('calculator-')) {
      const id = params?.id || view.replace('calculator-', '');
      window.location.hash = `calculator-${id}`;
    } else if (view.startsWith('blog-')) {
      const slug = params?.slug || view.replace('blog-', '');
      window.location.hash = `blog-${slug}`;
    }

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
      return <BlogPage onNavigate={handleNavigate} />;
    }
    if (currentView === 'dashboard') {
      return <Dashboard onNavigate={handleNavigate} />;
    }
    if (currentView === 'about-us') {
      return <LegalPages type="about" />;
    }
    if (currentView === 'contact-us') {
      return <LegalPages type="contact" />;
    }
    if (currentView === 'privacy-policy') {
      return <LegalPages type="privacy" />;
    }
    if (currentView === 'terms-conditions') {
      return <LegalPages type="terms" />;
    }
    if (currentView === 'disclaimer') {
      return <LegalPages type="disclaimer" />;
    }
    if (currentView === 'cookie-policy') {
      return <LegalPages type="cookie" />;
    }
    if (currentView === 'refund-policy') {
      return <LegalPages type="refund" />;
    }
    if (currentView === 'editorial-policy') {
      return <LegalPages type="editorial" />;
    }
    if (currentView.startsWith('calculator-')) {
      const id = viewParams?.id || currentView.replace('calculator-', '');
      return <CalculatorPage id={id} initialInputs={viewParams?.inputs} onNavigate={handleNavigate} />;
    }
    if (currentView.startsWith('blog-')) {
      const slug = viewParams?.slug || currentView.replace('blog-', '');
      return <BlogPostPage slug={slug} onNavigate={handleNavigate} />;
    }

    // Default Fallback
    return <Home onNavigate={handleNavigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#090D16] text-slate-800 dark:text-slate-100 transition-colors duration-200">
      
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
  );
}
