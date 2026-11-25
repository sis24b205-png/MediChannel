"use client";

import { useState } from "react";
import Link from "next/link";

export default function FeedbackPage() {
  const [doctorRating, setDoctorRating] = useState(0);
  const [hospitalRating, setHospitalRating] = useState(0);
  const [appointment, setAppointment] = useState("MC002");
  const [comments, setComments] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (doctorRating === 0 || hospitalRating === 0) {
      alert("Please give ratings for both Doctor and Hospital.");
      return;
    }

    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-2xl font-extrabold text-[#102A56]">
            MediChannel
          </Link>

          <Link
            href="/dashboard"
            className="rounded-lg bg-[#102A56] px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-12">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Patient Portal
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-[#102A56] md:text-4xl">
            Share Your Feedback
          </h1>

          <p className="mt-3 text-slate-500">
            Your feedback helps us improve our healthcare services.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-green-200 bg-white p-10 text-center shadow-sm">
            <div className="text-6xl">🎉</div>

            <h2 className="mt-5 text-2xl font-extrabold text-green-700">
              Thank You for Your Feedback!
            </h2>

            <p className="mt-3 text-slate-600">
              Your feedback has been submitted successfully.
              We appreciate your time.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  setDoctorRating(0);
                  setHospitalRating(0);
                  setComments("");
                  setSubmitted(false);
                }}
                className="rounded-lg border border-blue-600 px-5 py-3 font-semibold text-blue-700 hover:bg-blue-50"
              >
                Give Another Feedback
              </button>

              <Link
                href="/dashboard"
                className="rounded-lg bg-[#102A56] px-5 py-3 font-semibold text-white hover:bg-blue-800"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-9"
          >
            <div>
              <label className="mb-2 block font-semibold text-[#102A56]">
                Select Appointment
              </label>

              <select
                value={appointment}
                onChange={(e) => setAppointment(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-700 outline-none focus:border-blue-600"
              >
                <option value="MC002">
                  MC002 - Dr. Michael Fernando
                </option>
                <option value="MC001">
                  MC001 - Dr. Sarah Williams
                </option>
                <option value="MC003">
                  MC003 - Dr. Emily Perera
                </option>
              </select>
            </div>

            <div>
              <h3 className="font-bold text-[#102A56]">
                Rate Your Doctor
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                How was your doctor's service?
              </p>

              <div className="mt-3 flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setDoctorRating(star)}
                    className={`text-4xl ${
                      star <= doctorRating
                        ? "text-amber-400"
                        : "text-slate-300"
                    }`}
                    aria-label={`Rate doctor ${star} stars`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <p className="mt-2 text-sm font-semibold text-blue-700">
                {doctorRating === 0
                  ? "Select your rating"
                  : `${doctorRating} out of 5 stars`}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="font-bold text-[#102A56]">
                Rate Hospital Service
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                How satisfied are you with our hospital service?
              </p>

              <div className="mt-3 flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setHospitalRating(star)}
                    className={`text-4xl ${
                      star <= hospitalRating
                        ? "text-amber-400"
                        : "text-slate-300"
                    }`}
                    aria-label={`Rate hospital ${star} stars`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <p className="mt-2 text-sm font-semibold text-blue-700">
                {hospitalRating === 0
                  ? "Select your rating"
                  : `${hospitalRating} out of 5 stars`}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <label className="mb-2 block font-semibold text-[#102A56]">
                Your Comments
              </label>

              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={5}
                placeholder="Tell us about your experience..."
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-700 outline-none focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#102A56] py-3.5 font-bold text-white transition hover:bg-blue-800"
            >
              Submit Feedback
            </button>

            <p className="text-center text-xs text-slate-400">
              Thank you for helping Lanka Care Hospital improve its services.
            </p>
          </form>
        )}
      </div>

      <footer className="bg-[#061C48] px-5 py-6 text-center text-sm text-blue-100">
        © 2026 MediChannel - Lanka Care Hospital. All rights reserved.
      </footer>
    </main>
  );
}