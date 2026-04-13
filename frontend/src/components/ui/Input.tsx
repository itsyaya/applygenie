import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, containerClassName, className, ...props }, ref) => (
    <div className={cn('w-full', containerClassName)}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-200">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          'flex h-12 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-950 placeholder:text-slate-400 shadow-sm transition-all duration-300 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-indigo-500/20 dark:hover:border-slate-600',
          error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-100 dark:focus:ring-rose-500/20',
          className
        )}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-rose-500 font-medium">{error}</p>}
    </div>
  )
);

Input.displayName = 'Input';

export { Input };
