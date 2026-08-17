export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Nexus Vault';
export const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY || '$';

export const DATE_RANGE_OPTIONS = [
  { value: 'today', label: 'Today' },
  { value: 'weekly', label: 'This Week' },
  { value: 'monthly', label: 'This Month' },
  { value: 'yearly', label: 'This Year' },
  { value: 'custom', label: 'Custom Range' },
] as const;

export const BUSINESS_TYPES = [
  { value: 'trading', label: 'Trading', emoji: '📈' },
  { value: 'freelance', label: 'Freelance', emoji: '💻' },
  { value: 'business', label: 'Business', emoji: '🏢' },
  { value: 'investment', label: 'Investment', emoji: '💰' },
  { value: 'salary', label: 'Salary', emoji: '💵' },
  { value: 'other', label: 'Other', emoji: '📋' },
] as const;

export const LIABILITY_TYPES = [
  { value: 'loan', label: 'Loan' },
  { value: 'emi', label: 'EMI' },
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'mortgage', label: 'Mortgage' },
  { value: 'other', label: 'Other' },
] as const;

export const EXPENSE_CATEGORIES = [
  { value: 'household', label: 'Household', icon: 'Home' },
  { value: 'personal', label: 'Personal', icon: 'User' },
  { value: 'business', label: 'Business', icon: 'Briefcase' },
  { value: 'subscription', label: 'Subscription', icon: 'CreditCard' },
  { value: 'utility', label: 'Utility', icon: 'Zap' },
  { value: 'other', label: 'Other', icon: 'MoreHorizontal' },
] as const;

export const EXPENSE_FREQUENCIES = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
  { value: 'one_time', label: 'One-time' },
] as const;

export const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/income', label: 'Income', icon: 'TrendingUp' },
  { href: '/liabilities', label: 'Liabilities', icon: 'Receipt' },
  { href: '/compounding', label: 'Compounding', icon: 'Calculator' },
  { href: '/goals', label: 'Goals', icon: 'Target' },
  { href: '/analytics', label: 'Analytics', icon: 'BarChart3' },
  { href: '/settings', label: 'Settings', icon: 'Settings' },
] as const;
