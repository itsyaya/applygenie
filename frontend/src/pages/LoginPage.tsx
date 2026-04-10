import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Command, LockKeyhole, Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { showToast } from '@/components/ui/Toast';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import { validateEmail, getErrorMessage } from '@/utils';
import { ROUTES } from '@/constants';

export const LoginPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      setAuth(response.user, response.accessToken, response.refreshToken);
      showToast.success('Login successful!');
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      showToast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-50" />
      <div className="absolute left-0 top-10 h-64 w-64 rounded-full bg-indigo-200/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" />
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden rounded-[32px] bg-slate-950 p-10 text-white shadow-panel lg:flex lg:flex-col lg:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80">
              <Sparkles className="h-4 w-4" /> Premium career workflow
            </div>
            <h1 className="mt-8 font-display text-5xl font-semibold leading-tight">Move through applications with more signal and less chaos.</h1>
            <p className="mt-5 max-w-md text-base leading-8 text-slate-300">ApplyGenie gives you a polished workspace for resumes, job briefs, and AI-assisted writing so every step feels intentional.</p>
          </div>
          <div className="grid gap-4">
            {['Resume libraries', 'Secure JWT auth', 'AI-ready drafting'].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200">{item}</div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="section-frame relative overflow-hidden p-8 sm:p-10">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500" />
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-500">Welcome back</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-slate-950 dark:text-white">Sign in to ApplyGenie</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">Access your dashboard, job briefs, and resume workspace.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
              <Command className="mr-1 inline h-3.5 w-3.5" /> Secure
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                error={errors.email}
                className="pl-11"
              />
              <Mail className="pointer-events-none relative -mt-[3.35rem] ml-4 h-4 w-4 text-slate-400" />
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                error={errors.password}
                className="pl-11"
              />
              <LockKeyhole className="pointer-events-none relative -mt-[3.35rem] ml-4 h-4 w-4 text-slate-400" />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full" size="lg" isLoading={isLoading} disabled={isLoading}>
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>

          <div className="mt-8 rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-4 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
            Demo credentials: demo@example.com / Demo@123
          </div>

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
            Don&apos;t have an account?{' '}
            <Link to={ROUTES.REGISTER} className="font-semibold text-indigo-600 hover:text-indigo-700">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
