'use client';

import { useState, useEffect } from 'react';
import { GoalCard } from '@/components/goals/goal-card';
import { AddGoalModal } from '@/components/goals/add-goal-modal';

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchGoals = async () => {
    try {
      const res = await fetch('/api/goals');
      if (res.ok) {
        const data = await res.json();
        setGoals(data.goals || []);
      }
    } catch (error) {
      console.error('Failed to fetch goals', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const totalTarget = goals.reduce((acc, curr: any) => acc + curr.targetAmount, 0);
  const totalAchieved = goals.reduce((acc, curr: any) => acc + curr.currentAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-200">Financial Goals</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          + Add Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-xl p-6">
          <h3 className="text-slate-400 text-sm font-medium mb-1">Active Goals</h3>
          <p className="text-2xl font-bold text-slate-200">{goals.length}</p>
        </div>
        <div className="glass rounded-xl p-6">
          <h3 className="text-slate-400 text-sm font-medium mb-1">Total Target</h3>
          <p className="text-2xl font-bold text-slate-200">${totalTarget.toLocaleString()}</p>
        </div>
        <div className="glass rounded-xl p-6 border-emerald-500/20">
          <h3 className="text-slate-400 text-sm font-medium mb-1">Total Achieved</h3>
          <p className="text-2xl font-bold text-emerald-400">${totalAchieved.toLocaleString()}</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-48 glass rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : goals.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <h3 className="text-lg font-medium text-slate-200 mb-2">No goals set</h3>
          <p className="text-slate-400 mb-6">Define your financial targets and track your progress.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal: any) => (
            <GoalCard key={goal._id || goal.id} goal={goal} onDelete={async () => { /* Add delete logic later */ fetchGoals() }} />
          ))}
        </div>
      )}

      <AddGoalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={() => { setIsModalOpen(false); fetchGoals(); }} />
    </div>
  );
}
