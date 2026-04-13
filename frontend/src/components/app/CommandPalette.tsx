import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, FileText, Home, LogIn, Search, Settings, Sparkles } from 'lucide-react';
import { ROUTES } from '@/constants';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';

const actions = [
  { label: 'Go to home', href: ROUTES.HOME, icon: Home },
  { label: 'Open dashboard', href: ROUTES.DASHBOARD, icon: Sparkles },
  { label: 'View resumes', href: ROUTES.RESUMES, icon: FileText },
  { label: 'View jobs', href: ROUTES.JOBS, icon: Briefcase },
  { label: 'Settings', href: ROUTES.SETTINGS, icon: Settings },
  { label: 'Login', href: ROUTES.LOGIN, icon: LogIn },
];

export const CommandPalette = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const open = useUiStore((state) => state.commandPaletteOpen);
  const setOpen = useUiStore((state) => state.setCommandPaletteOpen);
  const protectedRoutes: Set<string> = new Set([ROUTES.DASHBOARD, ROUTES.RESUMES, ROUTES.JOBS, ROUTES.SETTINGS]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(!open);
      }

      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, setOpen]);

  const items = useMemo(
    () => actions.filter((action) => {
      if (!isAuthenticated && protectedRoutes.has(action.href)) {
        return false;
      }
      if (isAuthenticated && action.href === ROUTES.LOGIN) {
        return false;
      }
      return true;
    }),
    [isAuthenticated, protectedRoutes]
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-slate-950/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="fixed left-1/2 top-[18vh] z-[100] w-[min(720px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-[28px] border border-white/60 bg-white/95 shadow-panel backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95"
          >
            <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <Search className="h-4 w-4 text-slate-400" />
              <p className="text-sm text-slate-500 dark:text-slate-400">Jump anywhere in ApplyGenie</p>
              <div className="ml-auto rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                Cmd K
              </div>
            </div>
            <div className="p-3">
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => {
                      navigate(item.href);
                      setOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};