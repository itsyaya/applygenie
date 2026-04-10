import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';

export const BrandMark = () => {
  return (
    <Link to={ROUTES.HOME} className="inline-flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 text-white shadow-glow">
        <Sparkles className="h-5 w-5" />
      </div>
      <div>
        <p className="font-display text-lg font-semibold text-slate-950 dark:text-slate-100">ApplyGenie</p>
        <p className="text-xs uppercase tracking-[0.26em] text-slate-400">AI career OS</p>
      </div>
    </Link>
  );
};