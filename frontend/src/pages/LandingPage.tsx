import { useState, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BriefcaseBusiness, Layers3, ShieldCheck, Sparkles, WandSparkles } from 'lucide-react';
import { ROUTES } from '@/constants';

const offerings = [
  {
    icon: Layers3,
    title: 'Workspace Intelligence',
    description: 'Unify resumes, jobs, and context in one streamlined command center.',
  },
  {
    icon: WandSparkles,
    title: 'Assisted Content Flow',
    description: 'Move from brief to tailored application content with less manual friction.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Pipeline Clarity',
    description: 'Track opportunities with structured data and measurable progress signals.',
  },
  {
    icon: ShieldCheck,
    title: 'Security First',
    description: 'Protected sessions and secure account flows with production-grade standards.',
  },
];

const aboutPillars = [
  'Purpose-built for professionals applying at speed',
  'Designed for confidence, clarity, and consistency',
  'Scalable UI architecture with reusable patterns',
];

const sectionReveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-120px' },
  transition: { duration: 0.5, ease: 'easeOut' },
} as const;

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description: string;
}

const SectionTitle = ({ eyebrow, title, description }: SectionTitleProps) => (
  <div className="mx-auto max-w-2xl text-center">
    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-600 dark:text-sky-300">{eyebrow}</p>
    <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">{title}</h2>
    <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{description}</p>
  </div>
);

export const LandingPage = () => {
  const navigate = useNavigate();
  const [pointer, setPointer] = useState({ x: 50, y: 50 });

  const onHeroMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setPointer({ x, y });
  };

  return (
    <div className="relative overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(14,165,233,0.14),transparent_34%),radial-gradient(circle_at_84%_18%,rgba(59,130,246,0.16),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(14,165,233,0.10),transparent_46%)]" />

      <section
        className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pt-24"
        onMouseMove={onHeroMove}
        onMouseLeave={() => setPointer({ x: 50, y: 50 })}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[38px]"
          style={{
            background: `radial-gradient(480px circle at ${pointer.x}% ${pointer.y}%, rgba(56, 189, 248, 0.22), transparent 62%)`,
          }}
        />

        <div className="relative grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-white/85 px-4 py-2 text-sm font-medium text-sky-700 shadow-sm backdrop-blur dark:border-sky-500/30 dark:bg-slate-900/80 dark:text-sky-200"
              whileHover={{ y: -2, scale: 1.02 }}
            >
              <Sparkles className="h-4 w-4" />
              New era application workflow
            </motion.div>

            <h1 className="mt-7 font-display text-5xl font-semibold leading-[1.03] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
              Design-Level Precision
              <span className="block bg-gradient-to-r from-sky-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">for Every Job Application</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              ApplyGenie gives you a refined workspace for managing resumes, capturing role context, and preparing high-conviction submissions with confidence.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <motion.button
                type="button"
                onClick={() => navigate(ROUTES.REGISTER)}
                className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-[0_10px_28px_rgba(2,132,199,0.28)] transition-all duration-300 hover:shadow-[0_16px_34px_rgba(2,132,199,0.36)]"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started for Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                type="button"
                onClick={() => navigate(ROUTES.LOGIN)}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/90 px-8 py-3.5 text-base font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-slate-500"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Product
              </motion.button>
            </div>

            <div className="mt-10 grid max-w-xl gap-3 sm:grid-cols-3">
              {['Fast setup', 'Interactive UI', 'Secure sessions'].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-center text-sm font-medium text-slate-700 transition-all duration-300 hover:border-sky-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-sky-500/30"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 26 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.07 }}>
            <motion.div
              className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.14)] dark:border-slate-800 dark:bg-slate-900"
              whileHover={{ y: -6 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_45%)]" />
              <div className="relative space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl border border-slate-200 bg-white/95 p-5 transition-all duration-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/95"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Live Workspace</p>
                  <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">Application Command Hub</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">Instant visibility into resumes, opportunities, and application readiness.</p>
                </motion.div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
                  >
                    <div className="h-28 rounded-xl bg-gradient-to-br from-sky-200 via-cyan-200 to-blue-200 transition-transform duration-300 hover:scale-105 dark:from-sky-500/30 dark:via-cyan-500/25 dark:to-blue-500/25" />
                    <p className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-100">Role Brief Snapshot</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
                  >
                    <div className="h-28 rounded-xl bg-gradient-to-br from-blue-200 via-sky-200 to-cyan-200 transition-transform duration-300 hover:scale-105 dark:from-blue-500/30 dark:via-sky-500/25 dark:to-cyan-500/25" />
                    <p className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-100">Resume Variant Board</p>
                  </motion.div>
                </div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-cyan-200 bg-cyan-50/80 p-5 transition-all duration-300 hover:shadow-lg dark:border-cyan-500/30 dark:bg-cyan-500/10"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">Performance Signal</p>
                  <p className="mt-2 text-3xl font-semibold text-cyan-700 dark:text-cyan-200">+71% Response Lift</p>
                  <p className="mt-2 text-sm text-cyan-800/80 dark:text-cyan-200/80">Teams adopting structured, interactive workflows move faster with less error.</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div {...sectionReveal}>
          <SectionTitle
            eyebrow="Core Features"
            title="Everything needed for a modern job application engine"
            description="Each module is purpose-built for speed, accuracy, and a premium interaction layer."
          />
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {offerings.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:border-sky-300 hover:shadow-[0_16px_40px_rgba(14,165,233,0.16)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-500/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-sky-500 group-hover:to-blue-600 group-hover:text-white dark:bg-sky-500/15 dark:text-sky-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-950 transition-colors duration-300 group-hover:text-sky-700 dark:text-white dark:group-hover:text-sky-300">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
                <button
                  type="button"
                  className="mt-5 inline-flex items-center text-sm font-semibold text-sky-700 transition-all duration-300 hover:tracking-wide dark:text-sky-300"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <motion.div {...sectionReveal} className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-600 dark:text-sky-300">About ApplyGenie</p>
            <h3 className="mt-5 font-display text-3xl font-semibold text-slate-950 dark:text-white">Built by product minds obsessed with quality execution.</h3>
            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
              We redesigned the application process into a structured experience where every decision is visible, every action is fast, and every interaction feels crafted.
            </p>
            <div className="mt-8 space-y-3">
              {aboutPillars.map((pillar) => (
                <motion.div
                  key={pillar}
                  whileHover={{ x: 6 }}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition-all duration-300 hover:border-sky-300 hover:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-sky-500/30"
                >
                  {pillar}
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            whileHover={{ y: -6 }}
            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-600 via-cyan-500 to-blue-600 p-8 text-white shadow-[0_24px_60px_rgba(14,165,233,0.34)] dark:border-cyan-400/30"
          >
            <div className="absolute -right-14 -top-16 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/80">Platform Snapshot</p>
              <h3 className="mt-5 font-display text-3xl font-semibold">From intent to action in one interface.</h3>
              <p className="mt-4 text-base leading-8 text-white/85">Ship faster applications with cleaner systems and less cognitive overhead.</p>
              <a
                href="#features"
                className="mt-8 inline-flex items-center text-sm font-semibold text-white transition-all duration-300 hover:translate-x-1 hover:underline"
              >
                Explore feature stack
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <motion.div
          {...sectionReveal}
          className="relative overflow-hidden rounded-[34px] border border-slate-200 bg-white px-8 py-14 text-center shadow-sm sm:px-14 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.20),transparent_45%)]" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-600 dark:text-sky-300">Ready to begin?</p>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-semibold text-slate-950 sm:text-4xl dark:text-white">Launch a more professional application experience today.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">No clutter, no guesswork. Just modern workflows designed to help you ship high-quality applications at speed.</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.button
                type="button"
                onClick={() => navigate(ROUTES.REGISTER)}
                className="group inline-flex items-center rounded-full bg-gradient-to-r from-sky-600 to-blue-600 px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:shadow-[0_14px_32px_rgba(14,165,233,0.35)]"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Create Account
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                type="button"
                onClick={() => navigate(ROUTES.LOGIN)}
                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-500"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-slate-200 bg-white/80 py-12 dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
          <div>
            <p className="font-display text-2xl font-semibold text-slate-950 dark:text-white">ApplyGenie</p>
            <p className="mt-3 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">A premium interface for professionals who want precision, speed, and consistent application outcomes.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Product</p>
            <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <a href="#features" className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-sky-700 hover:underline dark:hover:text-sky-300">Features</a>
              <p className="transition-all duration-300 hover:translate-x-1 hover:text-sky-700 dark:hover:text-sky-300">Security</p>
              <p className="transition-all duration-300 hover:translate-x-1 hover:text-sky-700 dark:hover:text-sky-300">Performance</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Company</p>
            <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <p className="transition-all duration-300 hover:translate-x-1 hover:text-sky-700 dark:hover:text-sky-300">About</p>
              <p className="transition-all duration-300 hover:translate-x-1 hover:text-sky-700 dark:hover:text-sky-300">Contact</p>
              <p className="transition-all duration-300 hover:translate-x-1 hover:text-sky-700 dark:hover:text-sky-300">Privacy</p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-slate-200 px-4 pt-6 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:px-6 lg:px-8">
          © 2026 ApplyGenie. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
