import { useEffect } from 'react';
import { useUiStore } from '@/store/uiStore';

export const AppThemeSync = () => {
  const theme = useUiStore((state) => state.theme);
  const accent = useUiStore((state) => state.accent);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.setAttribute('data-accent', accent);
  }, [theme, accent]);

  return null;
};