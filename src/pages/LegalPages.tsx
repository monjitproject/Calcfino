import React, { useState } from 'react';
import { Mail, ShieldCheck, MapPin, Phone, Send, CheckCircle, HelpCircle, FileText, Sparkles, AlertTriangle } from 'lucide-react';
import SEO from '../components/SEO';

interface LegalPageProps {
  type: 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer' | 'cookie' | 'refund' | 'editorial';
}

export default function LegalPages({ type }: LegalPageProps) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const getPageMeta = () => {
    switch (type) {
      case 'about':
        return { title: 'About Us', desc: 'Discover our mission, advisory principles, and mathematical auditing procedures for high-fidelity calculators.' };
      case 'contact':
        return { title: 'Contact Us', desc: 'Get in touch with our chartered financial analysts and system developer team.' };
      case 'privacy':
        return { title: 'Privacy Policy', desc: 'Understand how we protect your browser cookies, local calculations, and data privacy.' };
      case 'terms':
        return { title: 'Terms of Service', desc: 'Read our client terms of use regarding standard informational calculators and calculators.' };
      case 'disclaimer':
        return { title: 'Financial Disclaimer Policy', desc: 'Official informational and non-fiduciary advisory disclaimer policy.' };
      case 'cookie':
        return { title: 'Cookie Settings Policy', desc: 'Information on browser-side analytics tracking cookies.' };
      case 'refund':
        return { title: 'Refund Policy', desc: 'Standard payment refund rules for our premium membership and corporate auditing.' };
      case 'editorial':
        return { title: 'Editorial Policy', desc: 'Auditing standards for our financial blog articles.' };
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
        <p className="text-xs text-slate-400 mt-2 uppercase tracking-widest font-bold">Calcfino Compliance</p>
      </div>

      <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-sm leading-relaxed text-sm space-y-6">

        {/* 1. ABOUT US VIEW */}
        {type === 'about' && (
          <div className="space-y-6">
            <p>
              Welcome to <strong>Calcfino.com</strong>, a premium client-side financial analytics environment designed to democratize high-precision mathematical auditing tools. Our workspace serves retail investors, small business owners, real estate evaluators, and personal savers globally.
            </p>
            
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b pb-1">
              <Sparkles className="w-4.5 h-4.5 text-blue-500" /> Our Mission
            </h2>
            <p>
              We believe that financial calculators shouldn't be cluttered with complex setups or hidden under paywalls. By leveraging cutting-edge web engineering, we deliver 70+ completely free calculators spanning EMI amortizations, mutual fund SIP compounding, tax shields, and portfolio simulations.
            </p>

            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b pb-1">
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" /> Precision & Integrity
            </h2>
            <p>
              Every equation inside our calculator registry is mapped directly from global financial standards, including CAGR logarithms, standard geometric Brownian motion formulas for Monte Carlo simulators, and the standard US/Indian progressive tax structures.
            </p>
          </div>
        )}

        {/* 2. CONTACT US VIEW */}
        {type === 'contact' && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Info rail */}
            <div className="md:col-span-2 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">Email Inquiries</span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">support@calcfino.com</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">Operational Hub</span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">One Financial Plaza, Suite 400, NY</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-cyan-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">Corporate Hotline</span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">+1 (800) 555-0199</span>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-2">Location Map Placeholder</span>
                <div className="w-full h-28 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 font-medium">
                  Google Maps API Map
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-3 border-l border-slate-100 dark:border-slate-800 pl-0 md:pl-6">
              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-100 dark:border-emerald-900/50 flex flex-col items-center gap-2 text-center animate-in scale-in-95 duration-200">
                  <CheckCircle className="w-10 h-10" />
                  Inquiry Dispatched!
                  <p className="text-xs text-slate-400 mt-2 font-normal">Our chartered team will respond within 24 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-500 block mb-1">Your Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 block mb-1">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">Brief Message</label>
                    <textarea
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Dispatch Inquiry Form
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* 3. PRIVACY POLICY */}
        {type === 'privacy' && (
          <div className="space-y-6">
            <p className="text-xs text-slate-400">Last updated: June 24, 2026</p>
            <p>
              Your privacy is critical to us. Because Calcfino.com is constructed as a client-side environment, your mathematical inputs and variables are parsed locally in your own browser cache. We do not store or transmit your financial salaries or liability profiles to external database servers.
            </p>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">1. Information We Track</h2>
            <p>
              We collect anonymous telemetry logs such as browser viewport dimensions and page tracking purely via Google Adsense cookies to target sponsors and measure loading performance speeds.
            </p>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">2. Local Storage Assets</h2>
            <p>
              "Saved Calculations" and "Profile Settings" are explicitly stored inside your local storage. If you clear your browser history or cache, these values are wiped from memory.
            </p>
          </div>
        )}

        {/* 4. TERMS OF CONDITIONS */}
        {type === 'terms' && (
          <div className="space-y-6">
            <p className="text-xs text-slate-400">Effective Date: June 2026</p>
            <p>
              By accessing Calcfino.com, you acknowledge that all calculations are derived from simplified formulas and do not constitute certified tax filings or professional investment directives.
            </p>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">1. Usage Limits</h2>
            <p>
              Users are welcome to print, distribute, or share calculations for educational or research purposes. Automated scraping or frame-permission embedding without appropriate citations is strictly prohibited.
            </p>
          </div>
        )}

        {/* 5. DISCLAIMER */}
        {type === 'disclaimer' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 text-amber-800 dark:text-amber-400 text-xs font-semibold flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <div>
                <span className="block font-bold mb-1">Non-Fiduciary Educational Notice</span>
                All mathematical computations, schedules, and blog articles hosted on Calcfino.com are designed exclusively for general informational and educational illustration. We do not act as registered fiduciary advisors, CPAs, or tax consultants.
              </div>
            </div>
            <p>
              Consult a qualified financial counselor or certified accountant before making substantial real estate down payments, investing real capital in high-risk cryptocurrency grids, or filing structural state tax exemptions.
            </p>
          </div>
        )}

        {/* 6. OTHER STANDARD LEGAL SECTIONS (COOKIE, EDITORIAL, REFUND) */}
        {['cookie', 'refund', 'editorial'].includes(type) && (
          <div className="space-y-6">
            <p>
              This document establishes our standard operational parameters for {meta.title}.
            </p>
            <p>
              If you have any detailed questions or wish to audit any of our mathematical models, please reach out to our legal compliance desk via our <strong>Contact Page</strong>.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
