import { UserType } from "@/types";

interface ApiResponse<T = any> {
  status: "success" | "error";
  data?: T;
  message?: string;
  error?: string;
}

interface SendOtpPayload {
  identifier: string;
  type: "EMAIL" | "PHONE";
}

interface VerifyOtpPayload {
  identifier: string;
  type: "EMAIL" | "PHONE";
  otp: string;
}

export interface RegisterPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  usertype: UserType;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

    const defaultHeaders = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      if (!response.ok) {
        // Try to parse error response
        try {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        } catch (e) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  }

  async sendOtp(payload: SendOtpPayload) {
    return this.request("/send-otp", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async verifyOtp(payload: VerifyOtpPayload) {
    return this.request("/verify-otp", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async register(payload: RegisterPayload) {
    console.log('Registering user:', payload);
    return this.request('/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async login(payload: LoginPayload) {
    return this.request("/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async forgotPassword(email: string) {
    return this.request("/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(payload: ResetPasswordPayload) {
    return this.request("/reset-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async getProfile() {
    return this.request("/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  async updateProfile(data: any) {
    return this.request("/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
  }

  async changePassword(oldPassword: string, newPassword: string) {
    return this.request("/change-password", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
  }
}

export const apiClient = new ApiClient();
