import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterCredentials, StudentAccessCredentials } from './types';
import { authService } from './auth-service';

interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  loginStudent: (credentials: StudentAccessCredentials) => Promise<void>;
  logout: () => void;
  clearSession: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'skolapp_token';
const USER_KEY = 'skolapp_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    if (typeof window === 'undefined') {
      return { user: null, token: null, isLoading: false };
    }

    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const userStr = localStorage.getItem(USER_KEY);
      
      if (token && userStr) {
        const user = JSON.parse(userStr);
        // Verify token is still valid
        const verifiedUser = authService.verifyToken(token);
        if (verifiedUser) {
          return { user: verifiedUser, token, isLoading: false };
        }
      }
    } catch (error) {
      console.warn('Failed to restore auth state:', error);
    }

    return { user: null, token: null, isLoading: false };
  });

  // Save to localStorage when auth state changes
  useEffect(() => {
    try {
      if (authState.user && authState.token) {
        localStorage.setItem(TOKEN_KEY, authState.token);
        localStorage.setItem(USER_KEY, JSON.stringify(authState.user));
      } else {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    } catch (error) {
      console.warn('Failed to save auth state:', error);
    }
  }, [authState]);

  // Auto-logout after token expires (24h)
  useEffect(() => {
    if (authState.token) {
      const timeout = setTimeout(() => {
        logout();
      }, 24 * 60 * 60 * 1000); // 24 hours

      return () => clearTimeout(timeout);
    }
  }, [authState.token]);

  const login = async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const user = await authService.loginTeacher(credentials);
      const token = authService.generateToken(user);
      setAuthState({ user, token, isLoading: false });
    } catch (error) {
      setAuthState({ user: null, token: null, isLoading: false });
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const user = await authService.registerTeacher(credentials);
      const token = authService.generateToken(user);
      setAuthState({ user, token, isLoading: false });
    } catch (error) {
      setAuthState({ user: null, token: null, isLoading: false });
      throw error;
    }
  };

  const loginStudent = async (credentials: StudentAccessCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const user = await authService.createStudentSession(credentials.classCode, credentials.pseudonym);
      const token = authService.generateToken(user);
      setAuthState({ user, token, isLoading: false });
    } catch (error) {
      setAuthState({ user: null, token: null, isLoading: false });
      throw error;
    }
  };

  const logout = () => {
    setAuthState({ user: null, token: null, isLoading: false });
  };

  const clearSession = () => {
    logout();
  };

  return (
    <AuthContext.Provider 
      value={{ 
        ...authState, 
        login, 
        register, 
        loginStudent, 
        logout, 
        clearSession 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}