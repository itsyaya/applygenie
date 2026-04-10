import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboardService';
import { jobService } from '@/services/jobService';
import { resumeService } from '@/services/resumeService';
import type { CreateJobRequest, CreateResumeRequest, Job, Resume } from '@/types';

export const queryKeys = {
  stats: ['dashboard-stats'] as const,
  resumes: ['resumes'] as const,
  jobs: ['jobs'] as const,
};

export const useDashboardStats = () =>
  useQuery({
    queryKey: queryKeys.stats,
    queryFn: async () => {
      try {
        return await dashboardService.getStats();
      } catch {
        const [resumes, jobs] = await Promise.all([
          resumeService.getResumes().catch(() => []),
          jobService.getJobs().catch(() => []),
        ]);

        return {
          totalResumes: resumes.length,
          totalJobs: jobs.length,
          totalApplications: 0,
          recentApplications: [],
        };
      }
    },
  });

export const useResumes = () =>
  useQuery<Resume[]>({
    queryKey: queryKeys.resumes,
    queryFn: () => resumeService.getResumes(),
  });

export const useJobs = () =>
  useQuery<Job[]>({
    queryKey: queryKeys.jobs,
    queryFn: () => jobService.getJobs(),
  });

export const useCreateResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateResumeRequest) => resumeService.createResume(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.resumes });
      queryClient.invalidateQueries({ queryKey: queryKeys.stats });
    },
  });
};

export const useUpdateResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      resumeService.updateResume(id, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.resumes });
    },
  });
};

export const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => resumeService.deleteResume(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.resumes });
      queryClient.invalidateQueries({ queryKey: queryKeys.stats });
    },
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateJobRequest) => jobService.createJob(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs });
      queryClient.invalidateQueries({ queryKey: queryKeys.stats });
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Job> }) =>
      jobService.updateJob(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs });
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => jobService.deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs });
      queryClient.invalidateQueries({ queryKey: queryKeys.stats });
    },
  });
};