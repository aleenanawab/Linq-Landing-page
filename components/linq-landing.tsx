import {
  Building2,
  Globe2,
  LayoutDashboard,
  Link2,
  QrCode,
  Ticket,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CrowdCanvas from "@/components/ui/skiper39";

// Self-host this sprite in /public for production (e.g. "/crowd/peeps.png").
const CROWD_SRC =
  "https://cdn.21st.dev/assets/localized/abdb8990a7bef8c2f5af3e45f0a3c969c4b0603fba8be92e81347de4ea4e1ed7.png";

const REGISTER_URL = "https://linq.avtive.app/organization/register";
const LOGIN_URL = "https://linq.avtive.app/login";
const AVTIVE_URL = "https://www.avtive.app";

// ── Overview items (Section immediately following Hero) ──
const overviewItems = [
  {
    number: "01",
    title: "Organization Management",
    body: "Organizations can register and manage their activities through their dedicated portals.",
    icon: Building2,
  },
  {
    number: "02",
    title: "Simple Event Registration",
    body: "Create and share one event link so attendees can register easily.",
    icon: Link2,
  },
  {
    number: "03",
    title: "Scannable Attendee Cards",
    body: "Attendees receive scannable cards that make connecting with others easier.",
    icon: QrCode,
  },
  {
    number: "04",
    title: "Global Networking",
    body: "Help attendees and organizations create meaningful professional connections.",
    icon: Globe2,
  },
];

// ── How It Works Steps ──
const steps = [
  {
    icon: Building2,
    title: "Register your organization",
    body: "Set up your organization once. Linq handles onboarding in a single step.",
  },
  {
    icon: Link2,
    title: "Share one event link",
    body: "Send attendees a single link to register for your event.",
  },
  {
    icon: QrCode,
    title: "Attendees get scannable cards",
    body: "Each attendee generates a card that others can scan to connect.",
  },
];

// ── Features ──
const features = [
  { icon: Ticket, title: "One-link registration", body: "Attendees register through a single shareable link." },
  { icon: QrCode, title: "Scannable attendee cards", body: "Every attendee gets a card that is quick to scan and share." },
  { icon: Building2, title: "Organization onboarding", body: "Bring each organization on board in one step." },
  { icon: LayoutDashboard, title: "Portals for every role", body: "Event creators and organizations each work from their own portal." },
  { icon: Users, title: "All organizations, one place", body: "Manage every organization on your events without switching tools." },
  { icon: Globe2, title: "Global networking", body: "Connections made at your event travel well beyond the venue." },
];

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="flex size-9 items-center justify-center rounded-xl bg-violet-600 font-extrabold text-white shadow-md shadow-violet-600/30">
        L
      </span>
      <span className="text-2xl font-bold tracking-tight text-slate-900">
        Linq
      </span>
    </div>
  );
}

export default function LinqLanding() {
  return (
    <main className="min-h-screen bg-white text-slate-900 antialiased selection:bg-violet-100 selection:text-violet-900">
      {/* ───────── 1. Hero ───────── */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_80%_100%,#ede9fe_0%,#ffffff_70%)]">
        {/* Minimal Header */}
        <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" aria-label="Linq home" className="transition-opacity hover:opacity-90">
            <Logo />
          </a>
          <nav className="flex items-center gap-2 sm:gap-6">
            <a href="#overview" className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-violet-700 sm:block">
              Overview
            </a>
            <a href="#how-it-works" className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-violet-700 sm:block">
              How it works
            </a>
            <a href="#features" className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-violet-700 sm:block">
              Features
            </a>
            <Button
              asChild
              variant="ghost"
              className="text-sm font-medium text-slate-700 hover:bg-violet-50 hover:text-violet-700"
            >
              <a href={LOGIN_URL}>Log in</a>
            </Button>
          </nav>
        </header>

        {/* Existing Human Crowd Canvas in exact original position */}
        <CrowdCanvas src={CROWD_SRC} className="top-[38%] z-0" />

        {/* Hero Content (Prominent & High Contrast above the distant crowd) */}
        <div className="relative z-20 mx-auto w-full max-w-7xl flex-1 px-6 pt-10 sm:pt-16 lg:pt-20 pb-20">
          <div className="relative max-w-3xl">
            {/* Subtle soft white-to-transparent gradient behind text area to ensure 100% crisp readability */}
            <div
              className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.45)_50%,transparent_80%)]"
              aria-hidden="true"
            />

            {/* Supporting Tagline Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200/90 bg-white/95 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide text-violet-700 shadow-sm shadow-violet-100 backdrop-blur-md">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-violet-600"></span>
              </span>
              Every connection creates opportunity.
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl font-black leading-[1.04] tracking-tight text-slate-900 sm:text-6xl md:text-7xl lg:text-[5.25rem]">
              <span className="block text-violet-700 drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]">
                One Link.
              </span>
              <span className="block bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-800 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]">
                Every Connection.
              </span>
            </h1>

            {/* Short Hero Description */}
            <p className="mt-6 max-w-xl text-lg sm:text-xl font-normal leading-relaxed text-slate-700 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              Simplify event registration, connect attendees, and manage your organization with Linq.
            </p>

            {/* Hero Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-8 text-base font-semibold text-white shadow-lg shadow-violet-600/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-600/40 hover:from-violet-700 hover:to-purple-700 active:translate-y-0"
              >
                <a href={REGISTER_URL}>Register Your Organization</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-2 border-violet-200 bg-white/95 px-8 text-base font-semibold text-violet-700 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50/90 hover:text-violet-800 active:translate-y-0"
              >
                <a href="#overview">Explore Linq</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 2. Product Information (Immediately After Hero) ───────── */}
      <section id="overview" className="scroll-mt-12 border-t border-violet-100/70 bg-gradient-to-b from-white via-violet-50/30 to-white px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-100/80 px-3 py-1 text-xs font-semibold text-violet-700">
              <Sparkles className="size-3.5" aria-hidden />
              <span>Platform Overview</span>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Everything You Need to Build Better Connections
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Linq brings organizations, event creators, and attendees together through a simple event registration and networking experience.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {overviewItems.map(({ number, title, body, icon: Icon }) => (
              <div
                key={number}
                className="group relative flex flex-col justify-between rounded-2xl border border-violet-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-500/10"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold tracking-wider text-violet-600 bg-violet-50 px-2.5 py-1 rounded-md border border-violet-100/80">
                      {number}
                    </span>
                    <div className="grid size-10 place-items-center rounded-xl bg-violet-50 text-violet-600 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                      <Icon className="size-5" aria-hidden />
                    </div>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900 transition-colors group-hover:text-violet-700">
                    {title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 3. How It Works ───────── */}
      <section id="how-it-works" className="scroll-mt-12 bg-white px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-100/80 px-3 py-1 text-xs font-semibold text-violet-700">
            <span>Step-by-Step</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-violet-700 sm:text-4xl">
            From sign-up to scan in three steps
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Organizations and event creators set things up once. Attendees only need the link.
          </p>
        </div>
        <ol className="mx-auto mt-14 grid max-w-5xl gap-10 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <li key={title} className="flex flex-col items-center text-center">
              <div className="relative grid size-16 place-items-center rounded-2xl bg-white text-violet-600 shadow-[0_8px_30px_-8px_rgba(124,58,237,0.35)] ring-1 ring-violet-100">
                <Icon className="size-7" aria-hidden />
                <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-violet-600 text-xs font-semibold text-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ───────── 4. Features ───────── */}
      <section id="features" className="scroll-mt-12 bg-gradient-to-b from-white via-violet-50/40 to-white px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-violet-700 sm:text-4xl">
              Built for organizations and event creators
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-600">
              Purpose-built tools to streamline your registration process and maximize networking outcomes.
            </p>
          </div>
          <div className="mt-14 grid overflow-hidden rounded-3xl border border-violet-100 bg-violet-100 sm:grid-cols-2 lg:grid-cols-3 gap-px shadow-sm">
            {features.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white p-8 transition-colors hover:bg-violet-50/30">
                <Icon className="size-6 text-violet-600" aria-hidden />
                <h3 className="mt-5 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 5. Final CTA ───────── */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-[radial-gradient(ellipse_at_top,#7c3aed_0%,#5b21b6_100%)] px-6 py-16 text-center text-white shadow-2xl shadow-violet-900/20 sm:py-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Your event deserves one link.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base sm:text-lg text-violet-100">
            Register your organization and start collecting connections.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-white px-8 text-base font-semibold text-violet-700 shadow-lg shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-50 active:translate-y-0"
            >
              <a href={REGISTER_URL}>
                <span>Register Your Organization</span>
                <ArrowRight className="ml-1.5 size-4" aria-hidden />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-12 rounded-full px-8 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
            >
              <a href={LOGIN_URL}>Log in</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ───────── 6. Footer ───────── */}
      <footer className="border-t border-violet-100 bg-white px-6 py-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-slate-500">
              A product of{" "}
              <a
                href={AVTIVE_URL}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-violet-700 underline-offset-4 hover:underline"
              >
                Avtive
              </a>
            </p>
          </div>
          <nav className="flex flex-wrap gap-8 text-sm font-medium text-slate-600">
            <a href={LOGIN_URL} className="transition-colors hover:text-violet-700">
              Log in
            </a>
            <a href={REGISTER_URL} className="transition-colors hover:text-violet-700">
              Register organization
            </a>
            <a
              href={AVTIVE_URL}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-violet-700"
            >
              Avtive
            </a>
          </nav>
        </div>
        <div className="mx-auto mt-10 flex max-w-5xl flex-col gap-2 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Avtive. All rights reserved.</span>
          <span>
            Crowd animation adapted from Skiper UI · illustration by{" "}
            <a
              href="https://www.openpeeps.com/"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-2 hover:underline"
            >
              Open Peeps
            </a>
          </span>
        </div>
      </footer>
    </main>
  );
}
