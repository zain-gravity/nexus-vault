import { DateRange, Revenue, CompoundingResult, DeficitTargets, DebtTargets, HealthScore } from '@/types/finance';

export function calculateROI(initialInvestment: number, currentValue: number): number {
  if (initialInvestment === 0) {
    return currentValue > 0 ? Infinity : 0;
  }
  return ((currentValue - initialInvestment) / initialInvestment) * 100;
}

export function calculateProfit(revenues: Revenue[], dateRange?: DateRange): number {
  let filteredRevenues = revenues;
  if (dateRange) {
    filteredRevenues = filterByDateRange(revenues, dateRange);
  }
  return filteredRevenues.reduce((total, rev) => total + rev.amount, 0);
}

export function calculateCompounding(capital: number, profitPercent: number, trades: number): CompoundingResult[] {
  const results: CompoundingResult[] = [];
  let currentBalance = capital;
  
  for (let i = 1; i <= trades; i++) {
    const profit = currentBalance * (profitPercent / 100);
    const endBalance = currentBalance + profit;
    
    results.push({
      trade: i,
      startBalance: currentBalance,
      profit,
      endBalance
    });
    
    currentBalance = endBalance;
  }
  
  return results;
}

export function calculateDeficitBridge(totalIncome: number, totalExpenses: number, daysInPeriod: number = 30): DeficitTargets {
  if (totalIncome >= totalExpenses) {
    return {
      isDeficit: false,
      totalDeficit: 0,
      daily: 0,
      weekly: 0,
      monthly: 0
    };
  }
  
  const deficit = totalExpenses - totalIncome;
  const daily = deficit / Math.max(daysInPeriod, 1);
  const weekly = daily * 7;
  const monthly = deficit;
  
  return {
    isDeficit: true,
    totalDeficit: deficit,
    daily,
    weekly,
    monthly
  };
}

export function calculateDebtTargets(totalDebt: number, timeframeDays: number): DebtTargets {
  const safeTimeframe = Math.max(timeframeDays, 1);
  const daily = totalDebt / safeTimeframe;
  const weekly = daily * 7;
  const monthly = daily * 30;
  
  return {
    daily,
    weekly,
    monthly,
    totalDebt,
    timeframeDays
  };
}

export function calculateHealthScore(totalDebt: number, monthlyIncome: number): HealthScore {
  const ratio = monthlyIncome > 0 ? totalDebt / (monthlyIncome * 12) : (totalDebt > 0 ? Infinity : 0);
  
  let score = 5;
  if (ratio <= 0) score = 100;
  else if (ratio < 0.1) score = 95;
  else if (ratio < 0.2) score = 85;
  else if (ratio < 0.35) score = 70;
  else if (ratio < 0.5) score = 55;
  else if (ratio < 0.75) score = 35;
  else if (ratio < 1) score = 20;
  
  let grade: HealthScore['grade'] = 'Critical';
  if (score >= 90) grade = 'Excellent';
  else if (score >= 70) grade = 'Good';
  else if (score >= 50) grade = 'Fair';
  else if (score >= 25) grade = 'Poor';
  
  return {
    score,
    grade,
    ratio
  };
}

export function filterByDateRange<T extends { date: Date | string }>(items: T[], range: DateRange): T[] {
  const start = new Date(range.start).getTime();
  const end = new Date(range.end).getTime();
  
  return items.filter(item => {
    const itemTime = new Date(item.date).getTime();
    return itemTime >= start && itemTime <= end;
  });
}

export function getMonthlyNormalizedAmount(amount: number, frequency: string): number {
  switch (frequency) {
    case 'daily': return amount * 30;
    case 'weekly': return amount * 4.33;
    case 'monthly': return amount;
    case 'yearly': return amount / 12;
    case 'one_time': return amount;
    default: return amount;
  }
}
