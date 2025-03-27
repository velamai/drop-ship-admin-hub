
import Cookies from "js-cookie";
import { AuthSession, AuthUser } from "./auth";

// 7 days in seconds
const DEFAULT_EXPIRY = 60 * 60 * 24 * 7;

export const cookieUtils = {
  setSession(session: AuthSession, expiryInSeconds = DEFAULT_EXPIRY) {
    // Set secure HttpOnly cookie in production (handled by middleware)
    if (process.env.NODE_ENV === "development") {
      Cookies.set("auth_token", session.token, {
        expires: expiryInSeconds / (60 * 60 * 24), // Convert seconds to days
        path: "/",
        sameSite: "lax",
      });
      
      Cookies.set("auth_user", JSON.stringify(session.user), {
        expires: expiryInSeconds / (60 * 60 * 24),
        path: "/",
        sameSite: "lax",
      });
    }
    
    // Also store in localStorage for client-side access
    localStorage.setItem("auth_token", session.token);
    localStorage.setItem("auth_user", JSON.stringify(session.user));
  },
  
  clearSession() {
    Cookies.remove("auth_token");
    Cookies.remove("auth_user");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  },
  
  getToken(): string | null {
    return Cookies.get("auth_token") || localStorage.getItem("auth_token");
  },
  
  getUser(): AuthUser | null {
    const userJson = Cookies.get("auth_user") || localStorage.getItem("auth_user");
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        return null;
      }
    }
    return null;
  },
  
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
};
