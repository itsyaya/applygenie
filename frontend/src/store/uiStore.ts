import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UiState {
  theme: 'light' | 'dark';
  accent: 'indigo' | 'emerald' | 'rose';
  commandPaletteOpen: boolean;
  sidebarCollapsed: boolean;
  setTheme: (theme: 'light' | 'dark') => void;
  setAccent: (accent: 'indigo' | 'emerald' | 'rose') => void;
  toggleTheme: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleSidebarCollapsed: () => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      accent: 'indigo',
      commandPaletteOpen: false,
      sidebarCollapsed: false,
      setTheme: (theme) => set({ theme }),
      setAccent: (accent) => set({ accent }),
      toggleTheme: () =>
        set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
      toggleSidebarCollapsed: () =>
        set({ sidebarCollapsed: !get().sidebarCollapsed }),
    }),
    {
      name: 'applygenie-ui',
      partialize: (state) => ({
        theme: state.theme,
        accent: state.accent,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);