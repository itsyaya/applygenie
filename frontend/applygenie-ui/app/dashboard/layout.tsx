'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/brand/Logo';
import { LogOut, Settings, FileText, Layers, Home } from 'lucide-react';

const navigation = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'My Resumes', href: '/dashboard', icon: FileText },
  { label: 'Job Descriptions', href: '/dashboard', icon: Layers },
  { label: 'Settings', href: '/dashboard', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { token, loading, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.replace('/login');
    }
  }, [loading, token, router]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto grid min-h-screen max-w-[1600px] gap-8 px-4 py-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-10">
            <div className="space-y-6">
              <Logo />
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Welcome back</p>
                <p className="mt-3 text-xl font-semibold text-slate-950">{user?.name ?? 'Job Seeker'}</p>
              </div>
            </div>
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                  >
                    <Icon className="h-5 w-5 text-indigo-500" />
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>
          <div className="mt-auto rounded-[1.75rem] border border-slate-200/80 bg-slate-50 p-5">
            <button
              type="button"
              onClick={() => {
                logout();
                router.push('/login');
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>

        <section className="space-y-6">
          <header className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-soft">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-indigo-500">Dashboard</p>
                <h1 className="mt-3 text-3xl font-semibold text-slate-950">Career control center</h1>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Track resumes, collect job descriptions, and prepare for future AI-enhanced cover letters.
                </p>
              </div>
            </div>
          </header>

          {children}
        </section>
      </div>
    </div>
  );
}
