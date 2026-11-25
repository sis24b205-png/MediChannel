"use client";

import { useState } from "react";
import Link from "next/link";

type User = {
  id: number;
  name: string;
  email: string;
  role: "Patient" | "Doctor" | "Manager" | "Admin";
  status: "Active" | "Inactive";
};

function MediChannelLogo() {
  return (
    <svg viewBox="0 0 100 100" className="h-11 w-11 shrink-0" fill="none">
      <path
        d="M50 87 C40 78 9 55 9 33 C9 15 31 7 50 29 C69 7 91 15 91 33 C91 55 60 78 50 87Z"
        stroke="#102A56" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M12 51 H31 L40 39 L49 67 L58 32 L66 51 H77"
        stroke="#2563EB" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M75 15 V31 M67 23 H83"
        stroke="#2563EB" strokeWidth="5" strokeLinecap="round"
      />
    </svg>
  );
}

const initialUsers: User[] = [
  { id: 1, name: "John Silva", email: "john@gmail.com", role: "Patient", status: "Active" },
  { id: 2, name: "Mary Fernando", email: "mary@gmail.com", role: "Patient", status: "Active" },
  { id: 3, name: "Dr. Sarah Williams", email: "sarah@medichannel.com", role: "Doctor", status: "Active" },
  { id: 4, name: "Dr. Michael Fernando", email: "michael@medichannel.com", role: "Doctor", status: "Active" },
  { id: 5, name: "Hospital Manager", email: "manager@medichannel.com", role: "Manager", status: "Active" },
  { id: 6, name: "System Admin", email: "admin@medichannel.com", role: "Admin", status: "Active" },
];

const initialSpecialities = [
  "Cardiology",
  "Neurology",
  "Paediatrics",
  "Dermatology",
  "Orthopaedics",
  "Dentistry",
  "Pulmonology",
  "Ophthalmology",
  "ENT",
  "Psychiatry",
  "General Medicine",
  "Gynaecology",
  "Urology",
  "Gastroenterology",
  "Oncology",
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [specialities, setSpecialities] = useState(initialSpecialities);
  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<"Doctor" | "Manager">("Doctor");
  const [newSpeciality, setNewSpeciality] = useState("");
  const [message, setMessage] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [registrationEnabled, setRegistrationEnabled] = useState(true);

  function createAccount(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!newName.trim() || !newEmail.trim()) {
      setMessage("Please enter the name and email address.");
      return;
    }

    const exists = users.some(
      (user) => user.email.toLowerCase() === newEmail.trim().toLowerCase()
    );

    if (exists) {
      setMessage("An account with this email already exists.");
      return;
    }

    const newUser: User = {
      id: Date.now(),
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      status: "Active",
    };

    setUsers((previous) => [...previous, newUser]);
    setNewName("");
    setNewEmail("");
    setMessage(`${newRole} account added successfully in this demo.`);
  }

  function toggleUserStatus(id: number) {
    setUsers((previous) =>
      previous.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
  }

  function addSpeciality(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const value = newSpeciality.trim();

    if (!value) return;

    if (specialities.some((item) => item.toLowerCase() === value.toLowerCase())) {
      setMessage("This speciality already exists.");
      return;
    }

    setSpecialities((previous) => [...previous, value]);
    setNewSpeciality("");
    setMessage("Speciality added successfully in this demo.");
  }

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email} ${user.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const stats = [
    { title: "Total Users", value: users.length, icon: "👥", color: "bg-blue-50 text-blue-700" },
    { title: "Doctors", value: users.filter((u) => u.role === "Doctor").length, icon: "👨‍⚕️", color: "bg-indigo-50 text-indigo-700" },
    { title: "Managers", value: users.filter((u) => u.role === "Manager").length, icon: "🏥", color: "bg-green-50 text-green-700" },
    { title: "Specialities", value: specialities.length, icon: "🩺", color: "bg-amber-50 text-amber-700" },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <MediChannelLogo />
            <div>
              <h1 className="text-xl font-extrabold text-[#102A56]">MediChannel</h1>
              <p className="text-xs text-slate-500">System Administration</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-semibold text-slate-600 sm:block">
              System Administrator
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
            Admin Menu
          </p>

          <div className="space-y-2">
            {[
              { name: "Overview", icon: "📊" },
              { name: "User Management", icon: "👥" },
              { name: "Create Account", icon: "➕" },
              { name: "Specialities", icon: "🩺" },
              { name: "System Settings", icon: "⚙️" },
              { name: "Reports", icon: "📈" },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name);
                  setMessage("");
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold ${
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
            <Link href="/manager-dashboard" className="mt-3 block rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-blue-50">
              Manager Dashboard
            </Link>
            <Link href="/doctor-dashboard" className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-blue-50">
              Doctor Dashboard
            </Link>
            <Link href="/dashboard" className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-blue-50">
              Patient Dashboard
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
              Admin Dashboard
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Manage users, hospital specialities and system settings.
            </p>
          </div>

          {/* OVERVIEW */}
          {activeTab === "Overview" && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className={`rounded-xl p-3 text-2xl ${stat.color}`}>{stat.icon}</span>
                      <span className="text-xs font-semibold text-green-600">System data</span>
                    </div>
                    <p className="mt-5 text-sm font-medium text-slate-500">{stat.title}</p>
                    <p className="mt-1 text-3xl font-extrabold text-[#102A56]">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-[#102A56]">User Distribution</h3>
                  <div className="mt-5 space-y-4">
                    {(["Patient", "Doctor", "Manager", "Admin"] as const).map((role) => {
                      const count = users.filter((user) => user.role === role).length;
                      const percentage = users.length ? (count / users.length) * 100 : 0;

                      return (
                        <div key={role}>
                          <div className="mb-2 flex justify-between text-sm">
                            <span className="font-medium text-slate-600">{role}</span>
                            <span className="font-bold text-[#102A56]">{count}</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                            <div className="h-full rounded-full bg-blue-600" style={{ width: `${percentage}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-[#102A56]">System Information</h3>
                  <div className="mt-5 space-y-4 text-sm">
                    <div className="flex justify-between border-b border-slate-100 pb-3">
                      <span className="text-slate-500">Hospital</span>
                      <span className="font-bold text-slate-700">Lanka Care Hospital</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-3">
                      <span className="text-slate-500">Doctors</span>
                      <span className="font-bold text-slate-700">40+ visiting doctors</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-3">
                      <span className="text-slate-500">Specialities</span>
                      <span className="font-bold text-slate-700">{specialities.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">System</span>
                      <span className="font-bold text-green-700">Demo Mode</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* USER MANAGEMENT */}
          {activeTab === "User Management" && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-[#102A56]">User Management</h3>
                  <p className="mt-1 text-sm text-slate-500">View and manage system accounts.</p>
                </div>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search users..."
                  className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-blue-500 sm:w-64"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="p-3">Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-slate-100">
                        <td className="p-3 font-semibold text-slate-700">{user.name}</td>
                        <td className="p-3 text-slate-600">{user.email}</td>
                        <td className="p-3">
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{user.role}</span>
                        </td>
                        <td className="p-3">
                          <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                            user.status === "Active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                          }`}>{user.status}</span>
                        </td>
                        <td className="p-3">
                          <button
                            disabled={user.role === "Admin"}
                            onClick={() => toggleUserStatus(user.id)}
                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            {user.status === "Active" ? "Deactivate" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-500">No users found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* CREATE ACCOUNT */}
          {activeTab === "Create Account" && (
            <section className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#102A56]">Create Staff Account</h3>
              <p className="mt-1 text-sm text-slate-500">
                Admin can create Doctor and Manager accounts.
              </p>

              <form onSubmit={createAccount} className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Full Name</label>
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Account Role</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as "Doctor" | "Manager")}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                  >
                    <option value="Doctor">Doctor</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>

                <button type="submit" className="w-full rounded-xl bg-[#102A56] px-5 py-3 font-bold text-white hover:bg-blue-800">
                  Create Account
                </button>
              </form>

              {message && (
                <p className="mt-4 rounded-xl bg-blue-50 p-3 text-sm font-semibold text-blue-800">{message}</p>
              )}

              <p className="mt-4 text-xs leading-5 text-slate-500">
                Demo only: real accounts, passwords and permissions must be created securely through the Spring Boot backend.
              </p>
            </section>
          )}

          {/* SPECIALITIES */}
          {activeTab === "Specialities" && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#102A56]">Hospital Specialities</h3>
              <p className="mt-1 text-sm text-slate-500">Manage the list of medical specialities.</p>

              <form onSubmit={addSpeciality} className="mt-5 flex flex-wrap gap-3">
                <input
                  value={newSpeciality}
                  onChange={(e) => setNewSpeciality(e.target.value)}
                  placeholder="Enter new speciality"
                  className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
                <button type="submit" className="rounded-xl bg-[#102A56] px-5 py-3 text-sm font-bold text-white hover:bg-blue-800">
                  Add Speciality
                </button>
              </form>

              {message && (
                <p className="mt-3 rounded-xl bg-blue-50 p-3 text-sm font-semibold text-blue-800">{message}</p>
              )}

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {specialities.map((speciality, index) => (
                  <div key={speciality} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-700">
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold text-slate-700">{speciality}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SYSTEM SETTINGS */}
          {activeTab === "System Settings" && (
            <section className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#102A56]">System Settings</h3>
              <p className="mt-1 text-sm text-slate-500">Demo settings for the MediChannel platform.</p>

              <div className="mt-6 space-y-5">
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <p className="font-semibold text-slate-700">Patient Registration</p>
                    <p className="mt-1 text-xs text-slate-500">Allow new patients to register.</p>
                  </div>
                  <button
                    onClick={() => setRegistrationEnabled(!registrationEnabled)}
                    className={`rounded-full px-4 py-2 text-xs font-bold ${
                      registrationEnabled ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {registrationEnabled ? "Enabled" : "Disabled"}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-700">Maintenance Mode</p>
                    <p className="mt-1 text-xs text-slate-500">Demo switch for system maintenance.</p>
                  </div>
                  <button
                    onClick={() => setMaintenanceMode(!maintenanceMode)}
                    className={`rounded-full px-4 py-2 text-xs font-bold ${
                      maintenanceMode ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-700"
                    }`}
                  >
                    {maintenanceMode ? "On" : "Off"}
                  </button>
                </div>
              </div>

              <p className="mt-6 rounded-xl bg-amber-50 p-4 text-xs leading-5 text-amber-800">
                These switches only change the current page demo. Actual system settings must be controlled by the backend.
              </p>
            </section>
          )}

          {/* REPORTS */}
          {activeTab === "Reports" && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#102A56]">System Reports</h3>
              <p className="mt-1 text-sm text-slate-500">Current summary based on demonstration data.</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Patient Accounts", value: users.filter((u) => u.role === "Patient").length },
                  { label: "Doctor Accounts", value: users.filter((u) => u.role === "Doctor").length },
                  { label: "Manager Accounts", value: users.filter((u) => u.role === "Manager").length },
                  { label: "Hospital Specialities", value: specialities.length },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">{item.label}</p>
                    <p className="mt-2 text-3xl font-extrabold text-[#102A56]">{item.value}</p>
                  </div>
                ))}
              </div>

              <p className="mt-6 rounded-xl border border-slate-200 p-4 text-sm leading-6 text-slate-600">
                Actual reports and analytics will be generated using records stored in PostgreSQL after backend integration.
              </p>
            </section>
          )}

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <h3 className="font-bold text-[#102A56]">Security Reminder</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Only authorised administrators should create Doctor and Manager accounts.
              Patient registration should create a Patient account by default.
              Role permissions must be verified on the server, not only in the frontend.
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