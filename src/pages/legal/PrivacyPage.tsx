import React from 'react';
import { Compass, ShieldCheck, Mail, AlertTriangle, FileText, Lock, Globe, UserCheck, HelpCircle } from 'lucide-react';
import SEO, { getBreadcrumbsSchema, getFAQSchema } from '../../components/SEO';

interface PrivacyPageProps {
  onNavigate?: (view: string, params?: any) => void;
}

export default function PrivacyPage({ onNavigate }: PrivacyPageProps) {
  const lastUpdated = "July 20, 2026";
  const effectiveDate = "July 20, 2026";
  const readingTime = "20 min read";
  const pageUrl = window.location.href;

  const faqs = [
    {
      q: "Does Calcfino transfer my calculator inputs or values to its servers?",
      a: "Absolutely not. One of Calcfino's core design principles is client-side computing. When you enter numbers into our mortgage calculators, savings planners, or income tax grids, the algebra is processed entirely inside your own browser window. We do not use server-side computation scripts, database logs, or diagnostic tools that upload your calculations to our servers."
    },
    {
      q: "How can I delete all of my saved calculation templates from Calcfino?",
      a: "Because your scenarios are stored strictly inside your browser's local memory (LocalStorage), you can delete them instantly by clearing your browser cache for neelbyte.in or clicking the 'Reset Saved Data' buttons in our tools panel."
    },
    {
      q: "Does Calcfino use third-party tracking or advertising cookies?",
      a: "Yes. We work with trusted third-party providers such as Google AdSense and Google Analytics. These partners use non-personally identifiable identifiers (cookies) to show personalized advertisements, check performance metrics, and guard against automated traffic."
    },
    {
      q: "Is Calcfino fully compliant with international privacy standards like GDPR and CCPA?",
      a: "Yes. We fully support international data protection standards. Since our core system is engineered to run client-side without collecting personal financial data, our compliance is built directly into our layout, ensuring you always maintain complete control over your information."
    },
    {
      q: "How are privacy revisions or policy updates shared with users?",
      a: "All updates to our Privacy Policy are published on this page, and we revise the 'Last Updated' date at the top. We recommend checking this page periodically to stay informed about how we safeguard your digital privacy."
    }
  ];

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/privacy' }
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
    <div className="font-sans py-8 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" id="calcfino-privacy-policy">
      <SEO
        title="Privacy Policy | Calcfino Secure Client-Side Privacy Standards"
        description="Read Calcfino's comprehensive Privacy Policy. Learn about our client-side data architecture, cookie configurations, GDPR/CCPA compliance, and how we protect your personal financial details."
        canonicalUrl={pageUrl}
        schema={[breadcrumbSchema, faqSchema]}
      />

      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5" /> Privacy-First Architecture
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Privacy Policy & Data Protection Standards
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed max-w-4xl">
          At Calcfino, we believe personal financial planning should be private. This document details how we process, store, and protect your information under global compliance guidelines.
        </p>
        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium mt-4">
          <span>Effective Date: <strong className="text-slate-600 dark:text-slate-300">{effectiveDate}</strong></span>
          <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <span>Last Updated: <strong className="text-slate-600 dark:text-slate-300">{lastUpdated}</strong></span>
          <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <span>Reading Time: <strong className="text-slate-600 dark:text-slate-300">{readingTime}</strong></span>
          <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <span>Compliance Framework: <strong className="text-slate-600 dark:text-slate-300">GDPR, CCPA, CPRA, COPPA</strong></span>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Table of Contents */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-blue-500" /> Policy Navigation
            </h3>
            <nav className="flex flex-col gap-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
              {[
                { label: '1. Introduction', id: 'introduction' },
                { label: '2. Information We Collect', id: 'info-collection' },
                { label: '3. Financial Calculations', id: 'financial-calculations' },
                { label: '4. How Data Is Used', id: 'data-usage' },
                { label: '5. Cookies & Tracking', id: 'cookies' },
                { label: '6. Google Analytics', id: 'google-analytics' },
                { label: '7. Google AdSense & Ads', id: 'google-adsense' },
                { label: '8. Third-Party Services', id: 'third-parties' },
                { label: '9. Local Storage API', id: 'local-storage' },
                { label: '10. Data Retention Policy', id: 'data-retention' },
                { label: '11. Children\'s Privacy', id: 'children-privacy' },
                { label: '12. GDPR Compliance', id: 'gdpr-compliance' },
                { label: '13. CCPA Compliance', id: 'ccpa-compliance' },
                { label: '14. Your Rights & Choices', id: 'your-rights' },
                { label: '15. Cookies Management', id: 'cookies-management' },
                { label: '16. Data Security Measures', id: 'data-security' },
                { label: '17. Affiliate Disclosure', id: 'affiliate-disclosure' },
                { label: '18. Policy Revisions', id: 'policy-revisions' },
                { label: '19. Frequently Asked Questions', id: 'privacy-faqs' }
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
          
          {/* Section 1: Introduction */}
          <section id="introduction" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">01.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Introduction</h2>
            </div>
            <p>
              Welcome to <strong>Calcfino</strong> (<a href="https://neelbyte.in" className="text-blue-600 dark:text-cyan-400 font-semibold underline">https://neelbyte.in</a>). We understand that financial planning involves highly personal data, and we are fully committed to protecting your privacy and security. Our platform is built on a unique client-side calculation model: when you input your monthly income, debts, or mortgage rates, that data is processed entirely inside your browser. No financial calculations are sent to our servers.
            </p>
            <p className="mt-2">
              This Privacy Policy explains the types of information we collect, how we use it, and your choices regarding our data practices. By accessing or using our website, you agree to the collection and use of information in accordance with this policy.
            </p>
            <div className="my-4 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border-l-4 border-blue-500 text-xs">
              <span className="font-extrabold uppercase tracking-wide text-blue-600 dark:text-cyan-400 block mb-1">Our Core Commitment</span>
              Calcfino never collects, saves, or sells your personal financial inputs. All parameters are processed entirely on your device.
            </div>
          </section>

          {/* Section 2: Information We Collect */}
          <section id="info-collection" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">02.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Information We Collect</h2>
            </div>
            <p>
              We collect different types of information depending on how you use our platform. This includes information you provide directly and diagnostic information collected automatically:
            </p>
            
            <h3 className="text-sm font-bold text-slate-950 dark:text-white mt-4 mb-1">A. Information You Provide Directly</h3>
            <p>
              You do not need to register, verify your email, or create an account to use Calcfino. However, you may choose to provide personal details under certain circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
              <li><strong>Contact Information:</strong> When you submit inquiries through our contact form, we collect your name, email address, message topic, and text content. We use this information solely to respond to your request.</li>
              <li><strong>Email Communications:</strong> If you send emails to our support or compliance desks, we keep a record of that correspondence to help us resolve your technical or formula queries.</li>
            </ul>

            <h3 className="text-sm font-bold text-slate-950 dark:text-white mt-6 mb-1">B. Automatically Collected Information</h3>
            <p>
              When you visit Calcfino, our servers and third-party partners automatically collect standard diagnostic data:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
              <li><strong>Device & Browser Information:</strong> We collect details such as your device type, operating system, browser model, screen dimensions, and language settings to optimize our layout.</li>
              <li><strong>Log Files & Network Data:</strong> Like most websites, we collect server logs that record your IP address, internet service provider (ISP), referring and exit pages, clickstream data, and date/time stamps. This helps us monitor performance and maintain security.</li>
            </ul>

            {/* Collection Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800 my-4">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950 text-slate-400 font-bold border-b border-slate-100 dark:border-slate-800">
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">What We Collect</th>
                    <th className="px-4 py-3">How We Use It</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-500 dark:text-slate-400">
                  <tr>
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">Form Details</td>
                    <td className="px-4 py-3">Name, email, and messages submitted through our contact form.</td>
                    <td className="px-4 py-3">To respond to your support queries and improve our technical tools.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">Diagnostic Data</td>
                    <td className="px-4 py-3">IP address, browser type, referral pages, and device settings.</td>
                    <td className="px-4 py-3">To track site performance, secure our pages, and resolve layout issues.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">Calculator Inputs</td>
                    <td className="px-4 py-3">Salaries, mortgage values, loan schedules, and tax parameters.</td>
                    <td className="px-4 py-3">Processed entirely inside your browser. No data is sent to our servers.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Financial Calculations */}
          <section id="financial-calculations" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">03.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Financial Calculations</h2>
            </div>
            <p>
              Our calculators are designed to prioritize your privacy. All calculation scripts, progressive tax slab matches, and amortization tables are processed on the client side.
            </p>
            <p className="mt-2">
              When you enter parameters to plan a mortgage or calculate compound interest, those numbers are analyzed directly inside your browser window. No calculation variables are sent to our servers, and no user profiles are stored in external databases. This ensures you can plan your finances with complete privacy.
            </p>
          </section>

          {/* Section 4: How Data Is Used */}
          <section id="data-usage" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">04.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">How Data Is Used</h2>
            </div>
            <p>
              We only use the data we collect for specific, transparent purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
              <li>To provide and maintain our platform, ensuring our pages load quickly and correctly on all devices.</li>
              <li>To respond to your messages, support requests, bug reports, and partnership inquiries.</li>
              <li>To monitor traffic patterns, analyze page views, and optimize our tools and layout.</li>
              <li>To serve non-intrusive advertisements that fund our platform and keep our calculators free.</li>
              <li>To protect against malicious activities, security threats, spam, and bot traffic.</li>
            </ul>
          </section>

          {/* Section 5: Cookies & Tracking */}
          <section id="cookies" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">05.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Cookies & Tracking</h2>
            </div>
            <p>
              Calcfino uses cookies and similar tracking systems to improve your browsing experience. Cookies are small text files saved on your device that help us analyze traffic patterns and customize your settings.
            </p>
            <p className="mt-2">
              We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device until deleted). These cookies serve different functions:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
              <li><strong>Essential Cookies:</strong> Required to establish secure connections, handle basic navigation, and protect against automated bot traffic via Cloudflare.</li>
              <li><strong>Performance & Analytics Cookies:</strong> Help us track page views, bounce rates, and engagement times to identify which calculators and tools are most useful to our readers.</li>
              <li><strong>Targeted Advertising Cookies:</strong> Used by our advertising partners, including Google AdSense, to show relevant ads based on your general interests.</li>
            </ul>
          </section>

          {/* Section 6: Google Analytics */}
          <section id="google-analytics" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">06.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Google Analytics</h2>
            </div>
            <p>
              We use Google Analytics, a web analysis service provided by Google LLC, to track and report traffic on our website. Google Analytics uses cookies to collect anonymous usage details, such as page views and time spent on our site.
            </p>
            <p className="mt-2">
              This information is aggregated and anonymized, and it does not contain any personal financial parameters. Google may use this data to evaluate your use of our site, compile activity reports for website operators, and provide other related services. You can prevent Google Analytics from tracking your activity by installing the official Google Analytics Opt-out Browser Add-on.
            </p>
          </section>

          {/* Section 7: Google AdSense & Ads */}
          <section id="google-adsense" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">07.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Google AdSense & Advertising Partners</h2>
            </div>
            <p>
              To support our operational costs and keep our calculators free, we display ads served by Google AdSense and other advertising partners. These partners use cookies and web beacons to show personalized ads based on your visits to our site and other pages on the internet.
            </p>
            <p className="mt-2">
              Google uses the DoubleClick DART cookie to serve personalized ads. You can opt out of personalized advertising by visiting the official Google Ads Settings page or by configuring your browser's cookie settings.
            </p>
          </section>

          {/* Section 8: Third-Party Services */}
          <section id="third-parties" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">08.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Third-Party Services</h2>
            </div>
            <p>
              We partner with several trusted third-party services to ensure security, performance, and compliance:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
              <li><strong>Cloudflare:</strong> Provides SSL encryption, content delivery optimization, and protection against malicious traffic and bot attacks.</li>
              <li><strong>Google Fonts:</strong> Delivers clean, readable typography to ensure our calculators perform beautifully on all viewports.</li>
              <li><strong>Google Workspace:</strong> Securely hosts our corporate email systems, support queues, and compliance databases.</li>
            </ul>
          </section>

          {/* Section 9: Local Storage API */}
          <section id="local-storage" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">09.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Local Storage API</h2>
            </div>
            <p>
              If you use our "Save Calculation" feature to compare different mortgage or savings scenarios, we use the HTML5 Web Storage API (LocalStorage) to store those settings.
            </p>
            <p className="mt-2">
              This data is saved directly on your device and is never uploaded to our servers. You can delete this saved data at any time by clearing your browser cache or using the "Delete Saved Data" buttons in our tool settings panel.
            </p>
          </section>

          {/* Section 10: Data Retention Policy */}
          <section id="data-retention" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">10.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Data Retention Policy</h2>
            </div>
            <p>
              We only retain personal information for as long as necessary to fulfill the purposes for which it was collected:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
              <li><strong>Inquiry History:</strong> Personal details provided through our contact form are stored in our secure email system for up to 12 months to help us resolve technical or billing inquiries, unless you request early deletion.</li>
              <li><strong>Server Logs:</strong> Anonymized diagnostic logs and IP histories are automatically deleted after 90 days.</li>
              <li><strong>Browser Memory:</strong> Saved calculations stored in your browser's LocalStorage remain on your device until you clear your browser cache.</li>
            </ul>
          </section>

          {/* Section 11: Children's Privacy */}
          <section id="children-privacy" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">11.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Children's Privacy (COPPA)</h2>
            </div>
            <p>
              Calcfino does not knowingly collect personal information from children under the age of 13. Our calculators and planning tools are designed for adults. If you believe your child has shared personal information with us, please contact our privacy compliance desk, and we will delete it from our systems immediately.
            </p>
          </section>

          {/* Section 12: GDPR Compliance */}
          <section id="gdpr-compliance" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">12.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">GDPR Compliance & European Rights</h2>
            </div>
            <p>
              If you access Calcfino from the European Economic Area (EEA) or the United Kingdom, you are protected by the General Data Protection Regulation (GDPR). We act as the Data Controller for any contact details you submit to us, while your financial inputs remain entirely on your device. Under GDPR, you have the following rights:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
              <li>The right to access, update, or delete the personal details we hold about you.</li>
              <li>The right to restrict or object to the processing of your personal information.</li>
              <li>The right to port your data to another service provider.</li>
              <li>The right to withdraw your consent to data processing at any time.</li>
            </ul>
            <p className="mt-2">
              If you wish to exercise any of these rights, please send your request to our data compliance officer at <a href="mailto:privacy@neelbyte.in" className="text-blue-600 dark:text-cyan-400 font-semibold underline">privacy@neelbyte.in</a>.
            </p>
          </section>

          {/* Section 13: CCPA Compliance */}
          <section id="ccpa-compliance" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">13.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">CCPA/CPRA Compliance & California Rights</h2>
            </div>
            <p>
              If you are a resident of California, you are protected by the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA). Under these frameworks, you have the following rights:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
              <li>The right to know what personal information we collect, use, and share.</li>
              <li>The right to request the deletion of your personal information.</li>
              <li>The right to opt-out of the "sale" or "sharing" of your personal details for targeted advertising.</li>
              <li>The right to non-discrimination for exercising your privacy rights.</li>
            </ul>
            <p className="mt-2">
              Calcfino does not sell your personal details to third-party marketing companies. To opt-out of interest-based advertising cookies, please visit our cookies management settings or adjust your browser's tracking preferences.
            </p>
          </section>

          {/* Section 14: Your Rights & Choices */}
          <section id="your-rights" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">14.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Your Rights & Choices</h2>
            </div>
            <p>
              You have several options to control how we collect and use your data:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
              <li><strong>Contact History:</strong> You can request the deletion of your contact form submissions at any time by emailing us.</li>
              <li><strong>Cookie Tracking:</strong> You can configure your browser to reject all cookies or notify you when a cookie is set. Note that some site features may not perform optimally without essential cookies.</li>
              <li><strong>Personalized Ads:</strong> You can opt out of personalized advertising by visiting the Google Ads Settings page or using third-party opt-out portals.</li>
            </ul>
          </section>

          {/* Section 15: Cookies Management */}
          <section id="cookies-management" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">15.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Cookies Management</h2>
            </div>
            <p>
              Most web browsers are configured to accept cookies by default. You can manage your cookie preferences at any time by updating your browser settings:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
              <li><strong>Google Chrome:</strong> Settings &gt; Privacy and Security &gt; Third-party cookies</li>
              <li><strong>Mozilla Firefox:</strong> Settings &gt; Privacy & Security &gt; Enhanced Tracking Protection</li>
              <li><strong>Apple Safari:</strong> Settings &gt; Privacy &gt; Prevent cross-site tracking</li>
            </ul>
          </section>

          {/* Section 16: Data Security Measures */}
          <section id="data-security" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">16.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Data Security Measures</h2>
            </div>
            <p>
              We implement industry-standard security measures to protect your information. All traffic on Calcfino is encrypted using Transport Layer Security (TLS/SSL).
            </p>
            <p className="mt-2">
              Our servers and databases are protected by secure firewalls and undergo regular security audits to prevent unauthorized access, leaks, or attacks. However, please note that no method of internet transmission or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Section 17: Affiliate Disclosure */}
          <section id="affiliate-disclosure" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">17.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Affiliate Disclosure</h2>
            </div>
            <p>
              We may occasionally include affiliate links in our educational guides or blog posts. This means we may earn a small commission if you purchase products through those links, at no additional cost to you.
            </p>
            <p className="mt-2">
              These commissions help support our platform and keep our calculators free. We only recommend products we trust and believe will add value to our readers.
            </p>
          </section>

          {/* Section 18: Policy Revisions */}
          <section id="policy-revisions" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">18.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Policy Revisions</h2>
            </div>
            <p>
              We may update this Privacy Policy from time to time. When we make changes, we will update the "Last Updated" date at the top of this page. Your continued use of Calcfino after any modifications constitutes your acceptance of the updated terms.
            </p>
            <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-800 dark:text-slate-200 mt-2">
              Email: privacy@neelbyte.in<br />
              Subject: Privacy Compliance Inquiry<br />
              Address: Calcfino Tech Labs, 100 Financial Hub Parkway, Suite 500, New York, NY 10005, USA
            </div>
          </section>

          {/* Section 19: Frequently Asked Questions */}
          <section id="privacy-faqs" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">19.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Privacy Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                  <h4 className="text-xs font-bold text-slate-950 dark:text-white mb-2 flex items-start gap-1.5">
                    <HelpCircle className="w-4.5 h-4.5 text-blue-500 shrink-0 mt-0.5" />
                    {faq.q}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pl-6.5">
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
