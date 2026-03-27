import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Interceptor for JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  register: (data) => api.post("/auth/register", data),
};

export const resumeService = {
  upload: (formData) => api.post("/resumes/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  }),
  getAll: () => api.get("/resumes/user"),
};

export const jobService = {
  create: (data) => api.post("/jobs", data),
  getAll: () => api.get("/jobs/user"),
};

export const aiService = {
  generate: (resumeId, jobId) => api.post("/generate", { resumeId, jobId }),
  getHistory: () => api.get("/generate/user"),
};

export default api;
