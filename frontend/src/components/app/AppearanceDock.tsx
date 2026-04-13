import { Paintbrush, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/app/ThemeToggle';
import { useUiStore } from '@/store/uiStore';

const accents = [
  { id: 'indigo', className: 'from-indigo-600 via-violet-600 to-sky-500', label: 'Indigo' },
  { id: 'emerald', className: 'from-emerald-500 via-teal-500 to-cyan-500', label: 'Emerald' },
  { id: 'rose', className: 'from-rose-500 via-fuchsia-500 to-orange-400', label: 'Rose' },
] as const;

export const AppearanceDock = () => {
  const accent = useUiStore((state) => state.accent);
  const setAccent = useUiStore((state) => state.setAccent);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="fixed bottom-5 right-5 z-[80]"
    >
      <div className="glass-panel flex items-center gap-2 rounded-2xl px-3 py-2 shadow-[0_12px_32px_rgba(15,23,42,0.18)]">
        <div className="hidden items-center gap-1 rounded-xl bg-white/70 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-900/70 dark:text-slate-300 sm:flex">
          <Sparkles className="h-3.5 w-3.5" />
          Style
        </div>
        <ThemeToggle />
        <div className="mx-1 h-6 w-px bg-slate-200 dark:bg-slate-700" />
        <div className="flex items-center gap-2">
          <Paintbrush className="h-4 w-4 text-slate-500 dark:text-slate-300" />
          {accents.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-label={`Switch accent to ${option.label}`}
              onClick={() => setAccent(option.id)}
              className={`h-6 w-6 rounded-full bg-gradient-to-br ${option.className} transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                accent === option.id ? 'ring-2 ring-offset-2 ring-slate-900 dark:ring-white ring-offset-white dark:ring-offset-slate-950' : 'opacity-80 hover:opacity-100'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};