"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Doctor = {
  id: number;
  name: string;
  speciality: string;
  qualification: string;
  experience: string;
  slmc: string;
  fee: number;
  image: string;
  about: string;
  sessions: {
    id: string;
    date: string;
    time: string;
    type: "PHYSICAL" | "ONLINE";
    room: string;
    available: number;
  }[];
};

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

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Williams",
    speciality: "Cardiology",
    qualification: "MBBS, MD (Cardiology)",
    experience: "12 Years",
    slmc: "SLMC 12345",
    fee: 3500,
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&q=85",
    about:
      "Experienced cardiologist providing professional care for heart-related conditions and preventive heart health.",
    sessions: [
      {
        id: "S101",
        date: "2026-12-01",
        time: "09:00 AM - 12:00 PM",
        type: "PHYSICAL",
        room: "Room 01",
        available: 12,
      },
      {
        id: "S102",
        date: "2026-12-03",
        time: "02:00 PM - 05:00 PM",
        type: "ONLINE",
        room: "Online",
        available: 8,
      },
    ],
  },
  {
    id: 2,
    name: "Dr. Michael Fernando",
    speciality: "Neurology",
    qualification: "MBBS, MD (Neurology)",
    experience: "10 Years",
    slmc: "SLMC 23456",
    fee: 4000,
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&q=85",
    about:
      "Neurology specialist offering consultations for headaches, nerve conditions and neurological health.",
    sessions: [
      {
        id: "S201",
        date: "2026-12-02",
        time: "10:00 AM - 01:00 PM",
        type: "PHYSICAL",
        room: "Room 02",
        available: 10,
      },
      {
        id: "S202",
        date: "2026-12-05",
        time: "03:00 PM - 06:00 PM",
        type: "ONLINE",
        room: "Online",
        available: 6,
      },
    ],
  },
  {
    id: 3,
    name: "Dr. Emily Perera",
    speciality: "Paediatrics",
    qualification: "MBBS, DCH, MD",
    experience: "8 Years",
    slmc: "SLMC 34567",
    fee: 3000,
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=700&q=85",
    about:
      "Dedicated paediatrician providing friendly healthcare and medical guidance for children.",
    sessions: [
      {
        id: "S301",
        date: "2026-12-04",
        time: "09:00 AM - 12:00 PM",
        type: "PHYSICAL",
        room: "Room 03",
        available: 15,
      },
    ],
  },
  {
    id: 4,
    name: "Dr. James Peris",
    speciality: "Dermatology",
    qualification: "MBBS, MD (Dermatology)",
    experience: "9 Years",
    slmc: "SLMC 45678",
    fee: 3200,
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=700&q=85",
    about:
      "Dermatologist providing consultations for skin, hair and related conditions.",
    sessions: [
      {
        id: "S401",
        date: "2026-12-06",
        time: "01:00 PM - 04:00 PM",
        type: "ONLINE",
        room: "Online",
        available: 9,
      },
    ],
  },
  {
    id: 5,
    name: "Dr. Olivia Silva",
    speciality: "Orthopaedics",
    qualification: "MBBS, MS (Orthopaedics)",
    experience: "14 Years",
    slmc: "SLMC 56789",
    fee: 4500,
    image:
      "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=700&q=85",
    about:
      "Orthopaedic specialist focusing on bone, joint and muscle health.",
    sessions: [
      {
        id: "S501",
        date: "2026-12-08",
        time: "10:00 AM - 01:00 PM",
        type: "PHYSICAL",
        room: "Room 04",
        available: 11,
      },
    ],
  },
  {
    id: 6,
    name: "Dr. Daniel Fernando",
    speciality: "General Medicine",
    qualification: "MBBS, MD",
    experience: "11 Years",
    slmc: "SLMC 67890",
    fee: 2800,
    image:
      "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=700&q=85",
    about:
      "General physician providing primary healthcare and medical consultations for adults.",
    sessions: [
      {
        id: "S601",
        date: "2026-12-10",
        time: "08:00 AM - 11:00 AM",
        type: "PHYSICAL",
        room: "Room 05",
        available: 14,
      },
    ],
  },
];

const specialities = [
  "All Specialisations",
  "Cardiology",
  "Neurology",
  "Paediatrics",
  "Dermatology",
  "Orthopaedics",
  "General Medicine",
];

export default function FindDoctorsPage() {
  const [search, setSearch] = useState("");
  const [speciality, setSpeciality] = useState("All Specialisations");
  const [consultationType, setConsultationType] = useState("ALL");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.speciality.toLowerCase().includes(search.toLowerCase());

      const matchesSpeciality =
        speciality === "All Specialisations" ||
        doctor.speciality === speciality;

      const matchesType =
        consultationType === "ALL" ||
        doctor.sessions.some(
          (session) => session.type === consultationType
        );

      return matchesSearch && matchesSpeciality && matchesType;
    });
  }, [search, speciality, consultationType]);

  return (
    <main className="min-h-screen bg-[#F1F6FF]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-blue-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-10">
          <Link href="/" className="flex items-center gap-2">
            <MediChannelLogo size="h-12 w-12" />
            <span className="text-xl font-extrabold tracking-tight text-[#102A56] md:text-2xl">
              Medi<span className="text-blue-600">Channel</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            <Link href="/" className="transition hover:text-blue-600">
              Home
            </Link>
            <Link href="/doctors" className="text-blue-700">
              Find Doctors
            </Link>
            <Link href="/dashboard" className="transition hover:text-blue-600">
              Dashboard
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-lg px-4 py-2 text-sm font-bold text-[#102A56] hover:bg-blue-50 sm:block"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-[#082D69] px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-blue-800"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Compact Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#061C48] via-[#063879] to-[#0877D8] px-5 py-8 text-white md:py-10">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-blue-300/10 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-blue-100">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
           
            </div>

            <h1 className="text-3xl font-extrabold leading-tight md:text-4xl">
              Find the Right Doctor,
              <br />
              Feel Better, <span className="text-cyan-300">Live Better.</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100 md:text-base">
              Discover experienced doctors and book your hospital or online
              consultation with ease.
            </p>

            <div className="mt-5 flex flex-wrap gap-5 text-xs font-semibold text-blue-100 md:text-sm">
              <span>✓ Experienced Doctors</span>
              <span>✓ Easy Appointments</span>
              <span>✓ Online Consultations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="relative z-10 mx-auto -mt-5 max-w-7xl px-5">
        <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-900/10 md:p-5">
          <div className="mb-4">
            <h2 className="text-lg font-extrabold text-[#102A56]">
              Search for a Doctor
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Find the right specialist for your healthcare needs.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#102A56]">
                Doctor Name or Specialisation
              </label>
              <div className="flex h-11 items-center gap-2 rounded-xl border border-blue-200 px-3 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
                <span className="text-lg text-blue-600">⌕</span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search doctor..."
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#102A56]">
                Specialisation
              </label>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="h-11 w-full rounded-xl border border-blue-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                {specialities.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#102A56]">
                Consultation Type
              </label>
              <select
                value={consultationType}
                onChange={(e) => setConsultationType(e.target.value)}
                className="h-11 w-full rounded-xl border border-blue-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                <option value="ALL">All Types</option>
                <option value="PHYSICAL">Physical Consultation</option>
                <option value="ONLINE">Online Consultation</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors List */}
      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-[#102A56]">
              Our Specialist Doctors
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Professional care from experienced medical specialists.
            </p>
          </div>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-800">
            {filteredDoctors.length} Doctors Found
          </span>
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="rounded-2xl border border-blue-100 bg-white px-5 py-16 text-center">
            <div className="text-5xl">🔍</div>
            <h3 className="mt-4 text-xl font-bold text-[#102A56]">
              No Doctors Found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try another doctor name or specialisation.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSpeciality("All Specialisations");
                setConsultationType("ALL");
              }}
              className="mt-5 rounded-lg bg-[#082D69] px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-800"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map((doctor) => (
              <article
                key={doctor.id}
                className="group overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-52 overflow-hidden bg-blue-50">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-blue-800 shadow">
                    {doctor.speciality}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-extrabold text-[#102A56]">
                    {doctor.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-blue-700">
                    {doctor.qualification}
                  </p>

                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <div className="flex justify-between gap-2">
                      <span>Experience</span>
                      <span className="font-bold text-[#102A56]">
                        {doctor.experience}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>Registration</span>
                      <span className="font-semibold text-[#102A56]">
                        {doctor.slmc}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>Consultation Fee</span>
                      <span className="font-extrabold text-blue-700">
                        Rs. {doctor.fee.toLocaleString("en-LK")}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl bg-blue-50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#102A56]">
                        Available Sessions
                      </span>
                      <span className="text-xs font-bold text-emerald-700">
                        {doctor.sessions.length} Sessions
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      {doctor.sessions.reduce(
                        (total, session) => total + session.available,
                        0
                      )}{" "}
                      appointment slots available
                    </p>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedDoctor(doctor)}
                      className="rounded-xl border border-blue-200 py-3 text-sm font-bold text-[#102A56] transition hover:bg-blue-50"
                    >
                      View Details
                    </button>
                    <Link
                      href={`/book-appointment?sessionId=${doctor.sessions[0].id}`}
                      className="rounded-xl bg-[#082D69] py-3 text-center text-sm font-bold text-white transition hover:bg-blue-800"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Doctor Details Modal */}
      {selectedDoctor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#061C48]/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedDoctor(null)}
        >
          <div
            className="my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-[#061C48] to-[#0877D8] px-6 py-4 text-white">
              <h2 className="text-lg font-extrabold">Doctor Details</h2>
              <button
                onClick={() => setSelectedDoctor(null)}
                className="text-2xl leading-none hover:text-cyan-200"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="h-24 w-24 rounded-xl object-cover object-top"
                />
                <div>
                  <h3 className="text-xl font-extrabold text-[#102A56]">
                    {selectedDoctor.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-blue-700">
                    {selectedDoctor.speciality}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {selectedDoctor.qualification}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-slate-600">
                {selectedDoctor.about}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-blue-50 p-3">
                  <p className="text-xs text-slate-500">Experience</p>
                  <p className="mt-1 font-bold text-[#102A56]">
                    {selectedDoctor.experience}
                  </p>
                </div>
                <div className="rounded-xl bg-blue-50 p-3">
                  <p className="text-xs text-slate-500">Consultation Fee</p>
                  <p className="mt-1 font-bold text-blue-700">
                    Rs. {selectedDoctor.fee.toLocaleString("en-LK")}
                  </p>
                </div>
              </div>

              <h4 className="mt-6 font-extrabold text-[#102A56]">
                Available Sessions
              </h4>

              <div className="mt-3 space-y-3">
                {selectedDoctor.sessions.map((session) => (
                  <div
                    key={session.id}
                    className="rounded-xl border border-blue-100 p-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-bold text-[#102A56]">
                        {new Date(
                          `${session.date}T00:00:00`
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
                        {session.type}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      {session.time}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {session.room} · {session.available} slots available
                    </p>
                    <Link
                      href={`/book-appointment?sessionId=${session.id}`}
                      className="mt-3 block rounded-lg bg-[#082D69] py-2.5 text-center text-sm font-bold text-white hover:bg-blue-800"
                    >
                      Book This Session
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#061C48] px-5 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 md:flex-row">
          <Link href="/" className="flex items-center gap-2">
            <MediChannelLogo size="h-10 w-10" />
            <span className="text-xl font-extrabold">
              Medi<span className="text-cyan-300">Channel</span>
            </span>
          </Link>

          <p className="text-center text-xs text-blue-200">
            © 2026 MediChannel · Lanka Care Hospital, Colombo
          </p>

          <Link
            href="/"
            className="text-sm font-semibold text-blue-200 hover:text-white"
          >
            Back to Home ↑
          </Link>
        </div>
      </footer>
    </main>
  );
}