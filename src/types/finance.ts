export type DateRangeType = 'today' | 'weekly' | 'monthly' | 'yearly' | 'custom';

export type BusinessType = 'trading' | 'freelance' | 'business' | 'investment' | 'salary' | 'other';
export type LiabilityType = 'loan' | 'emi' | 'credit_card' | 'mortgage' | 'other';
export type ExpenseCategory = 'household' | 'personal' | 'business' | 'subscription' | 'utility' | 'other';
export type ExpenseFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'one_time';
export type GoalType = 'debt_elimination' | 'savings' | 'investment_target' | 'income_target';
export type HealthGrade = 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';

export interface Revenue {
  amount: number;
  date: Date;
  note?: string;
}

export interface CompoundingResult {
  trade: number;
  startBalance: number;
  profit: number;
  endBalance: number;
}

export interface DeficitTargets {
  isDeficit: boolean;
  totalDeficit: number;
  daily: number;
  weekly: number;
  monthly: number;
}

export interface DebtTargets {
  daily: number;
  weekly: number;
  monthly: number;
  totalDebt: number;
  timeframeDays: number;
}

export interface HealthScore {
  score: number;
  grade: HealthGrade;
  ratio: number;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface DashboardSummary {
  totalIncome: number;
  totalExpenses: number;
  totalLiabilities: number;
  netProfitLoss: number;
  activeStreams: number;
  healthScore: HealthScore;
  deficitTargets: DeficitTargets;
  monthlyIncomeData: { month: string; income: number; expenses: number }[];
}
