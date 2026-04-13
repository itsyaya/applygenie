import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  CheckSquare,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import { showToast } from '@/components/ui/Toast';
import { ROUTES } from '@/constants';
import { ThemeToggle } from '@/components/app/ThemeToggle';
import { BrandMark } from '@/components/app/BrandMark';
import { useUiStore } from '@/store/uiStore';

interface SidebarItemProps {
  icon: React.ReactNode;
  label?: string;
  href: string;
  isActive: boolean;
}

const SidebarItem = ({ icon, label, href, isActive }: SidebarItemProps) => (
  <Link to={href}>
    <motion.div
      className={`group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-[0_10px_28px_rgba(2,132,199,0.35)]'
          : 'text-slate-700 hover:bg-white hover:shadow-md dark:text-slate-300 dark:hover:bg-slate-800/85 dark:hover:shadow-lg'
      }`}
      whileHover={!isActive ? { x: 4 } : {}}
      whileTap={{ scale: 0.98 }}
    >
      <span className="transition-transform duration-300 group-hover:scale-110">{icon}</span>
      {label ? <span className="text-sm font-medium transition-all duration-200">{label}</span> : null}
    </motion.div>
  </Link>
);

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => (typeof window !== 'undefined' ? window.innerWidth >= 1024 : false));
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const sidebarCollapsed = useUiStore((state) => state.sidebarCollapsed);
  const toggleSidebarCollapsed = useUiStore((state) => state.toggleSidebarCollapsed);
  const setCommandPaletteOpen = useUiStore((state) => state.setCommandPaletteOpen);

  React.useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      showToast.success('Logged out successfully');
    } catch {
      // Logout should proceed locally even if the server call fails.
    }

    logout();
    globalThis.location.href = ROUTES.HOME;
  };

  const menuItems = [
    { icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard', href: ROUTES.DASHBOARD },
    { icon: <FileText className="h-5 w-5" />, label: 'My Resumes', href: ROUTES.RESUMES },
    { icon: <Briefcase className="h-5 w-5" />, label: 'Job Descriptions', href: ROUTES.JOBS },
    { icon: <CheckSquare className="h-5 w-5" />, label: 'Applications', href: ROUTES.APPLICATIONS },
    { icon: <Settings className="h-5 w-5" />, label: 'Settings', href: ROUTES.SETTINGS },
  ];

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');

  return (
    <div className="flex min-h-screen bg-transparent">
      {/* Sidebar Overlay (Mobile) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isDesktop || sidebarOpen ? 0 : -256, width: sidebarCollapsed ? 104 : 280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-slate-200/80 bg-white/85 shadow-[0_18px_48px_rgba(15,23,42,0.14)] backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/85 lg:relative lg:z-auto lg:translate-x-0"
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-200/80 px-5 dark:border-slate-800">
          {sidebarCollapsed ? (
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 to-blue-600 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(2,132,199,0.45)]">
              AG
            </div>
          ) : (
            <BrandMark />
          )}
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-slate-500 hover:text-slate-700 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="px-4 pt-5">
          <button
            type="button"
            onClick={() => setCommandPaletteOpen(true)}
            className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-white hover:text-slate-900 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-500/30 dark:hover:text-white"
          >
            <Search className="h-4 w-4" />
            {sidebarCollapsed ? null : <span>Search with Cmd+K</span>}
          </button>
        </div>
        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              label={sidebarCollapsed ? '' : item.label}
              href={item.href}
              isActive={isActive(item.href)}
            />
          ))}
        </nav>

        {/* Logout Button */}
        <div className="border-t border-slate-200/80 p-4 dark:border-slate-800">
          <Button
            variant="outline"
            className="mb-3 w-full justify-start"
            onClick={toggleSidebarCollapsed}
          >
            {sidebarCollapsed ? <PanelLeftOpen className="mr-2 h-4 w-4" /> : <PanelLeftClose className="mr-2 h-4 w-4" />}
            {!sidebarCollapsed && 'Collapse'}
          </Button>
          <Button
            variant="secondary"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            {!sidebarCollapsed && 'Logout'}
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 shadow-sm backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/75 sm:px-6 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-4 ml-auto">
            <ThemeToggle />
            <motion.div
              className="relative"
              onMouseEnter={() => setProfileMenuOpen(true)}
              onMouseLeave={() => setProfileMenuOpen(false)}
            >
              <button className="flex items-center gap-3 rounded-2xl px-3 py-2 transition-all duration-300 hover:bg-slate-100 hover:shadow-sm dark:hover:bg-slate-800">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-600 to-blue-600 text-sm font-semibold text-white">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                <div className="hidden sm:block text-sm">
                  <p className="font-medium text-slate-900 dark:text-slate-100">{user?.name || 'User'}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{user?.email}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 z-50 mt-2 w-52 rounded-2xl border border-slate-200 bg-white/95 py-2 shadow-[0_14px_36px_rgba(15,23,42,0.15)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/95"
                  >
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-700 transition-all duration-200 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto px-4 py-5 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};
