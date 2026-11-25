"use client";

import Link from "next/link";
import { useState } from "react";

const queueUpdates = [
  {
    number: "A021",
    message: "Consultation completed",
    time: "09:15 AM",
    status: "Completed",
  },
  {
    number: "A022",
    message: "Consultation completed",
    time: "09:30 AM",
    status: "Completed",
  },
  {
    number: "A023",
    message: "Patient is currently consulting",
    time: "09:45 AM",
    status: "In Progress",
  },
  {
    number: "A024",
    message: "You are next in the queue",
    time: "10:00 AM",
    status: "Waiting",
  },
];

function MediChannelLogo() {
  return (
    <svg viewBox="0 0 100 100" className="h-11 w-11" fill="none">
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

function QueueIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path
        d="M4 6H20M4 12H20M4 18H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="2" cy="6" r="1" fill="currentColor" />
      <circle cx="2" cy="12" r="1" fill="currentColor" />
      <circle cx="2" cy="18" r="1" fill="currentColor" />
    </svg>
  );
}

export default function LiveQueuePage() {
  const [showNotification, setShowNotification] = useState(true);

  const currentQueue = 23;
  const patientQueue = 24;
  const patientsAhead = patientQueue - currentQueue - 1;
  const estimatedMinutes = patientsAhead * 15;

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-2">
            <MediChannelLogo />
            <span className="text-xl font-extrabold sm:text-2xl">
              <span className="text-[#102A56]">Medi</span>
              <span className="text-blue-600">Channel</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-bold text-[#102A56] md:flex">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/doctors" className="hover:text-blue-600">Find Doctors</Link>
            <Link href="/appointments" className="hover:text-blue-600">My Appointments</Link>
            <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
            <Link href="/queue" className="text-blue-600">Live Queue</Link>
          </nav>

          <Link
            href="/login"
            className="rounded-xl bg-[#102A56] px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-800"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#061C48] via-[#102A56] to-[#07549A] px-6 py-12 text-white md:py-16">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">
            MediChannel Patient Services
          </p>

          <h1 className="text-4xl font-extrabold md:text-5xl">
            Live Queue Status
          </h1>

          <p className="mt-3 max-w-2xl text-lg text-blue-100">
            Track your appointment queue in real time and know when your
            consultation is approaching.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10">
        {/* Notification */}
        {showNotification && (
          <div className="mb-7 flex items-start justify-between gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-4">
            <div className="flex gap-3">
              <span className="text-2xl">🔔</span>
              <div>
                <h3 className="font-extrabold text-[#102A56]">
                  Queue Update
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Your appointment number A024 is approaching. Please stay
                  ready for your consultation.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowNotification(false)}
              className="text-xl font-bold text-slate-500 hover:text-slate-800"
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        )}

        {/* Appointment information */}
        <div className="mb-7 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-gradient-to-br from-[#061C48] to-[#174B91] p-7 text-white shadow-lg lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-blue-200">
                  YOUR APPOINTMENT NUMBER
                </p>
                <h2 className="mt-3 text-6xl font-extrabold tracking-wider">
                  A024
                </h2>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-center">
                <span className="text-3xl">🎫</span>
                <p className="mt-1 text-xs font-bold text-blue-100">
                  Booking Reference
                </p>
                <p className="mt-1 font-extrabold">MC102458</p>
              </div>
            </div>

            <div className="mt-7 border-t border-white/20 pt-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-blue-200">Doctor</p>
                  <p className="mt-1 font-bold">Dr. Sarah Williams</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Speciality</p>
                  <p className="mt-1 font-bold">Cardiology</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Date</p>
                  <p className="mt-1 font-bold">25 November 2026</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200">Consultation Type</p>
                  <p className="mt-1 font-bold">Physical Consultation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Waiting time */}
          <div className="flex flex-col justify-center rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
              ⏱️
            </div>

            <p className="mt-5 font-semibold text-slate-500">
              Estimated Waiting Time
            </p>

            <h2 className="mt-2 text-5xl font-extrabold text-[#102A56]">
              {estimatedMinutes}
              <span className="ml-2 text-xl">min</span>
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Based on the current queue progress. Actual waiting time may
              change.
            </p>
          </div>
        </div>

        {/* Queue stats */}
        <div className="mb-8 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Currently Calling
            </p>
            <h3 className="mt-3 text-4xl font-extrabold text-blue-700">
              A023
            </h3>
            <p className="mt-2 text-xs text-slate-500">Current patient</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Patients Ahead
            </p>
            <h3 className="mt-3 text-4xl font-extrabold text-amber-600">
              {patientsAhead}
            </h3>
            <p className="mt-2 text-xs text-slate-500">
              Patients before your turn
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Total Queue
            </p>
            <h3 className="mt-3 text-4xl font-extrabold text-green-600">
              35
            </h3>
            <p className="mt-2 text-xs text-slate-500">
              Registered appointments
            </p>
          </div>
        </div>

        {/* Queue progress */}
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold text-[#102A56]">
                Your Queue Progress
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Follow your position in the consultation queue.
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
              Waiting
            </span>
          </div>

          <div className="mt-8">
            <div className="relative flex items-center justify-between">
              <div className="absolute left-0 right-0 top-5 h-2 rounded-full bg-slate-200" />
              <div className="absolute left-0 top-5 h-2 w-2/3 rounded-full bg-blue-600" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-xl text-white">
                  ✓
                </div>
                <p className="mt-3 text-xs font-bold text-slate-600">
                  Booked
                </p>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl text-white">
                  <QueueIcon />
                </div>
                <p className="mt-3 text-xs font-bold text-blue-700">
                  In Queue
                </p>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-slate-200 bg-white text-xl text-slate-400">
                  3
                </div>
                <p className="mt-3 text-xs font-bold text-slate-500">
                  Your Turn
                </p>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-slate-200 bg-white text-xl text-slate-400">
                  ✓
                </div>
                <p className="mt-3 text-xs font-bold text-slate-500">
                  Completed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Queue activity */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-[#061C48] to-[#102A56] px-6 py-5 text-white">
            <div>
              <h2 className="text-xl font-extrabold">
                Recent Queue Activity
              </h2>
              <p className="mt-1 text-sm text-blue-200">
                Latest consultation updates
              </p>
            </div>
            <QueueIcon />
          </div>

          <div className="divide-y divide-slate-100">
            {queueUpdates.map((item) => (
              <div
                key={item.number}
                className="flex flex-wrap items-center justify-between gap-4 p-5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 font-extrabold text-[#102A56]">
                    {item.number.slice(1)}
                  </div>

                  <div>
                    <p className="font-extrabold text-[#102A56]">
                      Queue {item.number}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {item.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                      item.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : item.status === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help section */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-blue-50 p-6 sm:flex-row">
          <div>
            <h3 className="font-extrabold text-[#102A56]">
              Need Assistance?
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Contact the hospital reception if you need help with your queue.
            </p>
          </div>

          <Link
            href="/appointments"
            className="rounded-xl bg-[#102A56] px-5 py-3 text-sm font-bold text-white hover:bg-blue-800"
          >
            My Appointments
          </Link>
        </div>
      </section>

      <footer className="bg-[#081B38] px-6 py-8 text-center text-sm text-blue-200">
        <p className="text-xl font-extrabold text-white">
          Medi<span className="text-blue-400">Channel</span>
        </p>
        <p className="mt-2">Better Healthcare. Easier Appointments.</p>
        <p className="mt-4">© 2026 MediChannel. All rights reserved.</p>
      </footer>
    </main>
  );
}