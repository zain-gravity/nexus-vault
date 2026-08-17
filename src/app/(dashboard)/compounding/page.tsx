'use client';

import { useState, useMemo } from 'react';
import { CompoundingChart } from '@/components/compounding/compounding-chart';
import { CompoundingTable } from '@/components/compounding/compounding-table';
import { calculateCompounding } from '@/lib/utils';

export default function CompoundingPage() {
  const [principal, setPrincipal] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualRate, setAnnualRate] = useState(8);
  const [years, setYears] = useState(10);

  const results = useMemo(() => {
    return calculateCompounding(principal, monthlyContribution, annualRate, years);
  }, [principal, monthlyContribution, annualRate, years]);

  const finalBalance = results[results.length - 1]?.endBalance || 0;
  const totalContributions = principal + (monthlyContribution * 12 * years);
  const totalProfit = finalBalance - totalContributions;
  const multiplier = totalContributions > 0 ? (finalBalance / totalContributions).toFixed(2) : '0';

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-200 mb-6">Compounding Calculator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass rounded-xl p-6 lg:col-span-1 h-fit">
          <h2 className="text-lg font-semibold text-slate-200 mb-4">Parameters</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Initial Principal ($)</label>
              <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Monthly Contribution ($)</label>
              <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Annual Interest Rate (%)</label>
              <input type="number" value={annualRate} onChange={(e) => setAnnualRate(Number(e.target.value))} step="0.1" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Investment Duration (Years)</label>
              <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} max="50" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass rounded-xl p-4">
              <p className="text-slate-400 text-sm mb-1">Final Balance</p>
              <p className="text-xl font-bold text-slate-200">${finalBalance.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
            </div>
            <div className="glass rounded-xl p-4">
              <p className="text-slate-400 text-sm mb-1">Total Profit</p>
              <p className="text-xl font-bold text-emerald-400">+${totalProfit.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
            </div>
            <div className="glass rounded-xl p-4">
              <p className="text-slate-400 text-sm mb-1">Growth Multiplier</p>
              <p className="text-xl font-bold text-blue-400">{multiplier}x</p>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-slate-200 mb-4">Growth Projection</h2>
            <CompoundingChart results={results} />
          </div>
        </div>
      </div>

      <div className="glass rounded-xl p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold text-slate-200 mb-4">Yearly Breakdown</h2>
        <CompoundingTable results={results} />
      </div>
    </div>
  );
}
