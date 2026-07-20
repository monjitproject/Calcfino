import React from 'react';
import { Compass, ShieldCheck, Mail, HelpCircle, FileText, Settings, Info } from 'lucide-react';
import SEO, { getBreadcrumbsSchema, getFAQSchema } from '../../components/SEO';

interface CookiePageProps {
  onNavigate?: (view: string, params?: any) => void;
}

export default function CookiePage({ onNavigate }: CookiePageProps) {
  const lastUpdated = "July 12, 2026";
  const readingTime = "10 min read";
  const pageUrl = window.location.href;

  const faqs = [
    {
      q: "Does NeelByte use cookies to track my calculations or personal wealth?",
      a: "No. NeelByte operates purely client-side. We use browser LocalStorage to store your saved calculations and preferences locally on your device. We do not use tracking cookies to send your calculations or financial inputs to external servers."
    },
    {
      q: "How can I block or delete cookies on NeelByte?",
      a: "You can easily block or delete cookies through your browser settings. To learn how to configure your browser's cookie settings, visit your browser's official support page."
    },
    {
      q: "Why does NeelByte use advertising and tracking cookies?",
      a: "As a free service, we use programmatic display ads powered by Google AdSense to fund our hosting, domain, and development costs. AdSense uses cookies to serve relevant ads based on your general interests and browser traffic."
    },
    {
      q: "Does NeelByte require my consent before serving tracking cookies?",
      a: "Yes. When you first visit NeelByte, we display a cookie consent banner that allows you to accept or manage non-essential analytics and advertising cookies. You can update your consent settings at any time."
    },
    {
      q: "Do third-party services like Cloudflare use cookies on this site?",
      a: "Yes. Cloudflare uses essential, non-personally identifiable cookies (such as '__cf_bm') to prevent malicious bots, optimize server routing, and ensure secure TLS connections."
    }
  ];

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Cookie Policy', url: '/cookies' }
  ];

  const breadcrumbSchema = getBreadcrumbsSchema(breadcrumbs);
  const faqSchema = getFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })));

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans py-8 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" id="neelbyte-cookie-policy">
      <SEO
        title="Cookie Policy | NeelByte Tracking and Cookie Management"
        description="Review NeelByte's official Cookie Policy. Learn about what cookies are, the cookies we use for security, preferences, and advertising, and how to manage your cookie settings."
        canonicalUrl={pageUrl}
        schema={[breadcrumbSchema, faqSchema]}
      />

      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Settings className="w-3.5 h-3.5" /> Cookie Optimization Standards
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Cookie Policy & Configuration
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed max-w-4xl">
          At NeelByte, we believe in absolute transparency. This document details what cookies are, how we use them, and how you can manage your cookie preferences.
        </p>
        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium mt-4">
          <span>Last Updated: <strong className="text-slate-600 dark:text-slate-300">{lastUpdated}</strong></span>
          <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <span>Reading Time: <strong className="text-slate-600 dark:text-slate-300">{readingTime}</strong></span>
          <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <span>Compliance Framework: <strong className="text-slate-600 dark:text-slate-300">ePrivacy Directive, GDPR, CCPA</strong></span>
        </div>
      </div>

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* TOC Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-blue-500" /> Policy Navigation
            </h3>
            <nav className="flex flex-col gap-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
              {[
                { label: '1. What Are Cookies?', id: 'what-are-cookies' },
                { label: '2. Session Cookies', id: 'session-cookies' },
                { label: '3. Analytics Cookies', id: 'analytics-cookies' },
                { label: '4. Advertising Cookies', id: 'advertising-cookies' },
                { label: '5. Preference Storage', id: 'preference-cookies' },
                { label: '6. Browser Cookie Controls', id: 'browser-settings' },
                { label: '7. Third Party Cookies', id: 'third-party-cookies' },
                { label: '8. Cookie Consent Banner', id: 'cookie-consent' },
                { label: '9. Updates to Policy', id: 'policy-updates' },
                { label: '10. Cookie FAQs', id: 'cookie-faqs' }
              ].map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleScrollToSection(link.id)}
                  className="text-left hover:text-blue-600 dark:hover:text-cyan-400 transition-all border-l-2 border-transparent hover:border-blue-500 pl-2.5 py-0.5 truncate"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Body */}
        <div className="lg:col-span-3 space-y-12 text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
          
          <section id="what-are-cookies" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">01.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">What Are Cookies?</h2>
            </div>
            <p>
              Cookies are small text files stored on your device when you visit websites. They are widely used to make websites work or run more efficiently, as well as to provide analytics and reporting to website owners.
            </p>
          </section>

          <section id="session-cookies" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">02.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Session Cookies</h2>
            </div>
            <p>
              Session cookies are temporary files that expire and are deleted as soon as you close your web browser. We use session cookies solely to maintain secure, authenticated connections and ensure smooth browser navigation.
            </p>
          </section>

          <section id="analytics-cookies" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">03.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Analytics Cookies</h2>
            </div>
            <p>
              We use analytics cookies to collect anonymous, aggregated traffic statistics. These cookies help us understand which calculators and guides are most popular, how users navigate our site, and where we can improve performance.
            </p>
          </section>

          <section id="advertising-cookies" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">04.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Advertising Cookies</h2>
            </div>
            <p>
              Our advertising partners, such as Google AdSense, use cookies to serve ads based on your visits to NeelByte and other websites. These cookies allow our partners to show ads that are relevant and interesting to you.
            </p>
          </section>

          <section id="preference-cookies" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">05.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Preference Storage (LocalStorage)</h2>
            </div>
            <p>
              Unlike traditional tracking cookies, NeelByte uses your browser's LocalStorage to save your calculator preferences, regional settings, and saved amortization schedules locally. This data never leaves your device and is never shared.
            </p>
          </section>

          <section id="browser-settings" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">06.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Browser Cookie Controls</h2>
            </div>
            <p>
              You can block or delete cookies through your browser's settings panel. Please note that blocking essential cookies may impact your user experience and prevent certain tools from rendering correctly.
            </p>
          </section>

          <section id="third-party-cookies" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">07.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Third Party Cookies</h2>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-150 dark:border-slate-800 my-4">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950 text-slate-400 font-bold border-b border-slate-100 dark:border-slate-800">
                    <th className="px-4 py-3">Provider</th>
                    <th className="px-4 py-3">Cookie Domain</th>
                    <th className="px-4 py-3">Purpose & Lifespan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-500 dark:text-slate-400">
                  <tr>
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">Cloudflare</td>
                    <td className="px-4 py-3">.neelbyte.in</td>
                    <td className="px-4 py-3">Essential security, bot protection, and load balancing (lasts 30 days).</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">Google AdSense</td>
                    <td className="px-4 py-3">.doubleclick.net</td>
                    <td className="px-4 py-3">Serving relevant ads and measuring advertising performance (lasts up to 1 year).</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">Google Analytics</td>
                    <td className="px-4 py-3">.google.com</td>
                    <td className="px-4 py-3">Aggregating anonymous web traffic metrics and performance data (lasts 2 years).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="cookie-consent" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">08.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Cookie Consent Banner</h2>
            </div>
            <p>
              When you first visit NeelByte, we display a cookie consent banner that allows you to accept or manage non-essential cookies. You can modify your choices at any time by configuring your browser's cookie settings.
            </p>
          </section>

          <section id="policy-updates" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">09.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Updates to Policy</h2>
            </div>
            <p>
              We may update this Cookie Policy from time to time. When we make changes, we will update the "Last Updated" date at the top of this page. We encourage you to review this policy periodically to stay informed about our cookie standards.
            </p>
          </section>

          <section id="cookie-faqs" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">10.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Cookie Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                  <h4 className="text-xs font-bold text-slate-950 dark:text-white mb-2 flex items-start gap-1.5">
                    <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    {faq.q}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
