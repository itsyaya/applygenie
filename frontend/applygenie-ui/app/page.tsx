import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, FileText, Layers } from 'lucide-react';

const features = [
  {
    title: 'Resume Management',
    description: 'Store multiple resumes and access them from one polished dashboard.',
    icon: FileText,
  },
  {
    title: 'Job Matching',
    description: 'Save job briefs and keep every application context in one place.',
    icon: Layers,
  },
  {
    title: 'AI Cover Letter',
    description: 'Prepare for future AI generation with a UI built for smart productivity.',
    icon: Sparkles,
  },
  {
    title: 'Secure & Private',
    description: 'JWT authentication and secure API communication keep your data safe.',
    icon: ShieldCheck,
  },
];

const steps = [
  {
    label: 'Create your profile',
    detail: 'Sign up once and start managing resumes and job briefs immediately.',
  },
  {
    label: 'Add resumes & jobs',
    detail: 'Upload your resume drafts and save job descriptions for each application.',
  },
  {
    label: 'Track progress',
    detail: 'Use the dashboard to monitor applications and prepare tailored content.',
  },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-hero-gradient blur-3xl" />
        <div className="relative grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-soft backdrop-blur">
              <Sparkles className="h-4 w-4 text-indigo-500" />
              Future-ready AI workflow, built for fast-growing teams.
            </div>
            <div className="max-w-2xl space-y-6">
              <h1 className="text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                Your AI Job Application Assistant
              </h1>
              <p className="text-lg leading-8 text-slate-600">
                Automate resumes, tailor applications, and land jobs faster with a polished workflow designed for ambitious professionals.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/register" className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-indigo-700">
                Get Started
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                Login
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-soft"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.1),transparent_25%)]" />
            <div className="relative space-y-6">
              <div className="flex items-center justify-between rounded-3xl bg-slate-950 p-4 text-white shadow-lg shadow-indigo-500/10">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-300">Live preview</p>
                  <h2 className="mt-3 text-2xl font-semibold">AI-driven career dashboard</h2>
                </div>
                <div className="rounded-2xl bg-indigo-500/10 p-3">
                  <ArrowRight className="h-5 w-5 text-indigo-500" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-indigo-600">Resume</p>
                  <p className="mt-3 text-sm text-slate-600">Keep every version ready and tailored.</p>
                </div>
                <div className="rounded-3xl border border-slate-200/80 bg-white p-5">
                  <p className="text-sm font-semibold text-slate-500">Jobs</p>
                  <p className="mt-3 text-sm text-slate-600">Save roles and match them to your best resume.</p>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200/80 bg-slate-950 p-5 text-white">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Preview</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Dashboard analytics, easy editing, and future-ready AI output all in one elegant workspace.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">Platform features</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Everything you need to manage applications with confidence.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Designed for a polished recruiting workflow with an elegant SaaS experience and enterprise-ready edge.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="rounded-[1.5rem] border border-slate-200/70 bg-slate-50 p-7 shadow-soft"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-600/10 text-indigo-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-950">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[0.95fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-500">How it works</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              A simple workflow built for focus and speed.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              ApplyGenie guides your application process from resume management to saved job briefs, with a UI ready for AI-driven cover letter generation.
            </p>
          </div>

          <div className="grid gap-5">
            {steps.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-[1.75rem] border border-slate-200/80 bg-white p-8 shadow-soft"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-950">{step.label}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{step.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200/80 bg-slate-50 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 ApplyGenie. Built for modern hiring workflows.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="#" className="transition hover:text-slate-900">
              Privacy
            </Link>
            <Link href="#" className="transition hover:text-slate-900">
              Terms
            </Link>
            <Link href="#" className="transition hover:text-slate-900">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
