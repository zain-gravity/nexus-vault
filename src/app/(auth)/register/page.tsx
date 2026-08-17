'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Registration failed');
      }

      router.push('/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0a0f]">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
      
      <div className="relative z-10 glass p-8 rounded-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 flex items-center justify-center text-white text-2xl font-bold mb-4">
            NV
          </div>
          <h1 className="text-2xl font-bold text-slate-200">Create Account</h1>
          <p className="text-slate-400 text-sm mt-2">Join Nexus Vault today</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
