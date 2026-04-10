import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((request) => {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('applygenie_token');
    if (token) {
      request.headers = request.headers ?? {};
      request.headers.Authorization = `Bearer ${token}`;
    }
  }
  return request;
});

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends AuthCredentials {
  name: string;
}

export interface ResumePayload {
  title: string;
  content: string;
}

export interface JobPayload {
  title: string;
  company: string;
  description: string;
}

export async function loginRequest(credentials: AuthCredentials) {
  const response = await client.post('/api/auth/login', credentials);
  return response.data;
}

export async function registerRequest(credentials: RegisterCredentials) {
  const response = await client.post('/api/auth/register', credentials);
  return response.data;
}

export async function fetchResumes() {
  const response = await client.get('/api/resumes');
  return response.data || [];
}

export async function createResume(payload: ResumePayload) {
  const response = await client.post('/api/resumes', payload);
  return response.data;
}

export async function deleteResume(id: string) {
  const response = await client.delete(`/api/resumes/${id}`);
  return response.data;
}

export async function fetchJobs() {
  const response = await client.get('/api/jobs');
  return response.data || [];
}

export async function createJob(payload: JobPayload) {
  const response = await client.post('/api/jobs', payload);
  return response.data;
}
