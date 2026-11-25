"use client";

import { useState } from "react";
import Link from "next/link";

type Notification = {
  id: number;
  title: string;
  description: string;
  time: string;
  category: "Queue" | "Consultation" | "Appointment" | "System";
  read: boolean;
  icon: string;
  color: string;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Your Queue Is Approaching!",
    description:
      "Only 3 patients are ahead of you. Please be ready for your consultation with Dr. Sarah Williams.",
    time: "5 minutes ago",
    category: "Queue",
    read: false,
    icon: "🔔",
    color: "bg-blue-100",
  },
  {
    id: 2,
    title: "Doctor Is Calling You",
    description:
      "Dr. Sarah Williams is ready to see you. Please proceed to Room 02.",
    time: "20 minutes ago",
    category: "Consultation",
    read: false,
    icon: "👩‍⚕️",
    color: "bg-green-100",
  },
  {
    id: 3,
    title: "Online Consultation Waiting",
    description:
      "Your online consultation with Dr. Michael Fernando will be available when the doctor starts the session.",
    time: "1 hour ago",
    category: "Consultation",
    read: false,
    icon: "💻",
    color: "bg-indigo-100",
  },
  {
    id: 4,
    title: "Appointment Confirmed",
    description:
      "Your appointment MC002 with Dr. Michael Fernando has been confirmed for 28 November 2026 at 10:30 AM.",
    time: "Yesterday",
    category: "Appointment",
    read: true,
    icon: "📅",
    color: "bg-purple-100",
  },
  {
    id: 5,
    title: "Session Delayed",
    description:
      "Your scheduled consultation has been delayed. Please check the Live Queue Status page for updates.",
    time: "Yesterday",
    category: "Queue",
    read: true,
    icon: "⏰",
    color: "bg-amber-100",
  },
  {
    id: 6,
    title: "Hospital Notice",
    description:
      "Welcome to MediChannel. Thank you for choosing Lanka Care Hospital for your healthcare needs.",
    time: "2 days ago",
    category: "System",
    read: true,
    icon: "🏥",
    color: "bg-slate-100",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const [activeFilter, setActiveFilter] = useState("All");

  const unreadCount = notifications.filter((item) => !item.read).length;

  const filteredNotifications =
    activeFilter === "All"
      ? notifications
      : activeFilter === "Unread"
      ? notifications.filter((item) => !item.read)
      : notifications.filter((item) => item.category === activeFilter);

  function markAsRead(id: number) {
    setNotifications((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  }

  function markAllAsRead() {
    setNotifications((previous) =>
      previous.map((item) => ({ ...item, read: true }))
    );
  }

  function deleteNotification(id: number) {
    setNotifications((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <Link href="/" className="flex items-center gap-2">
            <svg viewBox="0 0 100 100" className="h-11 w-11" fill="none">
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

            <div>
              <h1 className="text-xl font-extrabold text-[#102A56]">
                MediChannel
              </h1>
              <p className="text-xs text-slate-500">
                Lanka Care Hospital
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
            <Link href="/" className="hover:text-blue-700">Home</Link>
            <Link href="/dashboard" className="hover:text-blue-700">Dashboard</Link>
            <Link href="/doctors" className="hover:text-blue-700">Find Doctors</Link>
            <Link href="/appointments" className="hover:text-blue-700">My Appointments</Link>
            <Link href="/notifications" className="text-blue-700">Notifications</Link>
          </nav>

          <Link
            href="/dashboard"
            className="rounded-lg bg-[#102A56] px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-10">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-600">
            Patient Portal
          </p>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-extrabold text-[#102A56] md:text-4xl">
                Notifications
              </h2>
              <p className="mt-2 text-slate-500">
                Stay updated with your appointments and queue activities.
              </p>
            </div>

            <div className="rounded-xl bg-[#102A56] px-5 py-3 text-white">
              <p className="text-xs text-blue-200">Unread Notifications</p>
              <p className="text-2xl font-extrabold">{unreadCount}</p>
            </div>
          </div>
        </div>

        {/* Notification Summary */}
        <div className="mb-7 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Notifications</p>
            <p className="mt-2 text-3xl font-extrabold text-[#102A56]">
              {notifications.length}
            </p>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Unread</p>
            <p className="mt-2 text-3xl font-extrabold text-amber-600">
              {unreadCount}
            </p>
          </div>

          <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Read</p>
            <p className="mt-2 text-3xl font-extrabold text-green-600">
              {notifications.length - unreadCount}
            </p>
          </div>
        </div>

        {/* Notifications Section */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-bold text-[#102A56]">
                All Notifications
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Your latest hospital updates.
              </p>
            </div>

            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="w-fit rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Mark All as Read
            </button>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-100 pb-4">
            {["All", "Unread", "Queue", "Consultation", "Appointment", "System"].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                    activeFilter === filter
                      ? "bg-[#102A56] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {filter}
                </button>
              )
            )}
          </div>

          {/* Notification List */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center">
                <div className="text-4xl">🔔</div>
                <p className="mt-3 font-bold text-slate-600">
                  No notifications found
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  You are all caught up!
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <article
                  key={notification.id}
                  className={`rounded-xl border p-4 transition hover:shadow-sm sm:p-5 ${
                    notification.read
                      ? "border-slate-200 bg-white"
                      : "border-blue-200 bg-blue-50/50"
                  }`}
                >
                  <div className="flex gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${notification.color}`}
                    >
                      {notification.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-bold text-[#102A56]">
                          {notification.title}
                        </h4>

                        {!notification.read && (
                          <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-bold text-blue-700">
                            New
                          </span>
                        )}
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {notification.description}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                          <span>{notification.time}</span>
                          <span className="rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-600">
                            {notification.category}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs font-bold text-blue-700 hover:underline"
                            >
                              Mark as Read
                            </button>
                          )}

                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-xs font-bold text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/appointments"
            className="rounded-lg border border-blue-600 px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
          >
            My Appointments
          </Link>

          <Link
            href="/queue"
            className="rounded-lg bg-[#102A56] px-5 py-3 text-sm font-bold text-white hover:bg-blue-800"
          >
            View Live Queue
          </Link>
        </div>
      </div>

      <footer className="mt-10 bg-[#061C48] px-5 py-6 text-center text-sm text-blue-100">
        © 2026 MediChannel - Lanka Care Hospital. All rights reserved.
      </footer>
    </main>
  );
}