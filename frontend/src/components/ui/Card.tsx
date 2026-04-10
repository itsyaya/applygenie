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
        'rounded-lg border border-gray-200 bg-white pl-6 pr-6 py-4 shadow-sm',
        hover && 'hover:shadow-md hover:border-gray-300 cursor-pointer transition-all duration-200 hover:y-(-2px)',
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
      {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
      {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
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
