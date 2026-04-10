import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState = ({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={cn('flex flex-col items-center justify-center py-12 px-4', className)}
  >
    {icon && <div className="mb-4 text-gray-400">{icon}</div>}
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    {description && <p className="text-sm text-gray-600 mb-6 text-center max-w-sm">{description}</p>}
    {action && <div>{action}</div>}
  </motion.div>
);

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message = 'Loading...' }: LoadingStateProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col items-center justify-center py-12"
  >
    <motion.div
      className="h-8 w-8 border-4 border-gray-200 border-t-indigo-600 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
    <p className="mt-4 text-sm text-gray-600">{message}</p>
  </motion.div>
);

interface ErrorStateProps {
  title?: string;
  message: string;
  action?: React.ReactNode;
}

export const ErrorState = ({
  title = 'Something went wrong',
  message,
  action,
}: ErrorStateProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="rounded-lg border border-red-200 bg-red-50 p-6"
  >
    <div className="flex items-start gap-4">
      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <h3 className="font-semibold text-red-900">{title}</h3>
        <p className="mt-1 text-sm text-red-700">{message}</p>
        {action && <div className="mt-4">{action}</div>}
      </div>
    </div>
  </motion.div>
);

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton = ({ className, ...props }: SkeletonProps) => (
  <motion.div
    className={cn('bg-gray-200 rounded', className)}
    animate={{ opacity: [0.6, 1, 0.6] }}
    transition={{ duration: 1.5, repeat: Infinity }}
    {...props}
  />
);
