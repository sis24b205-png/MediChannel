"use client";

import { useState } from "react";
import Link from "next/link";

type Appointment = {
  id: string;
  doctor: string;
  speciality: string;
  date: string;
  time: string;
  number: string;
  type: "Physical" | "Online";
  room: string;
  fee: string;
  payment: "Paid" | "Unpaid";
  status: "Upcoming" | "Completed" | "Cancelled";
  consultationStatus?: "Waiting" | "Active" | "Completed";
  image: string;
};

const initialAppointments: Appointment[] = [
  {
    id: "MC001",
    doctor: "Dr. Sarah Williams",
    speciality: "Cardiology",
    date: "25 November 2026",
    time: "09:00 AM",
    number: "A024",
    type: "Physical",
    room: "Room 02",
    fee: "Rs. 3,500",
    payment: "Unpaid",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&q=85",
  },
  {
    id: "MC002",
    doctor: "Dr. Michael Fernando",
    speciality: "Neurology",
    date: "28 November 2026",
    time: "10:30 AM",
    number: "B012",
    type: "Online",
    room: "Online Consultation",
    fee: "Rs. 4,000",
    payment: "Paid",
    status: "Upcoming",
    consultationStatus: "Waiting",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&q=85",
  },
  {
    id: "MC003",
    doctor: "Dr. Emily Perera",
    speciality: "Paediatrics",
    date: "20 November 2026",
    time: "11:00 AM",
    number: "C018",
    type: "Physical",
    room: "Room 04",
    fee: "Rs. 3,000",
    payment: "Paid",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&q=85",
  },
  {
    id: "MC004",
    doctor: "Dr. James Peris",
    speciality: "Dermatology",
    date: "18 November 2026",
    time: "02:00 PM",
    number: "D009",
    type: "Physical",
    room: "Room 01",
    fee: "Rs. 2,500",
    payment: "Unpaid",
    status: "Cancelled",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&q=85",
  },
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

export default function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [activeTab, setActiveTab] = useState<"All" | "Upcoming" | "Completed" | "Cancelled">("All");
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [message, setMessage] = useState("");

  const filteredAppointments =
    activeTab === "All"
      ? appointments
      : appointments.filter((item) => item.status === activeTab);

  const upcomingCount = appointments.filter((item) => item.status === "Upcoming").length;
  const completedCount = appointments.filter((item) => item.status === "Completed").length;
  const cancelledCount = appointments.filter((item) => item.status === "Cancelled").length;

  function cancelAppointment(id: string) {
    const appointment = appointments.find((item) => item.id === id);
    if (!appointment) return;

    if (appointment.payment === "Paid") {
      setMessage("Paid appointments cannot be cancelled through this demo.");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmed) return;

    setAppointments((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status: "Cancelled" } : item
      )
    );

    setSelected(null);
    setMessage("Appointment cancelled successfully (demo only).");
  }

  function statusStyle(status: Appointment["status"]) {
    if (status === "Upcoming") return "bg-blue-100 text-blue-700";
    if (status === "Completed") return "bg-green-100 text-green-700";
    return "bg-red-100 text-red-700";
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <Link href="/" className="flex items-center gap-2">
            <MediChannelLogo />
            <div>
              <h1 className="text-xl font-extrabold text-[#102A56]">MediChannel</h1>
              <p className="text-xs text-slate-500">Lanka Care Hospital</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            <Link href="/" className="hover:text-blue-700">Home</Link>
            <Link href="/dashboard" className="hover:text-blue-700">Dashboard</Link>
            <Link href="/doctors" className="hover:text-blue-700">Find Doctors</Link>
            <Link href="/appointments" className="text-blue-700">My Appointments</Link>
          </nav>

          <Link href="/dashboard" className="rounded-lg bg-[#102A56] px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">
            Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-600">Patient Portal</p>
          <h2 className="text-3xl font-extrabold text-[#102A56] md:text-4xl">My Appointments</h2>
          <p className="mt-2 text-slate-500">
            Manage and keep track of all your hospital appointments.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-[#102A56] p-5 text-white shadow-sm">
            <p className="text-sm text-blue-200">Total Appointments</p>
            <p className="mt-2 text-3xl font-extrabold">{appointments.length}</p>
            <p className="mt-1 text-xs text-blue-200">All records</p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Upcoming</p>
            <p className="mt-2 text-3xl font-extrabold text-blue-700">{upcomingCount}</p>
            <p className="mt-1 text-xs text-slate-400">Future visits</p>
          </div>

          <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Completed</p>
            <p className="mt-2 text-3xl font-extrabold text-green-600">{completedCount}</p>
            <p className="mt-1 text-xs text-slate-400">Finished visits</p>
          </div>

          <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Cancelled</p>
            <p className="mt-2 text-3xl font-extrabold text-red-600">{cancelledCount}</p>
            <p className="mt-1 text-xs text-slate-400">Cancelled visits</p>
          </div>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-bold text-[#102A56]">Appointment History</h3>
              <p className="mt-1 text-sm text-slate-500">
                View your bookings and appointment status.
              </p>
            </div>

            <Link href="/doctors" className="w-fit rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700">
              + Book New Appointment
            </Link>
          </div>

          <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-100 pb-4">
            {(["All", "Upcoming", "Completed", "Cancelled"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  activeTab === tab
                    ? "bg-[#102A56] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {message && (
            <div className="mb-5 flex items-center justify-between rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
              <span>{message}</span>
              <button onClick={() => setMessage("")} className="font-bold" aria-label="Close message">✕</button>
            </div>
          )}

          <div className="space-y-5">
            {filteredAppointments.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center">
                <p className="text-lg font-bold text-slate-600">No appointments found</p>
                <p className="mt-2 text-sm text-slate-400">Your appointments will appear here.</p>
                <Link href="/doctors" className="mt-4 inline-block font-semibold text-blue-600 hover:underline">
                  Find a Doctor
                </Link>
              </div>
            ) : (
              filteredAppointments.map((appointment) => (
                <article key={appointment.id} className="rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:shadow-md md:p-5">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                    <div className="flex min-w-0 flex-1 items-center gap-4">
                      <img src={appointment.image} alt={appointment.doctor} className="h-20 w-20 rounded-xl object-cover" />
                      <div className="min-w-0">
                        <h4 className="font-bold text-[#102A56]">{appointment.doctor}</h4>
                        <p className="text-sm text-blue-600">{appointment.speciality}</p>
                        <p className="mt-2 text-xs text-slate-500">Booking ID: {appointment.id}</p>
                        <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold ${statusStyle(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid flex-1 grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-slate-400">Date</p>
                        <p className="mt-1 font-semibold text-slate-700">{appointment.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Time</p>
                        <p className="mt-1 font-semibold text-slate-700">{appointment.time}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Queue Number</p>
                        <p className="mt-1 font-bold text-blue-700">{appointment.number}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Consultation</p>
                        <p className="mt-1 font-semibold text-slate-700">{appointment.type}</p>
                      </div>
                    </div>

                    <div className="flex flex-row flex-wrap gap-2 lg:w-40 lg:flex-col">
                      <button onClick={() => setSelected(appointment)} className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">
                        View Details
                      </button>

                      {appointment.status === "Upcoming" && appointment.payment === "Unpaid" && (
                        <button onClick={() => cancelAppointment(appointment.id)} className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">
                          Cancel
                        </button>
                      )}

                      {appointment.status === "Upcoming" && appointment.type === "Online" && (
                        appointment.consultationStatus === "Active" ? (
                          <Link
                            href="/consultation"
                            className="rounded-lg bg-[#102A56] px-4 py-2 text-center text-sm font-semibold text-white hover:bg-blue-800"
                          >
                            Join Consultation
                          </Link>
                        ) : (
                          <div className="rounded-lg bg-amber-50 px-3 py-2 text-center text-xs font-semibold text-amber-700">
                            Waiting for Doctor
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {appointment.type === "Online" && appointment.status === "Upcoming" && (
                    <div className="mt-4 rounded-lg bg-blue-50 p-3 text-xs text-blue-800">
                      <strong>Online Consultation:</strong>{" "}
                      {appointment.consultationStatus === "Active"
                        ? "Your doctor has started the session. You can join now."
                        : "The consultation will be available when your doctor starts the session."}
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-100 pt-3 text-xs text-slate-500">
                    <span>Payment: <strong className="text-slate-700">{appointment.payment}</strong></span>
                    <span>Fee: <strong className="text-slate-700">{appointment.fee}</strong></span>
                    <span>Location: <strong className="text-slate-700">{appointment.room}</strong></span>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-[#102A56]">Appointment Details</h3>
              <button onClick={() => setSelected(null)} className="text-2xl text-slate-400 hover:text-slate-700" aria-label="Close">×</button>
            </div>

            <div className="flex items-center gap-4">
              <img src={selected.image} alt={selected.doctor} className="h-20 w-20 rounded-xl object-cover" />
              <div>
                <p className="font-bold text-[#102A56]">{selected.doctor}</p>
                <p className="text-sm text-blue-600">{selected.speciality}</p>
                <p className="mt-1 text-xs text-slate-500">Booking ID: {selected.id}</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 text-sm">
              <div><p className="text-slate-400">Date</p><p className="mt-1 font-semibold">{selected.date}</p></div>
              <div><p className="text-slate-400">Time</p><p className="mt-1 font-semibold">{selected.time}</p></div>
              <div><p className="text-slate-400">Queue Number</p><p className="mt-1 font-semibold text-blue-700">{selected.number}</p></div>
              <div><p className="text-slate-400">Consultation</p><p className="mt-1 font-semibold">{selected.type}</p></div>
              <div><p className="text-slate-400">Room</p><p className="mt-1 font-semibold">{selected.room}</p></div>
              <div><p className="text-slate-400">Fee</p><p className="mt-1 font-semibold">{selected.fee}</p></div>
              <div><p className="text-slate-400">Payment</p><p className="mt-1 font-semibold">{selected.payment}</p></div>
              <div><p className="text-slate-400">Status</p><p className="mt-1 font-semibold">{selected.status}</p></div>
            </div>

            {selected.type === "Online" && (
              <div className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
                Consultation status: <strong>{selected.consultationStatus || "Waiting"}</strong>
              </div>
            )}

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              {selected.status === "Upcoming" && selected.payment === "Unpaid" && (
                <button onClick={() => cancelAppointment(selected.id)} className="rounded-lg bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100">
                  Cancel Appointment
                </button>
              )}

              {selected.status === "Upcoming" &&
                selected.type === "Online" &&
                selected.consultationStatus === "Active" && (
                  <Link href="/consultation" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">
                    Join Consultation
                  </Link>
                )}

              <button onClick={() => setSelected(null)} className="rounded-lg bg-[#102A56] px-5 py-2 text-sm font-bold text-white hover:bg-blue-800">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-10 bg-[#061C48] px-5 py-6 text-center text-sm text-blue-100">
        © 2026 MediChannel - Lanka Care Hospital. All rights reserved.
      </footer>
    </main>
  );
}