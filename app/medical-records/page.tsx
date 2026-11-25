"use client";

import Link from "next/link";

const medicalRecords = [
  {
    id: "MR001",
    doctor: "Dr. Sarah Williams",
    speciality: "Cardiology",
    date: "25 November 2026",
    appointment: "MC001",
    diagnosis: "Mild Hypertension",
    summary:
      "Patient attended the consultation with occasional headaches. Blood pressure was checked and discussed. Lifestyle improvements and follow-up were recommended.",
    medicines: [
      {
        name: "Amlodipine",
        dosage: "5 mg",
        frequency: "Once daily",
        duration: "30 days",
        instructions: "Take after breakfast.",
      },
      {
        name: "Paracetamol",
        dosage: "500 mg",
        frequency: "As needed",
        duration: "3 days",
        instructions: "Use only as directed by the doctor.",
      },
    ],
    advice: [
      "Monitor blood pressure regularly.",
      "Maintain a healthy diet.",
      "Attend the recommended follow-up appointment.",
    ],
    followUp: "09 December 2026",
  },
  {
    id: "MR002",
    doctor: "Dr. Michael Fernando",
    speciality: "Neurology",
    date: "20 November 2026",
    appointment: "MC002",
    diagnosis: "Migraine",
    summary:
      "Patient reported recurring headaches. Symptoms and medical history were reviewed during the consultation.",
    medicines: [
      {
        name: "Sample Medicine",
        dosage: "As prescribed",
        frequency: "As directed",
        duration: "As prescribed",
        instructions: "Follow the doctor's instructions.",
      },
    ],
    advice: [
      "Maintain regular sleep.",
      "Avoid identified headache triggers.",
      "Attend follow-up if symptoms continue.",
    ],
    followUp: "To be confirmed",
  },
];

function MediChannelLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        viewBox="0 0 100 100"
        className="h-11 w-11"
        fill="none"
      >
        <path
          d="M50 84S12 61 12 35C12 13 39 7 50 29C61 7 88 13 88 35C88 61 50 84 50 84Z"
          stroke="#2563EB"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <path
          d="M20 49H36L44 34L55 64L64 46H80"
          stroke="#102A56"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div>
        <h1 className="text-xl font-extrabold text-[#102A56]">
          MediChannel
        </h1>
        <p className="text-xs text-gray-500">
          Lanka Care Hospital
        </p>
      </div>
    </div>
  );
}

export default function MedicalRecordsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <MediChannelLogo />

          <nav className="flex flex-wrap items-center gap-5 text-sm font-semibold text-gray-600">
            <Link href="/" className="hover:text-blue-700">
              Home
            </Link>
            <Link href="/dashboard" className="hover:text-blue-700">
              Dashboard
            </Link>
            <Link href="/appointments" className="hover:text-blue-700">
              My Appointments
            </Link>
            <Link
              href="/medical-records"
              className="text-blue-700"
            >
              Medical Records
            </Link>
          </nav>
        </div>
      </header>

      {/* Page Heading */}
      <section className="bg-gradient-to-r from-[#061C48] via-[#102A56] to-[#064B91] px-6 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-sm font-semibold text-blue-200">
            PATIENT PORTAL
          </p>
          <h2 className="text-3xl font-extrabold md:text-4xl">
            Medical Records
          </h2>
          <p className="mt-3 max-w-2xl text-blue-100">
            View your consultation summaries, diagnoses and
            prescription details in one place.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Information */}
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-5">
          <span className="text-2xl">ℹ️</span>
          <div>
            <h3 className="font-bold text-[#102A56]">
              Your Medical History
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Your consultation summaries and prescription
              information are displayed below.
            </p>
          </div>
        </div>

        {/* Records */}
        <div className="space-y-8">
          {medicalRecords.map((record) => (
            <article
              key={record.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              {/* Record Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b bg-slate-50 p-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    Consultation Record
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold text-[#102A56]">
                    {record.doctor}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {record.speciality} · {record.date}
                  </p>
                </div>

                <div className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-bold text-blue-800">
                  {record.id}
                </div>
              </div>

              <div className="space-y-7 p-6">
                {/* Appointment Details */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-gray-500">
                      Appointment Reference
                    </p>
                    <p className="mt-1 font-bold text-gray-800">
                      {record.appointment}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-gray-500">
                      Consultation Date
                    </p>
                    <p className="mt-1 font-bold text-gray-800">
                      {record.date}
                    </p>
                  </div>
                </div>

                {/* Diagnosis */}
                <section>
                  <h4 className="mb-3 flex items-center gap-2 text-lg font-bold text-[#102A56]">
                    <span>🩺</span> Doctor's Diagnosis
                  </h4>
                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <p className="font-bold text-blue-900">
                      {record.diagnosis}
                    </p>
                  </div>
                </section>

                {/* Summary */}
                <section>
                  <h4 className="mb-3 flex items-center gap-2 text-lg font-bold text-[#102A56]">
                    <span>📋</span> Consultation Summary
                  </h4>
                  <p className="rounded-xl border border-gray-200 p-4 text-sm leading-7 text-gray-600">
                    {record.summary}
                  </p>
                </section>

                {/* Prescription */}
                <section>
                  <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#102A56]">
                    <span>💊</span> Prescription Details
                  </h4>

                  <div className="space-y-4">
                    {record.medicines.map((medicine, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-gray-200 p-5"
                      >
                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-xl">
                            💊
                          </div>
                          <div>
                            <h5 className="font-bold text-[#102A56]">
                              {medicine.name}
                            </h5>
                            <p className="text-xs text-gray-500">
                              Medicine {index + 1}
                            </p>
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                          <div>
                            <p className="text-xs text-gray-500">
                              Dosage
                            </p>
                            <p className="mt-1 text-sm font-semibold text-gray-800">
                              {medicine.dosage}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Frequency
                            </p>
                            <p className="mt-1 text-sm font-semibold text-gray-800">
                              {medicine.frequency}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Duration
                            </p>
                            <p className="mt-1 text-sm font-semibold text-gray-800">
                              {medicine.duration}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Instructions
                            </p>
                            <p className="mt-1 text-sm font-semibold text-gray-800">
                              {medicine.instructions}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Doctor Advice */}
                <section>
                  <h4 className="mb-3 flex items-center gap-2 text-lg font-bold text-[#102A56]">
                    <span>📝</span> Doctor's Advice
                  </h4>

                  <ul className="space-y-2 rounded-xl bg-green-50 p-5 text-sm text-gray-700">
                    {record.advice.map((item, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="font-bold text-green-700">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Follow up */}
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-orange-100 bg-orange-50 p-4">
                  <div>
                    <p className="text-xs text-orange-700">
                      Recommended Follow-up
                    </p>
                    <p className="mt-1 font-bold text-gray-800">
                      {record.followUp}
                    </p>
                  </div>
                  <span className="text-2xl">📅</span>
                </div>

                {/* Print */}
                <div className="flex flex-wrap justify-end gap-3 border-t pt-5">
                  <button
                    onClick={() => window.print()}
                    className="rounded-lg bg-[#102A56] px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
                  >
                    🖨️ Print / Save PDF
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-10 text-center">
          <Link
            href="/dashboard"
            className="inline-block rounded-lg border border-[#102A56] px-7 py-3 font-bold text-[#102A56] transition hover:bg-[#102A56] hover:text-white"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          MediChannel © 2026 · Lanka Care Hospital
        </p>

        <p className="mt-2 text-center text-xs text-orange-600">
          Demo records only. Sample medicines and diagnoses are not real
          medical advice or valid prescriptions.
        </p>
      </div>

      <style jsx global>{`
        @media print {
          header,
          button,
          a {
            display: none !important;
          }

          body {
            background: white !important;
          }

          article {
            break-inside: avoid;
            box-shadow: none !important;
          }
        }
      `}</style>
    </main>
  );
}