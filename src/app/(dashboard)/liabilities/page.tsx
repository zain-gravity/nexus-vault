'use client';

import { useState, useEffect } from 'react';
import { LiabilityCard } from '@/components/liabilities/liability-card';
import { ExpenseRow } from '@/components/liabilities/expense-row';
import { AddLiabilityModal } from '@/components/liabilities/add-liability-modal';
import { AddExpenseModal } from '@/components/liabilities/add-expense-modal';

export default function LiabilitiesPage() {
  const [liabilities, setLiabilities] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [isLiabilityModalOpen, setIsLiabilityModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [liabRes, expRes] = await Promise.all([
        fetch('/api/liabilities'),
        fetch('/api/expenses')
      ]);
      if (liabRes.ok) setLiabilities((await liabRes.json()).liabilities || []);
      if (expRes.ok) setExpenses((await expRes.json()).expenses || []);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalDebt = liabilities.filter((l: any) => !l.isPaid).reduce((acc, curr: any) => acc + curr.remainingAmount, 0);
  const monthlyEmi = liabilities.filter((l: any) => !l.isPaid).reduce((acc, curr: any) => acc + curr.monthlyEmi, 0);
  const paidOffCount = liabilities.filter((l: any) => l.isPaid).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-200">Liabilities & Expenses</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-xl p-6 border-rose-500/20">
          <h3 className="text-slate-400 text-sm font-medium mb-1">Total Active Debt</h3>
          <p className="text-2xl font-bold text-rose-400">${totalDebt.toLocaleString()}</p>
        </div>
        <div className="glass rounded-xl p-6">
          <h3 className="text-slate-400 text-sm font-medium mb-1">Monthly EMI Total</h3>
          <p className="text-2xl font-bold text-slate-200">${monthlyEmi.toLocaleString()}</p>
        </div>
        <div className="glass rounded-xl p-6 border-emerald-500/20">
          <h3 className="text-slate-400 text-sm font-medium mb-1">Loans Paid Off</h3>
          <p className="text-2xl font-bold text-emerald-400">{paidOffCount}</p>
        </div>
      </div>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-200">Active Liabilities</h2>
          <button onClick={() => setIsLiabilityModalOpen(true)} className="text-sm bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg text-slate-200 transition-colors">
            + Add Liability
          </button>
        </div>
        
        {loading ? (
          <div className="h-32 glass rounded-xl animate-pulse"></div>
        ) : liabilities.length === 0 ? (
          <div className="glass rounded-xl p-8 text-center text-slate-400">No active liabilities.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liabilities.map((liability: any) => (
              <LiabilityCard key={liability._id} liability={liability} onMarkPaid={fetchData} onDelete={fetchData} />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-200">Recurring Expenses</h2>
          <button onClick={() => setIsExpenseModalOpen(true)} className="text-sm bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg text-slate-200 transition-colors">
            + Add Expense
          </button>
        </div>
        
        {loading ? (
          <div className="h-32 glass rounded-xl animate-pulse"></div>
        ) : expenses.length === 0 ? (
          <div className="glass rounded-xl p-8 text-center text-slate-400">No recurring expenses logged.</div>
        ) : (
          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-slate-400 text-sm">
                    <th className="p-4 font-medium">Name</th>
                    <th className="p-4 font-medium">Amount</th>
                    <th className="p-4 font-medium">Frequency</th>
                    <th className="p-4 font-medium">Category</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense: any) => (
                    <ExpenseRow key={expense._id} expense={expense} onUpdate={fetchData} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {isLiabilityModalOpen && <AddLiabilityModal isOpen={true} onClose={() => setIsLiabilityModalOpen(false)} onSubmit={() => { setIsLiabilityModalOpen(false); fetchData(); }} />}
      {isExpenseModalOpen && <AddExpenseModal onClose={() => setIsExpenseModalOpen(false)} onSuccess={() => { setIsExpenseModalOpen(false); fetchData(); }} />}
    </div>
  );
}
