"use client";

import { useState, type FormEvent } from "react";

/* MEDICHANNEL HEART LOGO */
function MediChannelLogo({ size = "h-12 w-12" }: { size?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${size} shrink-0`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="MediChannel logo"
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

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const fullName = String(data.get("fullName") || "").trim();
    const nic = String(data.get("nic") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const dob = String(data.get("dob") || "");
    const password = String(data.get("password") || "");
    const confirmPassword = String(data.get("confirmPassword") || "");

    if (!fullName) {
      setError("Please enter your full name.");
      return;
    }

    const nicPattern = /^([0-9]{9}[VvXx]|[0-9]{12})$/;
    const phonePattern = /^07[0-9]{8}$/;
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!nicPattern.test(nic)) {
      setError("Please enter a valid Sri Lankan NIC number.");
      return;
    }

    if (!phonePattern.test(phone)) {
      setError("Phone number must be in the format 07XXXXXXXX.");
      return;
    }

    const birthDate = new Date(`${dob}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!dob || Number.isNaN(birthDate.getTime()) || birthDate > today) {
      setError("Please enter a valid date of birth.");
      return;
    }

    if (!passwordPattern.test(password)) {
      setError(
        "Password must have 8 characters, a letter, a number and a symbol."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSuccess(
      "Your form is valid! Connect the Spring Boot backend to create your account."
    );
  };

  return (
    <main className="min-h-screen bg-[#EFF6FF] font-sans">

      {/* HEADER */}
      <header className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 shadow-sm md:px-12">

        <a href="/" className="flex items-center gap-3">
          <MediChannelLogo />

          <span className="text-2xl font-extrabold tracking-tight">
            <span className="text-[#102A56]">Medi</span>
            <span className="text-blue-500">Channel</span>
          </span>
        </a>

        <p className="text-xs font-medium text-slate-600 sm:text-sm">
          Already a member?{" "}
          <a
            href="/login"
            className="font-extrabold text-blue-600 transition hover:text-[#102A56] hover:underline"
          >
            Sign In
          </a>
        </p>

      </header>

      {/* SPLIT SCREEN */}
      <section className="mx-auto grid min-h-[calc(100vh-76px)] max-w-[1500px] lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="relative hidden overflow-hidden bg-[#102A56] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">

          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl" />

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Your health, our priority
            </div>

            <h1 className="mt-10 max-w-xl text-5xl font-extrabold leading-tight xl:text-6xl">
              Your Journey to
              <span className="mt-2 block text-blue-300">
                Better Health
              </span>
              Starts Here.
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-8 text-blue-100">
              Join MediChannel and experience a smarter way to find doctors,
              book appointments and follow your queue in real time.
            </p>

          </div>

          {/* DOCTOR IMAGE */}
          <div className="relative z-10 my-10">

            <div className="overflow-hidden rounded-[2rem] border-4 border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1100&q=90"
                alt="Doctor at MediChannel"
                className="h-[280px] w-full object-cover object-center xl:h-[330px]"
              />
            </div>

            <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-white/40 bg-white p-5 text-[#102A56] shadow-xl sm:left-10 sm:right-10">

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                  🩺
                </div>

                <div>
                  <p className="font-extrabold">
                    Healthcare made simple
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Book your appointment with confidence.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* STATS */}
          <div className="relative z-10 grid grid-cols-3 gap-4 border-t border-white/20 pt-8">

            <div>
              <p className="text-3xl font-extrabold">40+</p>
              <p className="mt-1 text-sm text-blue-200">Doctors</p>
            </div>

            <div>
              <p className="text-3xl font-extrabold">15</p>
              <p className="mt-1 text-sm text-blue-200">Specialities</p>
            </div>

            <div>
              <p className="text-3xl font-extrabold">120+</p>
              <p className="mt-1 text-sm text-blue-200">Weekly Sessions</p>
            </div>

          </div>

          <p className="relative z-10 mt-8 text-xs text-blue-200">
            © 2026 MediChannel. All rights reserved.
          </p>

        </div>

        {/* RIGHT SIDE - REGISTRATION FORM */}
        <div className="flex items-center justify-center px-5 py-10 md:px-10 lg:px-12 xl:px-20">

          <div className="w-full max-w-xl">

            {/* MOBILE BRAND */}
            <div className="mb-8 text-center lg:hidden">

              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl border border-blue-100 bg-white shadow-md">
                <MediChannelLogo size="h-14 w-14" />
              </div>

              <h1 className="text-3xl font-extrabold text-[#102A56]">
                Medi<span className="text-blue-500">Channel</span>
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Better Healthcare. Easier Appointments.
              </p>

            </div>

            {/* FORM HEADING */}
            <div className="mb-8">

              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                Create Account
              </p>

              <h2 className="mt-2 text-3xl font-extrabold text-[#102A56] md:text-4xl">
                Let's Get You Started
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Create your MediChannel patient account and enjoy a simpler
                way to manage your healthcare appointments.
              </p>

            </div>

            {/* FORM CARD */}
            <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-900/5 md:p-8">

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* FULL NAME */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-[#102A56]">
                    Full Name *
                  </label>

                  <input
                    name="fullName"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* NIC */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-[#102A56]">
                    NIC Number *
                  </label>

                  <input
                    name="nic"
                    type="text"
                    required
                    placeholder="Enter your NIC number"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* DOB AND GENDER */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-bold text-[#102A56]">
                      Date of Birth *
                    </label>

                    <input
                      name="dob"
                      type="date"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-[#102A56]">
                      Gender *
                    </label>

                    <select
                      name="gender"
                      required
                      defaultValue=""
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="" disabled>Select gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

                </div>

                {/* PHONE */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-[#102A56]">
                    Phone Number *
                  </label>

                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="07XXXXXXXX"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-[#102A56]">
                    Email Address *
                  </label>

                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="example@gmail.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* ADDRESS */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-[#102A56]">
                    Home Address *
                  </label>

                  <textarea
                    name="address"
                    required
                    rows={3}
                    placeholder="Enter your home address"
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-[#102A56]">
                    Password *
                  </label>

                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Create a strong password"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-20 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-600"
                    >
                      {showPassword ? "HIDE" : "SHOW"}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    8+ characters, with a letter, number and symbol.
                  </p>
                </div>

                {/* CONFIRM PASSWORD */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-[#102A56]">
                    Confirm Password *
                  </label>

                  <div className="relative">
                    <input
                      name="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      required
                      placeholder="Re-enter your password"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-20 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-600"
                    >
                      {showConfirm ? "HIDE" : "SHOW"}
                    </button>
                  </div>
                </div>

                {/* ERROR */}
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                {/* SUCCESS */}
                {success && (
                  <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                    {success}
                  </div>
                )}

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-[#102A56] to-blue-700 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-blue-900/20 transition duration-300 hover:-translate-y-0.5 hover:from-[#0B1D3A] hover:to-blue-800 hover:shadow-xl"
                >
                  Create My Account →
                </button>

                <p className="text-center text-xs leading-5 text-slate-400">
                  By creating an account, you agree to use MediChannel
                  responsibly and provide accurate information.
                </p>

                <p className="text-center text-sm text-slate-500">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-extrabold text-blue-600 hover:underline"
                  >
                    Sign In
                  </a>
                </p>

              </form>

            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
              © 2026 MediChannel. All rights reserved.
            </p>

          </div>
        </div>

      </section>
    </main>
  );
}