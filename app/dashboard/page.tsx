"use client";

import Link from "next/link";
import { useState } from "react";

function Icon({ type, className = "h-6 w-6" }: { type: string; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "calendar":
      return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M8 14h2M14 14h2M8 17h2" /></svg>;
    case "clipboard":
      return <svg {...common}><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3h6v1M9 10h6M9 14h6M9 17h3" /></svg>;
    case "clock":
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    case "medical":
      return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M12 7v10M7 12h10" /></svg>;
    case "doctor":
      return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0M9 16l3 3 3-3" /></svg>;
    case "home":
      return <svg {...common}><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z" /></svg>;
    case "profile":
      return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>;
    case "search":
      return <svg {...common}><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>;
    case "bell":
      return <svg {...common}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></svg>;
    default:
      return <svg {...common}><circle cx="12" cy="12" r="9" /></svg>;
  }
}

function MediLogo() {
  return (
    <svg viewBox="0 0 100 100" className="h-11 w-11 shrink-0" fill="none">
      <path d="M50 87 C40 78 9 55 9 33 C9 15 31 7 50 29 C69 7 91 15 91 33 C91 55 60 78 50 87Z" stroke="#102A56" strokeWidth="7" strokeLinejoin="round" />
      <path d="M12 51 H31 L40 39 L49 67 L58 32 L66 51 H77" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M75 15 V31 M67 23 H83" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

const menuItems = [
  { name: "Dashboard", icon: "home", href: "/dashboard" },
  { name: "Find Doctors", icon: "doctor", href: "/doctors" },
  { name: "Book Appointment", icon: "calendar", href: "/doctors" },
  { name: "My Appointments", icon: "clipboard", href: "/appointments" },
  { name: "Live Queue Status", icon: "clock", href: "/queue" },
  { name: "My Profile", icon: "profile", href: "/profile" },
  { name: "Notifications", icon: "bell", href: "/notifications" },
  { name: "Medical Records", icon: "medical", href: "/medical-records" },
  { name: "Online Consultation", icon: "medical", href: "/consultation" },
];

export default function DashboardPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-[#F3F7FF] text-slate-800">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col bg-white px-5 py-6 shadow-sm lg:flex">

          <Link href="/" className="mb-8 flex items-center gap-2">
            <MediLogo />
            <span className="text-xl font-extrabold text-[#102A56]">
              Medi<span className="text-blue-600">Channel</span>
            </span>
          </Link>

          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-slate-400">
            Main Menu
          </p>

          <nav className="space-y-1.5">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  item.name === "Dashboard"
                    ? "bg-[#102A56] text-white shadow-md"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                <Icon type={item.icon} className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Doctor Photo Card */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80"
              alt="Professional doctor"
              className="h-32 w-full object-cover object-top"
            />

            <div className="p-3">
              <h3 className="text-sm font-extrabold text-[#102A56]">
                Your Health Matters
              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Trusted healthcare and better appointments, all in one place.
              </p>
            </div>
          </div>

          {/* Help Card */}
          <div className="mt-5 rounded-2xl bg-[#F3F7FF] p-4">
            <div className="mb-2 flex items-center gap-2 text-blue-600">
              <Icon type="medical" className="h-5 w-5" />
              <h3 className="text-sm font-bold text-[#102A56]">Need Help?</h3>
            </div>
            <p className="text-xs leading-5 text-slate-500">
              We are here to help you with your healthcare journey.
            </p>
            <a
              href="mailto:support@medichannel.com"
              className="mt-2 inline-block text-xs font-bold text-blue-600"
            >
              Contact Support →
            </a>
          </div>

          <Link
            href="/login"
            className="mt-5 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
          >
            ↪ Sign Out
          </Link>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">

          {/* Top Navbar */}
          <header className="flex flex-wrap items-center justify-between gap-4 bg-white px-5 py-5 shadow-sm md:px-9">

            <div className="flex items-center gap-2 lg:hidden">
              <MediLogo />
              <span className="text-xl font-extrabold text-[#102A56]">MediChannel</span>
            </div>

            <div className="hidden sm:block">
              <h2 className="text-xl font-bold text-[#102A56]">Patient Dashboard</h2>
              <p className="text-sm text-slate-500">Manage your healthcare appointments</p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/notifications"
                aria-label="Open Notifications"
                title="Notifications"
                className="rounded-full bg-blue-50 p-2.5 text-[#102A56] hover:bg-blue-100"
              >
                <Icon type="bell" className="h-5 w-5" />
              </Link>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#102A56] font-bold text-white">P</div>
              <div>
                <p className="text-sm font-bold text-[#102A56]">Patient</p>
                <p className="text-xs text-slate-500">Customer Account</p>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl space-y-7 px-5 py-8 md:px-9">

            {/* Welcome Banner */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#102A56] via-[#124B91] to-[#1683D8] p-7 text-white shadow-xl md:p-10">
              <div className="relative z-10 max-w-xl">
                <p className="mb-3 text-sm font-medium text-blue-100">Welcome to MediChannel</p>
                <h1 className="text-3xl font-extrabold leading-tight md:text-4xl">
                  Welcome back, Patient!
                </h1>
                <p className="mt-4 text-sm leading-7 text-blue-100 md:text-base">
                  Your health matters to us. Book appointments, connect with doctors and manage your healthcare all in one place.
                </p>
                <Link href="/doctors" className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-[#102A56] shadow-lg transition hover:bg-blue-50">
                  + Book Appointment
                </Link>
              </div>
              <div className="pointer-events-none absolute -right-10 -top-20 h-72 w-72 rounded-full border-[35px] border-white/10" />
              <div className="pointer-events-none absolute -bottom-24 right-36 h-64 w-64 rounded-full border-[30px] border-cyan-200/10" />
              <div className="absolute bottom-5 right-8 hidden text-8xl opacity-20 md:block">🩺</div>
            </section>

            {/* Statistics Cards */}
            <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

              <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-slate-500">Upcoming Appointments</span>
                  <span className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <Icon type="calendar" className="h-7 w-7" />
                  </span>
                </div>
                <h2 className="mt-4 text-3xl font-extrabold text-[#102A56]">1</h2>
                <p className="mt-1 text-xs text-slate-400">Sample information</p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-slate-500">Total Appointments</span>
                  <span className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                    <Icon type="clipboard" className="h-7 w-7" />
                  </span>
                </div>
                <h2 className="mt-4 text-3xl font-extrabold text-[#102A56]">3</h2>
                <p className="mt-1 text-xs text-slate-400">Sample information</p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-slate-500">Current Queue</span>
                  <span className="rounded-xl bg-sky-50 p-3 text-sky-600">
                    <Icon type="clock" className="h-7 w-7" />
                  </span>
                </div>
                <h2 className="mt-4 text-3xl font-extrabold text-[#102A56]">A024</h2>
                <p className="mt-1 text-xs text-slate-400">Sample queue number</p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-slate-500">Consultation</span>
                  <span className="rounded-xl bg-cyan-50 p-3 text-cyan-600">
                    <Icon type="medical" className="h-7 w-7" />
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-extrabold text-[#102A56]">Physical</h2>
                <p className="mt-1 text-xs text-slate-400">Sample consultation type</p>
              </div>

            </section>

            {/* Appointment and Queue */}
            <section className="grid gap-6 xl:grid-cols-3">

              <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm xl:col-span-2">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-extrabold text-[#102A56]">Next Appointment</h2>
                    <p className="mt-1 text-sm text-slate-500">Your upcoming doctor consultation</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-600">Upcoming</span>
                </div>

                <div className="flex flex-col gap-5 rounded-2xl bg-blue-50/70 p-5 sm:flex-row sm:items-center">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white text-[#102A56] shadow-sm">
                    <Icon type="doctor" className="h-12 w-12" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-extrabold text-[#102A56]">Doctor Name</h3>
                    <p className="mt-1 text-sm font-medium text-blue-600">Specialisation</p>
                    <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                      <p>▦ Appointment Date</p>
                      <p>◷ Appointment Time</p>
                      <p>⌖ Hospital / Room</p>
                      <p>▣ Queue: A024</p>
                    </div>
                  </div>
                </div>

                <Link href="/appointments" className="mt-5 inline-block font-bold text-blue-600 hover:underline">
                  View My Appointments →
                </Link>
              </div>

              {/* Queue */}
              <div className="rounded-2xl bg-[#102A56] p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">Live Queue Status</h2>
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <p className="mt-2 text-sm text-blue-200">Your sample queue information</p>

                <div className="mt-7 rounded-2xl bg-white/10 p-5 text-center">
                  <p className="text-sm text-blue-200">Currently Serving</p>
                  <h3 className="mt-2 text-4xl font-extrabold">A024</h3>
                  <p className="mt-2 text-xs text-blue-200">Sample queue number</p>
                </div>

                <div className="mt-5 flex justify-between border-b border-white/20 pb-4">
                  <span className="text-sm text-blue-200">Next Number</span>
                  <span className="font-bold">A025</span>
                </div>
                <div className="mt-4 flex justify-between">
                  <span className="text-sm text-blue-200">Estimated Wait</span>
                  <span className="font-bold">5 min</span>
                </div>
                <Link href="/queue" className="mt-6 block rounded-xl bg-white py-3 text-center text-sm font-bold text-[#102A56] transition hover:bg-blue-100">
                  View Queue Details
                </Link>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-extrabold text-[#102A56]">Quick Actions</h2>
              <p className="mt-1 text-sm text-slate-500">What would you like to do today?</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { title: "Find Doctors", description: "Search available doctors", icon: "doctor", href: "/doctors" },
                  { title: "Book Appointment", description: "Schedule your consultation", icon: "calendar", href: "/doctors" },
                  { title: "My Appointments", description: "View your bookings", icon: "clipboard", href: "/appointments" },
                  { title: "My Profile", description: "Manage your information", icon: "profile", href: "/profile" },
                  { title: "Notifications", description: "View your latest alerts", icon: "bell", href: "/notifications" },
                  { title: "Medical Records", description: "View consultation summaries and prescriptions", icon: "medical", href: "/medical-records" },
                  { title: "Online Consultation", description: "Open your online doctor chat", icon: "medical", href: "/consultation" },
                ].map((item) => (
                  <Link key={item.title} href={item.href} className="rounded-2xl border border-blue-100 p-5 transition hover:-translate-y-1 hover:border-blue-400 hover:bg-blue-50">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon type={item.icon} className="h-7 w-7" />
                    </span>
                    <h3 className="mt-4 font-bold text-[#102A56]">{item.title}</h3>
                    <p className="mt-2 text-xs text-slate-500">{item.description}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Search Doctors */}
            <section className="rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 p-6 md:p-8">
              <div className="grid items-center gap-5 md:grid-cols-2">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#102A56]">Find the Right Doctor</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Search doctors and explore medical specialisations for your healthcare needs.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.location.href = search.trim()
                      ? `/doctors?search=${encodeURIComponent(search)}`
                      : "/doctors";
                  }}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Enter doctor name..."
                    className="min-w-0 flex-1 rounded-xl border border-blue-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                  />
                  <button type="submit" className="rounded-xl bg-[#102A56] px-6 py-3 font-bold text-white transition hover:bg-blue-800">
                    Search
                  </button>
                </form>
              </div>
            </section>

            <footer className="py-5 text-center text-xs text-slate-400">
              © 2026 MediChannel. Your Health, Our Priority.
            </footer>

          </div>
        </main>
      </div>
    </div>
  );
}