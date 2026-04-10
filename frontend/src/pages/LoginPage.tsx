import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { showToast } from '@/components/ui/Toast';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import { validateEmail, validatePassword, getErrorMessage } from '@/utils';
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 h-40 w-40 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-10 right-10 h-40 w-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-2xl bg-white shadow-xl border border-gray-200 overflow-hidden">
          {/* Header Gradient */}
          <div className="h-20 bg-gradient-to-r from-indigo-600 to-purple-600" />

          {/* Content */}
          <div className="px-8 py-8">
            <div className="text-center mb-8 -mt-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="h-20 w-20 mx-auto bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-2xl font-bold text-white">AG</span>
              </motion.div>
              <h1 className="mt-4 text-2xl font-bold text-gray-900">Welcome back</h1>
              <p className="mt-2 text-gray-600 text-sm">Sign in to your ApplyGenie account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
              />

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
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  type="submit"
                  className="w-full h-10"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Sign In
                </Button>
              </motion.div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <Link to={ROUTES.REGISTER} className="text-indigo-600 font-semibold hover:text-indigo-700">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer hint */}
        <p className="text-center text-gray-600 text-xs mt-6">
          Demo credentials: demo@example.com / Demo@123
        </p>
      </motion.div>
    </div>
  );
};
