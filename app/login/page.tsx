
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { loginSchema, LoginFormData, useAuth } from "@/lib/auth";
import { apiClient } from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const { toast } = useToast();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);
    try {
      const response = await apiClient.login(data);

      if (response.status === "error" || !response.data) {
        const errorMessage = response.error || "Failed to sign in";
        toast({
          title: "Authentication Error",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      // Handle successful login
      login(response.data);
      toast({
        title: "Success",
        description: "Successfully signed in",
      });
      router.push(redirectTo);
    } catch (error) {
      console.error("Login submission error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden lg:flex-row">
      {/* Left Column - Illustration */}
      <div className="relative hidden w-full overflow-hidden rounded-r-[32px] bg-[#f5e5ff] lg:block lg:w-[45%]">
        {/* Logo */}
        <div className="absolute left-12 top-12 z-10">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0L40 20L20 40L0 20L20 0Z" fill="#E53935" />
                <path d="M10 15L30 15L20 35L10 15Z" fill="#B71C1C" />
                <path d="M20 0L30 15L10 15L20 0Z" fill="#E53935" />
              </svg>
            </div>
            <div>
              <div className="font-bold leading-tight text-[#3f3f3f]">COLOMBO</div>
              <div className="-mt-1 text-xs font-medium text-[#E53935]">MAIL</div>
            </div>
          </div>
          <div className="mt-1 text-[10px] text-[#545454]">you sell we dispatch</div>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="flex w-full flex-col justify-between px-6 py-8 lg:w-[55%] lg:px-16 lg:py-12 xl:px-24">
        <div className="mx-auto w-full max-w-[380px]">
          <div className="mb-6 space-y-1.5">
            <h1 className="text-[22px] font-medium leading-tight text-[#3f3f3f] md:text-[26px]">
              Welcome Back to <br />
              <span className="text-[#9c4cd2]">Colombo Mail</span>
            </h1>
            <p className="text-[14px] text-[#a2a2a2]">Sign in to your account</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Enter your email" 
                        {...field} 
                        className="h-[46px] rounded-lg border border-[#e2e2e2] bg-[#fcfcfc]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Enter your password" 
                          {...field} 
                          className="h-[46px] rounded-lg border border-[#e2e2e2] bg-[#fcfcfc]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="h-[46px] w-full rounded-lg bg-[#9c4cd2] text-[14px] font-medium text-white transition-colors hover:bg-[#8a44bb]"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </Form>
        </div>

        <div className="mt-8 text-center text-[13px] text-[#a2a2a2] lg:mt-0">
          © {new Date().getFullYear()} Colombo Mail. All rights reserved.
        </div>
      </div>
    </div>
  );
}
