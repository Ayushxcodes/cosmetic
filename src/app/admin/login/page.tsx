"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  Shield,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Authentication failed.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(from);
        router.refresh();
      }, 500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid credentials";
      setError(msg);
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail("admin@niimicosmetics.com");
    setPassword("Admin@Niimi2026");
    setError(null);
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

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-[#e8d9c0] p-8 sm:p-10 shadow-sm">
            {/* Header Icon & Title */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-full bg-[#f5ede0] border border-[#e8d9c0] text-[#b8935a] flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif lobster-two-bold text-[#1a1208]">
                Admin Sign In
              </h1>
              <p className="text-xs text-[#6b5c44] mt-2 leading-relaxed">
                Enter your credentials to access the Niimi store management dashboard.
              </p>
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
                <span>Authentication successful. Redirecting...</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b5c44] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7b68]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@niimicosmetics.com"
                    autoComplete="email"
                    className="w-full bg-[#faf6ef]/50 border border-[#e8d9c0] focus:border-[#b8935a] focus:bg-white focus:ring-2 focus:ring-[#b8935a]/15 rounded-xl py-2.5 pl-10 pr-4 text-sm text-[#1a1208] placeholder-[#9c8e7b] outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b5c44] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7b68]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    autoComplete="current-password"
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

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-[#6b5c44]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-[#e8d9c0] text-[#1a1208] focus:ring-[#b8935a]"
                  />
                  <span>Remember me for 7 days</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading || success}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-[#1a1208] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#b8935a] transition duration-200 flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Credentials Box */}
            <div className="mt-8 pt-6 border-t border-[#e8d9c0]/60">
              <div className="bg-[#faf6ef] rounded-xl p-3.5 border border-[#e8d9c0] text-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5 text-[#6b5c44] font-medium">
                    <KeyRound className="w-3.5 h-3.5 text-[#b8935a]" />
                    <span>Demo Admin Credentials</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleFillDemo}
                    className="text-[11px] font-semibold text-[#b8935a] hover:underline cursor-pointer"
                  >
                    Auto-Fill
                  </button>
                </div>
                <div className="font-mono text-[11px] space-y-1 text-[#4a3f31]">
                  <div className="flex justify-between">
                    <span className="text-[#8a7b68]">Email:</span>
                    <span>admin@niimicosmetics.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8a7b68]">Password:</span>
                    <span>Admin@Niimi2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center mt-6 text-xs text-[#8a7b68]">
            Secured with encrypted session tokens and HTTP-only cookies
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-xs text-[#8a7b68] border-t border-[#e8d9c0]/50">
        &copy; {new Date().getFullYear()} Niimi Cosmetics. All rights reserved.
      </footer>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#faf6ef] flex items-center justify-center text-[#6b5c44] text-sm">
          Loading login portal...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
