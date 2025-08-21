// API untuk unified-about (AboutMe)
export const unifiedAboutApi = {
  getAllSections: () => api.get('/unified-about'),
  createSection: (data: any) => api.post('/unified-about', data),
  updateSection: (id: string, data: any) => api.put(`/unified-about/${id}`, data),
  deleteSection: (id: string) => api.delete(`/unified-about/${id}`),
  uploadLogo: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file); // Sesuaikan dengan backend
    const response = await fetch(`${API_BASE_URL}/unified-about/upload-logo`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken() || ''}`,
      },
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to upload logo');
    const data = await response.json();
    return data.url || data.logo || data.path;
  },
};
// API service functions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Token management functions
const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
};

const setToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth_token', token);
};

const removeToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth_token');
};

// Helper function to get headers with auth token
const getHeaders = (includeAuth = true): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

export const api = {
  get: async (endpoint: string, includeAuth = true) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: getHeaders(includeAuth),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  post: async (endpoint: string, data: any, includeAuth = true) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(includeAuth),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  put: async (endpoint: string, data: any, includeAuth = true) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(includeAuth),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  delete: async (endpoint: string, includeAuth = true) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(includeAuth),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  // Token management methods
  getToken,
  setToken,
  removeToken,
};

// Portfolio specific API calls
export const portfolioApi = {
  getProjects: () => api.get('/projects'),
  getProject: (id: string) => api.get(`/projects/${id}`),
  getAbout: () => api.get('/about'),
  getCV: () => api.get('/cv'),
  updateAbout: (data: any) => api.put('/about', data),
  updateCV: (data: any) => api.put('/cv', data),
  createProject: (data: any) => api.post('/projects', data),
  updateProject: (id: string, data: any) => api.put(`/projects/${id}`, data),
  deleteProject: (id: string) => api.delete(`/projects/${id}`),
};
