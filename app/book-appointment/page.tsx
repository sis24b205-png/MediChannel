"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const doctors = [
  {
    id: "S101",
    name: "Dr. Sarah Williams",
    speciality: "Cardiology",
    qualification: "MBBS, MD (Cardiology)",
    experience: "12 Years",
    slmc: "SLMC 12345",
    fee: 3500,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=85",
    description: "Dr. Sarah Williams is an experienced Cardiologist providing professional care for heart-related conditions.",
  },
  {
    id: "S201",
    name: "Dr. Michael Fernando",
    speciality: "Neurology",
    qualification: "MBBS, MD (Neurology)",
    experience: "15 Years",
    slmc: "SLMC 23456",
    fee: 4000,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=85",
    description: "Dr. Michael Fernando provides professional care for neurological conditions and nervous system disorders.",
  },
  {
    id: "S301",
    name: "Dr. Emily Perera",
    speciality: "Paediatrics",
    qualification: "MBBS, MD (Paediatrics)",
    experience: "10 Years",
    slmc: "SLMC 34567",
    fee: 3000,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=700&q=85",
    description: "Dr. Emily Perera provides caring and professional healthcare services for infants and children.",
  },
  {
    id: "S401",
    name: "Dr. James Peris",
    speciality: "Dermatology",
    qualification: "MBBS, MD (Dermatology)",
    experience: "11 Years",
    slmc: "SLMC 45678",
    fee: 3500,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=700&q=85",
    description: "Dr. James Peris provides professional treatment for skin, hair and nail conditions.",
  },
  {
    id: "S501",
    name: "Dr. Olivia Silva",
    speciality: "Orthopaedics",
    qualification: "MBBS, MS (Orthopaedics)",
    experience: "14 Years",
    slmc: "SLMC 56789",
    fee: 4500,
    image: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&w=700&q=85",
    description: "Dr. Olivia Silva is an experienced Orthopaedic specialist providing professional care for bone, joint and muscle conditions.",
  },
  {
    id: "S601",
    name: "Dr. Daniel Fernando",
    speciality: "General Medicine",
    qualification: "MBBS, MD",
    experience: "9 Years",
    slmc: "SLMC 67890",
    fee: 2500,
    image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=700&q=85",
    description: "Dr. Daniel Fernando provides general medical consultations and healthcare services.",
  },
];

const dates = [
  { value: "2026-11-25", label: "25 November 2026" },
  { value: "2026-11-26", label: "26 November 2026" },
  { value: "2026-11-27", label: "27 November 2026" },
  { value: "2026-11-28", label: "28 November 2026" },
  { value: "2026-11-30", label: "30 November 2026" },
];

const times = [
  "09:00 AM - 09:30 AM",
  "09:30 AM - 10:00 AM",
  "10:00 AM - 10:30 AM",
  "10:30 AM - 11:00 AM",
  "11:00 AM - 11:30 AM",
  "02:00 PM - 02:30 PM",
  "02:30 PM - 03:00 PM",
  "03:00 PM - 03:30 PM",
];

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M7 3V7M17 3V7M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BookingContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId") || "S101";

  const doctor = doctors.find((item) => item.id === sessionId);

  const [consultationType, setConsultationType] = useState("Online");
  const [selectedDate, setSelectedDate] = useState("2026-11-25");
  const [selectedTime, setSelectedTime] = useState(times[0]);
  const [reason, setReason] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingReference, setBookingReference] = useState("");

  const formattedDate = new Date(
    selectedDate + "T00:00:00"
  ).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  function handleBooking() {
    if (!reason.trim() || reason.trim().length < 5) {
      alert("Please enter your reason for visit (at least 5 characters).");
      return;
    }

    const reference = "MC" + Math.floor(100000 + Math.random() * 900000);
    setBookingReference(reference);
    setBookingConfirmed(true);
  }

  if (!doctor) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <h1 className="text-2xl font-extrabold text-[#102A56]">
          Doctor Not Found
        </h1>
        <p className="mt-3 text-slate-600">
          The selected doctor session could not be found.
        </p>
        <Link href="/doctors" className="mt-5 rounded-xl bg-[#102A56] px-6 py-3 font-bold text-white">
          Back to Find Doctors
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-2">
            <svg viewBox="0 0 100 100" className="h-11 w-11" fill="none">
              <path d="M50 87 C40 78 9 55 9 33 C9 15 31 7 50 29 C69 7 91 15 91 33 C91 55 60 78 50 87Z" stroke="#102A56" strokeWidth="7" strokeLinejoin="round" />
              <path d="M12 51 H31 L40 39 L49 67 L58 32 L66 51 H77" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M75 15 V31 M67 23 H83" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
            </svg>
            <span className="text-xl font-extrabold sm:text-2xl">
              <span className="text-[#102A56]">Medi</span>
              <span className="text-blue-600">Channel</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-bold text-[#102A56] md:flex">
            <Link href="/">Home</Link>
            <Link href="/doctors">Find Doctors</Link>
            <Link href="/appointments">My Appointments</Link>
            <Link href="/dashboard">Dashboard</Link>
          </nav>

          <Link href="/login" className="rounded-xl bg-[#102A56] px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-800">
            Login
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-r from-[#061C48] via-[#102A56] to-[#07549A] px-6 py-12 text-white md:py-16">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">
            MediChannel Appointment System
          </p>
          <h1 className="text-4xl font-extrabold md:text-5xl">
            Book Appointment
          </h1>
          <p className="mt-3 text-lg text-blue-100">
            Schedule your appointment with {doctor.name}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-7 px-5 py-10 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="grid gap-6 sm:grid-cols-[220px_1fr]">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="h-64 w-full rounded-2xl object-cover sm:h-72"
            />

            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-extrabold text-[#102A56]">
                  {doctor.name}
                </h2>
                <span className="text-blue-600">✓</span>
              </div>

              <p className="mt-2 font-semibold text-blue-700">
                {doctor.qualification}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <span className="text-xl text-amber-400">★★★★★</span>
                <span className="font-bold text-[#102A56]">4.8</span>
                <span className="text-sm text-slate-500">(Sample rating)</span>
              </div>

              <div className="my-4 border-t border-slate-200" />

              <div className="space-y-3 text-sm">
                <p className="flex justify-between gap-3">
                  <span className="text-slate-500">Speciality</span>
                  <span className="font-bold text-[#102A56]">{doctor.speciality}</span>
                </p>
                <p className="flex justify-between gap-3">
                  <span className="text-slate-500">Experience</span>
                  <span className="font-bold text-[#102A56]">{doctor.experience}</span>
                </p>
                <p className="flex justify-between gap-3">
                  <span className="text-slate-500">Registration</span>
                  <span className="font-bold text-[#102A56]">{doctor.slmc}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-sky-50 p-5">
            <h3 className="font-extrabold text-[#102A56]">
              <span className="mr-2 text-blue-600">ⓘ</span>
              About Doctor
            </h3>
            <p className="mt-2 leading-7 text-slate-700">
              {doctor.description}
            </p>
          </div>

          <div className="mt-7">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-[#102A56]">
              <CalendarIcon />
              Available Sessions
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {dates.map((date) => (
                <button
                  key={date.value}
                  type="button"
                  onClick={() => setSelectedDate(date.value)}
                  className={`rounded-xl border p-3 text-center text-sm font-bold transition ${
                    selectedDate === date.value
                      ? "border-[#102A56] bg-[#102A56] text-white shadow-lg"
                      : "border-slate-200 bg-white text-[#102A56] hover:border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  <span className="block">
                    {new Date(date.value + "T00:00:00").toLocaleDateString("en-GB", { weekday: "short" })}
                  </span>
                  <span className="mt-1 block text-xl">
                    {new Date(date.value + "T00:00:00").getDate()}
                  </span>
                  <span className="block text-xs">
                    {new Date(date.value + "T00:00:00").toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 bg-gradient-to-r from-[#061C48] to-[#102A56] px-6 py-5 text-white">
            <CalendarIcon />
            <h2 className="text-xl font-extrabold">Appointment Details</h2>
          </div>

          <div className="space-y-6 p-5 sm:p-7">
            <div>
              <label className="mb-3 block font-bold text-[#102A56]">
                Consultation Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setConsultationType("Online")}
                  className={`rounded-xl border p-4 text-sm font-bold transition ${
                    consultationType === "Online"
                      ? "border-blue-700 bg-blue-700 text-white shadow-lg"
                      : "border-slate-200 text-[#102A56] hover:bg-blue-50"
                  }`}
                >
                  <span className="mb-1 block text-xl">▣</span>
                  Online Consultation
                </button>
                <button
                  type="button"
                  onClick={() => setConsultationType("Physical")}
                  className={`rounded-xl border p-4 text-sm font-bold transition ${
                    consultationType === "Physical"
                      ? "border-blue-700 bg-blue-700 text-white shadow-lg"
                      : "border-slate-200 text-[#102A56] hover:bg-blue-50"
                  }`}
                >
                  <span className="mb-1 block text-xl">♟</span>
                  Physical Consultation
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block font-bold text-[#102A56]">
                Select Date
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-slate-300 px-4 focus-within:border-blue-500">
                <CalendarIcon />
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="h-12 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
                >
                  {dates.map((date) => (
                    <option key={date.value} value={date.value}>
                      {date.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block font-bold text-[#102A56]">
                Select Time
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-slate-300 px-4 focus-within:border-blue-500">
                <ClockIcon />
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="h-12 w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
                >
                  {times.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="font-bold text-[#102A56]">Reason for Visit</label>
                <span className="text-xs text-slate-400">{reason.length}/250</span>
              </div>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value.slice(0, 250))}
                rows={3}
                placeholder="Briefly describe your reason for visit..."
                className="w-full resize-none rounded-xl border border-slate-300 p-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50 p-5">
              <h3 className="mb-4 flex items-center gap-2 font-extrabold text-[#102A56]">
                <span className="text-xl">☑</span>
                Appointment Summary
              </h3>

              <div className="space-y-3 text-sm">
                <p className="flex justify-between gap-3">
                  <span className="text-slate-600">Doctor</span>
                  <span className="text-right font-bold text-[#102A56]">{doctor.name}</span>
                </p>
                <p className="flex justify-between gap-3">
                  <span className="text-slate-600">Speciality</span>
                  <span className="font-bold text-[#102A56]">{doctor.speciality}</span>
                </p>
                <p className="flex justify-between gap-3">
                  <span className="text-slate-600">Consultation</span>
                  <span className="font-bold text-[#102A56]">{consultationType}</span>
                </p>
                <p className="flex justify-between gap-3">
                  <span className="text-slate-600">Date</span>
                  <span className="font-bold text-[#102A56]">{formattedDate}</span>
                </p>
                <p className="flex justify-between gap-3">
                  <span className="text-slate-600">Time</span>
                  <span className="text-right font-bold text-[#102A56]">{selectedTime}</span>
                </p>
                <div className="border-t border-blue-200 pt-3">
                  <p className="flex justify-between gap-3 text-base">
                    <span className="font-bold text-[#102A56]">Consultation Fee</span>
                    <span className="font-extrabold text-blue-700">
                      Rs. {doctor.fee.toLocaleString("en-LK")}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleBooking}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#061C48] to-[#102A56] px-6 py-4 font-extrabold text-white shadow-lg transition hover:-translate-y-1 hover:from-blue-800 hover:to-blue-900"
            >
              <CalendarIcon />
              Confirm Booking
            </button>

            <p className="text-center text-xs text-slate-400">
              Please review your appointment details before confirming.
            </p>
          </div>
        </div>
      </section>

      {bookingConfirmed && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#061C48]/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-600">
              ✓
            </div>
            <h2 className="mt-5 text-2xl font-extrabold text-[#102A56]">
              Booking Confirmed!
            </h2>
            <p className="mt-3 text-slate-500">
              Your demo appointment has been created successfully.
            </p>
            <div className="my-6 rounded-2xl bg-blue-50 p-5">
              <p className="text-sm text-slate-500">Booking Reference</p>
              <p className="mt-1 text-2xl font-extrabold tracking-wider text-blue-700">
                {bookingReference}
              </p>
              <p className="mt-3 text-sm font-semibold text-[#102A56]">
                {doctor.name}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {formattedDate} | {selectedTime}
              </p>
            </div>
            <p className="mb-5 text-xs text-amber-700">
              Demo only: this booking has not been saved to the hospital database.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/dashboard" className="rounded-xl bg-[#102A56] px-6 py-3 font-bold text-white hover:bg-blue-800">
                Go to Dashboard
              </Link>
              <Link href="/appointments" className="rounded-xl border border-blue-200 px-6 py-3 font-bold text-[#102A56] hover:bg-blue-50">
                My Appointments
              </Link>
              <button
                onClick={() => setBookingConfirmed(false)}
                className="rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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

export default function BookAppointment() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-lg font-bold text-[#102A56]">
          Loading appointment...
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}