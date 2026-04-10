import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/constants';
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/types';

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse & { token?: string; jwt?: string }>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    return {
      ...response,
      accessToken: response.accessToken || response.token || response.jwt || '',
    };
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse & { token?: string; jwt?: string }>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );

    return {
      ...response,
      accessToken: response.accessToken || response.token || response.jwt || '',
    };
  },

  async refresh(refreshToken: string): Promise<{ accessToken: string }> {
    return apiClient.post(API_ENDPOINTS.AUTH.REFRESH, { refreshToken });
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      // Continue logout even if request fails
      console.error('Logout request failed:', error);
    }
  },
};
