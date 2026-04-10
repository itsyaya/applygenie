import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
      <header className="sticky top-0 z-40 border-b border-white/50 bg-white/70 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <BrandMark />
          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => setCommandPaletteOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-500 transition hover:border-indigo-200 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
            >
              <Command className="h-4 w-4" /> Quick open
            </button>
            <ThemeToggle />
            <Link to={ROUTES.LOGIN}>
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.REGISTER}>
              <Button>
                {isAuthenticated ? 'Open Dashboard' : 'Get Started'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};
