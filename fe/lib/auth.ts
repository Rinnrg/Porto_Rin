
// Auth Library - Updated for direct API calls (services folder removed)
// import { api } from '../services/api'; // Removed - services folder deleted

export interface User {
  id: number;
  username: string;
  name?: string;
  email: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

// Authenticate user dengan backend Laravel
export const authenticateUser = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    // Direct API call instead of using api service
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    
    if (response.ok && data.success) {
      // Store token and user data
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    }
    
    return {
      success: false,
      message: data.message || 'Login failed'
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Login failed'
    };
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  // Check localStorage instead of api service
  const token = localStorage.getItem('auth_token');
  return !!token;
};

// Login function
export const login = async (username: string, password: string): Promise<boolean> => {
  try {
    const result = await authenticateUser(username, password);
    return result.success;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

// Logout function
export const logout = async (): Promise<void> => {
  // Clear localStorage instead of using api service
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
};

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  // Get from localStorage instead of api service
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
  return null;
};

// Get user profile from backend
export const getUserProfile = async (): Promise<User | null> => {
  try {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return null;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.user || data;
    }
    
    return null;
  } catch (error) {
    console.error('Get profile error:', error);
    return null;
  }
};
