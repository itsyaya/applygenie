import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/constants';
import type { Job, CreateJobRequest } from '@/types';

export const jobService = {
  async getJobs(): Promise<Job[]> {
    return apiClient.get(API_ENDPOINTS.JOBS.LIST);
  },

  async getJob(id: string): Promise<Job> {
    return apiClient.get(API_ENDPOINTS.JOBS.GET(id));
  },

  async createJob(data: CreateJobRequest): Promise<Job> {
    return apiClient.post(API_ENDPOINTS.JOBS.CREATE, data);
  },

  async deleteJob(id: string): Promise<void> {
    return apiClient.delete(API_ENDPOINTS.JOBS.DELETE(id));
  },

  async updateJob(id: string, data: Partial<Job>): Promise<Job> {
    return apiClient.put(API_ENDPOINTS.JOBS.UPDATE(id), data);
  },
};
