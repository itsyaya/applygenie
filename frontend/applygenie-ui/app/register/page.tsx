'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSaving(true);

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      setSaving(false);
      return;
    }

    try {
      await register({ name, email, password });
      router.push('/dashboard');
    } catch (err) {
      setError('Could not create an account. Please check your details and try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12 sm:px-8">
      <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200/80 bg-white p-10 shadow-soft">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-500">Create your account</p>
            <h1 className="mt-4 text-3xl font-semibold text-slate-950">Get started with ApplyGenie</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">Join the modern job application workspace built for ambitious professionals.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-2 inline-flex items-center gap-2 text-slate-900">
                <User className="h-4 w-4 text-indigo-500" /> Full name
              </span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                required
                placeholder="Jane Doe"
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-2 inline-flex items-center gap-2 text-slate-900">
                <Mail className="h-4 w-4 text-indigo-500" /> Email address
              </span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                required
                placeholder="hello@example.com"
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-2 inline-flex items-center gap-2 text-slate-900">
                <Lock className="h-4 w-4 text-indigo-500" /> Password
              </span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                required
                placeholder="Create a password"
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </label>
            {error ? <p className="rounded-3xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
            <button
              type="submit"
              disabled={saving}
              className="inline-flex w-full items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {saving ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
              Sign in
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
