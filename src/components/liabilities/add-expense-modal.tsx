'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { EXPENSE_CATEGORIES, EXPENSE_FREQUENCIES } from '@/lib/constants';

export interface AddExpenseModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<{name: string, category: string, amount: string, frequency: string, date: string, isRecurring: boolean}>({
    name: '',
    category: EXPENSE_CATEGORIES[0].value,
    amount: '',
    frequency: EXPENSE_FREQUENCIES[2].value, // Default to monthly
    date: new Date().toISOString().split('T')[0],
    isRecurring: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: Number(formData.amount),
        }),
      });

      if (res.ok) {
        onSuccess();
      } else {
        console.error('Failed to add expense');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md glass rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-200">Add Expense</h2>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
            <input 
              required 
              type="text" 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-emerald-500/50"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Amount</label>
              <input 
                required 
                type="number" 
                min="0"
                step="0.01"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-emerald-500/50"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Date</label>
              <input 
                required 
                type="date" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-emerald-500/50 [color-scheme:dark]"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
              <select 
                className="w-full bg-[#161622] border border-white/10 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-emerald-500/50"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {EXPENSE_CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Frequency</label>
              <select 
                className="w-full bg-[#161622] border border-white/10 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-emerald-500/50"
                value={formData.frequency}
                onChange={(e) => setFormData({...formData, frequency: e.target.value})}
              >
                {EXPENSE_FREQUENCIES.map(freq => (
                  <option key={freq.value} value={freq.value}>{freq.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input 
              type="checkbox" 
              id="isRecurring" 
              checked={formData.isRecurring}
              onChange={(e) => setFormData({...formData, isRecurring: e.target.checked})}
              className="w-4 h-4 rounded bg-white/5 border-white/10 text-emerald-500 focus:ring-emerald-500/20 focus:ring-offset-0"
            />
            <label htmlFor="isRecurring" className="text-sm font-medium text-slate-300">
              This is a recurring expense
            </label>
          </div>
          
          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg font-medium text-slate-300 hover:bg-white/5 transition-colors border border-white/5"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 py-2.5 rounded-lg font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
