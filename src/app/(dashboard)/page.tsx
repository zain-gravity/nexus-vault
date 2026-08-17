'use client';

import { useState, useEffect } from 'react';
import { NetSummaryCard } from '@/components/dashboard/net-summary-card';
import { QuickStatsGrid } from '@/components/dashboard/quick-stats-grid';
import { IncomeVsExpenseChart } from '@/components/dashboard/income-vs-expense-chart';
import { FinancialHealthScore } from '@/components/dashboard/financial-health-score';
import { DeficitBridgeCard } from '@/components/dashboard/deficit-bridge-card';
import { DashboardSummary } from '@/types';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch('/api/dashboard');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-40 glass rounded-xl w-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 glass rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) return <div>Failed to load data</div>;

  const isDeficit = data.netProfitLoss < 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-200 mb-6">Net Dashboard</h1>
      
      <NetSummaryCard totalIncome={data.totalIncome} totalExpenses={data.totalExpenses} netProfitLoss={data.netProfitLoss} />
      
      <QuickStatsGrid 
        totalIncome={data.totalIncome}
        totalExpenses={data.totalExpenses}
        activeStreams={data.activeStreams}
        healthScore={data.healthScore.score}
      />

      {isDeficit && <DeficitBridgeCard deficitTargets={data.deficitTargets || []} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-200 mb-4">Cash Flow Overview</h2>
          <IncomeVsExpenseChart data={data.monthlyIncomeData} />
        </div>
        
        <div className="glass rounded-xl p-6">
          <FinancialHealthScore score={data.healthScore.score} />
        </div>
      </div>
    </div>
  );
}
