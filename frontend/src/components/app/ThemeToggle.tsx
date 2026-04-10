import { Moon, SunMedium } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useUiStore } from '@/store/uiStore';

export const ThemeToggle = () => {
  const theme = useUiStore((state) => state.theme);
  const toggleTheme = useUiStore((state) => state.toggleTheme);

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? <Moon className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
    </Button>
  );
};