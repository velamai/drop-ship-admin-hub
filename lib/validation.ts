import { FormData } from "@/app/register/page";

export interface FormErrors {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const validateEmail = (email: string): string | null => {
  if (!email) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }

  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }

  // Check for at least one number
  if (!/\d/.test(password)) {
    return "Password must contain at least one number";
  }

  // Check for at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character";
  }

  return null;
};

export const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  // Validate first name
  if (!data.firstname.trim()) {
    errors.firstname = "First name is required";
  } else if (!/^[a-zA-Z]{2,}$/.test(data.firstname.trim())) {
    errors.firstname = "First name should only contain letters and be at least 2 characters long";
  }

  // Validate last name
  if (!data.lastname.trim()) {
    errors.lastname = "Last name is required";
  } else if (!/^[a-zA-Z]{2,}$/.test(data.lastname.trim())) {
    errors.lastname = "Last name should only contain letters and be at least 2 characters long";
  }

  // Validate email
  const emailError = validateEmail(data.email);
  if (emailError) {
    errors.email = emailError;
  }

  // Validate password
  const passwordError = validatePassword(data.password);
  if (passwordError) {
    errors.password = passwordError;
  }

  // Validate confirm password
  if (!data.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
