import React from 'react';
import { Compass, FileText, CheckCircle, AlertTriangle, HelpCircle, BookOpen, Mail, ShieldCheck } from 'lucide-react';
import SEO, { getBreadcrumbsSchema, getFAQSchema } from '../../components/SEO';

interface TermsPageProps {
  onNavigate?: (view: string, params?: any) => void;
}

export default function TermsPage({ onNavigate }: TermsPageProps) {
  const lastUpdated = "July 20, 2026";
  const effectiveDate = "July 20, 2026";
  const readingTime = "22 min read";
  const pageUrl = window.location.href;

  const faqs = [
    {
      q: "Can I use screenshots of Calcfino's calculations or amortization tables on my own website?",
      a: "Yes. You may capture screenshots of our calculators, amortization tables, and charts to use in reports, blog posts, or academic research, provided that you credit Calcfino and include a clear, clickable backlink to the source tool on neelbyte.in."
    },
    {
      q: "Are there any fees or paid tiers to access Calcfino's calculators?",
      a: "No. All of our calculators, tools, and written guides are 100% free to access with no subscription fees or premium paywalls. Our work is supported entirely by non-intrusive programmatic advertisements."
    },
    {
      q: "Does Calcfino store or monitor my calculations?",
      a: "No. Your privacy is a core priority. All calculation variables are processed locally inside your web browser. We do not store or monitor any calculation inputs on our servers."
    },
    {
      q: "Which state laws govern Calcfino's Terms and Conditions?",
      a: "These Terms and Conditions are governed by the laws of the State of New York, USA, and the laws of India, depending on the jurisdiction of our services, without regard to conflict of law principles."
    },
    {
      q: "How can I report a user who is abusing or scrapings your calculators?",
      a: "If you detect any scraping, spamming, or abuse of our calculation systems, please report it to our compliance team at legal@neelbyte.in."
    }
  ];

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Terms of Service', url: '/terms' }
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
    <div className="font-sans py-8 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" id="calcfino-terms-of-service">
      <SEO
        title="Terms of Service | Calcfino Premium Usage Agreement"
        description="Read Calcfino's official Terms and Conditions. Learn about our user conduct policies, intellectual property rights, data licenses, and standard legal frameworks."
        canonicalUrl={pageUrl}
        schema={[breadcrumbSchema, faqSchema]}
      />

      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
          <FileText className="w-3.5 h-3.5" /> Legal Usage Agreement
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Terms and Conditions
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed max-w-4xl">
          By accessing or using Calcfino, you agree to comply with and be bound by these Terms and Conditions. Please review this document carefully before using our services.
        </p>
        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium mt-4">
          <span>Effective Date: <strong className="text-slate-600 dark:text-slate-300">{effectiveDate}</strong></span>
          <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <span>Last Updated: <strong className="text-slate-600 dark:text-slate-300">{lastUpdated}</strong></span>
          <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <span>Reading Time: <strong className="text-slate-600 dark:text-slate-300">{readingTime}</strong></span>
          <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <span>Regulatory Alignment: <strong className="text-slate-600 dark:text-slate-300">Global Civil Liability Code</strong></span>
        </div>
      </div>

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* TOC Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-blue-500" /> Terms Navigation
            </h3>
            <nav className="flex flex-col gap-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
              {[
                { label: '1. Acceptance of Terms', id: 'acceptance' },
                { label: '2. Eligibility to Use', id: 'eligibility' },
                { label: '3. Website Usage Rules', id: 'website-usage' },
                { label: '4. Acceptable Conduct', id: 'acceptable-use' },
                { label: '5. Prohibited Activities', id: 'prohibited-activities' },
                { label: '6. Intellectual Property', id: 'intellectual-property' },
                { label: '7. Content License Limit', id: 'license' },
                { label: '8. User Responsibilities', id: 'user-responsibilities' },
                { label: '9. Calculator Tool Usage', id: 'tool-usage' },
                { label: '10. Mathematical Accuracy', id: 'mathematical-accuracy' },
                { label: '11. Limitation of Liability', id: 'limitation-liability' },
                { label: '12. Third-Party Services', id: 'third-party-services' },
                { label: '13. Programmatic Ads', id: 'ads' },
                { label: '14. External Resources', id: 'external-links' },
                { label: '15. Termination of Access', id: 'termination' },
                { label: '16. Indemnification Clause', id: 'indemnification' },
                { label: '17. Governing Law', id: 'governing-law' },
                { label: '18. Dispute Resolution', id: 'dispute-resolution' },
                { label: '19. Changes to Terms', id: 'changes-to-terms' },
                { label: '20. Privacy Reference', id: 'privacy-reference' },
                { label: '21. Cookies Statement', id: 'cookies' },
                { label: '22. Feedback License', id: 'feedback' },
                { label: '23. Contact Details', id: 'contact' },
                { label: '24. Terms FAQ', id: 'terms-faqs' }
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
          
          {/* Section 1: Acceptance of Terms */}
          <section id="acceptance" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">01.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Acceptance of Terms</h2>
            </div>
            <p>
              By accessing, browsing, or using <strong>Calcfino</strong> (<a href="https://neelbyte.in" className="text-blue-600 dark:text-cyan-400 font-semibold underline">https://neelbyte.in</a>), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, as well as our Privacy Policy and Disclaimer. If you do not agree to these terms, you must immediately stop using our platform.
            </p>
          </section>

          {/* Section 2: Eligibility to Use */}
          <section id="eligibility" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">02.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Eligibility to Use</h2>
            </div>
            <p>
              Our services are designed for individuals who are at least 13 years old. If you are under 18, you represent that you have the consent of a parent or legal guardian to access and use our website.
            </p>
          </section>

          {/* Section 3: Website Usage Rules */}
          <section id="website-usage" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">03.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Website Usage Rules</h2>
            </div>
            <p>
              We grant you a non-exclusive, non-transferable, revocable license to access and use Calcfino strictly in accordance with these terms. You agree to use the website solely for personal, non-commercial purposes.
            </p>
          </section>

          {/* Section 4: Acceptable Conduct */}
          <section id="acceptable-use" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">04.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Acceptable Conduct</h2>
            </div>
            <p>
              You agree to use our platform responsibly and in compliance with all applicable local, state, and international laws. You are responsible for ensuring that any details you share with us through our contact forms are accurate and do not violate third-party rights.
            </p>
          </section>

          {/* Section 5: Prohibited Activities */}
          <section id="prohibited-activities" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">05.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Prohibited Activities</h2>
            </div>
            <p>
              When using Calcfino, you are strictly prohibited from:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
              <li>Using automated systems, scripts, or scrapers to extract data, content, or formulas from our calculators.</li>
              <li>Attempting to interfere with the security, performance, or integrity of our website.</li>
              <li>Using our calculators or written content to build a competing calculation utility or finance portal.</li>
              <li>Submitting spam, malicious links, or offensive material through our contact forms.</li>
            </ul>
          </section>

          {/* Section 6: Intellectual Property */}
          <section id="intellectual-property" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">06.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Intellectual Property</h2>
            </div>
            <p>
              All content on Calcfino—including calculator interfaces, codebase, visual layouts, graphics, mathematical algorithms, written guides, and articles—is the exclusive property of Calcfino and is protected by copyright, trademark, and intellectual property laws.
            </p>
          </section>

          {/* Section 7: Content License Limit */}
          <section id="license" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">07.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Content License Limit</h2>
            </div>
            <p>
              We grant you a limited, personal, non-commercial license to view, use, and print pages from our website for your own personal research. You may not reproduce, distribute, modify, or publish any part of our platform without our prior written consent.
            </p>
          </section>

          {/* Section 8: User Responsibilities */}
          <section id="user-responsibilities" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">08.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">User Responsibilities</h2>
            </div>
            <p>
              You are solely responsible for verifying any calculations or projections generated by our tools before using them to make real-world investments, mortgage choices, or tax decisions.
            </p>
          </section>

          {/* Section 9: Calculator Tool Usage */}
          <section id="tool-usage" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">09.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Calculator Tool Usage</h2>
            </div>
            <p>
              Our interactive tools are designed to model hypothetical scenarios and use simplified progressive interest structures. Real-world financial products may involve variable parameters that are not reflected in our calculators.
            </p>
          </section>

          {/* Section 10: Mathematical Accuracy */}
          <section id="mathematical-accuracy" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">10.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Mathematical Accuracy Policy</h2>
            </div>
            <p>
              While we make every effort to audit our compounding formulas and keep our tax slabs updated, we cannot guarantee that our calculators are free from minor rounding discrepancies, formula bugs, or outdated parameters. We do not guarantee the accuracy or usefulness of any outputs.
            </p>
          </section>

          {/* Section 11: Limitation of Liability */}
          <section id="limitation-liability" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">11.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Limitation of Liability</h2>
            </div>
            <p>
              To the fullest extent permitted by law, Calcfino and its parent entity shall not be liable for any direct, indirect, incidental, or consequential losses resulting from your use of or inability to use our tools, including financial losses, investment setbacks, or tax errors.
            </p>
          </section>

          {/* Section 12: Third-Party Services */}
          <section id="third-party-services" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">12.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Third-Party Services</h2>
            </div>
            <p>
              We partner with trusted third-party providers such as Google and Cloudflare to ensure security, analytics, and content delivery. We are not responsible for any issues arising from your use of these third-party services.
            </p>
          </section>

          {/* Section 13: Programmatic Ads */}
          <section id="ads" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">13.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Programmatic Advertisements</h2>
            </div>
            <p>
              We display programmatic ads served by Google AdSense to fund our platform. These ads are automated and do not reflect endorsements of the products or services advertised by Calcfino.
            </p>
          </section>

          {/* Section 14: External Resources */}
          <section id="external-links" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">14.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">External Resource Links</h2>
            </div>
            <p>
              We may include links to external websites for research convenience. We do not control, endorse, or assume responsibility for the content, privacy policies, or terms of any third-party websites.
            </p>
          </section>

          {/* Section 15: Termination of Access */}
          <section id="termination" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">15.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Termination of Access</h2>
            </div>
            <p>
              We reserve the right to restrict or terminate your access to our website or certain features at any time, without notice, for any conduct that we believe violates these terms or is harmful to our platform or other users.
            </p>
          </section>

          {/* Section 16: Indemnification Clause */}
          <section id="indemnification" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">16.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Indemnification</h2>
            </div>
            <p>
              You agree to indemnify, defend, and hold harmless Calcfino, its parent entity, founders, and employees from any claims, liabilities, or expenses (including legal fees) resulting from your violation of these terms or misuse of our platform.
            </p>
          </section>

          {/* Section 17: Governing Law */}
          <section id="governing-law" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">17.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Governing Law</h2>
            </div>
            <p>
              These terms are governed by the laws of the State of New York, USA, and the laws of India, depending on the jurisdiction of our services, without regard to conflict of law principles.
            </p>
          </section>

          {/* Section 18: Dispute Resolution */}
          <section id="dispute-resolution" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">18.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Dispute Resolution</h2>
            </div>
            <p>
              Any legal disputes or claims arising under these terms shall be resolved exclusively through binding arbitration in New York, NY, USA, or Mumbai, India, depending on the jurisdiction of our services, in accordance with applicable arbitration rules.
            </p>
          </section>

          {/* Section 19: Changes to Terms */}
          <section id="changes-to-terms" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">19.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Changes to Terms</h2>
            </div>
            <p>
              We reserve the right to modify these terms at any time. When we make changes, we will update the "Last Updated" date at the top of this page. Your continued use of the platform constitutes your formal acceptance of the updated terms.
            </p>
          </section>

          {/* Section 20: Privacy Reference */}
          <section id="privacy-reference" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">20.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Privacy Reference</h2>
            </div>
            <p>
              Our Privacy Policy explains how we collect and use data when you browse our platform. By accepting these terms, you also agree to the data practices outlined in our Privacy Policy.
            </p>
          </section>

          {/* Section 21: Cookies Statement */}
          <section id="cookies" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">21.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Cookies Policy</h2>
            </div>
            <p>
              We use cookies and similar tracking systems to analyze traffic patterns and customize your settings. You can manage your cookie preferences through your browser settings.
            </p>
          </section>

          {/* Section 22: Feedback License */}
          <section id="feedback" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">22.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">User Feedback License</h2>
            </div>
            <p>
              When you submit suggestions, ideas, or feedback through our contact forms, you grant us an unrestricted, perpetual, royalty-free license to implement and publish those ideas to improve our tools for all users.
            </p>
          </section>

          {/* Section 23: Contact Details */}
          <section id="contact" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">23.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Contact Information</h2>
            </div>
            <p>
              If you have any questions or concerns regarding these Terms and Conditions, please contact our compliance desk:
            </p>
            <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-800 dark:text-slate-200 mt-2">
              Email: legal@neelbyte.in<br />
              Subject: Terms Compliance Inquiry<br />
              Address: Calcfino Tech Labs, 100 Financial Hub Parkway, Suite 500, New York, NY 10005, USA
            </div>
          </section>

          {/* Section 24: Terms FAQ */}
          <section id="terms-faqs" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">24.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Terms Frequently Asked Questions</h2>
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
