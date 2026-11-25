const specialities = [
  "Cardiology", "Neurology", "Paediatrics", "Dermatology",
  "Orthopaedics", "Dentistry", "Pulmonology", "Ophthalmology",
  "ENT", "Psychiatry", "General Medicine", "Gynaecology",
  "Urology", "Gastroenterology", "Oncology",
];

const specialityIcons = [
  "❤️", "🧠", "👶", "🩺", "🦴",
  "🦷", "🫁", "👁️", "👂", "💬",
  "➕", "🌸", "🩻", "🧬", "🔬",
];

const services = [
  {
    number: "01",
    title: "Easy Appointment Booking",
    description: "Book your doctor appointment online in just a few simple steps.",
    icon: "calendar",
    color: "from-blue-500 to-cyan-400",
    background: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    number: "02",
    title: "Experienced Doctors",
    description: "Find trusted doctors across a wide range of specialities.",
    icon: "doctor",
    color: "from-violet-500 to-purple-400",
    background: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    number: "03",
    title: "Live Queue Updates",
    description: "Know your queue position and estimated waiting time.",
    icon: "clock",
    color: "from-emerald-500 to-teal-400",
    background: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
];

function ServiceIcon({ type }: { type: string }) {
  if (type === "calendar") {
    return (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none">
        <rect x="7" y="11" width="34" height="30" rx="6" stroke="currentColor" strokeWidth="3" />
        <path d="M15 7V16M33 7V16M7 21H41" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M17 30L22 35L32 25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "doctor") {
    return (
      <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none">
        <circle cx="24" cy="12" r="7" stroke="currentColor" strokeWidth="3" />
        <path d="M11 40V35C11 28 17 23 24 23C31 23 37 28 37 35V40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M24 29V37M20 33H28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" className="h-9 w-9" fill="none">
      <circle cx="24" cy="25" r="17" stroke="currentColor" strokeWidth="3" />
      <path d="M24 15V25L31 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 5H31" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-800">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3">
            <svg viewBox="0 0 100 100" className="h-12 w-12 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 87 C40 78 9 55 9 33 C9 15 31 7 50 29 C69 7 91 15 91 33 C91 55 60 78 50 87Z" stroke="#102A56" strokeWidth="7" strokeLinejoin="round" />
              <path d="M12 51 H31 L40 39 L49 67 L58 32 L66 51 H77" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M75 15 V31 M67 23 H83" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
            </svg>
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="text-[#102A56]">Medi</span>
              <span className="text-blue-500">Channel</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
            <a href="/" className="text-[#102A56]">Home</a>
            <a href="/doctors" className="transition hover:text-blue-600">Find Doctors</a>
            <a href="#specialities" className="transition hover:text-blue-600">Specialities</a>
            <a href="#services" className="transition hover:text-blue-600">Services</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="/login" className="hidden rounded-xl px-4 py-2.5 text-sm font-bold text-[#102A56] transition hover:bg-blue-50 sm:inline-block">
              Login
            </a>
            <a href="/register" className="rounded-xl bg-[#102A56] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-[#0B1D3A]">
              Register
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061C48] via-[#102A56] to-[#064B91] text-white">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">

          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              Your health, our priority
            </div>

            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
              Better Healthcare.
              <span className="block text-cyan-300">
                Easier Appointments.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Find trusted doctors, book your appointments online and follow
              your queue in real time with MediChannel.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a href="/doctors" className="rounded-xl bg-white px-7 py-4 font-bold text-[#102A56] shadow-xl transition hover:-translate-y-1 hover:bg-blue-50">
                Find a Doctor →
              </a>
              <a href="#services" className="rounded-xl border border-white/30 bg-white/10 px-7 py-4 font-bold text-white transition hover:bg-white/20">
                Explore Services
              </a>
            </div>

            <div className="mt-12 grid max-w-lg grid-cols-3 gap-5 border-t border-white/20 pt-7">
              <div>
                <p className="text-3xl font-extrabold text-white">40+</p>
                <p className="mt-1 text-sm text-blue-200">Visiting Doctors</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">15</p>
                <p className="mt-1 text-sm text-blue-200">Specialities</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">120+</p>
                <p className="mt-1 text-sm text-blue-200">Weekly Sessions</p>
              </div>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="relative">
            <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-blue-300/30 blur-3xl" />
            <div className="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border-8 border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1100&q=90"
                alt="Doctor"
                className="h-[420px] w-full object-cover"
              />

              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 p-5 text-[#102A56] shadow-lg backdrop-blur">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl text-blue-700">
                    ✓
                  </div>
                  <div>
                    <p className="font-extrabold">Healthcare made simple</p>
                    <p className="text-sm text-slate-500">
                      Book your appointment with confidence
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* QUICK SEARCH */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-br from-[#061C48] via-[#0B1D3A] to-[#102A56] p-7 text-white shadow-2xl shadow-blue-900/30 md:p-10">
          <div className="mb-7 text-center md:text-left">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-200">Quick Search</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white md:text-3xl">
              Find the right doctor for you
            </h2>
            <p className="mt-2 text-sm text-blue-100">
              Search doctors by name, speciality or session type.
            </p>
          </div>

          <div className="grid items-end gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-blue-100">Doctor Name</label>
              <input type="text" placeholder="Enter doctor name" className="h-12 w-full min-w-0 rounded-xl border border-white/30 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-300/30" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-blue-100">Speciality</label>
              <select defaultValue="" className="h-12 w-full min-w-0 rounded-xl border border-white/30 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-300/30">
                <option value="" disabled>Select speciality</option>
                {specialities.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-blue-100">Session Type</label>
              <select defaultValue="" className="h-12 w-full min-w-0 rounded-xl border border-white/30 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-300/30">
                <option value="" disabled>Select session</option>
                <option value="Physical">Physical</option>
                <option value="Online">Online</option>
              </select>
            </div>

            <a href="/doctors" className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-3 text-sm font-extrabold text-[#102A56] shadow-lg transition hover:-translate-y-1 hover:bg-blue-100">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.5" />
                <path d="M16 16L21 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              Search Doctors
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-gradient-to-b from-slate-50 to-blue-50/50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="font-bold uppercase tracking-[0.2em] text-blue-600">Our Services</p>
            <h2 className="mt-3 text-3xl font-extrabold text-[#102A56] md:text-4xl">Healthcare made easier</h2>
            <p className="mt-4 leading-7 text-slate-500">A simple and convenient way to manage your hospital appointments.</p>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.number} className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-slate-100/70 transition group-hover:scale-150" />
                <div className="relative">
                  <div className={`mb-7 flex h-20 w-20 items-center justify-center rounded-3xl ${service.background} ${service.iconColor} shadow-sm transition duration-300 group-hover:scale-110`}>
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-lg`}>
                      <ServiceIcon type={service.icon} />
                    </div>
                  </div>
                  <p className="text-sm font-extrabold tracking-widest text-blue-500">{service.number}</p>
                  <h3 className="mt-3 text-xl font-extrabold leading-snug text-[#102A56]">{service.title}</h3>
                  <p className="mt-4 leading-7 text-slate-500">{service.description}</p>
                  <div className="mt-6 h-1.5 w-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 group-hover:w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIALITIES */}
      <section id="specialities" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 text-center">
          <p className="font-bold uppercase tracking-[0.2em] text-blue-600">Find a Specialist</p>
          <h2 className="mt-3 text-3xl font-extrabold text-[#102A56] md:text-4xl">Medical Specialities</h2>
          <p className="mt-4 text-slate-500">Explore our available medical departments.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {specialities.map((item, index) => (
            <a href="/doctors" key={item} className="group rounded-2xl border border-slate-100 bg-white p-5 text-center font-bold text-[#102A56] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:shadow-lg">
              <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl transition group-hover:scale-110 group-hover:bg-white">
                {specialityIcons[index]}
              </span>
              {item}
            </a>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="px-6 pb-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#102A56] via-blue-800 to-blue-600 px-8 py-14 text-center text-white shadow-2xl md:px-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-sky-300/20 blur-2xl" />
          <div className="relative">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-200">Start Your Healthcare Journey</p>
            <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">Ready to book your appointment?</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
              Take the first step towards better healthcare. Find your doctor and book your appointment today.
            </p>
            <a href="/register" className="mt-8 inline-block rounded-xl bg-white px-8 py-4 font-extrabold text-[#102A56] shadow-lg transition hover:-translate-y-1 hover:bg-blue-50">
              Get Started →
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#081B38] px-6 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 md:flex-row">
          <div>
            <p className="text-2xl font-extrabold">Medi<span className="text-blue-400">Channel</span></p>
            <p className="mt-2 text-sm text-blue-200">Better Healthcare. Easier Appointments.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-5 text-sm text-blue-200">
            <a href="/" className="transition hover:text-white">Home</a>
            <a href="/doctors" className="transition hover:text-white">Doctors</a>
            <a href="/login" className="transition hover:text-white">Login</a>
            <a href="/register" className="transition hover:text-white">Register</a>
          </div>

          <p className="text-sm text-blue-200">© 2026 MediChannel. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}