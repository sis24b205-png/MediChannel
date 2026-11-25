"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function MediChannelLogo({ size = "h-16 w-16" }: { size?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${size} shrink-0`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 87 C40 78 9 55 9 33 C9 15 31 7 50 29 C69 7 91 15 91 33 C91 55 60 78 50 87Z"
        stroke="#102A56"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <path
        d="M12 51 H31 L40 39 L49 67 L58 32 L66 51 H77"
        stroke="#2563EB"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M75 15 V31 M67 23 H83"
        stroke="#2563EB"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

type UserRole = "Patient" | "Doctor" | "Manager" | "Admin";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("Patient");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    // FRONTEND DEMO ONLY.
    // Real authentication and role verification will be handled by Spring Boot.

    const dashboardRoutes: Record<UserRole, string> = {
      Patient: "/dashboard",
      Doctor: "/doctor-dashboard",
      Manager: "/manager-dashboard",
      Admin: "/admin-dashboard",
    };

    router.push(dashboardRoutes[role]);
  }

  return (
    <main className="min-h-screen bg-[#F1F6FF]">

      {/* Header */}
      <header className="flex items-center justify-between bg-white px-5 py-4 shadow-sm md:px-10">
        <Link href="/" className="flex items-center gap-2">
          <MediChannelLogo size="h-14 w-14" />
          <span className="text-2xl font-extrabold tracking-tight text-[#102A56] md:text-3xl">
            Medi<span className="text-blue-600">Channel</span>
          </span>
        </Link>

        <Link
          href="/register"
          className="flex items-center gap-2 font-bold text-blue-700 transition hover:text-blue-900"
        >
          Create Account
          <span className="text-xl">→</span>
        </Link>
      </header>

      {/* Main Section */}
      <section className="grid min-h-[calc(100vh-88px)] lg:grid-cols-2">

        {/* Left Side */}
        <div className="relative flex min-h-[620px] flex-col overflow-hidden bg-gradient-to-br from-[#061C48] via-[#063879] to-[#0877D8] px-7 py-12 text-white md:px-12 lg:min-h-[calc(100vh-88px)]">

          <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-[#102A56] shadow-lg">
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="font-bold">Welcome Back</span>
            </div>

            <h1 className="max-w-xl text-4xl font-extrabold leading-tight md:text-5xl">
              Your Health Journey Continues{" "}
              <span className="text-cyan-400">Here.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-8 text-blue-100 md:text-lg">
              Manage your appointments, connect with doctors and take care of
              your health with MediChannel.
            </p>

            <div className="mt-9 space-y-5">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-400/30 text-xl">
                  📅
                </span>
                <span className="font-semibold">Book Appointments Easily</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-400/30 text-xl">
                  ⏱️
                </span>
                <span className="font-semibold">Track Your Queue</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-400/30 text-xl">
                  ♥
                </span>
                <span className="font-semibold">Get Expert Care</span>
              </div>
            </div>
          </div>

          {/* Doctor Image */}
          <div className="pointer-events-none absolute bottom-0 right-0 h-[48%] w-[75%] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0877D8]/30 to-transparent" />
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&auto=format&fit=crop"
              alt="Doctor"
              className="h-full w-full object-cover object-top opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#063879] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0877D8]/20 via-transparent to-transparent" />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center px-5 py-12 md:px-10 lg:px-12">

          <div className="w-full max-w-xl rounded-[30px] border border-blue-100 bg-white px-6 py-9 shadow-[0_15px_50px_rgba(37,99,235,0.12)] md:px-12 md:py-10">

            {/* Logo */}
            <div className="mb-7 text-center">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-blue-50">
                <MediChannelLogo size="h-24 w-24" />
              </div>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#102A56]">
                Medi<span className="text-blue-600">Channel</span>
              </h2>

              <p className="mt-2 font-medium text-slate-600">
                Better Healthcare. Easier Appointments.
              </p>
            </div>

            {/* Heading */}
            <div className="mb-7 text-center">
              <h3 className="text-3xl font-extrabold text-[#102A56]">
                Sign In
              </h3>
              <p className="mt-2 text-slate-500">
                Enter your details to access your account.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-bold text-[#102A56]">
                  Email Address
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-blue-200 px-4 transition focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">
                  <svg className="h-6 w-6 shrink-0 text-[#102A56]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="h-14 w-full bg-transparent text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-bold text-[#102A56]">
                  Password
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-blue-200 px-4 transition focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">
                  <svg className="h-6 w-6 shrink-0 text-[#102A56]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="4" y="10" width="16" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    <path d="M12 14v3" />
                  </svg>

                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-14 w-full bg-transparent text-slate-800 outline-none placeholder:text-slate-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="shrink-0 text-sm font-bold text-blue-600 hover:text-blue-800"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Account Type */}
              <div>
                <label className="mb-2 block text-sm font-bold text-[#102A56]">
                  Account Type
                </label>

                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="h-14 w-full rounded-xl border border-blue-200 bg-white px-4 font-medium text-slate-700 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="Patient">Patient</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              {/* Remember & Forgot */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-slate-700">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 accent-blue-600"
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  onClick={() => setError("Forgot Password feature will be added later.")}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Error message */}
              {error && (
                <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              {/* Demo Notice */}
              <p className="rounded-lg bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800">
                Demo mode: Account type selection is for frontend testing only.
                Real login verification will be connected to the backend.
              </p>

              {/* Login Button */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#082D69] py-4 text-lg font-bold text-white shadow-lg shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-[#061F4B] hover:shadow-xl"
              >
                <span>↪</span>
                Login
              </button>

            </form>

            {/* Create Account */}
            <p className="mt-8 text-center text-sm text-slate-600">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-blue-600 hover:underline"
              >
                Create Account
              </Link>
            </p>

          </div>
        </div>
      </section>
    </main>
  );
}