import React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] transition-all duration-200',
  {
    variants: {
      variant: {
        default:
          'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300 hover:bg-indigo-200 hover:shadow-sm dark:hover:bg-indigo-500/25 dark:hover:shadow-md dark:hover:shadow-indigo-500/20',
        secondary:
          'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 hover:shadow-sm dark:hover:bg-slate-700 dark:hover:shadow-md dark:hover:shadow-slate-500/20',
        success:
          'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 hover:bg-emerald-200 hover:shadow-sm dark:hover:bg-emerald-500/25 dark:hover:shadow-md dark:hover:shadow-emerald-500/20',
        danger:
          'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300 hover:bg-rose-200 hover:shadow-sm dark:hover:bg-rose-500/25 dark:hover:shadow-md dark:hover:shadow-rose-500/20',
        warning:
          'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300 hover:bg-amber-200 hover:shadow-sm dark:hover:bg-amber-500/25 dark:hover:shadow-md dark:hover:shadow-amber-500/20',
      },
      interactive: {
        true: 'cursor-pointer',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      interactive: false,
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  animated?: boolean;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, interactive, animated = interactive, ...props }, ref) => {
    const content = (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, interactive, className }))}
        {...props}
      />
    );

    if (animated) {
      return (
        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.15 }}>
          {content}
        </motion.div>
      );
    }

    return content;
  }
);

Badge.displayName = 'Badge';
