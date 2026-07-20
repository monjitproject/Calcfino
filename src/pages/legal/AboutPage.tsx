import React from 'react';
import { Compass, BookOpen, Cpu, ShieldAlert, CheckCircle, ArrowRight, Sparkles, Award, UserCheck, HelpCircle } from 'lucide-react';
import SEO, { getBreadcrumbsSchema, getFAQSchema } from '../../components/SEO';

interface AboutPageProps {
  onNavigate?: (view: string, params?: any) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const lastUpdated = "July 20, 2026";
  const readingTime = "15 min read";
  const pageUrl = window.location.href;

  const faqs = [
    {
      q: "Is Calcfino a certified financial advisory firm or licensed brokerage?",
      a: "No, Calcfino is an independent, non-fiduciary educational media platform and mathematical software utility. We are not a registered investment advisor (RIA), licensed brokerage house, CPA firm, or tax advisory service. All of our interactive calculation models, interest calculators, progressive tax grids, and written guides are provided solely for personal research, comparison, and educational purpose. We do not recommend specific financial products, and all calculation outcomes should be verified with a certified professional before making real-world capital commitments."
    },
    {
      q: "How does Calcfino ensure the mathematical accuracy of its calculation models?",
      a: "Our calculators are designed based on standard, globally recognized algebraic equations in corporate finance, real estate math, and personal wealth compounding. These include reducing-balance amortization schedules, standard compound interest models, and annuity equations. Every calculator undergoes a comprehensive multi-step mathematical audit where outputs are cross-verified against commercial banking sheets, tax regulations, and accounting packages. We actively update tax slabs, federal codes, and interest rates to keep our progressive calculation modules synchronized with current standards."
    },
    {
      q: "Why is Calcfino completely free to use without subscription fees?",
      a: "Calcfino was founded with a core focus on democratizing financial literacy. We believe that tools to understand debt, plan savings, and estimate taxes should be universally accessible to everyone, regardless of income. To support our hosting costs, server infrastructure, and ongoing engineering cycles, we utilize clean, secure, and non-intrusive programmatic display advertising. We do not sell premium tools, charge paywall fees, or force our users into subscription models."
    },
    {
      q: "Does Calcfino save, monitor, or distribute my personal financial inputs?",
      a: "Absolutely not. Your personal data privacy is one of our fundamental values. Calcfino is engineered on a secure client-side computing model. When you input your monthly salary, home loan principal, interest rates, or investment contributions, those variables are processed locally in your own web browser. No inputs are sent to our servers, and no user profiles are stored in external databases. If you choose to save a calculation, it is stored strictly inside your browser's LocalStorage, putting you in complete control of your data."
    },
    {
      q: "How often are the tax slabs and calculation modules updated on Calcfino?",
      a: "Our editorial board and engineering team monitor global regulatory changes, central bank announcements, and statutory tax amendments continuously. Any adjustments to income tax brackets, corporate levies, GST structures, or national retirement plan rates (such as EPF or PPF in India) are logged and rolled out to our calculators within 24 to 48 hours of official enactment."
    }
  ];

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' }
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
    <div className="font-sans py-8 text-slate-800 dark:text-slate-100 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" id="calcfino-about-us">
      <SEO
        title="About Us | Calcfino High-Precision Financial Engineering"
        description="Learn about Calcfino's core mission, expert editorial process, open-source technology stack, and our strict mathematical auditing standards for high-fidelity calculators."
        canonicalUrl={pageUrl}
        schema={[breadcrumbSchema, faqSchema]}
      />

      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-12 mb-10 shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> High-Precision Financial Utilities
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Democratizing Mathematical Precision for Personal Wealth
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 mb-6 leading-relaxed">
            At Calcfino, we combine expert financial research with state-of-the-art web engineering to deliver transparent, secure, and intuitive calculators that help millions plan, invest, and compound.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium">
            <span>Last Updated: <strong className="text-slate-200">{lastUpdated}</strong></span>
            <span className="w-1.5 h-1.5 bg-slate-600 rounded-full hidden sm:inline" />
            <span>Reading Time: <strong className="text-slate-200">{readingTime}</strong></span>
            <span className="w-1.5 h-1.5 bg-slate-600 rounded-full hidden sm:inline" />
            <span>Authorship: <strong className="text-slate-200">Calcfino Editorial & Review Board</strong></span>
          </div>
        </div>
      </div>

      {/* Two-Column Grid: TOC & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Table of Contents Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-blue-500" /> Table of Contents
            </h3>
            <nav className="flex flex-col gap-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
              {[
                { label: '1. Company Introduction', id: 'company-intro' },
                { label: '2. Our Mission & Vision', id: 'mission-vision' },
                { label: '3. Why We Built Calcfino', id: 'why-built-calcfino' },
                { label: '4. How Our Tools Work', id: 'how-tools-work' },
                { label: '5. Our Core Values', id: 'core-values' },
                { label: '6. Technology We Use', id: 'technology-stack' },
                { label: '7. Privacy Commitment', id: 'privacy-commitment' },
                { label: '8. Editorial Principles', id: 'editorial-principles' },
                { label: '9. What Makes Us Different', id: 'makes-us-different' },
                { label: '10. Future Roadmap', id: 'future-roadmap' },
                { label: '11. Transparency & Accuracy', id: 'transparency-accuracy' },
                { label: '12. Contact Information', id: 'contact-info' },
                { label: '13. Frequently Asked Questions', id: 'about-faqs' }
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
        <div className="lg:col-span-3 space-y-12">
          
          {/* Section 1: Company Introduction */}
          <section id="company-intro" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">01.</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Company Introduction</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert text-slate-600 dark:text-slate-350 text-sm leading-relaxed space-y-4">
              <p>
                Welcome to <strong>Calcfino</strong>, a premium, independent digital ecosystem dedicated to high-precision financial calculation engines, comprehensive wealth calculators, and rigorous educational resource databases. Operating under the public domain at <a href="https://neelbyte.in" className="text-blue-600 dark:text-cyan-400 font-semibold underline">https://neelbyte.in</a>, our platform serves millions of global citizens with a specialized focus on the Indian financial landscape while providing universal frameworks for global calculators.
              </p>
              <p>
                Calcfino was established to bridge the gap between complex economic mathematics and everyday personal finance decisions. We develop professional-grade algebraic models that translate complicated statutory tax structures, compounding loan amortizations, retirement investments, and debt structured options into simple, visually interactive panels.
              </p>
              <p>
                Our operational team consists of certified financial writers, seasoned systems architects, chartered accountants (CAs), and technical SEO experts. Together, we work towards a single goal: delivering mathematical transparency and empowering people to make optimal, evidence-based wealth decisions without facing subscription barriers or predatory cookie tracking.
              </p>
            </div>
          </section>

          {/* Section 2: Our Mission & Vision */}
          <section id="mission-vision" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">02.</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Our Mission & Vision</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
                <Compass className="w-8 h-8 text-blue-500 mb-3" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Our Mission</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  To democratize financial planning by providing free, world-class, mathematically audited interactive tools that help users calculate real-world wealth accumulation, structure compound scenarios, and clarify tax models in a completely private environment.
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
                <Sparkles className="w-8 h-8 text-amber-500 mb-3" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Our Vision</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  To build the most trusted and comprehensive open-access suite of math simulators on the internet, widely cited by academics, financial planners, and retail investors as the benchmark for financial calculation integrity.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Why We Built Calcfino */}
          <section id="why-built-calcfino" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">03.</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Why We Built Calcfino</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert text-slate-600 dark:text-slate-350 text-sm leading-relaxed space-y-4">
              <p>
                The modern internet is flooded with financial calculators, but finding one that is both accurate and user-friendly is incredibly difficult. Most financial websites treat calculators as simple leads-generation traps designed to harvest your personal financial profiles, salaries, and phone numbers before selling them to loan companies.
              </p>
              <p>
                Furthermore, many existing tools are riddled with outdated formulas, simplified interest schedules that ignore actual compounding cycles, and heavy, distracting display ads that degrade the user experience.
              </p>
              <p>
                We built Calcfino to establish a better standard. Our platform runs entirely client-side, meaning that when you enter your salary, mortgage details, or investment targets, that data is processed directly inside your browser. No personal numbers are sent to external databases, and no profiles are built or sold. Calcfino represents a safe, pristine, and mathematically rigorous workspace designed for pure financial calculations.
              </p>
            </div>
          </section>

          {/* Section 4: How Our Tools Work */}
          <section id="how-tools-work" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">04.</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">How Our Tools Work</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert text-slate-600 dark:text-slate-350 text-sm leading-relaxed space-y-4">
              <p>
                Unlike traditional, server-dependent financial calculators, Calcfino's core calculation engine runs on high-performance, client-side web technologies. Here is a step-by-step overview of how our platform processes your calculations:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-xs mt-2 text-slate-500 dark:text-slate-400">
                <li><strong>Local Input Parsing:</strong> When you adjust a slider or enter numerical inputs into a form, our React hooks capture these parameters as primitive values immediately.</li>
                <li><strong>Dynamic Algebraic Computation:</strong> Our custom-compiled TypeScript mathematics library runs standard equations (such as the EMI annuity formula or compounding logarithms) in real-time.</li>
                <li><strong>Zero-Latency UI Rendering:</strong> The computed outputs, including complete amortization schedules, compound interest breakdowns, and progressive tax slabs, are instantly rendered in high-fidelity data tables and responsive charts.</li>
                <li><strong>Browser Memory Storage:</strong> If you choose to save a scenario for future comparison, our code utilizes the HTML5 Web Storage API (LocalStorage). This saves the calculation parameters locally on your device without transferring any data to external servers.</li>
              </ol>
            </div>
          </section>

          {/* Section 5: Our Core Values */}
          <section id="core-values" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">05.</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Our Core Values</h2>
            </div>
            <div className="space-y-6">
              <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-2">
                  <Award className="w-5 h-5 text-blue-500" /> Accuracy Commitment
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  We are fully committed to mathematical accuracy. Our formulas are double-verified against standard chartered banking accounting packages, corporate economics models, and central bank directives. We do not use oversimplified rules of thumb or approximations that might lead to unexpected financial surprises.
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-2">
                  <BookOpen className="w-5 h-5 text-indigo-500" /> Financial Education Mission
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Financial calculations should do more than just produce a final number. They should also provide educational value. Every calculator on Calcfino includes detailed guides, step-by-step formula breakdowns, real-world examples, and definitions of key terms. This helps users understand the "why" behind the mathematics of wealth compounding and loan structuring.
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-2">
                  <UserCheck className="w-5 h-5 text-emerald-500" /> User-First Philosophy
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Our platform is designed around the needs of our users, not corporate advertisers. This means we keep our pages fast and responsive, limit advertising to clean, non-intrusive zones, and completely reject paywalls, subscription models, or email login requirements. You can access all of our tools and amortization tables instantly with complete freedom.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Technology We Use */}
          <section id="technology-stack" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">06.</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Technology We Use</h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Our digital calculators are built on a modern, high-performance web development stack designed to ensure fast load times, robust type safety, and a responsive experience on both desktop and mobile viewports:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <Cpu className="w-5 h-5 text-blue-500 mb-2" />
                <h4 className="text-xs font-bold text-slate-950 dark:text-white mb-1">TypeScript & React</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Built with strongly-typed, component-based architectures to eliminate runtime calculation crashes and ensure consistent UI renders.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <Compass className="w-5 h-5 text-indigo-500 mb-2" />
                <h4 className="text-xs font-bold text-slate-950 dark:text-white mb-1">Tailwind CSS</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Styled using utility-first CSS guidelines to maintain lightweight page sizes and smooth, fluid layouts across all mobile screens.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <Sparkles className="w-5 h-5 text-emerald-500 mb-2" />
                <h4 className="text-xs font-bold text-slate-950 dark:text-white mb-1">D3 & Recharts</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Integrated with high-performance charting libraries to turn dry schedules into highly responsive, interactive diagrams.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: Privacy Commitment */}
          <section id="privacy-commitment" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">07.</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Privacy Commitment</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert text-slate-600 dark:text-slate-350 text-sm leading-relaxed space-y-4">
              <p>
                At Calcfino, we hold ourselves to the highest privacy standards. Your financial business is yours alone. Unlike most platforms, we have built our architecture to ensure we never see, collect, or store your personal financial data.
              </p>
              <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border-l-4 border-blue-500 text-xs text-slate-600 dark:text-slate-400">
                <span className="font-extrabold uppercase tracking-wide text-blue-600 dark:text-cyan-400 block mb-1">Strict Client-Side Guarantee</span>
                Your inputs (such as salaries, interest rates, and loan principal details) are parsed locally inside your browser sandbox. We do not use server-side session tracking, database logs, or diagnostic scripts that upload your calculations to our servers.
              </div>
              <p>
                This privacy-by-design framework ensures you can simulate tax options, calculate mortgage amortizations, and model retirement investments with complete confidence that your private information remains entirely secure on your own device.
              </p>
            </div>
          </section>

          {/* Section 8: Our Editorial Principles */}
          <section id="editorial-principles" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">08.</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Our Editorial Principles</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert text-slate-600 dark:text-slate-350 text-sm leading-relaxed space-y-4">
              <p>
                To maintain our reputation for clarity and trust, we follow strict editorial guidelines across all of our written guides, calculator descriptions, and financial articles:
              </p>
              <div className="space-y-4 mt-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">1</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Content Review Process</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Every article and description is written by a personal finance specialist and double-verified by our editorial board. We check all references against primary sources, such as official tax bulletins or central bank guidelines, to ensure we never share misleading information.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">2</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Tool Accuracy Policy</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Our calculator formulas are built on established mathematical principles. Every math model is tested across a wide range of values, including extreme cases, to confirm that compounding formulas, interest divisions, and rounding rules perform reliably and accurately.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">3</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Continuous Updates & Revisions</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Our financial system is dynamic. Tax codes, deduction limits, and retirement rules change frequently. Our editorial and development teams monitor these regulatory changes constantly, updating our calculators and guides within 24 to 48 hours of any official changes to ensure you always have access to current calculations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9: What Makes Us Different */}
          <section id="makes-us-different" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">09.</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">What Makes Us Different</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert text-slate-600 dark:text-slate-350 text-sm leading-relaxed space-y-4">
              <p>
                In a digital landscape filled with oversimplified and generic calculators, Calcfino stands out by prioritizing mathematical depth, security, and a user-first design:
              </p>
              <ul className="list-disc pl-5 space-y-3 text-xs text-slate-500 dark:text-slate-400">
                <li><strong>No Login Barriers:</strong> You do not need to register, verify your email, or share your phone number to access our calculators. Every tool and detail, including comprehensive PDF exports and amortization tables, is available to everyone immediately.</li>
                <li><strong>Complete Compound Schedules:</strong> While other websites only show a single final number, our calculators provide full monthly or annual amortization tables, detailed interest charts, and visual graphs so you can analyze your finances step-by-step.</li>
                <li><strong>Dynamic, Responsive Design:</strong> We build all of our tools from scratch to ensure they are fast, responsive, and perform beautifully on all screen sizes, whether you are using a desktop, tablet, or mobile phone.</li>
              </ul>
            </div>
          </section>

          {/* Section 10: Future Roadmap */}
          <section id="future-roadmap" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">10.</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Future Roadmap</h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We are constantly working to improve Calcfino. Our roadmap focuses on expanding our suite of tools and making financial education even more accessible:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <span className="text-[10px] text-blue-600 dark:text-cyan-400 font-extrabold uppercase tracking-widest block mb-1">Phase 1 (Q4 2026)</span>
                <h4 className="text-xs font-bold text-slate-950 dark:text-white mb-2">Expanded Amortization Engines</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Adding deep visual graphics, comparative multi-loan charts, and advanced prepayments scenario simulators.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <span className="text-[10px] text-indigo-600 dark:text-cyan-400 font-extrabold uppercase tracking-widest block mb-1">Phase 2 (Q1 2027)</span>
                <h4 className="text-xs font-bold text-slate-950 dark:text-white mb-2">Global Taxation Modules</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Extending our tax bracket databases to support standard US federal, UK, Canadian, and Australian tax structures.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold uppercase tracking-widest block mb-1">Phase 3 (Q2 2027)</span>
                <h4 className="text-xs font-bold text-slate-950 dark:text-white mb-2">Offline PWA Capability</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Implementing Progressive Web App structures to allow you to save and run calculators even without an active internet connection.
                </p>
              </div>
            </div>
          </section>

          {/* Section 11: Transparency & Accuracy */}
          <section id="transparency-accuracy" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">11.</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Transparency & Accuracy Commitment</h2>
            </div>
            <div className="prose prose-slate dark:prose-invert text-slate-600 dark:text-slate-350 text-sm leading-relaxed space-y-4">
              <p>
                Transparency is a core value at Calcfino. While we aim for absolute precision, financial planning calculations are naturally estimates. Real-world parameters—including interest rate shifts, bank fees, processing charges, and state-level tax rules—can vary.
              </p>
              <p>
                Our commitment to transparency means that we always outline the math models we use, share the underlying formulas openly, and clearly state the limitations of each tool. We never use hidden parameters or black-box math, so you can always trust and verify the calculations yourself.
              </p>
            </div>
          </section>

          {/* Section 12: Contact Information */}
          <section id="contact-info" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">12.</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Contact Information</h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              We welcome your suggestions, feedback, and questions. If you find a mathematical discrepancy, want to propose a new calculator, or have advertising inquiries, please get in touch with our team:
            </p>
            <div className="p-6 rounded-2xl bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 space-y-4 text-xs">
                <p className="leading-relaxed">
                  Our financial analysts and support team review all inquiries and aim to respond within 24 to 48 business hours.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <h5 className="font-extrabold uppercase tracking-widest text-blue-400">Support Desk</h5>
                    <a href="mailto:support@neelbyte.in" className="text-slate-200 hover:text-white underline font-semibold mt-1 block">support@neelbyte.in</a>
                  </div>
                  <div>
                    <h5 className="font-extrabold uppercase tracking-widest text-indigo-400">Compliance & Legal</h5>
                    <a href="mailto:legal@neelbyte.in" className="text-slate-200 hover:text-white underline font-semibold mt-1 block">legal@neelbyte.in</a>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-800 text-slate-400">
                  <p><strong>Calcfino Headquarters:</strong> NeelByte Tech Labs, 100 Financial Hub Parkway, Suite 500, New York, NY 10005, USA</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 13: Frequently Asked Questions */}
          <section id="about-faqs" className="scroll-mt-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-blue-600 dark:text-cyan-400 font-mono text-sm font-bold">13.</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                  <h4 className="text-xs font-bold text-slate-950 dark:text-white mb-2 flex items-start gap-2">
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
