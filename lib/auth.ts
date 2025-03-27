
import { z } from "zod";

// Type definitions for authentication
export interface AuthUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  usertype: string;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
}

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

// Zod schemas for validation
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const auth = {
  setSession(session: AuthSession) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_TOKEN_KEY, session.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(session.user));
    }
  },

  // Add the missing setToken method for backward compatibility
  setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    }
  },

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    }
    return null;
  },

  getUser(): AuthUser | null {
    if (typeof window !== 'undefined') {
      const userJson = localStorage.getItem(AUTH_USER_KEY);
      if (userJson) {
        try {
          return JSON.parse(userJson) as AuthUser;
        } catch (error) {
          console.error('Failed to parse user data:', error);
          return null;
        }
      }
    }
    return null;
  },

  clearSession() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    }
  },

  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getUser();
  }
};

// Hook to check if user is authenticated on client side
export const useAuth = () => {
  const isAuthenticated = auth.isAuthenticated();
  const user = auth.getUser();
  const token = auth.getToken();
  
  return {
    isAuthenticated,
    user,
    token,
    login: (session: AuthSession) => auth.setSession(session),
    logout: () => auth.clearSession(),
  };
};
