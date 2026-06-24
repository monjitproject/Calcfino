import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, 
  Home, 
  Wallet, 
  Car, 
  GraduationCap, 
  TrendingUp, 
  TrendingDown, 
  Coins, 
  Calendar, 
  ArrowRight,
  Percent,
  DollarSign,
  ShieldCheck,
  Briefcase,
  Layers,
  Sparkles,
  HelpCircle,
  FileText
} from 'lucide-react';
import { Calculator as CalculatorType } from '../types';

interface PremiumCalculatorCardProps {
  key?: string | number;
  calc: CalculatorType;
  onNavigate: (view: string, params?: any) => void;
  index: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function PremiumCalculatorCard({ calc, onNavigate, index }: PremiumCalculatorCardProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  // Trigger custom ripple micro-interaction
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const cardElement = e.currentTarget;
    const rect = cardElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple: Ripple = {
      id: Date.now() + Math.random(),
      x,
      y
    };

    setRipples((prev) => [...prev, newRipple]);

    // Clean up ripple after animation completes (600ms)
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    // Route navigation
    onNavigate(`calculator-${calc.id}`, { id: calc.id });
  };

  // Define premium theme settings mapping based on ID or fallback category
  const getThemeConfig = (id: string, category: string) => {
    // Specific custom premium configurations matching the mockup styles
    switch (id) {
      case 'emi-calculator':
        return {
          badge: 'LOAN',
          tagBg: 'bg-blue-500/10 dark:bg-blue-500/20 border-blue-200/50 dark:border-blue-800/40',
          tagText: 'text-blue-600 dark:text-cyan-400',
          cardBorder: 'hover:border-blue-400/50 dark:hover:border-blue-500/40',
          cardGlow: 'hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.25)]',
          iconGradient: 'from-blue-600 to-indigo-500',
          iconGlow: 'shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)]',
          btnBg: 'bg-blue-600',
          btnHover: 'hover:bg-blue-700',
          illustration: (
            <div className="absolute right-[-10px] bottom-[-15px] opacity-[0.06] dark:opacity-[0.08] pointer-events-none select-none text-blue-500 font-sans font-black text-[120px] leading-none tracking-tight">
              %
            </div>
          ),
          icon3D: (
            <div className="relative w-12 h-12 flex items-center justify-center">
              {/* Outer shadow layers for 3D feel */}
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-[1px] rotate-3" />
              <div className="relative bg-white/90 dark:bg-slate-900 rounded-2xl p-2.5 shadow-lg border border-white dark:border-slate-800 flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                <Calculator className="w-6 h-6 text-blue-600 dark:text-cyan-400" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center border border-white dark:border-slate-900 shadow-sm">
                <span className="text-[8px] font-black text-amber-950 font-mono">%</span>
              </div>
            </div>
          )
        };

      case 'home-loan-emi-calculator':
        return {
          badge: 'LOAN',
          tagBg: 'bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-200/50 dark:border-emerald-800/40',
          tagText: 'text-emerald-600 dark:text-emerald-400',
          cardBorder: 'hover:border-emerald-400/50 dark:hover:border-emerald-500/40',
          cardGlow: 'hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.25)]',
          iconGradient: 'from-teal-500 to-emerald-400',
          iconGlow: 'shadow-[0_10px_20px_-5px_rgba(16,185,129,0.4)]',
          btnBg: 'bg-emerald-600',
          btnHover: 'hover:bg-emerald-700',
          illustration: (
            <div className="absolute right-[-15px] bottom-[-20px] opacity-[0.05] dark:opacity-[0.08] pointer-events-none select-none text-emerald-500">
              <Home className="w-36 h-36" strokeWidth={1} />
            </div>
          ),
          icon3D: (
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-[1px] -rotate-3" />
              <div className="relative bg-white/90 dark:bg-slate-900 rounded-2xl p-2.5 shadow-lg border border-white dark:border-slate-800 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Home className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full flex items-center justify-center border border-white dark:border-slate-900 shadow-sm">
                <span className="text-[8px] font-bold text-white">$</span>
              </div>
            </div>
          )
        };

      case 'personal-loan-emi-calculator':
        return {
          badge: 'LOAN',
          tagBg: 'bg-purple-500/10 dark:bg-purple-500/20 border-purple-200/50 dark:border-purple-800/40',
          tagText: 'text-purple-600 dark:text-purple-400',
          cardBorder: 'hover:border-purple-400/50 dark:hover:border-purple-500/40',
          cardGlow: 'hover:shadow-[0_20px_40px_-15px_rgba(147,51,234,0.25)]',
          iconGradient: 'from-purple-600 to-fuchsia-500',
          iconGlow: 'shadow-[0_10px_20px_-5px_rgba(147,51,234,0.4)]',
          btnBg: 'bg-purple-600',
          btnHover: 'hover:bg-purple-700',
          illustration: (
            <div className="absolute right-[-15px] bottom-[-20px] opacity-[0.05] dark:opacity-[0.08] pointer-events-none select-none text-purple-500">
              <Wallet className="w-36 h-36" strokeWidth={1} />
            </div>
          ),
          icon3D: (
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-[1px] rotate-6" />
              <div className="relative bg-white/90 dark:bg-slate-900 rounded-2xl p-2.5 shadow-lg border border-white dark:border-slate-800 flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                <Wallet className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center border border-white dark:border-slate-900 shadow-sm">
                <span className="text-[8px] font-black text-amber-950">★</span>
              </div>
            </div>
          )
        };

      case 'car-loan-emi-calculator':
        return {
          badge: 'LOAN',
          tagBg: 'bg-orange-500/10 dark:bg-orange-500/20 border-orange-200/50 dark:border-orange-800/40',
          tagText: 'text-orange-600 dark:text-orange-400',
          cardBorder: 'hover:border-orange-400/50 dark:hover:border-orange-500/40',
          cardGlow: 'hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.25)]',
          iconGradient: 'from-amber-500 to-orange-500',
          iconGlow: 'shadow-[0_10px_20px_-5px_rgba(249,115,22,0.4)]',
          btnBg: 'bg-orange-600',
          btnHover: 'hover:bg-orange-700',
          illustration: (
            <div className="absolute right-[-15px] bottom-[-15px] opacity-[0.05] dark:opacity-[0.08] pointer-events-none select-none text-orange-500">
              <Car className="w-36 h-36" strokeWidth={1} />
            </div>
          ),
          icon3D: (
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-[1px] -rotate-6" />
              <div className="relative bg-white/90 dark:bg-slate-900 rounded-2xl p-2.5 shadow-lg border border-white dark:border-slate-800 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Car className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          )
        };

      case 'education-loan-emi-calculator':
        return {
          badge: 'LOAN',
          tagBg: 'bg-violet-500/10 dark:bg-violet-500/20 border-violet-200/50 dark:border-violet-800/40',
          tagText: 'text-violet-600 dark:text-violet-400',
          cardBorder: 'hover:border-violet-400/50 dark:hover:border-violet-500/40',
          cardGlow: 'hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.25)]',
          iconGradient: 'from-indigo-600 to-violet-500',
          iconGlow: 'shadow-[0_10px_20px_-5px_rgba(139,92,246,0.4)]',
          btnBg: 'bg-violet-600',
          btnHover: 'hover:bg-violet-700',
          illustration: (
            <div className="absolute right-[-15px] bottom-[-15px] opacity-[0.05] dark:opacity-[0.08] pointer-events-none select-none text-violet-500">
              <GraduationCap className="w-36 h-36" strokeWidth={1} />
            </div>
          ),
          icon3D: (
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-[1px] rotate-3" />
              <div className="relative bg-white/90 dark:bg-slate-900 rounded-2xl p-2.5 shadow-lg border border-white dark:border-slate-800 flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                <GraduationCap className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
            </div>
          )
        };

      case 'sip-calculator':
        return {
          badge: 'INVESTMENT',
          tagBg: 'bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-200/50 dark:border-emerald-800/40',
          tagText: 'text-emerald-600 dark:text-emerald-400',
          cardBorder: 'hover:border-emerald-400/50 dark:hover:border-emerald-500/40',
          cardGlow: 'hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.25)]',
          iconGradient: 'from-emerald-500 to-green-400',
          iconGlow: 'shadow-[0_10px_20px_-5px_rgba(16,185,129,0.4)]',
          btnBg: 'bg-emerald-600',
          btnHover: 'hover:bg-emerald-700',
          illustration: (
            <div className="absolute right-[-10px] bottom-[-10px] opacity-[0.05] dark:opacity-[0.08] pointer-events-none select-none text-emerald-500">
              <TrendingUp className="w-36 h-36" strokeWidth={1} />
            </div>
          ),
          icon3D: (
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-[1px] rotate-3" />
              <div className="relative bg-white/90 dark:bg-slate-900 rounded-2xl p-2.5 shadow-lg border border-white dark:border-slate-800 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          )
        };

      case 'step-up-sip-calculator':
        return {
          badge: 'INVESTMENT',
          tagBg: 'bg-pink-500/10 dark:bg-pink-500/20 border-pink-200/50 dark:border-pink-800/40',
          tagText: 'text-pink-600 dark:text-pink-400',
          cardBorder: 'hover:border-pink-400/50 dark:hover:border-pink-500/40',
          cardGlow: 'hover:shadow-[0_20px_40px_-15px_rgba(236,72,153,0.25)]',
          iconGradient: 'from-rose-500 to-pink-500',
          iconGlow: 'shadow-[0_10px_20px_-5px_rgba(236,72,153,0.4)]',
          btnBg: 'bg-pink-600',
          btnHover: 'hover:bg-pink-700',
          illustration: (
            <div className="absolute right-[-15px] bottom-[-15px] opacity-[0.05] dark:opacity-[0.08] pointer-events-none select-none text-pink-500">
              <TrendingUp className="w-36 h-36" strokeWidth={1.5} />
            </div>
          ),
          icon3D: (
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-[1px] -rotate-3" />
              <div className="relative bg-white/90 dark:bg-slate-900 rounded-2xl p-2.5 shadow-lg border border-white dark:border-slate-800 flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                <TrendingUp className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
            </div>
          )
        };

      case 'lumpsum-calculator':
        return {
          badge: 'INVESTMENT',
          tagBg: 'bg-amber-500/10 dark:bg-amber-500/20 border-amber-200/50 dark:border-amber-800/40',
          tagText: 'text-amber-600 dark:text-amber-500',
          cardBorder: 'hover:border-amber-400/50 dark:hover:border-amber-500/40',
          cardGlow: 'hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.25)]',
          iconGradient: 'from-amber-500 to-yellow-400',
          iconGlow: 'shadow-[0_10px_20px_-5px_rgba(245,158,11,0.4)]',
          btnBg: 'bg-amber-600',
          btnHover: 'hover:bg-amber-700',
          illustration: (
            <div className="absolute right-[-15px] bottom-[-15px] opacity-[0.05] dark:opacity-[0.08] pointer-events-none select-none text-amber-500">
              <Coins className="w-36 h-36" strokeWidth={1} />
            </div>
          ),
          icon3D: (
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-[1px] rotate-6" />
              <div className="relative bg-white/90 dark:bg-slate-900 rounded-2xl p-2.5 shadow-lg border border-white dark:border-slate-800 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Coins className="w-6 h-6 text-amber-600 dark:text-amber-500" />
              </div>
            </div>
          )
        };

      case 'swp-calculator':
        return {
          badge: 'INVESTMENT',
          tagBg: 'bg-blue-500/10 dark:bg-blue-500/20 border-blue-200/50 dark:border-blue-800/40',
          tagText: 'text-blue-600 dark:text-cyan-400',
          cardBorder: 'hover:border-blue-400/50 dark:hover:border-blue-500/40',
          cardGlow: 'hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.25)]',
          iconGradient: 'from-blue-500 to-cyan-400',
          iconGlow: 'shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)]',
          btnBg: 'bg-blue-600',
          btnHover: 'hover:bg-blue-700',
          illustration: (
            <div className="absolute right-[-15px] bottom-[-15px] opacity-[0.05] dark:opacity-[0.08] pointer-events-none select-none text-blue-500">
              <Calendar className="w-36 h-36" strokeWidth={1} />
            </div>
          ),
          icon3D: (
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-[1px] rotate-3" />
              <div className="relative bg-white/90 dark:bg-slate-900 rounded-2xl p-2.5 shadow-lg border border-white dark:border-slate-800 flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-cyan-400" />
              </div>
            </div>
          )
        };
    }

    // Default fallbacks styled gracefully by Category
    const isTax = category === 'tax';
    const isSalary = category === 'salary';
    const isRetirement = category === 'retirement';
    const isSavings = category === 'savings';
    const isRealEstate = category === 'real-estate';
    const isBusiness = category === 'business';
    const isCrypto = category === 'crypto';
    const isStock = category === 'stock-market';

    let badgeText = category.toUpperCase().replace('-', ' ');
    let accent = 'blue';
    let iconColor = 'from-blue-600 to-indigo-500';
    let glow = 'hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.20)]';
    let tagCol = 'bg-blue-500/10 text-blue-600 border-blue-200/50 dark:bg-blue-500/20 dark:text-cyan-400 dark:border-blue-800/40';
    let btnCol = 'bg-blue-600';
    let iconElement = <Calculator className="w-6 h-6 text-blue-600 dark:text-cyan-400" />;

    if (isTax) {
      badgeText = 'TAX';
      iconColor = 'from-rose-500 to-orange-400';
      glow = 'hover:shadow-[0_20px_40px_-15px_rgba(239,68,68,0.20)]';
      tagCol = 'bg-rose-500/10 text-rose-600 border-rose-200/50 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-800/40';
      btnCol = 'bg-rose-600';
      iconElement = <Percent className="w-6 h-6 text-rose-600 dark:text-rose-400" />;
    } else if (isSalary) {
      badgeText = 'SALARY';
      iconColor = 'from-violet-500 to-fuchsia-400';
      glow = 'hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.20)]';
      tagCol = 'bg-violet-500/10 text-violet-600 border-violet-200/50 dark:bg-violet-500/20 dark:text-fuchsia-400 dark:border-violet-800/40';
      btnCol = 'bg-violet-600';
      iconElement = <Wallet className="w-6 h-6 text-violet-600 dark:text-fuchsia-400" />;
    } else if (isRetirement) {
      badgeText = 'RETIREMENT';
      iconColor = 'from-teal-600 to-emerald-400';
      glow = 'hover:shadow-[0_20px_40px_-15px_rgba(20,184,166,0.20)]';
      tagCol = 'bg-teal-500/10 text-teal-600 border-teal-200/50 dark:bg-teal-500/20 dark:text-emerald-400 dark:border-teal-800/40';
      btnCol = 'bg-teal-600';
      iconElement = <ShieldCheck className="w-6 h-6 text-teal-600 dark:text-emerald-400" />;
    } else if (isSavings) {
      badgeText = 'SAVINGS';
      iconColor = 'from-yellow-500 to-amber-500';
      glow = 'hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.20)]';
      tagCol = 'bg-amber-500/10 text-amber-600 border-amber-200/50 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-800/40';
      btnCol = 'bg-amber-600';
      iconElement = <Coins className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
    } else if (isRealEstate) {
      badgeText = 'REAL ESTATE';
      iconColor = 'from-emerald-500 to-cyan-500';
      glow = 'hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.20)]';
      tagCol = 'bg-emerald-500/10 text-emerald-600 border-emerald-200/50 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-800/40';
      btnCol = 'bg-emerald-600';
      iconElement = <Home className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
    } else if (isBusiness) {
      badgeText = 'BUSINESS';
      iconColor = 'from-blue-600 to-slate-500';
      glow = 'hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.20)]';
      tagCol = 'bg-blue-500/10 text-blue-600 border-blue-200/50 dark:bg-blue-500/20 dark:text-cyan-400 dark:border-blue-800/40';
      btnCol = 'bg-blue-600';
      iconElement = <Briefcase className="w-6 h-6 text-blue-600 dark:text-cyan-400" />;
    } else if (isCrypto) {
      badgeText = 'CRYPTO';
      iconColor = 'from-amber-500 to-yellow-400';
      glow = 'hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.20)]';
      tagCol = 'bg-amber-500/10 text-amber-600 border-amber-200/50 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-800/40';
      btnCol = 'bg-amber-600';
      iconElement = <Coins className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
    } else if (isStock) {
      badgeText = 'STOCKS';
      iconColor = 'from-teal-500 to-cyan-400';
      glow = 'hover:shadow-[0_20px_40px_-15px_rgba(20,184,166,0.20)]';
      tagCol = 'bg-teal-500/10 text-teal-600 border-teal-200/50 dark:bg-teal-500/20 dark:text-cyan-400 dark:border-teal-800/40';
      btnCol = 'bg-teal-600';
      iconElement = <TrendingUp className="w-6 h-6 text-teal-600 dark:text-cyan-400" />;
    }

    return {
      badge: badgeText,
      tagBg: tagCol.split(' ')[0] + ' ' + tagCol.split(' ')[2],
      tagText: tagCol.split(' ')[1] + ' ' + tagCol.split(' ')[3],
      cardBorder: 'hover:border-slate-300 dark:hover:border-slate-700',
      cardGlow: glow,
      iconGradient: iconColor,
      iconGlow: 'shadow-md',
      btnBg: btnCol,
      btnHover: btnCol.replace('bg-', 'hover:bg-'),
      illustration: (
        <div className="absolute right-[-15px] bottom-[-15px] opacity-[0.04] dark:opacity-[0.07] pointer-events-none select-none text-slate-400">
          <Calculator className="w-36 h-36" strokeWidth={1} />
        </div>
      ),
      icon3D: (
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 bg-white/20 rounded-2xl blur-[1px] rotate-3" />
          <div className="relative bg-white/90 dark:bg-slate-900 rounded-2xl p-2.5 shadow-lg border border-white dark:border-slate-800 flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
            {iconElement}
          </div>
        </div>
      )
    };
  };

  const theme = getThemeConfig(calc.id, calc.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      className={`group relative rounded-3xl border border-slate-100/70 dark:border-slate-800/70 bg-white dark:bg-[#0E1322] p-6 cursor-pointer overflow-hidden transition-all duration-300 transform hover:-translate-y-2 select-none ${theme.cardBorder} ${theme.cardGlow} shadow-sm dark:shadow-none flex flex-col justify-between h-[230px]`}
    >
      {/* 3D Gradient background reflection effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-10" />
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${theme.iconGradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 rounded-bl-full z-0`} />

      {/* Background illustration vectors matching theme */}
      {theme.illustration}

      {/* Ripple wave elements */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple-element"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 100,
            height: 100,
            marginLeft: -50,
            marginTop: -50,
          }}
        />
      ))}

      {/* Card Header Info */}
      <div className="relative z-10 flex justify-between items-start">
        {/* Category Badge */}
        <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${theme.tagBg} ${theme.tagText} shadow-sm`}>
          {theme.badge}
        </span>

        {/* Glossy 3D-effect Icon Container */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${theme.iconGradient} ${theme.iconGlow} p-0.5 flex items-center justify-center transform group-hover:scale-105 group-hover:rotate-1 group-hover:shadow-xl transition-all duration-300 relative`}>
          <div className="absolute inset-[0.5px] bg-gradient-to-b from-white/15 to-transparent rounded-[14px] z-10 pointer-events-none" />
          <div className="absolute top-[1.5px] left-[1.5px] right-[1.5px] h-[50%] bg-gradient-to-b from-white/25 to-transparent rounded-t-[13px] z-10 pointer-events-none" />
          
          <div className="relative z-20">
            {theme.icon3D}
          </div>
        </div>
      </div>

      {/* Card Body Title & Description */}
      <div className="relative z-10 mt-2">
        <h3 className="text-sm font-bold tracking-tight text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-1">
          {calc.name}
        </h3>
        <p className="text-[11.5px] text-slate-400 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2 pr-4">
          {calc.shortDescription}
        </p>
      </div>

      {/* Card Action Button Footer */}
      <div className="relative z-10 mt-4 flex items-center justify-between border-t border-slate-50 dark:border-slate-800/40 pt-4">
        {/* Launch Planner text and arrow */}
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-black text-blue-600 dark:text-cyan-400 tracking-wider uppercase group-hover:underline">
            Launch Planner
          </span>
        </div>

        {/* Interactive slide-slide action arrow container */}
        <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-[#090C15] border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-blue-600 dark:group-hover:bg-cyan-500 group-hover:border-transparent transition-all duration-300 transform group-hover:translate-x-1">
          <ArrowRight className="w-4 h-4 transform group-hover:scale-110 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}
