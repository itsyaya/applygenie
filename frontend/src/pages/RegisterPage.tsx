import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, LockKeyhole, Mail, Sparkles, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { showToast } from '@/components/ui/Toast';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import { validateEmail, validatePassword, getErrorMessage } from '@/utils';
import { ROUTES } from '@/constants';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.password.length === 0) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.valid) {
        newErrors.password = passwordValidation.errors[0];
      }
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setAuth(response.user, response.accessToken, response.refreshToken);
      showToast.success('Account created successfully!');
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
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-200/25 blur-3xl" />
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} className="section-frame hidden p-10 lg:block">
          <div className="rounded-[28px] bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 p-8 text-white shadow-panel">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4" /> Launch faster
            </div>
            <h1 className="mt-8 font-display text-5xl font-semibold leading-tight">Create a workspace that makes job hunting feel sharp again.</h1>
            <p className="mt-5 max-w-md text-base leading-8 text-white/85">Track resumes, save job descriptions, and prepare for AI-powered content generation in one premium product surface.</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="section-frame p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-500">Create account</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-slate-950 dark:text-white">Start using ApplyGenie</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">Build your personal application workspace with secure access and polished tools from day one.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <Input
                label="Full Name"
                type="text"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                error={errors.name}
                className="pl-11"
              />
              <UserRound className="pointer-events-none relative -mt-[3.35rem] ml-4 h-4 w-4 text-slate-400" />
            </div>

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

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value });
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
              }}
              error={errors.confirmPassword}
            />

            <div className="pt-4">
              <Button type="submit" className="w-full" size="lg" isLoading={isLoading} disabled={isLoading}>
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className="font-semibold text-indigo-600 hover:text-indigo-700">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
