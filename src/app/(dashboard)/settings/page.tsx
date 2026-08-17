'use client';

import { useSession } from 'next-auth/react';

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-200">Settings</h1>

      <div className="glass rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-200">Profile</h2>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
          <input type="text" readOnly value={session?.user?.name || ''} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-300 opacity-70 cursor-not-allowed" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
          <input type="email" readOnly value={session?.user?.email || ''} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-300 opacity-70 cursor-not-allowed" />
        </div>
      </div>

      <div className="glass rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-200">Preferences</h2>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Default Currency</label>
          <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="INR">INR (₹)</option>
          </select>
        </div>
        <div className="flex items-center justify-between mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <div>
            <p className="font-medium text-slate-200">Dark Mode</p>
            <p className="text-sm text-slate-400">Nexus Vault is exclusively designed in dark mode for optimal viewing.</p>
          </div>
          <div className="w-12 h-6 bg-emerald-500 rounded-full flex items-center p-1 justify-end cursor-not-allowed">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="glass border-rose-500/20 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-rose-400">Danger Zone</h2>
        <p className="text-sm text-slate-400">Permanently delete your account and all associated data. This action cannot be undone.</p>
        <button className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-medium py-2 px-4 rounded-lg transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
}
