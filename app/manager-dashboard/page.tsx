"use client";

import { useState } from "react";
import Link from "next/link";

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

type Appointment = {
  id: string;
  patient: string;
  doctor: string;
  date: string;
  time: string;
  type: "Physical" | "Online";
  status: "Confirmed" | "Pending" | "Cancelled";
};

const initialAppointments: Appointment[] = [
  {
    id: "MC001",
    patient: "John Silva",
    doctor: "Dr. Sarah Williams",
    date: "25 Nov 2026",
    time: "09:00 AM",
    type: "Physical",
    status: "Confirmed",
  },
  {
    id: "MC002",
    patient: "Mary Fernando",
    doctor: "Dr. Michael Fernando",
    date: "25 Nov 2026",
    time: "10:00 AM",
    type: "Online",
    status: "Confirmed",
  },
  {
    id: "MC003",
    patient: "David Perera",
    doctor: "Dr. Emily Perera",
    date: "25 Nov 2026",
    time: "11:00 AM",
    type: "Physical",
    status: "Pending",
  },
  {
    id: "MC004",
    patient: "Aisha Mohamed",
    doctor: "Dr. James Peris",
    date: "25 Nov 2026",
    time: "11:30 AM",
    type: "Online",
    status: "Confirmed",
  },
];

const doctors = [
  { name: "Dr. Sarah Williams", speciality: "Cardiology", sessions: 12 },
  { name: "Dr. Michael Fernando", speciality: "Neurology", sessions: 10 },
  { name: "Dr. Emily Perera", speciality: "Paediatrics", sessions: 8 },
  { name: "Dr. James Peris", speciality: "Dermatology", sessions: 9 },
  { name: "Dr. Olivia Silva", speciality: "Orthopaedics", sessions: 11 },
  { name: "Dr. Daniel Fernando", speciality: "General Medicine", sessions: 7 },
];

export default function ManagerDashboard() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [activeTab, setActiveTab] = useState("Overview");
  const [search, setSearch] = useState("");

  function updateStatus(id: string, status: Appointment["status"]) {
    setAppointments((previous) =>
      previous.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status }
          : appointment
      )
    );
  }

  const filteredAppointments = appointments.filter((appointment) =>
    `${appointment.id} ${appointment.patient} ${appointment.doctor}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const stats = [
    {
      title: "Total Appointments",
      value: appointments.length,
      icon: "📅",
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Total Doctors",
      value: 40,
      icon: "👨‍⚕️",
      color: "bg-indigo-50 text-indigo-700",
    },
    {
      title: "Today's Sessions",
      value: 12,
      icon: "🏥",
      color: "bg-green-50 text-green-700",
    },
    {
      title: "Pending Appointments",
      value: appointments.filter((a) => a.status === "Pending").length,
      icon: "⏳",
      color: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <MediChannelLogo />
            <div>
              <h1 className="text-xl font-extrabold text-[#102A56]">
                MediChannel
              </h1>
              <p className="text-xs text-slate-500">Manager Portal</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-semibold text-slate-600 sm:block">
              Hospital Manager
            </span>
            <Link
              href="/login"
              className="rounded-lg bg-[#102A56] px-4 py-2 text-sm font-bold text-white hover:bg-blue-800"
            >
              Logout
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-7 lg:grid-cols-[240px_1fr]">
        {/* SIDEBAR */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="mb-4 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Manager Menu
          </p>

          <div className="space-y-2">
            {[
              { name: "Overview", icon: "📊" },
              { name: "Appointments", icon: "📅" },
              { name: "Doctors", icon: "👨‍⚕️" },
              { name: "Sessions", icon: "🏥" },
              { name: "Reports", icon: "📈" },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  activeTab === item.name
                    ? "bg-[#102A56] text-white"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-800"
                }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </button>
            ))}
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5">
            <p className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
              Other Portals
            </p>
            <Link
              href="/dashboard"
              className="mt-3 block rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-blue-50"
            >
              Patient Dashboard
            </Link>
            <Link
              href="/doctor-dashboard"
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-blue-50"
            >
              Doctor Dashboard
            </Link>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="min-w-0">
          <div className="mb-7">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
              Lanka Care Hospital
            </p>
            <h2 className="mt-1 text-3xl font-extrabold text-[#102A56]">
              Manager Dashboard
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Monitor hospital appointments, doctors and daily operations.
            </p>
          </div>

          {/* OVERVIEW */}
          {activeTab === "Overview" && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.title}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`rounded-xl p-3 text-2xl ${stat.color}`}>
                        {stat.icon}
                      </span>
                      <span className="text-xs font-semibold text-green-600">
                        Hospital overview
                      </span>
                    </div>
                    <p className="mt-5 text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>
                    <p className="mt-1 text-3xl font-extrabold text-[#102A56]">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-[#102A56]">
                    Today's Hospital Activity
                  </h3>
                  <div className="mt-5 space-y-5">
                    {[
                      { label: "Confirmed Appointments", value: appointments.filter((a) => a.status === "Confirmed").length, total: 10 },
                      { label: "Pending Appointments", value: appointments.filter((a) => a.status === "Pending").length, total: 10 },
                      { label: "Cancelled Appointments", value: appointments.filter((a) => a.status === "Cancelled").length, total: 10 },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="mb-2 flex justify-between text-sm">
                          <span className="font-medium text-slate-600">{item.label}</span>
                          <span className="font-bold text-[#102A56]">{item.value}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-blue-600"
                            style={{ width: `${Math.min((item.value / item.total) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-[#102A56]">
                    Hospital Information
                  </h3>
                  <div className="mt-5 space-y-4 text-sm">
                    <div className="flex justify-between border-b border-slate-100 pb-3">
                      <span className="text-slate-500">Hospital</span>
                      <span className="font-bold text-slate-700">Lanka Care Hospital</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-3">
                      <span className="text-slate-500">Visiting Doctors</span>
                      <span className="font-bold text-slate-700">40+</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-3">
                      <span className="text-slate-500">Specialities</span>
                      <span className="font-bold text-slate-700">15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Weekly Sessions</span>
                      <span className="font-bold text-slate-700">120+</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* APPOINTMENTS */}
          {activeTab === "Appointments" && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-[#102A56]">
                    Appointment Management
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Review and update appointment statuses.
                  </p>
                </div>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search patient or booking..."
                  className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-blue-500 sm:w-64"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[750px] text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="p-3">Booking ID</th>
                      <th className="p-3">Patient</th>
                      <th className="p-3">Doctor</th>
                      <th className="p-3">Date & Time</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.map((appointment) => (
                      <tr key={appointment.id} className="border-b border-slate-100">
                        <td className="p-3 font-bold text-blue-700">{appointment.id}</td>
                        <td className="p-3 font-semibold text-slate-700">{appointment.patient}</td>
                        <td className="p-3 text-slate-600">{appointment.doctor}</td>
                        <td className="p-3 text-slate-600">
                          {appointment.date}<br />{appointment.time}
                        </td>
                        <td className="p-3 text-slate-600">{appointment.type}</td>
                        <td className="p-3">
                          <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                            appointment.status === "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : appointment.status === "Pending"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                          }`}>
                            {appointment.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <select
                            value={appointment.status}
                            onChange={(e) =>
                              updateStatus(
                                appointment.id,
                                e.target.value as Appointment["status"]
                              )
                            }
                            className="rounded-lg border border-slate-200 bg-white p-2 text-xs"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Pending">Pending</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                    {filteredAppointments.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-500">
                          No appointments found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* DOCTORS */}
          {activeTab === "Doctors" && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-[#102A56]">
                Doctor Management
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                View registered hospital doctors and their specialities.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {doctors.map((doctor) => (
                  <div key={doctor.name} className="rounded-xl border border-slate-200 p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
                      👨‍⚕️
                    </div>
                    <h4 className="mt-3 font-bold text-[#102A56]">{doctor.name}</h4>
                    <p className="mt-1 text-sm text-blue-700">{doctor.speciality}</p>
                    <p className="mt-3 text-xs text-slate-500">
                      Weekly sessions: {doctor.sessions}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SESSIONS */}
          {activeTab === "Sessions" && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-[#102A56]">
                Session Management
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Sample visiting doctor sessions.
              </p>

              <div className="mt-5 space-y-3">
                {doctors.map((doctor, index) => (
                  <div
                    key={doctor.name}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 p-4"
                  >
                    <div>
                      <p className="font-bold text-[#102A56]">{doctor.name}</p>
                      <p className="mt-1 text-sm text-slate-500">{doctor.speciality}</p>
                    </div>
                    <div className="text-sm text-slate-600">
                      {index % 2 === 0 ? "25 Nov 2026 · 09:00 AM" : "26 Nov 2026 · 10:00 AM"}
                    </div>
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                      Scheduled
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* REPORTS */}
          {activeTab === "Reports" && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#102A56]">
                Hospital Reports
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Summary based on the current sample appointment data.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-blue-50 p-5">
                  <p className="text-sm text-blue-700">Total Bookings</p>
                  <p className="mt-2 text-3xl font-extrabold text-[#102A56]">
                    {appointments.length}
                  </p>
                </div>
                <div className="rounded-xl bg-green-50 p-5">
                  <p className="text-sm text-green-700">Confirmed</p>
                  <p className="mt-2 text-3xl font-extrabold text-green-800">
                    {appointments.filter((a) => a.status === "Confirmed").length}
                  </p>
                </div>
                <div className="rounded-xl bg-amber-50 p-5">
                  <p className="text-sm text-amber-700">Pending</p>
                  <p className="mt-2 text-3xl font-extrabold text-amber-800">
                    {appointments.filter((a) => a.status === "Pending").length}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 p-5">
                <h4 className="font-bold text-[#102A56]">Appointment Summary</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  This report currently uses demonstration data. Actual hospital reports
                  will be generated from PostgreSQL after backend integration.
                </p>
              </div>
            </section>
          )}

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <h3 className="font-bold text-[#102A56]">Manager Reminder</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Protect patient information and make sure appointment and doctor
              records are updated accurately. This dashboard currently uses
              sample data and will be connected to the backend API later.
            </p>
          </div>
        </main>
      </div>

      <footer className="bg-[#102A56] px-5 py-6 text-center text-sm text-blue-100">
        © 2026 MediChannel – Lanka Care Hospital. All rights reserved.
      </footer>
    </div>
  );
}