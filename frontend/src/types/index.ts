// Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// Resume Types
export interface Resume {
  id: string;
  userId: string;
  name: string;
  fileName: string;
  s3Url: string;
  uploadDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateResumeRequest {
  name: string;
  file: File;
}

// Job Types
export interface Job {
  id: string;
  userId: string;
  title: string;
  company: string;
  description: string;
  url?: string;
  savedDate: string;
  status: 'saved' | 'applied' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface CreateJobRequest {
  title: string;
  company: string;
  description: string;
  url?: string;
}

// Application Types
export interface Application {
  id: string;
  userId: string;
  jobId: string;
  resumeId: string;
  coverLetter?: string;
  status: 'draft' | 'submitted' | 'rejected' | 'accepted';
  appliedDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalResumes: number;
  totalJobs: number;
  totalApplications: number;
  recentApplications: Application[];
}

// API Response Wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  code?: string;
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
