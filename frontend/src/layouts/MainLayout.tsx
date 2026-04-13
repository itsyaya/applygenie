import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Command, ArrowRight } from 'lucide-react';
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
      <header className="sticky top-0 z-40 border-b border-white/50 bg-white/70 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70 transition-all duration-300 hover:shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <BrandMark />
          <div className="hidden items-center gap-3 md:flex">
            <motion.button
              type="button"
              onClick={() => setCommandPaletteOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-500 transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md hover:text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-500/50 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Command className="h-4 w-4" /> Quick open
            </motion.button>
            <ThemeToggle />
            <Link to={ROUTES.LOGIN}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="ghost">Login</Button>
              </motion.div>
            </Link>
            <Link to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.REGISTER}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button>
                  {isAuthenticated ? 'Open Dashboard' : 'Get Started'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};
