import React, { useEffect, useMemo, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Scissors,
  Sparkles,
  UserRound,
  UsersRound,
  Menu,
  X,
  MapPin,
  Phone,
  CircleHelp,
  Clock,
  BadgeCheck,
  Plus,
  Search,
  Settings2,
  Pencil,
  Trash2,
  RotateCcw,
  ChartNoAxesCombined,
  ListChecks,
  LogIn,
  CircleUserRound,
  CalendarCheck,
  CheckCircle2,
  CircleAlert,
  CircleDot,
  Heart,
  Bell,
  ChevronRight,
  ArrowUpRight,
  Coffee,
  Ban,
  UserCheck,
  UserX,
  IndianRupee,
  Timer,
  WandSparkles,
  CalendarClock,
} from "lucide-react";

const STORE_KEY = "smartsalon-demo-v1";
const todayKolkata = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
const timeKolkata = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date());
const shiftDate = (date, offset) => {
  const [year, month, day] = date.split("-").map(Number);
  const d = new Date(Date.UTC(year, month - 1, day + offset));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
};
const dateIn = (offset) => shiftDate(todayKolkata(), offset);
const fmtDate = (
  date,
  opts = { weekday: "short", day: "numeric", month: "short" },
) =>
  date
    ? new Intl.DateTimeFormat("en-IN", {
        ...opts,
        timeZone: "Asia/Kolkata",
      }).format(new Date(`${date}T12:00:00+05:30`))
    : "—";
const fmtMoney = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
const mins = (t) => {
  const [h, m] = (t || "00:00").split(":").map(Number);
  return h * 60 + m;
};
const timeLabel = (t) => {
  if (!t) return "—";
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "pm" : "am"}`;
};
const addMins = (t, n) => {
  const m = mins(t) + n;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};
const dateIsPast = (d, t = "00:00") =>
  d < todayKolkata() || (d === todayKolkata() && t <= timeKolkata());
const id = () => Math.random().toString(36).slice(2, 9).toUpperCase();

const makeSeed = () => {
  const services = [
    {
      id: "s-haircut",
      name: "Classic haircut",
      category: "Haircuts",
      description: "A considered cut, finished to suit your style.",
      price: 180,
      duration: 30,
      employeeIds: ["emp-shankar"],
      active: true,
    },
    {
      id: "s-beard",
      name: "Beard trim",
      category: "Beard & grooming",
      description: "Shape, define and tidy your beard.",
      price: 100,
      duration: 20,
      employeeIds: ["emp-shankar"],
      active: true,
    },
    {
      id: "s-thread",
      name: "Eyebrow threading",
      category: "Threading",
      description: "Precise shaping with a clean finish.",
      price: 50,
      duration: 15,
      employeeIds: ["emp-tulasi"],
      active: true,
    },
    {
      id: "s-wax",
      name: "Waxing",
      category: "Waxing",
      description: "A neat, careful grooming service.",
      price: 150,
      duration: 30,
      employeeIds: ["emp-tulasi"],
      active: true,
    },
    {
      id: "s-style",
      name: "Hair styling",
      category: "Hair styling",
      description: "A polished finish for your day or occasion.",
      price: 120,
      duration: 25,
      employeeIds: ["emp-shankar"],
      active: true,
    },
    {
      id: "s-groom",
      name: "Grooming refresh",
      category: "Other grooming",
      description: "A quick tidy-up between full appointments.",
      price: 100,
      duration: 20,
      employeeIds: ["emp-shankar"],
      active: true,
    },
  ];
  const employees = [
    {
      id: "emp-tulasi",
      name: "Tulasi",
      gender: "female",
      specialties: ["Eyebrow threading", "Waxing"],
      serviceIds: ["s-thread", "s-wax"],
      available: true,
      workStart: "09:00",
      workEnd: "18:00",
      breakStart: "13:00",
      breakEnd: "14:00",
      blocks: [],
    },
    {
      id: "emp-shankar",
      name: "Shankar",
      gender: "male",
      specialties: [
        "Haircuts",
        "Beard trimming",
        "Hair styling",
        "General grooming",
      ],
      serviceIds: ["s-haircut", "s-beard", "s-style", "s-groom"],
      available: true,
      workStart: "10:00",
      workEnd: "19:00",
      breakStart: "14:00",
      breakEnd: "14:45",
      blocks: [],
    },
  ];
  const customers = [
    {
      id: "c-demo-1",
      name: "Aarav (sample)",
      phone: "9000000001",
      email: "",
      preferences:
        "Prefers a neat side part. Please check before reusing this preference.",
      preferredEmployeeId: "emp-shankar",
      consent: false,
      notes: "",
      sample: true,
    },
    {
      id: "c-demo-2",
      name: "Meera (sample)",
      phone: "9000000002",
      email: "",
      preferences:
        "Likes a gentle threading finish. Confirm preference each visit.",
      preferredEmployeeId: "emp-tulasi",
      consent: false,
      notes: "",
      sample: true,
    },
    {
      id: "c-demo-3",
      name: "Dev (sample)",
      phone: "9000000003",
      email: "",
      preferences: "",
      preferredEmployeeId: "",
      consent: false,
      notes: "",
      sample: true,
    },
  ];
  const appointments = [
    {
      id: "a-demo-1",
      reference: "SS-DEMO01",
      customerId: "c-demo-1",
      customerName: "Aarav (sample)",
      phone: "9000000001",
      serviceId: "s-haircut",
      employeeId: "emp-shankar",
      date: dateIn(0),
      start: "11:00",
      end: "11:30",
      status: "Confirmed",
      price: 180,
      notes: "",
      sample: true,
    },
    {
      id: "a-demo-2",
      reference: "SS-DEMO02",
      customerId: "c-demo-2",
      customerName: "Meera (sample)",
      phone: "9000000002",
      serviceId: "s-thread",
      employeeId: "emp-tulasi",
      date: dateIn(0),
      start: "10:30",
      end: "10:45",
      status: "Completed",
      price: 50,
      notes: "",
      sample: true,
    },
    {
      id: "a-demo-3",
      reference: "SS-DEMO03",
      customerId: "c-demo-3",
      customerName: "Dev (sample)",
      phone: "9000000003",
      serviceId: "s-beard",
      employeeId: "emp-shankar",
      date: dateIn(1),
      start: "12:00",
      end: "12:20",
      status: "Confirmed",
      price: 100,
      notes: "",
      sample: true,
    },
    {
      id: "a-demo-4",
      reference: "SS-DEMO04",
      customerId: "c-demo-1",
      customerName: "Aarav (sample)",
      phone: "9000000001",
      serviceId: "s-haircut",
      employeeId: "emp-shankar",
      date: dateIn(-1),
      start: "15:00",
      end: "15:30",
      status: "Cancelled",
      price: 180,
      notes: "",
      sample: true,
    },
  ];
  const queue = [
    {
      id: "q-demo-1",
      number: "A01",
      customer: "Walk-in 1",
      serviceId: "s-haircut",
      employeeId: "emp-shankar",
      arrival: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
      status: "Waiting",
      sample: true,
    },
    {
      id: "q-demo-2",
      number: "A02",
      customer: "Walk-in 2",
      serviceId: "s-thread",
      employeeId: "emp-tulasi",
      arrival: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      status: "Waiting",
      sample: true,
    },
  ];
  return {
    services,
    employees,
    customers,
    appointments,
    queue,
    settings: {
      salonName: "SmartSalon AI",
      open: "09:00",
      close: "19:00",
      configured: true,
      walkins: true,
      holidays: [],
      specialHours: [],
      offers: [],
      slotStep: 15,
      returnInterval: 30,
    },
    lastUpdated: new Date().toISOString(),
  };
};
const loadStore = () => {
  try {
    const saved = localStorage.getItem(STORE_KEY);
    return saved ? JSON.parse(saved) : makeSeed();
  } catch {
    return makeSeed();
  }
};

function useSalonData() {
  const [data, setData] = useState(loadStore);
  useEffect(() => {
    localStorage.setItem(
      STORE_KEY,
      JSON.stringify({ ...data, lastUpdated: new Date().toISOString() }),
    );
  }, [data]);
  const update = (fn) =>
    setData((prev) => (typeof fn === "function" ? fn(prev) : fn));
  const reset = () => {
    const fresh = makeSeed();
    setData(fresh);
    localStorage.setItem(STORE_KEY, JSON.stringify(fresh));
  };
  return [data, update, reset];
}
const isBlocking = (s) => !["Cancelled", "No-show", "Completed"].includes(s);
const serviceById = (data, sid) => data.services.find((x) => x.id === sid);
const employeeById = (data, eid) => data.employees.find((x) => x.id === eid);
const customerById = (data, cid) => data.customers.find((x) => x.id === cid);
const isSalonOpen = (data) => {
  if (
    !data.settings.configured ||
    data.settings.holidays.includes(todayKolkata())
  )
    return false;
  const special = data.settings.specialHours.find(
    (schedule) => schedule.date === todayKolkata(),
  );
  const open = special?.open || data.settings.open;
  const close = special?.close || data.settings.close;
  const now = timeKolkata();
  return mins(now) >= mins(open) && mins(now) < mins(close);
};

function overlap(start, end, otherStart, otherEnd) {
  return mins(start) < mins(otherEnd) && mins(end) > mins(otherStart);
}
function slotsFor(data, employee, service, date) {
  if (
    !employee ||
    !service ||
    !date ||
    !data.settings.configured ||
    !employee.available ||
    !employee.serviceIds.includes(service.id)
  )
    return [];
  if (data.settings.holidays.includes(date)) return [];
  const hours = data.settings.specialHours.find((x) => x.date === date);
  const open = hours?.open || data.settings.open,
    close = hours?.close || data.settings.close;
  const start = Math.max(mins(open), mins(employee.workStart)),
    end = Math.min(mins(close), mins(employee.workEnd));
  const slots = [];
  for (
    let n = start;
    n + service.duration <= end;
    n += Number(data.settings.slotStep || 15)
  ) {
    const t = `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`,
      finish = addMins(t, service.duration);
    if (dateIsPast(date, t)) continue;
    if (
      employee.breakStart &&
      overlap(t, finish, employee.breakStart, employee.breakEnd)
    )
      continue;
    if (
      (employee.blocks || []).some(
        (b) => b.date === date && overlap(t, finish, b.start, b.end),
      )
    )
      continue;
    if (
      data.appointments.some(
        (a) =>
          a.employeeId === employee.id &&
          a.date === date &&
          isBlocking(a.status) &&
          overlap(t, finish, a.start, a.end),
      )
    )
      continue;
    slots.push(t);
  }
  return slots;
}
function availableEmployees(data, service, date) {
  return data.employees.filter(
    (e) =>
      service.employeeIds.includes(e.id) &&
      e.serviceIds.includes(service.id) &&
      slotsFor(data, e, service, date).length > 0,
  );
}
function nextAvailableSlot(data, date) {
  return data.services
    .filter((service) => service.active)
    .flatMap((service) =>
      availableEmployees(data, service, date).flatMap((employee) =>
        slotsFor(data, employee, service, date).map((time) => ({
          time,
          employee,
          service,
        })),
      ),
    )
    .sort((a, b) => a.time.localeCompare(b.time))[0];
}
function queueWait(data, entry) {
  if (entry.status === "In service") return 0;
  const emp = employeeById(data, entry.employeeId);
  if (!emp || !emp.available) return null;
  const ahead = data.queue
    .filter(
      (q) =>
        q.employeeId === entry.employeeId &&
        ["Waiting", "Called"].includes(q.status) &&
        q.id !== entry.id &&
        new Date(q.arrival) <= new Date(entry.arrival),
    )
    .sort((a, b) => a.arrival.localeCompare(b.arrival));
  let estimate = 0;
  const current = data.queue.find(
    (q) => q.employeeId === emp.id && q.status === "In service",
  );
  if (current) {
    const duration = serviceById(data, current.serviceId)?.duration || 25;
    const elapsed = current.startedAt
      ? Math.floor((Date.now() - new Date(current.startedAt).getTime()) / 60000)
      : 0;
    estimate += Math.max(0, duration - elapsed);
  }
  estimate += ahead.reduce(
    (n, q) => n + (serviceById(data, q.serviceId)?.duration || 25),
    0,
  );
  const now = Date.now();
  const arrivalsBehind =
    entry.status === "Waiting" && new Date(entry.arrival).getTime() > now;
  if (arrivalsBehind) return null;
  const appts = data.appointments
    .filter(
      (a) =>
        a.employeeId === emp.id &&
        a.date === todayKolkata() &&
        ["Confirmed", "Checked in"].includes(a.status),
    )
    .map((a) => ({
      ...a,
      when: new Date(`${a.date}T${a.start}:00+05:30`).getTime(),
    }))
    .filter((a) => a.when >= now)
    .sort((a, b) => a.when - b.when);
  for (const appt of appts)
    if (appt.when <= now + estimate * 60000)
      estimate += serviceById(data, appt.serviceId)?.duration || 25;
  return estimate;
}
function queueSummary(data) {
  const waiting = data.queue.filter((q) => q.status === "Waiting"),
    serving = data.queue.filter((q) => q.status === "In service");
  const est = waiting.map((q) => queueWait(data, q)).filter((x) => x !== null);
  return {
    waiting: waiting.length,
    serving: serving.length,
    wait: est.length ? Math.min(...est) : null,
  };
}

function App() {
  const [data, update, reset] = useSalonData();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const customerPaths = [
    ["Home", "/"],
    ["Services", "/services"],
    ["Our Team", "/team"],
    ["Book Appointment", "/book"],
    ["Live Queue", "/queue"],
    ["My Bookings", "/my-bookings"],
  ];
  const onAdmin = location.pathname.startsWith("/admin");
  const queue = queueSummary(data);
  return (
    <div className="app-shell">
      <div className="announcement">
        <span>
          <Sparkles size={13} /> Thoughtful grooming, made easier
        </span>
        <span className="demo-banner">
          Demo experience · data stays in this browser
        </span>
      </div>
      <header className="site-header">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <Scissors size={21} />
          </span>
          <span>
            <b>SmartSalon</b>
            <small>YOUR VISIT, WITHOUT THE WAIT</small>
          </span>
        </Link>
        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen((x) => !x)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
        <nav className={mobileOpen ? "main-nav open" : "main-nav"}>
          {customerPaths.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {label}
            </NavLink>
          ))}
          <Link className="nav-staff" to="/admin">
            <LogIn size={15} /> Staff
          </Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home data={data} q={queue} />} />
        <Route path="/services" element={<ServicesPage data={data} />} />
        <Route path="/team" element={<TeamPage data={data} />} />
        <Route
          path="/book"
          element={<BookingPage data={data} update={update} />}
        />
        <Route path="/queue" element={<PublicQueue data={data} q={queue} />} />
        <Route
          path="/my-bookings"
          element={<BookingsPage data={data} update={update} />}
        />
        <Route
          path="/profile"
          element={<ProfilePage data={data} update={update} />}
        />
        <Route
          path="/admin/*"
          element={<Admin data={data} update={update} reset={reset} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer data={data} />
    </div>
  );
}

function HoursStatus({ data, compact = false }) {
  const special = data.settings.specialHours.find(
    (schedule) => schedule.date === todayKolkata(),
  );
  const open = special?.open || data.settings.open;
  const close = special?.close || data.settings.close;
  const closedHoliday = data.settings.holidays.includes(todayKolkata());
  const isOpen = isSalonOpen(data);
  return (
    <div className={`hours-status ${isOpen ? "is-open" : "is-closed"}`}>
      <span className="status-dot" />
      <div>
        <b>
          {!data.settings.configured
            ? "Hours not yet configured"
            : closedHoliday
              ? "Closed for a scheduled holiday"
              : isOpen
                ? `Open · closes ${timeLabel(close)}`
                : `Closed · opens ${timeLabel(open)}`}
        </b>
        {!compact && (
          <small>
            {data.settings.configured
              ? `${timeLabel(open)} – ${timeLabel(close)} · India Standard Time`
              : "Add salon hours in settings to enable appointment slots."}
          </small>
        )}
      </div>
    </div>
  );
}
function HeroCard({ data, q }) {
  const next = nextAvailableSlot(data, todayKolkata());
  return (
    <div className="hero-status card">
      <div className="status-card-top">
        <span className="eyebrow">RIGHT NOW</span>
        <span className="live-indicator">
          <i /> LIVE STATUS
        </span>
      </div>
      <HoursStatus data={data} />
      <div className="status-stats">
        <div>
          <UsersRound />
          <b>{q.waiting}</b>
          <small>waiting</small>
        </div>
        <div>
          <Clock3 />
          <b>{q.wait === null ? "—" : `${q.wait} min`}</b>
          <small>estimated wait</small>
        </div>
      </div>
      <div className="next-slot">
        <div>
          <small>Next available today</small>
          <b>
            {next
              ? `${timeLabel(next.time)} · ${next.employee.name}`
              : "No slots available"}
          </b>
        </div>
        <CalendarCheck size={19} />
      </div>
      <Link to="/queue" className="text-link">
        See live queue <ArrowRight size={15} />
      </Link>
    </div>
  );
}
function Home({ data, q }) {
  const featured = data.services.filter((s) => s.active).slice(0, 3);
  return (
    <main>
      <section className="hero">
        <div
          className="hero-photo"
          role="img"
          aria-label="Illustrative photo of a warm, modern salon interior"
        />
        <div className="hero-content">
          <span className="eyebrow">A MORE CONSIDERED SALON VISIT</span>
          <h1>
            Great Grooming.
            <br />
            <em>Less Waiting.</em>
          </h1>
          <p>
            Explore our services, choose your preferred professional, and plan
            your visit with greater confidence.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-dark" to="/book">
              Book an appointment <ArrowRight size={16} />
            </Link>
            <Link className="btn btn-outline" to="/queue">
              Check live queue <Clock3 size={16} />
            </Link>
          </div>
          <div className="hero-note">
            <BadgeCheck size={16} /> Clear availability. Personal preferences. A
            little more peace of mind.
          </div>
        </div>
        <HeroCard data={data} q={q} />
        <div className="hero-caption">
          A welcoming space for everyday grooming
        </div>
      </section>
      <div className="trust-strip">
        <span>
          <Scissors /> Thoughtfully chosen services
        </span>
        <span>
          <Clock3 /> Queue visibility before you arrive
        </span>
        <span>
          <Heart /> Preferences you control
        </span>
      </div>
      <section className="section container">
        <SectionTitle
          kicker="THE MENU"
          title="A little time, well spent"
          text="Straightforward grooming services with estimated time and pricing, all in one place."
          link="Explore all services"
          to="/services"
        />
        <div className="service-grid">
          {featured.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
        <p className="sample-note">
          Sample prices and durations shown for this demo. The salon owner can
          edit them.
        </p>
      </section>
      <section className="team-preview">
        <div className="container team-preview-inner">
          <div>
            <span className="eyebrow">MEET YOUR PROFESSIONALS</span>
            <h2>
              Good hands.
              <br />
              <em>Good company.</em>
            </h2>
            <p>
              Choose the professional who offers your service, or let us find an
              available fit.
            </p>
            <Link to="/team" className="btn btn-light">
              Meet the team <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mini-team">
            {data.employees.map((e) => (
              <EmployeeCard key={e.id} employee={e} data={data} compact />
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionTitle
          kicker="HOW IT WORKS"
          title="Your visit, in three easy steps"
        />
        <div className="steps-grid">
          {[
            [
              "01",
              "Choose a service",
              "See what is offered, how long it may take, and the sample price.",
            ],
            [
              "02",
              "Pick your professional",
              "Check who is qualified and choose a date and available time.",
            ],
            [
              "03",
              "Arrive with a plan",
              "Review your booking and check the queue before you head over.",
            ],
          ].map((x) => (
            <div className="step-card" key={x[0]}>
              <span>{x[0]}</span>
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="research-note container">
        <CircleHelp />
        <p>
          <b>Built from early conversations.</b> The prototype responds to
          issues described in three interviews: uncertain waits, crowding, and
          preferences that can change. These conversations are a small
          qualitative input, not a representative survey.
        </p>
      </section>
    </main>
  );
}
function SectionTitle({ kicker, title, text, link, to }) {
  return (
    <div className="section-title">
      <div>
        <span className="eyebrow">{kicker}</span>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {link && (
        <Link className="text-link" to={to}>
          {link} <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}
const categoryIcons = {
  Haircuts: Scissors,
  "Beard & grooming": UserRound,
  Threading: Sparkles,
  Waxing: WandSparkles,
  "Hair styling": Sparkles,
  "Other grooming": Heart,
};
function ServiceCard({ service, index = 0, admin = false, onEdit }) {
  const Icon = categoryIcons[service.category] || Scissors;
  return (
    <article className="service-card">
      <div className={`service-visual visual-${index % 3}`}>
        <span className="service-icon">
          <Icon size={21} />
        </span>
        <span>{service.category}</span>
      </div>
      <div className="service-copy">
        <div className="service-heading">
          <h3>{service.name}</h3>
          <b>{fmtMoney(service.price)}</b>
        </div>
        <p>{service.description}</p>
        <div className="service-meta">
          <span>
            <Timer size={14} />
            {service.duration} min
          </span>
          <span>
            <UsersRound size={14} />
            {service.employeeIds.length} professional
            {service.employeeIds.length === 1 ? "" : "s"}
          </span>
        </div>
        <div className="service-footer">
          {admin ? (
            <button className="btn btn-small btn-outline" onClick={onEdit}>
              <Pencil size={14} /> Edit service
            </button>
          ) : (
            <Link className="text-link" to={`/book?service=${service.id}`}>
              Book service <ArrowRight size={14} />
            </Link>
          )}
          <span className="illustrative">{admin ? "" : "ILLUSTRATIVE"}</span>
        </div>
      </div>
    </article>
  );
}
function ServicesPage({ data }) {
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState("All services");
  const categories = [
    "All services",
    ...new Set(data.services.map((s) => s.category)),
  ];
  const shown = data.services.filter(
    (s) =>
      s.active &&
      (category === "All services" || s.category === category) &&
      `${s.name} ${s.description} ${s.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <main className="page container">
      <PageHeading
        kicker="OUR SERVICES"
        title="A good grooming day starts here"
        text="Explore the menu and choose a service that feels right. Prices and durations are illustrative demo values."
      />
      <div className="catalog-tools">
        <label className="search-field">
          <Search size={17} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services"
          />
        </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="service-grid">
        {shown.map((s, i) => (
          <ServiceCard key={s.id} service={s} index={i} />
        ))}
      </div>
      {!shown.length && (
        <EmptyState
          title="No matching services"
          text="Try a different category or search term."
        />
      )}
      <p className="sample-note">
        All catalogue prices and service times are starter examples that can be
        changed by salon staff.
      </p>
    </main>
  );
}
function PageHeading({ kicker, title, text, action }) {
  return (
    <div className="page-heading">
      <div>
        <span className="eyebrow">{kicker}</span>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
      {action}
    </div>
  );
}
function EmployeeAvatar({ employee, size = "large" }) {
  return (
    <div
      className={`employee-avatar ${employee.gender === "female" ? "avatar-female" : "avatar-male"} ${size}`}
      aria-label={`${employee.name} illustrated profile icon`}
    >
      <div className="avatar-hair" />
      <div className="avatar-face">
        <span className="avatar-eye left" />
        <span className="avatar-eye right" />
        <span className="avatar-mouth" />
      </div>
      <div className="avatar-body" />
    </div>
  );
}
function EmployeeCard({
  employee,
  data,
  compact = false,
  admin = false,
  update,
}) {
  const services = data.services.filter(
    (s) => employee.serviceIds.includes(s.id) && s.active,
  );
  const count = data.appointments.filter(
    (a) =>
      a.employeeId === employee.id &&
      a.date >= todayKolkata() &&
      isBlocking(a.status),
  ).length;
  const available =
    employee.available &&
    services.some((s) =>
      availableEmployees(data, s, dateIn(0)).includes(employee),
    );
  return (
    <article className={`employee-card ${compact ? "employee-compact" : ""}`}>
      <div className="employee-top">
        <EmployeeAvatar employee={employee} />
        <div>
          <span
            className={`availability ${employee.available ? "available" : "unavailable"}`}
          >
            <i />
            {employee.available
              ? "Available for bookings"
              : "Currently unavailable"}
          </span>
          <h3>{employee.name}</h3>
          <p>{employee.specialties.join(" · ")}</p>
        </div>
      </div>
      <div className="employee-services">
        <span className="eyebrow">SERVICES</span>
        <div className="tag-row">
          {services.length ? (
            services.map((s) => (
              <span className="tag" key={s.id}>
                {s.name}
              </span>
            ))
          ) : (
            <span className="muted">No services assigned</span>
          )}
        </div>
      </div>
      <div className="employee-bottom">
        <span>
          <CalendarDays size={15} />
          {admin
            ? `${count} upcoming booking${count === 1 ? "" : "s"}`
            : available
              ? "Slots available today"
              : "Check another day"}
        </span>
        {admin ? (
          <button
            className="btn btn-small btn-outline"
            onClick={() =>
              update((d) => ({
                ...d,
                employees: d.employees.map((e) =>
                  e.id === employee.id ? { ...e, available: !e.available } : e,
                ),
              }))
            }
          >
            {employee.available ? "Set unavailable" : "Set available"}
          </button>
        ) : (
          <Link
            to={`/book?employee=${employee.id}`}
            className="btn btn-small btn-dark"
          >
            Book with {employee.name} <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </article>
  );
}
function TeamPage({ data }) {
  return (
    <main className="page container">
      <PageHeading
        kicker="OUR TEAM"
        title="Meet the people behind the chair"
        text="Each professional has a clear service list, so you can find a good fit for your visit."
      />
      <div className="team-grid">
        {data.employees.map((e) => (
          <EmployeeCard key={e.id} employee={e} data={data} />
        ))}
      </div>
      <div className="staff-availability-note">
        <Clock3 />
        <span>
          <b>Availability updates with the schedule.</b> Bookable slots reflect
          working hours, breaks, existing appointments, and blocked time.
        </span>
      </div>
    </main>
  );
}

function BookingPage({ data, update }) {
  const params = new URLSearchParams(useLocation().search),
    nav = useNavigate();
  const [step, setStep] = useState(1),
    [success, setSuccess] = useState(null),
    [error, setError] = useState("");
  const [form, setForm] = useState({
    serviceId: params.get("service") || "",
    employeeId: params.get("employee") || "",
    date: dateIn(1),
    time: "",
    name: "",
    phone: "",
    email: "",
    preferences: "",
    notes: "",
    consent: false,
  });
  const service = serviceById(data, form.serviceId),
    qualified = service
      ? data.employees.filter(
          (e) =>
            service.employeeIds.includes(e.id) &&
            e.serviceIds.includes(service.id),
        )
      : [],
    available = service ? availableEmployees(data, service, form.date) : [];
  const emp = employeeById(data, form.employeeId),
    selectedEmp = form.employeeId ? emp : null;
  const options = selectedEmp
    ? available.filter((e) => e.id === selectedEmp.id)
    : available;
  const chosenSlots = selectedEmp
    ? slotsFor(data, selectedEmp, service, form.date)
    : options
        .flatMap((e) =>
          slotsFor(data, e, service, form.date).map((t) => ({ t, e })),
        )
        .reduce((a, x) => {
          if (!a.some((y) => y.t === x.t)) a.push(x);
          return a;
        }, [])
        .sort((a, b) => a.t.localeCompare(b.t));
  const updateForm = (key, value) =>
    setForm((f) => ({
      ...f,
      [key]: value,
      time:
        key === "date" || key === "employeeId" || key === "serviceId"
          ? ""
          : f.time,
    }));
  const next = () => {
    setError("");
    if (step === 1 && !service)
      return setError("Choose a service to continue.");
    if (step === 2 && (!form.date || !form.time))
      return setError("Choose a date and available time.");
    if (step === 2 && !form.employeeId) {
      const match = options.flatMap((e) =>
        slotsFor(data, e, service, form.date).includes(form.time) ? [e] : [],
      )[0];
      if (!match)
        return setError(
          "That time is no longer available. Choose another slot.",
        );
      updateForm("employeeId", match.id);
    }
    if (step === 3) {
      if (!form.name.trim()) return setError("Enter your name.");
      if (!/^[6-9]\d{9}$/.test(form.phone.trim()))
        return setError("Enter a valid 10-digit Indian mobile number.");
      if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
        return setError("Enter a valid email address or leave it blank.");
    }
    setStep((s) => Math.min(4, s + 1));
  };
  const confirm = () => {
    const s = serviceById(data, form.serviceId),
      e = employeeById(data, form.employeeId);
    if (!s || !e || !slotsFor(data, e, s, form.date).includes(form.time)) {
      setError("This slot was just taken. Please choose another.");
      setStep(2);
      return;
    }
    let nextData;
    let customer;
    const phone = form.phone.trim();
    const old = data.customers.find((c) => c.phone === phone);
    if (old) {
      customer = {
        ...old,
        name: form.name.trim(),
        email: form.email.trim() || old.email || "",
        preferences: form.preferences.trim() || old.preferences || "",
        preferredEmployeeId: e.id,
        consent: form.consent,
      };
      nextData = {
        ...data,
        customers: data.customers.map((c) => (c.id === old.id ? customer : c)),
      };
    } else {
      customer = {
        id: `c-${id()}`,
        name: form.name.trim(),
        phone,
        email: form.email.trim(),
        preferences: form.preferences.trim(),
        preferredEmployeeId: e.id,
        consent: form.consent,
        notes: "",
      };
      nextData = { ...data, customers: [...data.customers, customer] };
    }
    const booking = {
      id: `a-${id()}`,
      reference: `SS-${id()}`,
      customerId: customer.id,
      customerName: customer.name,
      phone,
      serviceId: s.id,
      employeeId: e.id,
      date: form.date,
      start: form.time,
      end: addMins(form.time, s.duration),
      status: "Confirmed",
      price: s.price,
      notes: form.notes.trim(),
      sample: false,
    };
    nextData.appointments = [...nextData.appointments, booking];
    update(nextData);
    setSuccess(booking);
  };
  if (success) {
    const s = serviceById(data, success.serviceId) || service;
    const e = employeeById(data, success.employeeId);
    return (
      <main className="page container">
        <div className="confirmation-card">
          <div className="confirm-check">
            <Check size={26} />
          </div>
          <span className="eyebrow">BOOKING CONFIRMED ON SCREEN</span>
          <h1>Your visit is on the calendar.</h1>
          <p>
            Your appointment is saved in this browser. No message has been sent.
          </p>
          <div className="booking-reference">
            REFERENCE <b>{success.reference}</b>
          </div>
          <div className="confirmation-details">
            <div>
              <small>SERVICE</small>
              <b>{s?.name}</b>
            </div>
            <div>
              <small>WITH</small>
              <b>{e?.name}</b>
            </div>
            <div>
              <small>DATE & TIME</small>
              <b>
                {fmtDate(success.date, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
                , {timeLabel(success.start)}
              </b>
            </div>
            <div>
              <small>EST. DURATION · PRICE</small>
              <b>
                {s?.duration} min · {fmtMoney(success.price)}
              </b>
            </div>
          </div>
          <div className="form-actions">
            <Link className="btn btn-dark" to="/my-bookings">
              View my bookings <ArrowRight size={15} />
            </Link>
            <Link className="btn btn-outline" to="/">
              Back to home
            </Link>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="page container booking-page">
      <PageHeading
        kicker="BOOK AN APPOINTMENT"
        title="Make time for yourself"
        text="Choose your service, preferred professional, and an available time. Your booking is confirmed right away."
      />
      <div className="booking-layout">
        <div className="booking-main card">
          <div className="progress-steps">
            {["Service", "Time", "Your details", "Review"].map((label, i) => (
              <button
                key={label}
                className={`${step === i + 1 ? "current" : ""} ${step > i + 1 ? "done" : ""}`}
                onClick={() => step > i + 1 && setStep(i + 1)}
              >
                <span>{step > i + 1 ? <Check size={13} /> : i + 1}</span>
                {label}
              </button>
            ))}
          </div>
          {step === 1 && (
            <div className="booking-step">
              <StepTitle
                n="01"
                title="What would you like today?"
                text="Select one service from the menu."
              />
              <div className="choice-list">
                {data.services
                  .filter((s) => s.active)
                  .map((s) => (
                    <button
                      key={s.id}
                      className={`choice-row ${form.serviceId === s.id ? "selected" : ""}`}
                      onClick={() => {
                        updateForm("serviceId", s.id);
                        setError("");
                      }}
                    >
                      <span className="radio-dot" />
                      <span className="choice-details">
                        <b>{s.name}</b>
                        <small>
                          {s.category} · {s.duration} min
                        </small>
                      </span>
                      <b>{fmtMoney(s.price)}</b>
                    </button>
                  ))}
              </div>
              <p className="sample-note">
                Prices and durations are illustrative demo values.
              </p>
            </div>
          )}
          {step === 2 && (
            <div className="booking-step">
              <StepTitle
                n="02"
                title="Choose a date & time"
                text="Only slots that fit the selected service and schedule are shown."
              />
              <label className="field-label">
                Appointment date
                <input
                  type="date"
                  min={todayKolkata()}
                  value={form.date}
                  onChange={(e) => updateForm("date", e.target.value)}
                />
              </label>
              <label className="field-label">
                Professional
                <select
                  value={form.employeeId}
                  onChange={(e) => updateForm("employeeId", e.target.value)}
                >
                  <option value="">Any available professional</option>
                  {qualified.map((e) => (
                    <option
                      key={e.id}
                      value={e.id}
                      disabled={!available.some((a) => a.id === e.id)}
                    >
                      {e.name}
                      {!e.available ? " · unavailable" : ""}
                    </option>
                  ))}
                </select>
              </label>
              {!data.settings.configured && (
                <div className="inline-warning">
                  <CircleAlert /> Salon hours are not configured yet. Please
                  check back later.
                </div>
              )}
              <div className="slot-heading">
                <b>Available times</b>
                <span>
                  {form.date
                    ? fmtDate(form.date, {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })
                    : "Choose a date"}
                </span>
              </div>
              {chosenSlots.length ? (
                <div className="slot-grid">
                  {chosenSlots.map((v, i) => {
                    const t = typeof v === "string" ? v : v.t;
                    const who = typeof v === "string" ? selectedEmp : v.e;
                    return (
                      <button
                        key={t}
                        className={`slot-button ${form.time === t ? "picked" : ""}`}
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            time: t,
                            employeeId: who?.id || f.employeeId,
                          }))
                        }
                      >
                        {timeLabel(t)}
                        {!selectedEmp && who && <small>{who.name}</small>}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <EmptyState
                  title="No available times"
                  text="Try a different date or professional."
                  small
                />
              )}
            </div>
          )}
          {step === 3 && (
            <div className="booking-step">
              <StepTitle
                n="03"
                title="A few details"
                text="We need a name and mobile number to keep track of this appointment."
              />
              <div className="form-grid">
                <label className="field-label">
                  Your name *
                  <input
                    value={form.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                    placeholder="Name"
                    maxLength={80}
                  />
                </label>
                <label className="field-label">
                  Mobile number *
                  <input
                    value={form.phone}
                    onChange={(e) =>
                      updateForm(
                        "phone",
                        e.target.value.replace(/\D/g, "").slice(0, 10),
                      )
                    }
                    inputMode="numeric"
                    placeholder="10-digit number"
                  />
                </label>
                <label className="field-label">
                  Email (optional)
                  <input
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    type="email"
                    placeholder="you@example.com"
                  />
                </label>
                <label className="field-label">
                  Saved preference (optional)
                  <textarea
                    value={form.preferences}
                    onChange={(e) => updateForm("preferences", e.target.value)}
                    placeholder="Add or update what you'd like us to remember"
                    maxLength={280}
                  />
                </label>
                <label className="field-label full">
                  Note for the professional (optional)
                  <textarea
                    value={form.notes}
                    onChange={(e) => updateForm("notes", e.target.value)}
                    placeholder="Anything you'd like them to know this time"
                    maxLength={280}
                  />
                </label>
              </div>
              {data.customers.find((c) => c.phone === form.phone)
                ?.preferences && (
                <div className="saved-preference">
                  <span>
                    <Heart size={14} /> Saved preference:{" "}
                    {
                      data.customers.find((c) => c.phone === form.phone)
                        .preferences
                    }{" "}
                    Review it for this visit.
                  </span>
                  <button
                    type="button"
                    className="text-link"
                    onClick={() =>
                      updateForm(
                        "preferences",
                        data.customers.find((c) => c.phone === form.phone)
                          .preferences,
                      )
                    }
                  >
                    Use preference
                  </button>
                </div>
              )}
              <label className="check-label">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => updateForm("consent", e.target.checked)}
                />{" "}
                I agree to receive optional salon reminders and offers in this
                demo (no messages are sent).
              </label>
            </div>
          )}
          {step === 4 && (
            <div className="booking-step">
              <StepTitle
                n="04"
                title="Review your visit"
                text="Check your choices. We will save your appointment once you confirm."
              />
              <div className="review-card">
                <div className="review-top">
                  <span>
                    <Scissors />
                    SERVICE
                  </span>
                  <b>{service?.name}</b>
                </div>
                <div className="review-top">
                  <span>
                    <UserRound />
                    PROFESSIONAL
                  </span>
                  <b>{employeeById(data, form.employeeId)?.name}</b>
                </div>
                <div className="review-top">
                  <span>
                    <CalendarDays />
                    DATE & TIME
                  </span>
                  <b>
                    {fmtDate(form.date, {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}{" "}
                    · {timeLabel(form.time)}
                  </b>
                </div>
                <div className="review-top">
                  <span>
                    <Timer />
                    DURATION
                  </span>
                  <b>{service?.duration} min</b>
                </div>
                <div className="review-total">
                  <span>Illustrative service price</span>
                  <b>{fmtMoney(service?.price)}</b>
                </div>
                <div className="review-customer">
                  <b>{form.name}</b>
                  <span>
                    {form.phone}
                    {form.email && ` · ${form.email}`}
                  </span>
                  {form.preferences && (
                    <small>Saved preference: {form.preferences}</small>
                  )}
                </div>
              </div>
            </div>
          )}
          {error && (
            <div role="alert" className="form-error">
              <CircleAlert size={16} />
              {error}
            </div>
          )}
          <div className="wizard-actions">
            {step > 1 ? (
              <button
                className="btn btn-outline"
                onClick={() => {
                  setError("");
                  setStep((s) => s - 1);
                }}
              >
                Back
              </button>
            ) : (
              <span />
            )}
            {step < 4 ? (
              <button className="btn btn-dark" onClick={next}>
                Continue <ArrowRight size={15} />
              </button>
            ) : (
              <button className="btn btn-dark" onClick={confirm}>
                Confirm appointment <Check size={15} />
              </button>
            )}
          </div>
        </div>
        <aside className="booking-aside">
          <div className="card booking-summary">
            <span className="eyebrow">YOUR VISIT</span>
            <h3>{service?.name || "Choose a service"}</h3>
            <div className="summary-item">
              <Clock3 />
              {service ? `${service.duration} minutes` : "Service duration"}
            </div>
            <div className="summary-item">
              <IndianRupee />
              {service ? fmtMoney(service.price) : "Illustrative price"}
            </div>
            <div className="summary-item">
              <CalendarDays />
              {form.date
                ? fmtDate(form.date, {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })
                : "Date to be selected"}
              {form.time && ` · ${timeLabel(form.time)}`}
            </div>
            <div className="aside-divider" />
            <p>
              Preferences are optional and can be reviewed or changed at each
              visit.
            </p>
          </div>
          <div className="privacy-note">
            <CircleHelp />
            <span>
              This is a browser-only demo. Booking data stays on this device and
              is not shared with the salon or other devices.
            </span>
          </div>
        </aside>
      </div>
    </main>
  );
}
function StepTitle({ n, title, text }) {
  return (
    <div className="step-title">
      <span>{n}</span>
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
}
function PublicQueue({ data, q }) {
  const byEmployee = data.employees.map((e) => ({
    employee: e,
    waiting: data.queue.filter(
      (x) => x.employeeId === e.id && x.status === "Waiting",
    ),
    serving: data.queue.find(
      (x) => x.employeeId === e.id && x.status === "In service",
    ),
  }));
  const last = new Date(data.lastUpdated).toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
  });
  const nextAppointment = data.appointments
    .filter(
      (a) =>
        a.date === todayKolkata() &&
        a.status === "Confirmed" &&
        !dateIsPast(a.date, a.start),
    )
    .sort((a, b) => a.start.localeCompare(b.start))[0];
  const nextSlot = nextAvailableSlot(data, todayKolkata());
  const nextServiceTime =
    q.wait === null
      ? null
      : q.wait === 0
        ? "Now"
        : new Date(Date.now() + q.wait * 60000).toLocaleTimeString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour: "numeric",
            minute: "2-digit",
          });
  return (
    <main className="page container">
      <PageHeading
        kicker="LIVE QUEUE"
        title="Know before you go"
        text="Waiting times are estimates. Service lengths and unexpected delays can change the picture."
        action={
          <span className="live-indicator live-large">
            <i /> UPDATED {last}
          </span>
        }
      />
      <div className="queue-overview">
        <div className="queue-big card">
          <span className="eyebrow">RIGHT NOW</span>
          <div className="queue-number">
            {q.waiting}
            <small>waiting</small>
          </div>
          <p>
            {q.wait === null
              ? "No reliable estimate available"
              : q.wait === 0
                ? "A professional may be able to serve the next customer now."
                : `Approximately ${q.wait} minutes to the next available service`}
          </p>
          <HoursStatus data={data} />
        </div>
        <div className="queue-info-grid">
          <div className="queue-info card">
            <span className="icon-soft">
              <UsersRound />
            </span>
            <b>{q.serving}</b>
            <small>currently being served</small>
          </div>
          <div className="queue-info card">
            <span className="icon-soft">
              <CalendarCheck />
            </span>
            <b>{nextAppointment ? timeLabel(nextAppointment.start) : "—"}</b>
            <small>next appointment today</small>
          </div>
          <div className="queue-info card">
            <span className="icon-soft">
              <Clock3 />
            </span>
            <b>{nextServiceTime || "—"}</b>
            <small>next customer may be served</small>
          </div>
          <div className="queue-info card">
            <span className="icon-soft">
              <CalendarClock />
            </span>
            <b>
              {nextSlot
                ? `${timeLabel(nextSlot.time)} · ${nextSlot.employee.name}`
                : "No slot"}
            </b>
            <small>next bookable slot today</small>
          </div>
          <div className="queue-info card">
            <span className="icon-soft">
              <UserCheck />
            </span>
            <b>{data.employees.filter((e) => e.available).length}</b>
            <small>professionals available</small>
          </div>
          <div className="queue-info card">
            <span className="icon-soft">
              <WalkinsIcon />
            </span>
            <b>{data.settings.walkins && isSalonOpen(data) ? "Yes" : "No"}</b>
            <small>accepting walk-ins</small>
          </div>
        </div>
      </div>
      <div className="queue-columns">
        {byEmployee.map(({ employee, waiting, serving }) => (
          <section className="queue-employee card" key={employee.id}>
            <div className="queue-employee-head">
              <EmployeeAvatar employee={employee} size="small" />
              <div>
                <h3>{employee.name}</h3>
                <span
                  className={`availability ${employee.available ? "available" : "unavailable"}`}
                >
                  <i />
                  {employee.available ? "Available" : "Unavailable"}
                </span>
              </div>
              <span className="queue-count">{waiting.length} waiting</span>
            </div>
            {serving && (
              <div className="serving-banner">
                <span>
                  <CircleDot /> In service
                </span>
                <b>{serviceById(data, serving.serviceId)?.name || "Service"}</b>
              </div>
            )}
            {waiting.length ? (
              <div className="public-queue-list">
                {waiting.map((x, i) => (
                  <div className="public-queue-row" key={x.id}>
                    <b>{x.number}</b>
                    <span>
                      {serviceById(data, x.serviceId)?.name || "Grooming"}
                    </span>
                    <small>
                      {queueWait(data, x) === null
                        ? "Estimate unavailable"
                        : `~${queueWait(data, x)} min`}
                    </small>
                  </div>
                ))}
              </div>
            ) : (
              !serving && (
                <div className="queue-empty">
                  No customers waiting.{" "}
                  {employee.available
                    ? "This professional may be available for a walk-in."
                    : "Check back for availability."}
                </div>
              )
            )}
          </section>
        ))}
      </div>
      {nextAppointment && (
        <div className="appointment-priority">
          <CalendarClock />
          <div>
            <b>Appointments are honoured at their scheduled times.</b>
            <span>
              Next booking: {timeLabel(nextAppointment.start)} ·{" "}
              {serviceById(data, nextAppointment.serviceId)?.name} with{" "}
              {employeeById(data, nextAppointment.employeeId)?.name}.
            </span>
          </div>
        </div>
      )}
      <p className="sample-note">
        Queue numbers and names marked as sample represent demo records.
        Customer names and contact details are never shown here.
      </p>
    </main>
  );
}
function WalkinsIcon() {
  return <UsersRound />;
}
function BookingsPage({ data, update }) {
  const [phone, setPhone] = useState(""),
    [searched, setSearched] = useState(false),
    [message, setMessage] = useState("");
  const customer = data.customers.find((c) => c.phone === phone.trim());
  const appointments = data.appointments
    .filter((a) => a.phone === phone.trim())
    .sort((a, b) => (b.date + b.start).localeCompare(a.date + a.start));
  const cancel = (id) => {
    if (!window.confirm("Cancel this appointment?")) return;
    update((d) => ({
      ...d,
      appointments: d.appointments.map((a) =>
        a.id === id ? { ...a, status: "Cancelled" } : a,
      ),
    }));
    setMessage("Appointment cancelled.");
  };
  return (
    <main className="page container">
      <PageHeading
        kicker="MY BOOKINGS"
        title="Your plans, all in one place"
        text="Look up your appointments with the mobile number used when booking."
      />
      <form
        className="lookup-form card"
        onSubmit={(e) => {
          e.preventDefault();
          setSearched(true);
          setMessage("");
        }}
      >
        <label className="field-label">
          Mobile number
          <input
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            placeholder="10-digit mobile number"
            inputMode="numeric"
            required
          />
        </label>
        <button className="btn btn-dark">
          Find my bookings <Search size={15} />
        </button>
      </form>
      {message && (
        <div className="success-banner">
          <CheckCircle2 />
          {message}
        </div>
      )}
      {searched &&
        (!/^[6-9]\d{9}$/.test(phone) ? (
          <div className="form-error">
            <CircleAlert />
            Enter a valid 10-digit Indian mobile number.
          </div>
        ) : (
          <>
            <div className="lookup-welcome">
              <CircleUserRound />
              <div>
                <span className="eyebrow">
                  {customer ? "WELCOME BACK" : "BOOKINGS FOR"}
                </span>
                <h2>{customer?.name || "Your appointments"}</h2>
                {customer?.preferences && (
                  <p>Saved preference: {customer.preferences}</p>
                )}
              </div>
              <Link to={`/profile?phone=${phone}`} className="text-link">
                Edit preferences <ArrowRight size={15} />
              </Link>
            </div>
            {appointments.length ? (
              <div className="booking-list">
                {appointments.map((a) => (
                  <AppointmentCard
                    key={a.id}
                    appointment={a}
                    data={data}
                    onCancel={() => cancel(a.id)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No bookings found"
                text="When you book with this number, the appointment will appear here."
                action={
                  <Link className="btn btn-dark" to="/book">
                    Book an appointment
                  </Link>
                }
              />
            )}
          </>
        ))}
    </main>
  );
}
function AppointmentCard({
  appointment: a,
  data,
  onCancel,
  staff = false,
  onStatus,
}) {
  const s = serviceById(data, a.serviceId),
    e = employeeById(data, a.employeeId);
  return (
    <article className="appointment-card">
      <div className="appointment-date">
        <b>
          {a.date === todayKolkata()
            ? "TODAY"
            : fmtDate(a.date, { day: "numeric", month: "short" }).toUpperCase()}
        </b>
        <span>{timeLabel(a.start)}</span>
      </div>
      <div className="appointment-description">
        <h3>{s?.name || "Service"}</h3>
        <p>
          {e?.name || "Professional"} · {s?.duration || "—"} min ·{" "}
          {fmtMoney(a.price)}
        </p>
        <small>Ref. {a.reference}</small>
      </div>
      <StatusPill status={a.status} />
      {staff ? (
        <select value={a.status} onChange={(e) => onStatus(e.target.value)}>
          {[
            "Pending",
            "Confirmed",
            "Checked in",
            "In service",
            "Completed",
            "Cancelled",
            "No-show",
          ].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      ) : (
        ["Pending", "Confirmed"].includes(a.status) && (
          <button
            className="btn btn-small btn-outline danger"
            onClick={onCancel}
          >
            Cancel
          </button>
        )
      )}
    </article>
  );
}
function StatusPill({ status }) {
  return (
    <span
      className={`status-pill ${status.toLowerCase().replaceAll(" ", "-")}`}
    >
      {status}
    </span>
  );
}
function ProfilePage({ data, update }) {
  const params = new URLSearchParams(useLocation().search),
    [phone, setPhone] = useState(params.get("phone") || ""),
    [draft, setCustomer] = useState(null),
    [message, setMessage] = useState("");
  const customer =
    draft || data.customers.find((c) => c.phone === phone) || null;
  const history = customer
    ? data.appointments
        .filter((appointment) => appointment.phone === customer.phone)
        .sort((a, b) => (b.date + b.start).localeCompare(a.date + a.start))
    : [];
  const upcoming = history.find(
    (appointment) =>
      appointment.date >= todayKolkata() &&
      ["Pending", "Confirmed", "Checked in"].includes(appointment.status),
  );
  const lastCompleted = history.find(
    (appointment) => appointment.status === "Completed",
  );
  const returnSuggestion = lastCompleted
    ? shiftDate(lastCompleted.date, Number(data.settings.returnInterval))
    : null;
  const find = () => {
    const c = data.customers.find((x) => x.phone === phone);
    setCustomer(
      c
        ? { ...c }
        : {
            id: `c-${id()}`,
            name: "",
            phone,
            email: "",
            preferences: "",
            preferredEmployeeId: "",
            consent: false,
            notes: "",
          },
    );
  };
  const save = (e) => {
    e.preventDefault();
    if (!customer.name.trim() || !/^[6-9]\d{9}$/.test(customer.phone)) {
      setMessage("Add a name and valid 10-digit mobile number.");
      return;
    }
    const old = data.customers.find((c) => c.phone === customer.phone);
    const record = { ...customer, id: old?.id || customer.id };
    update((d) => ({
      ...d,
      customers: old
        ? d.customers.map((c) => (c.id === old.id ? record : c))
        : [...d.customers, record],
    }));
    setCustomer(record);
    setMessage("Your profile and preferences are saved in this browser.");
  };
  return (
    <main className="page container">
      <PageHeading
        kicker="MY PROFILE"
        title="Preferences, on your terms"
        text="Review and update saved preferences at any time. Nothing is automatically applied to a future booking."
      />
      <div className="profile-lookup card">
        <label className="field-label">
          Find an existing profile
          <input
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
              setCustomer(null);
            }}
            placeholder="Mobile number"
            inputMode="numeric"
          />
        </label>
        <button className="btn btn-outline" onClick={find}>
          Load profile
        </button>
        <button
          className="text-link"
          onClick={() => {
            setCustomer({
              id: `c-${id()}`,
              name: "",
              phone: phone,
              email: "",
              preferences: "",
              preferredEmployeeId: "",
              consent: false,
              notes: "",
            });
            setMessage("");
          }}
        >
          Create a profile
        </button>
      </div>
      {customer && (
        <form className="profile-form card" onSubmit={save}>
          <h2>Your details</h2>
          <div className="form-grid">
            <label className="field-label">
              Name *
              <input
                value={customer.name}
                onChange={(e) =>
                  setCustomer((c) => ({ ...customer, name: e.target.value }))
                }
              />
            </label>
            <label className="field-label">
              Mobile *
              <input
                value={customer.phone}
                onChange={(e) =>
                  setCustomer((c) => ({
                    ...customer,
                    phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                  }))
                }
              />
            </label>
            <label className="field-label">
              Email
              <input
                value={customer.email || ""}
                onChange={(e) =>
                  setCustomer((c) => ({ ...customer, email: e.target.value }))
                }
              />
            </label>
            <label className="field-label">
              Preferred professional
              <select
                value={customer.preferredEmployeeId || ""}
                onChange={(e) =>
                  setCustomer((c) => ({
                    ...customer,
                    preferredEmployeeId: e.target.value,
                  }))
                }
              >
                <option value="">No preference</option>
                {data.employees.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="field-label full">
              Grooming preferences
              <textarea
                value={customer.preferences || ""}
                onChange={(e) =>
                  setCustomer((c) => ({
                    ...customer,
                    preferences: e.target.value,
                  }))
                }
                placeholder="Only save what you choose to share"
                maxLength={280}
              />
            </label>
          </div>
          <label className="check-label">
            <input
              type="checkbox"
              checked={!!customer.consent}
              onChange={(e) =>
                setCustomer((c) => ({ ...customer, consent: e.target.checked }))
              }
            />{" "}
            Opt in to optional reminders and offers (preview only; no messages
            are sent)
          </label>
          {message && <p className="inline-message">{message}</p>}
          <button className="btn btn-dark">
            Save preferences <Check size={15} />
          </button>
        </form>
      )}
      {customer && (
        <section className="profile-history card">
          <div className="panel-head">
            <div>
              <span className="eyebrow">YOUR VISITS</span>
              <h3>Preferences and history</h3>
            </div>
            <span className="visit-count">
              {history.filter((a) => a.status === "Completed").length} completed
              visit
              {history.filter((a) => a.status === "Completed").length === 1
                ? ""
                : "s"}
            </span>
          </div>
          {upcoming && (
            <div className="profile-reminder">
              <Bell size={15} />
              <span>
                On-screen reminder:{" "}
                {serviceById(data, upcoming.serviceId)?.name} on{" "}
                {fmtDate(upcoming.date)} at {timeLabel(upcoming.start)}. No
                message was sent.
              </span>
            </div>
          )}
          {lastCompleted && returnSuggestion && (
            <div className="profile-reminder return-suggestion">
              <CalendarClock size={15} />
              <span>
                Optional return-visit suggestion: around{" "}
                {fmtDate(returnSuggestion)} based on the salon's{" "}
                {data.settings.returnInterval}-day interval. Change or ignore
                this suggestion whenever you like.
              </span>
            </div>
          )}
          {history.length ? (
            history.slice(0, 4).map((appointment) => (
              <div className="profile-visit-row" key={appointment.id}>
                <span>
                  {fmtDate(appointment.date)} · {timeLabel(appointment.start)}
                </span>
                <b>{serviceById(data, appointment.serviceId)?.name}</b>
                <StatusPill status={appointment.status} />
              </div>
            ))
          ) : (
            <p className="muted">No appointment history saved yet.</p>
          )}
        </section>
      )}
      {!customer && (
        <EmptyState
          title="Load or create your profile"
          text="Use the mobile number from your booking to find preferences saved in this browser."
        />
      )}
    </main>
  );
}
function NotFound() {
  return (
    <main className="page container">
      <EmptyState
        title="Page not found"
        text="This page may have moved. Head back to the SmartSalon homepage."
        action={
          <Link className="btn btn-dark" to="/">
            Go home
          </Link>
        }
      />
    </main>
  );
}

const adminLinks = [
  ["Overview", "/admin/overview", ChartNoAxesCombined],
  ["Appointments", "/admin/appointments", CalendarDays],
  ["Queue", "/admin/queue", ListChecks],
  ["Employees", "/admin/employees", UsersRound],
  ["Customers", "/admin/customers", CircleUserRound],
  ["Services", "/admin/services", Scissors],
  ["Analytics", "/admin/analytics", ChartNoAxesCombined],
  ["Settings", "/admin/settings", Settings2],
];
function Admin({ data, update, reset }) {
  const loc = useLocation();
  const navigate = useNavigate();
  const current =
    adminLinks.find((x) => loc.pathname === x[1]) || adminLinks[0];
  return (
    <main className="admin-shell container">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="brand-mark">
            <Scissors size={18} />
          </span>
          <span>
            <b>Salon dashboard</b>
            <small>STAFF WORKSPACE</small>
          </span>
        </div>
        <div className="demo-access">
          <span className="demo-label">
            <i /> DEMO ACCESS
          </span>
          <p>
            This prototype has no secure staff sign-in. Data is stored in this
            browser only.
          </p>
        </div>
        <nav>
          {adminLinks.map(([name, path, Icon]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => (isActive ? "admin-active" : "")}
            >
              <Icon size={17} />
              {name}
            </NavLink>
          ))}
        </nav>
        <Link to="/" className="back-home">
          <ArrowRight size={15} /> Customer website
        </Link>
      </aside>
      <section className="admin-content">
        <div className="admin-topline">
          <div>
            <span className="eyebrow">
              {data.settings.salonName} · DEMO DATA
            </span>
            <h1>{current[0]}</h1>
          </div>
          <Link to="/" className="btn btn-small btn-outline">
            View customer site <ArrowUpRight size={14} />
          </Link>
        </div>
        <Routes>
          <Route index element={<AdminOverview data={data} />} />
          <Route path="overview" element={<AdminOverview data={data} />} />
          <Route
            path="appointments"
            element={<AdminAppointments data={data} update={update} />}
          />
          <Route
            path="queue"
            element={<AdminQueue data={data} update={update} />}
          />
          <Route
            path="employees"
            element={<AdminEmployees data={data} update={update} />}
          />
          <Route
            path="customers"
            element={<AdminCustomers data={data} update={update} />}
          />
          <Route
            path="services"
            element={<AdminServices data={data} update={update} />}
          />
          <Route path="analytics" element={<AdminAnalytics data={data} />} />
          <Route
            path="settings"
            element={
              <AdminSettings data={data} update={update} reset={reset} />
            }
          />
        </Routes>
      </section>
    </main>
  );
}
function AdminOverview({ data }) {
  const today = data.appointments.filter((a) => a.date === todayKolkata());
  const waiting = data.queue.filter((q) => q.status === "Waiting").length,
    serving = data.queue.filter((q) => q.status === "In service").length,
    completed = today.filter((a) => a.status === "Completed").length;
  const revenue = today
    .filter((a) => a.status === "Completed")
    .reduce((n, a) => n + a.price, 0);
  const expected = today
    .filter((a) => ["Confirmed", "Checked in", "In service"].includes(a.status))
    .reduce((n, a) => n + a.price, 0);
  const upcoming = data.appointments
    .filter(
      (a) =>
        a.date >= todayKolkata() &&
        ["Confirmed", "Checked in", "Pending"].includes(a.status),
    )
    .sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start))
    .slice(0, 5);
  const available = data.employees.filter((e) => e.available);
  const nextSlot = data.services
    .filter((s) => s.active)
    .flatMap((s) =>
      availableEmployees(data, s, todayKolkata()).flatMap((e) =>
        slotsFor(data, e, s, todayKolkata()).map((time) => ({
          time,
          employee: e,
        })),
      ),
    )
    .sort((a, b) => a.time.localeCompare(b.time))[0];
  const crowding = waiting >= 5 ? "Busy" : waiting >= 2 ? "Building" : "Light";
  return (
    <>
      <div className="admin-welcome">
        <div>
          <h2>A clear view of the day.</h2>
          <p>
            {fmtDate(todayKolkata(), {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}{" "}
            · All figures include labelled sample data where marked.
          </p>
        </div>
        <Link className="btn btn-dark" to="/admin/appointments">
          Open appointments <ArrowRight size={15} />
        </Link>
      </div>
      <div className="metric-grid">
        <Metric
          label="Today's appointments"
          value={today.length}
          icon={CalendarDays}
          note="Includes sample records"
        />
        <Metric
          label="Walk-ins waiting"
          value={waiting}
          icon={UsersRound}
          note={`${serving} currently in service`}
        />
        <Metric
          label="Completed today"
          value={completed}
          icon={CheckCircle2}
          note="Appointments marked complete"
        />
        <Metric
          label="Completed service value"
          value={fmtMoney(revenue)}
          icon={IndianRupee}
          note="Illustrative · completed only"
        />
      </div>
      <div className="admin-operations">
        <div>
          <span className="eyebrow">CROWDING INDICATOR</span>
          <b>{crowding}</b>
          <small>
            {waiting} walk-ins waiting · simple queue count, not a forecast
          </small>
        </div>
        <div>
          <span className="eyebrow">NEXT AVAILABLE</span>
          <b>
            {nextSlot
              ? `${nextSlot.employee.name} · ${timeLabel(nextSlot.time)}`
              : "No slot available today"}
          </b>
          <small>
            Expected booked service value today: {fmtMoney(expected)} · not
            revenue
          </small>
        </div>
      </div>
      <div className="admin-columns">
        <section className="admin-panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">THE SCHEDULE</span>
              <h3>Upcoming appointments</h3>
            </div>
            <Link to="/admin/appointments" className="text-link">
              See all <ArrowRight size={14} />
            </Link>
          </div>
          {upcoming.length ? (
            <div className="compact-appointments">
              {upcoming.map((a) => (
                <AppointmentCard key={a.id} appointment={a} data={data} staff />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Nothing upcoming"
              text="New appointments will appear here."
              small
            />
          )}
        </section>
        <section className="admin-panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">TEAM STATUS</span>
              <h3>Who's available</h3>
            </div>
            <Link to="/admin/employees" className="text-link">
              Manage <ArrowRight size={14} />
            </Link>
          </div>
          {data.employees.map((e) => (
            <div className="employee-status-row" key={e.id}>
              <EmployeeAvatar employee={e} size="small" />
              <div>
                <b>{e.name}</b>
                <small>{e.specialties.slice(0, 2).join(" · ")}</small>
              </div>
              <span
                className={`availability ${e.available ? "available" : "unavailable"}`}
              >
                <i />
                {e.available ? "Available" : "Away"}
              </span>
            </div>
          ))}
          <div className="availability-callout">
            <Clock3 />
            <span>
              {available.length
                ? `${available.length} professional${available.length === 1 ? "" : "s"} marked available.`
                : "No professionals currently marked available."}{" "}
              Actual slots depend on service and schedule.
            </span>
          </div>
        </section>
      </div>
      <div className="demo-footnote">
        <CircleHelp /> Operational figures and prices are illustrative for the
        prototype. The seeded appointments and customers are labelled sample
        data.
      </div>
    </>
  );
}
function Metric({ label, value, icon: Icon, note }) {
  return (
    <div className="metric-card">
      <span className="metric-icon">
        <Icon size={18} />
      </span>
      <span className="metric-label">{label}</span>
      <b>{value}</b>
      <small>{note}</small>
    </div>
  );
}
function AdminAppointments({ data, update }) {
  const [date, setDate] = useState(todayKolkata()),
    [period, setPeriod] = useState("day"),
    [empFilter, setEmpFilter] = useState("all"),
    [serviceFilter, setServiceFilter] = useState("all"),
    [statusFilter, setStatusFilter] = useState("all"),
    [notice, setNotice] = useState("");
  const [create, setCreate] = useState(false);
  const [form, setForm] = useState({
    serviceId: "",
    employeeId: "",
    date: todayKolkata(),
    time: "",
    name: "",
    phone: "",
  });
  const shown = data.appointments
    .filter((a) =>
      period === "day"
        ? a.date === date
        : a.date >= date && a.date <= shiftDate(date, 6),
    )
    .filter((a) => empFilter === "all" || a.employeeId === empFilter)
    .filter((a) => serviceFilter === "all" || a.serviceId === serviceFilter)
    .filter((a) => statusFilter === "all" || a.status === statusFilter)
    .sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
  const changeStatus = (a, status) => {
    if (status === "Cancelled" && !window.confirm("Cancel this appointment?"))
      return;
    update((d) => ({
      ...d,
      appointments: d.appointments.map((x) =>
        x.id === a.id ? { ...x, status } : x,
      ),
    }));
    setNotice(`Appointment ${status.toLowerCase()}.`);
  };
  const openEdit = (a) => {
    if (
      !window.confirm(
        `Reschedule ${a.reference}? The current slot will be checked before saving.`,
      )
    )
      return;
    const d = window.prompt("New date (YYYY-MM-DD)", a.date);
    if (!d) return;
    const t = window.prompt("New start time (HH:MM, 24-hour)", a.start);
    if (!t) return;
    const s = serviceById(data, a.serviceId),
      e = employeeById(data, a.employeeId);
    const end = addMins(t, s.duration);
    const conflict = data.appointments.some(
      (x) =>
        x.id !== a.id &&
        x.employeeId === a.employeeId &&
        x.date === d &&
        isBlocking(x.status) &&
        overlap(t, end, x.start, x.end),
    );
    const slot = slotsFor(data, e, s, d).includes(t);
    if (conflict || !slot) {
      setNotice(
        "That time is outside working hours or conflicts with another booking.",
      );
      return;
    }
    update((x) => ({
      ...x,
      appointments: x.appointments.map((v) =>
        v.id === a.id ? { ...v, date: d, start: t, end } : v,
      ),
    }));
    setNotice("Appointment rescheduled.");
  };
  const s = serviceById(data, form.serviceId);
  const opts = s
    ? data.employees.filter(
        (e) =>
          s.employeeIds.includes(e.id) &&
          e.serviceIds.includes(s.id) &&
          slotsFor(data, e, s, form.date).length,
      )
    : [];
  const slots = employeeById(data, form.employeeId)
    ? slotsFor(data, employeeById(data, form.employeeId), s, form.date)
    : opts
        .flatMap((e) => slotsFor(data, e, s, form.date).map((t) => ({ t, e })))
        .reduce((a, x) => (a.some((y) => y.t === x.t) ? a : [...a, x]), []);
  const submit = (e) => {
    e.preventDefault();
    const emp =
      employeeById(data, form.employeeId) ||
      opts.find((x) => slotsFor(data, x, s, form.date).includes(form.time));
    if (
      !form.name.trim() ||
      !/^[6-9]\d{9}$/.test(form.phone) ||
      !s ||
      !emp ||
      !slotsFor(data, emp, s, form.date).includes(form.time)
    ) {
      setNotice("Complete all fields and select a valid available slot.");
      return;
    }
    const booking = {
      id: `a-${id()}`,
      reference: `SS-${id()}`,
      customerId: "",
      customerName: form.name,
      phone: form.phone,
      serviceId: s.id,
      employeeId: emp.id,
      date: form.date,
      start: form.time,
      end: addMins(form.time, s.duration),
      status: "Confirmed",
      price: s.price,
      notes: "",
      sample: false,
    };
    update((d) => ({ ...d, appointments: [...d.appointments, booking] }));
    setNotice(`Appointment ${booking.reference} created.`);
    setCreate(false);
    setForm({
      serviceId: "",
      employeeId: "",
      date: todayKolkata(),
      time: "",
      name: "",
      phone: "",
    });
  };
  return (
    <>
      <div className="toolbar">
        <div className="toggle-pills">
          <button
            className={period === "day" ? "selected" : ""}
            onClick={() => setPeriod("day")}
          >
            Day
          </button>
          <button
            className={period === "week" ? "selected" : ""}
            onClick={() => setPeriod("week")}
          >
            Week
          </button>
        </div>
        <label className="filter-field">
          <CalendarDays />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <select
          value={empFilter}
          onChange={(e) => setEmpFilter(e.target.value)}
        >
          <option value="all">All professionals</option>
          {data.employees.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>
        <select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
        >
          <option value="all">All services</option>
          {data.services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All statuses</option>
          {[
            "Pending",
            "Confirmed",
            "Checked in",
            "In service",
            "Completed",
            "Cancelled",
            "No-show",
          ].map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
        <button className="btn btn-dark" onClick={() => setCreate(!create)}>
          <Plus size={15} /> New appointment
        </button>
      </div>
      {notice && (
        <div className="success-banner">
          <CheckCircle2 />
          {notice}
          <button onClick={() => setNotice("")}>
            <X size={14} />
          </button>
        </div>
      )}
      {create && (
        <form className="admin-create-form" onSubmit={submit}>
          <h3>Create an appointment</h3>
          <div className="form-grid">
            <label className="field-label">
              Service
              <select
                required
                value={form.serviceId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    serviceId: e.target.value,
                    employeeId: "",
                    time: "",
                  })
                }
              >
                <option value="">Choose service</option>
                {data.services
                  .filter((x) => x.active)
                  .map((x) => (
                    <option key={x.id} value={x.id}>
                      {x.name} · {fmtMoney(x.price)}
                    </option>
                  ))}
              </select>
            </label>
            <label className="field-label">
              Professional
              <select
                required
                value={form.employeeId}
                onChange={(e) =>
                  setForm({ ...form, employeeId: e.target.value, time: "" })
                }
              >
                <option value="">Choose professional</option>
                {opts.map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="field-label">
              Date
              <input
                required
                type="date"
                min={todayKolkata()}
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value, time: "" })
                }
              />
            </label>
            <label className="field-label">
              Available time
              <select
                required
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              >
                <option value="">Choose time</option>
                {slots.map((x) => (
                  <option
                    key={typeof x === "string" ? x : x.t}
                    value={typeof x === "string" ? x : x.t}
                  >
                    {timeLabel(typeof x === "string" ? x : x.t)}
                    {typeof x === "string" ? "" : ` · ${x.e.name}`}
                  </option>
                ))}
              </select>
            </label>
            <label className="field-label">
              Customer name
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label className="field-label">
              Mobile number
              <input
                required
                inputMode="numeric"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                  })
                }
              />
            </label>
          </div>
          <button className="btn btn-dark">
            Save appointment <Check size={15} />
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setCreate(false)}
          >
            Close
          </button>
        </form>
      )}
      <div className="admin-panel appointments-panel">
        <div className="panel-head">
          <div>
            <span className="eyebrow">
              {period === "day"
                ? fmtDate(date, {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })
                : `Week from ${fmtDate(date)}`}
            </span>
            <h3>
              {shown.length} appointment{shown.length === 1 ? "" : "s"}
            </h3>
          </div>
          <span className="demo-label">DEMO DATA</span>
        </div>
        {shown.length ? (
          <div className="staff-appointment-list">
            {shown.map((a) => (
              <div className="staff-appointment-row" key={a.id}>
                <AppointmentCard
                  appointment={a}
                  data={data}
                  staff
                  onStatus={(status) => changeStatus(a, status)}
                />
                <button
                  title="Reschedule appointment"
                  aria-label="Reschedule"
                  className="icon-button"
                  onClick={() => openEdit(a)}
                >
                  <Pencil size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No appointments for this view"
            text="Try another date or create an appointment."
          />
        )}
      </div>
    </>
  );
}
function AdminQueue({ data, update }) {
  const [form, setForm] = useState({
      customer: "",
      serviceId: "",
      employeeId: "",
    }),
    [notice, setNotice] = useState("");
  const services = data.services.filter((s) => s.active);
  const service = serviceById(data, form.serviceId);
  const candidates = service
    ? data.employees.filter(
        (e) =>
          service.employeeIds.includes(e.id) &&
          e.serviceIds.includes(service.id) &&
          e.available,
      )
    : [];
  const entries = data.queue
    .slice()
    .sort((a, b) => a.arrival.localeCompare(b.arrival));
  const add = (e) => {
    e.preventDefault();
    if (!data.settings.walkins || !isSalonOpen(data)) {
      setNotice(
        !data.settings.walkins
          ? "Walk-ins are disabled in salon settings."
          : "Walk-ins can be added while the salon is open.",
      );
      return;
    }
    const emp = employeeById(data, form.employeeId) || candidates[0];
    if (!form.serviceId || !emp) {
      setNotice("Choose a service and a qualified available professional.");
      return;
    }
    const prefix = emp.id === "emp-tulasi" ? "T" : "S";
    const count = data.queue.filter((q) => q.employeeId === emp.id).length + 1;
    const number = `${prefix}${String(count).padStart(2, "0")}`;
    const entry = {
      id: `q-${id()}`,
      number,
      customer: form.customer.trim() || `Walk-in ${number}`,
      serviceId: form.serviceId,
      employeeId: emp.id,
      arrival: new Date().toISOString(),
      status: "Waiting",
      sample: false,
    };
    update((d) => ({ ...d, queue: [...d.queue, entry] }));
    setNotice(`${number} added to ${emp.name}'s queue.`);
    setForm({ customer: "", serviceId: "", employeeId: "" });
  };
  const move = (entry) => {
    const other = data.employees.filter(
      (e) =>
        e.id !== entry.employeeId &&
        e.serviceIds.includes(entry.serviceId) &&
        e.available,
    );
    if (!other.length) {
      setNotice("No other available professional is assigned to this service.");
      return;
    }
    if (
      !window.confirm(
        `Move ${entry.number} to ${other[0].name}'s queue? This correction changes their place in the employee queue.`,
      )
    )
      return;
    update((d) => ({
      ...d,
      queue: d.queue.map((q) =>
        q.id === entry.id ? { ...q, employeeId: other[0].id } : q,
      ),
    }));
    setNotice(`${entry.number} moved to ${other[0].name}'s queue.`);
  };
  const advance = (q) => {
    const order = ["Waiting", "Called", "In service", "Completed"];
    const next = order[Math.min(order.indexOf(q.status) + 1, 3)];
    if (q.status === "Waiting") {
      const first = data.queue
        .filter((x) => x.employeeId === q.employeeId && x.status === "Waiting")
        .sort((a, b) => a.arrival.localeCompare(b.arrival))[0];
      if (first?.id !== q.id) {
        setNotice(
          "Keep the queue in arrival order. Call the earliest waiting customer first.",
        );
        return;
      }
      if (
        data.queue.some(
          (x) =>
            x.employeeId === q.employeeId &&
            ["Called", "In service"].includes(x.status),
        )
      ) {
        setNotice(
          "Finish or start the customer already called before calling another.",
        );
        return;
      }
    }
    if (
      next === "In service" &&
      data.queue.some(
        (x) => x.employeeId === q.employeeId && x.status === "In service",
      )
    ) {
      setNotice("This professional already has a service in progress.");
      return;
    }
    update((d) => ({
      ...d,
      queue: d.queue.map((x) =>
        x.id === q.id
          ? {
              ...x,
              status: next,
              ...(next === "In service"
                ? { startedAt: new Date().toISOString() }
                : {}),
              ...(next === "Completed"
                ? { completedAt: new Date().toISOString() }
                : {}),
            }
          : x,
      ),
    }));
  };
  const cancel = (q) => {
    if (!window.confirm(`Cancel queue entry ${q.number}?`)) return;
    update((d) => ({
      ...d,
      queue: d.queue.map((x) =>
        x.id === q.id ? { ...x, status: "Cancelled" } : x,
      ),
    }));
  };
  const markAbsent = (q) => {
    update((d) => ({
      ...d,
      queue: d.queue.map((x) =>
        x.id === q.id ? { ...x, status: "Absent" } : x,
      ),
    }));
    setNotice(`${q.number} marked absent.`);
  };
  return (
    <>
      <div className="admin-create-form">
        <h3>Add walk-in</h3>
        <form className="queue-add-form" onSubmit={add}>
          <label className="field-label">
            Customer identifier (optional)
            <input
              value={form.customer}
              onChange={(e) => setForm({ ...form, customer: e.target.value })}
              placeholder="Use a short name or identifier"
            />
          </label>
          <label className="field-label">
            Service
            <select
              required
              value={form.serviceId}
              onChange={(e) =>
                setForm({ ...form, serviceId: e.target.value, employeeId: "" })
              }
            >
              <option value="">Choose service</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} · {s.duration} min
                </option>
              ))}
            </select>
          </label>
          <label className="field-label">
            Professional
            <select
              required
              value={form.employeeId}
              onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
            >
              <option value="">Choose available professional</option>
              {candidates.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
            </select>
          </label>
          <button className="btn btn-dark">
            <Plus size={15} /> Add to queue
          </button>
        </form>
        {notice && <p className="inline-message">{notice}</p>}
      </div>
      <div className="queue-columns admin-queue-columns">
        {data.employees.map((emp) => {
          const items = entries.filter(
            (q) =>
              q.employeeId === emp.id &&
              !["Completed", "Cancelled", "Absent"].includes(q.status),
          );
          return (
            <section className="queue-employee card" key={emp.id}>
              <div className="panel-head">
                <div>
                  <span className="eyebrow">
                    {emp.available ? "AVAILABLE" : "UNAVAILABLE"}
                  </span>
                  <h3>{emp.name}</h3>
                </div>
                <span className="queue-count">
                  {items.filter((q) => q.status === "Waiting").length} waiting
                </span>
              </div>
              {items.length ? (
                items.map((q) => (
                  <div className="admin-queue-entry" key={q.id}>
                    <div className="queue-entry-title">
                      <b>{q.number}</b>
                      <span>{serviceById(data, q.serviceId)?.name}</span>
                      <StatusPill status={q.status} />
                    </div>
                    <small>
                      {q.customer} · Arrived{" "}
                      {new Date(q.arrival).toLocaleTimeString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        hour: "numeric",
                        minute: "2-digit",
                      })}{" "}
                      {q.status === "Waiting" &&
                        `· waiting ${Math.max(0, Math.floor((Date.now() - new Date(q.arrival).getTime()) / 60000))} min`}
                      {q.status === "Waiting" &&
                        (Date.now() - new Date(q.arrival).getTime()) / 60000 >=
                          30 && (
                          <strong className="long-wait"> · Long wait</strong>
                        )}{" "}
                      ·{" "}
                      {queueWait(data, q) === null
                        ? "—"
                        : `~${queueWait(data, q)} min`}
                    </small>
                    <div className="queue-entry-actions">
                      {q.status !== "Completed" && (
                        <button
                          className="btn btn-small btn-dark"
                          onClick={() => advance(q)}
                        >
                          {q.status === "Waiting"
                            ? "Call next"
                            : q.status === "Called"
                              ? "Start service"
                              : "Complete service"}{" "}
                          <ArrowRight size={13} />
                        </button>
                      )}
                      <button
                        className="btn btn-small btn-outline"
                        onClick={() => move(q)}
                      >
                        Move
                      </button>
                      <button
                        className="btn btn-small btn-outline"
                        onClick={() => markAbsent(q)}
                      >
                        Mark absent
                      </button>
                      <button
                        className="icon-button"
                        aria-label="Cancel queue entry"
                        onClick={() => cancel(q)}
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="queue-empty">No active queue entries.</div>
              )}
            </section>
          );
        })}
      </div>
      <div className="demo-footnote">
        <CircleHelp /> Queue order is arrival-based within each employee's
        queue; appointments retain their scheduled priority. Waiting estimates
        use service durations and current queue state.
      </div>
    </>
  );
}
function AdminEmployees({ data, update }) {
  const [notice, setNotice] = useState("");
  const save = (emp, key, val) =>
    update((d) => ({
      ...d,
      employees: d.employees.map((e) =>
        e.id === emp.id ? { ...e, [key]: val } : e,
      ),
    }));
  const saveAssignments = (emp, serviceIds) =>
    update((d) => ({
      ...d,
      employees: d.employees.map((e) =>
        e.id === emp.id ? { ...e, serviceIds } : e,
      ),
      services: d.services.map((s) => ({
        ...s,
        employeeIds: serviceIds.includes(s.id)
          ? [...new Set([...s.employeeIds, emp.id])]
          : s.employeeIds.filter((x) => x !== emp.id),
      })),
    }));
  const addBlock = (emp) => {
    const date = window.prompt("Block a date (YYYY-MM-DD)", todayKolkata());
    if (!date) return;
    const start = window.prompt("Start time (HH:MM)", "12:00");
    if (!start) return;
    const end = window.prompt("End time (HH:MM)", "13:00");
    if (!end) return;
    if (mins(end) <= mins(start)) {
      setNotice("End time must be after start time.");
      return;
    }
    save(emp, "blocks", [...(emp.blocks || []), { date, start, end }]);
    setNotice(`Time blocked for ${emp.name}.`);
  };
  const appointments = (emp) =>
    data.appointments
      .filter(
        (a) =>
          a.employeeId === emp.id &&
          a.date >= todayKolkata() &&
          isBlocking(a.status),
      )
      .sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
  return (
    <>
      <div className="inline-tip">
        <CircleHelp /> Update an employee's work hours and service assignments
        here. The booking form uses these settings to calculate available slots.
      </div>
      {notice && (
        <div className="success-banner">
          <CheckCircle2 />
          {notice}
        </div>
      )}
      <div className="staff-team-grid">
        {data.employees.map((emp) => (
          <section className="admin-panel employee-editor" key={emp.id}>
            <div className="employee-editor-head">
              <EmployeeAvatar employee={emp} />
              <div>
                <span
                  className={`availability ${emp.available ? "available" : "unavailable"}`}
                >
                  <i />
                  {emp.available ? "Available" : "Unavailable"}
                </span>
                <h2>{emp.name}</h2>
                <span>{emp.specialties.join(" · ")}</span>
              </div>
              <button
                className="btn btn-small btn-outline"
                onClick={() => save(emp, "available", !emp.available)}
              >
                {emp.available ? "Set unavailable" : "Set available"}
              </button>
            </div>
            <div className="editor-section">
              <h4>Qualified services</h4>
              <div className="check-grid">
                {data.services.map((s) => (
                  <label key={s.id}>
                    <input
                      type="checkbox"
                      checked={emp.serviceIds.includes(s.id)}
                      onChange={(e) =>
                        saveAssignments(
                          emp,
                          e.target.checked
                            ? [...emp.serviceIds, s.id]
                            : emp.serviceIds.filter((x) => x !== s.id),
                        )
                      }
                    />
                    {s.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="schedule-fields">
              <label className="field-label">
                Start
                <input
                  type="time"
                  value={emp.workStart}
                  onChange={(e) => save(emp, "workStart", e.target.value)}
                />
              </label>
              <label className="field-label">
                End
                <input
                  type="time"
                  value={emp.workEnd}
                  onChange={(e) => save(emp, "workEnd", e.target.value)}
                />
              </label>
              <label className="field-label">
                Break starts
                <input
                  type="time"
                  value={emp.breakStart}
                  onChange={(e) => save(emp, "breakStart", e.target.value)}
                />
              </label>
              <label className="field-label">
                Break ends
                <input
                  type="time"
                  value={emp.breakEnd}
                  onChange={(e) => save(emp, "breakEnd", e.target.value)}
                />
              </label>
            </div>
            <div className="employee-editor-footer">
              <span>
                <CalendarDays size={15} />
                {appointments(emp).length} upcoming appointments
              </span>
              <button
                className="btn btn-small btn-outline"
                onClick={() => addBlock(emp)}
              >
                <Ban size={14} /> Block time
              </button>
            </div>
            {emp.blocks?.length > 0 && (
              <div className="block-list">
                {emp.blocks.map((b, i) => (
                  <span key={`${b.date}-${i}`}>
                    {fmtDate(b.date)} · {timeLabel(b.start)}–{timeLabel(b.end)}{" "}
                    <button
                      aria-label="Remove blocked time"
                      onClick={() =>
                        save(
                          emp,
                          "blocks",
                          emp.blocks.filter((_, n) => n !== i),
                        )
                      }
                    >
                      <X size={13} />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="schedule-appointments">
              <h4>Next appointments</h4>
              {appointments(emp)
                .slice(0, 3)
                .map((a) => (
                  <div key={a.id}>
                    <span>
                      {fmtDate(a.date)} · {timeLabel(a.start)}
                    </span>
                    <b>
                      {a.customerName} · {serviceById(data, a.serviceId)?.name}
                    </b>
                  </div>
                ))}
              {!appointments(emp).length && <small>No upcoming bookings</small>}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
function AdminCustomers({ data, update }) {
  const [query, setQuery] = useState(""),
    [selected, setSelected] = useState(null),
    [msg, setMsg] = useState("");
  const customers = data.customers.filter((c) =>
    `${c.name} ${c.phone}`.toLowerCase().includes(query.toLowerCase()),
  );
  const history = selected
    ? data.appointments
        .filter((a) => a.phone === selected.phone)
        .sort((a, b) => (b.date + b.start).localeCompare(a.date + a.start))
    : [];
  const save = (e) => {
    e.preventDefault();
    update((d) => ({
      ...d,
      customers: d.customers.map((c) => (c.id === selected.id ? selected : c)),
    }));
    setMsg("Customer record saved.");
  };
  return (
    <>
      <div className="toolbar">
        <label className="search-field">
          <Search size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or mobile"
          />
        </label>
        <span className="demo-label">PRIVATE · STAFF VIEW</span>
      </div>
      <div className="customer-layout">
        <section className="admin-panel customer-list">
          <div className="panel-head">
            <h3>
              {customers.length} customer{customers.length === 1 ? "" : "s"}
            </h3>
          </div>
          {customers.map((c) => (
            <button
              className={`customer-row ${selected?.id === c.id ? "selected" : ""}`}
              key={c.id}
              onClick={() => {
                setSelected({ ...c });
                setMsg("");
              }}
            >
              <span className="customer-avatar">
                {c.name.slice(0, 1).toUpperCase()}
              </span>
              <span>
                <b>{c.name}</b>
                <small>
                  {c.phone} ·{" "}
                  {
                    data.appointments.filter(
                      (a) => a.phone === c.phone && a.status === "Completed",
                    ).length
                  }{" "}
                  completed visits
                </small>
              </span>
              <ChevronRight size={16} />
            </button>
          ))}
        </section>
        {selected ? (
          <section className="admin-panel customer-details">
            <div className="panel-head">
              <div>
                <span className="eyebrow">CUSTOMER PROFILE</span>
                <h3>{selected.name}</h3>
              </div>
              <button className="icon-button" onClick={() => setSelected(null)}>
                <X size={16} />
              </button>
            </div>
            {msg && <p className="inline-message">{msg}</p>}
            <form onSubmit={save}>
              <div className="form-grid">
                <label className="field-label">
                  Name
                  <input
                    value={selected.name}
                    onChange={(e) =>
                      setSelected({ ...selected, name: e.target.value })
                    }
                  />
                </label>
                <label className="field-label">
                  Mobile
                  <input
                    value={selected.phone}
                    onChange={(e) =>
                      setSelected({ ...selected, phone: e.target.value })
                    }
                  />
                </label>
                <label className="field-label full">
                  Saved preferences
                  <textarea
                    value={selected.preferences || ""}
                    onChange={(e) =>
                      setSelected({ ...selected, preferences: e.target.value })
                    }
                  />
                </label>
                <label className="field-label full">
                  Internal service note
                  <textarea
                    value={selected.notes || ""}
                    onChange={(e) =>
                      setSelected({ ...selected, notes: e.target.value })
                    }
                    placeholder="Staff-only note related to service"
                  />
                </label>
              </div>
              <div className="customer-consent">
                Optional communications:{" "}
                <b>{selected.consent ? "Opted in" : "Not opted in"}</b>
              </div>
              <button className="btn btn-dark">
                Save record <Check size={15} />
              </button>
            </form>
            <div className="customer-history">
              <h4>Appointment history</h4>
              {history.length ? (
                history.map((a) => (
                  <div className="history-row" key={a.id}>
                    <span>
                      {fmtDate(a.date)} · {timeLabel(a.start)}
                    </span>
                    <b>{serviceById(data, a.serviceId)?.name}</b>
                    <StatusPill status={a.status} />
                  </div>
                ))
              ) : (
                <small>No appointments recorded.</small>
              )}
            </div>
          </section>
        ) : (
          <section className="admin-panel">
            <EmptyState
              title="Choose a customer"
              text="Contact numbers and preferences stay inside this staff dashboard."
            />
          </section>
        )}
      </div>
      <div className="demo-footnote">
        <CircleHelp /> Customer details are stored only in this browser's local
        storage. This prototype does not provide secure accounts or multi-device
        access.
      </div>
    </>
  );
}
function AdminServices({ data, update }) {
  const [editing, setEditing] = useState(null),
    [notice, setNotice] = useState("");
  const begin = (s) => setEditing({ ...s });
  const save = (e) => {
    e.preventDefault();
    if (
      !editing.name.trim() ||
      Number(editing.price) < 0 ||
      Number(editing.duration) < 5
    ) {
      setNotice(
        "Add a name, non-negative price, and duration of at least 5 minutes.",
      );
      return;
    }
    update((d) => {
      const normalized = {
        ...editing,
        price: Number(editing.price),
        duration: Number(editing.duration),
      };
      const services = d.services.some((s) => s.id === editing.id)
        ? d.services.map((s) => (s.id === editing.id ? normalized : s))
        : [...d.services, normalized];
      return {
        ...d,
        services,
        employees: d.employees.map((emp) => ({
          ...emp,
          serviceIds: normalized.employeeIds.includes(emp.id)
            ? [...new Set([...emp.serviceIds, normalized.id])]
            : emp.serviceIds.filter((x) => x !== normalized.id),
        })),
      };
    });
    setNotice(
      "Service saved. Existing bookings keep their booked price and duration.",
    );
    setEditing(null);
  };
  const create = () =>
    setEditing({
      id: `s-${id().toLowerCase()}`,
      name: "",
      category: "Other grooming",
      description: "",
      price: 0,
      duration: 30,
      employeeIds: [],
      active: true,
    });
  return (
    <>
      <div className="toolbar">
        <span className="illustrative">EDITABLE DEMO CATALOGUE</span>
        <button className="btn btn-dark" onClick={create}>
          <Plus size={15} /> Add service
        </button>
      </div>
      {notice && (
        <div className="success-banner">
          <CheckCircle2 />
          {notice}
          <button onClick={() => setNotice("")}>
            <X size={14} />
          </button>
        </div>
      )}
      {editing && (
        <form className="admin-create-form service-editor-form" onSubmit={save}>
          <div className="panel-head">
            <h3>
              {data.services.some((s) => s.id === editing.id)
                ? "Edit service"
                : "Add service"}
            </h3>
            <button
              type="button"
              className="icon-button"
              onClick={() => setEditing(null)}
            >
              <X size={16} />
            </button>
          </div>
          <div className="form-grid">
            <label className="field-label">
              Service name
              <input
                required
                value={editing.name}
                onChange={(e) =>
                  setEditing({ ...editing, name: e.target.value })
                }
              />
            </label>
            <label className="field-label">
              Category
              <select
                value={editing.category}
                onChange={(e) =>
                  setEditing({ ...editing, category: e.target.value })
                }
              >
                {[
                  "Haircuts",
                  "Beard & grooming",
                  "Threading",
                  "Waxing",
                  "Hair styling",
                  "Other grooming",
                ].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="field-label">
              Price (₹)
              <input
                required
                type="number"
                min="0"
                value={editing.price}
                onChange={(e) =>
                  setEditing({ ...editing, price: e.target.value })
                }
              />
            </label>
            <label className="field-label">
              Duration (minutes)
              <input
                required
                type="number"
                min="5"
                step="5"
                value={editing.duration}
                onChange={(e) =>
                  setEditing({ ...editing, duration: e.target.value })
                }
              />
            </label>
            <label className="field-label full">
              Description
              <textarea
                value={editing.description}
                onChange={(e) =>
                  setEditing({ ...editing, description: e.target.value })
                }
              />
            </label>
          </div>
          <div className="editor-section">
            <h4>Qualified professionals</h4>
            <div className="check-grid">
              {data.employees.map((emp) => (
                <label key={emp.id}>
                  <input
                    type="checkbox"
                    checked={editing.employeeIds.includes(emp.id)}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        employeeIds: e.target.checked
                          ? [...editing.employeeIds, emp.id]
                          : editing.employeeIds.filter((x) => x !== emp.id),
                      })
                    }
                  />
                  {emp.name}
                </label>
              ))}
            </div>
          </div>
          <label className="check-label">
            <input
              type="checkbox"
              checked={editing.active}
              onChange={(e) =>
                setEditing({ ...editing, active: e.target.checked })
              }
            />{" "}
            Service is active and bookable
          </label>
          <button className="btn btn-dark">
            Save service <Check size={15} />
          </button>
        </form>
      )}
      <div className="admin-service-grid">
        {data.services.map((s, i) => (
          <div
            className={`admin-service-item ${s.active ? "" : "inactive"}`}
            key={s.id}
          >
            <ServiceCard service={s} index={i} admin onEdit={() => begin(s)} />
            <span
              className={`status-pill ${s.active ? "confirmed" : "cancelled"}`}
            >
              {s.active ? "Active" : "Inactive"}
            </span>
            <div className="service-admin-actions">
              <button
                className="btn btn-small btn-outline"
                onClick={() =>
                  update((d) => ({
                    ...d,
                    services: d.services.map((x) =>
                      x.id === s.id ? { ...x, active: !x.active } : x,
                    ),
                  }))
                }
              >
                {s.active ? "Deactivate" : "Activate"}
              </button>
              <button
                className="icon-button"
                aria-label="Edit service"
                onClick={() => begin(s)}
              >
                <Pencil size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="demo-footnote">
        <CircleHelp /> Prices are illustrative starter values. Past appointments
        retain the price saved when they were booked.
      </div>
    </>
  );
}
function AdminAnalytics({ data }) {
  const completed = data.appointments.filter((a) => a.status === "Completed"),
    counts = {};
  const recordedDurations = completed
    .map((a) => mins(a.end) - mins(a.start))
    .filter((duration) => duration > 0);
  const averageDuration =
    recordedDurations.length >= 3
      ? Math.round(
          recordedDurations.reduce((sum, duration) => sum + duration, 0) /
            recordedDurations.length,
        )
      : null;
  data.services.forEach(
    (s) =>
      (counts[s.name] = data.appointments.filter(
        (a) => a.serviceId === s.id,
      ).length),
  );
  const popular = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const byDay = {};
  data.appointments.forEach((a) => {
    if (a.status !== "Cancelled" && a.status !== "No-show")
      byDay[a.date] = (byDay[a.date] || 0) + 1;
  });
  const dayEntries = Object.entries(byDay)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-7),
    max = Math.max(1, ...dayEntries.map((x) => x[1]));
  const employeeCount = data.employees.map((e) => ({
    e,
    count: data.appointments.filter((a) => a.employeeId === e.id).length,
  }));
  const total = data.appointments.length,
    walkin = data.queue.filter(
      (q) =>
        q.sample ||
        q.status === "Completed" ||
        q.status === "Waiting" ||
        q.status === "In service",
    ).length,
    rev = completed.reduce((n, a) => n + a.price, 0);
  const enough =
    data.appointments.some((a) => !a.sample) ||
    data.queue.some((q) => !q.sample);
  const hours = {};
  data.appointments.forEach((a) => {
    if (a.status === "Cancelled" || a.status === "No-show") return;
    const h = `${a.start.slice(0, 2)}:00`;
    hours[h] = (hours[h] || 0) + 1;
  });
  const busiest = Object.entries(hours).sort((a, b) => b[1] - a[1])[0];
  return (
    <>
      <div className="analytics-notice">
        <ChartNoAxesCombined />
        <span>
          <b>Demo records are included.</b> This view summarizes appointments
          and queue records saved in this browser; seeded entries are sample
          data. No historical salon performance is implied.
        </span>
      </div>
      <div className="metric-grid analytics-metrics">
        <Metric
          label="Recorded appointments"
          value={total}
          icon={CalendarDays}
          note="Sample and new records"
        />
        <Metric
          label="Completed service value"
          value={fmtMoney(rev)}
          icon={IndianRupee}
          note="Completed bookings only"
        />
        <Metric
          label="Walk-in records"
          value={walkin}
          icon={UsersRound}
          note="Current and sample queue"
        />
        <Metric
          label="Completed appointments"
          value={completed.length}
          icon={CheckCircle2}
          note="All dates in this demo"
        />
      </div>
      <div className="analytics-grid">
        <section className="admin-panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">APPOINTMENTS</span>
              <h3>Counts by day</h3>
            </div>
          </div>
          {dayEntries.length ? (
            <div className="bar-chart">
              {dayEntries.map(([d, n]) => (
                <div className="bar-column" key={d}>
                  <b>{n}</b>
                  <div
                    style={{ height: `${Math.max(7, (n / max) * 130)}px` }}
                  />
                  <small>
                    {fmtDate(d, { weekday: "short", day: "numeric" })}
                  </small>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Not enough data yet"
              text="Appointments will appear here after they are recorded."
              small
            />
          )}
        </section>
        <section className="admin-panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">SERVICE DEMAND</span>
              <h3>Most-booked services</h3>
            </div>
          </div>
          {data.services.length ? (
            data.services.map((s) => (
              <div className="demand-row" key={s.id}>
                <span>{s.name}</span>
                <div className="demand-track">
                  <i
                    style={{
                      width: `${Math.max(3, ((counts[s.name] || 0) / Math.max(1, ...Object.values(counts))) * 100)}%`,
                    }}
                  />
                </div>
                <b>{counts[s.name] || 0}</b>
              </div>
            ))
          ) : (
            <EmptyState
              title="Not enough data yet"
              text="Add services to begin recording demand."
              small
            />
          )}
          {popular && popular[1] > 0 && (
            <p className="insight">
              <Sparkles /> {popular[0]} has the highest booking count in the
              records currently stored.
            </p>
          )}
        </section>
        <section className="admin-panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">WORKLOAD</span>
              <h3>Appointments by professional</h3>
            </div>
          </div>
          {employeeCount.map(({ e, count }) => (
            <div className="workload-row" key={e.id}>
              <EmployeeAvatar employee={e} size="small" />
              <span>{e.name}</span>
              <b>{count}</b>
            </div>
          ))}
        </section>
        <section className="admin-panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">BUSY HOURS</span>
              <h3>Recorded appointment times</h3>
            </div>
          </div>
          {busiest ? (
            <>
              <p className="big-insight">
                {busiest[0]}{" "}
                <small>has the highest recorded appointment count</small>
              </p>
              <p className="muted">
                {busiest[1]} booking{busiest[1] === 1 ? "" : "s"} at that hour
                in the available records.
              </p>
            </>
          ) : (
            <EmptyState
              title="Not enough data yet"
              text="No appointment times are available."
              small
            />
          )}
          {!enough && (
            <p className="sample-note">
              Only starter sample records are available.
            </p>
          )}
        </section>
      </div>
      <div className="analytics-footnote">
        Average service duration:{" "}
        {averageDuration !== null
          ? `${averageDuration} min across ${recordedDurations.length} completed records`
          : "Not enough completed records yet."}{" "}
        · Repeat visits:{" "}
        {data.customers.some(
          (c) =>
            data.appointments.filter(
              (a) => a.phone === c.phone && a.status === "Completed",
            ).length > 1,
        )
          ? "Repeat visits appear in saved customer histories."
          : "Not enough completed history yet."}
      </div>
    </>
  );
}
function AdminSettings({ data, update, reset }) {
  const [form, setForm] = useState({ ...data.settings }),
    [notice, setNotice] = useState(""),
    [confirmReset, setConfirmReset] = useState(false),
    [offer, setOffer] = useState({
      name: "",
      description: "",
      start: todayKolkata(),
      end: dateIn(14),
      serviceIds: [],
      discountType: "percent",
      amount: 10,
    });
  useEffect(() => setForm({ ...data.settings }), [data.settings]);
  const save = (e) => {
    e.preventDefault();
    if (mins(form.close) <= mins(form.open)) {
      setNotice("Closing time must be later than opening time.");
      return;
    }
    update((d) => ({
      ...d,
      settings: {
        ...d.settings,
        ...form,
        slotStep: Number(form.slotStep),
        returnInterval: Number(form.returnInterval),
      },
    }));
    setNotice("Salon settings saved.");
  };
  const addHoliday = () => {
    const date = window.prompt("Holiday date (YYYY-MM-DD)", dateIn(7));
    if (date)
      update((d) => ({
        ...d,
        settings: {
          ...d.settings,
          holidays: [...new Set([...d.settings.holidays, date])],
        },
      }));
  };
  const special = () => {
    const date = window.prompt("Special schedule date (YYYY-MM-DD)", dateIn(7));
    if (!date) return;
    const open = window.prompt("Opening time (HH:MM)", form.open) || form.open,
      close = window.prompt("Closing time (HH:MM)", form.close) || form.close;
    if (mins(close) <= mins(open)) {
      setNotice("Closing time must be later than opening.");
      return;
    }
    update((d) => ({
      ...d,
      settings: {
        ...d.settings,
        specialHours: [
          ...d.settings.specialHours.filter((s) => s.date !== date),
          { date, open, close },
        ],
      },
    }));
    setNotice("Special schedule saved.");
  };
  const makeOffer = (e) => {
    e.preventDefault();
    if (
      !offer.name.trim() ||
      Number(offer.amount) <= 0 ||
      !offer.start ||
      !offer.end ||
      offer.end < offer.start
    ) {
      setNotice(
        "Enter an offer name, a valid discount, and a valid date range.",
      );
      return;
    }
    update((d) => ({
      ...d,
      settings: {
        ...d.settings,
        offers: [
          ...d.settings.offers,
          {
            ...offer,
            id: `offer-${id()}`,
            amount: Number(offer.amount),
            active: true,
          },
        ],
      },
    }));
    setOffer({ ...offer, name: "", description: "", serviceIds: [] });
    setNotice("Offer created. Preview only; no promotional message was sent.");
  };
  return (
    <>
      <div className="settings-layout">
        <form className="admin-panel settings-form" onSubmit={save}>
          <div className="panel-head">
            <div>
              <span className="eyebrow">SALON CONFIGURATION</span>
              <h3>Hours and booking rules</h3>
            </div>
          </div>
          <label className="field-label">
            Salon name
            <input
              value={form.salonName}
              onChange={(e) => setForm({ ...form, salonName: e.target.value })}
            />
          </label>
          {!form.configured && (
            <div className="inline-warning">
              <CircleAlert /> Configure hours before accepting bookings.
            </div>
          )}
          <div className="schedule-fields">
            <label className="field-label">
              Opening time
              <input
                type="time"
                value={form.open}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    open: e.target.value,
                    configured: true,
                  }))
                }
                onInput={(e) => {
                  const value = e.currentTarget.value;
                  setForm((current) => ({
                    ...current,
                    open: value,
                    configured: true,
                  }));
                }}
              />
            </label>
            <label className="field-label">
              Closing time
              <input
                type="time"
                value={form.close}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    close: e.target.value,
                    configured: true,
                  }))
                }
                onInput={(e) => {
                  const value = e.currentTarget.value;
                  setForm((current) => ({
                    ...current,
                    close: value,
                    configured: true,
                  }));
                }}
              />
            </label>
          </div>
          <p className="hours-preview">
            Current hours: {timeLabel(form.open)} – {timeLabel(form.close)}
          </p>
          <div className="schedule-fields">
            <label className="field-label">
              Appointment slot interval (minutes)
              <select
                value={form.slotStep}
                onChange={(e) => setForm({ ...form, slotStep: e.target.value })}
              >
                {[10, 15, 20, 30].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <label className="field-label">
              Return-visit interval (days)
              <input
                type="number"
                min="1"
                value={form.returnInterval}
                onChange={(e) =>
                  setForm({ ...form, returnInterval: e.target.value })
                }
              />
            </label>
          </div>
          <label className="check-label">
            <input
              type="checkbox"
              checked={form.walkins}
              onChange={(e) => setForm({ ...form, walkins: e.target.checked })}
            />{" "}
            Accept walk-ins
          </label>
          <p className="muted">
            Currency is set to INR (₹) · Time zone is Asia/Kolkata.
          </p>
          <button className="btn btn-dark">
            Save settings <Check size={15} />
          </button>
          {notice && <p className="inline-message">{notice}</p>}
        </form>
        <section className="admin-panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">CALENDAR</span>
              <h3>Holidays & special hours</h3>
            </div>
          </div>
          <p className="muted">
            Configured dates override the default schedule for that date.
          </p>
          <div className="settings-actions">
            <button className="btn btn-outline" onClick={addHoliday}>
              <Plus size={15} /> Add holiday
            </button>
            <button className="btn btn-outline" onClick={special}>
              <CalendarClock size={15} /> Add special schedule
            </button>
          </div>
          <div className="schedule-list">
            <b>Holidays</b>
            {form.holidays?.length ? (
              form.holidays.map((d) => (
                <div key={d}>
                  {fmtDate(d)}{" "}
                  <button
                    className="icon-button"
                    onClick={() =>
                      update((x) => ({
                        ...x,
                        settings: {
                          ...x.settings,
                          holidays: x.settings.holidays.filter((y) => y !== d),
                        },
                      }))
                    }
                  >
                    <X size={14} />
                  </button>
                </div>
              ))
            ) : (
              <small>No holidays configured.</small>
            )}
            <b>Special schedules</b>
            {form.specialHours?.length ? (
              form.specialHours.map((s) => (
                <div key={s.date}>
                  {fmtDate(s.date)} · {timeLabel(s.open)}–{timeLabel(s.close)}{" "}
                  <button
                    className="icon-button"
                    onClick={() =>
                      update((x) => ({
                        ...x,
                        settings: {
                          ...x.settings,
                          specialHours: x.settings.specialHours.filter(
                            (y) => y.date !== s.date,
                          ),
                        },
                      }))
                    }
                  >
                    <X size={14} />
                  </button>
                </div>
              ))
            ) : (
              <small>No special hours configured.</small>
            )}
          </div>
        </section>
      </div>
      <div className="admin-panel offer-panel">
        <div className="panel-head">
          <div>
            <span className="eyebrow">RETENTION</span>
            <h3>Offers & on-screen reminder previews</h3>
          </div>
        </div>
        <p className="muted">
          Create offers for staff to manage. No email, SMS, or WhatsApp messages
          are sent.
        </p>
        <form className="offer-form" onSubmit={makeOffer}>
          <label className="field-label">
            Offer name
            <input
              value={offer.name}
              onChange={(e) => setOffer({ ...offer, name: e.target.value })}
              placeholder="e.g. Campus event tidy-up"
              required
            />
          </label>
          <label className="field-label">
            Description
            <input
              value={offer.description}
              onChange={(e) =>
                setOffer({ ...offer, description: e.target.value })
              }
              placeholder="Offer details"
            />
          </label>
          <label className="field-label">
            Starts
            <input
              type="date"
              value={offer.start}
              onChange={(e) => setOffer({ ...offer, start: e.target.value })}
            />
          </label>
          <label className="field-label">
            Ends
            <input
              type="date"
              value={offer.end}
              onChange={(e) => setOffer({ ...offer, end: e.target.value })}
            />
          </label>
          <label className="field-label">
            Discount type
            <select
              value={offer.discountType}
              onChange={(e) =>
                setOffer({ ...offer, discountType: e.target.value })
              }
            >
              <option value="percent">Percent</option>
              <option value="fixed">Fixed amount in ₹</option>
            </select>
          </label>
          <label className="field-label">
            Discount amount
            <input
              type="number"
              min="1"
              value={offer.amount}
              onChange={(e) => setOffer({ ...offer, amount: e.target.value })}
            />
          </label>
          <div className="editor-section offer-services">
            <h4>Applicable services</h4>
            <div className="check-grid">
              {data.services
                .filter((service) => service.active)
                .map((service) => (
                  <label key={service.id}>
                    <input
                      type="checkbox"
                      checked={offer.serviceIds.includes(service.id)}
                      onChange={(e) =>
                        setOffer({
                          ...offer,
                          serviceIds: e.target.checked
                            ? [...offer.serviceIds, service.id]
                            : offer.serviceIds.filter(
                                (id) => id !== service.id,
                              ),
                        })
                      }
                    />
                    {service.name}
                  </label>
                ))}
            </div>
          </div>
          <button className="btn btn-dark">
            <Plus size={15} /> Create offer
          </button>
        </form>
        {form.offers?.length > 0 && (
          <div className="offer-list">
            {form.offers.map((o) => (
              <div className="offer-item" key={o.id}>
                <div>
                  <b>{o.name}</b>
                  <small>
                    {o.description} · {fmtDate(o.start)} to {fmtDate(o.end)} ·{" "}
                    {o.discountType === "fixed"
                      ? fmtMoney(o.amount)
                      : `${o.amount}%`}{" "}
                    off
                  </small>
                  <small>
                    Message preview: “{o.name} — ask salon staff about this
                    offer.” Not sent.
                  </small>
                </div>
                <button
                  className="btn btn-small btn-outline"
                  onClick={() =>
                    update((d) => ({
                      ...d,
                      settings: {
                        ...d.settings,
                        offers: d.settings.offers.map((x) =>
                          x.id === o.id ? { ...x, active: !x.active } : x,
                        ),
                      },
                    }))
                  }
                >
                  {o.active ? "Deactivate" : "Activate"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="reset-panel">
        <div>
          <b>Reset demo data</b>
          <p>
            Restore the starter catalogue, sample records, and default hours.
            This replaces changes stored in this browser.
          </p>
        </div>
        <button
          className="btn btn-outline danger"
          onClick={() => setConfirmReset(true)}
        >
          <RotateCcw size={15} /> Reset demo
        </button>
      </div>
      {confirmReset && (
        <div className="modal-backdrop">
          <section
            className="confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-title"
          >
            <span className="icon-soft">
              <RotateCcw size={17} />
            </span>
            <h2 id="reset-title">Reset demo data?</h2>
            <p>
              This replaces all SmartSalon changes saved in this browser with
              the original sample catalogue, hours, appointments, and queue.
            </p>
            <div className="form-actions">
              <button
                className="btn btn-outline"
                onClick={() => setConfirmReset(false)}
              >
                Keep current data
              </button>
              <button
                className="btn btn-dark"
                onClick={() => {
                  reset();
                  setNotice("Demo data reset to the original sample.");
                  setConfirmReset(false);
                  window.scrollTo(0, 0);
                }}
              >
                Reset demo data
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function EmptyState({ title, text, action, small = false }) {
  return (
    <div className={`empty-state ${small ? "small" : ""}`}>
      <span className="empty-icon">
        <CircleHelp size={20} />
      </span>
      <b>{title}</b>
      <p>{text}</p>
      {action}
    </div>
  );
}
function Footer({ data }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand footer-brand">
            <span className="brand-mark">
              <Scissors size={20} />
            </span>
            <span>
              <b>SmartSalon</b>
              <small>YOUR VISIT, WITHOUT THE WAIT</small>
            </span>
          </Link>
          <p>A thoughtful salon visit starts with a little more clarity.</p>
        </div>
        <div>
          <span className="eyebrow">EXPLORE</span>
          <Link to="/services">Services</Link>
          <Link to="/team">Our team</Link>
          <Link to="/book">Book appointment</Link>
          <Link to="/queue">Live queue</Link>
        </div>
        <div>
          <span className="eyebrow">VISIT PLANNING</span>
          <HoursStatus data={data} />
          <p className="footer-demo">
            Salon address and phone are not configured. Contact details can be
            added in settings.
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 SmartSalon AI · Prototype</span>
        <span>
          Demo data is saved in this browser only ·{" "}
          <Link to="/admin">Staff dashboard</Link>
        </span>
      </div>
    </footer>
  );
}

export default App;
