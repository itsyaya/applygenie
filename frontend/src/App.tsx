import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from '@/components/ui/Toast';
import { useAuthStore } from '@/store/authStore';
import { AppThemeSync } from '@/components/app/AppThemeSync';
import { CommandPalette } from '@/components/app/CommandPalette';
import { AppearanceDock } from '@/components/app/AppearanceDock';
import { MouseAura } from '@/components/app/MouseAura';

const LandingPage = lazy(() => import('@/pages/LandingPage').then((module) => ({ default: module.LandingPage })));
const LoginPage = lazy(() => import('@/pages/LoginPage').then((module) => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import('@/pages/RegisterPage').then((module) => ({ default: module.RegisterPage })));
const DashboardPage = lazy(() => import('@/pages/DashboardPage').then((module) => ({ default: module.DashboardPage })));
const MainLayout = lazy(() => import('@/layouts/MainLayout').then((module) => ({ default: module.MainLayout })));
const DashboardLayout = lazy(() => import('@/layouts/DashboardLayout').then((module) => ({ default: module.DashboardLayout })));

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<div className="app-shell flex min-h-screen items-center justify-center text-sm text-slate-500 dark:text-slate-400">Loading interface...</div>}>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          <Routes location={location}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<LandingPage />} />
            </Route>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Outlet />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/resumes" element={<DashboardPage />} />
              <Route path="/dashboard/jobs" element={<DashboardPage />} />
              <Route path="/dashboard/applications" element={<DashboardPage />} />
              <Route path="/dashboard/settings" element={<DashboardPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Suspense>
  );
};

function App() {
  return (
    <>
      <AppThemeSync />
      <MouseAura />
      <Toaster />
      <Router>
        <CommandPalette />
        <AppearanceDock />
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
