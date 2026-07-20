import React, { useState, useEffect } from 'react';
import { Bookmark, Clock, User, Award, CheckCircle, Settings, Trash2, Play, Heart, Target, ChevronRight, TrendingUp, BarChart2, Calendar } from 'lucide-react';
import { SavedCalculation, UserProfile } from '../types';
import { calculators } from '../data/calculators';
import { useRegionalSettings } from '../context/RegionalSettingsContext';
import SeoAuditPanel from './SeoAuditPanel';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell
} from 'recharts';

interface DashboardProps {
  onNavigate: (view: string, params?: any) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { currentPreset, formatCurrency, formatNumber } = useRegionalSettings();
  const [savedCalcs, setSavedCalcs] = useState<SavedCalculation[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([]);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Alex Mercer',
    email: 'alex.mercer@fintech.com',
    financialGoal: 'Buy a Home Down Payment',
    targetAmount: 50000,
    monthlySavings: 800,
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<UserProfile>({ ...profile });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [activeTab, setActiveTab] = useState<'goal' | 'saved' | 'usage' | 'seo'>('goal');

  // 1. Goal projection trend data
  const goalTrendData = Array.from({ length: 12 }, (_, i) => {
    const monthNum = i + 1;
    // Assume start at 65% of target goal
    const accumulated = (profile.targetAmount * 0.65) + (profile.monthlySavings * i);
    
    // Growth with 6% annualized return (0.5% monthly compound)
    const startingPrincipal = profile.targetAmount * 0.65;
    const investedVal = startingPrincipal * Math.pow(1.005, i) + 
      profile.monthlySavings * ((Math.pow(1.005, i) - 1) / 0.005);
    
    return {
      name: `Month ${monthNum}`,
      'Cash Savings': Math.round(accumulated),
      'Investment Growth (6%)': Math.round(investedVal),
    };
  });

  // Helper to parse strings like "$252,286" or "INR 5,000" into numbers
  const parseNumericValue = (str: string): number => {
    const digitsOnly = str.replace(/[^\d.-]/g, '');
    const parsed = parseFloat(digitsOnly);
    return isNaN(parsed) ? 0 : parsed;
  };

  // 2. Saved calculations chart data
  const savedCalcsChartData = savedCalcs.map(item => {
    const primarySummary = item.summary[0];
    const val = primarySummary ? parseNumericValue(primarySummary.formatted) : 0;
    const label = primarySummary ? primarySummary.label : 'Result';
    return {
      name: item.calculatorName.replace(' Calculator', ''),
      Value: val,
      Metric: label,
      formatted: primarySummary ? primarySummary.formatted : '0',
    };
  });

  // 3. Category distribution data
  const categoryCounts: Record<string, number> = {};
  const allInteractions = [...favorites, ...recentlyUsed];
  allInteractions.forEach(id => {
    const calc = calculators.find(c => c.id === id);
    if (calc) {
      categoryCounts[calc.category] = (categoryCounts[calc.category] || 0) + 1;
    }
  });

  const categoryChartData = Object.entries(categoryCounts).map(([cat, count]) => ({
    name: cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' '),
    Count: count,
  }));

  // Load from local storage on mount
  useEffect(() => {
    const localCalcs = localStorage.getItem('fh_saved_calculations');
    if (localCalcs) {
      setSavedCalcs(JSON.parse(localCalcs));
    } else {
      // Pre-seed some default saved calculations to make the dashboard look stunning instantly!
      const initialSaved: SavedCalculation[] = [
        {
          id: 'sc1',
          calculatorId: 'sip-calculator',
          calculatorName: 'SIP Calculator',
          timestamp: Date.now() - 3600000 * 24,
          inputs: { monthly: 500, rate: 12, years: 15 },
          summary: [
            { label: 'Expected Wealth', formatted: '$252,286' },
            { label: 'Total Invested', formatted: '$90,000' },
          ],
        },
        {
          id: 'sc2',
          calculatorId: 'emi-calculator',
          calculatorName: 'EMI Calculator',
          timestamp: Date.now() - 3600000 * 48,
          inputs: { principal: 150000, rate: 7.5, tenure: 20 },
          summary: [
            { label: 'Monthly EMI', formatted: '$1,208' },
            { label: 'Total Paid', formatted: '$290,013' },
          ],
        }
      ];
      localStorage.setItem('fh_saved_calculations', JSON.stringify(initialSaved));
      setSavedCalcs(initialSaved);
    }

    const localFavs = localStorage.getItem('fh_favorites');
    if (localFavs) {
      setFavorites(JSON.parse(localFavs));
    } else {
      const initialFavs = ['sip-calculator', 'emi-calculator', 'income-tax-calculator'];
      localStorage.setItem('fh_favorites', JSON.stringify(initialFavs));
      setFavorites(initialFavs);
    }

    const localRecent = localStorage.getItem('fh_recently_used');
    if (localRecent) {
      setRecentlyUsed(JSON.parse(localRecent));
    } else {
      const initialRecent = ['sip-calculator', 'emi-calculator', 'budget-planner'];
      localStorage.setItem('fh_recently_used', JSON.stringify(initialRecent));
      setRecentlyUsed(initialRecent);
    }

    const localProfile = localStorage.getItem('fh_user_profile');
    if (localProfile) {
      const parsed = JSON.parse(localProfile);
      setProfile(parsed);
      setFormData(parsed);
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    localStorage.setItem('fh_user_profile', JSON.stringify(formData));
    setEditMode(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedCalcs.filter(c => c.id !== id);
    setSavedCalcs(updated);
    localStorage.setItem('fh_saved_calculations', JSON.stringify(updated));
  };

  const handleToggleFavorite = (calcId: string) => {
    let updated;
    if (favorites.includes(calcId)) {
      updated = favorites.filter(id => id !== calcId);
    } else {
      updated = [...favorites, calcId];
    }
    setFavorites(updated);
    localStorage.setItem('fh_favorites', JSON.stringify(updated));
  };

  // Calculate goal progress metrics
  const monthsToGoal = profile.monthlySavings > 0 ? Math.ceil(profile.targetAmount / profile.monthlySavings) : 0;
  const yearsToGoal = (monthsToGoal / 12).toFixed(1);

  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="backdrop-blur-md bg-white/95 dark:bg-slate-950/95 border border-slate-200/50 dark:border-slate-800/80 shadow-2xl rounded-2xl p-3.5 text-xs text-slate-800 dark:text-slate-100 font-sans min-w-[210px]">
        <p className="font-bold text-slate-900 dark:text-white mb-2 pb-1 border-b border-slate-100 dark:border-slate-800/50">{label}</p>
        <div className="flex flex-col gap-1.5">
          {payload.map((entry: any, index: number) => {
            const isCount = entry.name === 'Count';
            const valueFormatted = isCount ? entry.value : formatCurrency(entry.value);
            return (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
                  <span className="text-slate-500 dark:text-slate-400 font-medium truncate max-w-[120px]">{entry.name}:</span>
                </div>
                <span className="font-extrabold text-slate-900 dark:text-white">{valueFormatted}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans text-slate-800 dark:text-slate-100 py-6" id="dashboard-main-container">
      
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white p-6 sm:p-8 shadow-xl shadow-blue-500/10 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-10 translate-x-10" />
        <div className="relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">Member Workspace</span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-3">Welcome Back, {profile.name}!</h1>
          <p className="text-sm text-blue-100 mt-2 max-w-xl">
            Track your target financial goals, reload saved calculations instantly, and monitor your recently configured planners on your custom workspace.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile & Financial Goal Tracking */}
        <div className="flex flex-col gap-8">
          
          {/* Profile Card */}
          <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-500" />
                Profile Settings
              </h2>
              <button
                onClick={() => setEditMode(!editMode)}
                className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
              >
                <Settings className="w-3 h-3" />
                {editMode ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {saveSuccess && (
              <div className="mb-4 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2 border border-emerald-100 dark:border-emerald-900/50">
                <CheckCircle className="w-4 h-4" />
                Profile updated successfully!
              </div>
            )}

            {editMode ? (
              <form onSubmit={handleSaveProfile} className="flex flex-col gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">Full Name</label>
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
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">Financial Goal Title</label>
                  <input
                    type="text"
                    value={formData.financialGoal}
                    onChange={e => setFormData({ ...formData, financialGoal: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">Target Amount ({currentPreset.symbol})</label>
                    <input
                      type="number"
                      value={formData.targetAmount}
                      onChange={e => setFormData({ ...formData, targetAmount: Number(e.target.value) })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">Monthly Savings ({currentPreset.symbol})</label>
                    <input
                      type="number"
                      value={formData.monthlySavings}
                      onChange={e => setFormData({ ...formData, monthlySavings: Number(e.target.value) })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold mt-2 transition-colors"
                >
                  Save Profile Settings
                </button>
              </form>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-cyan-400 flex items-center justify-center font-bold text-sm">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100">{profile.name}</h3>
                    <p className="text-[10px] text-slate-400">{profile.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Goal Progress Tracker */}
          <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 relative overflow-hidden" id="goal-progress-tracker">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-4">
              <Target className="w-4 h-4 text-cyan-500" />
              Financial Goal Meter
            </h2>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Target Goal Title</span>
              <span className="text-sm font-bold text-slate-800 dark:text-white">{profile.financialGoal}</span>
              
              <div className="grid grid-cols-2 gap-4 mt-3 py-2.5 border-y border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Goal Size</span>
                  <span className="text-base font-extrabold text-blue-600 dark:text-cyan-400">
                    {formatCurrency(profile.targetAmount)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Monthly Savings</span>
                  <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                    {formatCurrency(profile.monthlySavings)}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-500">Timeline Projection</span>
                  <span className="text-slate-800 dark:text-slate-200">{monthsToGoal} Months ({yearsToGoal} Years)</span>
                </div>
                {/* Visual meter bar */}
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse" style={{ width: '65%' }} />
                </div>
                <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                  <span>Start ({formatCurrency(0)})</span>
                  <span>Currently Accumulated (~65%)</span>
                  <span>Goal ({formatCurrency(profile.targetAmount)})</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (2 spans wide): Saved & Recent Calculations */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Visual Financial Trends & Analytics Center */}
          <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6" id="analytics-trends-center">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  Analytics & Visual Trends
                </h2>
                <p className="text-[11px] text-slate-400 mt-1">
                  Graphical projection of your inputs, goals, and customized session history.
                </p>
              </div>

              {/* Interactive Tabs */}
              <div className="flex flex-wrap gap-1 rounded-xl bg-slate-100 dark:bg-slate-950 p-1 self-start sm:self-center border border-slate-200/20">
                <button
                  onClick={() => setActiveTab('goal')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${activeTab === 'goal' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm border border-slate-200/50 dark:border-slate-800' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border border-transparent'}`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Goal Projections
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${activeTab === 'saved' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm border border-slate-200/50 dark:border-slate-800' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border border-transparent'}`}
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  Calculated Points
                </button>
                <button
                  onClick={() => setActiveTab('usage')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${activeTab === 'usage' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm border border-slate-200/50 dark:border-slate-800' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border border-transparent'}`}
                >
                  <Target className="w-3.5 h-3.5" />
                  Category Focus
                </button>
                <button
                  onClick={() => setActiveTab('seo')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${activeTab === 'seo' ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm border border-slate-200/50 dark:border-slate-800' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border border-transparent'}`}
                >
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  SEO Audit Monitor
                </button>
              </div>
            </div>

            {/* Render selected content */}
            {activeTab !== 'seo' ? (
              <div className="h-64 sm:h-72 w-full mt-4">
                {activeTab === 'goal' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={goalTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-slate-100 dark:stroke-slate-800/50" strokeOpacity={0.5} />
                      <XAxis 
                        dataKey="name" 
                        className="text-[10px] font-semibold text-slate-400 fill-slate-400 font-sans"
                        tickLine={false} 
                        axisLine={false}
                      />
                      <YAxis 
                        className="text-[10px] font-semibold text-slate-400 fill-slate-400 font-sans"
                        tickLine={false} 
                        axisLine={false}
                        tickFormatter={(val) => {
                          if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
                          if (val >= 1000) return `${(val / 1000).toFixed(0)}K`;
                          return val;
                        }}
                      />
                      <Tooltip content={<CustomChartTooltip />} />
                      <Legend 
                        verticalAlign="top" 
                        height={36} 
                        iconType="circle"
                        iconSize={8}
                        className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="Cash Savings" 
                        stroke="#3b82f6" 
                        strokeWidth={2.5}
                        fillOpacity={1} 
                        fill="url(#colorCash)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="Investment Growth (6%)" 
                        stroke="#06b6d4" 
                        strokeWidth={2.5}
                        fillOpacity={1} 
                        fill="url(#colorGrowth)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}

                {activeTab === 'saved' && (
                  savedCalcsChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={savedCalcsChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-100 dark:stroke-slate-800/50" strokeOpacity={0.5} />
                        <XAxis 
                          dataKey="name" 
                          className="text-[10px] font-semibold text-slate-400 fill-slate-400 font-sans"
                          tickLine={false} 
                          axisLine={false}
                        />
                        <YAxis 
                          className="text-[10px] font-semibold text-slate-400 fill-slate-400 font-sans"
                          tickLine={false} 
                          axisLine={false}
                          tickFormatter={(val) => {
                            if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
                            if (val >= 1000) return `${(val / 1000).toFixed(0)}K`;
                            return val;
                          }}
                        />
                        <Tooltip content={<CustomChartTooltip />} />
                        <Bar 
                          dataKey="Value" 
                          fill="#6366f1" 
                          radius={[8, 8, 0, 0]} 
                          maxBarSize={50}
                        >
                          {savedCalcsChartData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={index % 2 === 0 ? '#6366f1' : '#a855f7'} 
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-slate-50 dark:bg-slate-950/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                      <p className="text-xs text-slate-400 font-medium">No calculated points available yet.</p>
                      <p className="text-[10px] text-slate-400 mt-1 max-w-xs">Save your calculations in any calculator page to generate comparison metrics here!</p>
                    </div>
                  )
                )}

                {activeTab === 'usage' && (
                  categoryChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryChartData} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} className="stroke-slate-100 dark:stroke-slate-800/50" strokeOpacity={0.5} />
                        <XAxis 
                          type="number"
                          className="text-[10px] font-semibold text-slate-400 fill-slate-400 font-sans"
                          tickLine={false} 
                          axisLine={false}
                          allowDecimals={false}
                        />
                        <YAxis 
                          dataKey="name" 
                          type="category"
                          className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 fill-current font-sans"
                          tickLine={false} 
                          axisLine={false}
                          width={100}
                        />
                        <Tooltip content={<CustomChartTooltip />} />
                        <Bar 
                          dataKey="Count" 
                          fill="#06b6d4" 
                          radius={[0, 6, 6, 0]}
                          maxBarSize={24}
                        >
                          {categoryChartData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={index % 2 === 0 ? '#06b6d4' : '#10b981'} 
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-slate-50 dark:bg-slate-950/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                      <p className="text-xs text-slate-400 font-medium">No activity focus data to visualize yet.</p>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="mt-6 border-t border-slate-100 dark:border-slate-800/60 pt-6">
                <SeoAuditPanel />
              </div>
            )}

            <div className="mt-4 flex items-center justify-between text-[10px] text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800/50">
              <span>Projection: 12 Months Projection based on your {formatCurrency(profile.monthlySavings)}/mo savings profile.</span>
              <span className="font-mono text-blue-500 dark:text-cyan-400">Interactive Mode Active</span>
            </div>
          </div>

          {/* Saved Calculations Panel */}
          <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6" id="saved-calculations-panel">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-6">
              <Bookmark className="w-4 h-4 text-indigo-500" />
              Saved Calculations ({savedCalcs.length})
            </h2>

            {savedCalcs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedCalcs.map(item => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 hover:border-blue-100 dark:hover:border-slate-700 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.calculatorName}</span>
                        <button
                          onClick={() => handleDeleteSaved(item.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all"
                          aria-label="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mt-3 pb-3 border-b border-slate-100 dark:border-slate-800 text-[10px]">
                        {Object.entries(item.inputs).map(([key, val]) => (
                          <div key={key}>
                            <span className="text-slate-400 capitalize">{key}: </span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                              {typeof val === 'number' ? val.toLocaleString() : String(val)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[11px]">
                        {item.summary.map((sum, i) => (
                          <div key={i}>
                            <span className="text-slate-400 block text-[9px] uppercase font-bold">{sum.label}</span>
                            <span className="font-bold text-blue-600 dark:text-cyan-400">{sum.formatted}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate(`calculator-${item.calculatorId}`, { id: item.calculatorId, inputs: item.inputs })}
                      className="w-full mt-4 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-cyan-400 hover:bg-blue-100 dark:hover:bg-blue-950/40 text-xs font-bold flex items-center justify-center gap-1 transition-all"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      Configure Calculator
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-xs text-slate-400">No saved calculations found. Customize any calculator to pin here.</div>
            )}
          </div>

          {/* Favorites & Recently Used Tools */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            
            {/* Favorites List */}
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-4">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                Favorite Tools
              </h2>
              {favorites.length > 0 ? (
                <div className="flex flex-col gap-1.5">
                  {favorites.map(favId => {
                    const calc = calculators.find(c => c.id === favId);
                    if (!calc) return null;
                    return (
                      <div
                        key={favId}
                        className="flex justify-between items-center px-3 py-2 rounded-xl bg-slate-50/50 dark:bg-slate-950/10 hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all cursor-pointer"
                        onClick={() => onNavigate(`calculator-${favId}`, { id: favId })}
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">{calc.name}</span>
                          <span className="text-[9px] text-slate-400 capitalize">{calc.category} Calculator</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-xs text-slate-400 py-6 text-center">No favorites added yet.</div>
              )}
            </div>

            {/* Recently Used List */}
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-4">
                <Clock className="w-4 h-4 text-emerald-500" />
                Recently Configured
              </h2>
              {recentlyUsed.length > 0 ? (
                <div className="flex flex-col gap-1.5">
                  {recentlyUsed.slice(0, 5).map(id => {
                    const calc = calculators.find(c => c.id === id);
                    if (!calc) return null;
                    return (
                      <div
                        key={id}
                        className="flex justify-between items-center px-3 py-2 rounded-xl bg-slate-50/50 dark:bg-slate-950/10 hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all cursor-pointer"
                        onClick={() => onNavigate(`calculator-${id}`, { id })}
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">{calc.name}</span>
                          <span className="text-[9px] text-slate-400 capitalize">{calc.category} category</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-xs text-slate-400 py-6 text-center">No tools configured yet in this session.</div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
