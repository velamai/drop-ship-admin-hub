
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

  // Add more API methods as needed
}

export const apiClient = new ApiClient();
