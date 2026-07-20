import React from 'react';
import { Compass, BookOpen, CheckCircle, AlertTriangle, Cpu, Sparkles, Award, UserCheck, HelpCircle } from 'lucide-react';
import SEO, { getBreadcrumbsSchema, getFAQSchema } from '../../components/SEO';

interface EditorialPageProps {
  onNavigate?: (view: string, params?: any) => void;
}

export default function EditorialPage({ onNavigate }: EditorialPageProps) {
  const lastUpdated = "July 12, 2026";
  const readingTime = "13 min read";
  const pageUrl = window.location.href;

  const faqs = [
    {
      q: "Does NeelByte use AI models like ChatGPT or Gemini to generate editorial content?",
      a: "No. NeelByte enforces a strict editorial policy that prohibits the use of generative AI tools to write our core guides and financial articles. All articles are authored by qualified financial analysts and chartered economists. We do, however, utilize technical tools like Google AI Studio in our backend systems for grammatical auditing, structural proofreading, and mathematical formula double-checks."
    },
    {
      q: "What credentials do NeelByte's writers and editors hold?",
      a: "Our writers and editors are certified financial professionals, including chartered financial analysts (CFAs), certified financial planners (CFPs), chartered accountants, and experienced financial journalists. You can view each author's verified credentials and bio at the bottom of our articles."
    },
    {
      q: "How frequently is the educational content on NeelByte updated?",
      a: "We review and update our content regularly. Whenever central banks adjust interest rates, or tax departments revise progressive slabs, our compliance team updates the corresponding calculators and articles to ensure they remain accurate."
    },
    {
      q: "How can readers suggest updates or report factual inaccuracies?",
      a: "We welcome reader feedback. If you find a factual inaccuracy, outdated tax slab, or mathematical rounding error, please submit a detailed report through our Contact Page. Our editorial board reviews all submissions and corrects confirmed errors within 24 business hours."
    },
    {
      q: "Does NeelByte accept guest contributions or paid link insertions?",
      a: "No. To maintain our editorial neutrality and mathematical objectivity, we do not publish paid guest posts or accept sponsored link insertions. All articles are researched and written by our internal staff."
    }
  ];

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Editorial Policy', url: '/editorial' }
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
    <div className="font-sans py-8 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" id="neelbyte-editorial-policy">
      <SEO
        title="Editorial Policy | NeelByte Quality Content Standards"
        description="Review NeelByte's official Editorial Policy. Learn about our fact-checking procedures, mathematical audits, author guidelines, AI usage policy, and content standards."
        canonicalUrl={pageUrl}
        schema={[breadcrumbSchema, faqSchema]}
      />

      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
          <BookOpen className="w-3.5 h-3.5" /> Editorial Integrity & E-E-A-T Standards
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Editorial Standards & Policy
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed max-w-4xl">
          At NeelByte, our mission is to deliver transparent, objective, and mathematically sound financial education. This document details our content standards, fact-checking processes, and algebraic auditing procedures.
        </p>
        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium mt-4">
          <span>Last Updated: <strong className="text-slate-600 dark:text-slate-300">{lastUpdated}</strong></span>
          <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <span>Reading Time: <strong className="text-slate-600 dark:text-slate-300">{readingTime}</strong></span>
          <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <span>Ethics Standard: <strong className="text-slate-600 dark:text-slate-300">Strict Fact-Checking & Double-Blind Math Audit</strong></span>
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
                { label: '1. Editorial Mission', id: 'editorial-mission' },
                { label: '2. Content Standards', id: 'content-standards' },
                { label: '3. Fact Checking Protocols', id: 'fact-checking' },
                { label: '4. Multi-Stage Review Process', id: 'review-process' },
                { label: '5. Content Update Frequency', id: 'update-frequency' },
                { label: '6. Source Vetting Standards', id: 'source-selection' },
                { label: '7. Corrections Policy', id: 'corrections-policy' },
                { label: '8. Financial Transparency', id: 'transparency' },
                { label: '9. AI Code of Conduct', id: 'ai-policy' },
                { label: '10. Author Guidelines', id: 'author-guidelines' },
                { label: '11. Calculator Auditing Process', id: 'calculator-audit' },
                { label: '12. Reader Feedback Systems', id: 'reader-feedback' },
                { label: '13. Quality Assurance Limits', id: 'qa-assurance' },
                { label: '14. Editorial FAQs', id: 'editorial-faqs' }
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
          
          <section id="editorial-mission" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">01.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Our Editorial Mission</h2>
            </div>
            <p>
              The primary mission of NeelByte's editorial desk is to provide clear, reliable, and mathematically accurate financial education. We aim to break down complex financial concepts—such as loan amortizations, compound interest patterns, and progressive tax systems—into straightforward, practical resources that help users manage their money effectively.
            </p>
          </section>

          <section id="content-standards" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">02.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Content Standards</h2>
            </div>
            <p>
              We maintain strict content standards to ensure that all of our articles, guides, and calculator instructions are objective, accurate, and easy to understand. We prioritize clarity, precision, and practical value, avoiding unnecessary jargon or speculative advice.
            </p>
          </section>

          <section id="fact-checking" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">03.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Fact Checking Protocols</h2>
            </div>
            <p>
              All published materials are fact-checked for absolute accuracy. We verify historical statistics, interest rates, tax slabs, and regulatory codes against original primary sources, including central bank databases, official treasury sheets, and statutory tax departments.
            </p>
          </section>

          <section id="review-process" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">04.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Multi-Stage Review Process</h2>
            </div>
            <p>
              Every article and calculator undergoes a multi-stage, double-blind review process before going live:
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800 my-4">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950 text-slate-400 font-bold border-b border-slate-100 dark:border-slate-800">
                    <th className="px-4 py-3">Stage</th>
                    <th className="px-4 py-3">Responsible Party</th>
                    <th className="px-4 py-3">Key Focus Area</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-500 dark:text-slate-400">
                  <tr>
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">1. Initial Research</td>
                    <td className="px-4 py-3">Lead Financial Analyst</td>
                    <td className="px-4 py-3">Vetting primary sources, retrieving statutory slabs, and verifying equations.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">2. Coding & Integration</td>
                    <td className="px-4 py-3">Software Engineer</td>
                    <td className="px-4 py-3">Developing responsive client-side widgets and implementing core algebra formulas.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">3. Double-Blind Audit</td>
                    <td className="px-4 py-3">CFA Review Board & QA Engineer</td>
                    <td className="px-4 py-3">Independent validation of calculator outputs against benchmark spreadsheets.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="update-frequency" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">05.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Content Update Frequency</h2>
            </div>
            <p>
              Our calculators and articles are updated on a continuous basis. Whenever central banks adjust interest rates, or tax departments revise progressive slabs, our compliance team updates the corresponding calculators and articles to ensure they remain accurate and reliable.
            </p>
          </section>

          <section id="source-selection" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">06.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Source Vetting Standards</h2>
            </div>
            <p>
              We select our sources with extreme care. We prioritize primary documents published by official regulatory bodies, academic journals, and recognized financial institutions. We avoid speculative blogs, sensationalized news outlets, or unverified social media commentary.
            </p>
          </section>

          <section id="corrections-policy" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">07.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Corrections Policy</h2>
            </div>
            <p>
              We are committed to mathematical precision and editorial accuracy. When a bug in a calculator formula or an inaccuracy in an article is discovered, we correct it swiftly and transparently. We log all substantial corrections to maintain accountability.
            </p>
          </section>

          <section id="transparency" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">08.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Financial Transparency</h2>
            </div>
            <p>
              NeelByte is supported by non-intrusive, secure display advertising. To maintain our editorial neutrality, we enforce a strict separation between our editorial content and advertising partnerships. Our calculations and educational conclusions are never influenced by our advertisers.
            </p>
          </section>

          <section id="ai-policy" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">09.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">AI Code of Conduct</h2>
            </div>
            <div className="my-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs">
              <span className="font-extrabold uppercase tracking-wide text-slate-900 dark:text-white block mb-2 flex items-center gap-1">
                <Cpu className="w-4.5 h-4.5 text-blue-500" /> Generative AI Restriction Code
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                To protect our E-E-A-T standing, NeelByte strictly prohibits the use of generative AI tools to write our core articles, guides, or calculator explanations. We believe financial education requires human expertise, empathy, and professional integrity.
              </p>
            </div>
          </section>

          <section id="author-guidelines" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">10.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Author Guidelines</h2>
            </div>
            <p>
              Every NeelByte contributor must possess proven expertise, including advanced academic degrees in finance, economics, or mathematics, or active professional credentials (CFAs, CFPs, or CPAs). Our authors are required to disclose any potential conflicts of interest before writing.
            </p>
          </section>

          <section id="calculator-audit" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">11.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Calculator Auditing Process</h2>
            </div>
            <p>
              Our calculators undergo double-blind audits before release. We test every tool against verified spreadsheet models, financial benchmarks, and academic formulas. We also run regression tests on all major web browsers to ensure stable performance.
            </p>
          </section>

          <section id="reader-feedback" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">12.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Reader Feedback Systems</h2>
            </div>
            <p>
              We highly value reader feedback. If you find a mathematical error, outdated tax slab, or typographical mistake, please contact us immediately through our Contact Page. We review all reports and resolve confirmed issues within 24 business hours.
            </p>
          </section>

          <section id="qa-assurance" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">13.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Quality Assurance Limits</h2>
            </div>
            <p>
              While we strive to keep all tools and content 100% accurate, NeelByte cannot guarantee the absolute accuracy of our calculators or guides. Our resources are provided for educational purposes, and we encourage users to verify all results with certified professionals.
            </p>
          </section>

          <section id="editorial-faqs" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">14.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Editorial Frequently Asked Questions</h2>
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
