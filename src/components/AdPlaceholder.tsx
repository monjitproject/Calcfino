import React from 'react';
import { Sparkles } from 'lucide-react';

interface AdPlaceholderProps {
  slot: string;
  height?: string;
  label?: string;
  className?: string;
}

export default function AdPlaceholder({ slot, height = '90px', label = 'Sponsored Link Unit', className = '' }: AdPlaceholderProps) {
  return (
    <div
      className={`relative w-full rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/20 p-2 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-200 hover:border-slate-200 dark:hover:border-slate-700/50 ${className}`}
      style={{ minHeight: height }}
      id={`google-adsense-slot-${slot}`}
    >
      {/* Background graphic grid */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_14px]" />
      
      <div className="relative z-10 flex flex-col items-center gap-1">
        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          <Sparkles className="w-3 h-3 text-slate-300 dark:text-slate-600 animate-pulse" />
          Advertisement
        </div>
        <span className="text-[10px] font-medium text-slate-400/80 dark:text-slate-500/80 max-w-xs truncate">
          {label} ({slot})
        </span>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-slate-200 dark:border-slate-700" />
      <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-slate-200 dark:border-slate-700" />
      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-slate-200 dark:border-slate-700" />
      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-slate-200 dark:border-slate-700" />
    </div>
  );
}
