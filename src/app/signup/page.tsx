"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Lock,
  Mail,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from") || "/account";
  const { checkAuth } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setError("Please enter your full name (minimum 2 characters).");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    if (!agreeTerms) {
      setError("Please accept the Terms of Service to create your account.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create account. Please try again.");
      }

      await checkAuth();
      setSuccess(true);
      setTimeout(() => {
        router.push(fromParam);
        router.refresh();
      }, 600);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration error";
      setError(msg);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf6ef] text-[#1a1208] flex flex-col justify-between">
      {/* Top Header */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between border-b border-[#e8d9c0]/50">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/official_logo.png"
            alt="Niimi"
            width={1280}
            height={1280}
            className="h-10 w-auto object-contain"
            style={{ width: "auto" }}
            priority
          />
        </Link>

        <Link
          href="/shop"
          className="text-xs uppercase tracking-[0.15em] font-semibold text-[#6b5c44] hover:text-[#1a1208] transition flex items-center gap-1.5"
        >
          <span>Storefront</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* Main Registration Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-3xl border border-[#e8d9c0] p-8 sm:p-10 shadow-xs">
            {/* Header Icon & Title */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#faf6ef] border border-[#e8d9c0] text-[#b8935a] flex items-center justify-center mx-auto mb-4 shadow-inner">
                <Sparkles className="w-6 h-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif lobster-two-bold text-[#1a1208]">
                Create an Account
              </h1>
              <p className="text-xs text-[#6b5c44] mt-2 leading-relaxed max-w-sm mx-auto">
                Join the Niimi Client Atelier to track your formulations, reorder past rituals, and
                enjoy Kyoto member privileges.
              </p>
            </div>

            {/* Quick Mode Toggle */}
            <div className="flex bg-[#faf6ef] p-1 rounded-2xl border border-[#e8d9c0]/70 mb-6">
              <Link
                href="/login"
                className="flex-1 py-2 text-center text-xs font-semibold uppercase tracking-wider rounded-xl text-[#6b5c44] hover:text-[#1a1208] transition"
              >
                Log In
              </Link>
              <div className="flex-1 py-2 text-center text-xs font-bold uppercase tracking-wider rounded-xl bg-white text-[#1a1208] shadow-2xs">
                Create Account
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span className="leading-snug">{error}</span>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Account created successfully! Preparing your dashboard...</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b5c44] mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7b68]" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Elena Rostova"
                    className="w-full bg-[#faf6ef]/50 border border-[#e8d9c0] focus:border-[#b8935a] focus:bg-white focus:ring-2 focus:ring-[#b8935a]/15 rounded-xl py-2.5 pl-10 pr-4 text-sm text-[#1a1208] placeholder-[#9c8e7b] outline-none transition"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b5c44] mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7b68]" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="elena@example.com"
                    autoComplete="off"
                    className="w-full bg-[#faf6ef]/50 border border-[#e8d9c0] focus:border-[#b8935a] focus:bg-white focus:ring-2 focus:ring-[#b8935a]/15 rounded-xl py-2.5 pl-10 pr-4 text-sm text-[#1a1208] placeholder-[#9c8e7b] outline-none transition"
                  />
                </div>
              </div>

              {/* Phone (Optional) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b5c44] mb-1.5">
                  Phone Number <span className="text-[10px] text-[#8a7b68] font-normal lowercase">(optional for order tracking)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7b68]" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#faf6ef]/50 border border-[#e8d9c0] focus:border-[#b8935a] focus:bg-white focus:ring-2 focus:ring-[#b8935a]/15 rounded-xl py-2.5 pl-10 pr-4 text-sm text-[#1a1208] placeholder-[#9c8e7b] outline-none transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b5c44] mb-1.5">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7b68]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 6 characters"
                    autoComplete="new-password"
                    className="w-full bg-[#faf6ef]/50 border border-[#e8d9c0] focus:border-[#b8935a] focus:bg-white focus:ring-2 focus:ring-[#b8935a]/15 rounded-xl py-2.5 pl-10 pr-10 text-sm text-[#1a1208] placeholder-[#9c8e7b] outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8a7b68] hover:text-[#1a1208] transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b5c44] mb-1.5">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7b68]" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    autoComplete="new-password"
                    className="w-full bg-[#faf6ef]/50 border border-[#e8d9c0] focus:border-[#b8935a] focus:bg-white focus:ring-2 focus:ring-[#b8935a]/15 rounded-xl py-2.5 pl-10 pr-10 text-sm text-[#1a1208] placeholder-[#9c8e7b] outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8a7b68] hover:text-[#1a1208] transition"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Terms agreement */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-[#6b5c44]">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded border-[#e8d9c0] text-[#1a1208] focus:ring-[#b8935a]"
                  />
                  <span>
                    I agree to the{" "}
                    <Link href="/terms" target="_blank" className="underline hover:text-[#1a1208]">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" target="_blank" className="underline hover:text-[#1a1208]">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || success}
                className="w-full mt-3 py-3.5 px-4 rounded-xl bg-[#1a1208] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#b8935a] transition duration-200 flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating Your Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Already have an account */}
            <div className="mt-6 pt-6 border-t border-[#e8d9c0]/50 text-center">
              <p className="text-xs text-[#6b5c44]">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-[#1a1208] hover:text-[#b8935a] transition underline ml-1"
                >
                  Log In
                </Link>
              </p>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="text-center mt-6 flex items-center justify-center gap-2 text-xs text-[#8a7b68]">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Encrypted Data Storage • J-Beauty Atelier Privileges</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-xs text-[#8a7b68] border-t border-[#e8d9c0]/50">
        &copy; {new Date().getFullYear()} Niimi Cosmetics. Kyoto, Japan.
      </footer>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf6ef] flex items-center justify-center text-[#6b5c44] text-sm">
          Loading sign up portal...
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  );
}
