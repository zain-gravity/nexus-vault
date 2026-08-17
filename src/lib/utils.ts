import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || '$';
  const absAmount = Math.abs(amount);
  const formatted = absAmount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return amount < 0 ? `-${currency}${formatted}` : `${currency}${formatted}`;
}

export function formatCompactCurrency(amount: number): string {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || '$';
  const absAmount = Math.abs(amount);
  let formatted: string;
  if (absAmount >= 1_000_000) {
    formatted = `${(absAmount / 1_000_000).toFixed(1)}M`;
  } else if (absAmount >= 1_000) {
    formatted = `${(absAmount / 1_000).toFixed(1)}K`;
  } else {
    formatted = absAmount.toFixed(2);
  }
  return amount < 0 ? `-${currency}${formatted}` : `${currency}${formatted}`;
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

export function getDateRange(type: string, custom?: { start: Date; end: Date }): { start: Date; end: Date } {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (type) {
    case 'today':
      return { start: startOfDay, end: now };
    case 'weekly': {
      const startOfWeek = new Date(startOfDay);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      return { start: startOfWeek, end: now };
    }
    case 'monthly': {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return { start: startOfMonth, end: now };
    }
    case 'yearly': {
      const startOfYear = new Date(now.getFullYear(), 0, 1);
      return { start: startOfYear, end: now };
    }
    case 'custom':
      if (custom) return custom;
      return { start: startOfDay, end: now };
    default:
      return { start: startOfDay, end: now };
  }
}

export function calculateCompounding(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number
) {
  const results = [];
  let currentBalance = principal;
  
  for (let i = 1; i <= years; i++) {
    const startBalance = currentBalance;
    for (let m = 0; m < 12; m++) {
      currentBalance += monthlyContribution;
      currentBalance *= (1 + annualRate / 100 / 12);
    }
    const profit = currentBalance - startBalance - (monthlyContribution * 12);
    
    results.push({
      trade: i,
      startBalance,
      profit,
      endBalance: currentBalance,
    });
  }
  
  return results;
}
