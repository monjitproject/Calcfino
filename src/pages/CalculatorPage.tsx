import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  RefreshCw,
  Bookmark,
  Share2,
  Printer,
  Download,
  Info,
  CheckCircle,
  HelpCircle,
  FileText,
  Heart,
  Flame,
  ChevronRight,
  TrendingUp,
  Award,
  Calendar,
  DollarSign
} from 'lucide-react';
import { calculators } from '../data/calculators';
import { CalculationResult } from '../types';
import SEO, { getCalculatorSchema } from '../components/SEO';
import AdPlaceholder from '../components/AdPlaceholder';
import { useRegionalSettings } from '../context/RegionalSettingsContext';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line
} from 'recharts';

const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  const { currentPreset } = useRegionalSettings();

  const formatPreciseValue = (value: number, name: string) => {
    const lowerName = name.toLowerCase();
    
    if (lowerName.includes('rate') || lowerName.includes('percent') || lowerName.includes('percentage') || lowerName.includes('ratio')) {
      return new Intl.NumberFormat(currentPreset.locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      }).format(value) + '%';
    }
    
    if (lowerName.includes('year') || lowerName.includes('month') || lowerName.includes('days') || lowerName.includes('score') || lowerName.includes('factor')) {
      return new Intl.NumberFormat(currentPreset.locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(value);
    }
    
    const decimals = currentPreset.currency === 'JPY' ? 0 : 2;
    return new Intl.NumberFormat(currentPreset.locale, {
      style: 'currency',
      currency: currentPreset.currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  };

  const getProjectedDateString = (labelVal: any, payloadItems: any[]) => {
    if (labelVal === undefined || labelVal === null) return null;
    
    const firstItem = payloadItems[0] || {};
    const rawData = firstItem.payload || {};
    
    if (rawData.date) return rawData.date;
    if (rawData.month && rawData.year) {
      return `${rawData.month} ${rawData.year}`;
    }
    
    const numVal = Number(labelVal);
    const currentYear = 2026; // Match system current local date context: June 2026
    const currentMonthIndex = 5; // June (0-indexed)
    
    // Check if the label contains specific string patterns (like standard months)
    if (typeof labelVal === 'string') {
      if (/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i.test(labelVal)) {
        return `${labelVal} ${currentYear}`;
      }
      if (labelVal.toLowerCase().includes('year')) {
        return labelVal;
      }
    }

    // Check if it is a sequential year number (e.g., 1, 2, 3...)
    if (!isNaN(numVal) && numVal > 0 && numVal <= 100) {
      const projectedDate = new Date(currentYear + numVal, currentMonthIndex);
      const monthName = projectedDate.toLocaleString('default', { month: 'long' });
      const year = projectedDate.getFullYear();
      return `${monthName} ${year} (Year ${numVal})`;
    }
    
    // Check if label itself is a calendar year (e.g. 2026, 2030)
    if (!isNaN(numVal) && numVal > 1900 && numVal < 2100) {
      return `December ${numVal}`;
    }

    if (rawData.month !== undefined) {
      const mVal = Number(rawData.month);
      if (!isNaN(mVal)) {
        const projectedDate = new Date(currentYear, currentMonthIndex + mVal);
        const monthName = projectedDate.toLocaleString('default', { month: 'long' });
        const year = projectedDate.getFullYear();
        return `${monthName} ${year}`;
      }
    }
    
    return null;
  };

  const projectedDate = getProjectedDateString(label, payload);

  // Advanced calculation breakdowns for a premium user experience
  let breakdownContent = null;
  const firstPayload = payload[0]?.payload || {};
  
  if (firstPayload.wealth !== undefined && firstPayload.invested !== undefined) {
    const wealth = firstPayload.wealth;
    const invested = firstPayload.invested;
    const returns = Math.max(0, wealth - invested);
    const returnRate = invested > 0 ? (returns / invested) * 100 : 0;
    
    breakdownContent = (
      <div className="mt-2.5 pt-2 border-t border-slate-150 dark:border-slate-800/80 flex flex-col gap-1 text-[10px] text-slate-400 dark:text-slate-500">
        <div className="flex justify-between">
          <span>Investment Growth</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">+{returnRate.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Earnings</span>
          <span className="font-semibold text-slate-600 dark:text-slate-400 font-mono">
            {formatPreciseValue(returns, 'wealth')}
          </span>
        </div>
      </div>
    );
  } else if (firstPayload.principalPaid !== undefined && firstPayload.interestPaid !== undefined) {
    const principalPaid = firstPayload.principalPaid;
    const interestPaid = firstPayload.interestPaid;
    const totalPaid = principalPaid + interestPaid;
    const equityRatio = totalPaid > 0 ? (principalPaid / totalPaid) * 100 : 0;
    
    breakdownContent = (
      <div className="mt-2.5 pt-2 border-t border-slate-150 dark:border-slate-800/80 flex flex-col gap-1 text-[10px] text-slate-400 dark:text-slate-500">
        <div className="flex justify-between">
          <span>Equity Built</span>
          <span className="font-semibold text-blue-600 dark:text-cyan-400 font-mono">{equityRatio.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between">
          <span>Total Cumulative Outlay</span>
          <span className="font-semibold text-slate-600 dark:text-slate-400 font-mono">
            {formatPreciseValue(totalPaid, 'payment')}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border border-slate-200/60 dark:border-slate-800/80 shadow-2xl rounded-2xl p-4 text-xs text-slate-800 dark:text-slate-100 font-sans min-w-[240px] transition-all duration-150">
      {/* Date Header */}
      {projectedDate ? (
        <div className="flex items-center gap-2 border-b border-slate-150 dark:border-slate-800/80 pb-2 mb-2.5">
          <Calendar className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400 shrink-0" />
          <span className="font-bold text-slate-700 dark:text-slate-200 text-[11px] tracking-wide">{projectedDate}</span>
        </div>
      ) : label ? (
        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-150 dark:border-slate-800/80 pb-2 mb-2.5 flex items-center justify-between">
          <span>Metric Target</span>
          <span className="text-blue-600 dark:text-cyan-400 font-semibold">{label}</span>
        </div>
      ) : null}

      {/* Main Node values */}
      <div className="flex flex-col gap-2">
        {payload.map((item: any, index: number) => {
          const color = item.color || item.payload?.fill || '#3B82F6';
          const name = item.name || item.dataKey;
          const displayValue = formatPreciseValue(item.value, String(name));
          
          return (
            <div key={index} className="flex items-center justify-between gap-4 py-0.5">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 border border-white dark:border-slate-900 shadow-sm" style={{ backgroundColor: color }} />
                <span className="capitalize font-semibold text-[11px] tracking-tight">
                  {String(name).replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()}
                </span>
              </div>
              <span className="font-mono font-extrabold text-slate-900 dark:text-white text-[11.5px] text-right">
                {displayValue}
              </span>
            </div>
          );
        })}
      </div>

      {/* Advanced dynamic breakdowns */}
      {breakdownContent}
    </div>
  );
};

interface CalculatorPageProps {
  id: string;
  initialInputs?: Record<string, any>;
  onNavigate: (view: string, params?: any) => void;
}

export default function CalculatorPage({ id, initialInputs, onNavigate }: CalculatorPageProps) {
  const calc = calculators.find(c => c.id === id);
  const { currentPreset, formatNumber, formatCurrency } = useRegionalSettings();

  if (!calc) {
    return (
      <div className="text-center py-20 text-slate-400 text-xs">
        Calculator not found.
        <button onClick={() => onNavigate('home')} className="text-blue-500 underline ml-2">Back to Home</button>
      </div>
    );
  }

  // Manage dynamic inputs state
  const [inputs, setInputs] = useState<Record<string, any>>(() => {
    if (initialInputs) return initialInputs;
    const defaults: Record<string, any> = {};
    calc.inputs.forEach(input => {
      defaults[input.id] = input.defaultValue;
    });
    return defaults;
  });

  const [result, setResult] = useState<CalculationResult>(() => calc.calculate(inputs));
  const [isFavorite, setIsFavorite] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Live Currency Converter states
  const [liveExchangeRates, setLiveExchangeRates] = useState<Record<string, number> | null>(null);
  const [liveRatesStatus, setLiveRatesStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [liveLastUpdated, setLiveLastUpdated] = useState<string | null>(null);

  // Fetch live currency rates when converter inputs change
  useEffect(() => {
    if (id !== 'currency-converter') return;
    
    const fromCurrency = inputs.from || 'USD';
    setLiveRatesStatus('loading');
    
    let active = true;
    
    fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch exchange rates');
        return res.json();
      })
      .then(data => {
        if (active && data && data.rates) {
          setLiveExchangeRates(data.rates);
          setLiveRatesStatus('success');
          const now = new Date();
          setLiveLastUpdated(now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }
      })
      .catch(err => {
        console.error('Exchange rate fetch error:', err);
        if (active) {
          setLiveRatesStatus('error');
        }
      });
      
    return () => {
      active = false;
    };
  }, [inputs.from, id]);

  // Trigger calculations on input changes or regional configuration updates
  useEffect(() => {
    try {
      let calculated = calc.calculate(inputs);

      // Override with live exchange rates for currency-converter if available
      if (id === 'currency-converter' && liveExchangeRates && liveRatesStatus === 'success') {
        const amount = Number(inputs.amount || 1000);
        const from = String(inputs.from || 'USD');
        const to = String(inputs.to || 'EUR');
        
        const rate = liveExchangeRates[to];
        if (rate !== undefined) {
          const convertedAmount = amount * rate;
          
          const formatCustom = (val: number, curr: string) => {
            try {
              return new Intl.NumberFormat(undefined, {
                style: 'currency',
                currency: curr,
                maximumFractionDigits: curr === 'JPY' ? 0 : 2,
              }).format(val);
            } catch (e) {
              return `${curr} ${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            }
          };
          
          const comparisonCurrencies = ['USD', 'EUR', 'INR', 'GBP', 'JPY', 'CAD', 'AUD'].filter(c => c !== from);
          const chartData = comparisonCurrencies.map(curr => {
            const currRate = liveExchangeRates[curr] || 1.0;
            const convertedVal = amount * currRate;
            return {
              name: curr,
              Amount: Math.round(convertedVal),
            };
          });

          const schedule = comparisonCurrencies.map(curr => {
            const currRate = liveExchangeRates[curr] || 1.0;
            const convertedVal = amount * currRate;
            const rateAgainstFrom = currRate;
            return {
              currency: `${curr}`,
              rate: `1 ${from} = ${rateAgainstFrom.toFixed(4)} ${curr}`,
              amount: formatCustom(convertedVal, curr),
            };
          });
          
          calculated = {
            summary: [
              { label: 'Converted Amount', value: convertedAmount, formatted: formatCustom(convertedAmount, to), type: 'primary' },
              { label: 'Live Exchange Rate', value: rate, formatted: `1 ${from} = ${rate.toFixed(4)} ${to}`, type: 'secondary' },
              { label: 'Original Amount', value: amount, formatted: formatCustom(amount, from) }
            ],
            chartData,
            chartType: 'bar',
            chartKeys: ['Amount'],
            schedule,
            scheduleHeaders: [
              { key: 'currency', label: 'Currency' },
              { key: 'rate', label: 'Exchange Rate' },
              { key: 'amount', label: 'Converted Value' }
            ],
            formulaUsed: 'Target Amount = Base Amount * Live Exchange Rate'
          };
        }
      }

      setResult(calculated);
    } catch (err) {
      console.error('Calculation error:', err);
    }
  }, [inputs, id, currentPreset, liveExchangeRates, liveRatesStatus]);

  // Handle recently used registration
  useEffect(() => {
    const recent = localStorage.getItem('fh_recently_used');
    let list: string[] = [];
    if (recent) {
      list = JSON.parse(recent);
    }
    list = [id, ...list.filter(item => item !== id)].slice(0, 6);
    localStorage.setItem('fh_recently_used', JSON.stringify(list));

    // Handle initial favorite check
    const favs = localStorage.getItem('fh_favorites');
    if (favs) {
      const parsed = JSON.parse(favs);
      setIsFavorite(parsed.includes(id));
    }
  }, [id]);

  const handleInputChange = (fieldId: string, val: any) => {
    setInputs(prev => ({
      ...prev,
      [fieldId]: val,
    }));
  };

  const handleReset = () => {
    const defaults: Record<string, any> = {};
    calc.inputs.forEach(input => {
      defaults[input.id] = input.defaultValue;
    });
    setInputs(defaults);
    showToast('All parameters reset to factory defaults.');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Keyboard Accessibility Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Esc to clear/reset defaults
      if (e.key === 'Escape') {
        e.preventDefault();
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        handleReset();
      }

      // Enter to trigger recalculation pulse & verification toast
      if (e.key === 'Enter') {
        e.preventDefault();
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        
        // Dynamic visual confirmation pulse on the results pane
        const resultsEl = document.getElementById('calculator-results-pane');
        if (resultsEl) {
          resultsEl.classList.remove('animate-pulse');
          void resultsEl.offsetWidth; // Force Reflow
          resultsEl.classList.add('animate-pulse');
          setTimeout(() => {
            resultsEl.classList.remove('animate-pulse');
          }, 800);
        }
        
        showToast('Calculations synchronized & verified!');
      }

      // Alt + S to save calculation to member workspace
      if (e.altKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        handleSaveCalculation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputs, id, result]);

  const handleToggleFavorite = () => {
    const favs = localStorage.getItem('fh_favorites');
    let list: string[] = [];
    if (favs) {
      list = JSON.parse(favs);
    }

    let updated;
    if (list.includes(id)) {
      updated = list.filter(item => item !== id);
      setIsFavorite(false);
      showToast('Removed from Favorite Tools.');
    } else {
      updated = [...list, id];
      setIsFavorite(true);
      showToast('Pinned to Favorite Tools.');
    }
    localStorage.setItem('fh_favorites', JSON.stringify(updated));
  };

  const handleSaveCalculation = () => {
    const saved = localStorage.getItem('fh_saved_calculations');
    let list: any[] = [];
    if (saved) {
      list = JSON.parse(saved);
    }

    const newRecord = {
      id: `sc_${Date.now()}`,
      calculatorId: id,
      calculatorName: calc.name,
      timestamp: Date.now(),
      inputs,
      summary: result.summary.slice(0, 2).map(s => ({ label: s.label, formatted: s.formatted })),
    };

    localStorage.setItem('fh_saved_calculations', JSON.stringify([newRecord, ...list]));
    showToast('Saved to your member dashboard!');
  };

  const handleShare = () => {
    const queryParams = new URLSearchParams();
    Object.entries(inputs).forEach(([k, v]) => queryParams.set(k, String(v)));
    const shareUrl = `${window.location.origin}/calculator/${id}?${queryParams.toString()}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true);
      showToast('Shareable result link copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 3000);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCSV = () => {
    if (!result.schedule || result.schedule.length === 0) return;
    const headers = result.scheduleHeaders ? result.scheduleHeaders.map(h => h.label).join(',') : '';
    const rows = result.schedule.map(row => 
      result.scheduleHeaders ? result.scheduleHeaders.map(h => row[h.key]).join(',') : ''
    ).join('\n');
    
    const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${id}_schedule.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Amortization schedule downloaded as CSV.');
  };

  // Color theme variables for charts
  const CHART_COLORS = ['#2563EB', '#06B6D4', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6'];

  return (
    <div className="font-sans py-6 text-slate-800 dark:text-slate-100" id="calculator-detail-view">
      <SEO
        title={calc.seoTitle || `${calc.name} - Real-Time Analysis`}
        description={calc.seoDescription || calc.description}
        schema={getCalculatorSchema(calc.name, calc.description, window.location.href)}
      />

      {/* Back button and Favorite Trigger */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
          id="back-home-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Fintech Hub
        </button>

        <div className="flex gap-2">
          {/* Toast Notification Box */}
          {toastMessage && (
            <div className="mr-2 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-[10px] font-bold flex items-center gap-1.5 shadow-lg animate-in fade-in slide-in-from-right-3 duration-200">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              {toastMessage}
            </div>
          )}

          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-xl border transition-all ${isFavorite ? 'bg-rose-50 border-rose-200 text-rose-500' : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            id="toggle-fav-btn"
            aria-label="Save to Favorite list"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Above fold ad banner space */}
      <AdPlaceholder slot="calc-above-fold" height="90px" label="Sponsored Calculator Header Banner Ad" className="mb-6" />

      {/* Calculator Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Span (5): Interactive input controls */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0E1322] p-6 shadow-sm">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                {calc.name}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                {calc.description}
              </p>
              {id === 'currency-converter' && (
                <div className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-950/40 text-[10px] font-semibold">
                  {liveRatesStatus === 'loading' && (
                    <>
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">Syncing live exchange rates from global markets...</span>
                    </>
                  )}
                  {liveRatesStatus === 'success' && (
                    <>
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        Live exchange rates synced successfully {liveLastUpdated && `at ${liveLastUpdated}`}
                      </span>
                    </>
                  )}
                  {liveRatesStatus === 'error' && (
                    <>
                      <span className="flex h-2 w-2 relative">
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                      </span>
                      <span className="text-amber-600 dark:text-amber-400">
                        Failed to fetch rates. Using saved offline fallback rates.
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Input fields loop */}
            <div className="flex flex-col gap-5">
              {calc.inputs.map(input => (
                <div key={input.id} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <label htmlFor={`input-${input.id}`} className="flex items-center gap-1">
                      {input.label.replace('($)', `(${currentPreset.symbol})`).replace('$', currentPreset.symbol)}
                      {input.tooltip && (
                        <span className="group relative cursor-help text-slate-400" aria-label={input.tooltip}>
                          <Info className="w-3.5 h-3.5" />
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-44 rounded-lg bg-slate-950 p-2 text-[10px] font-normal leading-normal text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-md">
                            {input.tooltip}
                          </span>
                        </span>
                      )}
                    </label>

                    {/* Value readout display */}
                    <span className="font-bold text-blue-600 dark:text-cyan-400">
                      {input.type === 'boolean'
                        ? (inputs[input.id] ? 'Yes' : 'No')
                        : (input.label.includes('$') || input.label.includes('($)') || input.id.toLowerCase().includes('principal') || input.id.toLowerCase().includes('amount') || input.id.toLowerCase().includes('price') || input.id.toLowerCase().includes('salary'))
                          ? formatCurrency(inputs[input.id])
                          : formatNumber(inputs[input.id])}
                    </span>
                  </div>

                  {/* Render based on field type */}
                  {input.type === 'boolean' ? (
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleInputChange(input.id, !inputs[input.id])}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${inputs[input.id] ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'border-slate-200 dark:border-slate-850 text-slate-700 dark:text-slate-200'}`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInputChange(input.id, !inputs[input.id])}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${!inputs[input.id] ? 'bg-slate-700 border-slate-700 text-white' : 'border-slate-200 dark:border-slate-850 text-slate-700 dark:text-slate-200'}`}
                      >
                        No
                      </button>
                    </div>
                  ) : input.type === 'select' ? (
                    <select
                      id={`input-${input.id}`}
                      value={inputs[input.id]}
                      onChange={e => handleInputChange(input.id, Number(e.target.value) || e.target.value)}
                      className="w-full bg-slate-50 dark:bg-[#090C15] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-white focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      {input.options?.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      {/* Range slider */}
                      <input
                        type="range"
                        id={`input-${input.id}`}
                        min={input.min ?? 0}
                        max={input.max ?? 100}
                        step={input.step ?? 1}
                        value={inputs[input.id]}
                        onChange={e => handleInputChange(input.id, Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-600"
                      />
                      
                      {/* Manual input box */}
                      <input
                        type="number"
                        min={input.min ?? 0}
                        max={input.max ?? 100000000}
                        step={input.step ?? 1}
                        value={inputs[input.id]}
                        onChange={e => handleInputChange(input.id, Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-[#090C15] border border-slate-200/80 dark:border-slate-800/80 rounded-xl px-3 py-1.5 text-xs text-slate-800 dark:text-white"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Action panel */}
            <div className="grid grid-cols-2 gap-3 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleReset}
                className="py-2 px-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5"
                id="reset-calc-btn"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>
              <button
                onClick={handleSaveCalculation}
                className="py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 transition-all flex items-center justify-center gap-1.5"
                id="save-calc-btn"
              >
                <Bookmark className="w-3.5 h-3.5" />
                Save Result
              </button>
            </div>

            {/* Keyboard Shortcuts Legend Overlay */}
            <div className="mt-4 pt-3 border-t border-slate-100/60 dark:border-slate-800/60 flex justify-center gap-3 text-[10px] text-slate-400 dark:text-slate-500 select-none">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded text-[9px] font-mono shadow-sm font-bold text-slate-500 dark:text-slate-400">Enter</kbd>
                <span>Recalculate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded text-[9px] font-mono shadow-sm font-bold text-slate-500 dark:text-slate-400">Esc</kbd>
                <span>Reset</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded text-[9px] font-mono shadow-sm font-bold text-slate-500 dark:text-slate-400">Alt + S</kbd>
                <span>Save</span>
              </span>
            </div>
          </div>

          {/* Mathematical formulation block */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0E1322] p-6 shadow-sm">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Mathematical Formulation</span>
            <div className="p-3 bg-slate-50 dark:bg-[#090C15] border border-slate-100 dark:border-slate-800 rounded-xl mb-3 text-center">
              <code className="text-xs font-semibold text-blue-600 dark:text-cyan-400">{calc.formula}</code>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
              This financial module runs on raw client-side JavaScript math parameters, ensuring instant real-time calculations. No server latencies occur.
            </p>
          </div>
        </div>

        {/* Right Span (7): Visual charts & interactive schedules */}
        <div className="lg:col-span-7 flex flex-col gap-6" id="calculator-results-pane">
          
          {id === 'currency-converter' && liveRatesStatus === 'loading' ? (
            <div className="flex flex-col gap-6 animate-pulse" id="currency-loader-skeleton">
              {/* Skeleton for summary cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-[#0E1322] shadow-sm flex flex-col gap-3">
                  <div className="h-3 bg-slate-250 dark:bg-slate-800 rounded-md w-1/2"></div>
                  <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-3/4"></div>
                </div>
                <div className="p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-[#0E1322] shadow-sm flex flex-col gap-3">
                  <div className="h-3 bg-slate-250 dark:bg-slate-800 rounded-md w-1/2"></div>
                  <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-3/4"></div>
                </div>
                <div className="p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-[#0E1322] shadow-sm flex flex-col gap-3 col-span-2 md:col-span-1">
                  <div className="h-3 bg-slate-250 dark:bg-slate-800 rounded-md w-1/2"></div>
                  <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-3/4"></div>
                </div>
              </div>

              {/* Skeleton for visual report */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0E1322] p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/3"></div>
                  <div className="flex gap-2">
                    <div className="w-7 h-7 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse"></div>
                    <div className="w-7 h-7 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse"></div>
                  </div>
                </div>
                
                {/* Skeleton bar chart visualization */}
                <div className="h-64 md:h-72 flex items-end gap-3 px-2 pb-4 pt-10">
                  <div className="bg-slate-200/60 dark:bg-slate-800/60 rounded-t-lg w-full" style={{ height: '30%' }}></div>
                  <div className="bg-slate-200/60 dark:bg-slate-800/60 rounded-t-lg w-full" style={{ height: '60%' }}></div>
                  <div className="bg-slate-200/60 dark:bg-slate-800/60 rounded-t-lg w-full" style={{ height: '45%' }}></div>
                  <div className="bg-slate-200/60 dark:bg-slate-800/60 rounded-t-lg w-full" style={{ height: '85%' }}></div>
                  <div className="bg-slate-200/60 dark:bg-slate-800/60 rounded-t-lg w-full" style={{ height: '50%' }}></div>
                  <div className="bg-slate-200/60 dark:bg-slate-800/60 rounded-t-lg w-full" style={{ height: '70%' }}></div>
                  <div className="bg-slate-200/60 dark:bg-slate-800/60 rounded-t-lg w-full" style={{ height: '40%' }}></div>
                </div>
              </div>

              {/* Skeleton for table */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0E1322] p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-1/4"></div>
                  <div className="w-24 h-7 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                </div>
                <div className="space-y-3.5 mt-4">
                  <div className="grid grid-cols-3 gap-4 pb-2 border-b border-slate-150 dark:border-slate-800">
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-2/3"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-1/2"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4"></div>
                  </div>
                  {[1, 2, 3, 4].map(num => (
                    <div key={num} className="grid grid-cols-3 gap-4 py-1">
                      <div className="h-3 bg-slate-200/50 dark:bg-slate-800/40 rounded-md w-1/2"></div>
                      <div className="h-3 bg-slate-200/50 dark:bg-slate-800/40 rounded-md w-2/3"></div>
                      <div className="h-3 bg-slate-200/50 dark:bg-slate-800/40 rounded-md w-1/3"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Primary summary cards */}
              <div className="grid grid-cols-2 gap-4">
                {result.summary.map((sum, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-2xl border ${sum.type === 'primary' ? 'bg-blue-50/20 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50' : sum.type === 'secondary' ? 'bg-cyan-50/20 dark:bg-cyan-950/20 border-cyan-200 dark:border-cyan-900/50' : 'bg-white dark:bg-[#0E1322] border-slate-200/80 dark:border-slate-800/80'} shadow-sm flex flex-col gap-1`}
                  >
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{sum.label}</span>
                    <span className={`app-calc-result font-extrabold ${sum.type === 'primary' ? 'text-blue-600 dark:text-cyan-400' : sum.type === 'secondary' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-800 dark:text-slate-200'}`}>
                      {sum.formatted}
                    </span>
                  </div>
                ))}
              </div>

              {/* Interactive Chart Component Card */}
              {result.chartData && result.chartData.length > 0 && (
                <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0E1322] p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visual Analytics Report</span>
                    
                    {/* PDF & Share action triggers */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <button onClick={handleShare} className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg hover:text-blue-500 transition-colors" title="Copy Share Link">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button onClick={handlePrint} className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg hover:text-blue-500 transition-colors" title="Print Results">
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Rendering selected chart style */}
                  <div className="w-full h-64 md:h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      {result.chartType === 'pie' ? (
                        <PieChart>
                          <Pie
                            data={result.chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            innerRadius={45}
                            fill="#8884d8"
                            paddingAngle={4}
                          >
                            {result.chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomChartTooltip />} />
                          <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px' }} />
                        </PieChart>
                      ) : result.chartType === 'area' ? (
                        <AreaChart data={result.chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorInvest" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="year" stroke="#94A3B8" fontSize={10} tickLine={false} />
                          <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                          <Tooltip content={<CustomChartTooltip />} />
                          <Legend wrapperStyle={{ fontSize: '11px' }} />
                          <Area type="monotone" dataKey="wealth" name="Total Wealth" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#colorWealth)" />
                          <Area type="monotone" dataKey="invested" name="Principal Invested" stroke="#06B6D4" strokeWidth={1.5} fillOpacity={1} fill="url(#colorInvest)" />
                        </AreaChart>
                      ) : result.chartType === 'bar' ? (
                        <BarChart data={result.chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                          <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
                          <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                          <Tooltip content={<CustomChartTooltip />} />
                          <Bar dataKey="value" name="Amount ($)" radius={[4, 4, 0, 0]}>
                            {result.chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      ) : (
                        <LineChart data={result.chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                          <XAxis dataKey="year" stroke="#94A3B8" fontSize={10} tickLine={false} />
                          <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                          <Tooltip content={<CustomChartTooltip />} />
                          <Legend wrapperStyle={{ fontSize: '11px' }} />
                          {result.chartKeys?.map((key, index) => (
                            <Line key={key} type="monotone" dataKey={key} stroke={CHART_COLORS[index % CHART_COLORS.length]} strokeWidth={2} dot={false} />
                          ))}
                        </LineChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Detailed Amortization Table */}
              {result.schedule && result.schedule.length > 0 && (
                <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0E1322] p-6 shadow-sm overflow-hidden">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Maturity Amortization Schedule</span>
                    <button
                      onClick={handleDownloadCSV}
                      className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-1"
                      id="download-csv-btn"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download CSV
                    </button>
                  </div>

                  {/* Table Wrapper */}
                  <div className="w-full overflow-x-auto max-h-64 scrollbar-thin">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-bold uppercase text-[9px] bg-slate-50 dark:bg-[#090C15]">
                          {result.scheduleHeaders?.map(h => (
                            <th key={h.key} className="py-2.5 px-3 font-semibold">{h.label}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                        {result.schedule.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                            {result.scheduleHeaders?.map(h => (
                              <td key={h.key} className="py-2 px-3 font-medium">
                                {typeof row[h.key] === 'number' && h.key !== 'year'
                                  ? formatCurrency(row[h.key])
                                  : row[h.key]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Google Adsense Horizontal Ad space inside reports column */}
          <AdPlaceholder slot="calc-under-reports" height="120px" label="Responsive Horizontal Reports Ad" />

        </div>

      </div>

    </div>
  );
}
