import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]',
  {
    variants: {
      variant: {
        default: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300',
        secondary: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
        success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
        danger: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
        warning: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(badgeVariants({ variant, className }))} {...props} />
  )
);

Badge.displayName = 'Badge';
