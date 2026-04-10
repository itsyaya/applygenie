import { useEffect } from 'react';
import { useUiStore } from '@/store/uiStore';

export const AppThemeSync = () => {
  const theme = useUiStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return null;
};