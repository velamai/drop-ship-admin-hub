
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth, AuthUser } from "@/lib/auth";
import { cookieUtils } from "@/lib/cookies";

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

export const useAuthContext = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Initialize auth state from cookies/localStorage
    const checkAuth = () => {
      const storedUser = cookieUtils.getUser();
      const token = cookieUtils.getToken();
      
      setUser(storedUser);
      setIsAuthenticated(!!token && !!storedUser);
      setIsLoading(false);
    };
    
    checkAuth();
    
    // Listen for storage events (e.g., logout in another tab)
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Handle redirects based on auth state
  useEffect(() => {
    if (isLoading) return;
    
    if (!isAuthenticated && !pathname?.startsWith("/login")) {
      router.push(`/login?redirect=${encodeURIComponent(pathname || "/dashboard")}`);
    } else if (isAuthenticated && (pathname === "/login" || pathname === "/")) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  const login = (token: string, userData: AuthUser) => {
    cookieUtils.setSession({ token, user: userData });
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    cookieUtils.clearSession();
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
