import React from 'react';
import { Compass, ShieldCheck, Mail, HelpCircle, FileText, Settings, UserCheck } from 'lucide-react';
import SEO, { getBreadcrumbsSchema, getFAQSchema } from '../../components/SEO';

interface AccessibilityPageProps {
  onNavigate?: (view: string, params?: any) => void;
}

export default function AccessibilityPage({ onNavigate }: AccessibilityPageProps) {
  const lastUpdated = "July 12, 2026";
  const readingTime = "8 min read";
  const pageUrl = window.location.href;

  const faqs = [
    {
      q: "Does NeelByte comply with WCAG 2.1 Level AA standards?",
      a: "Yes. Our goal is to achieve and maintain full WCAG 2.1 Level AA compliance across our entire web catalog, including all interactive calculators, compound interest visualizers, and text guides."
    },
    {
      q: "Can I navigate NeelByte's calculators entirely with a keyboard?",
      a: "Absolutely. All input fields, slider bars, tab selections, and buttons on NeelByte are designed with highly visible focus rings and a logical tab index order, allowing for seamless keyboard-only navigation."
    },
    {
      q: "Do your charts and visual elements support screen readers?",
      a: "Yes. We use standard HTML5 structures and robust WAI-ARIA labels, attributes, and roles to ensure screen readers like NVDA, JAWS, and VoiceOver can easily interpret and describe our charts and tables."
    },
    {
      q: "How can I report an accessibility barrier on NeelByte?",
      a: "We welcome accessibility feedback. If you encounter any usability issues, please contact our compliance officer at accessibility@neelbyte.in. We review and address all accessibility inquiries within 48 business hours."
    },
    {
      q: "Does NeelByte support zoom scaling up to 200%?",
      a: "Yes. Our responsive layouts are engineered to support browser scaling up to 200% without loss of content, visual clipping, or layout degradation."
    }
  ];

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Accessibility', url: '/accessibility' }
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
    <div className="font-sans py-8 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" id="neelbyte-accessibility">
      <SEO
        title="Accessibility Statement | NeelByte Inclusive Usability Standards"
        description="Review NeelByte's formal Accessibility Statement. Learn about our WCAG 2.1 Level AA compliance targets, screen-reader support, keyboard navigation, and feedback guidelines."
        canonicalUrl={pageUrl}
        schema={[breadcrumbSchema, faqSchema]}
      />

      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
          <UserCheck className="w-3.5 h-3.5" /> Inclusive Design Standards
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Accessibility Compliance Statement
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed max-w-4xl">
          At NeelByte, we are committed to ensuring digital accessibility for all users, regardless of ability or technology. This document details our compliance targets, screen-reader support, and usability features.
        </p>
        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium mt-4">
          <span>Last Updated: <strong className="text-slate-600 dark:text-slate-300">{lastUpdated}</strong></span>
          <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <span>Reading Time: <strong className="text-slate-600 dark:text-slate-300">{readingTime}</strong></span>
          <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <span>Compliance Framework: <strong className="text-slate-600 dark:text-slate-300">WCAG 2.1 Level AA, Section 508</strong></span>
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
                { label: '1. Our Commitment', id: 'commitment' },
                { label: '2. WCAG Compliance Goals', id: 'wcag-compliance' },
                { label: '3. Keyboard Navigation', id: 'keyboard-navigation' },
                { label: '4. Screen Reader Support', id: 'screen-reader' },
                { label: '5. High-Contrast Ratios', id: 'contrast' },
                { label: '6. Responsive touch-targets', id: 'responsive-design' },
                { label: '7. Feedback and Reporting', id: 'feedback' },
                { label: '8. Next-Gen Usability Plans', id: 'future-improvements' },
                { label: '9. Accessibility FAQs', id: 'accessibility-faqs' }
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
          
          <section id="commitment" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">01.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Our Accessibility Commitment</h2>
            </div>
            <p>
              At NeelByte, we are dedicated to making our digital calculators and personal finance guides accessible to everyone. We believe that financial literacy utilities should be globally democratized and easy to use for all individuals, regardless of their physical abilities, device choices, or connection speeds.
            </p>
          </section>

          <section id="wcag-compliance" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">02.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">WCAG Compliance Goals</h2>
            </div>
            <p>
              To ensure inclusive usability, our team actively designs, tests, and refines our pages against Web Content Accessibility Guidelines (WCAG) 2.1 Level AA targets and Section 508 rules.
            </p>
          </section>

          <section id="keyboard-navigation" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">03.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Keyboard Navigation Standards</h2>
            </div>
            <p>
              All input fields, slider controls, drop-down menus, and navigation tabs on NeelByte can be operated entirely using standard keyboard commands. We ensure our codebase maintains:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Distinct, high-contrast visual focus rings to help keyboard users track their location.</li>
              <li>A logical, intuitive tab indexing order across all calculators and contact panels.</li>
              <li>Support for standard keystrokes, including Escape to close modals and Enter to activate buttons.</li>
            </ul>
          </section>

          <section id="screen-reader" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">04.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Screen Reader Support</h2>
            </div>
            <p>
              We program our interactive components with descriptive HTML5 landmark tags and rich WAI-ARIA roles, attributes, and labels. This allows screen readers like NVDA, JAWS, and Apple VoiceOver to accurately interpret, read, and describe our calculators, charts, and results.
            </p>
          </section>

          <section id="contrast" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">05.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">High-Contrast Color Ratios</h2>
            </div>
            <p>
              We ensure our color palettes adhere to strict contrast standards. Text and background combinations maintain a contrast ratio of at least 4.5:1 for standard text and 3:1 for large display headers, facilitating readability for users with low vision or color blindness.
            </p>
          </section>

          <section id="responsive-design" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">06.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Responsive Touch Target Parameters</h2>
            </div>
            <p>
              To accommodate touch screens and mobile users, all interactive targets—including buttons, slider controls, and menu links—are designed with a minimum touch-target size of 44x44px. This ensures easy and accurate selections on all mobile and tablet viewports.
            </p>
          </section>

          <section id="feedback" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">07.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Usability Feedback & Reporting</h2>
            </div>
            <p>
              We value user feedback and are always looking to improve our platform's accessibility. If you encounter any usability barriers or find an interactive tool difficult to use, please contact our compliance desk:
            </p>
            <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-800 dark:text-slate-200 mt-2">
              Email: accessibility@neelbyte.in<br />
              Subject Line: Accessibility Usability Barrier Report<br />
              Address: NeelByte Tech Labs, 100 Financial Hub Parkway, Suite 500, New York, NY 10005
            </div>
          </section>

          <section id="future-improvements" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">08.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Next-Generation Usability Improvements</h2>
            </div>
            <p>
              We are constantly working to improve accessibility. Our upcoming roadmap includes:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Implementing fully dynamic screen-reader summaries that announce live calculator results as sliders move.</li>
              <li>Extending our automated contrast audits to all historical blog posts and guides.</li>
              <li>Testing our interactive tools against a wider variety of speech recognition software and alternative inputs.</li>
            </ul>
          </section>

          <section id="accessibility-faqs" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">09.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Accessibility Frequently Asked Questions</h2>
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
