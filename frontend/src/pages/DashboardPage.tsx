import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Bot, Briefcase, FileEdit, FileText, Filter, Plus, Search, Trash2, UploadCloud } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { EmptyState, ErrorState, Skeleton } from '@/components/ui/States';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { showToast } from '@/components/ui/Toast';
import { useCreateJob, useCreateResume, useDashboardStats, useDeleteJob, useDeleteResume, useJobs, useResumes, useUpdateJob, useUpdateResume } from '@/hooks/queries';
import { formatDate } from '@/utils';
import type { Job, Resume } from '@/types';

const statCards = [
  { key: 'totalResumes', title: 'Resume library', description: 'Versions ready for targeted applications.', icon: FileText },
  { key: 'totalJobs', title: 'Saved jobs', description: 'Tracked roles with clean context.', icon: Briefcase },
  { key: 'totalApplications', title: 'Applications', description: 'Pipeline metrics and future AI actions.', icon: Bot },
] as const;

export const DashboardPage = () => {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [editingResume, setEditingResume] = useState<Resume | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [resumeDraft, setResumeDraft] = useState({ name: '', file: null as File | null });
  const [jobDraft, setJobDraft] = useState({ title: '', company: '', description: '', url: '' });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Job['status']>('all');

  const statsQuery = useDashboardStats();
  const resumesQuery = useResumes();
  const jobsQuery = useJobs();
  const createResume = useCreateResume();
  const updateResume = useUpdateResume();
  const deleteResume = useDeleteResume();
  const createJob = useCreateJob();
  const updateJob = useUpdateJob();
  const deleteJob = useDeleteJob();

  const filteredJobs = useMemo(() => {
    const jobs = jobsQuery.data ?? [];
    return jobs.filter((job: Job) => {
      const matchesSearch = !search || [job.title, job.company, job.description, job.url].filter(Boolean).join(' ').toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [jobsQuery.data, search, statusFilter]);

  const resumeContent = (() => {
    if (resumesQuery.isLoading) {
      return (
        <>
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </>
      );
    }

    if (!resumesQuery.data?.length) {
      return (
        <EmptyState icon={<FileText className="h-12 w-12" />} title="No resumes yet" description="Upload your first resume to start building a sharper application workflow." action={<Button onClick={() => setResumeModalOpen(true)}>Add Resume</Button>} />
      );
    }

    return resumesQuery.data.map((resume: Resume, index: number) => (
      <motion.div key={resume.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }} whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}>
        <div className="rounded-[24px] border border-slate-200/80 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900/60 transition-all duration-300 hover:shadow-md hover:border-indigo-200/50 hover:bg-slate-50 dark:hover:border-indigo-500/30 dark:hover:bg-slate-900/80 group cursor-pointer">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300 transition-all duration-300 group-hover:bg-indigo-200 group-hover:shadow-md dark:group-hover:bg-indigo-500/25">
                <FileText className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div>
                <p className="text-base font-semibold text-slate-950 dark:text-white transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{resume.name}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300 group-hover:text-slate-600 dark:group-hover:text-slate-300">Uploaded {formatDate(resume.uploadDate || resume.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="icon" onClick={() => {
                  setEditingResume(resume);
                  setResumeDraft({ name: resume.name, file: null });
                  setResumeModalOpen(true);
                }}>
                  <FileEdit className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="icon" onClick={() => globalThis.open(resume.s3Url, '_blank')}>
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="icon" onClick={async () => {
                  try {
                    await deleteResume.mutateAsync(resume.id);
                    showToast.success('Resume deleted');
                  } catch {
                    showToast.error('Could not delete resume');
                  }
                }}>
                  <Trash2 className="h-4 w-4 text-rose-500" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    ));
  })();

  const jobsContent = (() => {
    if (jobsQuery.isLoading) {
      return (
        <>
          <Skeleton className="h-44" />
          <Skeleton className="h-44" />
        </>
      );
    }

    if (!filteredJobs.length) {
      const hasAnyJobs = (jobsQuery.data?.length ?? 0) > 0;
      return (
        <div className="xl:col-span-2">
          <EmptyState
            icon={<Briefcase className="h-12 w-12" />}
            title={hasAnyJobs ? 'No matching jobs' : 'No saved jobs'}
            description={
              hasAnyJobs
                ? 'Try a different search phrase or clear the status filter to see more results.'
                : 'Add a job description to build a high-context application workflow.'
            }
            action={
              hasAnyJobs ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearch('');
                    setStatusFilter('all');
                  }}
                >
                  Clear filters
                </Button>
              ) : (
                <Button onClick={() => setJobModalOpen(true)}>Save Job</Button>
              )
            }
          />
        </div>
      );
    }

    return filteredJobs.map((job: Job, index: number) => {
      const badgeVariant = job.status === 'applied' ? 'success' : job.status === 'rejected' ? 'danger' : 'default';

      return (
        <motion.div key={job.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} whileHover={{ scale: 1.01, transition: { duration: 0.2 } }} className="group">
          <div className="h-full rounded-[24px] border border-slate-200/80 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900/60 transition-all duration-300 hover:shadow-lg hover:border-indigo-200/50 hover:bg-slate-50 dark:hover:border-indigo-500/30 dark:hover:bg-slate-900/80 cursor-pointer">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold text-slate-950 dark:text-white transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{job.title}</h3>
                  <motion.div whileHover={{ scale: 1.08 }}>
                    <Badge variant={badgeVariant}>{job.status}</Badge>
                  </motion.div>
                </div>
                <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-200">{job.company}</p>
              </div>
              <div className="flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="icon" onClick={() => {
                    setEditingJob(job);
                    setJobDraft({ title: job.title, company: job.company, description: job.description, url: job.url || '' });
                    setJobModalOpen(true);
                  }}>
                    <FileEdit className="h-4 w-4" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="icon" onClick={async () => {
                    try {
                      await deleteJob.mutateAsync(job.id);
                      showToast.success('Job deleted');
                    } catch {
                      showToast.error('Could not delete job');
                    }
                  }}>
                    <Trash2 className="h-4 w-4 text-rose-500" />
                  </Button>
                </motion.div>
              </div>
            </div>
            <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-300 transition-colors duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-200">{job.description}</p>
            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Saved {formatDate(job.savedDate || job.createdAt)}</p>
              {job.url ? (
                <motion.a href={job.url} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-300" whileHover={{ x: 4 }}>
                  Visit posting <ArrowUpRight className="ml-1 h-4 w-4" />
                </motion.a>
              ) : null}
            </div>
          </div>
        </motion.div>
      );
    });
  })();

  const resetResumeForm = () => {
    setResumeDraft({ name: '', file: null });
    setEditingResume(null);
    setResumeModalOpen(false);
  };

  const resetJobForm = () => {
    setJobDraft({ title: '', company: '', description: '', url: '' });
    setEditingJob(null);
    setJobModalOpen(false);
  };

  const handleResumeSubmit = async () => {
    const trimmedName = resumeDraft.name.trim();

    if (!trimmedName) {
      showToast.error('Please enter a resume name');
      return;
    }

    try {
      if (editingResume) {
        await updateResume.mutateAsync({ id: editingResume.id, name: trimmedName });
        showToast.success('Resume updated');
      } else {
        if (!resumeDraft.file) {
          showToast.error('Please attach a PDF resume');
          return;
        }
        if (resumeDraft.file.type && resumeDraft.file.type !== 'application/pdf') {
          showToast.error('Only PDF files are supported');
          return;
        }
        await createResume.mutateAsync({ name: trimmedName, file: resumeDraft.file });
        showToast.success('Resume uploaded');
      }
      resetResumeForm();
    } catch {
      showToast.error('Unable to save resume right now');
    }
  };

  const handleJobSubmit = async () => {
    const payload = {
      title: jobDraft.title.trim(),
      company: jobDraft.company.trim(),
      description: jobDraft.description.trim(),
      url: jobDraft.url.trim(),
    };

    if (!payload.title || !payload.company || !payload.description) {
      showToast.error('Title, company, and description are required');
      return;
    }

    if (payload.url) {
      try {
        // Validate URL without being overly strict about host/path combinations.
        new URL(payload.url);
      } catch {
        showToast.error('Please enter a valid job posting URL');
        return;
      }
    }

    try {
      if (editingJob) {
        await updateJob.mutateAsync({ id: editingJob.id, payload });
        showToast.success('Job updated');
      } else {
        await createJob.mutateAsync(payload);
        showToast.success('Job saved');
      }
      resetJobForm();
    } catch {
      showToast.error('Unable to save job details');
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-10">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="section-frame overflow-hidden p-6 sm:p-8">
        <div className="grid gap-8 xl:grid-cols-[1.12fr_0.88fr] xl:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-indigo-500">Overview</p>
            <h1 className="mt-4 font-display text-4xl font-semibold text-slate-950 dark:text-white">Operate your entire job search from one premium dashboard.</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">Manage resumes, track opportunities, and prepare for AI-generated application content with a workflow that feels precise and fast.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] bg-slate-950 p-5 text-white shadow-soft">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Next up</p>
              <p className="mt-3 text-xl font-semibold">Generate tailored cover letters</p>
            </div>
            <div className="glass-panel rounded-[24px] p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Quick open</p>
              <p className="mt-3 text-sm font-medium text-slate-900 dark:text-white">Use Cmd+K to jump between dashboard sections.</p>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="grid gap-6 md:grid-cols-3">
        {statsQuery.isLoading
          ? statCards.map((item) => <Skeleton key={item.key} className="h-36" />)
          : statCards.map((item, index) => {
              const Icon = item.icon;
              const value = statsQuery.data?.[item.key] ?? 0;
              return (
                <motion.div key={item.key} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                  <Card hover className="h-full">
                    <CardContent>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.title}</p>
                          <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">{value}</p>
                          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
      </div>

      {resumesQuery.isError || jobsQuery.isError ? (
        <ErrorState message="Some dashboard data could not be loaded. The services may still be starting up, or the API response shape may differ from the expected contract." />
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="overflow-hidden">
          <CardHeader title="Resume manager" description="Upload, rename, and curate every version you send out." />
          <CardContent>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Badge>Library</Badge>
              <Button onClick={() => setResumeModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Resume
              </Button>
            </div>
            <div className="rounded-[24px] border border-dashed border-indigo-200 bg-indigo-50/60 p-5 dark:border-indigo-500/20 dark:bg-indigo-500/10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Drag and drop upload area</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Prepared for polished file upload interactions. Use the modal below to attach a PDF right now.</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-soft dark:bg-slate-900">
                  <UploadCloud className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {resumeContent}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="AI drafting panel" description="A polished placeholder for future cover letter generation and smart assistance." />
          <CardContent>
            <div className="rounded-[28px] bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 text-white shadow-panel">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <Badge variant="secondary">Coming soon</Badge>
                  <h3 className="mt-4 font-display text-2xl font-semibold">Generate Cover Letter</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <Bot className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">This area is ready for AI-generated drafts, inline refinement, and polished content review states once the generation endpoint is connected.</p>
              <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Output preview</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">Your tailored cover letter will appear here with rich visual hierarchy, actions, and revision states.</p>
              </div>
              <Button className="mt-6" variant="outline" disabled>Generate Cover Letter</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader title="Job description manager" description="Search, filter, create, edit, and keep opportunity context close to your writing workflow." />
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 items-center gap-3 rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
              <Search className="h-4 w-4 text-slate-400" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by title, company, description, or URL" className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100" />
            </div>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-[22px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <Filter className="h-4 w-4" />
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as 'all' | Job['status'])} className="bg-transparent outline-none">
                  <option value="all">All statuses</option>
                  <option value="saved">Saved</option>
                  <option value="applied">Applied</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <Button onClick={() => setJobModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Save Job
              </Button>
            </div>
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            {jobsContent}
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={resumeModalOpen} onClose={resetResumeForm} title={editingResume ? 'Edit Resume' : 'Add Resume'} size="md">
        <div className="space-y-5">
          <Input label="Resume name" placeholder="Senior Product Designer Resume" value={resumeDraft.name} onChange={(event) => setResumeDraft((current) => ({ ...current, name: event.target.value }))} />
          {editingResume === null ? (
            <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-6 text-center dark:border-slate-700 dark:bg-slate-900/50">
              <input id="resume-file" type="file" accept=".pdf" className="hidden" onChange={(event) => setResumeDraft((current) => ({ ...current, file: event.target.files?.[0] || null }))} />
              <label htmlFor="resume-file" className="cursor-pointer text-sm text-slate-600 dark:text-slate-300">{resumeDraft.file?.name || 'Click to attach a PDF resume'}</label>
            </div>
          ) : null}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={resetResumeForm}>Cancel</Button>
            <Button className="flex-1" onClick={handleResumeSubmit} isLoading={createResume.isPending || updateResume.isPending}>{editingResume ? 'Save Changes' : 'Upload Resume'}</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={jobModalOpen} onClose={resetJobForm} title={editingJob ? 'Edit Job' : 'Save Job Description'} size="md">
        <div className="space-y-5">
          <Input label="Job title" placeholder="Senior Frontend Engineer" value={jobDraft.title} onChange={(event) => setJobDraft((current) => ({ ...current, title: event.target.value }))} />
          <Input label="Company" placeholder="Acme" value={jobDraft.company} onChange={(event) => setJobDraft((current) => ({ ...current, company: event.target.value }))} />
          <Input label="Posting URL" placeholder="https://company.com/jobs/123" value={jobDraft.url} onChange={(event) => setJobDraft((current) => ({ ...current, url: event.target.value }))} />
          <div>
            <label htmlFor="job-description" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
            <textarea id="job-description" value={jobDraft.description} onChange={(event) => setJobDraft((current) => ({ ...current, description: event.target.value }))} rows={6} className="w-full rounded-[22px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-indigo-500/20" placeholder="Paste the job description here" />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={resetJobForm}>Cancel</Button>
            <Button className="flex-1" onClick={handleJobSubmit} isLoading={createJob.isPending || updateJob.isPending}>{editingJob ? 'Save Changes' : 'Save Job'}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
