'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowRight, Briefcase, FileText, Sparkles, Trash2, Plus, Search } from 'lucide-react';
import { createJob, createResume, deleteResume, fetchJobs, fetchResumes } from '../../lib/api';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/common/EmptyState';

export default function DashboardPage() {
  const queryClient = useQueryClient();
  const [resumeTitle, setResumeTitle] = useState('');
  const [resumeContent, setResumeContent] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const resumesQuery = useQuery(['resumes'], fetchResumes, {
    staleTime: 1000 * 60 * 2,
  });

  const jobsQuery = useQuery(['jobs'], fetchJobs, {
    staleTime: 1000 * 60 * 2,
  });

  const addResume = useMutation(createResume, {
    onSuccess: () => {
      queryClient.invalidateQueries(['resumes']);
      setResumeTitle('');
      setResumeContent('');
      setStatusMessage('Resume saved successfully.');
    },
    onError: () => setStatusMessage('Unable to save resume yet. Please try again.'),
  });

  const addJob = useMutation(createJob, {
    onSuccess: () => {
      queryClient.invalidateQueries(['jobs']);
      setJobTitle('');
      setCompany('');
      setJobDescription('');
      setStatusMessage('Job description saved.');
    },
    onError: () => setStatusMessage('Unable to save job description. Please try again.'),
  });

  const removeResume = useMutation(deleteResume, {
    onSuccess: () => {
      queryClient.invalidateQueries(['resumes']);
      setStatusMessage('Resume deleted.');
    },
    onError: () => setStatusMessage('Could not delete resume. Please try again.'),
  });

  const hasResumeData = resumesQuery.data && resumesQuery.data.length > 0;
  const hasJobData = jobsQuery.data && jobsQuery.data.length > 0;

  const filteredJobs = useMemo(() => {
    if (!jobsQuery.data) return [];
    if (!searchTerm.trim()) return jobsQuery.data;
    const term = searchTerm.toLowerCase();
    return jobsQuery.data.filter((job: any) =>
      job.title.toLowerCase().includes(term) || job.company.toLowerCase().includes(term) || job.description.toLowerCase().includes(term)
    );
  }, [jobsQuery.data, searchTerm]);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-3">
        <motion.div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-soft" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm uppercase tracking-[0.28em] text-indigo-500">Resume library</p>
          <p className="mt-4 text-3xl font-semibold text-slate-950">{resumesQuery.isLoading ? '--' : resumesQuery.data?.length ?? 0}</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">Keep each resume version organized and available for every application.</p>
        </motion.div>
        <motion.div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-soft" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <p className="text-sm uppercase tracking-[0.28em] text-indigo-500">Saved jobs</p>
          <p className="mt-4 text-3xl font-semibold text-slate-950">{jobsQuery.isLoading ? '--' : jobsQuery.data?.length ?? 0}</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">Reference job briefs while you tailor your applications.</p>
        </motion.div>
        <motion.div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-soft" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
          <p className="text-sm uppercase tracking-[0.28em] text-indigo-500">AI ready</p>
          <p className="mt-4 text-3xl font-semibold text-slate-950">{hasResumeData && hasJobData ? 'Ready' : 'Pending'}</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">Connect resumes with jobs, then generate tailored application content.</p>
        </motion.div>
      </div>

      {statusMessage ? (
        <div className="rounded-[1.75rem] border border-indigo-100 bg-indigo-50 px-5 py-4 text-sm text-indigo-700 shadow-soft">
          {statusMessage}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-soft">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-indigo-500">Resumes</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">Manage your profiles</h2>
              </div>
              <Badge variant="accent">Drag & drop coming soon</Badge>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                addResume.mutate({ title: resumeTitle, content: resumeContent });
              }}
              className="mt-6 space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  value={resumeTitle}
                  onChange={(event) => setResumeTitle(event.target.value)}
                  placeholder="Resume version name"
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  required
                />
                <input
                  value={resumeContent}
                  onChange={(event) => setResumeContent(event.target.value)}
                  placeholder="Short resume summary or tags"
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  required
                />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                <button
                  type="submit"
                  disabled={addResume.isLoading}
                  className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {addResume.isLoading ? 'Saving…' : 'Add resume'}
                </button>
                <p className="text-xs text-slate-500">Use clear naming so you can reuse the best match fast.</p>
              </div>
            </form>

            <div className="mt-8 space-y-4">
              {resumesQuery.isLoading ? (
                <div className="space-y-3">
                  <div className="h-24 skeleton" />
                  <div className="h-24 skeleton" />
                </div>
              ) : hasResumeData ? (
                resumesQuery.data.map((resume: any) => (
                  <motion.div
                    key={resume.id ?? resume.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-950">{resume.title}</p>
                        <p className="mt-2 text-sm text-slate-600">{resume.content || 'No description provided.'}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeResume.mutate(resume.id)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 transition hover:bg-slate-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <EmptyState title="No resumes yet" description="Create a resume entry to start tracking your application material." />
              )}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-soft">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-indigo-500">Future AI</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">Generate tailored content</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">The UI is ready for AI generation, with a polished place for cover letter previews.</p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                <Sparkles className="h-4 w-4" />
                Generate Cover Letter
              </button>
            </div>
            <div className="mt-6 rounded-[1.75rem] border border-dashed border-slate-200/80 bg-slate-50 p-6 text-slate-600">
              <p className="font-medium text-slate-950">AI preview panel</p>
              <p className="mt-3 text-sm leading-6">Once connected, ApplyGenie will generate application drafts based on your saved resume and job brief.</p>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-indigo-500">Job briefs</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">Add opportunity details</h2>
              </div>
              <div className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-indigo-700">New</div>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                addJob.mutate({ title: jobTitle, company, description: jobDescription });
              }}
              className="mt-6 space-y-4"
            >
              <input
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
                placeholder="Position title"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                required
              />
              <input
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                placeholder="Company name"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                required
              />
              <textarea
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
                rows={4}
                placeholder="Paste the job description here"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                required
              />
              <button
                type="submit"
                disabled={addJob.isLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <Plus className="h-4 w-4" />
                Save job description
              </button>
            </form>
          </section>

          <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-indigo-500">Saved jobs</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-950">Recent briefs</h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                <Search className="h-3.5 w-3.5" /> {filteredJobs.length}
              </div>
            </div>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search title, company, description"
              className="mt-5 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
            <div className="mt-6 space-y-4">
              {jobsQuery.isLoading ? (
                <div className="space-y-3">
                  <div className="h-20 skeleton" />
                  <div className="h-20 skeleton" />
                </div>
              ) : filteredJobs.length > 0 ? (
                filteredJobs.map((job: any) => (
                  <motion.div
                    key={job.id ?? job.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-950">{job.title}</p>
                        <p className="mt-1 text-sm text-slate-600">{job.company}</p>
                      </div>
                      <Badge variant="default">Saved</Badge>
                    </div>
                    <p className="mt-4 max-h-20 overflow-hidden text-sm leading-6 text-slate-600">{job.description}</p>
                  </motion.div>
                ))
              ) : (
                <EmptyState title="No saved jobs" description="Capture your first job description to start tracking applications." />
              )}
            </div>
          </section>
        </aside>
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <motion.section
          className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-soft"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-indigo-500">Application snapshot</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950">Ready for your next move</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
              <Sparkles className="h-4 w-4" /> AI-ready design
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-700">Focus</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">Fast</p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-700">Workflow</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">Organized</p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-700">Security</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">JWT</p>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="rounded-[2rem] border border-slate-200/80 bg-gradient-to-br from-indigo-600/5 to-sky-500/5 p-6 shadow-soft"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          <div className="rounded-[1.75rem] border border-white/80 bg-white/90 p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-600 text-white">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-indigo-500">Live workspace</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-950">Everything in one place</h3>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-600">
              Resume version control, saved roles, and a polished interface ready for the next AI feature rollout.
            </p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                24/7 secure access
              </div>
              <button className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
                <ArrowRight className="h-4 w-4" /> Explore AI tools
              </button>
            </div>
          </div>
        </motion.section>
      </section>
    </div>
  );
}
