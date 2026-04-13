import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Briefcase, FileText, Lock, Sparkles, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants';

const features = [
  { icon: FileText, title: 'Resume management', description: 'Keep every tailored resume version organized, searchable, and ready to send.' },
  { icon: Briefcase, title: 'Job brief intelligence', description: 'Capture job descriptions in seconds and turn them into structured application context.' },
  { icon: Wand2, title: 'AI drafting workflow', description: 'Prepare for cover letter and outreach generation with a UI built for high-conviction writing.' },
  { icon: Lock, title: 'Private by design', description: 'JWT-protected sessions and a trustworthy product feel from first click.' },
];

const steps = [
  { number: '01', title: 'Create your workspace', description: 'Sign in once and centralize all your application assets in one clean operating system.' },
  { number: '02', title: 'Add resumes and jobs', description: 'Store every resume version and job brief so your applications stay tailored and fast.' },
  { number: '03', title: 'Launch smarter applications', description: 'Use future AI generation and tracking to move through the pipeline with confidence.' },
];

export const LandingPage = () => {
  const navigate = useNavigate();
  const [heroPointer, setHeroPointer] = useState({ x: 50, y: 50 });

  const handleHeroMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setHeroPointer({ x, y });
  };

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-50 [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
      <motion.div aria-hidden className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" animate={{ y: [0, -16, 0] }} transition={{ duration: 9, repeat: Infinity }} />
      <motion.div aria-hidden className="absolute right-0 top-20 h-80 w-80 rounded-full bg-sky-300/25 blur-3xl" animate={{ y: [0, 18, 0] }} transition={{ duration: 11, repeat: Infinity }} />

      <section
        className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={() => setHeroPointer({ x: 50, y: 50 })}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[36px]"
          style={{
            background: `radial-gradient(460px circle at ${heroPointer.x}% ${heroPointer.y}%, rgba(99, 102, 241, 0.2), transparent 58%)`,
          }}
        />
        <div className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-8">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-sm font-medium text-indigo-700 shadow-soft backdrop-blur transition-all duration-300 hover:border-indigo-200 hover:bg-white hover:shadow-md"
              whileHover={{ y: -2, scale: 1.02 }}
            >
              <Bot className="h-4 w-4" />
              A premium AI workflow for ambitious job seekers
            </motion.div>
            <div className="space-y-5">
              <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
                Your AI Job
                <span className="block text-gradient">Application Assistant</span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Automate resume organization, capture job context, and prepare tailored application content in a product designed to feel precise, fast, and trustworthy.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" onClick={() => navigate(ROUTES.REGISTER)}>
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" variant="outline" onClick={() => navigate(ROUTES.LOGIN)}>
                  Login
                </Button>
              </motion.div>
            </div>
            <div className="grid max-w-2xl gap-4 sm:grid-cols-3">
              {['Fast onboarding', 'JWT-secure access', 'AI-ready workflow'].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(79, 70, 229, 0.1)' }}
                  className="rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-4 text-sm font-medium text-slate-600 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300 transition-all duration-300 cursor-default hover:border-indigo-200/50 hover:text-slate-700 dark:hover:border-indigo-500/30 dark:hover:text-slate-200"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.08 }} className="section-frame relative overflow-hidden p-5 sm:p-6">
            <div className="absolute inset-0 bg-brand-radial opacity-70" />
            <div className="relative space-y-5">
              <div className="glass-panel rounded-[26px] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Live dashboard</p>
                    <h2 className="mt-3 font-display text-2xl font-semibold text-slate-950 dark:text-white">Career operating system</h2>
                  </div>
                  <div className="rounded-2xl bg-indigo-500/10 p-3 text-indigo-600 dark:text-indigo-300">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="glass-panel rounded-[24px] p-5">
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">Resume scorecards</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Versioned, searchable, and connected to job briefs.</p>
                </div>
                <div className="rounded-[24px] bg-slate-950 p-5 text-white shadow-soft">
                  <p className="text-sm font-semibold">AI generation</p>
                  <p className="mt-2 text-sm text-slate-300">Cover letter workflows with strong visual feedback.</p>
                </div>
              </div>
              <motion.div
                whileHover={{ y: -4, boxShadow: '0 20px 30px rgba(16, 185, 129, 0.25)' }}
                className="rounded-[24px] border border-emerald-200/60 bg-emerald-50/80 p-5 dark:border-emerald-500/30 dark:bg-emerald-500/10"
              >
                <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">Interaction score</p>
                <p className="mt-2 text-3xl font-display font-semibold text-emerald-700 dark:text-emerald-300">+88%</p>
                <p className="mt-2 text-sm text-emerald-700/80 dark:text-emerald-200/80">Users engage longer when every surface responds to hover and motion.</p>
              </motion.div>
              <div className="glass-panel rounded-[24px] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-950 dark:text-white">Applications velocity</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Organized pipelines, modern UX, and cleaner decisions.</p>
                  </div>
                  <div className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">Live</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-indigo-500">Features</p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-slate-950 dark:text-white">Built to feel like a real startup product</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">Every surface is designed for speed, confidence, and the next wave of AI-assisted application workflows.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(79, 70, 229, 0.15)' }} viewport={{ once: true, margin: '-120px' }} transition={{ duration: 0.45, delay: index * 0.05 }} className="section-frame group p-7 cursor-pointer">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-600 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-violet-600 group-hover:text-white group-hover:shadow-lg group-hover:scale-110 dark:bg-indigo-500/15 dark:text-indigo-300">
                  <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-125" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-950 dark:text-white transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300 transition-colors duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-200">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="section-frame overflow-hidden p-8 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-indigo-500">How it works</p>
              <h2 className="mt-4 font-display text-4xl font-semibold text-slate-950 dark:text-white">A polished application workflow in three steps</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">ApplyGenie compresses the messy parts of job hunting into a calm, high-signal workspace.</p>
            </div>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div key={step.number} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.45, delay: index * 0.08 }} className="glass-panel rounded-[24px] p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-slate-950 px-3 py-2 text-xs font-semibold tracking-[0.24em] text-white dark:bg-white dark:text-slate-950">{step.number}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{step.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-frame overflow-hidden px-6 py-14 sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-indigo-500">Ready to move faster?</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-semibold text-slate-950 dark:text-white">Launch a cleaner, smarter job search workflow today</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">From polished onboarding to AI-ready drafting space, ApplyGenie is designed to feel trusted from the first session.</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" onClick={() => navigate(ROUTES.REGISTER)}>Create Account</Button>
            <Button size="lg" variant="outline" onClick={() => navigate(ROUTES.LOGIN)}>Sign In</Button>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-slate-200/80 bg-white/60 py-10 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 ApplyGenie. Built for modern application workflows.</p>
          <div className="flex gap-6">
            <a href="#features" className="transition hover:text-slate-900 dark:hover:text-white">Features</a>
            <a href="#" className="transition hover:text-slate-900 dark:hover:text-white">Privacy</a>
            <a href="#" className="transition hover:text-slate-900 dark:hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
