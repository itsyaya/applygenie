import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from '@/components/ui/Toast';
import { useAuthStore } from '@/store/authStore';
import { AppThemeSync } from '@/components/app/AppThemeSync';
import { CommandPalette } from '@/components/app/CommandPalette';

// Pages
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { DashboardPage } from '@/pages/DashboardPage';

// Layouts
import { MainLayout } from '@/layouts/MainLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  const location = useLocation();

  return (
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
  );
};

function App() {
  return (
    <>
      <AppThemeSync />
      <Toaster />
      <Router>
        <CommandPalette />
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
