'use client';

import * as React from 'react';
import { formatCurrency } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { EXPENSE_CATEGORIES } from '@/lib/constants';

export interface ExpenseRowProps {
  expense: any;
  onUpdate: () => void;
}

export const ExpenseRow: React.FC<ExpenseRowProps> = ({ expense, onUpdate }) => {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this expense?')) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/expenses/${expense._id}`, { method: 'DELETE' });
      if (res.ok) {
        onUpdate();
      }
    } catch (error) {
      console.error('Failed to delete expense:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const categoryInfo = EXPENSE_CATEGORIES.find(c => c.value === expense.category);
  const categoryLabel = categoryInfo ? categoryInfo.label : expense.category;

  return (
    <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
      <td className="p-4 text-slate-200">{expense.name}</td>
      <td className="p-4 text-slate-200 font-medium">{formatCurrency(expense.amount || 0)}</td>
      <td className="p-4 text-slate-400 capitalize">{expense.frequency}</td>
      <td className="p-4">
        <span className="inline-block px-2.5 py-1 rounded-full bg-slate-500/10 text-slate-300 text-xs font-medium border border-slate-500/20">
          {categoryLabel}
        </span>
      </td>
      <td className="p-4 text-right">
        <button 
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};
