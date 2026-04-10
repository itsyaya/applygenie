import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, hover = false, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-[28px] border border-slate-200/80 bg-white/90 px-6 py-5 shadow-soft backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/85',
        hover && 'cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-panel dark:hover:border-slate-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, title, description, ...props }, ref) => (
    <div ref={ref} className="mb-4" {...props}>
      {title && <h3 className="text-lg font-semibold text-slate-950 dark:text-slate-100">{title}</h3>}
      {description && <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{description}</p>}
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
    </div>
  )
);

CardContent.displayName = 'CardContent';

export { Card, CardHeader, CardContent };
