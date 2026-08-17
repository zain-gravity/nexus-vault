'use client';

import { useState, useEffect } from 'react';
import { BusinessStreamCard } from '@/components/income/business-stream-card';
import { AddBusinessModal } from '@/components/income/add-business-modal';
import { DATE_RANGE_OPTIONS } from '@/lib/constants';

export default function IncomePage() {
  const [streams, setStreams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState<string>(DATE_RANGE_OPTIONS[0].value);
  const [loading, setLoading] = useState(true);

  const fetchStreams = async () => {
    try {
      const res = await fetch('/api/income');
      if (res.ok) {
        const data = await res.json();
        setStreams(data.streams || []);
      }
    } catch (error) {
      console.error('Failed to fetch streams', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStreams();
  }, []);

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    await fetch('/api/income', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isActive: !currentStatus }),
    });
    fetchStreams();
  };

  const handleDelete = async (id: string) => {
    await fetch('/api/income', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchStreams();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-200">Income Streams</h1>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            {DATE_RANGE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value} className="bg-[#0a0a0f]">{opt.label}</option>
            ))}
          </select>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors whitespace-nowrap"
          >
            + Add Business
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 glass rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : streams.length === 0 ? (
        <div className="glass rounded-xl p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4 text-2xl">💰</div>
          <h3 className="text-lg font-medium text-slate-200 mb-2">No income streams yet</h3>
          <p className="text-slate-400 max-w-sm mb-6">Add your first business, side hustle, or income source to start tracking your wealth generation.</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Add Business
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {streams.map((stream: any) => (
            <BusinessStreamCard 
              key={stream._id || stream.id} 
              stream={stream} 
              onToggle={() => handleToggleActive(stream._id || stream.id, stream.isActive)}
              onDelete={() => handleDelete(stream._id || stream.id)}
            />
          ))}
        </div>
      )}

      <AddBusinessModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
        onSubmit={() => {
          setIsModalOpen(false);
          fetchStreams();
        }} 
      />
    </div>
  );
}
