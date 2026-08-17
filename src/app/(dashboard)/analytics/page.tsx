'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { IncomeVsExpenseChart } from '@/components/dashboard/income-vs-expense-chart';

const COLORS = ['#34d399', '#60a5fa', '#f472b6', '#a78bfa', '#fbbf24'];

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading || !data) return <div className="animate-pulse glass h-96 rounded-xl"></div>;

  // Mock breakdown data if API doesn't provide it yet
  const incomeBreakdown = [
    { name: 'Active Income', value: data.totalIncome * 0.6 },
    { name: 'Passive Income', value: data.totalIncome * 0.3 },
    { name: 'Investments', value: data.totalIncome * 0.1 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-200">Analytics</h1>

      <div className="glass rounded-xl p-6">
        <h2 className="text-lg font-semibold text-slate-200 mb-4">Cash Flow Trends</h2>
        <div className="h-80 w-full">
          <IncomeVsExpenseChart data={data.cashFlowData} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-200 mb-4">Income Sources</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={incomeBreakdown} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {incomeBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#12121a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6 flex items-center justify-center text-slate-400">
          <p>More charts coming soon</p>
        </div>
      </div>
    </div>
  );
}
