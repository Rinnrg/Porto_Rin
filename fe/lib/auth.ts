
// Auth Library - Updated untuk Laravel Sanctum Backend
import { api } from '../services/api';

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
    const result = await api.login(username, password);
    return result;
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
  return api.isAuthenticated();
};

// Login function
export const login = async (username: string, password: string): Promise<boolean> => {
  try {
    const result = await api.login(username, password);
    return result.success;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

// Logout function
export const logout = async (): Promise<void> => {
  await api.logout();
};

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  return api.getStoredUser();
};

// Get user profile from backend
export const getUserProfile = async (): Promise<User | null> => {
  try {
    return await api.me();
  } catch (error) {
    console.error('Get profile error:', error);
    return null;
  }
};
