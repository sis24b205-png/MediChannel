"use client";

import { useState } from "react";
import Link from "next/link";

function MediChannelLogo() {
  return (
    <svg viewBox="0 0 100 100" className="h-12 w-12" fill="none">
      <path
        d="M50 87 C40 78 9 55 9 33 C9 15 31 7 50 29 C69 7 91 15 91 33 C91 55 60 78 50 87Z"
        stroke="#102A56"
        strokeWidth="6"
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

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    fullName: "John Silva",
    nic: "199812345678",
    dob: "1998-05-15",
    gender: "Male",
    phone: "0771234567",
    email: "johnsilva@gmail.com",
    address: "Colombo, Sri Lanka",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSave() {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handlePasswordChange() {
    if (
      !passwords.current ||
      !passwords.newPassword ||
      !passwords.confirm
    ) {
      alert("Please fill in all password fields.");
      return;
    }

    if (passwords.newPassword.length < 8) {
      alert("New password must contain at least 8 characters.");
      return;
    }

    if (passwords.newPassword !== passwords.confirm) {
      alert("New passwords do not match.");
      return;
    }

    alert("Password change demo completed!");
    setPasswords({ current: "", newPassword: "", confirm: "" });
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <Link href="/" className="flex items-center gap-2">
            <MediChannelLogo />
            <div>
              <h1 className="text-xl font-extrabold text-[#102A56]">
                MediChannel
              </h1>
              <p className="text-xs text-slate-500">
                Lanka Care Hospital
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
            <Link href="/" className="hover:text-blue-700">Home</Link>
            <Link href="/doctors" className="hover:text-blue-700">Find Doctors</Link>
            <Link href="/appointments" className="hover:text-blue-700">My Appointments</Link>
            <Link href="/queue" className="hover:text-blue-700">Live Queue</Link>
            <Link href="/dashboard" className="hover:text-blue-700">Dashboard</Link>
          </nav>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-[#102A56]">
            JS
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-blue-700">
            PATIENT ACCOUNT
          </p>
          <h2 className="text-3xl font-extrabold text-[#102A56]">
            My Profile
          </h2>
          <p className="mt-2 text-slate-500">
            Manage your personal information and account settings.
          </p>
        </div>

        {saved && (
          <div className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
            ✓ Your profile changes have been saved successfully.
          </div>
        )}

        <div className="grid gap-7 lg:grid-cols-3">
          {/* Left Profile Card */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="h-28 bg-gradient-to-r from-[#102A56] to-blue-700" />

              <div className="-mt-12 px-6 pb-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-blue-100 text-3xl font-extrabold text-[#102A56] shadow">
                  JS
                </div>

                <h3 className="mt-4 text-xl font-bold text-[#102A56]">
                  {form.fullName}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Patient Account
                </p>

                <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Patient ID</span>
                    <span className="font-semibold text-[#102A56]">P10025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Account Status</span>
                    <span className="font-semibold text-green-600">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Member Since</span>
                    <span className="font-semibold text-slate-700">2026</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 font-bold text-[#102A56]">
                Quick Links
              </h3>

              <div className="space-y-2">
                <Link href="/dashboard" className="flex items-center justify-between rounded-xl p-3 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700">
                  Dashboard <span>→</span>
                </Link>
                <Link href="/appointments" className="flex items-center justify-between rounded-xl p-3 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700">
                  My Appointments <span>→</span>
                </Link>
                <Link href="/doctors" className="flex items-center justify-between rounded-xl p-3 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700">
                  Find Doctors <span>→</span>
                </Link>
                <Link href="/queue" className="flex items-center justify-between rounded-xl p-3 text-sm font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-700">
                  Live Queue Status <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Personal Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-[#102A56]">
                    Personal Information
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Your personal details and contact information.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditing(!editing);
                    setSaved(false);
                  }}
                  className="rounded-xl border border-blue-200 px-4 py-2 text-sm font-bold text-blue-700 hover:bg-blue-50"
                >
                  {editing ? "Cancel Editing" : "✎ Edit Profile"}
                </button>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:text-slate-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    NIC Number
                  </label>
                  <input
                    name="nic"
                    value={form.nic}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:text-slate-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:text-slate-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:text-slate-600"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:text-slate-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:text-slate-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Home Address
                  </label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:text-slate-600"
                  />
                </div>
              </div>

              {editing && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleSave}
                    className="rounded-xl bg-[#102A56] px-7 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-800"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </section>

            {/* Change Password */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#102A56]">
                Change Password
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Update your account password to keep your account secure.
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwords.current}
                    onChange={(e) =>
                      setPasswords({ ...passwords, current: e.target.value })
                    }
                    placeholder="Enter current password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    New Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwords.newPassword}
                    onChange={(e) =>
                      setPasswords({ ...passwords, newPassword: e.target.value })
                    }
                    placeholder="Enter new password (minimum 8 characters)"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Confirm New Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwords.confirm}
                    onChange={(e) =>
                      setPasswords({ ...passwords, confirm: e.target.value })
                    }
                    placeholder="Re-enter new password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                    className="h-4 w-4 accent-blue-700"
                  />
                  Show passwords
                </label>

                <button
                  onClick={handlePasswordChange}
                  className="rounded-xl bg-[#102A56] px-6 py-3 text-sm font-bold text-white hover:bg-blue-800"
                >
                  Update Password
                </button>
              </div>
            </section>

            {/* Privacy Notice */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <div className="flex gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <h4 className="font-bold text-[#102A56]">
                    Your Information is Protected
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    MediChannel is designed to protect your personal and
                    medical information. Your account details should only be
                    accessible to authorised users.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 bg-[#102A56] px-5 py-6 text-center text-sm text-blue-100">
        © 2026 MediChannel – Lanka Care Hospital. All rights reserved.
      </footer>
    </div>
  );
}