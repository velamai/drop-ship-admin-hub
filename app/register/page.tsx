"use client";

import { useState, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { validateForm, validateEmail } from "@/lib/validation";
import { auth } from "@/lib/auth";
import { PublicRoute } from "@/components/RouteGuards";

export interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface OtpErrors {
  code?: string;
}

interface RegisterResponse {
  status: "success" | "error";
  message?: string;
  error?: string;
  data?: RegisterData;
}

interface RegisterData {
  token: string;
  user: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
  };
}

interface SendOtpResponse {
  success: boolean;
  message?: string;
}

interface VerifyResponse {
  success: boolean;
  message?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState<string>("");
  const [otpErrors, setOtpErrors] = useState<OtpErrors>({});
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingEmailOtp, setIsSendingEmailOtp] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // If changing email after verification, reset verification status
    if (name === "email" && isEmailVerified && value !== verifiedEmail) {
      setIsEmailVerified(false);
      setVerifiedEmail("");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value.trimStart(), // Trim leading whitespace while typing
    }));

    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Add OTP validation function
  const validateOtp = (otp: string): string | null => {
    if (!otp) {
      return "OTP is required";
    }
    if (!/^\d{6}$/.test(otp)) {
      return "OTP must be 6 digits";
    }
    return null;
  };

  const startResendTimer = () => {
    setResendTimer(30); // 30 seconds cooldown
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async () => {
    const trimmedEmail = formData.email.trim();

    // Validate email - Only set field error, no toast
    const emailError = validateEmail(trimmedEmail);
    if (emailError) {
      setFormErrors((prev) => ({ ...prev, email: emailError }));
      return;
    }

    setIsSendingEmailOtp(true); // New loading state for email verify button
    setIsResendingOtp(true);
    try {
      const response = await apiClient.sendOtp({
        identifier: trimmedEmail,
        type: "EMAIL",
      });

      const typedResponse = response as unknown as SendOtpResponse;

      if (typedResponse.success) {
        setShowVerifyModal(true);
        showToast("OTP sent successfully. Please check your email.", "success");
        startResendTimer();
        // Clear any existing OTP and errors when sending new OTP
        setOtpValue("");
        setOtpErrors({});
      } else {
        const errorMessage = typedResponse.message || "Failed to send OTP";
        if (errorMessage.toLowerCase().includes("already exists")) {
          setFormErrors((prev) => ({
            ...prev,
            email: "Email is already registered",
          }));
          showToast("This email is already registered", "info", {
            action: {
              label: "Sign In",
              onClick: () => router.push("/login"),
            },
          });
        } else if (errorMessage.toLowerCase().includes("too many requests")) {
          showToast("Please wait before requesting another OTP", "warning");
        } else {
          showToast(errorMessage, "error");
        }
      }
    } catch (error: any) {
      console.error("OTP Error:", error);
      if (!error.response) {
        showToast("Network error. Please check your connection.", "error");
      } else {
        const errorMessage = error.response.data?.message || "Failed to send OTP";
        showToast(errorMessage, "error");
      }
    } finally {
      setIsSendingEmailOtp(false);
      setIsResendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    // Clear previous errors
    setOtpErrors({});
    setIsVerifying(true);

    // Validate OTP format
    const otpError = validateOtp(otpValue);
    if (otpError) {
      setOtpErrors({ code: otpError });
      setIsVerifying(false);
      return;
    }

    try {
      const response = await apiClient.verifyOtp({
        identifier: formData.email.trim(),
        type: "EMAIL",
        otp: otpValue,
      });

      const typedResponse = response as unknown as VerifyResponse;

      if (typedResponse.success) {
        setShowVerifyModal(false);
        setIsEmailVerified(true);
        setVerifiedEmail(formData.email.trim());
        showToast("Email verified successfully", "success");
        setOtpValue("");
        setOtpErrors({});
      } else {
        const errorMessage = typedResponse.message?.toLowerCase() || "";

        if (errorMessage.includes("expired")) {
          showToast("OTP has expired. Please request a new one.", "warning");
          setOtpErrors({ code: "OTP has expired" });
        } else if (errorMessage.includes("invalid")) {
          setOtpErrors({ code: "Invalid OTP code" });
        } else if (errorMessage.includes("attempts")) {
          showToast("Too many failed attempts. Please request a new OTP.", "warning");
          setOtpErrors({ code: "Too many failed attempts" });
        } else {
          setOtpErrors({ code: typedResponse.message || "Verification failed" });
        }
        setOtpValue("");
      }
    } catch (error: any) {
      console.error("Verify Error:", error);
      if (!error.response) {
        showToast("Network error. Please check your connection.", "error");
      } else {
        const errorMessage = error.response.data?.message || "Verification failed";
        setOtpErrors({ code: errorMessage });
      }
      setOtpValue("");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleRegister = async () => {
    // Check if email is verified
    if (!isEmailVerified) {
      showToast("Please verify your email before registering", "warning");
      return;
    }

    // Trim all form data before validation
    const trimmedData = {
      firstname: formData.firstname.trim(),
      lastname: formData.lastname.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      confirmPassword: formData.confirmPassword.trim(),
    };

    // Validate form inputs - Only set field errors, no toasts
    const errors = validateForm(trimmedData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = (await apiClient.register({
        firstname: trimmedData.firstname,
        lastname: trimmedData.lastname,
        email: trimmedData.email,
        password: trimmedData.password,
        usertype: "dropship",
      })) as RegisterResponse;

      if (response.status === "success" && response.data?.token) {
        auth.setToken(response.data.token);
        showToast("Registration successful! Redirecting to dashboard...", "success");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else if (response.status === "error") {
        // Handle API error responses
        const errorMessage = API_ERROR_MESSAGES.getErrorMessage({ 
          response: { data: { error: response.error } } 
        });
        
        showToast(errorMessage, "error", {
          // Add Sign In action only for "User already exists" error
          ...(errorMessage === "User already exists" && {
            action: {
              label: "Sign In",
              onClick: () => router.push("/login"),
            },
          }),
        });
      }
    } catch (error: any) {
      console.error("Registration Error:", error);
      const errorMessage = API_ERROR_MESSAGES.getErrorMessage(error);
      
      showToast(errorMessage, "error", {
        // Add Sign In action only for "User already exists" error
        ...(errorMessage === "User already exists" && {
          action: {
            label: "Sign In",
            onClick: () => router.push("/login"),
          },
        }),
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
            <h1 className="text-2xl font-bold text-[#3f3f3f]">Create an account</h1>
            <p className="mt-2 text-[#a2a2a2]">Sign up to get started</p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="space-y-4 rounded-xl border border-[#e2e2e2] bg-white p-4 sm:p-6">
              <div className="space-y-1.5">
                <label htmlFor="firstname" className="block text-[14px] font-medium text-[#3f3f3f]">
                  First Name
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  className={`h-[46px] w-full rounded-lg border ${formErrors.firstname ? "border-red-500" : "border-[#e2e2e2]"} bg-[#fcfcfc] px-3.5 text-[14px] outline-none focus:border-[#9c4cd2] focus:ring-1 focus:ring-[#9c4cd2]`}
                />
                {formErrors.firstname && <p className="text-xs text-red-500">{formErrors.firstname}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="lastname" className="block text-[14px] font-medium text-[#3f3f3f]">
                  Last Name
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                  className={`h-[46px] w-full rounded-lg border ${formErrors.lastname ? "border-red-500" : "border-[#e2e2e2]"} bg-[#fcfcfc] px-3.5 text-[14px] outline-none focus:border-[#9c4cd2] focus:ring-1 focus:ring-[#9c4cd2]`}
                />
                {formErrors.lastname && <p className="text-xs text-red-500">{formErrors.lastname}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-[14px] font-medium text-[#3f3f3f]">
                  Email
                </label>
                <div className="flex gap-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className={`h-[46px] w-full rounded-lg border ${formErrors.email ? "border-red-500" : "border-[#e2e2e2]"} bg-[#fcfcfc] px-3.5 text-[14px] outline-none focus:border-[#9c4cd2] focus:ring-1 focus:ring-[#9c4cd2]`}
                    disabled={isEmailVerified}
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isEmailVerified || isSendingEmailOtp || resendTimer > 0}
                    className="h-[46px] whitespace-nowrap rounded-lg bg-[#9a3bd9] px-4 text-[14px] font-medium text-white transition-colors hover:bg-[#9a3bd9]/90 disabled:opacity-70"
                  >
                    {isEmailVerified
                      ? "✓ Verified"
                      : isSendingEmailOtp
                      ? "Sending..."
                      : resendTimer > 0
                      ? `Wait ${resendTimer}s`
                      : "Verify Email"}
                  </button>
                </div>
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
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a password"
                    className={`h-[46px] w-full rounded-lg border ${formErrors.password ? "border-red-500" : "border-[#e2e2e2]"} bg-[#fcfcfc] px-3.5 text-[14px] outline-none focus:border-[#9c4cd2] focus:ring-1 focus:ring-[#9c4cd2]`}
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

              <div className="space-y-1.5">
                <label htmlFor="confirmPassword" className="block text-[14px] font-medium text-[#3f3f3f]">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm password"
                    className={`h-[46px] w-full rounded-lg border ${formErrors.confirmPassword ? "border-red-500" : "border-[#e2e2e2]"} bg-[#fcfcfc] px-3.5 text-[14px] outline-none focus:border-[#9c4cd2] focus:ring-1 focus:ring-[#9c4cd2]`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {formErrors.confirmPassword && <p className="text-xs text-red-500">{formErrors.confirmPassword}</p>}
              </div>
            </div>

            <button
              type="submit"
              onClick={handleRegister}
              disabled={isSubmitting}
              className="h-[46px] w-full rounded-lg bg-[#9a3bd9] text-[14px] font-medium text-white transition-colors hover:bg-[#9a3bd9]/90 disabled:opacity-70"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>

            <p className="text-center text-[14px] text-[#3f3f3f]">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-[#9c4cd2] hover:text-[#9c4cd2]/90">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* OTP Verification Modal */}
        {showVerifyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-[400px] rounded-xl border border-[#e2e2e2] bg-white p-6">
              <h2 className="text-xl font-bold text-[#3f3f3f]">Verify Email</h2>
              <p className="mt-2 text-[#a2a2a2]">
                Please enter the 6-digit code sent to your email address.
              </p>

              <div className="mt-4 space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="otp" className="block text-[14px] font-medium text-[#3f3f3f]">
                    Verification Code
                  </label>
                  <input
                    id="otp"
                    type="text"
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="Enter 6-digit code"
                    className={`h-[46px] w-full rounded-lg border ${otpErrors.code ? "border-red-500" : "border-[#e2e2e2]"} bg-[#fcfcfc] px-3.5 text-[14px] outline-none focus:border-[#9c4cd2] focus:ring-1 focus:ring-[#9c4cd2]`}
                  />
                  {otpErrors.code && <p className="text-xs text-red-500">{otpErrors.code}</p>}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowVerifyModal(false)}
                    className="h-[46px] w-full rounded-lg border border-[#e2e2e2] bg-white text-[14px] font-medium text-[#3f3f3f] transition-colors hover:bg-[#f9f9f9]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={isVerifying || otpValue.length !== 6}
                    className="h-[46px] w-full rounded-lg bg-[#9a3bd9] text-[14px] font-medium text-white transition-colors hover:bg-[#9a3bd9]/90 disabled:opacity-70"
                  >
                    {isVerifying ? "Verifying..." : "Verify"}
                  </button>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isResendingOtp || resendTimer > 0}
                    className="text-[14px] text-[#9c4cd2] hover:text-[#9c4cd2]/90 disabled:opacity-70"
                  >
                    {resendTimer > 0
                      ? `Resend code in ${resendTimer}s`
                      : isResendingOtp
                      ? "Sending..."
                      : "Resend code"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PublicRoute>
  );
}
