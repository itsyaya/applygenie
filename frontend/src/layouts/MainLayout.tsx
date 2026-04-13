import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Command, ArrowRight, Sparkles } from 'lucide-react';
import { BrandMark } from '@/components/app/BrandMark';
import { ThemeToggle } from '@/components/app/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';

export const MainLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setCommandPaletteOpen = useUiStore((state) => state.setCommandPaletteOpen);

  return (
    <div className="app-shell">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <BrandMark />
            <div className="hidden items-center gap-5 text-sm md:flex">
              <a href="#features" className="link-hover font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Features</a>
              <a href="#" className="link-hover font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Platform</a>
              <a href="#" className="link-hover font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Pricing</a>
            </div>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <motion.button
              type="button"
              onClick={() => setCommandPaletteOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-700 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Command className="h-4 w-4" /> Quick open
            </motion.button>
            <ThemeToggle />
            <Link to={ROUTES.LOGIN}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="ghost">Sign In</Button>
              </motion.div>
            </Link>
            <Link to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.REGISTER}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button>
                  {isAuthenticated ? 'Open Dashboard' : 'Start Free'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Link to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.REGISTER}>
              <Button size="sm">
                <Sparkles className="mr-1 h-4 w-4" />
                {isAuthenticated ? 'Dashboard' : 'Start'}
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};
