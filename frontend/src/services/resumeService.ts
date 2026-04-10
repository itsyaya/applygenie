import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/constants';
import type { Resume, CreateResumeRequest } from '@/types';

export const resumeService = {
  async getResumes(): Promise<Resume[]> {
    return apiClient.get(API_ENDPOINTS.RESUMES.LIST);
  },

  async getResume(id: string): Promise<Resume> {
    return apiClient.get(API_ENDPOINTS.RESUMES.GET(id));
  },

  async createResume(data: CreateResumeRequest): Promise<Resume> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('file', data.file);

    return apiClient.post(API_ENDPOINTS.RESUMES.CREATE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async deleteResume(id: string): Promise<void> {
    return apiClient.delete(API_ENDPOINTS.RESUMES.DELETE(id));
  },

  async updateResume(id: string, data: Partial<Resume>): Promise<Resume> {
    return apiClient.put(API_ENDPOINTS.RESUMES.UPDATE(id), data);
  },
};
