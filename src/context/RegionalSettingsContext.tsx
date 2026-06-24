import React, { createContext, useContext, useState, useEffect } from 'react';

export interface RegionalPreset {
  id: string;
  name: string;
  flag: string;
  locale: string;
  currency: string;
  symbol: string;
}

export const REGIONAL_PRESETS: RegionalPreset[] = [
  { id: 'en-US', name: 'United States', flag: '🇺🇸', locale: 'en-US', currency: 'USD', symbol: '$' },
  { id: 'en-IN', name: 'India', flag: '🇮🇳', locale: 'en-IN', currency: 'INR', symbol: '₹' },
  { id: 'de-DE', name: 'Eurozone (Germany)', flag: '🇩🇪', locale: 'de-DE', currency: 'EUR', symbol: '€' },
  { id: 'en-GB', name: 'United Kingdom', flag: '🇬🇧', locale: 'en-GB', currency: 'GBP', symbol: '£' },
  { id: 'ja-JP', name: 'Japan', flag: '🇯🇵', locale: 'ja-JP', currency: 'JPY', symbol: '¥' },
  { id: 'en-CA', name: 'Canada', flag: '🇨🇦', locale: 'en-CA', currency: 'CAD', symbol: 'C$' },
  { id: 'en-AU', name: 'Australia', flag: '🇦🇺', locale: 'en-AU', currency: 'AUD', symbol: 'A$' },
  { id: 'fr-CH', name: 'Switzerland', flag: '🇨🇭', locale: 'fr-CH', currency: 'CHF', symbol: 'CHF' },
];

interface RegionalSettingsContextProps {
  currentPreset: RegionalPreset;
  setPreset: (presetId: string) => void;
  formatCurrency: (val: number, fractionDigits?: number) => string;
  formatNumber: (val: number, maxFractionDigits?: number, minFractionDigits?: number) => string;
}

const RegionalSettingsContext = createContext<RegionalSettingsContextProps | undefined>(undefined);

export function RegionalSettingsProvider({ children }: { children: React.ReactNode }) {
  const [currentPreset, setCurrentPresetState] = useState<RegionalPreset>(() => {
    const saved = localStorage.getItem('fh_regional_preset');
    if (saved) {
      const found = REGIONAL_PRESETS.find(p => p.id === saved);
      if (found) return found;
    }
    return REGIONAL_PRESETS[0]; // USD Default
  });

  const setPreset = (presetId: string) => {
    const found = REGIONAL_PRESETS.find(p => p.id === presetId);
    if (found) {
      setCurrentPresetState(found);
      localStorage.setItem('fh_regional_preset', found.id);
      // Synchronize standard global localStorage item for raw calculations to pick up instantly
      localStorage.setItem('fh_regional_settings', JSON.stringify({
        locale: found.locale,
        currency: found.currency,
        symbol: found.symbol
      }));
      // Dispatch custom event to let vanilla calculations know they should refresh
      window.dispatchEvent(new Event('fh_regional_settings_changed'));
    }
  };

  // Keep localStorage sync solid
  useEffect(() => {
    localStorage.setItem('fh_regional_settings', JSON.stringify({
      locale: currentPreset.locale,
      currency: currentPreset.currency,
      symbol: currentPreset.symbol
    }));
  }, [currentPreset]);

  // Premium, high-precision locale-aware currency formatter
  const formatCurrency = (val: number, fractionDigits: number = 0): string => {
    // For Japanese Yen, do not show decimals by default as JPY does not have cents
    const maxDecimals = currentPreset.currency === 'JPY' ? 0 : fractionDigits;
    
    return new Intl.NumberFormat(currentPreset.locale, {
      style: 'currency',
      currency: currentPreset.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: maxDecimals,
    }).format(val);
  };

  // Premium, locale-aware general number formatter with customizable decimal grouping
  const formatNumber = (val: number, maxFractionDigits: number = 2, minFractionDigits: number = 0): string => {
    return new Intl.NumberFormat(currentPreset.locale, {
      minimumFractionDigits: minFractionDigits,
      maximumFractionDigits: maxFractionDigits,
    }).format(val);
  };

  return (
    <RegionalSettingsContext.Provider value={{ currentPreset, setPreset, formatCurrency, formatNumber }}>
      {children}
    </RegionalSettingsContext.Provider>
  );
}

export function useRegionalSettings() {
  const context = useContext(RegionalSettingsContext);
  if (!context) {
    throw new Error('useRegionalSettings must be used within a RegionalSettingsProvider');
  }
  return context;
}
