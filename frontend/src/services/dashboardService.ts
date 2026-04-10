import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/constants';
import type { DashboardStats } from '@/types';

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    return apiClient.get(API_ENDPOINTS.DASHBOARD.STATS);
  },
};
