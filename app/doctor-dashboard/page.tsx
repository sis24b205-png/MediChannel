"use client";

import { useState } from "react";
import Link from "next/link";

type Patient = {
  id: number;
  name: string;
  appointment: string;
  time: string;
  type: "Physical" | "Online";
  status: "Waiting" | "Completed" | "No Show";
};

const initialPatients: Patient[] = [
  { id: 1, name: "John Silva", appointment: "A021", time: "09:00 AM", type: "Physical", status: "Completed" },
  { id: 2, name: "Amira Fernando", appointment: "A022", time: "09:15 AM", type: "Physical", status: "Completed" },
  { id: 3, name: "Mohamed Rizwan", appointment: "A023", time: "09:30 AM", type: "Physical", status: "Waiting" },
  { id: 4, name: "Fathima Nazeera", appointment: "A024", time: "09:45 AM", type: "Online", status: "Waiting" },
  { id: 5, name: "Sarah Perera", appointment: "A025", time: "10:00 AM", type: "Online", status: "Waiting" },
];

function MediChannelLogo() {
  return (
    <svg viewBox="0 0 100 100" className="h-11 w-11 shrink-0" fill="none">
      <path
        d="M50 87 C40 78 9 55 9 33 C9 15 31 7 50 29 C69 7 91 15 91 33 C91 55 60 78 50 87Z"
        stroke="#102A56"
        strokeWidth="6"
        strokeLinecap="round"
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

export default function DoctorDashboard() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<string | null>(null);

  const waitingPatients = patients.filter((p) => p.status === "Waiting");
  const completedPatients = patients.filter((p) => p.status === "Completed");
  const noShowPatients = patients.filter((p) => p.status === "No Show");

  function callNextPatient() {
    if (!sessionStarted) return;

    const next = patients.find((p) => p.status === "Waiting");

    if (!next) {
      alert("No waiting patients remaining.");
      return;
    }

    setCurrentPatient(next.appointment);

    setPatients((previous) =>
      previous.map((p) =>
        p.id === next.id ? { ...p, status: "Completed" } : p
      )
    );
  }

  function markNoShow(id: number) {
    setPatients((previous) =>
      previous.map((p) =>
        p.id === id && p.status === "Waiting"
          ? { ...p, status: "No Show" }
          : p
      )
    );
  }

  function completeSession() {
    setSessionStarted(false);
    setCurrentPatient(null);
    alert("Doctor session completed.");
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
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

          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-semibold text-slate-600 sm:block">
              Dr. Sarah Williams
            </span>
            <Link
              href="/login"
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Logout
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-9">
        {/* Welcome */}
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Doctor Workspace
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-[#102A56] md:text-4xl">
            Welcome, Dr. Sarah Williams!
          </h2>
          <p className="mt-2 text-slate-500">
            Manage your sessions, patients and consultations.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Patients", value: patients.length, icon: "👥" },
            { label: "Waiting Patients", value: waitingPatients.length, icon: "⏳" },
            { label: "Completed", value: completedPatients.length, icon: "✓" },
            { label: "No Show", value: noShowPatients.length, icon: "✕" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-500">
                  {item.label}
                </p>
                <span className="text-2xl">{item.icon}</span>
              </div>
              <p className="mt-3 text-3xl font-extrabold text-[#102A56]">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Session and Current Patient */}
        <div className="mb-7 grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl bg-gradient-to-br from-[#061C48] to-[#164A91] p-6 text-white shadow-sm lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-blue-200">
                  Today's Session
                </p>
                <h3 className="mt-1 text-2xl font-extrabold">
                  Cardiology Consultation
                </h3>
              </div>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
                25 November 2026
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200">Session Time</p>
                <p className="mt-1 text-lg font-bold">
                  09:00 AM – 12:00 PM
                </p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200">Room</p>
                <p className="mt-1 text-lg font-bold">Room 02</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200">Specialisation</p>
                <p className="mt-1 text-lg font-bold">Cardiology</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {!sessionStarted ? (
                <button
                  onClick={() => setSessionStarted(true)}
                  className="rounded-lg bg-white px-5 py-3 font-bold text-[#102A56] hover:bg-blue-50"
                >
                  Start Session
                </button>
              ) : (
                <>
                  <span className="rounded-lg bg-green-400/20 px-4 py-3 font-bold text-green-100">
                    Session Active
                  </span>
                  <button
                    onClick={callNextPatient}
                    disabled={waitingPatients.length === 0}
                    className="rounded-lg bg-white px-5 py-3 font-bold text-[#102A56] hover:bg-blue-50 disabled:opacity-50"
                  >
                    Call Next Patient
                  </button>
                  <button
                    onClick={completeSession}
                    className="rounded-lg border border-white/40 px-5 py-3 font-bold text-white hover:bg-white/10"
                  >
                    End Session
                  </button>
                </>
              )}
            </div>
          </section>

          {/* Current Patient */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#102A56]">
              Current Patient
            </h3>

            {currentPatient ? (
              <>
                <p className="mt-5 text-sm text-slate-500">Now serving</p>
                <p className="mt-1 text-4xl font-extrabold text-blue-700">
                  {currentPatient}
                </p>
                <p className="mt-3 text-sm text-green-700">
                  Patient marked as completed in this demo.
                </p>
              </>
            ) : (
              <div className="mt-5 rounded-xl bg-slate-50 p-5 text-center">
                <p className="text-3xl">🩺</p>
                <p className="mt-2 font-semibold text-slate-600">
                  No patient called yet
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Start your session to begin.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Patient Queue */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
            <div>
              <h3 className="text-xl font-bold text-[#102A56]">
                Patient Queue
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Today's scheduled patients
              </p>
            </div>
            <span className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700">
              {waitingPatients.length} Waiting
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-4">Queue No.</th>
                  <th className="px-5 py-4">Patient Name</th>
                  <th className="px-5 py-4">Time</th>
                  <th className="px-5 py-4">Type</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {patients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-extrabold text-[#102A56]">
                      {patient.appointment}
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-700">
                      {patient.name}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {patient.time}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {patient.type}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          patient.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : patient.status === "No Show"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {patient.status === "Waiting" ? (
                        <button
                          onClick={() => markNoShow(patient.id)}
                          disabled={!sessionStarted}
                          className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 disabled:opacity-40"
                        >
                          Mark No-Show
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Quick Links */}
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <Link
            href="/consultation"
            className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm hover:border-blue-300"
          >
            <p className="text-2xl">💻</p>
            <h3 className="mt-2 font-bold text-[#102A56]">
              Online Consultation
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Open the online consultation demo.
            </p>
          </Link>

          <Link
            href="/medical-records"
            className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm hover:border-blue-300"
          >
            <p className="text-2xl">📋</p>
            <h3 className="mt-2 font-bold text-[#102A56]">
              Patient Medical Records
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              View the sample consultation records page.
            </p>
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Demo data only. Real patient records, queue updates and session
          controls require backend API integration.
        </p>
      </div>

      <footer className="bg-[#061C48] px-5 py-6 text-center text-sm text-blue-100">
        © 2026 MediChannel - Lanka Care Hospital. All rights reserved.
      </footer>
    </main>
  );
}