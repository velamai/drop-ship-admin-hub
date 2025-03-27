
import axios from 'axios';
import { LoginFormData, AuthSession } from './auth';

// Define API response types
export type ApiResponse<T = any> = {
  status: 'success' | 'error';
  data?: T;
  error?: string;
  message?: string;
};

// Enhanced error interface to properly type API errors
export interface ApiError extends Error {
  response?: {
    status: number;
    data: {
      status: string;
      error?: string;
      message?: string;
    };
  };
  isAxiosError?: boolean;
}

// Types for OTP verification
export interface SendOtpRequest {
  identifier: string;
  type: string;
}

export interface VerifyOtpRequest {
  identifier: string;
  type: string;
  otp: string;
}

// Type for user registration
export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  usertype: string;
}

class ApiClient {
  private readonly BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://lzoerrcjxcafmbundltd.supabase.co/functions/v1';
  
  private getAuthHeaders() {
    // Get token from local storage if available
    const token = localStorage.getItem('auth_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async login(credentials: LoginFormData): Promise<ApiResponse<AuthSession>> {
    try {
      console.log('Login attempt:', { email: credentials.email });
      
      const response = await axios.post(`${this.BASE_URL}/signin`, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Login response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      
      const apiError = error as ApiError;
      if (apiError.response?.data) {
        return {
          status: 'error',
          error: apiError.response.data.error || apiError.response.data.message,
          message: apiError.response.data.message || apiError.response.data.error,
        };
      }
      
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        message: 'Failed to connect to the server. Please check your connection and try again.',
      };
    }
  }

  // Add the missing methods for OTP and registration
  async sendOtp(data: SendOtpRequest): Promise<ApiResponse> {
    try {
      const response = await axios.post(`${this.BASE_URL}/send-otp`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Send OTP error:', error);
      
      const apiError = error as ApiError;
      if (apiError.response?.data) {
        return {
          status: 'error',
          error: apiError.response.data.error || apiError.response.data.message,
          message: apiError.response.data.message || apiError.response.data.error,
        };
      }
      
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        message: 'Failed to send OTP. Please check your connection and try again.',
      };
    }
  }

  async verifyOtp(data: VerifyOtpRequest): Promise<ApiResponse> {
    try {
      const response = await axios.post(`${this.BASE_URL}/verify-otp`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Verify OTP error:', error);
      
      const apiError = error as ApiError;
      if (apiError.response?.data) {
        return {
          status: 'error',
          error: apiError.response.data.error || apiError.response.data.message,
          message: apiError.response.data.message || apiError.response.data.error,
        };
      }
      
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        message: 'Failed to verify OTP. Please check your code and try again.',
      };
    }
  }

  async register(data: RegisterRequest): Promise<ApiResponse> {
    try {
      const response = await axios.post(`${this.BASE_URL}/register`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      
      const apiError = error as ApiError;
      if (apiError.response?.data) {
        return {
          status: 'error',
          error: apiError.response.data.error || apiError.response.data.message,
          message: apiError.response.data.message || apiError.response.data.error,
        };
      }
      
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        message: 'Failed to register. Please check your information and try again.',
      };
    }
  }
}

export const apiClient = new ApiClient();
