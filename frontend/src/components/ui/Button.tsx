import React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-2xl font-medium ring-offset-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-indigo-600 via-violet-600 to-sky-500 text-white shadow-soft hover:shadow-glow hover:from-indigo-700 hover:via-violet-700 hover:to-sky-600 active:shadow-sm active:scale-95',
        secondary: 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-md dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 active:scale-95',
        destructive: 'bg-rose-600 text-white hover:bg-rose-700 hover:shadow-md active:scale-95',
        outline: 'border border-slate-200 bg-white/80 text-slate-900 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:border-indigo-500/50 active:scale-95',
        ghost: 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100 active:scale-95',
      },
      size: {
        default: 'h-11 px-5 py-2.5 text-sm',
        sm: 'h-9 rounded-xl px-3 text-sm',
        lg: 'h-12 rounded-2xl px-8 text-base',
        icon: 'h-11 w-11 rounded-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -2 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={cn(
          'inline-flex',
          className?.includes('w-full') && 'w-full',
          className?.includes('flex-1') && 'flex-1'
        )}
      >
        <button
          ref={ref}
          className={cn(buttonVariants({ variant, size, className }))}
          disabled={isLoading || disabled}
          {...props}
        >
          {isLoading && (
            <motion.div
              className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          )}
          {children}
        </button>
      </motion.div>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
