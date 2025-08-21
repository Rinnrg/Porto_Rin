// Custom Hook untuk Authentication State Management
// Mengelola state user, login, logout, dan loading

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
// import { api } from '../services/api'; // Removed - services folder deleted

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
      const token = localStorage.getItem('auth_token');
      const hasToken = !!token;
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user || userData);
          setIsAuthenticated(true);
          console.log('✅ Token verified successfully');
        } else {
          throw new Error('Token verification failed');
        }
      } catch (error) {
        // Token invalid atau expired
        console.error('❌ Auth verification failed:', error);
        setUser(null);
        setIsAuthenticated(false);
        // Clear invalid token
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
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
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        // Store token and user data
        localStorage.setItem('auth_token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        
        setUser(result.user);
        setIsAuthenticated(true);
        return { success: true, user: result.user };
      }
      
      throw new Error(result.message || 'Login failed');
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
      
      // Try to logout from backend if token exists
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/logout`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
            },
          });
        } catch (error) {
          console.error('Backend logout error:', error);
          // Continue with local logout even if backend fails
        }
      }
      
      // Clear local storage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
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
      const token = localStorage.getItem('auth_token');
      if (!token) {
        logout();
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user || userData);
      } else {
        throw new Error('Failed to refresh user data');
      }
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
  token: typeof window !== "undefined" ? localStorage.getItem('auth_token') : null,
  };
};

export default useAuth;
