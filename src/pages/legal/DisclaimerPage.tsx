import React from 'react';
import { Compass, ShieldAlert, CheckCircle, AlertTriangle, HelpCircle, BookOpen, Mail, ShieldCheck } from 'lucide-react';
import SEO, { getBreadcrumbsSchema, getFAQSchema } from '../../components/SEO';

interface DisclaimerPageProps {
  onNavigate?: (view: string, params?: any) => void;
}

export default function DisclaimerPage({ onNavigate }: DisclaimerPageProps) {
  const lastUpdated = "July 20, 2026";
  const effectiveDate = "July 20, 2026";
  const readingTime = "18 min read";
  const pageUrl = window.location.href;

  const faqs = [
    {
      q: "Does using Calcfino establish an advisor-client relationship?",
      a: "No. Your use of Calcfino, including our calculators, guides, blog posts, and contact forms, does not establish a fiduciary, advisory, broker, or client relationship. All of our tools and articles are provided solely for general educational and comparative purposes."
    },
    {
      q: "Can I use Calcfino's calculations to file official tax returns?",
      a: "No. Our tax calculators use simplified progressive tax slab models designed for general planning. They do not constitute official auditing records or certified tax filings. You should always consult with a certified public accountant (CPA) or licensed tax professional to verify your calculations before filing official returns."
    },
    {
      q: "What should I do if I find a mathematical error on a calculator?",
      a: "Please report it to our team immediately via our Contact Page. We will forward your feedback to our mathematical review board to investigate and update the formula promptly."
    },
    {
      q: "Are the historical yield models on your SIP and PPF calculators guaranteed?",
      a: "No. All historical yield models and compound interest calculations are based on constant rate inputs and do not guarantee future returns. Real-world returns are subject to market fluctuations, interest rate changes, and inflation."
    },
    {
      q: "How does Calcfino select external resources or advertisement links?",
      a: "We only link to reputable financial institutions, educational entities, and regulatory bodies. Third-party advertisements served through Google AdSense are automated and do not reflect endorsements by Calcfino."
    }
  ];

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Disclaimer', url: '/disclaimer' }
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
    <div className="font-sans py-8 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" id="calcfino-disclaimer-policy">
      <SEO
        title="Financial Disclaimer Policy | Calcfino Educational Limits"
        description="Review Calcfino's official Financial Disclaimer Policy. Understand our non-advisory limits, calculator estimates, risk warning of investments, and our strict educational policy."
        canonicalUrl={pageUrl}
        schema={[breadcrumbSchema, faqSchema]}
      />

      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
          <ShieldAlert className="w-3.5 h-3.5 animate-pulse" /> Non-Fiduciary Legal Terms
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Financial Disclaimer Policy
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed max-w-4xl">
          All calculators, guides, projections, and written articles on Calcfino are designed for general informational and educational purposes only. We do not act as registered advisors or accountants.
        </p>
        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium mt-4">
          <span>Effective Date: <strong className="text-slate-600 dark:text-slate-300">{effectiveDate}</strong></span>
          <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <span>Last Updated: <strong className="text-slate-600 dark:text-slate-300">{lastUpdated}</strong></span>
          <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <span>Reading Time: <strong className="text-slate-600 dark:text-slate-300">{readingTime}</strong></span>
          <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <span>Compliance Focus: <strong className="text-slate-600 dark:text-slate-300">SEC, FINRA, FTC Regulatory Limits</strong></span>
        </div>
      </div>

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* TOC Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-blue-500" /> Disclaimer Navigation
            </h3>
            <nav className="flex flex-col gap-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
              {[
                { label: '1. General Disclaimer', id: 'general-disclaimer' },
                { label: '2. Educational Purpose', id: 'educational-purpose' },
                { label: '3. No Financial Advice', id: 'no-financial-advice' },
                { label: '4. No Investment Advice', id: 'no-investment-advice' },
                { label: '5. No Tax Advice', id: 'no-tax-advice' },
                { label: '6. No Legal Advice', id: 'no-legal-advice' },
                { label: '7. Calculator Disclaimers', id: 'calculator-accuracy' },
                { label: '8. No Guarantees', id: 'no-guarantee' },
                { label: '9. Risk Disclaimers', id: 'risk-disclaimer' },
                { label: '10. Third-Party Content', id: 'third-party-content' },
                { label: '11. External Resource Links', id: 'external-links' },
                { label: '12. Ads & AdSense Policies', id: 'ad-disclosure' },
                { label: '13. Affiliate Disclosures', id: 'affiliate-disclosure' },
                { label: '14. Errors & Omissions', id: 'errors-omissions' },
                { label: '15. Use At Your Own Risk', id: 'own-risk' },
                { label: '16. Limitation of Liability', id: 'limitation-liability' },
                { label: '17. No Professional Ties', id: 'no-relationship' },
                { label: '18. Policy Revisions', id: 'policy-changes' },
                { label: '19. Disclaimer FAQs', id: 'disclaimer-faqs' }
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
          
          {/* Section 1: General Disclaimer */}
          <section id="general-disclaimer" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">01.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">General Disclaimer</h2>
            </div>
            <p>
              Your use of <strong>Calcfino</strong> (<a href="https://neelbyte.in" className="text-blue-600 dark:text-cyan-400 font-semibold underline">https://neelbyte.in</a>) is entirely at your own risk. The website and all of its interactive calculators, planning tools, educational articles, and resources are provided on an "as-is" and "as-available" basis, with no warranties of any kind, express or implied.
            </p>
          </section>

          {/* Section 2: Educational Purpose */}
          <section id="educational-purpose" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">02.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Educational Purpose</h2>
            </div>
            <p>
              All tools, articles, formulas, and calculators available on Calcfino are intended solely for general educational, personal research, and comparative purposes. They are designed to clarify the mathematics of financial concepts (such as compound interest, mortgage amortization, and tax structures), and they should not be used to guide real-world investment commitments.
            </p>
          </section>

          {/* Section 3: No Financial Advice */}
          <section id="no-financial-advice" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">03.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">No Financial Advice</h2>
            </div>
            <p>
              Calcfino does not offer licensed financial advice, wealth management, or fiduciary planning services. Our tools are designed to model hypothetical scenarios and do not take into account your personal financial situation, risk tolerance, or goals. You should always consult with a certified financial advisor to analyze your personal circumstances before making significant financial commitments.
            </p>
          </section>

          {/* Section 4: No Investment Advice */}
          <section id="no-investment-advice" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">04.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">No Investment Advice</h2>
            </div>
            <p>
              None of the compounding models, stock market calculators, SIP planners, or investment scenarios displayed on Calcfino constitute buy/sell recommendations or portfolio advice. All investment modeling is illustrative and does not predict future returns. Remember that historical performance is not a guarantee of future outcomes, and all market investments carry risk.
            </p>
          </section>

          {/* Section 5: No Tax Advice */}
          <section id="no-tax-advice" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">05.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">No Tax Advice</h2>
            </div>
            <p>
              Our tax calculators use simplified progressive slab models designed for general planning. They do not account for every state-level rebate, surcharge tier, corporate benefit, or unique deduction program that may apply to your personal situation. They should not be used as official tax filing records. Please consult a certified public accountant (CPA) or a qualified tax attorney before submitting official returns.
            </p>
          </section>

          {/* Section 6: No Legal Advice */}
          <section id="no-legal-advice" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">06.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">No Certified Legal Advice</h2>
            </div>
            <p>
              None of the written guides, compliance documents, or articles on Calcfino constitute legal advice. If you require legal agreements, regulatory filings, or compliance reviews for your business, please consult a qualified corporate attorney.
            </p>
          </section>

          {/* Section 7: Calculator Disclaimers */}
          <section id="calculator-accuracy" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">07.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Calculator Accuracy Disclaimer</h2>
            </div>
            <div className="my-4 p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border-l-4 border-amber-500 text-xs text-slate-600 dark:text-slate-400 space-y-2">
              <span className="font-extrabold uppercase tracking-wide text-amber-800 dark:text-amber-400 flex items-center gap-1 mb-1">
                <AlertTriangle className="w-4 h-4 shrink-0" /> Important Planning Notice
              </span>
              <p className="leading-relaxed">
                Calculators on Calcfino use constant rate inputs for compound interest, SIP, and loan amortization models. Real-world financial products often involve variable interest rates, bank fees, processing charges, and regulatory adjustments that can alter your actual results. We recommend verifying all outputs independently with your financial institution before making any decisions.
              </p>
            </div>
          </section>

          {/* Section 8: No Guarantees */}
          <section id="no-guarantee" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">08.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">No Guarantees</h2>
            </div>
            <p>
              While we make every effort to audit our algebraic logic and keep our tax tables updated, Calcfino cannot guarantee that our calculators are free from minor rounding errors, formula bugs, or outdated parameters. We do not guarantee the completeness, accuracy, or usefulness of any results generated by our tools.
            </p>
          </section>

          {/* Section 9: Risk Disclaimers */}
          <section id="risk-disclaimer" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">09.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Risk Warning on Volatile Markets</h2>
            </div>
            <p>
              All financial asset categories carry risk. Before investing capital or planning substantial debt, you should understand the inherent risks involved in each asset class:
            </p>
            {/* Risk Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800 my-4">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950 text-slate-400 font-bold border-b border-slate-100 dark:border-slate-800">
                    <th className="px-4 py-3">Asset Category</th>
                    <th className="px-4 py-3">Inherent Risks</th>
                    <th className="px-4 py-3">Calculator Limit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-500 dark:text-slate-400">
                  <tr>
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">Mutual Funds & Stocks</td>
                    <td className="px-4 py-3">Subject to market volatility, sector fluctuations, and capital risks.</td>
                    <td className="px-4 py-3">Assumes a constant rate of growth. Cannot predict market drops or corrections.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">Cryptocurrencies</td>
                    <td className="px-4 py-3">Extreme price volatility, liquidity risks, and regulatory adjustments.</td>
                    <td className="px-4 py-3">Illustrates constant compounding only. Does not reflect sudden price drops.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">Fixed Deposits & PPFs</td>
                    <td className="px-4 py-3">Subject to inflation risk, early exit penalties, and policy interest adjustments.</td>
                    <td className="px-4 py-3">Assumes a fixed rate over the entire term. Does not calculate early exit fees.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 10: Third-Party Content */}
          <section id="third-party-content" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">10.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Third-Party Content</h2>
            </div>
            <p>
              Our platform may display content, articles, or resources provided by third-party partners or guest contributors. We do not control, endorse, or verify the accuracy of any third-party content, and we are not responsible for any misleading details that may appear in those materials.
            </p>
          </section>

          {/* Section 11: External Resource Links */}
          <section id="external-links" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">11.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">External Resource Links</h2>
            </div>
            <p>
              Calcfino may link to external, third-party websites for research or educational convenience. We do not control, endorse, or assume responsibility for the content, privacy policies, or practices of any third-party websites. Accessing external links is entirely at your own risk.
            </p>
          </section>

          {/* Section 12: Ads & AdSense Policies */}
          <section id="ad-disclosure" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">12.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Advertisement Disclaimer</h2>
            </div>
            <p>
              We partner with Google AdSense and other advertising networks to display programmatic ads on our platform. These ads are automated and do not reflect endorsements by Calcfino of the products or services advertised. We are not responsible for your interactions with any third-party advertisers.
            </p>
          </section>

          {/* Section 13: Affiliate Disclosures */}
          <section id="affiliate-disclosure" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">13.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Affiliate Disclaimer</h2>
            </div>
            <p>
              We may occasionally include affiliate links in our educational guides or blog posts. This means we may earn a small commission if you purchase products through those links, at no additional cost to you. We only recommend products we trust and believe will add value to our readers.
            </p>
          </section>

          {/* Section 14: Errors & Omissions */}
          <section id="errors-omissions" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">14.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Errors and Omissions</h2>
            </div>
            <p>
              While we strive to keep our calculators and articles accurate, Calcfino is not responsible for any minor typographical errors, algebraic rounding discrepancies, or outdated parameters that may appear on our pages. We encourage you to verify all calculations independently.
            </p>
          </section>

          {/* Section 15: Use At Your Own Risk */}
          <section id="own-risk" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">15.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Use At Your Own Risk</h2>
            </div>
            <p>
              By accessing Calcfino, you acknowledge that you are using our tools, guides, and calculators entirely at your own risk. You are solely responsible for verifying any calculations or projections before using them for real-world investments, taxes, or mortgages.
            </p>
          </section>

          {/* Section 16: Limitation of Liability */}
          <section id="limitation-liability" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">16.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Limitation of Liability</h2>
            </div>
            <p>
              To the fullest extent permitted by law, Calcfino, its parent company, founders, and contributors shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of or inability to use our tools. This includes, but is not limited to, capital losses, tax penalties, investment setbacks, or errors in calculations.
            </p>
          </section>

          {/* Section 17: No Professional Ties */}
          <section id="no-relationship" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">17.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">No Professional Relationship</h2>
            </div>
            <p>
              Your use of Calcfino does not establish a fiduciary, advisory, broker, or accountant-client relationship. All interactions remain completely anonymous and educational. If you require professional advice, please consult a certified specialist.
            </p>
          </section>

          {/* Section 18: Policy Revisions */}
          <section id="policy-changes" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">18.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Disclaimer Policy Changes</h2>
            </div>
            <p>
              We reserve the right to modify this Disclaimer Policy at any time. When we make changes, we will update the "Last Updated" date at the top of this page. Your continued use of the platform constitutes your formal acceptance of the updated terms.
            </p>
            <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-800 dark:text-slate-200 mt-2">
              Email: legal@neelbyte.in<br />
              Subject: Disclaimer Inquiry Request<br />
              Address: Calcfino Tech Labs, 100 Financial Hub Parkway, Suite 500, New York, NY 10005, USA
            </div>
          </section>

          {/* Section 19: Disclaimer FAQs */}
          <section id="disclaimer-faqs" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">19.</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Disclaimer Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                  <h4 className="text-xs font-bold text-slate-950 dark:text-white mb-2 flex items-start gap-1.5">
                    <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
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
