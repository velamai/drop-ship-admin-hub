"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = auth.getToken();
    if (!token) {
      // Redirect to login if not authenticated
      router.push("/login");
    }
  }, [router]);

  // If there's a token, render the children
  if (auth.getToken()) {
    return <>{children}</>;
  }

  // Return null while checking authentication or redirecting
  return null;
}
