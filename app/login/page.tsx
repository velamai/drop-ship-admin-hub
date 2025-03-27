"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { auth } from "@/lib/auth";
import { PublicRoute } from "@/components/RouteGuards";

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const errors = {
      email: "",
      password: "",
    };

    // Email validation
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiClient.login({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (response.status === "success" && response.data?.token) {
        auth.setToken(response.data.token);
        router.push("/dashboard");
      } else {
        setFormErrors({
          email: "",
          password: "Invalid email or password",
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      setFormErrors({
        email: "",
        password: "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicRoute>
      <div className="flex min-h-screen items-center justify-center bg-[#fefcff] px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-[400px] space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#3f3f3f]">Welcome back!</h1>
            <p className="mt-2 text-[#a2a2a2]">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4 rounded-xl border border-[#e2e2e2] bg-white p-4 sm:p-6">
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-[14px] font-medium text-[#3f3f3f]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className={`h-[46px] w-full rounded-lg border ${formErrors.email ? "border-red-500" : "border-[#e2e2e2]"} bg-[#fcfcfc] px-3.5 text-[14px] outline-none focus:border-[#9c4cd2] focus:ring-1 focus:ring-[#9c4cd2]`}
                  placeholder="Enter your email"
                />
                {formErrors.email && <p className="text-xs text-red-500">{formErrors.email}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-[14px] font-medium text-[#3f3f3f]">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    className={`h-[46px] w-full rounded-lg border ${formErrors.password ? "border-red-500" : "border-[#e2e2e2]"} bg-[#fcfcfc] px-3.5 text-[14px] outline-none focus:border-[#9c4cd2] focus:ring-1 focus:ring-[#9c4cd2]`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {formErrors.password && <p className="text-xs text-red-500">{formErrors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#e2e2e2] text-[#9c4cd2] focus:ring-[#9c4cd2]"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-[14px] text-[#3f3f3f]">
                    Remember me
                  </label>
                </div>

                <Link
                  href="/forgot-password"
                  className="text-[14px] text-[#9c4cd2] hover:text-[#9c4cd2]/90"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-[46px] w-full rounded-lg bg-[#9a3bd9] text-[14px] font-medium text-white transition-colors hover:bg-[#9a3bd9]/90 disabled:opacity-70"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>

            <p className="text-center text-[14px] text-[#3f3f3f]">
              Don't have an account?{" "}
              <Link href="/register" className="font-medium text-[#9c4cd2] hover:text-[#9c4cd2]/90">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </PublicRoute>
  );
}
