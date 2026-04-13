import { useEffect, useMemo, useState } from 'react';
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

const protectedRoutes: Set<string> = new Set([ROUTES.DASHBOARD, ROUTES.RESUMES, ROUTES.JOBS, ROUTES.SETTINGS]);

export const CommandPalette = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const open = useUiStore((state) => state.commandPaletteOpen);
  const setOpen = useUiStore((state) => state.setCommandPaletteOpen);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [open]);

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
    [isAuthenticated]
  );

  const filteredItems = useMemo(
    () => items.filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase())),
    [items, query]
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    setSelectedIndex((current) => {
      if (filteredItems.length === 0) {
        return 0;
      }
      return Math.min(current, filteredItems.length - 1);
    });
  }, [filteredItems, open]);

  const executeAction = (href: string) => {
    navigate(href);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPaletteKeyDown = (event: KeyboardEvent) => {
      if (filteredItems.length === 0) {
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((current) => (current + 1) % filteredItems.length);
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((current) => (current - 1 + filteredItems.length) % filteredItems.length);
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        const selected = filteredItems[selectedIndex];
        if (selected) {
          executeAction(selected.href);
        }
      }
    };

    window.addEventListener('keydown', onPaletteKeyDown);
    return () => window.removeEventListener('keydown', onPaletteKeyDown);
  }, [open, filteredItems, selectedIndex]);

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
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search pages..."
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-100"
              />
              <div className="ml-auto rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                Cmd K
              </div>
            </div>
            <div className="p-3">
              {filteredItems.length === 0 ? (
                <div className="rounded-2xl px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                  No matching actions.
                </div>
              ) : null}
              {filteredItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    type="button"
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => executeAction(item.href)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                      selectedIndex === index
                        ? 'bg-slate-100 dark:bg-slate-800'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
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