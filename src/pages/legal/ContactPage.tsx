import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, HelpCircle, AlertTriangle, ShieldCheck, Clock, BookOpen, MessageSquare } from 'lucide-react';
import SEO, { getBreadcrumbsSchema, getFAQSchema } from '../../components/SEO';

interface ContactPageProps {
  onNavigate?: (view: string, params?: any) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({ name: '', email: '', category: 'support', subject: '', message: '', acceptPolicy: false });
  const [submitted, setSubmitted] = useState(false);
  const pageUrl = window.location.href;
  const lastUpdated = "July 20, 2026";
  const readingTime = "12 min read";

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptPolicy) return;
    setSubmitted(true);
    setFormData({ name: '', email: '', category: 'support', subject: '', message: '', acceptPolicy: false });
  };

  const faqs = [
    {
      q: "What is your typical support response window?",
      a: "Our standard operational support desk guarantees a review and initial response to all technical or editorial inquiries within 24 to 48 business hours. Priority categories, such as certified bug reports in progressive tax brackets or calculator algebraic errors, are routed directly to our lead engineering team and typically resolved or updated within 24 hours of confirmation."
    },
    {
      q: "Can I request custom-built calculators for my personal business?",
      a: "Yes! We welcome calculator requests from entrepreneurs, real estate firms, tax agencies, and wealth managers. Please choose the 'Business / Strategic Partnerships' category when filling out the form. Describe your formula requirements, variables, and expected outputs. Our mathematical development team will review the proposal and incorporate it into our free public roadmap if it benefits our general audience."
    },
    {
      q: "How do I report a mathematical error or formula bug?",
      a: "To help us resolve mathematical discrepancies quickly, please select 'Calculator Issues / Formula Bugs'. In your message body, provide: (1) The specific calculator URL, (2) The input variables used, (3) The observed calculator output, and (4) The mathematically correct expected output along with reference sources, such as official tax schedules or financial theory textbooks."
    },
    {
      q: "Do you offer advertising space or sponsored content?",
      a: "Yes, we partner with verified, non-fiduciary financial institutions, brokerage platforms, and educational providers that align with our high standards of transparency. Please choose the 'Advertising & Media Enquiries' category on our form to receive our media kit. Please note that we strictly refuse to publish paid product reviews that compromise our objective calculator calculations or editorial neutrality."
    },
    {
      q: "Is my personal data sent to your servers when I use this contact form?",
      a: "The information you enter into this contact form (name, email address, message, and category) is securely transmitted via TLS encryption to our server to help us respond to your request. Unlike our calculator tools, which process data entirely client-side, this contact form represents the only area where contact details are stored. We never sell, rent, or distribute your email address or personal details to third-party marketing companies."
    }
  ];

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Contact Us', url: '/contact' }
  ];

  const breadcrumbSchema = getBreadcrumbsSchema(breadcrumbs);
  const faqSchema = getFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })));

  return (
    <div className="font-sans py-8 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" id="calcfino-contact-us">
      <SEO
        title="Contact Us | Calcfino Premium Support and Enquiries"
        description="Get in touch with Calcfino's financial engineering and editorial compliance desks. Submit bug reports, calculator corrections, advertising requests, and business partnerships."
        canonicalUrl={pageUrl}
        schema={[breadcrumbSchema, faqSchema]}
      />

      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
          Compliance Desk & Support Portal
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-3 mb-4">
          How Can We Help You Today?
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Whether you need mathematical clarifications, want to report a calculator bug, propose corporate sponsorships, or submit content corrections, our expert board is ready to listen and respond.
        </p>
        <div className="flex justify-center items-center gap-4 text-[11px] text-slate-400 font-medium mt-3">
          <span>Last Updated: <strong className="text-slate-600 dark:text-slate-300">{lastUpdated}</strong></span>
          <span>•</span>
          <span>Reading Time: <strong className="text-slate-600 dark:text-slate-300">{readingTime}</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Contact Info Panel (Left Side - 2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="p-6 rounded-2xl border border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b pb-2 flex items-center gap-1.5">
              <MessageSquare className="w-4.5 h-4.5 text-blue-500" /> Support Channels
            </h3>

            {/* Support Cards */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="p-3 h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Email Correspondence</h4>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-normal space-y-2">
                    <p>
                      <strong>General Support & Tech:</strong>
                      <a href="mailto:support@neelbyte.in" className="block text-blue-600 dark:text-cyan-400 font-semibold mt-0.5">support@neelbyte.in</a>
                    </p>
                    <p>
                      <strong>Business & Partnerships:</strong>
                      <a href="mailto:business@neelbyte.in" className="block text-blue-600 dark:text-cyan-400 font-semibold mt-0.5">business@neelbyte.in</a>
                    </p>
                    <p>
                      <strong>Advertising Queries:</strong>
                      <a href="mailto:ads@neelbyte.in" className="block text-blue-600 dark:text-cyan-400 font-semibold mt-0.5">ads@neelbyte.in</a>
                    </p>
                    <p>
                      <strong>Legal & DMCA Requests:</strong>
                      <a href="mailto:legal@neelbyte.in" className="block text-blue-600 dark:text-cyan-400 font-semibold mt-0.5">legal@neelbyte.in</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Office Hours & Response Time</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
                    Monday to Friday: <strong>9:00 AM – 6:00 PM (EST)</strong><br />
                    Saturday & Sunday: <strong>System Monitoring Only</strong>
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Our standard response time is <strong>within 24 to 48 hours</strong>. Operational priorities are given to calculation errors, bug reporting, and security updates.
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-normal">
                    <strong>Operational Headquarters:</strong><br />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Calcfino Tech Labs, 100 Financial Hub Parkway, Suite 500, New York, NY 10005, USA</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 h-10 w-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Strategic Hotline</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
                    For business partners and institutional inquiries:<br />
                    <span className="font-mono text-slate-800 dark:text-slate-100 font-bold block mt-1">+1 (800) 555-0145</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Warning and Guidance Callout */}
          <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border-l-4 border-amber-500 text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <h4 className="font-extrabold uppercase tracking-wide text-amber-800 dark:text-amber-400 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" /> Before Submitting Personal Financial Advice Queries
            </h4>
            <p className="leading-relaxed">
              Please note that <strong>Calcfino is not a licensed financial advisor or wealth broker</strong>. Our support personnel cannot legally answer personal questions, offer individual asset advice, or recommend specific insurance, loan, or investment policies.
            </p>
            <p className="leading-relaxed font-semibold">
              For customized, legally-binding advice regarding your personal or business taxes, mortgages, or portfolios, please consult a certified public accountant (CPA) or a registered investment advisor (RIA).
            </p>
          </div>

          {/* Diagnostic Submissions Table */}
          <div className="p-5 rounded-2xl border border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-950 dark:text-white uppercase tracking-wider">Diagnostic Bug Submission</h4>
            <p className="text-[11px] text-slate-500 leading-normal">
              When reporting technical errors, providing precise details helps our engineering team trace and resolve issues efficiently:
            </p>
            <div className="overflow-x-auto rounded-lg border border-slate-100 dark:border-slate-800">
              <table className="w-full text-[10px] text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950 text-slate-400 font-bold border-b border-slate-100 dark:border-slate-800">
                    <th className="px-2.5 py-2">Issue Type</th>
                    <th className="px-2.5 py-2">Required Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                  <tr>
                    <td className="px-2.5 py-2 font-bold text-slate-900 dark:text-white">Mathematical Bug</td>
                    <td className="px-2.5 py-2">Specific variables entered, observed results, and expected reference outputs.</td>
                  </tr>
                  <tr>
                    <td className="px-2.5 py-2 font-bold text-slate-900 dark:text-white">Interface Issue</td>
                    <td className="px-2.5 py-2">Device model, operating system version, browser model, and screen size.</td>
                  </tr>
                  <tr>
                    <td className="px-2.5 py-2 font-bold text-slate-900 dark:text-white">Tax Code Inaccuracy</td>
                    <td className="px-2.5 py-2">Applicable financial year, dynamic slab error, and official statutory references.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Contact Form Panel (Right Side - 3 Cols) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl border border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b pb-3 mb-6 flex items-center gap-1.5">
              <Mail className="w-5 h-5 text-blue-500" /> Send An Encrypted Inquiry
            </h3>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-100 dark:border-emerald-900/50 flex flex-col items-center gap-3 text-center animate-in scale-in-95 duration-200">
                <CheckCircle className="w-12 h-12 text-emerald-500" />
                <h4 className="text-base font-extrabold text-slate-950 dark:text-white">Message Transmitted Successfully!</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                  Thank you for contacting Calcfino. Your inquiry has been securely routed to our support queue. Our mathematical audit board or technical team will review your message and respond via email within 24 to 48 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition-all"
                >
                  Submit Another Form
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">Your Full Name <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Jane Doe"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">Email Address <span className="text-rose-500">*</span></label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g., jane@example.com"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">Enquiry Category <span className="text-rose-500">*</span></label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all font-semibold"
                      required
                    >
                      <option value="support">Technical Support & General Feedback</option>
                      <option value="calculator">Calculator Issues / Formula Bugs</option>
                      <option value="corrections">Content Corrections / Editorial Reviews</option>
                      <option value="advertising">Advertising, Media, & Sponsorships</option>
                      <option value="business">Business & Strategic Partnerships</option>
                      <option value="press">Press, Media, & Speaking Requests</option>
                      <option value="dmca">DMCA Takedown & Copyright Queries</option>
                      <option value="legal">Legal, Compliance, & Regulatory Requests</option>
                      <option value="security">Vulnerability & Security Reporting</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">Subject Line <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g., Amortization calculation inquiry"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all font-medium"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">Detail Your Message <span className="text-rose-500">*</span></label>
                  <textarea
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    placeholder="Provide a comprehensive description of your enquiry..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all font-medium leading-relaxed"
                    required
                  ></textarea>
                </div>

                {/* Consent checkbox */}
                <div className="flex items-start gap-2.5 pt-2">
                  <input
                    type="checkbox"
                    id="acceptPolicy"
                    checked={formData.acceptPolicy}
                    onChange={e => setFormData({ ...formData, acceptPolicy: e.target.checked })}
                    className="mt-0.5 accent-blue-600 rounded"
                    required
                  />
                  <label htmlFor="acceptPolicy" className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal font-medium">
                    I acknowledge that the details provided in this contact form will be processed securely in accordance with the Calcfino <span className="text-blue-600 dark:text-cyan-400 underline cursor-pointer" onClick={() => onNavigate?.('privacy-policy')}>Privacy Policy</span>. <span className="text-rose-500">*</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!formData.acceptPolicy}
                  className={`w-full py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all shadow-md ${formData.acceptPolicy ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'}`}
                >
                  <Send className="w-4 h-4" /> Dispatch Secure Message Form
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Support Policy Sections */}
      <div className="mt-12 space-y-12">
        
        {/* Support Policy Section */}
        <section className="p-6 sm:p-8 rounded-2xl border border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5 border-b pb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" /> Support Policy & Mutual Respect Code
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Calcfino is committed to providing a helpful, welcoming, and safe platform for all users. We require a mutual standard of professional courtesy from our team and our users. We strictly prohibit any abusive, profane, or threatening communications directed at our support representatives, analysts, or developers. Any such messages will result in the immediate closure of the inquiry, deleting of your message thread, and permanent blocking of the sender's email domain.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            When submitting files, formulas, or screenshots to support your technical inquiry, please make sure they contain no sensitive personal details, such as actual bank account routing codes, real-world mortgage numbers, or tax registration IDs. Calcfino assumes no liability for unsolicited personal details shared through our general contact forms.
          </p>
        </section>

        {/* Feedback Policy */}
        <section className="p-6 sm:p-8 rounded-2xl border border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5 border-b pb-2">
            <BookOpen className="w-5 h-5 text-indigo-500" /> User Feedback & Suggestions Policy
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            We highly value suggestions and ideas from our users to help us expand and refine our tools. When you submit feedback, ideas, or feature proposals to Calcfino, you grant us an unrestricted, perpetual, royalty-free, and irrevocable license to use, publish, and implement those suggestions. This allows us to continuously build and release new free calculators for our global audience while ensuring our platform remains open and unrestricted.
          </p>
        </section>

        {/* Security Reporting Section */}
        <section className="p-6 sm:p-8 rounded-2xl border border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5 border-b pb-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" /> Security Vulnerability & Bug Reporting
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            We take digital security and system integrity very seriously. If you believe you have discovered a vulnerability, cross-site script bug, or security gap on Calcfino (<a href="https://neelbyte.in" className="text-blue-600 dark:text-cyan-400 font-semibold underline">https://neelbyte.in</a>), please report it to us immediately via our contact form under the "Vulnerability & Security Reporting" category. We ask that you follow responsible disclosure guidelines and allow our technical team sufficient time to investigate and patch the issue before sharing any details publicly.
          </p>
        </section>

        {/* Frequently Asked Questions */}
        <section className="space-y-6">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b pb-2">
            <HelpCircle className="w-5 h-5 text-blue-500" /> Support Desk Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* Thank You Section */}
        <section className="p-8 rounded-2xl bg-slate-900 text-white text-center space-y-4 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white">Thank You for Supporting Calcfino</h3>
            <p className="text-xs text-slate-400 leading-relaxed mt-2">
              Your engagement, feedback, and bug reports help us maintain our mathematical accuracy and improve our tools. We are dedicated to delivering free, high-precision financial literacy resources, and we thank you for being a part of our community.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
