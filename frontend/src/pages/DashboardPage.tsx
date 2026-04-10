import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText, Briefcase, CheckCircle, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { EmptyState, LoadingState, ErrorState, Skeleton } from '@/components/ui/States';
import { showToast } from '@/components/ui/Toast';
import { resumeService } from '@/services/resumeService';
import { jobService } from '@/services/jobService';
import { dashboardService } from '@/services/dashboardService';
import { useAsync } from '@/hooks/useAsync';
import { formatDate, truncateText, formatFileSize } from '@/utils';
import type { Resume, Job } from '@/types';

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: number;
  trend?: string;
}

const StatCard = ({ icon, label, value, trend }: StatCard) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <Card hover className="h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
          {icon}
        </div>
        {trend && <Badge variant="success">{trend}</Badge>}
      </div>
      <p className="text-gray-600 text-sm font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
    </Card>
  </motion.div>
);

export const DashboardPage = () => {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [newResume, setNewResume] = useState({ name: '', file: null as File | null });
  const [newJob, setNewJob] = useState({ title: '', company: '', description: '' });

  // Fetch data
  const {
    data: stats,
    loading: statsLoading,
    error: statsError,
  } = useAsync(
    async () => {
      try {
        return await dashboardService.getStats();
      } catch {
        return { totalResumes: 0, totalJobs: 0, totalApplications: 0, recentApplications: [] };
      }
    },
    true
  );

  const {
    data: resumes,
    loading: resumesLoading,
    execute: fetchResumes,
  } = useAsync(async () => resumeService.getResumes(), true);

  const {
    data: jobs,
    loading: jobsLoading,
    execute: fetchJobs,
  } = useAsync(async () => jobService.getJobs(), true);

  const handleAddResume = async () => {
    if (!newResume.name || !newResume.file) {
      showToast.error('Please fill in all fields');
      return;
    }

    try {
      await resumeService.createResume({
        name: newResume.name,
        file: newResume.file,
      });
      showToast.success('Resume added successfully');
      setResumeModalOpen(false);
      setNewResume({ name: '', file: null });
      fetchResumes();
    } catch (error) {
      showToast.error('Failed to add resume');
    }
  };

  const handleDeleteResume = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resume?')) return;

    try {
      await resumeService.deleteResume(id);
      showToast.success('Resume deleted successfully');
      fetchResumes();
    } catch (error) {
      showToast.error('Failed to delete resume');
    }
  };

  const handleAddJob = async () => {
    if (!newJob.title || !newJob.company || !newJob.description) {
      showToast.error('Please fill in all fields');
      return;
    }

    try {
      await jobService.createJob(newJob);
      showToast.success('Job saved successfully');
      setJobModalOpen(false);
      setNewJob({ title: '', company: '', description: '' });
      fetchJobs();
    } catch (error) {
      showToast.error('Failed to save job');
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      await jobService.deleteJob(id);
      showToast.success('Job deleted successfully');
      fetchJobs();
    } catch (error) {
      showToast.error('Failed to delete job');
    }
  };

  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back! Here's your job search overview.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsLoading ? (
          <>
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </>
        ) : (
          <>
            <StatCard
              icon={<FileText className="h-5 w-5" />}
              label="Total Resumes"
              value={stats?.totalResumes || 0}
            />
            <StatCard
              icon={<Briefcase className="h-5 w-5" />}
              label="Saved Jobs"
              value={stats?.totalJobs || 0}
            />
            <StatCard
              icon={<CheckCircle className="h-5 w-5" />}
              label="Applications"
              value={stats?.totalApplications || 0}
              trend="+2 this week"
            />
          </>
        )}
      </div>

      {/* Resumes Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Resumes</h2>
            <p className="mt-1 text-gray-600">Manage your resume collection</p>
          </div>
          <Button onClick={() => setResumeModalOpen(true)} size="lg">
            <Plus className="h-5 w-5 mr-2" />
            Add Resume
          </Button>
        </div>

        {resumesLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </div>
        ) : resumes && resumes.length > 0 ? (
          <div className="grid gap-4">
            {resumes.map((resume) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card hover className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{resume.name}</h3>
                      <p className="text-sm text-gray-600">
                        Uploaded {formatDate(resume.uploadDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(resume.s3Url)}
                    >
                      <Download className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteResume(resume.id)}
                    >
                      <Trash2 className="h-5 w-5 text-red-600" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card>
            <EmptyState
              icon={<FileText className="h-12 w-12" />}
              title="No resumes yet"
              description="Upload your first resume to get started"
              action={
                <Button onClick={() => setResumeModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Resume
                </Button>
              }
            />
          </Card>
        )}
      </motion.section>

      {/* Jobs Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Job Descriptions</h2>
            <p className="mt-1 text-gray-600">Save and manage job opportunities</p>
          </div>
          <Button onClick={() => setJobModalOpen(true)} size="lg">
            <Plus className="h-5 w-5 mr-2" />
            Save Job
          </Button>
        </div>

        {jobsLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
        ) : jobs && jobs.length > 0 ? (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card hover>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <Badge
                          variant={
                            job.status === 'applied'
                              ? 'success'
                              : job.status === 'rejected'
                                ? 'danger'
                                : 'default'
                          }
                        >
                          {job.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600 font-medium">{job.company}</p>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {truncateText(job.description, 150)}
                      </p>
                      {job.url && (
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-indigo-600 hover:underline mt-2 inline-block"
                        >
                          View posting →
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        <Trash2 className="h-5 w-5 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card>
            <EmptyState
              icon={<Briefcase className="h-12 w-12" />}
              title="No jobs saved yet"
              description="Start saving jobs to track your opportunities"
              action={
                <Button onClick={() => setJobModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Save Job
                </Button>
              }
            />
          </Card>
        )}
      </motion.section>

      {/* AI Generation Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200">
          <CardHeader
            title="🚀 AI-Powered Cover Letter Generation"
            description="Coming soon - Automatically generate tailored cover letters for your applications"
          />
          <CardContent>
            <Button variant="secondary" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </motion.section>

      {/* Add Resume Modal */}
      <Modal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        title="Add Resume"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Resume Name"
            placeholder="e.g., Software Engineer Resume"
            value={newResume.name}
            onChange={(e) => setNewResume({ ...newResume, name: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload PDF
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors cursor-pointer">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setNewResume({ ...newResume, file: e.target.files?.[0] || null })}
                className="hidden"
                id="file-input"
              />
              <label htmlFor="file-input" className="cursor-pointer">
                <p className="text-sm text-gray-600">
                  {newResume.file?.name || 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-gray-500 mt-1">PDF files only</p>
              </label>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setResumeModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleAddResume}
              isLoading={false}
            >
              Add Resume
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Job Modal */}
      <Modal
        isOpen={jobModalOpen}
        onClose={() => setJobModalOpen(false)}
        title="Save Job Description"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Job Title"
            placeholder="e.g., Senior Software Engineer"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
          />
          <Input
            label="Company"
            placeholder="e.g., Acme Corporation"
            value={newJob.company}
            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              className="w-full h-32 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Paste the job description here..."
              value={newJob.description}
              onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setJobModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleAddJob}
              isLoading={false}
            >
              Save Job
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
