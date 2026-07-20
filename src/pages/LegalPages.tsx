import React, { useState } from 'react';
import { Mail, ShieldCheck, MapPin, Phone, Send, CheckCircle, HelpCircle, FileText, Sparkles, AlertTriangle, ChevronRight, Compass } from 'lucide-react';
import SEO from '../components/SEO';
import { calculators } from '../data/calculators';
import { blogPosts } from '../data/blog';

// High-Fidelity NeelByte Legal Pages
import AboutPage from './legal/AboutPage';
import ContactPage from './legal/ContactPage';
import PrivacyPage from './legal/PrivacyPage';
import TermsPage from './legal/TermsPage';
import DisclaimerPage from './legal/DisclaimerPage';
import EditorialPage from './legal/EditorialPage';
import CookiePage from './legal/CookiePage';
import AccessibilityPage from './legal/AccessibilityPage';

interface LegalPageProps {
  type: 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer' | 'cookie' | 'refund' | 'editorial' | 'dmca' | 'accessibility' | 'corrections' | 'sitemap';
  onNavigate?: (view: string, params?: any) => void;
}

export default function LegalPages({ type, onNavigate }: LegalPageProps) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // Return custom high-fidelity pages immediately
  if (type === 'about') return <AboutPage onNavigate={onNavigate} />;
  if (type === 'contact') return <ContactPage onNavigate={onNavigate} />;
  if (type === 'privacy') return <PrivacyPage onNavigate={onNavigate} />;
  if (type === 'terms') return <TermsPage onNavigate={onNavigate} />;
  if (type === 'disclaimer') return <DisclaimerPage onNavigate={onNavigate} />;
  if (type === 'editorial') return <EditorialPage onNavigate={onNavigate} />;
  if (type === 'cookie') return <CookiePage onNavigate={onNavigate} />;
  if (type === 'accessibility') return <AccessibilityPage onNavigate={onNavigate} />;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const getPageMeta = () => {
    switch (type) {
      case 'refund':
        return { title: 'Refund Policy', desc: 'Standard payment refund rules for our premium membership and corporate auditing.' };
      case 'dmca':
        return { title: 'DMCA Copyright & Citation Policy', desc: 'Understand intellectual property rights, citations, and digital content fair use guidelines.' };
      case 'corrections':
        return { title: 'Corrections & Editorial Accuracy Policy', desc: 'Our rigorous guidelines for checking, correcting, and logging mathematical formula anomalies.' };
      case 'sitemap':
        return { title: 'Dynamic Visual Portal Sitemap', desc: 'Navigate through all of our 70+ high-precision financial planners and calculators.' };
      default:
        return { title: 'Legal Policy', desc: 'Official compliance and policy standards.' };
    }
  };

  const meta = getPageMeta();

  return (
    <div className="font-sans py-6 text-slate-800 dark:text-slate-100 max-w-4xl mx-auto px-4" id={`legal-page-${type}`}>
      <SEO title={meta.title} description={meta.desc} />

      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-600 to-indigo-600 dark:from-white dark:via-cyan-400 dark:to-blue-500">
          {meta.title}
        </h1>
        <p className="text-xs text-slate-400 mt-2 uppercase tracking-widest font-bold">NeelByte Compliance</p>
      </div>

      <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-sm leading-relaxed text-sm space-y-6">

        {/* 1. REFUND POLICY */}
        {type === 'refund' && (
          <div className="space-y-6">
            <p>
              This document establishes our standard operational parameters for {meta.title}.
            </p>
            <p>
              If you have any detailed questions or wish to audit any of our mathematical models, please reach out to our legal compliance desk via our <strong>Contact Page</strong>.
            </p>
          </div>
        )}

        {/* 2. DMCA POLICY */}
        {type === 'dmca' && (
          <div className="space-y-6 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase">Digital Millennium Copyright Act (DMCA) Policy</h2>
            <p>
              NeelByte.in respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act of 1998, the text of which may be found on the U.S. Copyright Office website, NeelByte will respond expeditiously to claims of copyright infringement committed using our services if reported to our Designated Copyright Agent identified below.
            </p>
            <p>
              If you are a copyright owner, authorized to act on behalf of one, or authorized to act under any exclusive right under copyright, please report alleged copyright infringements taking place on or through the Site by completing a DMCA Notice of Alleged Infringement and delivering it to NeelByte's Designated Copyright Agent. Upon receipt of the Notice, NeelByte will take whatever action, in its sole discretion, it deems appropriate, including removal of the challenged content from the Site.
            </p>
            <h3 className="font-bold text-slate-800 dark:text-slate-200">Designated Agent Contact</h3>
            <p className="font-mono bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
              Email: dmca@neelbyte.in<br />
              Subject Line: DMCA Takedown Notice Request<br />
              Address: NeelByte Compliance, One Financial Plaza, New York, NY 10005
            </p>
          </div>
        )}

        {/* 3. CORRECTIONS POLICY */}
        {type === 'corrections' && (
          <div className="space-y-6 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase">Corrections & Editorial Accuracy Policy</h2>
            <p>
              NeelByte.in is committed to mathematical precision and editorial accuracy. We recognize that errors can occasionally slip through our extensive multi-stage review processes. When a bug in a calculator formula or an inaccuracy in an editorial blog article is discovered, we commit to correcting it swiftly and transparently.
            </p>
            <h3 className="font-bold text-slate-800 dark:text-slate-200">Reporting an Inaccuracy</h3>
            <p>
              If you believe you have detected an algebraic error, a compounding discrepancy, or a typographical mistake on our portal, please submit a detailed report to our math verification team:
            </p>
            <p className="font-mono bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
              Email: support@neelbyte.in<br />
              Subject Line: Corrections Registry - [Calculator ID or Article Title]<br />
              Please include: (1) The specific URL, (2) The observed vs. expected math outputs, and (3) References to standard corporate finance textbooks or government progressive tax tables where applicable.
            </p>
          </div>
        )}

        {/* 4. VISUAL PORTAL SITEMAP */}
        {type === 'sitemap' && (
          <div className="space-y-8 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase mb-4 flex items-center gap-1.5">
                <Compass className="w-5 h-5 text-blue-500" /> Core Portal Directory
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Home Page', view: 'home' },
                  { label: 'All Calculators', view: 'calculators-all' },
                  { label: 'Wealth Insights Blog', view: 'blog' },
                  { label: 'About Us Portal', view: 'about-us' },
                  { label: 'Contact Us', view: 'contact-us' },
                  { label: 'Privacy Policy', view: 'privacy-policy' },
                  { label: 'Terms of Service', view: 'terms-conditions' },
                  { label: 'Financial Disclaimer', view: 'disclaimer' },
                  { label: 'Cookie Settings', view: 'cookie-policy' },
                  { label: 'Refund Guidelines', view: 'refund-policy' },
                  { label: 'Editorial Integrity', view: 'editorial-policy' },
                  { label: 'DMCA Takedowns', view: 'dmca' },
                  { label: 'Accessibility Standards', view: 'accessibility' },
                  { label: 'Corrections Registry', view: 'corrections' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => onNavigate?.(item.view)}
                    className="p-3 text-left rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20 hover:border-blue-500 hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-350 hover:text-blue-600 font-medium transition-all"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase mb-4 flex items-center gap-1.5">
                <FileText className="w-5 h-5 text-indigo-500" /> Interactive Financial Simulators
              </h2>
              
              <div className="space-y-6">
                {Array.from(new Set(calculators.map(c => c.category))).map(cat => {
                  const label = cat.replace(/-/g, ' ').toUpperCase();
                  const catCalcs = calculators.filter(c => c.category === cat);
                  return (
                    <div key={cat} className="p-5 rounded-2xl border border-slate-150 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-950/5">
                      <h3 className="font-extrabold text-[10px] text-slate-400 dark:text-slate-500 tracking-wider mb-3">{label} SIMULATORS</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {catCalcs.map(calc => (
                          <button
                            key={calc.id}
                            onClick={() => onNavigate?.(`calculator-${calc.id}`, { id: calc.id })}
                            className="p-2.5 text-left rounded-lg bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 hover:border-indigo-400 transition-all text-xs font-semibold text-slate-800 dark:text-slate-200"
                          >
                            <span className="block truncate">{calc.name}</span>
                            <span className="block text-[9px] text-slate-400 font-light truncate">{calc.shortDescription}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase mb-4 flex items-center gap-1.5">
                <Sparkles className="w-5 h-5 text-emerald-500" /> Latest Wealth Articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {blogPosts.map(post => (
                  <button
                    key={post.id}
                    onClick={() => onNavigate?.(`blog-${post.slug}`, { slug: post.slug })}
                    className="p-3 text-left rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20 hover:border-emerald-500 text-slate-700 dark:text-slate-355 hover:text-emerald-600 transition-all font-medium flex justify-between items-center"
                  >
                    <span className="truncate">{post.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
