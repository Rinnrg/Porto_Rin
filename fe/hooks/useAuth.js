// Custom Hook untuk Authentication State Management
// Mengelola state user, login, logout, dan loading

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { api } from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Check authentication status saat component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      
      console.log('🔍 Checking auth status...');
      
      // Cek apakah ada token di localStorage
      const hasToken = api.isAuthenticated();
      console.log('📝 Has token in localStorage:', hasToken);
      
      if (!hasToken) {
        console.log('❌ No token found');
        setUser(null);
        setIsAuthenticated(false);
        return;
      }

      // Langsung verify token dengan backend tanpa set authenticated dulu
      try {
        console.log('🔄 Verifying token with backend...');
        const userData = await api.me();
        setUser(userData);
        setIsAuthenticated(true);
        console.log('✅ Token verified successfully');
      } catch (error) {
        // Token invalid atau expired
        console.error('❌ Auth verification failed:', error);
        setUser(null);
        setIsAuthenticated(false);
        // Token sudah dihapus oleh api.me() jika error 401
      }
    } catch (error) {
      console.error('❌ Auth check error:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
      console.log('🏁 Auth check completed');
    }
  };

  // LOGIN function
  const login = useCallback(async (username, password) => {
    try {
      setLoading(true);
      
      const result = await api.login(username, password);
      
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
        return { success: true, user: result.user };
      }
      
      throw new Error('Login failed');
    } catch (error) {
      console.error('Login error:', error);
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // LOGOUT function
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await api.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
      
      // Redirect ke login page
      router.push('/admin/login');
    }
  }, [router]);

  // REFRESH user data
  const refreshUser = useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      const userData = await api.me();
      setUser(userData);
    } catch (error) {
      console.error('Refresh user error:', error);
      // Jika refresh gagal, logout user
      logout();
    }
  }, [isAuthenticated, logout]);

  return {
    // State
    user,
    loading,
    isAuthenticated,
    
    // Actions
    login,
    logout,
    checkAuthStatus,
    refreshUser,
    
    // Utilities
    token: api.getToken(),
  };
};

export default useAuth;
