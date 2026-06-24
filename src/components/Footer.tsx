import React, { useState } from 'react';
import { Mail, Wallet, Linkedin, Twitter, Github, CheckCircle, ArrowRight } from 'lucide-react';
import AdPlaceholder from './AdPlaceholder';

interface FooterProps {
  onNavigate: (view: string, params?: any) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 font-sans border-t border-slate-800 app-footer" id="financehub-main-footer">

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-white">
              Calcfino<span className="text-blue-400 font-extrabold text-xs">.com</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            A premium fintech analytics platform empowering users with over 70+ high-precision financial calculators, interactive schedules, and structured personal assets growth guides.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Popular Categories */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-white">Calculator Categories</span>
          <ul className="mt-4 space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate('calculators-all')} className="hover:text-white transition-colors">
                Loan & EMI Calculators
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('calculators-all')} className="hover:text-white transition-colors">
                Compound SIP Investments
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('calculators-all')} className="hover:text-white transition-colors">
                Progressive Income Tax
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('calculators-all')} className="hover:text-white transition-colors">
                Retirement Planning & FIRE
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('calculators-all')} className="hover:text-white transition-colors">
                Advanced Portfolio Analytics
              </button>
            </li>
          </ul>
        </div>

        {/* Legal Pages */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-white">Legal & Compliance</span>
          <ul className="mt-4 space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate('about-us')} className="hover:text-white transition-colors">About Us</button>
            </li>
            <li>
              <button onClick={() => onNavigate('contact-us')} className="hover:text-white transition-colors">Contact Us</button>
            </li>
            <li>
              <button onClick={() => onNavigate('privacy-policy')} className="hover:text-white transition-colors">Privacy Policy</button>
            </li>
            <li>
              <button onClick={() => onNavigate('terms-conditions')} className="hover:text-white transition-colors">Terms of Service</button>
            </li>
            <li>
              <button onClick={() => onNavigate('disclaimer')} className="hover:text-white transition-colors">Disclaimer Policy</button>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="flex flex-col gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-white">Stay Financially Savvy</span>
          <p className="text-xs leading-relaxed text-slate-400">
            Subscribe to our weekly educational newsletter. No spam, just premium fintech insights and calculator tutorials.
          </p>
          
          {subscribed ? (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-950/40 border border-blue-900/50 text-blue-400 text-xs font-semibold animate-in fade-in duration-200">
              <CheckCircle className="w-4 h-4" />
              Subscribed successfully!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Bottom Compliance Disclaimer Bar */}
      <div className="border-t border-slate-800 bg-slate-950/50 py-6 text-center text-[10px] text-slate-500 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span>&copy; {new Date().getFullYear()} Calcfino.com. All sovereign rights reserved. Developed to satisfy high-precision mathematical auditing standards.</span>
          <div className="flex gap-4">
            <button onClick={() => onNavigate('cookie-policy')} className="hover:underline">Cookie Settings</button>
            <button onClick={() => onNavigate('editorial-policy')} className="hover:underline">Editorial Policies</button>
            <button onClick={() => onNavigate('refund-policy')} className="hover:underline">Refund Policy</button>
          </div>
        </div>
      </div>

    </footer>
  );
}
