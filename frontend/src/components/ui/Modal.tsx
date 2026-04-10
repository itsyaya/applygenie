import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  closeButton?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeButton = true,
}: ModalProps) => {
  const sizeClasses = {
    sm: 'w-full max-w-md',
    md: 'w-full max-w-2xl',
    lg: 'w-full max-w-4xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-950/55 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className={cn('overflow-hidden rounded-[30px] border border-white/60 bg-white/92 shadow-panel backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/92', sizeClasses[size])}>
              {title && (
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                  <h2 className="text-lg font-semibold text-slate-950 dark:text-slate-100">{title}</h2>
                  {closeButton && (
                    <button
                      onClick={onClose}
                      className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              )}
              <div className="px-6 py-5">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
