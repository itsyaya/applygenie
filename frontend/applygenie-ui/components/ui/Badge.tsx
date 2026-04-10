import { classNames } from '../../utils/classNames';

interface BadgeProps {
  variant?: 'default' | 'success' | 'accent';
  children: React.ReactNode;
}

export function Badge({ variant = 'default', children }: BadgeProps) {
  const styles = classNames(
    'inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]',
    variant === 'success' && 'bg-emerald-100 text-emerald-700',
    variant === 'accent' && 'bg-indigo-100 text-indigo-700',
    variant === 'default' && 'bg-slate-100 text-slate-700'
  );
  return <span className={styles}>{children}</span>;
}
