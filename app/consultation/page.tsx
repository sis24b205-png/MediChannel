"use client";

import { useState } from "react";
import Link from "next/link";

type Message = {
  id: number;
  sender: "doctor" | "patient";
  text: string;
  time: string;
};

function MediChannelLogo() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-11 w-11 shrink-0"
      fill="none"
    >
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

export default function ConsultationPage() {
  const [status, setStatus] = useState<"Waiting" | "Active" | "Completed">("Active");
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "doctor",
      text: "Hello! Welcome to your online consultation. How are you feeling today?",
      time: "10:00 AM",
    },
    {
      id: 2,
      sender: "patient",
      text: "Hello Doctor. I have been experiencing headaches for the last three days.",
      time: "10:02 AM",
    },
    {
      id: 3,
      sender: "doctor",
      text: "I understand. Can you tell me whether the headache is continuous or does it come and go?",
      time: "10:03 AM",
    },
    {
      id: 4,
      sender: "patient",
      text: "It comes and goes, especially during the evening.",
      time: "10:05 AM",
    },
  ]);

  function sendMessage() {
    if (!message.trim() || status !== "Active") return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "patient",
      text: message.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((previous) => [...previous, newMessage]);
    setMessage("");
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
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

          <nav className="hidden gap-5 text-sm font-semibold text-slate-600 md:flex">
            <Link href="/dashboard" className="hover:text-blue-700">Dashboard</Link>
            <Link href="/doctors" className="hover:text-blue-700">Find Doctors</Link>
            <Link href="/appointments" className="hover:text-blue-700">My Appointments</Link>
            <Link href="/queue" className="hover:text-blue-700">Live Queue</Link>
          </nav>

          <Link
            href="/profile"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-[#102A56]"
          >
            JS
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* TITLE */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold tracking-wider text-blue-700">
              ONLINE CONSULTATION
            </p>
            <h2 className="mt-1 text-3xl font-extrabold text-[#102A56]">
              Doctor Chat
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Communicate privately with your assigned doctor.
            </p>
          </div>

          <Link
            href="/appointments"
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            ← My Appointments
          </Link>
        </div>

        {/* APPOINTMENT DETAILS */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Appointment Number", value: "A024" },
            { label: "Booking Reference", value: "MC102458" },
            { label: "Consultation Date", value: "25 Nov 2026" },
            { label: "Consultation Time", value: "10:00 AM" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-medium text-slate-500">
                {item.label}
              </p>
              <p className="mt-2 text-xl font-extrabold text-[#102A56]">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* DOCTOR INFORMATION */}
          <aside className="space-y-5">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="h-24 bg-gradient-to-r from-[#102A56] to-blue-700" />

              <div className="-mt-12 px-5 pb-6">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=85"
                  alt="Doctor"
                  className="h-24 w-24 rounded-2xl border-4 border-white object-cover shadow"
                />

                <h3 className="mt-4 text-xl font-extrabold text-[#102A56]">
                  Dr. Sarah Williams
                </h3>
                <p className="mt-1 font-semibold text-blue-700">
                  Cardiologist
                </p>

                <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Qualification</span>
                    <span className="font-semibold text-slate-700">MBBS, MD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Experience</span>
                    <span className="font-semibold text-slate-700">12 Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Session Type</span>
                    <span className="font-semibold text-blue-700">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CONSULTATION STATUS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-[#102A56]">
                Consultation Status
              </h3>

              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full ${
                    status === "Active"
                      ? "bg-green-500"
                      : status === "Waiting"
                      ? "bg-amber-500"
                      : "bg-slate-400"
                  }`}
                />
                <span className="font-bold text-slate-700">{status}</span>
              </div>

              <div className="mt-5 space-y-2">
                <button
                  onClick={() => setStatus("Waiting")}
                  className="w-full rounded-lg bg-amber-50 px-3 py-2 text-sm font-bold text-amber-700 hover:bg-amber-100"
                >
                  Test Waiting
                </button>
                <button
                  onClick={() => setStatus("Active")}
                  className="w-full rounded-lg bg-green-50 px-3 py-2 text-sm font-bold text-green-700 hover:bg-green-100"
                >
                  Test Active
                </button>
                <button
                  onClick={() => setStatus("Completed")}
                  className="w-full rounded-lg bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200"
                >
                  Test Completed
                </button>
              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                Demo controls only. In the real system, the doctor changes the consultation status.
              </p>
            </div>

            {/* PRIVACY */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <h3 className="font-bold text-[#102A56]">
                🔒 Private & Secure Chat
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                This conversation is intended only for you and your assigned doctor.
              </p>
            </div>
          </aside>

          {/* CHAT WINDOW */}
          <section className="flex min-h-[650px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between gap-3 bg-[#102A56] px-5 py-5 text-white">
              <div>
                <h3 className="font-bold">Dr. Sarah Williams</h3>
                <p className="mt-1 text-xs text-blue-200">
                  {status === "Active"
                    ? "Online consultation active"
                    : status === "Waiting"
                    ? "Waiting for doctor to start"
                    : "Consultation completed"}
                </p>
              </div>
              <span className="rounded-full bg-white/15 px-3 py-2 text-xs font-bold">
                {status}
              </span>
            </div>

            {status === "Waiting" && (
              <div className="border-b border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                Your consultation has not started yet. Chat will open after your doctor starts the consultation.
              </div>
            )}

            {status === "Completed" && (
              <div className="border-b border-slate-200 bg-slate-100 p-4 text-sm text-slate-600">
                Consultation completed. You can read previous messages, but cannot send new messages.
              </div>
            )}

            <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50 p-5">
              <div className="text-center">
                <span className="rounded-full bg-white px-4 py-2 text-xs text-slate-500 shadow-sm">
                  25 November 2026
                </span>
              </div>

              {messages.map((item) => (
                <div
                  key={item.id}
                  className={`flex ${
                    item.sender === "patient" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="max-w-[85%]">
                    <p
                      className={`mb-1 text-xs font-semibold ${
                        item.sender === "patient"
                          ? "text-right text-blue-700"
                          : "text-slate-500"
                      }`}
                    >
                      {item.sender === "patient" ? "You" : "Dr. Sarah Williams"}
                    </p>
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                        item.sender === "patient"
                          ? "rounded-tr-sm bg-[#102A56] text-white"
                          : "rounded-tl-sm border border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      {item.text}
                    </div>
                    <p
                      className={`mt-1 text-[10px] text-slate-400 ${
                        item.sender === "patient" ? "text-right" : ""
                      }`}
                    >
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* MESSAGE INPUT */}
            <div className="border-t border-slate-200 bg-white p-4">
              {status === "Active" ? (
                <>
                  <div className="flex gap-3">
                    <input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") sendMessage();
                      }}
                      placeholder="Type your message here..."
                      className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!message.trim()}
                      className="rounded-xl bg-[#102A56] px-5 py-3 text-sm font-bold text-white hover:bg-blue-800 disabled:opacity-40"
                    >
                      Send ➤
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">
                    Please do not share your password or banking information.
                  </p>
                </>
              ) : (
                <div className="rounded-xl bg-slate-100 p-4 text-center text-sm font-medium text-slate-500">
                  {status === "Waiting"
                    ? "Chat is locked until the doctor starts the consultation."
                    : "Chat is read-only. You cannot send new messages."}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* INFORMATION */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="font-bold text-[#102A56]">
            Important Information
          </h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            <li>• Only the assigned doctor and patient should access this chat.</li>
            <li>• Chat opens after the doctor starts the consultation.</li>
            <li>• Previous messages remain available after completion.</li>
            <li>• New messages are disabled when the consultation is completed.</li>
          </ul>
        </div>
      </main>

      <footer className="mt-10 bg-[#102A56] px-5 py-6 text-center text-sm text-blue-100">
        © 2026 MediChannel – Lanka Care Hospital. All rights reserved.
      </footer>
    </div>
  );
}