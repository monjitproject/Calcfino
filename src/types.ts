export type CalculatorCategory =
  | 'loan'
  | 'investment'
  | 'tax'
  | 'salary'
  | 'retirement'
  | 'savings'
  | 'real-estate'
  | 'business'
  | 'credit-card'
  | 'insurance'
  | 'crypto'
  | 'stock-market'
  | 'currency-inflation'
  | 'personal-finance'
  | 'advanced';

export interface InputField {
  id: string;
  label: string;
  type: 'number' | 'range' | 'select' | 'boolean';
  defaultValue: number | string | boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: { label: string; value: string | number }[];
  unit?: string;
  tooltip?: string;
}

export interface CalculationResult {
  summary: {
    label: string;
    value: number;
    formatted: string;
    type?: 'primary' | 'secondary' | 'accent' | 'neutral';
  }[];
  chartData?: any[];
  chartType?: 'pie' | 'bar' | 'line' | 'area';
  chartKeys?: string[];
  schedule?: { [key: string]: any }[];
  scheduleHeaders?: { key: string; label: string }[];
  formulaUsed?: string;
}

export interface Calculator {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  category: CalculatorCategory;
  inputs: InputField[];
  calculate: (inputs: Record<string, any>) => CalculationResult;
  formula: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatarUrl: string;
    bio: string;
  };
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  status?: 'published' | 'draft' | 'private' | 'deleted';
  draft?: boolean;
  private?: boolean;
  deleted?: boolean;
}

export interface SavedCalculation {
  id: string;
  calculatorId: string;
  calculatorName: string;
  timestamp: number;
  inputs: Record<string, any>;
  summary: { label: string; formatted: string }[];
}

export interface UserProfile {
  name: string;
  email: string;
  financialGoal: string;
  targetAmount: number;
  monthlySavings: number;
}
