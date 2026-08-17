import dbConnect from '@/lib/db';
import { BusinessStream } from '@/models/BusinessStream';
import { Liability } from '@/models/Liability';
import { Expense } from '@/models/Expense';
import { calculateDeficitBridge, calculateHealthScore, getMonthlyNormalizedAmount } from '@/services/finance-math';
import { DashboardSummary } from '@/types/finance';

export async function aggregateDashboardData(userId: string): Promise<DashboardSummary> {
  await dbConnect();

  const [activeStreams, unpaidLiabilities, expenses] = await Promise.all([
    BusinessStream.find({ userId, isActive: true }).lean(),
    Liability.find({ userId, isPaid: false }).lean(),
    Expense.find({ userId }).lean()
  ]);

  let totalIncome = 0;
  activeStreams.forEach(stream => {
    if (stream.revenue && Array.isArray(stream.revenue)) {
      totalIncome += stream.revenue.reduce((sum, rev: any) => sum + rev.amount, 0);
    }
  });

  let totalExpenses = 0;
  expenses.forEach(exp => {
    totalExpenses += getMonthlyNormalizedAmount(exp.amount, exp.frequency);
  });

  let totalLiabilities = 0;
  let totalMonthlyLiabilityPayments = 0;
  unpaidLiabilities.forEach(liab => {
    totalLiabilities += liab.remainingAmount;
    totalMonthlyLiabilityPayments += liab.monthlyPayment;
  });

  const netProfitLoss = totalIncome - totalExpenses - totalMonthlyLiabilityPayments;

  const healthScore = calculateHealthScore(totalLiabilities, totalIncome / 12);
  
  const deficitTargets = calculateDeficitBridge(totalIncome, totalExpenses, 30);

  const monthlyIncomeData = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = d.toLocaleString('default', { month: 'short' });
    
    const startOfMonth = new Date(d.getFullYear(), d.getMonth(), 1).getTime();
    const endOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getTime();
    
    let monthIncome = 0;
    activeStreams.forEach(stream => {
      if (stream.revenue && Array.isArray(stream.revenue)) {
        monthIncome += stream.revenue.filter((r: any) => {
          const rTime = new Date(r.date).getTime();
          return rTime >= startOfMonth && rTime <= endOfMonth;
        }).reduce((sum, r: any) => sum + r.amount, 0);
      }
    });

    let monthExpenses = 0;
    expenses.forEach(exp => {
      const expTime = new Date(exp.date).getTime();
      if (expTime >= startOfMonth && expTime <= endOfMonth) {
         if (exp.frequency === 'one_time') {
           monthExpenses += exp.amount;
         } else {
           monthExpenses += getMonthlyNormalizedAmount(exp.amount, exp.frequency);
         }
      } else if (exp.isRecurring) {
         monthExpenses += getMonthlyNormalizedAmount(exp.amount, exp.frequency);
      }
    });
    
    monthlyIncomeData.push({
      month: monthName,
      income: monthIncome,
      expenses: monthExpenses
    });
  }

  return {
    totalIncome,
    totalExpenses,
    totalLiabilities,
    netProfitLoss,
    activeStreams: activeStreams.length,
    healthScore,
    deficitTargets,
    monthlyIncomeData
  };
}
